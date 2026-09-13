"use client";

import { useMemo, useState } from "react";
import {
  LANDMARK_REGIONS,
  examLandmarks,
  landmarks,
  searchLandmarks,
  type Landmark,
  type LandmarkRegionId,
} from "@/data/landmarks";
import { bones } from "@/data/bones";
import { anatomyImage, type AnatomyKind } from "@/data/anatomy-images";
import { AnatomyLightbox, AnatomyThumb } from "@/components/anatomy-image";
import { EmptyState } from "@/components/muscle-table";
import { NamePair } from "@/components/name-pair";
import { cn } from "@/lib/utils";

function boneName(id: string) {
  const b = bones.find((x) => x.id === id);
  return b ? `${b.nameEn} · ${b.nameHe}` : id;
}

function imageRef(l: Landmark): { kind: AnatomyKind; id: string } {
  if (anatomyImage("landmarks", l.id)) return { kind: "landmarks", id: l.id };
  return { kind: "bones", id: l.boneId };
}

export function LandmarksView({ query }: { query: string }) {
  const [region, setRegion] = useState<LandmarkRegionId | "all">("all");
  const [examOnly, setExamOnly] = useState(true);
  const [hideNames, setHideNames] = useState(false);
  const [open, setOpen] = useState<Landmark | null>(null);

  const list = useMemo(() => {
    let items = searchLandmarks(query, examOnly ? examLandmarks : landmarks);
    if (region !== "all") items = items.filter((l) => l.region === region);
    return items;
  }, [query, region, examOnly]);

  if (list.length === 0) {
    return <EmptyState title="No matching landmarks · אין חלקי עצם תואמים" body="Try a name, location, or bone — e.g. acromion, ASIS, זיז." />;
  }

  return (
    <div>
      <p className="mb-3 text-sm text-[var(--ink-soft)]">
        Bone landmarks from the slides — name, location, and view. The figure marks the part (usually in red). Check «Hide names» and practice ID like the exam.
        חלקי העצם מהמצגות — שם, מיקום ומבט. סמנו «הסתר שמות» ותרגלו זיהוי כמו במבחן.
      </p>

      <div className="mb-3 flex flex-wrap gap-1.5">
        <FilterChip active={region === "all"} onClick={() => setRegion("all")}>
          All · הכל ({(examOnly ? examLandmarks : landmarks).length})
        </FilterChip>
        {LANDMARK_REGIONS.map((r) => {
          const n = (examOnly ? examLandmarks : landmarks).filter((l) => l.region === r.id).length;
          return (
            <FilterChip key={r.id} active={region === r.id} onClick={() => setRegion(r.id)}>
              <span className="term font-bold">{r.en}</span>
              <span className="font-normal"> · {r.he}</span> ({n})
            </FilterChip>
          );
        })}
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
        <label className="flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--card)] px-3 py-1.5">
          <input type="checkbox" checked={examOnly} onChange={(e) => setExamOnly(e.target.checked)} />
          Core slides only · ליבת המצגות בלבד
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--card)] px-3 py-1.5">
          <input type="checkbox" checked={hideNames} onChange={(e) => setHideNames(e.target.checked)} />
          Hide names to practice · הסתר שמות לתרגול
        </label>
        <span className="ms-auto text-xs text-[var(--ink-soft)]">Showing {list.length} parts · מוצגים {list.length} חלקים</span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {list.map((l) => {
          const img = imageRef(l);
          const regionMeta = LANDMARK_REGIONS.find((r) => r.id === l.region);
          return (
            <button
              key={l.id}
              type="button"
              onClick={() => setOpen(l)}
              className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] text-right shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <AnatomyThumb
                kind={img.kind}
                id={img.id}
                alt={hideNames ? "Bone landmark" : l.nameEn}
                size="lg"
                className="rounded-none border-0 shadow-none"
                interactive={false}
              />
              <div className="px-3 py-2">
                <NamePair
                  en={l.nameEn}
                  he={l.nameHe}
                  hide={hideNames}
                  enClassName="line-clamp-1 text-sm"
                  heClassName="line-clamp-1 text-[11px]"
                />
                <p className={cn("mt-1 line-clamp-2 text-[11px] text-[var(--ink-soft)]", hideNames && "hide-study")}>
                  {l.locationHe}
                </p>
                <span className="mt-1 inline-block rounded-full border border-[var(--line)] bg-[var(--paper-2)] px-2 py-0.5 text-[10px]">
                  {regionMeta ? `${regionMeta.en} · ${regionMeta.he}` : l.region}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {open && (
        <AnatomyLightbox
          open
          onClose={() => setOpen(null)}
          kind={imageRef(open).kind}
          id={imageRef(open).id}
          title={open.nameEn}
          subtitle={open.nameHe}
        >
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
                Location · מיקום
              </dt>
              <dd className="mt-0.5">{open.locationHe}</dd>
            </div>
            {open.viewHe && (
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
                  View · מבט
                </dt>
                <dd className="mt-0.5">{open.viewHe}</dd>
              </div>
            )}
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
                Bone · עצם
              </dt>
              <dd className="mt-0.5">{boneName(open.boneId)}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
                Region · אזור
              </dt>
              <dd className="mt-0.5">
                <NamePair
                  en={LANDMARK_REGIONS.find((r) => r.id === open.region)?.en}
                  he={LANDMARK_REGIONS.find((r) => r.id === open.region)?.he}
                  stacked={false}
                />
              </dd>
            </div>
          </dl>
          {open.note && <p className="mt-3 text-sm leading-relaxed">{open.note}</p>}
          {open.optional && (
            <p className="mt-2 text-xs text-[var(--ink-soft)]">On the slides: no need to memorize. · במצגות: אין צורך לזכור בעל-פה.</p>
          )}
        </AnatomyLightbox>
      )}
    </div>
  );
}

function FilterChip({
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
