"use client";

import { useState } from "react";
import type { Muscle } from "@/data/types";
import { EmptyState } from "@/components/muscle-table";
import { AnatomyThumb } from "@/components/anatomy-image";
import { cn } from "@/lib/utils";

export function Flashcards({ muscles }: { muscles: Muscle[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());

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
      <div className="mt-4 flex flex-wrap justify-center gap-2 no-print">
        <button
          type="button"
          onClick={() => next(-1)}
          className="rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-2 text-sm"
        >
          הקודם
        </button>
        <button
          type="button"
          onClick={() => next(1)}
          className="rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-2 text-sm"
        >
          הבא
        </button>
        <button
          type="button"
          onClick={markKnown}
          className="rounded-full bg-[var(--accent-2)] px-4 py-2 text-sm text-white"
        >
          יודע ✓
        </button>
      </div>
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
