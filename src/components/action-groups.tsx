"use client";

import { useMemo, useState } from "react";
import {
  ACTION_GROUPS,
  actionGroupsForRegion,
  searchActionGroups,
  type ActionGroup,
  type ActionMember,
} from "@/data/action-groups";
import { REGIONS, REGION_COLORS, type RegionId } from "@/data/regions";
import { ActionGroupDrill } from "@/components/action-group-drill";
import { EmptyState } from "@/components/muscle-table";
import { bilingual } from "@/components/name-pair";
import { cn } from "@/lib/utils";

export function ActionGroupsView({
  region,
  query,
}: {
  region: RegionId | "all";
  query: string;
}) {
  const [hidePrime, setHidePrime] = useState(false);
  const [hideAccessory, setHideAccessory] = useState(false);

  const groups = useMemo(() => {
    return searchActionGroups(query, actionGroupsForRegion(region));
  }, [region, query]);

  const grouped = useMemo(() => {
    if (region !== "all") {
      const r = REGIONS.find((x) => x.id === region);
      return r ? [{ region: r, groups }] : [];
    }
    return REGIONS.map((r) => ({
      region: r,
      groups: groups.filter((g) => g.region === r.id),
    })).filter((g) => g.groups.length > 0);
  }, [groups, region]);

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-sm md:p-5">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--accent)] uppercase">
          Booklet method · שיטת החוברת
        </p>
        <h3 className="mt-1 text-xl font-bold">לסיכום, כיצד ללמוד את דרך פעולתם של השרירים?</h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed">
          בטבלה מוצגת דרך לימוד מומלצת — סיכום פעולתם המשותפת של כל השרירים התורמים לפעולה מסוימת.
          זוהי דוגמה: דרך אחת ללימוד תפקידי השרירים.
        </p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--ink-soft)]">
          השרירים העיקריים הם אלה שתרומתם גדולה. לשרירי המשנה תרומה קטנה יחסית. המונח «שריר משנה»
          אינו מעיד על חשיבות קטנה — החלוקה חשובה למבחן ולשיקום, פחות לניתוח תנועה יומיומי.
          מבחינתנו כל השרירים חשובים.
        </p>
        <p className="term mt-2 max-w-3xl text-xs leading-relaxed text-[var(--ink-soft)]">
          Learn the shared job of a group, not 70 separate actions. Prime movers do most of the work;
          accessories help a little. “Accessory” is not “unimportant”.
        </p>
      </section>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-[var(--ink-soft)]">Hide to practice · הסתר לתרגול:</span>
        <label className="flex items-center gap-1.5">
          <input
            type="checkbox"
            checked={hidePrime}
            onChange={(e) => setHidePrime(e.target.checked)}
          />
          Prime · עיקריים
        </label>
        <label className="flex items-center gap-1.5">
          <input
            type="checkbox"
            checked={hideAccessory}
            onChange={(e) => setHideAccessory(e.target.checked)}
          />
          Accessory · משנה
        </label>
        <a
          href="#movement-practice"
          className="rounded-full border border-[var(--ink)] px-2.5 py-1 text-xs font-medium text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]"
        >
          Practice · תרגול ↓
        </a>
        <span className="ms-auto text-xs text-[var(--ink-soft)]">
          {groups.length} groups · קבוצות
        </span>
      </div>

      {groups.length > 0 && <ActionGroupDrill pool={groups} universe={ACTION_GROUPS} />}

      {groups.length === 0 ? (
        <EmptyState
          title="No matching groups · אין קבוצות תואמות"
          body="Try another region or search. · נסו אזור או חיפוש אחר."
        />
      ) : (
        grouped.map((block) => (
          <section key={block.region.id} className="space-y-2">
            {region === "all" && (
              <span
                className={cn(
                  "inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
                  REGION_COLORS[block.region.id],
                )}
              >
                {bilingual(block.region.en, block.region.he)}
              </span>
            )}
            <ActionGroupTable
              groups={block.groups}
              hidePrime={hidePrime}
              hideAccessory={hideAccessory}
            />
          </section>
        ))
      )}
    </div>
  );
}

function ActionGroupTable({
  groups,
  hidePrime,
  hideAccessory,
}: {
  groups: ActionGroup[];
  hidePrime: boolean;
  hideAccessory: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-[var(--paper-2)] text-right text-xs">
            <tr>
              <th className="w-[22%] px-4 py-3 font-bold underline decoration-[var(--accent)] decoration-2 underline-offset-4">
                קבוצת השרירים
                <span className="mt-0.5 block font-semibold no-underline text-[var(--ink-soft)]">
                  Muscle group
                </span>
              </th>
              <th className="px-4 py-3 font-bold underline decoration-[var(--accent)] decoration-2 underline-offset-4">
                השרירים העיקריים
                <span className="mt-0.5 block font-semibold no-underline text-[var(--ink-soft)]">
                  Prime movers
                </span>
              </th>
              <th className="px-4 py-3 font-bold underline decoration-[var(--accent)] decoration-2 underline-offset-4">
                שרירי המשנה
                <span className="mt-0.5 block font-semibold no-underline text-[var(--ink-soft)]">
                  Accessory muscles
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {groups.map((g) => (
              <tr key={g.id} className="border-t border-[var(--line)] align-top even:bg-[var(--paper)]/50">
                <td className="px-4 py-3">
                  <p className="font-bold leading-snug">{g.groupHe}</p>
                  <p className="term mt-0.5 text-xs text-[var(--ink-soft)]">{g.groupEn}</p>
                </td>
                <td className={cn("px-4 py-3", hidePrime && "hide-study")}>
                  <MemberList members={g.prime} />
                  {g.noteHe && (
                    <p className="mt-2 text-[11px] leading-relaxed text-[var(--accent)]">
                      * {g.noteHe}
                    </p>
                  )}
                </td>
                <td className={cn("px-4 py-3", hideAccessory && "hide-study")}>
                  {g.accessory.length === 0 ? (
                    <p className="text-xs text-[var(--ink-soft)]">—</p>
                  ) : (
                    <MemberList members={g.accessory} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MemberList({ members }: { members: ActionMember[] }) {
  return (
    <ul className="space-y-1.5">
      {members.map((x) => (
        <li key={`${x.en}-${x.he}`}>
          <p className="term leading-snug">{x.en}</p>
          <p className="text-[11px] text-[var(--ink-soft)]">
            {x.he}
            {x.extra ? " · הרחבה" : ""}
          </p>
        </li>
      ))}
    </ul>
  );
}
