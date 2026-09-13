"use client";

import { useMemo, useState } from "react";
import { ACTIONS, MIXED_GYM, PLANES, allGymMoves, type PlaneId, planeById } from "@/data/planes";
import { musclesByAction } from "@/data/cross";
import { directionalTerms, keyConcepts } from "@/data/terms";
import { cn } from "@/lib/utils";

export function PlanesView() {
  const [plane, setPlane] = useState<PlaneId>("sagittal");
  const [hide, setHide] = useState(false);
  const current = planeById(plane)!;
  const moves = ACTIONS.filter((a) => a.plane === plane);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-bold">The three planes · שלושת המישורים</h2>
        <p className="mt-1 max-w-3xl text-sm text-[var(--ink-soft)]">
          Every exam movement is described from anatomical position. Planes split the body; the axis is the line the joint spins around — always perpendicular to the plane of motion.
          כל תנועה במבחן מתוארת ביחס לעמידה אנטומית. המישורים מחלקים את הגוף, והציר הוא הקו שסביבו המפרק מסתובב — תמיד ניצב למישור התנועה.
        </p>
        <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,280px)_1fr]">
          <PlaneFigure active={plane} onPick={setPlane} />
          <div className="grid gap-3 sm:grid-cols-3">
            {PLANES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlane(p.id)}
                className={cn(
                  "rounded-2xl border p-4 text-right shadow-sm transition",
                  p.bg,
                  plane === p.id ? "ring-2 ring-[var(--ink)]" : "opacity-90 hover:opacity-100",
                )}
              >
                <p className="term text-lg font-bold">{p.en}</p>
                <h3 className="mt-1 text-sm text-[var(--ink-soft)]">{p.he}</h3>
                <p className="mt-2 text-xs leading-relaxed">{p.splits}</p>
                <p className="mt-1 text-xs text-[var(--ink-soft)]">{p.axisHe}</p>
                <p className="mt-2 text-[11px] leading-relaxed text-[var(--ink-soft)]">
                  {p.gym
                    .slice(0, 3)
                    .map((g) => g.he)
                    .join(" · ")}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={cn("rounded-2xl border p-5", current.bg)}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="term text-xl font-bold">{current.en}</p>
            <h3 className="text-sm text-[var(--ink-soft)]">{current.he}</h3>
            <p className="mt-2 max-w-2xl text-sm">{current.mnemonic}</p>
            <p className="mt-1 text-xs text-[var(--ink-soft)]">
              Axis of motion · ציר התנועה: {current.axisEn} · {current.axisHe}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-bold">At the gym · בחדר כושר</h3>
          <p className="mt-1 max-w-3xl text-xs text-[var(--ink-soft)]">
            Watch the moving limb, not the machine name. Front–back = sagittal. Side-to-side = frontal. Spin / hug / twist = horizontal.
            תסתכלו על הגפה שנעה, לא על שם המכונה. קדימה–אחורה = סגיטלי. ימינה–שמאלה = פרונטלי. סיבוב / חיבוק / טוויסט = הוריזונטלי.
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {current.gym.map((g) => (
              <article key={g.en} className="rounded-xl border border-white/60 bg-white/75 px-3 py-2.5">
                <p className="term text-sm font-bold">{g.en}</p>
                <p className="text-xs text-[var(--ink-soft)]">{g.he}</p>
                <p className="mt-1 text-[11px] leading-relaxed">{g.whyHe}</p>
                <p className="term mt-0.5 text-[11px] leading-relaxed text-[var(--ink-soft)]">{g.whyEn}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-white/60 bg-[var(--card)]">
          <table className="w-full text-sm">
            <thead className="bg-white/50 text-xs text-[var(--ink-soft)]">
              <tr>
                <th className="px-3 py-2 text-right">English</th>
                <th className="px-3 py-2 text-right">עברית</th>
                <th className="px-3 py-2 text-right">Example muscles · שרירים לדוגמה</th>
              </tr>
            </thead>
            <tbody>
              {moves.map((a) => {
                const examples = musclesByAction(a.id).slice(0, 4);
                return (
                  <tr key={a.id} className="border-t border-[var(--line)] align-top">
                    <td className="term px-3 py-2 font-bold">{a.en}</td>
                    <td className="px-3 py-2 text-[var(--ink-soft)]">
                      {a.he}
                      <p className="text-[11px] font-normal">{a.note}</p>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex flex-wrap gap-1">
                        {examples.map((m) => (
                          <span key={m.id} className="rounded-full bg-[var(--paper-2)] px-2 py-0.5 text-[11px]">
                            <span className="term font-bold">{m.nameEn}</span>
                            <span className="text-[var(--ink-soft)]"> · {m.nameHe}</span>
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold">Mixed lifts · תרגילים מעורבים</h2>
        <p className="mt-1 max-w-3xl text-sm text-[var(--ink-soft)]">
          A lift can use two joints, so two planes. Name the plane of each joint — do not force one label on the whole exercise.
          תרגיל יכול להניע שני מפרקים, ולכן שני מישורים. תנו שם למישור של כל מפרק — אל תכפו תווית אחת על כל התרגיל.
        </p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {MIXED_GYM.map((g) => (
            <article key={g.en} className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-sm">
              <p className="term font-bold">{g.en}</p>
              <p className="text-sm text-[var(--ink-soft)]">{g.he}</p>
              <p className="mt-2 text-sm leading-relaxed">{g.whyHe}</p>
              <p className="term mt-1 text-xs leading-relaxed text-[var(--ink-soft)]">{g.whyEn}</p>
            </article>
          ))}
        </div>
      </section>

      <GymPlaneDrill />
      <PlaneDrill />

      <section>
        <div className="mb-2 flex flex-wrap items-center gap-3">
          <h2 className="text-xl font-bold">Drill table — action ↔ plane · טבלת שינון — תנועה ↔ מישור</h2>
          <label className="text-sm">
            <input type="checkbox" className="ms-1" checked={hide} onChange={(e) => setHide(e.target.checked)} />
            Hide plane to practice · הסתר מישור לתרגול
          </label>
        </div>
        <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)]">
          <table className="w-full text-sm">
            <thead className="bg-[var(--paper-2)] text-xs text-[var(--ink-soft)]">
              <tr>
                <th className="px-4 py-2 text-right">English</th>
                <th className="px-4 py-2 text-right">עברית</th>
                <th className="px-4 py-2 text-right">Plane · מישור</th>
                <th className="px-4 py-2 text-right">Note · הסבר</th>
              </tr>
            </thead>
            <tbody>
              {ACTIONS.filter((a) => a.plane).map((a) => {
                const p = planeById(a.plane as PlaneId)!;
                return (
                  <tr key={a.id} className="border-t border-[var(--line)] even:bg-[var(--paper)]/50">
                    <td className="term px-4 py-2 font-bold">{a.en}</td>
                    <td className="px-4 py-2 text-[var(--ink-soft)]">{a.he}</td>
                    <td className="px-4 py-2">
                      <span className={cn("rounded-full border px-2 py-0.5 text-xs", p.bg, hide && "hide-study")}>
                        {p.en.split(" ")[0]} · {p.he}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-[var(--ink-soft)]">{a.note}</td>
                  </tr>
                );
              })}
              <tr className="border-t border-[var(--line)]">
                <td className="term px-4 py-2 font-bold">Circumduction</td>
                <td className="px-4 py-2 text-[var(--ink-soft)]">סיבוב מעגלי</td>
                <td className="px-4 py-2 text-xs">Multi-plane · רב-מישורי</td>
                <td className="px-4 py-2 text-[var(--ink-soft)]">Combo of flexion, abduction, extension, adduction · שילוב כפיפה, הרחקה, פשיטה וקרוב</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold">Key concepts · מושגי יסוד</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {keyConcepts.map((c) => (
            <article key={c.titleEn} className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-sm">
              <h3 className="font-bold">{c.titleEn}</h3>
              <p className="text-sm text-[var(--ink-soft)]">{c.titleHe}</p>
              <p className="mt-2 text-sm leading-relaxed">{c.bodyHe}</p>
              <p className="term mt-1 text-xs leading-relaxed text-[var(--ink-soft)]">{c.bodyEn}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold">Anatomical directions · כיוונים אנטומיים</h2>
        <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-5">
          {directionalTerms.map((t) => (
            <div key={t.en} className="rounded-xl border border-[var(--line)] bg-[var(--card)] px-3 py-3">
              <p className="term font-bold">{t.en}</p>
              <p className="text-sm text-[var(--ink-soft)]">{t.he}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function PlaneFigure({
  active,
  onPick,
}: {
  active: PlaneId;
  onPick: (id: PlaneId) => void;
}) {
  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-3">
      <svg viewBox="0 0 200 260" className="mx-auto h-auto w-full max-w-[240px]" role="img" aria-label="שלושת המישורים">
        <ellipse cx="100" cy="248" rx="40" ry="6" fill="#d9cfc0" />
        <ellipse
          cx="100"
          cy="150"
          rx="78"
          ry="18"
          fill={active === "horizontal" ? "#f59e0b55" : "#f59e0b22"}
          stroke="#b45309"
          strokeWidth={active === "horizontal" ? 3 : 1}
          className="cursor-pointer"
          onClick={() => onPick("horizontal")}
        />
        <rect
          x="22"
          y="28"
          width="8"
          height="190"
          rx="2"
          transform="skewX(-8)"
          fill={active === "sagittal" ? "#0f766e88" : "#0f766e33"}
          stroke="#115e59"
          strokeWidth={active === "sagittal" ? 3 : 1}
          className="cursor-pointer"
          onClick={() => onPick("sagittal")}
        />
        <rect
          x="28"
          y="36"
          width="144"
          height="10"
          rx="2"
          fill={active === "frontal" ? "#e11d4888" : "#e11d4833"}
          stroke="#9f1239"
          strokeWidth={active === "frontal" ? 3 : 1}
          className="cursor-pointer"
          onClick={() => onPick("frontal")}
        />
        <circle cx="100" cy="48" r="16" fill="#1c1712" />
        <rect x="88" y="64" width="24" height="70" rx="10" fill="#1c1712" />
        <rect x="58" y="78" width="18" height="64" rx="8" fill="#1c1712" />
        <rect x="124" y="78" width="18" height="64" rx="8" fill="#1c1712" />
        <rect x="82" y="128" width="16" height="80" rx="8" fill="#1c1712" />
        <rect x="102" y="128" width="16" height="80" rx="8" fill="#1c1712" />
      </svg>
      <p className="mt-1 text-center text-[11px] text-[var(--ink-soft)]">Tap a plane in the figure or the cards · לחצו על מישור באיור או בכרטיסים</p>
    </div>
  );
}

function GymPlaneDrill() {
  const pool = useMemo(() => allGymMoves(), []);
  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);
  const item = pool[i % pool.length];
  if (!item) return null;
  const p = planeById(item.plane)!;

  return (
    <section className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5">
      <h2 className="text-xl font-bold">Gym drill: which plane? · תרגיל בחדר כושר: באיזה מישור?</h2>
      <p className="term mt-4 text-center text-2xl font-bold">{item.move.en}</p>
      <p className="text-center text-sm text-[var(--ink-soft)]">{item.move.he}</p>
      {show ? (
        <div className="mt-3 text-center">
          <p className={cn("text-lg font-semibold", p.color)}>
            {p.en} · {p.he}
          </p>
          <p className="mx-auto mt-1 max-w-xl text-sm">{item.move.whyHe}</p>
          <p className="term mx-auto mt-0.5 max-w-xl text-xs text-[var(--ink-soft)]">{item.move.whyEn}</p>
        </div>
      ) : (
        <p className="mt-3 text-center text-sm text-[var(--ink-soft)]">Guess the plane, then reveal · נחשו את המישור ואז חשפו</p>
      )}
      <div className="mt-4 flex justify-center gap-2">
        <button
          type="button"
          className="rounded-full border border-[var(--line)] px-4 py-2 text-sm"
          onClick={() => setShow((s) => !s)}
        >
          {show ? "Hide · הסתר" : "Reveal plane · חשוף מישור"}
        </button>
        <button
          type="button"
          className="rounded-full bg-[var(--ink)] px-4 py-2 text-sm text-[var(--paper)]"
          onClick={() => {
            setShow(false);
            setI((n) => n + 1);
          }}
        >
          Next · הבא
        </button>
      </div>
    </section>
  );
}

function PlaneDrill() {
  const pool = useMemo(() => ACTIONS.filter((a) => a.plane), []);
  const [i, setI] = useState(0);
  const [show, setShow] = useState(false);
  const a = pool[i % pool.length];
  if (!a?.plane) return null;
  const p = planeById(a.plane)!;

  return (
    <section className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5">
      <h2 className="text-xl font-bold">Quick drill: which plane? · תרגול מהיר: באיזה מישור?</h2>
      <p className="term mt-4 text-center text-2xl font-bold">{a.en}</p>
      <p className="text-center text-sm text-[var(--ink-soft)]">{a.he}</p>
      {show ? (
        <p className={cn("mt-3 text-center text-lg font-semibold", p.color)}>
          {p.en} · {p.he}
        </p>
      ) : (
        <p className="mt-3 text-center text-sm text-[var(--ink-soft)]">Guess, then reveal · נחשו ואז חשפו</p>
      )}
      <div className="mt-4 flex justify-center gap-2">
        <button
          type="button"
          className="rounded-full border border-[var(--line)] px-4 py-2 text-sm"
          onClick={() => setShow((s) => !s)}
        >
          {show ? "Hide · הסתר" : "Reveal plane · חשוף מישור"}
        </button>
        <button
          type="button"
          className="rounded-full bg-[var(--ink)] px-4 py-2 text-sm text-[var(--paper)]"
          onClick={() => {
            setShow(false);
            setI((n) => n + 1);
          }}
        >
          Next · הבא
        </button>
      </div>
    </section>
  );
}

export function PlaneBadge({ plane }: { plane: PlaneId | null | undefined }) {
  if (!plane) {
    return <span className="text-[11px] text-[var(--ink-soft)]">Multi-plane / stabilize · רב-מישורי / ייצוב</span>;
  }
  const p = planeById(plane);
  if (!p) return null;
  return (
    <span className={cn("rounded-full border px-2 py-0.5 text-[11px]", p.bg)}>
      <span className="term font-bold">{p.en.split(" ")[0]}</span>
      <span> · {p.he}</span>
    </span>
  );
}
