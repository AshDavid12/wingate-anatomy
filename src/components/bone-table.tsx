"use client";

import { useMemo, useState } from "react";
import { musclesForBone, searchBones } from "@/data/lookups";
import { EmptyState } from "@/components/muscle-table";
import { cn } from "@/lib/utils";
import type { Muscle } from "@/data/types";

const SKELETON_LABEL: Record<string, string> = {
  axial: "שלד ציר",
  "appendicular-upper": "תוספת עליונה",
  "appendicular-lower": "תוספת תחתונה",
};

export function BoneTable({ query }: { query: string }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const list = useMemo(() => searchBones(query), [query]);

  if (list.length === 0) {
    return <EmptyState title="אין עצמות תואמות" body="נסו שם עצם, landmark או מפרק." />;
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-[var(--ink-soft)]">
        לכל עצם: השרירים ש־<span className="term">Origin</span> שלהם עליה, השרירים
        שנאחזים בה (<span className="term">Insertion</span>), והתנועות במפרקים
        שהעצם משתתפת בהם.
      </p>

      <div className="hidden overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-sm lg:block">
        <table className="w-full text-sm">
          <thead className="bg-[var(--paper-2)] text-xs uppercase tracking-wide text-[var(--ink-soft)]">
            <tr>
              <th className="px-4 py-3 text-right font-semibold">עצם</th>
              <th className="px-4 py-3 text-right font-semibold">Origin · שרירים שמתחילים כאן</th>
              <th className="px-4 py-3 text-right font-semibold">Insertion · שרירים שנאחזים כאן</th>
              <th className="px-4 py-3 text-right font-semibold">Action / movement</th>
            </tr>
          </thead>
          <tbody>
            {list.map((b) => {
              const { origins, insertions } = musclesForBone(b.id);
              return (
                <tr key={b.id} className="border-t border-[var(--line)] align-top even:bg-[var(--paper)]/50">
                  <td className="px-4 py-3">
                    <p className="font-bold">{b.nameHe}</p>
                    <p className="term text-xs text-[var(--ink-soft)]">{b.nameEn}</p>
                    <p className="mt-1 text-[11px] text-[var(--ink-soft)]">
                      {SKELETON_LABEL[b.skeleton]} · {b.type} ({b.typeEn})
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <MuscleChips list={origins} empty="אין origin ברשימת השרירים" />
                  </td>
                  <td className="px-4 py-3">
                    <MuscleChips list={insertions} empty="אין insertion ברשימת השרירים" />
                  </td>
                  <td className="px-4 py-3">
                    <ul className="list-disc pr-4 text-xs leading-relaxed">
                      {b.movements.map((mv) => (
                        <li key={mv}>{mv}</li>
                      ))}
                    </ul>
                    <p className="term mt-2 text-[11px] text-[var(--ink-soft)]">
                      {b.joints.join(" · ")}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 lg:hidden">
        {list.map((b) => {
          const { origins, insertions } = musclesForBone(b.id);
          const open = openId === b.id;
          return (
            <article
              key={b.id}
              className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-sm"
            >
              <button
                type="button"
                className="flex w-full items-start justify-between gap-3 text-right"
                onClick={() => setOpenId(open ? null : b.id)}
              >
                <div>
                  <p className="font-bold">{b.nameHe}</p>
                  <p className="term text-xs text-[var(--ink-soft)]">{b.nameEn}</p>
                  <p className="mt-1 text-[11px] text-[var(--ink-soft)]">
                    {SKELETON_LABEL[b.skeleton]} · {b.type}
                  </p>
                </div>
                <span className="text-xs text-[var(--accent)]">{open ? "סגור" : "פתח"}</span>
              </button>
              <div className={cn("mt-3 space-y-3", !open && "hidden")}>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
                    Origin
                  </p>
                  <MuscleChips list={origins} empty="—" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
                    Insertion
                  </p>
                  <MuscleChips list={insertions} empty="—" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
                    Movement
                  </p>
                  <ul className="mt-1 list-disc pr-4 text-sm">
                    {b.movements.map((mv) => (
                      <li key={mv}>{mv}</li>
                    ))}
                  </ul>
                </div>
                <p className="text-xs text-[var(--ink-soft)]">
                  Landmarks: {b.landmarks.join(" · ")}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function MuscleChips({ list, empty }: { list: Muscle[]; empty: string }) {
  if (list.length === 0) {
    return <p className="text-xs text-[var(--ink-soft)]">{empty}</p>;
  }
  return (
    <div className="flex flex-wrap gap-1">
      {list.map((m) => (
        <span
          key={m.id}
          className="rounded-full bg-[var(--paper-2)] px-2 py-0.5 text-[11px]"
          title={m.nameEn}
        >
          {m.nameHe}
        </span>
      ))}
    </div>
  );
}
