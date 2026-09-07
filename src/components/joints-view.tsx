"use client";

import { useState } from "react";
import { joints } from "@/data/joints";
import { bones } from "@/data/bones";
import { AnatomyLightbox, AnatomyThumb } from "@/components/anatomy-image";
import { actionsAtJoint } from "@/data/cross";
import { actionById } from "@/data/planes";
import { PlaneBadge } from "@/components/planes-view";
import type { Joint } from "@/data/types";
import type { JointTag } from "@/data/muscle-tags";

export function JointsView() {
  const [open, setOpen] = useState<Joint | null>(null);

  return (
    <>
      <div className="grid gap-3 md:grid-cols-2">
        {joints.map((j) => {
          const boneNames = j.bones
            .map((id) => {
              const b = bones.find((x) => x.id === id);
              return b ? `${b.nameEn} · ${b.nameHe}` : id;
            })
            .join(" + ");
          return (
            <article
              key={j.id}
              className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-sm"
            >
              <AnatomyThumb
                kind="joints"
                id={j.id}
                alt={j.nameHe}
                size="lg"
                className="rounded-none border-0"
                onOpen={() => setOpen(j)}
              />
              <div className="p-5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
                  {j.typeEn}
                </p>
                <h2 className="term mt-1 text-lg font-bold">{j.nameEn}</h2>
                <p className="text-sm text-[var(--ink-soft)]">{j.nameHe}</p>
                <p className="mt-2 text-sm">
                  <span className="text-[var(--ink-soft)]">עצמות: </span>
                  {boneNames}
                </p>
                <p className="mt-1 text-sm">
                  <span className="text-[var(--ink-soft)]">סוג: </span>
                  {j.typeHe}
                </p>
                <ul className="mt-3 list-disc pr-4 text-sm leading-relaxed">
                  {j.movements.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap gap-1">
                  {actionsAtJoint(j.id as JointTag).map((a) => {
                    const meta = actionById(a);
                    return (
                      <span key={a} className="inline-flex items-center gap-1">
                        <span className="text-[11px]">
                          <span className="term font-bold">{meta?.en}</span>
                          {meta?.he ? ` · ${meta.he}` : ""}
                        </span>
                        <PlaneBadge plane={meta?.plane ?? null} />
                      </span>
                    );
                  })}
                </div>
                {j.notes && <p className="mt-3 text-xs text-[var(--accent)]">{j.notes}</p>}
                {j.details && j.details.length > 0 && (
                  <p className="mt-3 text-[11px] text-[var(--ink-soft)]">
                    לחצו על האיור לפירוט מהמצגת: רצועות, פתולוגיות ושרירים מניעים.
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
      {open && (
        <AnatomyLightbox
          open
          onClose={() => setOpen(null)}
          kind="joints"
          id={open.id}
          title={open.nameEn}
          subtitle={open.nameHe}
        >
          <ul className="list-disc pr-4 text-sm">
            {open.movements.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          {open.notes && <p className="mt-2 text-xs text-[var(--accent)]">{open.notes}</p>}
          {open.details?.map((d) => (
            <div key={d.title} className="mt-3">
              <p className="text-sm font-semibold">{d.title}</p>
              <ul className="mt-1 list-disc pr-4 text-sm leading-relaxed text-[var(--ink-soft)]">
                {d.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </AnatomyLightbox>
      )}
    </>
  );
}
