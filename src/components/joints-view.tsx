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
            .map((id) => bones.find((b) => b.id === id)?.nameHe ?? id)
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
                <h2 className="mt-1 text-lg font-bold">{j.nameHe}</h2>
                <p className="term text-sm text-[var(--ink-soft)]">{j.nameEn}</p>
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
                        <span className="text-[11px]">{meta?.he}</span>
                        <PlaneBadge plane={meta?.plane ?? null} />
                      </span>
                    );
                  })}
                </div>
                {j.notes && <p className="mt-3 text-xs text-[var(--accent)]">{j.notes}</p>}
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
          title={open.nameHe}
          subtitle={open.nameEn}
        >
          <ul className="list-disc pr-4 text-sm">
            {open.movements.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
          {open.notes && <p className="mt-2 text-xs text-[var(--accent)]">{open.notes}</p>}
        </AnatomyLightbox>
      )}
    </>
  );
}
