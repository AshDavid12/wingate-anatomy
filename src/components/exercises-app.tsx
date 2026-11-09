"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ClipboardList, ListChecks, Search, Waypoints } from "lucide-react";
import {
  DRILLS,
  EXERCISES,
  REGIONS,
  RULE_GROUPS,
  RULES,
  TARGETS,
  TOOLS,
  matchesExercise,
  searchExercises,
  toolLabel,
  type Exercise,
  type Kind,
  type RegionId,
  type Role,
  type ToolId,
} from "@/data/exercises/content";
import { cn } from "@/lib/utils";

type Tab = "map" | "pick" | "rules";
type AskRole = "strengthen" | Role;

const TABS: { id: Tab; en: string; he: string; icon: typeof ClipboardList }[] = [
  { id: "map", en: "Map", he: "מפה", icon: Waypoints },
  { id: "pick", en: "Pick", he: "בחירה", icon: ListChecks },
  { id: "rules", en: "Rules", he: "כללים", icon: ClipboardList },
];

export function ExercisesApp() {
  const [tab, setTab] = useState<Tab>("map");
  const [query, setQuery] = useState("");
  const [hide, setHide] = useState(false);
  const [region, setRegion] = useState<RegionId | "all">("all");
  const [target, setTarget] = useState<string>("pec");
  const [role, setRole] = useState<AskRole>("strengthen");
  const [tool, setTool] = useState<ToolId | "all">("all");
  const [kind, setKind] = useState<Kind | "all">("all");
  const [ruleGroup, setRuleGroup] = useState<(typeof RULE_GROUPS)[number]["id"] | "all">("all");
  const [drill, setDrill] = useState(0);
  const [open, setOpen] = useState(false);

  const memory = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TARGETS.filter((item) => {
      if (region !== "all" && item.region !== region) return false;
      if (!q) return true;
      return [item.he, item.en, item.move, item.agonist, item.hook].join(" ").toLowerCase().includes(q);
    });
  }, [query, region]);

  const picked = useMemo(() => {
    const list = searchExercises(
      query,
      EXERCISES.filter((exercise) =>
        matchesExercise(exercise, {
          target,
          role,
          tool: tool === "all" ? undefined : tool,
          kind: kind === "all" ? undefined : kind,
        }),
      ),
    );
    return list;
  }, [query, target, role, tool, kind]);

  const chosen = TARGETS.find((item) => item.id === target);
  const current = DRILLS[drill];
  const drillMatches = current
    ? EXERCISES.filter((exercise) =>
        matchesExercise(exercise, {
          target: current.target,
          role: current.role,
          tool: current.tool,
          kind: current.kind,
          chain: current.chain,
        }),
      )
    : [];

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--card)]/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.22em] text-[var(--accent)] uppercase">
                <Link href="/" className="hover:underline">
                  Wingate
                </Link>
                {" · "}
                Exercise practical
              </p>
              <h1 className="mt-1 text-2xl font-bold leading-tight md:text-3xl">
                Exercises for the practical · תרגילים למבחן המעשי
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-[var(--ink-soft)]">
                לא לשנן את כל החוברת. התנועה אומרת את השריר, והאביזר רק מסנן. ככה עונים
                כשמבקשים להדגים.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--ink-soft)]">
              <Link
                href="/"
                className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-3 py-1 font-medium text-[var(--ink)] hover:border-[var(--ink)]"
              >
                כל המקצועות
              </Link>
              <span className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-3 py-1">
                {TARGETS.length} movements · תנועות
              </span>
              <span className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-3 py-1">
                {EXERCISES.length} exercises · תרגילים
              </span>
            </div>
          </div>

          <nav className="no-print mt-4 flex gap-1 overflow-x-auto pb-1">
            {TABS.map((item) => {
              const Icon = item.icon;
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition",
                    active
                      ? "bg-[var(--ink)] text-[var(--paper)]"
                      : "text-[var(--ink-soft)] hover:bg-[var(--paper-2)]",
                  )}
                >
                  <Icon className="size-3.5" />
                  <span className="term font-semibold">{item.en}</span>
                  <span className="opacity-70">· {item.he}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-5 md:px-6 md:py-7">
        {tab !== "rules" && (
          <div className="no-print mb-4 flex flex-col gap-3">
            <div className="relative">
              <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[var(--ink-soft)]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="חיפוש: סקוואט, לט, פולי, חזה עליון, אי ספיקה…"
                className="w-full rounded-xl border border-[var(--line)] bg-[var(--card)] py-2.5 pr-10 pl-3 text-sm outline-none ring-[var(--accent)] focus:ring-2"
              />
            </div>
            {tab === "map" && (
              <label className="flex w-fit items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--card)] px-3 py-1.5 text-sm">
                <input type="checkbox" checked={hide} onChange={(event) => setHide(event.target.checked)} />
                Hide the muscle · הסתר את השריר
              </label>
            )}
          </div>
        )}

        {tab === "map" && (
          <div className="space-y-6">
            <section>
              <h2 className="text-lg font-bold">התנועה, ואז השריר</h2>
              <p className="mt-1 max-w-3xl text-sm text-[var(--ink-soft)]">
                במבחן אומרים שם של שריר. חושבים קודם איזו תנועה הוא עושה, ורק אחר כך באיזה
                אביזר. העבירו עכבר על שריר מטושטש כדי לגלות.
              </p>
              <div className="no-print mt-3 flex flex-wrap gap-1.5">
                <FilterChip active={region === "all"} onClick={() => setRegion("all")}>
                  All · הכל ({memory.length})
                </FilterChip>
                {REGIONS.map((item) => (
                  <FilterChip
                    key={item.id}
                    active={region === item.id}
                    onClick={() => setRegion(item.id)}
                  >
                    <span className="term font-bold">{item.en}</span>
                    <span className="font-normal"> · {item.he}</span>
                  </FilterChip>
                ))}
              </div>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {memory.map((item) => (
                  <li key={item.id} className="rounded-2xl border border-[var(--line)] bg-[var(--card)] px-4 py-3">
                    <p className="text-sm text-[var(--ink-soft)]">{pinNumbers(item.move)}</p>
                    <p className={cn("term mt-1 text-base font-bold text-[var(--accent)]", hide && "hide-study w-fit")}>
                      {item.agonist}
                    </p>
                    <p className="mt-1 text-sm font-semibold">{item.he}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              {memory.map((item) => {
                const list = searchExercises(
                  query,
                  EXERCISES.filter((exercise) => exercise.targets.includes(item.id)),
                );
                if (list.length === 0) return null;
                return (
                  <article key={item.id}>
                    <h3 className="text-base font-bold">
                      <span className="term text-[var(--accent)]">{item.en}</span>
                      <span className="mx-1.5 opacity-40">·</span>
                      {item.he}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--ink-soft)]">{pinNumbers(item.hook)}</p>
                    <div className="mt-2 grid gap-2">
                      {list.map((exercise) => (
                        <ExerciseCard key={exercise.id} exercise={exercise} />
                      ))}
                    </div>
                  </article>
                );
              })}
            </section>
          </div>
        )}

        {tab === "pick" && (
          <div className="space-y-6">
            <section className="space-y-3">
              <h2 className="text-lg font-bold">בונים את התשובה</h2>
              <p className="max-w-3xl text-sm text-[var(--ink-soft)]">
                {chosen ? (
                  <>
                    <span className="term font-semibold text-[var(--ink)]">{chosen.en}</span>
                    {" עושה "}
                    {pinNumbers(chosen.move)}. {pinNumbers(chosen.hook)}
                  </>
                ) : null}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {TARGETS.map((item) => (
                  <FilterChip key={item.id} active={target === item.id} onClick={() => setTarget(item.id)}>
                    <span className="term font-bold">{item.en}</span>
                  </FilterChip>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(
                  [
                    ["strengthen", "לחיזוק"],
                    ["agonist", "גם אגוניסט"],
                    ["synergist", "סינרגיסט"],
                    ["stabilizer", "מייצב"],
                  ] as const
                ).map(([id, label]) => (
                  <FilterChip key={id} active={role === id} onClick={() => setRole(id)}>
                    {label}
                  </FilterChip>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                <FilterChip active={tool === "all"} onClick={() => setTool("all")}>
                  כל אביזר
                </FilterChip>
                {TOOLS.map((item) => (
                  <FilterChip key={item.id} active={tool === item.id} onClick={() => setTool(item.id)}>
                    {item.he}
                  </FilterChip>
                ))}
                <FilterChip active={kind === "all"} onClick={() => setKind("all")}>
                  פשוט או מורכב
                </FilterChip>
                <FilterChip active={kind === "simple"} onClick={() => setKind("simple")}>
                  פשוט
                </FilterChip>
                <FilterChip active={kind === "compound"} onClick={() => setKind("compound")}>
                  מורכב
                </FilterChip>
              </div>
              {picked.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--card)] px-6 py-10 text-center text-sm text-[var(--ink-soft)]">
                  אין תרגיל כזה בחוברת. נסו אביזר אחר, או תפקיד אחר של השריר.
                </p>
              ) : (
                <div className="grid gap-2">
                  {picked.map((exercise) => (
                    <ExerciseCard
                      key={exercise.id}
                      exercise={exercise}
                      note={exercise.also?.find((item) => item.target === target && item.role === role)?.why}
                    />
                  ))}
                </div>
              )}
            </section>

            <section className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-4 md:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-bold">שאלה כמו במבחן</h2>
                <p className="text-xs text-[var(--ink-soft)]">
                  {drill + 1} / {DRILLS.length}
                </p>
              </div>
              <p className="mt-3 text-base font-semibold leading-relaxed">{current.ask}</p>
              {open && (
                <div className="mt-4 space-y-3">
                  <p className="text-sm leading-relaxed">{pinNumbers(current.explain)}</p>
                  {drillMatches.length > 0 && (
                    <div className="grid gap-2">
                      {drillMatches.map((exercise) => (
                        <ExerciseCard key={exercise.id} exercise={exercise} />
                      ))}
                    </div>
                  )}
                </div>
              )}
              <div className="no-print mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setOpen((value) => !value)}
                  className="rounded-full bg-[var(--ink)] px-4 py-1.5 text-sm font-semibold text-[var(--paper)]"
                >
                  {open ? "הסתר תשובה" : "גלה תשובה"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDrill((value) => (value + 1) % DRILLS.length);
                    setOpen(false);
                  }}
                  className="rounded-full border border-[var(--line)] px-4 py-1.5 text-sm font-semibold"
                >
                  השאלה הבאה
                </button>
              </div>
            </section>
          </div>
        )}

        {tab === "rules" && (
          <div className="space-y-4">
            <p className="max-w-3xl text-sm text-[var(--ink-soft)]">
              הכללים הקצרים שמסבירים למה התרגיל נראה ככה: מנוף, מומנט, אורך מתח, ומה
              להדגים כשמבקשים שיטת אימון.
            </p>
            <div className="no-print flex flex-wrap gap-1.5">
              <FilterChip active={ruleGroup === "all"} onClick={() => setRuleGroup("all")}>
                הכל
              </FilterChip>
              {RULE_GROUPS.map((group) => (
                <FilterChip
                  key={group.id}
                  active={ruleGroup === group.id}
                  onClick={() => setRuleGroup(group.id)}
                >
                  {group.he}
                </FilterChip>
              ))}
              <label className="flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)] px-3 py-1 text-xs">
                <input type="checkbox" checked={hide} onChange={(event) => setHide(event.target.checked)} />
                הסתר להסבר
              </label>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {RULES.filter((rule) => ruleGroup === "all" || rule.group === ruleGroup).map((rule) => (
                <article key={rule.id} className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4">
                  <p className="text-[11px] font-semibold text-[var(--accent)]">
                    {RULE_GROUPS.find((group) => group.id === rule.group)?.he}
                  </p>
                  <h2 className="mt-1 text-base font-bold">{rule.title}</h2>
                  <p className={cn("mt-2 text-sm leading-relaxed", hide && "hide-study")}>
                    {pinNumbers(rule.body)}
                  </p>
                </article>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-[var(--line)] px-4 py-5 text-center text-[11px] text-[var(--ink-soft)]">
        <p className="text-[13px] font-medium tracking-wide text-[var(--ink)]">
          Made by <span className="term text-[var(--accent)]">Gaash David</span>
          <span className="mx-1.5 opacity-40">·</span>
          נוצר על ידי געש דוד
        </p>
        <p className="mt-2">לפי חוברת התרגילים של קורס המדריכים לכושר גופני ובריאות — לשימוש לימודי.</p>
      </footer>
    </div>
  );
}

function ExerciseCard({ exercise, note }: { exercise: Exercise; note?: string }) {
  return (
    <article className="rounded-2xl border border-[var(--line)] bg-[var(--card)] px-4 py-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-bold">
          {exercise.he}
          <span className="term mx-2 text-sm font-semibold text-[var(--ink-soft)]">{exercise.en}</span>
        </h3>
        <p className="text-[11px] font-semibold text-[var(--ink-soft)]">
          {exercise.kind === "simple" ? "פשוט" : "מורכב"}
          <span className="mx-1 opacity-40">·</span>
          {exercise.chain === "open" ? "שרשרת פתוחה" : "שרשרת סגורה"}
        </p>
      </div>
      <p className="mt-1 text-xs text-[var(--ink-soft)]">
        {exercise.tools.map((id) => toolLabel(id)).join(" · ")}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed">{pinNumbers(note ?? exercise.hook)}</p>
    </article>
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

function pinNumbers(value: string) {
  return value.replace(
    /[+\u00d7]?\d[\d,.]*(?:\s*[–\-−/]\s*[+\u00d7]?\d[\d,.]*)*%?/g,
    (match) => `\u200E${match}\u200E`,
  );
}
