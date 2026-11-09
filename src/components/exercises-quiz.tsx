"use client";

import { useEffect, useMemo, useState } from "react";
import {
  EXERCISE_QUESTIONS,
  QUIZ_GROUPS,
  type ExerciseQuestion,
  type QuizFormat,
  type QuizGroupId,
} from "@/data/exercises/quiz";
import { cn } from "@/lib/utils";

const LETTERS = ["א", "ב", "ג", "ד"] as const;

export function ExercisesQuiz({ query }: { query: string }) {
  const [group, setGroup] = useState<QuizGroupId | "all">("all");
  const [format, setFormat] = useState<QuizFormat | "all">("all");
  const [order, setOrder] = useState<string[] | null>(null);
  const [index, setIndex] = useState(0);
  const [picks, setPicks] = useState<Record<string, number>>({});
  const [skipped, setSkipped] = useState<Record<string, true>>({});
  const [onlySkipped, setOnlySkipped] = useState(false);

  const pool = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = EXERCISE_QUESTIONS.filter((item) => {
      if (group !== "all" && item.group !== group) return false;
      if (format !== "all" && item.format !== format) return false;
      if (!q) return true;
      return [item.prompt, item.explain, ...item.options].join(" ").toLowerCase().includes(q);
    });
    if (!order) return filtered;
    const rank = new Map(order.map((id, place) => [id, place]));
    return [...filtered].sort((a, b) => (rank.get(a.id) ?? 0) - (rank.get(b.id) ?? 0));
  }, [query, group, format, order]);

  const list = useMemo(
    () => (onlySkipped ? pool.filter((item) => skipped[item.id]) : pool),
    [pool, onlySkipped, skipped],
  );

  useEffect(() => {
    setIndex(0);
  }, [query, group, format, order, onlySkipped]);

  const safeIndex = list.length === 0 ? 0 : Math.min(index, list.length - 1);
  const item = list[safeIndex];
  const answered = pool.filter((question) => picks[question.id] != null);
  const correct = answered.filter((question) => picks[question.id] === question.answer).length;
  const skippedCount = Object.keys(skipped).length;

  function skipCurrent() {
    if (!item || picks[item.id] != null) return;
    const id = item.id;
    setSkipped((prev) => ({ ...prev, [id]: true }));
    setIndex(safeIndex >= list.length - 1 ? safeIndex : safeIndex + 1);
  }

  function shuffle() {
    const ids = EXERCISE_QUESTIONS.map((question) => question.id);
    for (let i = ids.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    setOrder(ids);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">חידון · Quiz</h2>
          <p className="mt-1 max-w-3xl text-sm text-[var(--ink-soft)]">
            נכון או לא, ואמריקאי. אותן עובדות ששואלים עליהן כשמבקשים להדגים: מי האגוניסט, איזו
            שרשרת, ואיפה המומנט.
          </p>
        </div>
        <p className="text-xs text-[var(--ink-soft)]">
          <span className="term">{correct}</span> נכונות מתוך <span className="term">{answered.length}</span> שנענו
          {skippedCount > 0 && (
            <>
              {" · "}
              <span className="term">{skippedCount}</span> דילוגים
            </>
          )}
        </p>
      </div>

      <div className="no-print flex flex-wrap gap-1.5">
        <Chip active={group === "all"} onClick={() => setGroup("all")}>
          הכל
        </Chip>
        {QUIZ_GROUPS.map((item) => (
          <Chip key={item.id} active={group === item.id} onClick={() => setGroup(item.id)}>
            {item.he}
          </Chip>
        ))}
      </div>
      <div className="no-print flex flex-wrap items-center gap-1.5">
        <Chip active={format === "all"} onClick={() => setFormat("all")}>
          הכל ({list.length})
        </Chip>
        <Chip active={format === "yn"} onClick={() => setFormat("yn")}>
          נכון או לא
        </Chip>
        <Chip active={format === "mc"} onClick={() => setFormat("mc")}>
          אמריקאי
        </Chip>
        <button
          type="button"
          onClick={shuffle}
          className="rounded-full border border-[var(--line)] bg-[var(--card)] px-3 py-1 text-xs font-medium"
        >
          ערבב
        </button>
        {skippedCount > 0 && (
          <Chip active={onlySkipped} onClick={() => setOnlySkipped((value) => !value)}>
            שדילגתי ({skippedCount})
          </Chip>
        )}
        <button
          type="button"
          onClick={() => {
            setPicks({});
            setSkipped({});
            setOnlySkipped(false);
          }}
          className="rounded-full border border-[var(--line)] bg-[var(--card)] px-3 py-1 text-xs font-medium"
        >
          אפס תשובות
        </button>
      </div>

      {list.length === 0 || !item ? (
        <p className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--card)] px-6 py-12 text-center text-sm text-[var(--ink-soft)]">
          אין שאלות לסינון הזה.
        </p>
      ) : (
        <QuestionCard
          item={item}
          index={safeIndex}
          total={list.length}
          pick={picks[item.id]}
          skipped={Boolean(skipped[item.id]) && picks[item.id] == null}
          onPick={(choice) => {
            const id = item.id;
            const wasLastSkip = Boolean(skipped[id]) && skippedCount <= 1;
            setPicks((prev) => ({ ...prev, [id]: choice }));
            setSkipped((prev) => {
              if (!prev[id]) return prev;
              const next = { ...prev };
              delete next[id];
              return next;
            });
            if (wasLastSkip) setOnlySkipped(false);
          }}
          onPrev={() => setIndex(Math.max(0, safeIndex - 1))}
          onNext={() => setIndex(Math.min(list.length - 1, safeIndex + 1))}
          onSkip={skipCurrent}
        />
      )}
    </div>
  );
}

function QuestionCard({
  item,
  index,
  total,
  pick,
  skipped,
  onPick,
  onPrev,
  onNext,
  onSkip,
}: {
  item: ExerciseQuestion;
  index: number;
  total: number;
  pick: number | undefined;
  skipped: boolean;
  onPick: (choice: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onSkip: () => void;
}) {
  const answered = pick != null;
  const right = answered && pick === item.answer;
  const group = QUIZ_GROUPS.find((entry) => entry.id === item.group)?.he;

  return (
    <article className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] font-semibold text-[var(--accent)]">
          {item.format === "yn" ? "נכון או לא" : "אמריקאי"}
          {" · "}
          {group}
        </p>
        <p className="term text-xs text-[var(--ink-soft)]">
          {index + 1} / {total}
        </p>
      </div>
      <h3 className="mt-2 text-lg font-bold leading-snug">{pinNumbers(item.prompt)}</h3>
      {skipped && <p className="mt-2 text-sm text-[var(--ink-soft)]">דילגת על השאלה. אפשר לענות עכשיו.</p>}
      <div className={cn("mt-4 grid gap-2", item.format === "yn" && "sm:grid-cols-2")}>
        {item.options.map((option, i) => {
          const isPick = pick === i;
          const isAnswer = item.answer === i;
          return (
            <button
              key={option}
              type="button"
              disabled={answered}
              onClick={() => onPick(i)}
              className={cn(
                "flex items-start gap-2 rounded-xl border px-3 py-2.5 text-right text-sm transition",
                !answered && "border-[var(--line)] hover:border-[var(--ink)]",
                answered && isAnswer && "border-[var(--accent-2)] bg-[var(--accent-2)]/10",
                answered && isPick && !isAnswer && "border-[var(--accent)] bg-[var(--accent)]/10",
                answered && !isPick && !isAnswer && "border-[var(--line)] opacity-60",
              )}
            >
              {item.format === "mc" && <span className="term mt-0.5 font-bold">{LETTERS[i]}</span>}
              <span>{pinNumbers(option)}</span>
            </button>
          );
        })}
      </div>
      {answered && (
        <p className={cn("mt-4 text-sm leading-relaxed", right ? "text-[var(--accent-2)]" : "text-[var(--accent)]")}>
          <span className="font-semibold">{right ? "נכון." : "לא."}</span> {pinNumbers(item.explain)}
        </p>
      )}
      <div className="no-print mt-5 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={index === 0}
          className="rounded-full border border-[var(--line)] px-4 py-1.5 text-sm font-semibold disabled:opacity-40"
        >
          הקודמת
        </button>
        <button
          type="button"
          onClick={onSkip}
          disabled={answered}
          className="rounded-full border border-[var(--line)] px-4 py-1.5 text-sm font-semibold disabled:opacity-40"
        >
          דלג
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={index >= total - 1}
          className="rounded-full bg-[var(--ink)] px-4 py-1.5 text-sm font-semibold text-[var(--paper)] disabled:opacity-40"
        >
          הבאה
        </button>
      </div>
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
        "rounded-full border px-3 py-1 text-xs font-medium transition",
        active
          ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
          : "border-[var(--line)] bg-[var(--card)] text-[var(--ink)]",
      )}
    >
      {children}
    </button>
  );
}

function pinNumbers(value: string) {
  return value.replace(
    /[+\u00d7]?\d[\d,.]*(?:\s*[–\-−/]\s*[+\u00d7]?\d[\d,.]*)*%?/g,
    (match) => `\u200E${match}\u200E`,
  );
}
