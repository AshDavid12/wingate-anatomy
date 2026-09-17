"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Target } from "lucide-react";
import {
  ACTION_GROUPS,
  type ActionGroup,
} from "@/data/action-groups";
import {
  DRILL_KIND_LABEL,
  DRILL_KINDS,
  generateActionGroupQuestion,
  type DrillKind,
  type DrillQuestion,
} from "@/data/action-group-quiz";
import { EmptyState } from "@/components/muscle-table";
import { cn } from "@/lib/utils";

const MIX: DrillKind | "mix" = "mix";

export function ActionGroupDrill({
  pool,
  universe = ACTION_GROUPS,
}: {
  pool: ActionGroup[];
  universe?: ActionGroup[];
}) {
  const [kind, setKind] = useState<DrillKind | "mix">("mix");
  const [q, setQ] = useState<DrillQuestion | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState({ ok: 0, n: 0, streak: 0, best: 0 });
  const recent = useRef<string[]>([]);

  const kinds = useMemo(() => (kind === "mix" ? [...DRILL_KINDS] : [kind]), [kind]);

  function loadNext(nextKinds = kinds) {
    const avoid = new Set(recent.current);
    const next = generateActionGroupQuestion(pool, nextKinds, universe, avoid);
    if (next) {
      recent.current = [...recent.current, next.id].slice(-40);
    }
    setQ(next);
    setPicked([]);
    setChecked(false);
    document.getElementById("movement-practice")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    setScore({ ok: 0, n: 0, streak: 0, best: 0 });
  }, [pool, universe]);

  useEffect(() => {
    recent.current = [];
    const nextKinds = kind === "mix" ? [...DRILL_KINDS] : [kind];
    const next = generateActionGroupQuestion(pool, nextKinds, universe);
    if (next) recent.current = [next.id];
    setQ(next);
    setPicked([]);
    setChecked(false);
  }, [pool, universe, kind]);

  const pct = score.n === 0 ? 0 : Math.round((100 * score.ok) / score.n);
  const answerSet = new Set(q?.answers ?? []);
  const correct =
    checked &&
    !!q &&
    picked.length === q.answers.length &&
    picked.every((id) => answerSet.has(id));

  function toggle(id: string) {
    if (checked || !q) return;
    if (q.multi) {
      setPicked((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
      return;
    }
    grade([id]);
  }

  function grade(selection = picked) {
    if (!q || checked) return;
    const ok =
      selection.length === q.answers.length && selection.every((id) => answerSet.has(id));
    setPicked(selection);
    setChecked(true);
    setScore((s) => {
      const streak = ok ? s.streak + 1 : 0;
      return {
        ok: s.ok + (ok ? 1 : 0),
        n: s.n + 1,
        streak,
        best: Math.max(s.best, streak),
      };
    });
  }

  return (
    <section
      id="movement-practice"
      className="scroll-mt-28 space-y-4 rounded-2xl border border-[var(--ink)] bg-[var(--card)] p-4 shadow-sm md:p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Target className="size-4 text-[var(--accent)]" />
            <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--accent)] uppercase">
              Practice the table · תרגול הטבלה
            </p>
          </div>
          <h3 className="mt-1 text-xl font-bold">מי שייך לקבוצת התנועה — ומי לא</h3>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
            שאלות שחוזרות על אותה טבלה: מי שייך, מי לא שייך, לאיזו קבוצה, עיקרי או משנה.
            אפשר לתרגל בלי הפסקה — הציון נשמר עד שמחליפים אזור או סוג שאלה.
          </p>
          <p className="term mt-1 max-w-2xl text-xs leading-relaxed text-[var(--ink-soft)]">
            Same booklet groups: belongs, odd one out, which group, prime vs accessory, select-all.
          </p>
        </div>
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-center">
          <p className="term text-2xl font-bold tabular-nums" dir="ltr">
            {score.ok} / {score.n}
          </p>
          <p className="text-[11px] text-[var(--ink-soft)]" dir="ltr">
            {score.n > 0 ? `${pct}%` : "Score · ציון"}
            {score.streak > 0 ? ` · streak ${score.streak}` : ""}
            {score.best > 1 ? ` · best ${score.best}` : ""}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <KindChip active={kind === MIX} onClick={() => setKind("mix")}>
          Mix · ערבוב
        </KindChip>
        {DRILL_KINDS.map((k) => (
          <KindChip key={k} active={kind === k} onClick={() => setKind(k)}>
            <span className="term font-bold">{DRILL_KIND_LABEL[k].en}</span>
            <span className="font-normal"> · {DRILL_KIND_LABEL[k].he}</span>
          </KindChip>
        ))}
      </div>

      {pool.length === 0 ? (
        <EmptyState
          title="No groups to quiz · אין קבוצות לתרגול"
          body="Try another region or search. · נסו אזור או חיפוש אחר."
        />
      ) : !q ? (
        <EmptyState
          title="Not enough muscles for this question type · אין מספיק שרירים לסוג הזה"
          body="Pick Mix, or another type. · בחרו ערבוב או סוג אחר."
        />
      ) : (
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)]/70 p-4 md:p-5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {DRILL_KIND_LABEL[q.kind].en} · {DRILL_KIND_LABEL[q.kind].he}
            <span className="ms-2 font-medium normal-case tracking-normal text-[var(--ink-soft)]">
              {q.groupEn} · {q.groupHe}
            </span>
          </p>
          <h4 className="mt-2 text-lg font-bold leading-snug md:text-xl">{q.promptHe}</h4>
          <p className="term mt-1 text-sm text-[var(--ink-soft)]">{q.promptEn}</p>
          {q.multi && !checked && (
            <p className="mt-2 text-xs text-[var(--ink-soft)]">
              Tap every matching muscle, then check. · סמנו את כל המתאימים ואז בדקו.
            </p>
          )}

          <div className="mt-4 grid gap-2">
            {q.options.map((opt, i) => {
              const selected = picked.includes(opt.id);
              const isAnswer = answerSet.has(opt.id);
              const missed = checked && isAnswer && !selected;
              const wrong = checked && selected && !isAnswer;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggle(opt.id)}
                  className={cn(
                    "rounded-xl border px-4 py-3 text-right transition",
                    !checked && "border-[var(--line)] hover:border-[var(--ink)] hover:bg-[var(--card)]",
                    !checked && selected && "border-[var(--ink)] bg-[var(--card)]",
                    checked && isAnswer && "border-emerald-700 bg-emerald-50",
                    wrong && "border-red-700 bg-red-50",
                    checked && !isAnswer && !selected && "border-[var(--line)] opacity-50",
                    missed && "ring-1 ring-emerald-700",
                  )}
                >
                  <span className="flex items-start gap-3">
                    <span className="term mt-0.5 w-5 shrink-0 text-xs font-bold text-[var(--ink-soft)]">
                      {q.multi
                        ? checked
                          ? isAnswer
                            ? "☑"
                            : "☐"
                          : selected
                            ? "☑"
                            : "☐"
                        : String.fromCharCode(65 + i)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="term block font-bold leading-snug">{opt.en}</span>
                      <span className="block text-[12px] text-[var(--ink-soft)]">{opt.he}</span>
                      {missed && q.multi && (
                        <span className="mt-1 block text-[11px] font-medium text-emerald-800">
                          Missed · פספסתם
                        </span>
                      )}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {q.multi && !checked && (
            <button
              type="button"
              disabled={picked.length === 0}
              onClick={() => grade()}
              className="mt-4 rounded-full bg-[var(--ink)] px-5 py-2 text-sm text-[var(--paper)] disabled:opacity-40"
            >
              Check · בדקו
            </button>
          )}

          {checked && (
            <div className="mt-4 space-y-3">
              <p className={cn("text-sm font-semibold", correct ? "text-emerald-800" : "text-red-800")}>
                {correct
                  ? "Correct · נכון"
                  : "Not quite — green is the answer · לא מדויק — התשובה מסומנת בירוק"}
              </p>
              <p className="whitespace-pre-line rounded-xl bg-[var(--card)] px-4 py-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                {q.explainHe}
                <span className="term mt-3 block whitespace-pre-line text-xs">{q.explainEn}</span>
              </p>
              <button
                type="button"
                onClick={() => loadNext()}
                className="rounded-full bg-[var(--ink)] px-5 py-2 text-sm text-[var(--paper)]"
              >
                Next question · שאלה הבאה
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function KindChip({
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
