"use client";

import { useMemo, useState } from "react";
import { Hash } from "lucide-react";
import { muscles } from "@/data/muscles";
import {
  hooksForMuscle,
  hooksForRegion,
  type OiHook,
  type OiKind,
} from "@/data/oi-mnemonics";
import type { RegionId } from "@/data/regions";
import { bilingual } from "@/components/name-pair";
import { cn } from "@/lib/utils";

const KIND_LABEL: Record<OiKind, { en: string; he: string }> = {
  origin: { en: "Origin", he: "התחלה" },
  insertion: { en: "Insertion", he: "סיום" },
  both: { en: "Origin + Insertion", he: "התחלה + סיום" },
};

export function OiHooksStrip({
  region,
  query = "",
  defaultOpen,
}: {
  region: RegionId | "all";
  query?: string;
  defaultOpen?: boolean;
}) {
  const hooks = useMemo(() => {
    const list = hooksForRegion(region);
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((h) => {
      const names = h.muscleIds
        .map((id) => {
          const m = muscles.find((x) => x.id === id);
          return m ? `${m.nameEn} ${m.nameHe}` : id;
        })
        .join(" ");
      return [h.acronym, h.titleEn, h.titleHe, h.landmarkEn, h.landmarkHe, h.hookEn, h.hookHe, names]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [region, query]);

  const [open, setOpen] = useState(defaultOpen ?? region !== "all");

  if (hooks.length === 0) return null;

  return (
    <section className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Hash className="size-4 text-[var(--accent)]" />
            <h3 className="text-sm font-bold">Memory hooks · קיצורי שינון</h3>
          </div>
          <p className="mt-1 max-w-2xl text-xs text-[var(--ink-soft)]">
            Acronyms and groups for Origin and Insertion — who parks on the same landmark.
            ראשי תיבות וקבוצות ל־Origin ו־Insertion: מי חונה על אותה נקודה.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-medium text-[var(--ink-soft)] hover:border-[var(--ink)]"
        >
          {open ? "Hide · הסתר" : `Show ${hooks.length} · הצג ${hooks.length}`}
        </button>
      </div>

      {!open && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {hooks.map((h) => (
            <button
              key={h.id}
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-full border border-[var(--accent)]/30 bg-[var(--paper-2)] px-2.5 py-1 text-[11px] font-bold"
              title={h.hookEn}
            >
              {h.acronym}
            </button>
          ))}
        </div>
      )}

      {open && (
        <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {hooks.map((h) => (
            <OiHookCard key={h.id} hook={h} />
          ))}
        </div>
      )}
    </section>
  );
}

export function MuscleHookBox({ muscleId }: { muscleId: string }) {
  const hooks = hooksForMuscle(muscleId);
  if (hooks.length === 0) return null;
  return (
    <div className="rounded-xl border border-[var(--accent)]/30 bg-[var(--paper-2)] p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
        Memory hook · קיצור שינון
      </p>
      <div className="mt-2 space-y-3">
        {hooks.map((h) => (
          <OiHookCard key={h.id} hook={h} compact />
        ))}
      </div>
    </div>
  );
}

export function MuscleHookChips({ muscleId }: { muscleId: string }) {
  const hooks = hooksForMuscle(muscleId);
  if (hooks.length === 0) return null;
  return (
    <div className="mt-1 flex flex-wrap gap-1">
      {hooks.map((h) => (
        <span
          key={h.id}
          className="rounded-full border border-[var(--accent)]/25 bg-[var(--paper-2)] px-2 py-0.5 text-[10px] font-bold"
          title={`${h.hookEn} · ${h.hookHe}`}
        >
          {h.acronym}
        </span>
      ))}
    </div>
  );
}

export function OiHookCard({ hook, compact }: { hook: OiHook; compact?: boolean }) {
  const kind = KIND_LABEL[hook.kind];
  return (
    <article
      className={cn(
        "rounded-xl border border-[var(--line)] bg-[var(--paper)]/70",
        compact ? "p-0" : "p-3",
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="term rounded-full bg-[var(--ink)] px-2.5 py-0.5 text-xs font-bold text-[var(--paper)]">
          {hook.acronym}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
          {kind.en} · {kind.he}
        </span>
      </div>
      <h4 className="mt-2 text-sm font-bold leading-snug">{hook.titleEn}</h4>
      <p className="text-xs text-[var(--ink-soft)]">{hook.titleHe}</p>
      <p className="mt-1 text-[11px] font-medium">
        {hook.landmarkEn} <span className="text-[var(--ink-soft)]">· {hook.landmarkHe}</span>
      </p>
      <p className="mt-2 text-xs leading-relaxed">{hook.hookHe}</p>
      <p className="term mt-1 text-[11px] leading-relaxed text-[var(--ink-soft)]">{hook.hookEn}</p>
      {!compact && (
        <>
          <p className="mt-2 text-[11px] leading-relaxed text-[var(--ink-soft)]">{hook.detailHe}</p>
          <p className="term mt-1 text-[11px] leading-relaxed text-[var(--ink-soft)]">{hook.detailEn}</p>
          <HookMembers ids={hook.muscleIds} />
        </>
      )}
      {compact && <HookMembers ids={hook.muscleIds} />}
    </article>
  );
}

function HookMembers({ ids }: { ids: string[] }) {
  return (
    <p className="mt-2 text-[11px] leading-relaxed text-[var(--ink-soft)]">
      {ids
        .map((id) => {
          const m = muscles.find((x) => x.id === id);
          return m ? bilingual(m.nameEn, m.nameHe) : id;
        })
        .join(" · ")}
    </p>
  );
}

