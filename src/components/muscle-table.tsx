"use client";

import { useState } from "react";
import type { Muscle } from "@/data/types";
import { REGIONS, REGION_COLORS } from "@/data/regions";
import { AnatomyLightbox, AnatomyThumb } from "@/components/anatomy-image";
import { anatomyImage } from "@/data/anatomy-images";
import { similarMuscles } from "@/data/cross";
import { MUSCLE_TAGS } from "@/data/muscle-tags";
import { actionById } from "@/data/planes";
import { PlaneBadge } from "@/components/planes-view";
import { JOINT_TAGS } from "@/data/muscle-tags";
import { cn } from "@/lib/utils";

type Hidden = { o: boolean; i: boolean; a: boolean };

export function MuscleTable({
  muscles,
  hidden,
  regionBannerId,
}: {
  muscles: Muscle[];
  hidden: Hidden;
  regionBannerId?: string;
}) {
  const [open, setOpen] = useState<Muscle | null>(null);
  const [regionOpen, setRegionOpen] = useState(false);

  if (muscles.length === 0) {
    return (
      <EmptyState title="אין שרירים תואמים" body="נסו מילת חיפוש אחרת או אפסו את הסינון." />
    );
  }

  return (
    <>
      {regionBannerId && anatomyImage("regions", regionBannerId) && (
        <div className="mb-4 overflow-hidden rounded-2xl border border-[var(--line)] bg-white">
          <AnatomyThumb
            kind="regions"
            id={regionBannerId}
            alt="איור אזור"
            size="hero"
            className="rounded-none border-0"
            onOpen={() => setRegionOpen(true)}
          />
        </div>
      )}

      <div className="hidden overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-sm md:block">
        <table className="w-full text-sm">
          <thead className="bg-[var(--paper-2)] text-right text-xs uppercase tracking-wide text-[var(--ink-soft)]">
            <tr>
              <th className="px-4 py-3 font-semibold">שריר</th>
              <th className="px-4 py-3 font-semibold">
                Origin <span className="font-normal">התחלה</span>
              </th>
              <th className="px-4 py-3 font-semibold">
                Insertion <span className="font-normal">סיום</span>
              </th>
              <th className="px-4 py-3 font-semibold">
                Action <span className="font-normal">תנועה</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {muscles.map((m) => (
              <tr
                key={m.id}
                className="cursor-pointer border-t border-[var(--line)] align-top even:bg-[var(--paper)]/50 hover:bg-[var(--paper-2)]/80"
                onClick={() => setOpen(m)}
              >
                <td className="px-4 py-3">
                  <div className="flex items-start gap-3">
                    <AnatomyThumb
                      kind="muscles"
                      id={m.id}
                      alt={m.nameHe}
                      size="sm"
                      onOpen={() => setOpen(m)}
                    />
                    <MuscleName m={m} />
                  </div>
                </td>
                <td className={cn("px-4 py-3", hidden.o && "hide-study")}>
                  <p>{m.originHe}</p>
                  <p className="term mt-1 text-xs text-[var(--ink-soft)]">{m.originEn}</p>
                </td>
                <td className={cn("px-4 py-3", hidden.i && "hide-study")}>
                  <p>{m.insertionHe}</p>
                  <p className="term mt-1 text-xs text-[var(--ink-soft)]">{m.insertionEn}</p>
                </td>
                <td className={cn("px-4 py-3", hidden.a && "hide-study")}>
                  <p>{m.actionHe}</p>
                  <p className="term mt-1 text-xs text-[var(--ink-soft)]">{m.actionEn}</p>
                  {m.innervation && (
                    <p className="mt-1 text-[11px] text-[var(--ink-soft)]">עצבוב: {m.innervation}</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 md:hidden">
        {muscles.map((m) => (
          <article
            key={m.id}
            className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-sm"
          >
            <AnatomyThumb
              kind="muscles"
              id={m.id}
              alt={m.nameHe}
              size="lg"
              className="rounded-none border-0"
              onOpen={() => setOpen(m)}
            />
            <button type="button" className="w-full p-4 text-right" onClick={() => setOpen(m)}>
              <MuscleName m={m} />
              <Field label="Origin · התחלה" hidden={hidden.o} he={m.originHe} en={m.originEn} />
              <Field label="Insertion · סיום" hidden={hidden.i} he={m.insertionHe} en={m.insertionEn} />
              <Field label="Action · תנועה" hidden={hidden.a} he={m.actionHe} en={m.actionEn} />
              {m.innervation && (
                <p className="mt-2 text-xs text-[var(--ink-soft)]">עצבוב: {m.innervation}</p>
              )}
              {m.notes && <p className="mt-2 text-xs text-[var(--accent)]">{m.notes}</p>}
            </button>
          </article>
        ))}
      </div>

      {regionOpen && regionBannerId && (
        <AnatomyLightbox
          open
          onClose={() => setRegionOpen(false)}
          kind="regions"
          id={regionBannerId}
          title={REGIONS.find((r) => r.id === regionBannerId)?.he ?? "אזור"}
          subtitle={REGIONS.find((r) => r.id === regionBannerId)?.en}
        />
      )}
      {open && (
        <AnatomyLightbox
          open
          onClose={() => setOpen(null)}
          kind="muscles"
          id={open.id}
          title={open.nameHe}
          subtitle={open.nameEn}
        >
          <div className="grid gap-3 text-sm md:grid-cols-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
                Origin
              </p>
              <p>{open.originHe}</p>
              <p className="term mt-1 text-xs text-[var(--ink-soft)]">{open.originEn}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
                Insertion
              </p>
              <p>{open.insertionHe}</p>
              <p className="term mt-1 text-xs text-[var(--ink-soft)]">{open.insertionEn}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
                Action
              </p>
              <p>{open.actionHe}</p>
              <p className="term mt-1 text-xs text-[var(--ink-soft)]">{open.actionEn}</p>
            </div>
          </div>
          <RelatedMuscles muscleId={open.id} />
        </AnatomyLightbox>
      )}
    </>
  );
}

function MuscleName({ m }: { m: Muscle }) {
  const region = REGIONS.find((r) => r.id === m.region);
  const tags = MUSCLE_TAGS[m.id];
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-bold">{m.nameHe}</span>
        {!m.core && (
          <span className="rounded-full border border-[var(--line)] px-2 py-0.5 text-[10px] text-[var(--ink-soft)]">
            הרחבה
          </span>
        )}
      </div>
      <p className="term text-xs text-[var(--ink-soft)]">{m.nameEn}</p>
      <div className="mt-1 flex flex-wrap gap-1">
        {region && (
          <span
            className={cn(
              "inline-block rounded-full border px-2 py-0.5 text-[10px] font-medium",
              REGION_COLORS[m.region],
            )}
          >
            {region.he}
          </span>
        )}
        {tags?.joints.slice(0, 2).map((j) => (
          <span key={j} className="rounded-full border border-[var(--line)] px-2 py-0.5 text-[10px]">
            {JOINT_TAGS.find((x) => x.id === j)?.he}
          </span>
        ))}
        {[
          ...new Set(
            (tags?.actions ?? [])
              .map((a) => actionById(a)?.plane)
              .filter((p): p is NonNullable<typeof p> => Boolean(p)),
          ),
        ].map((p) => (
          <PlaneBadge key={p} plane={p} />
        ))}
      </div>
    </div>
  );
}

function Field({
  label,
  he,
  en,
  hidden,
}: {
  label: string;
  he: string;
  en: string;
  hidden: boolean;
}) {
  return (
    <div className="mt-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
        {label}
      </p>
      <div className={cn(hidden && "hide-study")}>
        <p className="mt-0.5 text-sm">{he}</p>
        <p className="term text-xs text-[var(--ink-soft)]">{en}</p>
      </div>
    </div>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--card)] px-6 py-16 text-center">
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm text-[var(--ink-soft)]">{body}</p>
    </div>
  );
}

function RelatedMuscles({ muscleId }: { muscleId: string }) {
  const hits = similarMuscles(muscleId, 6);
  if (hits.length === 0) return null;
  return (
    <div className="mt-4">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
        הצלבה · שרירים קשורים
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {hits.map((h) => (
          <span
            key={h.muscle.id}
            className="rounded-full bg-[var(--paper-2)] px-2.5 py-1 text-[11px]"
            title={h.reasons.join(" · ")}
          >
            {h.muscle.nameHe}
            <span className="text-[var(--ink-soft)]"> — {h.reasons[0]}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
