"use client";

import { useEffect, useMemo, useState } from "react";
import type { Muscle } from "@/data/types";
import { DICTIONARY_TOPICS, dictionaryTerms, searchDictionary } from "@/data/dictionary";
import { EmptyState } from "@/components/muscle-table";
import { AnatomyThumb } from "@/components/anatomy-image";
import { cn } from "@/lib/utils";

export function Flashcards({
  muscles,
  deck,
  query = "",
}: {
  muscles: Muscle[];
  deck: "muscles" | "dictionary";
  query?: string;
}) {
  if (deck === "dictionary") {
    return <DictionaryCards query={query} />;
  }
  return <MuscleCards muscles={muscles} />;
}

function MuscleCards({ muscles }: { muscles: Muscle[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());

  useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [muscles]);

  if (muscles.length === 0) {
    return <EmptyState title="אין כרטיסיות" body="שנו את הסינון כדי לראות שרירים." />;
  }

  const i = index % muscles.length;
  const m = muscles[i];
  if (!m) {
    return <EmptyState title="אין כרטיסיות" body="שנו את הסינון כדי לראות שרירים." />;
  }
  const progress = known.size;

  function next(delta: number) {
    setFlipped(false);
    setIndex((n) => (n + delta + muscles.length) % muscles.length);
  }

  function markKnown() {
    setKnown((s) => new Set(s).add(m.id));
    next(1);
  }

  return (
    <div className="mx-auto max-w-xl">
      <p className="mb-3 text-center text-sm text-[var(--ink-soft)]">
        כרטיס {i + 1} מתוך {muscles.length} · סימנתם כ״יודע״ {progress}
      </p>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className={cn(
          "min-h-[320px] w-full rounded-3xl border border-[var(--line)] p-6 text-right shadow-md transition",
          flipped ? "bg-[var(--ink)] text-[var(--paper)]" : "bg-[var(--card)]",
        )}
      >
        {!flipped ? (
          <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">שריר</p>
            <AnatomyThumb
              kind="muscles"
              id={m.id}
              alt={m.nameHe}
              size="md"
              className="mx-auto mt-4"
              interactive={false}
            />
            <h2 className="mt-3 text-3xl font-bold">{m.nameHe}</h2>
            <p className="term mt-2 text-lg opacity-70">{m.nameEn}</p>
            <p className="mt-6 text-sm opacity-60">לחצו לחשיפת Origin · Insertion · Action</p>
          </div>
        ) : (
          <div className="space-y-4 text-sm leading-relaxed">
            <div className="flex items-start gap-3">
              <AnatomyThumb
                kind="muscles"
                id={m.id}
                alt={m.nameHe}
                size="sm"
                className="border-[var(--ink-soft)]/30"
                interactive={false}
              />
              <h2 className="text-xl font-bold">
                {m.nameHe}{" "}
                <span className="term text-base font-normal opacity-70">· {m.nameEn}</span>
              </h2>
            </div>
            <Block label="Origin" he={m.originHe} en={m.originEn} />
            <Block label="Insertion" he={m.insertionHe} en={m.insertionEn} />
            <Block label="Action" he={m.actionHe} en={m.actionEn} />
          </div>
        )}
      </button>
      <CardNav onPrev={() => next(-1)} onNext={() => next(1)} onKnown={markKnown} />
    </div>
  );
}

function DictionaryCards({ query }: { query: string }) {
  const [topic, setTopic] = useState<string | "all">("all");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());

  const terms = useMemo(() => {
    const list = searchDictionary(query);
    return topic === "all" ? list : list.filter((t) => t.topic === topic);
  }, [query, topic]);

  useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [query, topic, terms.length]);

  if (terms.length === 0) {
    return <EmptyState title="אין כרטיסיות" body="שנו את החיפוש או נושא המילון." />;
  }

  const i = index % terms.length;
  const t = terms[i];
  if (!t) {
    return <EmptyState title="אין כרטיסיות" body="שנו את החיפוש או נושא המילון." />;
  }

  function next(delta: number) {
    setFlipped(false);
    setIndex((n) => (n + delta + terms.length) % terms.length);
  }

  function markKnown() {
    setKnown((s) => new Set(s).add(t.id));
    next(1);
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-4 flex flex-wrap justify-center gap-1.5">
        <TopicChip active={topic === "all"} onClick={() => setTopic("all")}>
          הכל ({searchDictionary(query).length})
        </TopicChip>
        {DICTIONARY_TOPICS.map((tp) => {
          const n = searchDictionary(query).filter((x) => x.topic === tp).length;
          if (n === 0) return null;
          return (
            <TopicChip key={tp} active={topic === tp} onClick={() => setTopic(tp)}>
              {tp}
            </TopicChip>
          );
        })}
      </div>
      <p className="mb-3 text-center text-sm text-[var(--ink-soft)]">
        כרטיס {i + 1} מתוך {terms.length} · סימנתם כ״יודע״ {known.size}
        <span className="mx-1">·</span>
        {dictionaryTerms.length} מונחים במילון
      </p>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className={cn(
          "min-h-[320px] w-full rounded-3xl border border-[var(--line)] p-6 text-right shadow-md transition",
          flipped ? "bg-[var(--ink)] text-[var(--paper)]" : "bg-[var(--card)]",
        )}
      >
        {!flipped ? (
          <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">{t.topic}</p>
            <h2 className="mt-4 text-3xl font-bold">{t.he}</h2>
            {t.en && <p className="term mt-2 text-lg opacity-70">{t.en}</p>}
            <p className="mt-6 text-sm opacity-60">לחצו לחשיפת ההגדרה</p>
          </div>
        ) : (
          <div className="flex h-full min-h-[280px] flex-col justify-center text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">
              {t.topic}
            </p>
            <h2 className="mt-2 text-2xl font-bold">
              {t.he}
              {t.en && <span className="term text-lg font-normal opacity-70"> · {t.en}</span>}
            </h2>
            <p className="mt-6 text-base leading-relaxed">{t.definition}</p>
          </div>
        )}
      </button>
      <CardNav onPrev={() => next(-1)} onNext={() => next(1)} onKnown={markKnown} />
    </div>
  );
}

function CardNav({
  onPrev,
  onNext,
  onKnown,
}: {
  onPrev: () => void;
  onNext: () => void;
  onKnown: () => void;
}) {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-2 no-print">
      <button
        type="button"
        onClick={onPrev}
        className="rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-2 text-sm"
      >
        הקודם
      </button>
      <button
        type="button"
        onClick={onNext}
        className="rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-2 text-sm"
      >
        הבא
      </button>
      <button
        type="button"
        onClick={onKnown}
        className="rounded-full bg-[var(--accent-2)] px-4 py-2 text-sm text-white"
      >
        יודע ✓
      </button>
    </div>
  );
}

function Block({ label, he, en }: { label: string; he: string; en: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">{label}</p>
      <p className="mt-0.5">{he}</p>
      <p className="term mt-0.5 text-xs opacity-70">{en}</p>
    </div>
  );
}

function TopicChip({
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
