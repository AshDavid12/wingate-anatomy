"use client";

import { useMemo, useState } from "react";
import { GitFork } from "lucide-react";
import {
  MUSCLE_PARTS,
  searchSplits,
  splitByMuscleId,
  splitsForRegion,
  type MusclePart,
  type SplitMuscle,
} from "@/data/muscle-parts";
import { actionById } from "@/data/planes";
import { REGIONS, REGION_COLORS, type RegionId } from "@/data/regions";
import { AnatomyThumb } from "@/components/anatomy-image";
import { bilingual } from "@/components/name-pair";
import { cn } from "@/lib/utils";

export function MusclePartsView({
  region,
  query,
}: {
  region: RegionId | "all";
  query: string;
}) {
  const [hideOrigin, setHideOrigin] = useState(false);
  const [hideAction, setHideAction] = useState(false);

  const list = useMemo(() => {
    return searchSplits(query, splitsForRegion(region));
  }, [region, query]);

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-sm md:p-5">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--accent)] uppercase">
          Heads and parts · ראשים וחלקים
        </p>
        <h3 className="mt-1 text-xl font-bold">שריר אחד, כמה כיווני משיכה</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed">
          דלתואיד, דו-ראשי ותלת-ראשי מבלבלים כי הם נראים כמו שריר אחד בטבלה. במבחן שואלים על{" "}
          <span className="font-semibold">ראש / חלק</span>: מאיפה הוא מתחיל, ואיזו תנועה שייכת לו.
        </p>
        <p className="term mt-2 max-w-3xl text-xs leading-relaxed text-[var(--ink-soft)]">
          One muscle, several pull directions. Learn the part, not the blurry combined row.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <RuleCard
            n="1"
            titleEn="Origin bone = which joints"
            titleHe="עצם ה-origin = אילו מפרקים"
            bodyEn="If a head starts on the scapula (or pelvis), it can also move the shoulder (or hip). If it starts on the humerus (or femur), it is elbow (or knee) only."
            bodyHe="ראש שמתחיל בשכמה (או באגן) מזיז גם כתף (או ירך). ראש שמתחיל בהומרוס (או בפמור) הוא מרפק (או ברך) בלבד."
          />
          <RuleCard
            n="2"
            titleEn="Side of the origin = the movement"
            titleHe="הצד של ה-origin = התנועה"
            bodyEn="Front pulls forward (flexion). Side pulls out (abduction). Back pulls back (extension). Deltoid is this rule drawn on the shoulder."
            bodyHe="קדמי מושך לפנים (כפיפה). צד מושך החוצה (הרחקה). אחורי מושך אחורה (פשיטה). הדלתואיד הוא הכלל הזה מצויר על הכתף."
          />
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-[var(--ink-soft)]">Hide to practice · הסתר לתרגול:</span>
        <label className="flex items-center gap-1.5">
          <input
            type="checkbox"
            checked={hideOrigin}
            onChange={(e) => setHideOrigin(e.target.checked)}
          />
          Origin
        </label>
        <label className="flex items-center gap-1.5">
          <input
            type="checkbox"
            checked={hideAction}
            onChange={(e) => setHideAction(e.target.checked)}
          />
          Action
        </label>
        <span className="ms-auto text-xs text-[var(--ink-soft)]">
          {list.length} muscles · שרירים
        </span>
      </div>

      {list.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--card)] px-6 py-16 text-center">
          <p className="font-semibold">No matching heads · אין ראשים תואמים</p>
          <p className="mt-1 text-sm text-[var(--ink-soft)]">
            Try another region or search (deltoid, long head, coracoid…). · נסו אזור או חיפוש אחר.
          </p>
        </div>
      ) : (
        list.map((muscle) => (
          <SplitMuscleCard
            key={muscle.id}
            muscle={muscle}
            hideOrigin={hideOrigin}
            hideAction={hideAction}
            showRegion={region === "all"}
          />
        ))
      )}
    </div>
  );
}

function RuleCard({
  n,
  titleEn,
  titleHe,
  bodyEn,
  bodyHe,
}: {
  n: string;
  titleEn: string;
  titleHe: string;
  bodyEn: string;
  bodyHe: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--line)] bg-[var(--paper)]/60 p-3">
      <p className="text-[11px] font-semibold text-[var(--accent)]">
        {n}. {titleHe}
      </p>
      <p className="term mt-0.5 text-xs font-semibold">{titleEn}</p>
      <p className="mt-2 text-sm leading-relaxed">{bodyHe}</p>
      <p className="term mt-1 text-[11px] leading-relaxed text-[var(--ink-soft)]">{bodyEn}</p>
    </div>
  );
}

function SplitMuscleCard({
  muscle,
  hideOrigin,
  hideAction,
  showRegion,
}: {
  muscle: SplitMuscle;
  hideOrigin: boolean;
  hideAction: boolean;
  showRegion: boolean;
}) {
  const region = REGIONS.find((r) => r.id === muscle.region);

  return (
    <article className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-sm">
      <div className="flex flex-col gap-4 border-b border-[var(--line)] p-4 md:flex-row md:items-start md:p-5">
        <AnatomyThumb kind="muscles" id={muscle.id} alt={muscle.nameHe} size="md" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            {showRegion && region && (
              <span
                className={cn(
                  "rounded-full border px-2 py-0.5 text-[11px] font-medium",
                  REGION_COLORS[region.id],
                )}
              >
                {bilingual(region.en, region.he)}
              </span>
            )}
            <span className="rounded-full border border-[var(--line)] px-2 py-0.5 text-[11px]">
              {bilingual(muscle.kindEn, muscle.kindHe)}
            </span>
          </div>
          <h3 className="term mt-2 text-lg font-bold">{muscle.nameEn}</h3>
          <p className="text-sm text-[var(--ink-soft)]">{muscle.nameHe}</p>
          <p className="mt-2 text-sm leading-relaxed">{muscle.ruleHe}</p>
          <p className="term mt-1 text-xs leading-relaxed text-[var(--ink-soft)]">{muscle.ruleEn}</p>
          <div className="mt-3 grid gap-2 text-xs sm:grid-cols-2">
            <p>
              <span className="font-semibold text-[var(--accent)]">Insertion · סיום: </span>
              {bilingual(muscle.sharedInsertionEn, muscle.sharedInsertionHe)}
            </p>
            <p className={cn(hideAction && "hide-study")}>
              <span className="font-semibold text-[var(--accent)]">All heads · כולם: </span>
              {bilingual(muscle.sharedActionEn, muscle.sharedActionHe)}
            </p>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "grid gap-px bg-[var(--line)]",
          muscle.parts.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3",
        )}
      >
        {muscle.parts.map((part) => (
          <PartCell
            key={part.id}
            part={part}
            hideOrigin={hideOrigin}
            hideAction={hideAction}
          />
        ))}
      </div>

      {muscle.noteHe && (
        <p className="border-t border-[var(--line)] bg-[var(--paper-2)] px-4 py-3 text-sm leading-relaxed">
          {muscle.noteHe}
          <span className="term mt-1 block text-xs text-[var(--ink-soft)]">{muscle.noteEn}</span>
        </p>
      )}
    </article>
  );
}

function PartCell({
  part,
  hideOrigin,
  hideAction,
}: {
  part: MusclePart;
  hideOrigin: boolean;
  hideAction: boolean;
}) {
  return (
    <div className="bg-[var(--card)] p-4">
      <div className="flex flex-wrap items-center gap-2">
        <p className="term font-bold">{part.nameEn}</p>
        <span className="text-sm text-[var(--ink-soft)]">{part.nameHe}</span>
        {part.extraJoint && (
          <span className="rounded-full border border-[var(--accent)]/40 bg-[var(--paper-2)] px-2 py-0.5 text-[10px] font-medium text-[var(--accent)]">
            Extra joint · מפרק נוסף
          </span>
        )}
      </div>
      <p className="mt-0.5 text-[11px] text-[var(--ink-soft)]">
        {bilingual(part.sideEn, part.sideHe)}
      </p>

      <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
        Origin · התחלה
      </p>
      <p className={cn("mt-0.5 text-sm leading-snug", hideOrigin && "hide-study")}>
        <span className="term font-semibold">{part.originEn}</span>
        <span className="mt-0.5 block text-xs text-[var(--ink-soft)]">{part.originHe}</span>
      </p>

      <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
        Extra action · תנועה ייחודית
      </p>
      <div className={cn("mt-1", hideAction && "hide-study")}>
        {part.actions.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {part.actions.map((id) => {
              const a = actionById(id);
              return (
                <span
                  key={id}
                  className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-2 py-0.5 text-[11px]"
                >
                  {a ? bilingual(a.en, a.he) : id}
                </span>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-[var(--ink-soft)]">Shared job only · רק העבודה המשותפת</p>
        )}
        {(part.extraHe || part.extraEn) && (
          <p className="mt-1.5 text-xs leading-relaxed text-[var(--ink-soft)]">
            {part.extraHe}
            {part.extraEn ? <span className="term mt-0.5 block">{part.extraEn}</span> : null}
          </p>
        )}
      </div>

      <p className={cn("mt-3 text-xs leading-relaxed", hideAction && hideOrigin && "hide-study")}>
        {part.whyHe}
        <span className="term mt-0.5 block text-[11px] text-[var(--ink-soft)]">{part.whyEn}</span>
      </p>
    </div>
  );
}

export function MusclePartsBox({ muscleId }: { muscleId: string }) {
  const muscle = splitByMuscleId(muscleId);
  if (!muscle) return null;

  return (
    <div className="rounded-xl border border-[var(--accent)]/30 bg-[var(--paper-2)] p-3">
      <div className="flex items-center gap-2">
        <GitFork className="size-3.5 text-[var(--accent)]" />
        <h3 className="text-sm font-bold">Heads / parts · ראשים וחלקים</h3>
      </div>
      <p className="mt-1 text-[11px] leading-relaxed text-[var(--ink-soft)]">{muscle.ruleHe}</p>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full min-w-[480px] text-xs">
          <thead className="text-[10px] uppercase tracking-wide text-[var(--ink-soft)]">
            <tr>
              <th className="py-1 pe-3 text-right font-semibold">Part</th>
              <th className="py-1 pe-3 text-right font-semibold">Origin</th>
              <th className="py-1 text-right font-semibold">Extra action</th>
            </tr>
          </thead>
          <tbody>
            {muscle.parts.map((p) => (
              <tr key={p.id} className="align-top border-t border-[var(--line)]">
                <td className="py-1.5 pe-3">
                  <p className="term font-semibold">{p.nameEn}</p>
                  <p className="text-[var(--ink-soft)]">{p.nameHe}</p>
                </td>
                <td className="py-1.5 pe-3">
                  <p className="term">{p.originEn}</p>
                  <p className="text-[var(--ink-soft)]">{p.originHe}</p>
                </td>
                <td className="py-1.5">
                  {p.actions.length > 0
                    ? p.actions
                        .map((id) => {
                          const a = actionById(id);
                          return a ? bilingual(a.en, a.he) : id;
                        })
                        .join(" · ")
                    : "Shared job only · רק המשותף"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[11px] text-[var(--ink-soft)]">
        All insert on {bilingual(muscle.sharedInsertionEn, muscle.sharedInsertionHe)}.{" "}
        {bilingual(muscle.sharedActionEn, muscle.sharedActionHe)}
      </p>
    </div>
  );
}

export const SPLIT_MUSCLE_COUNT = MUSCLE_PARTS.length;
