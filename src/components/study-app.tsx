"use client";

import { useMemo, useState } from "react";
import { BookOpen, Bone, Dumbbell, GraduationCap, Hash, Images, Layers, Lightbulb, Move3d, ScanSearch, Search, Sparkles, Waypoints } from "lucide-react";
import { muscles } from "@/data/muscles";
import { dictionaryTerms } from "@/data/dictionary";
import { examLandmarks } from "@/data/landmarks";
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
import { Glossary } from "@/components/glossary";
import { LandmarksView } from "@/components/landmarks-view";
import { RegionLogicBanner, WhyView } from "@/components/why-view";
import { OiHooksStrip } from "@/components/oi-mnemonics";
import { MemorizeView } from "@/components/memorize-view";
import { OI_HOOKS } from "@/data/oi-mnemonics";
import { cn } from "@/lib/utils";

type Tab =
  | "muscles"
  | "why"
  | "memorize"
  | "bones"
  | "landmarks"
  | "joints"
  | "atlas"
  | "planes"
  | "cross"
  | "glossary"
  | "cards"
  | "quiz";
type CardDeck = "muscles" | "dictionary" | "landmarks" | "hooks";

const TABS: { id: Tab; en: string; he: string; icon: typeof Dumbbell }[] = [
  { id: "muscles", en: "Muscles", he: "שרירים", icon: Dumbbell },
  { id: "why", en: "Why", he: "היגיון", icon: Lightbulb },
  { id: "memorize", en: "Memorize", he: "שינון", icon: Hash },
  { id: "bones", en: "Bones", he: "עצמות", icon: Bone },
  { id: "landmarks", en: "Landmarks", he: "חלקי עצם", icon: ScanSearch },
  { id: "joints", en: "Joints", he: "מפרקים", icon: Layers },
  { id: "planes", en: "Planes", he: "מישורים", icon: Move3d },
  { id: "cross", en: "Cross", he: "הצלבה", icon: Waypoints },
  { id: "glossary", en: "Glossary", he: "מילון", icon: BookOpen },
  { id: "atlas", en: "Atlas", he: "אטלס", icon: Images },
  { id: "cards", en: "Cards", he: "כרטיסיות", icon: Sparkles },
  { id: "quiz", en: "Quiz", he: "חידון", icon: GraduationCap },
];

export function StudyApp() {
  const [tab, setTab] = useState<Tab>("muscles");
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<RegionId | "all">("all");
  const [cardDeck, setCardDeck] = useState<CardDeck>("muscles");
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
                Anatomy for the exam · אנטומיה למבחן
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-[var(--ink-soft)]">
                Origin, Insertion, and Action for every muscle — deduce movement in{" "}
                <span className="term">Why · היגיון</span>, and memorize attachments in{" "}
                <span className="term">Memorize · שינון</span>.
              </p>
              <p className="mt-1 max-w-2xl text-sm text-[var(--ink-soft)]">
                טבלת Origin, Insertion ו־Action לכל שריר — בלשונית «היגיון» איך להסיק
                תנועה, ובלשונית «שינון» קיצורים לאחיזות.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--ink-soft)]">
              <span className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-3 py-1">
                {muscles.length} muscles · שרירים
              </span>
              <span className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-3 py-1">
                29 bones · עצמות / קבוצות
              </span>
              <span className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-3 py-1">
                {examLandmarks.length} landmarks · חלקי עצם
              </span>
              <span className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-3 py-1">
                {dictionaryTerms.length} glossary · מונחי מילון
              </span>
              <span className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-3 py-1">
                {OI_HOOKS.length} memory tips · קיצורי שינון
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
                  <span className="term font-semibold">{t.en}</span>
                  <span className="opacity-70">· {t.he}</span>
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
                placeholder={
                  tab === "glossary" || (tab === "cards" && cardDeck === "dictionary")
                    ? "Search a term in English, Hebrew, or by topic… · חיפוש מונח בעברית, באנגלית או לפי נושא…"
                    : tab === "landmarks" || (tab === "cards" && cardDeck === "landmarks")
                      ? "Search a landmark: acromion, ASIS, זיז, גומה…"
                      : tab === "memorize" || (tab === "cards" && cardDeck === "hooks")
                      ? "Search a tip: SITS, PFPF, lady, pes, CAS, coracoid…"
                      : "Search muscle, bone, origin, insertion, action, SITS, PFPF… · חיפוש שריר, עצם, origin, או קיצור שינון…"
                }
                className="w-full rounded-xl border border-[var(--line)] bg-[var(--card)] py-2.5 pr-10 pl-3 text-sm outline-none ring-[var(--accent-2)] focus:ring-2"
              />
            </div>

            {tab === "cards" && (
              <div className="flex flex-wrap gap-1.5">
                <FilterChip
                  active={cardDeck === "muscles"}
                  onClick={() => setCardDeck("muscles")}
                >
                  Muscles · שרירים
                </FilterChip>
                <FilterChip
                  active={cardDeck === "dictionary"}
                  onClick={() => setCardDeck("dictionary")}
                >
                  Glossary · מילון שלד-שריר ({dictionaryTerms.length})
                </FilterChip>
                <FilterChip
                  active={cardDeck === "landmarks"}
                  onClick={() => setCardDeck("landmarks")}
                >
                  Landmarks · חלקי עצם ({examLandmarks.length})
                </FilterChip>
                <FilterChip
                  active={cardDeck === "hooks"}
                  onClick={() => setCardDeck("hooks")}
                >
                  Memory hooks · קיצורי שינון
                </FilterChip>
              </div>
            )}

            {(tab === "muscles" ||
              tab === "why" ||
              tab === "memorize" ||
              (tab === "cards" && (cardDeck === "muscles" || cardDeck === "hooks"))) && (
              <>
                <div className="flex flex-wrap gap-1.5">
                  <FilterChip active={region === "all"} onClick={() => setRegion("all")}>
                    All · הכל (
                    {tab === "memorize"
                      ? OI_HOOKS.length
                      : coreOnly
                        ? muscles.filter((m) => m.core).length
                        : muscles.length}
                    )
                  </FilterChip>
                  {REGIONS.map((r) => {
                    const n =
                      tab === "memorize"
                        ? OI_HOOKS.filter((h) => h.regions.includes(r.id)).length
                        : muscles.filter((m) => m.region === r.id && (!coreOnly || m.core)).length;
                    return (
                      <FilterChip
                        key={r.id}
                        active={region === r.id}
                        onClick={() => setRegion(r.id)}
                      >
                        <span className="term font-bold">{r.en}</span>
                        <span className="font-normal"> · {r.he}</span> ({n})
                      </FilterChip>
                    );
                  })}
                </div>
                {tab !== "memorize" && (
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <label className="flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--card)] px-3 py-1.5">
                      <input
                        type="checkbox"
                        checked={coreOnly}
                        onChange={(e) => setCoreOnly(e.target.checked)}
                      />
                      Core booklet only · ליבת החוברת בלבד
                    </label>
                    {tab === "muscles" && (
                      <>
                        <span className="text-[var(--ink-soft)]">Hide to practice · הסתר לתרגול:</span>
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
                      Showing {filtered.length} muscles · מוצגים {filtered.length} שרירים
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {tab === "muscles" && (
          <div className="space-y-4">
            {region !== "all" && <RegionLogicBanner regionId={region} />}
            <OiHooksStrip region={region} query={query} />
            <MuscleTable
              muscles={filtered}
              hidden={hidden}
              regionBannerId={region === "all" ? undefined : region}
            />
          </div>
        )}
        {tab === "why" && <WhyView list={filtered} region={region} />}
        {tab === "memorize" && <MemorizeView region={region} query={query} />}
        {tab === "bones" && <BoneTable query={query} />}
        {tab === "landmarks" && <LandmarksView query={query} />}
        {tab === "joints" && <JointsView />}
        {tab === "atlas" && <Atlas query={query} />}
        {tab === "planes" && <PlanesView />}
        {tab === "cross" && <CrossView />}
        {tab === "glossary" && <Glossary query={query} />}
        {tab === "cards" && (
          <Flashcards muscles={filtered} deck={cardDeck} query={query} region={region} />
        )}
        {tab === "quiz" && <Quiz />}
      </main>
      <footer className="border-t border-[var(--line)] px-4 py-5 text-center text-[11px] text-[var(--ink-soft)]">
        <p className="text-[13px] font-medium tracking-wide text-[var(--ink)]">
          Made by <span className="term text-[var(--accent)]">Gaash David</span>
          <span className="mx-1.5 opacity-40">·</span>
          נוצר על ידי געש דוד
        </p>
        <p className="mt-2">
          Lower-limb figures from the course slides; other images from Wikipedia / Wikimedia (Gray&apos;s Anatomy, BodyParts3D) — for study use.
          איורי הגף התחתון מתוך מצגת הקורס; יתר האיורים מוויקיפדיה וויקישיתוף — לשימוש לימודי.
        </p>
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
