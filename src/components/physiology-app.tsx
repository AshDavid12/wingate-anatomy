"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  BookOpen,
  Droplets,
  GraduationCap,
  Search,
  Sparkles,
  Wind,
  Zap,
} from "lucide-react";
import { PHYSIO_CARDS, searchCards, topicLabel } from "@/data/physiology";
import { PATHWAY_ROWS, PATHWAY_TRAITS } from "@/data/physiology/pathways";
import { PHYSIO_QUESTIONS } from "@/data/physiology/questions";
import { PHYSIO_TOPICS, type PhysioCard, type PhysioTopicId } from "@/data/physiology/types";
import { PhysiologyQuiz } from "@/components/physiology-quiz";
import { cn } from "@/lib/utils";

type Tab = PhysioTopicId | "cards" | "quiz";

const TABS: { id: Tab; en: string; he: string; icon: typeof Activity }[] = [
  { id: "concepts", en: "Concepts", he: "מושגים", icon: BookOpen },
  { id: "nutrition", en: "Nutrition", he: "הרכב ותזונה", icon: Droplets },
  { id: "foundations", en: "Foundations", he: "יסודות", icon: Activity },
  { id: "pathways", en: "Pathways", he: "מסלולים", icon: Zap },
  { id: "oxygen", en: "Oxygen", he: "חמצן והתאוששות", icon: Wind },
  { id: "cards", en: "Cards", he: "כרטיסיות", icon: Sparkles },
  { id: "quiz", en: "Quiz", he: "חידון", icon: GraduationCap },
];

export function PhysiologyApp() {
  const [tab, setTab] = useState<Tab>("concepts");
  const [query, setQuery] = useState("");
  const [hide, setHide] = useState(false);
  const [cardTopic, setCardTopic] = useState<PhysioTopicId | "all">("all");

  const cards = useMemo(() => {
    if (tab === "cards") return searchCards(query, cardTopic);
    if (tab === "quiz") return [];
    return searchCards(query, tab);
  }, [tab, query, cardTopic]);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--card)]/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.22em] text-[var(--accent-2)] uppercase">
                <Link href="/" className="hover:underline">
                  Wingate
                </Link>
                {" · "}
                Physiology exam
              </p>
              <h1 className="mt-1 text-2xl font-bold leading-tight md:text-3xl">
                Physiology for the exam · פיזיולוגיה למבחן
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-[var(--ink-soft)]">
                פיזיולוגיה של תפקוד האדם: הרכב הגוף, הומאוסטזיס, מסלולי ATP, צח״מ, סף
                אנאירובי והתאוששות. זה פרק המבחן של אוקטובר, לא מבחן המערכות של נובמבר.
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
                {PHYSIO_CARDS.length} cards · כרטיסי לימוד
              </span>
              <span className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-3 py-1">
                {PHYSIO_QUESTIONS.length} questions · שאלות
              </span>
            </div>
          </div>

          <nav className="no-print mt-4 flex gap-1 overflow-x-auto pb-1">
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
        <div className="no-print mb-4 flex flex-col gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[var(--ink-soft)]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="חיפוש: ATP, סף, גליקוגן, PFK, הומאוסטזיס…"
              className="w-full rounded-xl border border-[var(--line)] bg-[var(--card)] py-2.5 pr-10 pl-3 text-sm outline-none ring-[var(--accent-2)] focus:ring-2"
            />
          </div>

          {tab === "cards" && (
            <div className="flex flex-wrap gap-1.5">
              <FilterChip active={cardTopic === "all"} onClick={() => setCardTopic("all")}>
                All · הכל ({searchCards(query).length})
              </FilterChip>
              {PHYSIO_TOPICS.map((t) => (
                <FilterChip
                  key={t.id}
                  active={cardTopic === t.id}
                  onClick={() => setCardTopic(t.id)}
                >
                  <span className="term font-bold">{t.en}</span>
                  <span className="font-normal"> · {t.he}</span> ({searchCards(query, t.id).length})
                </FilterChip>
              ))}
            </div>
          )}

          {tab !== "quiz" && tab !== "cards" && (
            <label className="flex w-fit items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--card)] px-3 py-1.5 text-sm">
              <input type="checkbox" checked={hide} onChange={(e) => setHide(e.target.checked)} />
              Hide to practice · הסתר לתרגול
            </label>
          )}
        </div>

        {tab === "pathways" && <PathwayTables />}
        {tab === "quiz" ? (
          <PhysiologyQuiz query={query} />
        ) : tab === "cards" ? (
          <CardDeck cards={cards} />
        ) : (
          <FactList cards={cards} hide={hide} />
        )}
      </main>

      <footer className="border-t border-[var(--line)] px-4 py-5 text-center text-[11px] text-[var(--ink-soft)]">
        <p className="text-[13px] font-medium tracking-wide text-[var(--ink)]">
          Made by <span className="term text-[var(--accent)]">Gaash David</span>
          <span className="mx-1.5 opacity-40">·</span>
          נוצר על ידי געש דוד
        </p>
        <p className="mt-2">
          חומר לימוד לפי נושאי השיעור בפיזיולוגיה של תפקוד האדם — לשימוש לימודי.
        </p>
      </footer>
    </div>
  );
}

function FactList({ cards, hide }: { cards: PhysioCard[]; hide: boolean }) {
  if (cards.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--card)] px-6 py-12 text-center text-sm text-[var(--ink-soft)]">
        אין כרטיסים לחיפוש הזה.
      </p>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {cards.map((card) => (
        <article key={card.id} className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4">
          <p className="text-[11px] font-semibold tracking-wide text-[var(--accent-2)]">
            <span className="term">{card.titleEn}</span>
            <span className="mx-1 opacity-40">·</span>
            {topicLabel(card.topic).split(" · ")[1]}
          </p>
          <h2 className="mt-1 text-lg font-bold">{card.titleHe}</h2>
          <div className={cn("mt-2 text-sm leading-relaxed text-[var(--ink)]", hide && "hide-study")}>
            <p>{card.bodyHe}</p>
            {card.bullets && (
              <ul className="mt-2 list-disc space-y-1 ps-5">
                {card.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}

function PathwayTables() {
  return (
    <div className="mb-6 space-y-4">
      <section className="overflow-x-auto rounded-2xl border border-[var(--line)] bg-[var(--card)]">
        <table className="w-full min-w-[720px] text-right text-sm">
          <thead className="border-b border-[var(--line)] bg-[var(--paper-2)] text-xs">
            <tr>
              <th className="px-3 py-2 font-semibold">מסלול</th>
              <th className="px-3 py-2 font-semibold">זמן</th>
              <th className="px-3 py-2 font-semibold">דלק</th>
              <th className="px-3 py-2 font-semibold">תוצרים</th>
              <th className="px-3 py-2 font-semibold">דוגמאות</th>
            </tr>
          </thead>
          <tbody>
            {PATHWAY_ROWS.map((row) => (
              <tr key={row.id} className="border-b border-[var(--line)] last:border-0 align-top">
                <th className="px-3 py-3 font-bold">
                  {row.nameHe}
                  <span className="term mt-0.5 block text-[11px] font-semibold text-[var(--ink-soft)]">
                    {row.nameEn}
                  </span>
                </th>
                <td className="px-3 py-3">{row.time}</td>
                <td className="px-3 py-3">{row.fuels}</td>
                <td className="px-3 py-3">{row.products}</td>
                <td className="px-3 py-3 text-[var(--ink-soft)]">{row.examples}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="overflow-x-auto rounded-2xl border border-[var(--line)] bg-[var(--card)]">
        <table className="w-full min-w-[640px] text-right text-sm">
          <thead className="border-b border-[var(--line)] bg-[var(--paper-2)] text-xs">
            <tr>
              <th className="px-3 py-2 font-semibold">מאפיין</th>
              <th className="px-3 py-2 font-semibold">אלקטי</th>
              <th className="px-3 py-2 font-semibold">לקטי</th>
              <th className="px-3 py-2 font-semibold">אירובי</th>
            </tr>
          </thead>
          <tbody>
            {PATHWAY_TRAITS.map((row) => (
              <tr key={row.trait} className="border-b border-[var(--line)] last:border-0">
                <th className="px-3 py-2 font-semibold">{row.trait}</th>
                <td className="px-3 py-2">{row.alactic}</td>
                <td className="px-3 py-2">{row.lactic}</td>
                <td className="px-3 py-2">{row.aerobic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function CardDeck({ cards }: { cards: PhysioCard[] }) {
  if (cards.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--card)] px-6 py-12 text-center text-sm text-[var(--ink-soft)]">
        אין כרטיסיות לחיפוש הזה.
      </p>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <FlipCard key={card.id} card={card} />
      ))}
    </div>
  );
}

function FlipCard({ card }: { card: PhysioCard }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOpen((value) => !value)}
      className="flex min-h-44 flex-col rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 text-right transition hover:border-[var(--ink)]"
    >
      <span className="text-[11px] font-semibold tracking-wide text-[var(--accent-2)]">
        <span className="term">{card.titleEn}</span>
      </span>
      {open ? (
        <span className="mt-2 text-sm leading-relaxed">
          {card.bodyHe}
          {card.bullets && (
            <span className="mt-2 block text-[var(--ink-soft)]">{card.bullets.join(" · ")}</span>
          )}
        </span>
      ) : (
        <span className="mt-3 text-lg font-bold leading-snug">{card.titleHe}</span>
      )}
      <span className="mt-auto pt-3 text-[11px] text-[var(--ink-soft)]">
        {open ? "לחצו כדי להסתיר" : "לחצו כדי לגלות"}
      </span>
    </button>
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
