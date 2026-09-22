"use client";

import { useMemo, useState } from "react";
import { PHYSIO_QUESTIONS } from "@/data/physiology/questions";
import { PHYSIO_TOPICS, type PhysioQuestion, type PhysioTopicId } from "@/data/physiology/types";
import { cn } from "@/lib/utils";

const LETTERS = ["א", "ב", "ג", "ד"] as const;

type FormatFilter = "all" | "open" | "mc";

export function PhysiologyQuiz({ query }: { query: string }) {
  const [topic, setTopic] = useState<PhysioTopicId | "all">("all");
  const [format, setFormat] = useState<FormatFilter>("all");
  const [picks, setPicks] = useState<Record<string, number>>({});
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PHYSIO_QUESTIONS.filter((item) => {
      if (topic !== "all" && item.topic !== topic) return false;
      if (format !== "all" && item.format !== format) return false;
      if (!q) return true;
      const hay = [item.promptHe, item.answerHe, item.explainHe ?? "", ...(item.options ?? [])]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query, topic, format]);

  const mcAnswered = PHYSIO_QUESTIONS.filter((item) => item.format === "mc" && picks[item.id] != null);
  const mcCorrect = mcAnswered.filter((item) => picks[item.id] === item.answer).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">חידון · Quiz</h2>
          <p className="mt-1 max-w-3xl text-sm text-[var(--ink-soft)]">
            שאלות חזרה ואמריקאיות מהשיעור. באמריקאית בוחרים תשובה ומיד רואים אם צדקתם. בשאלה
            פתוחה לוחצים כדי לגלות את התשובה.
          </p>
        </div>
        <p className="text-xs text-[var(--ink-soft)]">
          אמריקאי: {mcCorrect} נכונות מתוך {mcAnswered.length} שנענו
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Chip active={topic === "all"} onClick={() => setTopic("all")}>
          כל הנושאים
        </Chip>
        {PHYSIO_TOPICS.map((t) => (
          <Chip key={t.id} active={topic === t.id} onClick={() => setTopic(t.id)}>
            <span className="term font-bold">{t.en}</span>
            <span className="font-normal"> · {t.he}</span>
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        <Chip active={format === "all"} onClick={() => setFormat("all")}>
          הכל ({list.length})
        </Chip>
        <Chip active={format === "open"} onClick={() => setFormat("open")}>
          פתוחות
        </Chip>
        <Chip active={format === "mc"} onClick={() => setFormat("mc")}>
          אמריקאי
        </Chip>
      </div>

      {list.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--card)] px-6 py-12 text-center text-sm text-[var(--ink-soft)]">
          אין שאלות לסינון הזה.
        </p>
      ) : (
        <ol className="space-y-3">
          {list.map((item, index) => (
            <li key={item.id}>
              {item.format === "mc" ? (
                <McQuestion
                  item={item}
                  index={index + 1}
                  pick={picks[item.id]}
                  onPick={(choice) => setPicks((prev) => ({ ...prev, [item.id]: choice }))}
                />
              ) : (
                <OpenQuestion
                  item={item}
                  index={index + 1}
                  revealed={!!openIds[item.id]}
                  onReveal={() => setOpenIds((prev) => ({ ...prev, [item.id]: true }))}
                />
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function McQuestion({
  item,
  index,
  pick,
  onPick,
}: {
  item: PhysioQuestion;
  index: number;
  pick: number | undefined;
  onPick: (choice: number) => void;
}) {
  const answered = pick != null;
  const correct = answered && pick === item.answer;

  return (
    <article className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4">
      <p className="text-[11px] font-semibold tracking-wide text-[var(--accent)]">
        אמריקאי · {index}
      </p>
      <h3 className="mt-1 text-base font-bold leading-snug">{item.promptHe}</h3>
      <div className="mt-3 grid gap-2">
        {item.options?.map((option, i) => {
          const isPick = pick === i;
          const isAnswer = item.answer === i;
          return (
            <button
              key={option}
              type="button"
              disabled={answered}
              onClick={() => onPick(i)}
              className={cn(
                "flex items-start gap-2 rounded-xl border px-3 py-2 text-right text-sm transition",
                !answered && "border-[var(--line)] hover:border-[var(--ink)]",
                answered && isAnswer && "border-[var(--accent-2)] bg-[var(--accent-2)]/10",
                answered && isPick && !isAnswer && "border-[var(--accent)] bg-[var(--accent)]/10",
                answered && !isPick && !isAnswer && "border-[var(--line)] opacity-60",
              )}
            >
              <span className="term mt-0.5 font-bold">{LETTERS[i]}</span>
              <span>{option}</span>
            </button>
          );
        })}
      </div>
      {answered && (
        <p className={cn("mt-3 text-sm font-medium", correct ? "text-[var(--accent-2)]" : "text-[var(--accent)]")}>
          {correct ? "נכון." : `לא. התשובה היא ${LETTERS[item.answer ?? 0]}.`}
          {item.explainHe ? ` ${item.explainHe}` : ""}
        </p>
      )}
    </article>
  );
}

function OpenQuestion({
  item,
  index,
  revealed,
  onReveal,
}: {
  item: PhysioQuestion;
  index: number;
  revealed: boolean;
  onReveal: () => void;
}) {
  return (
    <article className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4">
      <p className="text-[11px] font-semibold tracking-wide text-[var(--accent-2)]">
        שאלה פתוחה · {index}
      </p>
      <h3 className="mt-1 text-base font-bold leading-snug">{item.promptHe}</h3>
      {revealed ? (
        <p className="mt-3 text-sm leading-relaxed">{item.answerHe}</p>
      ) : (
        <button
          type="button"
          onClick={onReveal}
          className="mt-3 rounded-full border border-[var(--line)] px-3 py-1 text-sm font-medium hover:border-[var(--ink)]"
        >
          הצג תשובה
        </button>
      )}
    </article>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-2.5 py-1 text-xs font-medium transition",
        active
          ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
          : "border-[var(--line)] bg-[var(--card)] text-[var(--ink-soft)] hover:border-[var(--ink)]",
      )}
    >
      {children}
    </button>
  );
}
