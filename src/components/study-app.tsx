"use client";

import { useMemo, useState } from "react";
import { Bone, Dumbbell, GraduationCap, Images, Layers, Move3d, Search, Sparkles, Waypoints } from "lucide-react";
import { muscles } from "@/data/muscles";
import { REGIONS, type RegionId } from "@/data/regions";
import { searchMuscles } from "@/data/lookups";
import { MuscleTable } from "@/components/muscle-table";
import { BoneTable } from "@/components/bone-table";
import { JointsView } from "@/components/joints-view";
import { Flashcards } from "@/components/flashcards";
import { Quiz } from "@/components/quiz";
import { PlanesView } from "@/components/planes-view";
import { CrossView } from "@/components/cross-view";
import { Atlas } from "@/components/atlas";
import { cn } from "@/lib/utils";

type Tab = "muscles" | "bones" | "joints" | "atlas" | "planes" | "cross" | "cards" | "quiz";

const TABS: { id: Tab; label: string; icon: typeof Dumbbell }[] = [
  { id: "muscles", label: "שרירים", icon: Dumbbell },
  { id: "bones", label: "עצמות", icon: Bone },
  { id: "joints", label: "מפרקים", icon: Layers },
  { id: "planes", label: "מישורים", icon: Move3d },
  { id: "cross", label: "הצלבה", icon: Waypoints },
  { id: "atlas", label: "אטלס", icon: Images },
  { id: "cards", label: "כרטיסיות", icon: Sparkles },
  { id: "quiz", label: "חידון", icon: GraduationCap },
];

export function StudyApp() {
  const [tab, setTab] = useState<Tab>("muscles");
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<RegionId | "all">("all");
  const [coreOnly, setCoreOnly] = useState(false);
  const [hidden, setHidden] = useState<{ o: boolean; i: boolean; a: boolean }>({
    o: false,
    i: false,
    a: false,
  });

  const filtered = useMemo(() => {
    let list = muscles;
    if (coreOnly) list = list.filter((m) => m.core);
    if (region !== "all") list = list.filter((m) => m.region === region);
    return searchMuscles(query, list);
  }, [query, region, coreOnly]);

  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--line)] bg-[var(--card)]/90 backdrop-blur sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.22em] text-[var(--accent)] uppercase">
                Wingate · Anatomy exam
              </p>
              <h1 className="mt-1 text-2xl font-bold leading-tight md:text-3xl">
                אנטומיה למבחן
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-[var(--ink-soft)]">
                טבלת Origin, Insertion ו־Action לכל שריר, וטבלת עצמות עם השרירים
                שמתחילים ונאחזים בכל עצם — לפי מבנה חוברת משה שחר למדריכים ומאמנים.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--ink-soft)]">
              <span className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-3 py-1">
                {muscles.length} שרירים
              </span>
              <span className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-3 py-1">
                29 עצמות / קבוצות
              </span>
            </div>
          </div>

          <nav className="mt-4 flex gap-1 overflow-x-auto pb-1 no-print">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition",
                    active
                      ? "bg-[var(--ink)] text-[var(--paper)]"
                      : "text-[var(--ink-soft)] hover:bg-[var(--paper-2)]",
                  )}
                >
                  <Icon className="size-3.5" />
                  {t.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-5 md:px-6 md:py-7">
        {tab !== "quiz" && tab !== "planes" && tab !== "joints" && tab !== "cross" && (
          <div className="mb-4 flex flex-col gap-3 no-print">
            <div className="relative">
              <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[var(--ink-soft)]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="חיפוש שריר, עצם, origin, insertion, תנועה או איור…"
                className="w-full rounded-xl border border-[var(--line)] bg-[var(--card)] py-2.5 pr-10 pl-3 text-sm outline-none ring-[var(--accent-2)] focus:ring-2"
              />
            </div>

            {(tab === "muscles" || tab === "cards") && (
              <>
                <div className="flex flex-wrap gap-1.5">
                  <FilterChip active={region === "all"} onClick={() => setRegion("all")}>
                    הכל ({coreOnly ? muscles.filter((m) => m.core).length : muscles.length})
                  </FilterChip>
                  {REGIONS.map((r) => {
                    const n = muscles.filter(
                      (m) => m.region === r.id && (!coreOnly || m.core),
                    ).length;
                    return (
                      <FilterChip
                        key={r.id}
                        active={region === r.id}
                        onClick={() => setRegion(r.id)}
                      >
                        {r.he} ({n})
                      </FilterChip>
                    );
                  })}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <label className="flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--card)] px-3 py-1.5">
                    <input
                      type="checkbox"
                      checked={coreOnly}
                      onChange={(e) => setCoreOnly(e.target.checked)}
                    />
                    ליבת החוברת בלבד
                  </label>
                  {tab === "muscles" && (
                    <>
                      <span className="text-[var(--ink-soft)]">הסתר לתרגול:</span>
                      <label className="flex items-center gap-1.5">
                        <input
                          type="checkbox"
                          checked={hidden.o}
                          onChange={(e) => setHidden((h) => ({ ...h, o: e.target.checked }))}
                        />
                        Origin
                      </label>
                      <label className="flex items-center gap-1.5">
                        <input
                          type="checkbox"
                          checked={hidden.i}
                          onChange={(e) => setHidden((h) => ({ ...h, i: e.target.checked }))}
                        />
                        Insertion
                      </label>
                      <label className="flex items-center gap-1.5">
                        <input
                          type="checkbox"
                          checked={hidden.a}
                          onChange={(e) => setHidden((h) => ({ ...h, a: e.target.checked }))}
                        />
                        Action
                      </label>
                    </>
                  )}
                  <span className="ms-auto text-xs text-[var(--ink-soft)]">
                    מוצגים {filtered.length} שרירים
                  </span>
                </div>
              </>
            )}
          </div>
        )}

        {tab === "muscles" && (
          <MuscleTable
            muscles={filtered}
            hidden={hidden}
            regionBannerId={region === "all" ? undefined : region}
          />
        )}
        {tab === "bones" && <BoneTable query={query} />}
        {tab === "joints" && <JointsView />}
        {tab === "atlas" && <Atlas query={query} />}
        {tab === "planes" && <PlanesView />}
        {tab === "cross" && <CrossView />}
        {tab === "cards" && <Flashcards muscles={filtered} />}
        {tab === "quiz" && <Quiz />}
      </main>
      <footer className="border-t border-[var(--line)] px-4 py-4 text-center text-[11px] text-[var(--ink-soft)]">
        האיורים מתוך ויקיפדיה וויקישיתוף (Gray&apos;s Anatomy, BodyParts3D ועוד) — לשימוש לימודי.
      </footer>
    </div>
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
