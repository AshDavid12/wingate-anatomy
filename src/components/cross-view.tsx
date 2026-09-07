"use client";

import { useMemo, useState } from "react";
import { muscles } from "@/data/muscles";
import { bones } from "@/data/bones";
import { ACTIONS, PLANES, actionById, type ActionId, type PlaneId } from "@/data/planes";
import { JOINT_TAGS, MUSCLE_TAGS, type JointTag } from "@/data/muscle-tags";
import {
  actionsAtJoint,
  familyOf,
  groupByJoint,
  muscleActionsAtJoint,
  musclesByAction,
  musclesByJoint,
  musclesByPlane,
  similarMuscles,
} from "@/data/cross";
import { musclesForBone } from "@/data/lookups";
import { AnatomyThumb } from "@/components/anatomy-image";
import { PlaneBadge } from "@/components/planes-view";
import { bilingual, NamePair } from "@/components/name-pair";
import { cn } from "@/lib/utils";
import type { Muscle } from "@/data/types";

type Mode = "action" | "joint" | "bone" | "plane" | "similar";

const MODES: { id: Mode; he: string; hint: string }[] = [
  { id: "action", he: "לפי תנועה", hint: "אותה Action במפרקים שונים — למשל הרחקה בכתף מול הרחקה בירך" },
  { id: "joint", he: "לפי מפרק", hint: "כל השרירים שפועלים על המפרק, מחולקים לפי תנועה ומישור" },
  { id: "bone", he: "לפי עצם", hint: "מי מתחיל ומי נאחז — ואיזו תנועה כל אחד מייצר" },
  { id: "plane", he: "לפי מישור", hint: "כל השרירים שתנועתם העיקרית במישור שבחרתם" },
  { id: "similar", he: "שרירים דומים", hint: "אותה קבוצה, אותו מפרק+תנועה, אנטגוניסטים, אותה עצם" },
];

export function CrossView() {
  const [mode, setMode] = useState<Mode>("action");
  const [action, setAction] = useState<ActionId>("abduction");
  const [joint, setJoint] = useState<JointTag>("gh");
  const [bone, setBone] = useState("scapula");
  const [plane, setPlane] = useState<PlaneId>("sagittal");
  const [muscleId, setMuscleId] = useState("latissimus-dorsi");
  const [q, setQ] = useState("");

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">הצלבת מידע</h2>
        <p className="mt-1 text-sm text-[var(--ink-soft)]">
          חברו תנועה ↔ מישור ↔ מפרק ↔ עצם. כך תזהו זוגות כמו Latissimus ו־Teres major, או
          כופפי ברך מול פושטי ברך.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm",
              mode === m.id
                ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                : "border-[var(--line)] bg-[var(--card)]",
            )}
          >
            {m.he}
          </button>
        ))}
      </div>
      <p className="text-sm text-[var(--ink-soft)]">{MODES.find((m) => m.id === mode)?.hint}</p>

      {mode === "action" && (
        <>
          <ChipRow
            items={ACTIONS.filter((a) => a.plane).map((a) => ({
              id: a.id,
              label: bilingual(a.en, a.he),
            }))}
            value={action}
            onChange={(id) => setAction(id as ActionId)}
          />
          <ActionPanel action={action} />
        </>
      )}

      {mode === "joint" && (
        <>
          <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-4 md:grid-cols-7">
            {JOINT_TAGS.map((j) => (
              <button
                key={j.id}
                type="button"
                onClick={() => setJoint(j.id)}
                className={cn(
                  "rounded-xl border px-2 py-2 text-sm font-medium",
                  joint === j.id
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                    : "border-[var(--line)] bg-[var(--card)]",
                )}
              >
                <span className="term font-bold">{j.en}</span>
                <span className="mt-0.5 block text-[10px] font-normal opacity-80">{j.he}</span>
              </button>
            ))}
          </div>
          <JointPanel key={joint} joint={joint} />
        </>
      )}

      {mode === "bone" && (
        <>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="סננו עצם…"
            className="w-full rounded-xl border border-[var(--line)] bg-[var(--card)] px-3 py-2 text-sm"
          />
          <ChipRow
            items={bones
              .filter((b) => !q || `${b.nameHe} ${b.nameEn}`.toLowerCase().includes(q.toLowerCase()))
              .map((b) => ({ id: b.id, label: bilingual(b.nameEn, b.nameHe) }))}
            value={bone}
            onChange={setBone}
          />
          <BonePanel boneId={bone} />
        </>
      )}

      {mode === "plane" && (
        <>
          <ChipRow
            items={PLANES.map((p) => ({ id: p.id, label: bilingual(p.en, p.he) }))}
            value={plane}
            onChange={(id) => setPlane(id as PlaneId)}
          />
          <PlanePanel plane={plane} />
        </>
      )}

      {mode === "similar" && (
        <>
          <select
            value={muscleId}
            onChange={(e) => setMuscleId(e.target.value)}
            className="w-full rounded-xl border border-[var(--line)] bg-[var(--card)] px-3 py-2 text-sm"
          >
            {muscles.map((m) => (
              <option key={m.id} value={m.id}>
                {bilingual(m.nameEn, m.nameHe)}
              </option>
            ))}
          </select>
          <SimilarPanel muscleId={muscleId} />
        </>
      )}
    </div>
  );
}

function ChipRow({
  items,
  value,
  onChange,
}: {
  items: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex max-h-36 flex-wrap gap-1.5 overflow-auto">
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          onClick={() => onChange(it.id)}
          className={cn(
            "rounded-full border px-2.5 py-1 text-xs",
            value === it.id
              ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
              : "border-[var(--line)] bg-[var(--card)]",
          )}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

function MuscleRow({ m, extra }: { m: Muscle; extra?: string }) {
  const tags = MUSCLE_TAGS[m.id];
  return (
    <div className="flex items-start gap-3 rounded-xl border border-[var(--line)] bg-[var(--card)] p-3">
      <AnatomyThumb kind="muscles" id={m.id} alt={m.nameHe} size="sm" interactive={false} />
      <div className="min-w-0 flex-1">
        <NamePair en={m.nameEn} he={m.nameHe} heClassName="text-xs" />
        {extra && <p className="mt-1 text-xs text-[var(--accent)]">{extra}</p>}
        <p className="mt-1 line-clamp-2 text-xs text-[var(--ink-soft)]">{m.actionHe}</p>
        <div className="mt-1 flex flex-wrap gap-1">
          {tags?.actions.slice(0, 4).map((a) => {
            const meta = actionById(a);
            return (
              <span key={a} className="rounded-full bg-[var(--paper-2)] px-2 py-0.5 text-[10px]">
                {meta?.he}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ActionPanel({ action }: { action: ActionId }) {
  const meta = actionById(action);
  const list = musclesByAction(action);
  const groups = groupByJoint(list);
  if (!meta) return null;
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="term text-lg font-bold">{meta.en}</h3>
          <span className="text-sm text-[var(--ink-soft)]">{meta.he}</span>
          <PlaneBadge plane={meta.plane} />
        </div>
        <p className="mt-1 text-sm text-[var(--ink-soft)]">{meta.note}</p>
        <p className="mt-2 text-xs">
          {list.length} שרירים · שימו לב לאותה תנועה במפרקים שונים — זה בדיוק מה שהמבחן אוהב להצליב.
        </p>
      </div>
      {groups.map((g) => (
        <div key={g.joint}>
          <h4 className="mb-2 font-semibold">{g.he}</h4>
          <div className="grid gap-2 md:grid-cols-2">
            {g.muscles.map((m) => (
              <MuscleRow key={m.id} m={m} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function JointPanel({ joint }: { joint: JointTag }) {
  const meta = JOINT_TAGS.find((j) => j.id === joint);
  const acts = actionsAtJoint(joint);
  const list = musclesByJoint(joint);
  const byAction = acts.map((a) => ({
    action: a,
    meta: actionById(a),
    muscles: list.filter((m) => muscleActionsAtJoint(m.id, joint).includes(a)),
  }));
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--accent)]">
          מפרק נבחר
        </p>
        <h3 className="term text-lg font-bold">{meta?.en}</h3>
        <p className="text-sm text-[var(--ink-soft)]">{meta?.he}</p>
        <p className="mt-1 text-sm">
          {list.length} שרירים שפועלים על מפרק זה
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          {byAction.map((row) => (
            <span key={row.action} className="inline-flex items-center gap-1">
              <span className="text-xs">{row.meta?.he}</span>
              <PlaneBadge plane={row.meta?.plane ?? null} />
            </span>
          ))}
        </div>
      </div>
      {list.length === 0 && (
        <p className="rounded-xl border border-dashed border-[var(--line)] p-4 text-sm text-[var(--ink-soft)]">
          אין שרירים מתויגים למפרק זה.
        </p>
      )}
      {byAction.map((row) => (
        <div key={row.action}>
          <div className="mb-2 flex items-center gap-2">
            <h4 className="font-semibold">
              <NamePair en={row.meta?.en} he={row.meta?.he} stacked={false} heClassName="text-sm" />
            </h4>
            <PlaneBadge plane={row.meta?.plane ?? null} />
            <span className="text-xs text-[var(--ink-soft)]">{row.muscles.length}</span>
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            {row.muscles.map((m) => (
              <MuscleRow key={m.id} m={m} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function BonePanel({ boneId }: { boneId: string }) {
  const bone = bones.find((b) => b.id === boneId);
  const { origins, insertions } = musclesForBone(boneId);
  if (!bone) return null;
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4">
        <AnatomyThumb kind="bones" id={bone.id} alt={bone.nameHe} size="md" interactive={false} />
        <div>
          <NamePair en={bone.nameEn} he={bone.nameHe} enClassName="text-lg" heClassName="text-sm" />
          <ul className="mt-2 list-disc pr-4 text-xs text-[var(--ink-soft)]">
            {bone.movements.map((mv) => (
              <li key={mv}>{mv}</li>
            ))}
          </ul>
        </div>
      </div>
      <h4 className="font-semibold">Origin — שרירים שמתחילים כאן</h4>
      <div className="grid gap-2 md:grid-cols-2">
        {origins.map((m) => (
          <MuscleRow key={m.id} m={m} extra={m.actionHe} />
        ))}
        {origins.length === 0 && <p className="text-sm text-[var(--ink-soft)]">אין ברשימה</p>}
      </div>
      <h4 className="font-semibold">Insertion — שרירים שנאחזים כאן</h4>
      <div className="grid gap-2 md:grid-cols-2">
        {insertions.map((m) => (
          <MuscleRow key={m.id} m={m} extra={m.actionHe} />
        ))}
        {insertions.length === 0 && <p className="text-sm text-[var(--ink-soft)]">אין ברשימה</p>}
      </div>
    </div>
  );
}

function PlanePanel({ plane }: { plane: PlaneId }) {
  const p = PLANES.find((x) => x.id === plane)!;
  const acts = ACTIONS.filter((a) => a.plane === plane);
  const list = musclesByPlane(plane);
  return (
    <div className="space-y-3">
      <div className={cn("rounded-2xl border p-4", p.bg)}>
        <h3 className="term text-lg font-bold">{p.en}</h3>
        <p className="text-sm text-[var(--ink-soft)]">{p.he}</p>
        <p className="text-sm">{p.mnemonic}</p>
      </div>
      {acts.map((a) => (
        <div key={a.id}>
          <h4 className="mb-2 font-semibold">
            <NamePair en={a.en} he={a.he} stacked={false} heClassName="text-sm" />
          </h4>
          <div className="grid gap-2 md:grid-cols-2">
            {musclesByAction(a.id).map((m) => (
              <MuscleRow key={m.id} m={m} />
            ))}
          </div>
        </div>
      ))}
      <p className="text-xs text-[var(--ink-soft)]">{list.length} שרירים נוגעים במישור זה</p>
    </div>
  );
}

function SimilarPanel({ muscleId }: { muscleId: string }) {
  const m = muscles.find((x) => x.id === muscleId);
  const tags = MUSCLE_TAGS[muscleId];
  const family = familyOf(muscleId);
  const hits = useMemo(() => similarMuscles(muscleId), [muscleId]);
  if (!m || !tags) return null;
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3 rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4">
        <AnatomyThumb kind="muscles" id={m.id} alt={m.nameHe} size="md" interactive={false} />
        <div>
          <NamePair en={m.nameEn} he={m.nameHe} enClassName="text-lg" heClassName="text-sm" />
          {family && <p className="mt-1 text-xs text-[var(--accent)]">{family.he}</p>}
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.joints.map((j) => (
              <span key={j} className="rounded-full border border-[var(--line)] px-2 py-0.5 text-[11px]">
                {(() => {
                  const jt = JOINT_TAGS.find((x) => x.id === j);
                  return jt ? bilingual(jt.en, jt.he) : j;
                })()}
              </span>
            ))}
            {tags.actions.map((a) => {
              const meta = actionById(a);
              return (
                <span key={a} className="inline-flex items-center gap-1">
                  <span className="rounded-full bg-[var(--paper-2)] px-2 py-0.5 text-[11px]">
                    {bilingual(meta?.en, meta?.he)}
                  </span>
                  <PlaneBadge plane={meta?.plane ?? null} />
                </span>
              );
            })}
          </div>
          <p className="mt-2 text-sm">{m.originHe}</p>
          <p className="text-sm">{m.insertionHe}</p>
        </div>
      </div>
      <h4 className="font-semibold">קשורים — לשינון בהצלבה</h4>
      <div className="grid gap-2 md:grid-cols-2">
        {hits.map((h) => (
          <MuscleRow key={h.muscle.id} m={h.muscle} extra={h.reasons.join(" · ")} />
        ))}
      </div>
    </div>
  );
}
