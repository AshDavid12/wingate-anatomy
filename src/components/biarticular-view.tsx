"use client";

import { useMemo, useState } from "react";
import { Split } from "lucide-react";
import { muscles } from "@/data/muscles";
import {
  BIARTICULAR_COUNT,
  biarticularGroupsForRegion,
  biarticularOf,
  searchBiarticularGroups,
  type BiarticularGroup,
  type BiarticularMuscle,
} from "@/data/biarticular";
import { JOINT_TAGS } from "@/data/muscle-tags";
import { actionById, type ActionId } from "@/data/planes";
import { type RegionId } from "@/data/regions";
import { AnatomyThumb } from "@/components/anatomy-image";
import { bilingual, NamePair } from "@/components/name-pair";
import { cn } from "@/lib/utils";

export function BiarticularView({
  region,
  query,
}: {
  region: RegionId | "all";
  query: string;
}) {
  const [hideAt, setHideAt] = useState(false);

  const groups = useMemo(() => {
    return searchBiarticularGroups(query, biarticularGroupsForRegion(region));
  }, [region, query]);

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-sm md:p-5">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--accent)] uppercase">
          Rule 2 · כלל 2
        </p>
        <h3 className="mt-1 text-xl font-bold">Biarticular muscles · שרירים דו-מפרקיים</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed">
          שריר מזיז רק מפרק שהוא חוצה. חוצה אחד = פעולה אחת. חוצה שניים = יכול להזיז את שניהם —
          ולפעמים פעולות הפוכות (כמו Rectus femoris: כפיפת ירך + פשיטת ברך).
        </p>
        <p className="term mt-2 max-w-3xl text-xs leading-relaxed text-[var(--ink-soft)]">
          A muscle only moves a joint it crosses. One joint = one job. Two joints = both can move —
          sometimes opposite actions (rectus femoris flexes the hip and extends the knee).
        </p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--ink-soft)]">
          ראש שמתחיל דיסטלית למפרק הקרוב אינו דו-מפרקי: הראש הקצר של ההמסטרינג, הראשים הלטרלי
          והמדיאלי של התלת-ראשי, שלושת ה-vastus, והסוליה.
        </p>
      </section>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-[var(--ink-soft)]">Hide to practice · הסתר לתרגול:</span>
        <label className="flex items-center gap-1.5">
          <input
            type="checkbox"
            checked={hideAt}
            onChange={(e) => setHideAt(e.target.checked)}
          />
          Joints &amp; actions · מפרקים ותנועות
        </label>
        <span className="ms-auto text-xs text-[var(--ink-soft)]">
          {groups.reduce((n, g) => n + g.muscles.length, 0)} / {BIARTICULAR_COUNT} muscles · שרירים
        </span>
      </div>

      {groups.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--card)] px-6 py-16 text-center">
          <p className="font-semibold">No matching biarticular muscles · אין שרירים דו-מפרקיים תואמים</p>
          <p className="mt-1 text-sm text-[var(--ink-soft)]">Try another region or search. · נסו אזור או חיפוש אחר.</p>
        </div>
      ) : (
        groups.map((group) => (
          <GroupCard key={group.id} group={group} hideAt={hideAt} />
        ))
      )}
    </div>
  );
}

export function BiarticularWhyList({ region }: { region: RegionId | "all" }) {
  const groups = biarticularGroupsForRegion(region);
  if (groups.length === 0) return null;
  return (
    <section className="space-y-3">
      <div>
        <h3 className="text-lg font-bold">The biarticular list · רשימת הדו-מפרקיים</h3>
        <p className="mt-1 text-sm text-[var(--ink-soft)]">
          Memorize the pairs. Then deduce the action at each joint from the side.
          משננים את הזוגות. אחר כך מסיקים את התנועה בכל מפרק מהצד.
        </p>
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        {groups.map((group) => (
          <article
            key={group.id}
            className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-sm"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
              Crosses · חוצה
            </p>
            <h4 className="term mt-0.5 font-bold">{group.pairEn}</h4>
            <p className="text-sm text-[var(--ink-soft)]">{group.pairHe}</p>
            <ul className="mt-3 space-y-2">
              {group.muscles.map((row) => {
                const m = muscles.find((x) => x.id === row.muscleId);
                if (!m) return null;
                return (
                  <li key={row.muscleId} className="flex items-start gap-2 text-sm">
                    <AnatomyThumb
                      kind="muscles"
                      id={m.id}
                      alt=""
                      size="sm"
                      className="!h-10 !w-10"
                      interactive={false}
                    />
                    <div className="min-w-0">
                      <p className="term font-semibold">
                        {m.nameEn}
                        {row.headEn ? ` — ${row.headEn}` : ""}
                      </p>
                      <p className="text-xs text-[var(--ink-soft)]">
                        {m.nameHe}
                        {row.headHe ? ` — ${row.headHe}` : ""}
                      </p>
                      <p className="mt-0.5 text-[11px] text-[var(--accent)]">
                        {row.at.map((slot) => atLabel(slot.joint, slot.actions)).join(" · ")}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export function MuscleBiarticularBox({ muscleId }: { muscleId: string }) {
  const row = biarticularOf(muscleId);
  const m = muscles.find((x) => x.id === muscleId);
  if (!row || !m) return null;
  return (
    <div className="rounded-xl border border-[var(--accent)]/30 bg-[var(--paper-2)] p-3">
      <div className="flex items-center gap-2">
        <Split className="size-3.5 text-[var(--accent)]" />
        <h3 className="text-sm font-bold">Biarticular · דו-מפרקי</h3>
      </div>
      <p className="mt-1 text-xs text-[var(--ink-soft)]">
        {row.group.pairEn} · {row.group.pairHe}
        {row.headEn ? ` · ${row.headEn} · ${row.headHe}` : ""}
      </p>
      <div className="mt-2 flex flex-wrap gap-1">
        {row.at.map((slot) => (
          <span
            key={slot.joint}
            className="rounded-full border border-[var(--line)] bg-[var(--card)] px-2 py-0.5 text-[11px]"
          >
            {atLabel(slot.joint, slot.actions)}
          </span>
        ))}
      </div>
      {row.noteHe && (
        <p className="mt-2 text-xs leading-relaxed">
          {row.noteHe}
          <span className="term mt-0.5 block text-[11px] text-[var(--ink-soft)]">{row.noteEn}</span>
        </p>
      )}
    </div>
  );
}

export function BiarticularBadge({ muscleId }: { muscleId: string }) {
  const row = biarticularOf(muscleId);
  if (!row) return null;
  return (
    <span className="rounded-full border border-[var(--accent)]/40 bg-[var(--paper-2)] px-2 py-0.5 text-[10px] font-medium text-[var(--accent)]">
      Biarticular · דו-מפרקי
      {row.headHe ? ` · ${row.headHe}` : ""}
    </span>
  );
}

function GroupCard({ group, hideAt }: { group: BiarticularGroup; hideAt: boolean }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-sm">
      <div className="border-b border-[var(--line)] bg-[var(--paper-2)] px-4 py-3 md:px-5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
          Crosses · חוצה
        </p>
        <h3 className="term mt-0.5 text-lg font-bold">{group.pairEn}</h3>
        <p className="text-sm text-[var(--ink-soft)]">{group.pairHe}</p>
        <p className="mt-2 text-sm leading-relaxed">{group.ruleHe}</p>
        <p className="term mt-1 text-xs leading-relaxed text-[var(--ink-soft)]">{group.ruleEn}</p>
      </div>

      <div className="divide-y divide-[var(--line)]">
        {group.muscles.map((row) => (
          <MuscleRow key={row.muscleId} row={row} hideAt={hideAt} />
        ))}
      </div>

      {group.lookalikes.length > 0 && (
        <div className="border-t border-[var(--line)] bg-[var(--paper)]/70 px-4 py-3 md:px-5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--ink-soft)]">
            Not these · לא אלה
          </p>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {group.lookalikes.map((item) => (
              <li key={item.nameEn} className="text-sm">
                <NamePair en={item.nameEn} he={item.nameHe} enClassName="text-sm" heClassName="text-xs" />
                <p className="mt-0.5 text-xs text-[var(--ink-soft)]">
                  {item.whyHe}
                  <span className="term mt-0.5 block text-[11px] opacity-80">{item.whyEn}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

function MuscleRow({ row, hideAt }: { row: BiarticularMuscle; hideAt: boolean }) {
  const m = muscles.find((x) => x.id === row.muscleId);
  if (!m) return null;
  return (
    <div className="flex items-start gap-3 p-4 md:p-5">
      <AnatomyThumb kind="muscles" id={m.id} alt={m.nameHe} size="sm" interactive={false} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <NamePair en={m.nameEn} he={m.nameHe} stacked={false} enClassName="text-base" heClassName="text-sm" />
          {row.headEn && (
            <span className="rounded-full border border-[var(--accent)]/40 bg-[var(--paper-2)] px-2 py-0.5 text-[10px] font-medium text-[var(--accent)]">
              {bilingual(row.headEn, row.headHe)}
            </span>
          )}
          {row.extra && (
            <span className="rounded-full border border-[var(--line)] px-2 py-0.5 text-[10px] text-[var(--ink-soft)]">
              Extra · הרחבה
            </span>
          )}
        </div>
        <div className={cn("mt-2 flex flex-wrap gap-1", hideAt && "hide-study")}>
          {row.at.map((slot) => (
            <span
              key={slot.joint}
              className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-2 py-0.5 text-[11px]"
            >
              {atLabel(slot.joint, slot.actions)}
            </span>
          ))}
        </div>
        {row.noteHe && (
          <p className={cn("mt-2 text-sm leading-relaxed", hideAt && "hide-study")}>
            {row.noteHe}
            <span className="term mt-0.5 block text-xs text-[var(--ink-soft)]">{row.noteEn}</span>
          </p>
        )}
      </div>
    </div>
  );
}

function atLabel(joint: BiarticularMuscle["at"][number]["joint"], actions: ActionId[]) {
  const jt = JOINT_TAGS.find((j) => j.id === joint);
  const acts = actions
    .map((a) => actionById(a))
    .filter(Boolean)
    .map((a) => bilingual(a!.en, a!.he))
    .join(", ");
  return `${jt ? bilingual(jt.en, jt.he) : joint}: ${acts}`;
}
