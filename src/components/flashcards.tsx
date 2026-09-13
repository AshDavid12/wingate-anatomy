"use client";

import { useEffect, useMemo, useState } from "react";
import type { Muscle } from "@/data/types";
import { DICTIONARY_TOPICS, dictionaryTerms, searchDictionary, topicLabel } from "@/data/dictionary";
import { LANDMARK_REGIONS, examLandmarks, searchLandmarks, type LandmarkRegionId } from "@/data/landmarks";
import { anatomyImage } from "@/data/anatomy-images";
import { EmptyState } from "@/components/muscle-table";
import { AnatomyThumb } from "@/components/anatomy-image";
import { NamePair } from "@/components/name-pair";
import { whyById } from "@/data/why-moves";
import { hooksForMuscle, hooksForRegion, hooksMatchingQuery } from "@/data/oi-mnemonics";
import type { RegionId } from "@/data/regions";
import { cn } from "@/lib/utils";

export function Flashcards({
  muscles,
  deck,
  query = "",
  region = "all",
}: {
  muscles: Muscle[];
  deck: "muscles" | "dictionary" | "landmarks" | "hooks";
  query?: string;
  region?: RegionId | "all";
}) {
  if (deck === "dictionary") {
    return <DictionaryCards query={query} />;
  }
  if (deck === "landmarks") {
    return <LandmarkCards query={query} />;
  }
  if (deck === "hooks") {
    return <HookCards query={query} region={region} />;
  }
  return <MuscleCards muscles={muscles} />;
}

function MuscleCards({ muscles }: { muscles: Muscle[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());

  useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [muscles]);

  if (muscles.length === 0) {
    return <EmptyState title="No cards · אין כרטיסיות" body="Change the filter to see muscles. · שנו את הסינון כדי לראות שרירים." />;
  }

  const i = index % muscles.length;
  const m = muscles[i];
  if (!m) {
    return <EmptyState title="No cards · אין כרטיסיות" body="Change the filter to see muscles. · שנו את הסינון כדי לראות שרירים." />;
  }
  const progress = known.size;

  function next(delta: number) {
    setFlipped(false);
    setIndex((n) => (n + delta + muscles.length) % muscles.length);
  }

  function markKnown() {
    setKnown((s) => new Set(s).add(m.id));
    next(1);
  }

  return (
    <div className="mx-auto max-w-xl">
      <p className="mb-3 text-center text-sm text-[var(--ink-soft)]">
        Card {i + 1} of {muscles.length} · כרטיס {i + 1} מתוך {muscles.length} · marked known · סימנתם כ״יודע״ {progress}
      </p>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className={cn(
          "min-h-[320px] w-full rounded-3xl border border-[var(--line)] p-6 text-right shadow-md transition",
          flipped ? "bg-[var(--ink)] text-[var(--paper)]" : "bg-[var(--card)]",
        )}
      >
        {!flipped ? (
          <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">Muscle · שריר</p>
            <AnatomyThumb
              kind="muscles"
              id={m.id}
              alt={m.nameHe}
              size="md"
              className="mx-auto mt-4"
              interactive={false}
            />
            <h2 className="term mt-3 text-3xl font-bold">{m.nameEn}</h2>
            <p className="mt-2 text-lg opacity-70">{m.nameHe}</p>
            <p className="mt-6 text-sm opacity-60">Tap to reveal Origin · Insertion · Action · לחצו לחשיפה</p>
          </div>
        ) : (
          <div className="space-y-4 text-sm leading-relaxed">
            <div className="flex items-start gap-3">
              <AnatomyThumb
                kind="muscles"
                id={m.id}
                alt={m.nameHe}
                size="sm"
                className="border-[var(--ink-soft)]/30"
                interactive={false}
              />
              <h2 className="text-xl">
                <NamePair
                  en={m.nameEn}
                  he={m.nameHe}
                  stacked={false}
                  enClassName="text-xl"
                  heClassName="text-base opacity-70"
                />
              </h2>
            </div>
            <Block label="Origin" he={m.originHe} en={m.originEn} />
            <Block label="Insertion" he={m.insertionHe} en={m.insertionEn} />
            <Block label="Action" he={m.actionHe} en={m.actionEn} />
            {whyById(m.id) && (
              <div className="rounded-xl border border-white/15 bg-white/5 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-200">
                  Why it moves · למה זה זז
                </p>
                <p className="mt-1 leading-relaxed">{whyById(m.id)!.becauseHe}</p>
                <p className="term mt-1 text-xs opacity-70">{whyById(m.id)!.becauseEn}</p>
              </div>
            )}
            {hooksForMuscle(m.id).length > 0 && (
              <div className="rounded-xl border border-white/15 bg-white/5 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-amber-200">
                  Memory hook · קיצור שינון
                </p>
                {hooksForMuscle(m.id).map((h) => (
                  <div key={h.id} className="mt-2">
                    <p className="font-bold">{h.acronym} — {h.titleEn}</p>
                    <p className="mt-0.5 leading-relaxed">{h.hookHe}</p>
                    <p className="term mt-0.5 text-xs opacity-70">{h.hookEn}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </button>
      <CardNav onPrev={() => next(-1)} onNext={() => next(1)} onKnown={markKnown} />
    </div>
  );
}

function HookCards({ query, region }: { query: string; region: RegionId | "all" }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());

  const hooks = useMemo(() => {
    const byQuery = hooksMatchingQuery(query);
    if (region === "all") return byQuery;
    const allowed = new Set(hooksForRegion(region).map((h) => h.id));
    return byQuery.filter((h) => allowed.has(h.id));
  }, [query, region]);

  useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [query, region, hooks.length]);

  if (hooks.length === 0) {
    return (
      <EmptyState
        title="No hooks · אין קיצורים"
        body="Change the region or search. · שנו אזור או חיפוש."
      />
    );
  }

  const i = index % hooks.length;
  const h = hooks[i];
  if (!h) {
    return (
      <EmptyState
        title="No hooks · אין קיצורים"
        body="Change the region or search. · שנו אזור או חיפוש."
      />
    );
  }

  function next(delta: number) {
    setFlipped(false);
    setIndex((n) => (n + delta + hooks.length) % hooks.length);
  }

  function markKnown() {
    setKnown((s) => new Set(s).add(h.id));
    next(1);
  }

  return (
    <div className="mx-auto max-w-xl">
      <p className="mb-3 text-center text-sm text-[var(--ink-soft)]">
        Card {i + 1} of {hooks.length} · כרטיס {i + 1} מתוך {hooks.length} · marked known · סימנתם כ״יודע״ {known.size}
      </p>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className={cn(
          "min-h-[320px] w-full rounded-3xl border border-[var(--line)] p-6 text-right shadow-md transition",
          flipped ? "bg-[var(--ink)] text-[var(--paper)]" : "bg-[var(--card)]",
        )}
      >
        {!flipped ? (
          <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              Memory hook · קיצור שינון
            </p>
            <h2 className="term mt-6 text-5xl font-bold">{h.acronym}</h2>
            <p className="mt-4 text-sm opacity-70">{h.landmarkEn}</p>
            <p className="text-sm opacity-60">{h.landmarkHe}</p>
            <p className="mt-6 text-sm opacity-60">Tap to reveal the group · לחצו לחשיפת הקבוצה</p>
          </div>
        ) : (
          <div className="space-y-3 text-sm leading-relaxed">
            <h2 className="term text-3xl font-bold">{h.acronym}</h2>
            <p className="text-lg font-bold">{h.titleEn}</p>
            <p className="opacity-70">{h.titleHe}</p>
            <Block label="Landmark" he={h.landmarkHe} en={h.landmarkEn} />
            <p>{h.hookHe}</p>
            <p className="term text-xs opacity-70">{h.hookEn}</p>
            <p className="text-xs opacity-80">{h.detailHe}</p>
            <p className="term text-xs opacity-60">{h.detailEn}</p>
          </div>
        )}
      </button>
      <CardNav onPrev={() => next(-1)} onNext={() => next(1)} onKnown={markKnown} />
    </div>
  );
}

function DictionaryCards({ query }: { query: string }) {
  const [topic, setTopic] = useState<string | "all">("all");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());

  const terms = useMemo(() => {
    const list = searchDictionary(query);
    return topic === "all" ? list : list.filter((t) => t.topic === topic);
  }, [query, topic]);

  useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [query, topic, terms.length]);

  if (terms.length === 0) {
    return <EmptyState title="No cards · אין כרטיסיות" body="Change the search or glossary topic. · שנו את החיפוש או נושא המילון." />;
  }

  const i = index % terms.length;
  const t = terms[i];
  if (!t) {
    return <EmptyState title="No cards · אין כרטיסיות" body="Change the search or glossary topic. · שנו את החיפוש או נושא המילון." />;
  }

  function next(delta: number) {
    setFlipped(false);
    setIndex((n) => (n + delta + terms.length) % terms.length);
  }

  function markKnown() {
    setKnown((s) => new Set(s).add(t.id));
    next(1);
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-4 flex flex-wrap justify-center gap-1.5">
        <TopicChip active={topic === "all"} onClick={() => setTopic("all")}>
          All · הכל ({searchDictionary(query).length})
        </TopicChip>
        {DICTIONARY_TOPICS.map((tp) => {
          const n = searchDictionary(query).filter((x) => x.topic === tp).length;
          if (n === 0) return null;
          return (
            <TopicChip key={tp} active={topic === tp} onClick={() => setTopic(tp)}>
              {topicLabel(tp)}
            </TopicChip>
          );
        })}
      </div>
      <p className="mb-3 text-center text-sm text-[var(--ink-soft)]">
        Card {i + 1} of {terms.length} · כרטיס {i + 1} מתוך {terms.length} · marked known · סימנתם כ״יודע״ {known.size}
        <span className="mx-1">·</span>
        {dictionaryTerms.length} glossary terms · מונחים במילון
      </p>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className={cn(
          "min-h-[320px] w-full rounded-3xl border border-[var(--line)] p-6 text-right shadow-md transition",
          flipped ? "bg-[var(--ink)] text-[var(--paper)]" : "bg-[var(--card)]",
        )}
      >
        {!flipped ? (
          <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">{topicLabel(t.topic)}</p>
            <h2 className="term mt-4 text-3xl font-bold">{t.en || t.he}</h2>
            {t.en && <p className="mt-2 text-lg opacity-70">{t.he}</p>}
            <p className="mt-6 text-sm opacity-60">Tap to reveal the definition · לחצו לחשיפת ההגדרה</p>
          </div>
        ) : (
          <div className="flex h-full min-h-[280px] flex-col justify-center text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">
              {topicLabel(t.topic)}
            </p>
            <h2 className="mt-2 text-2xl">
              <NamePair
                en={t.en}
                he={t.he}
                stacked={false}
                enClassName="text-2xl"
                heClassName="text-lg opacity-70"
              />
            </h2>
            <p className="mt-6 text-base leading-relaxed">{t.definition}</p>
          </div>
        )}
      </button>
      <CardNav onPrev={() => next(-1)} onNext={() => next(1)} onKnown={markKnown} />
    </div>
  );
}

function LandmarkCards({ query }: { query: string }) {
  const [region, setRegion] = useState<LandmarkRegionId | "all">("all");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());

  const cards = useMemo(() => {
    const list = searchLandmarks(query, examLandmarks);
    return region === "all" ? list : list.filter((l) => l.region === region);
  }, [query, region]);

  useEffect(() => {
    setIndex(0);
    setFlipped(false);
  }, [query, region, cards.length]);

  if (cards.length === 0) {
    return <EmptyState title="No cards · אין כרטיסיות" body="Change the search or bone region. · שנו את החיפוש או אזור העצם." />;
  }

  const i = index % cards.length;
  const l = cards[i];
  if (!l) {
    return <EmptyState title="No cards · אין כרטיסיות" body="Change the search or bone region. · שנו את החיפוש או אזור העצם." />;
  }

  function next(delta: number) {
    setFlipped(false);
    setIndex((n) => (n + delta + cards.length) % cards.length);
  }

  function markKnown() {
    setKnown((s) => new Set(s).add(l.id));
    next(1);
  }

  const imgKind = anatomyImage("landmarks", l.id) ? "landmarks" : "bones";
  const imgId = imgKind === "landmarks" ? l.id : l.boneId;
  const regionHe = LANDMARK_REGIONS.find((r) => r.id === l.region)?.he;

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-4 flex flex-wrap justify-center gap-1.5">
        <TopicChip active={region === "all"} onClick={() => setRegion("all")}>
          All · הכל ({searchLandmarks(query, examLandmarks).length})
        </TopicChip>
        {LANDMARK_REGIONS.map((r) => {
          const n = searchLandmarks(query, examLandmarks).filter((x) => x.region === r.id).length;
          if (n === 0) return null;
          return (
            <TopicChip key={r.id} active={region === r.id} onClick={() => setRegion(r.id)}>
              <span className="term font-bold">{r.en}</span> · {r.he}
            </TopicChip>
          );
        })}
      </div>
      <p className="mb-3 text-center text-sm text-[var(--ink-soft)]">
        Card {i + 1} of {cards.length} · כרטיס {i + 1} מתוך {cards.length} · marked known · סימנתם כ״יודע״ {known.size}
      </p>
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className={cn(
          "min-h-[360px] w-full rounded-3xl border border-[var(--line)] p-6 text-right shadow-md transition",
          flipped ? "bg-[var(--ink)] text-[var(--paper)]" : "bg-[var(--card)]",
        )}
      >
        {!flipped ? (
          <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
              {regionHe} · Which landmark? · איזה חלק?
            </p>
            <AnatomyThumb
              kind={imgKind}
              id={imgId}
              alt="חלק עצם"
              size="md"
              className="mx-auto mt-4 h-40 w-40"
              interactive={false}
            />
            <p className="mt-6 text-sm opacity-60">Tap to reveal name and location · לחצו לחשיפת השם והמיקום</p>
          </div>
        ) : (
          <div className="space-y-3 text-sm leading-relaxed">
            <AnatomyThumb
              kind={imgKind}
              id={imgId}
              alt={l.nameHe}
              size="sm"
              className="mx-auto border-[var(--ink-soft)]/30"
              interactive={false}
            />
            <h2 className="text-center text-2xl">
              <NamePair
                en={l.nameEn}
                he={l.nameHe}
                stacked
                enClassName="text-2xl"
                heClassName="text-base opacity-70"
              />
            </h2>
            <Block label="Location" he={l.locationHe} en={l.viewHe ?? ""} />
            {l.note && <Block label="Exam note · לזכור למבחן" he={l.note} en="" />}
          </div>
        )}
      </button>
      <CardNav onPrev={() => next(-1)} onNext={() => next(1)} onKnown={markKnown} />
    </div>
  );
}

function CardNav({
  onPrev,
  onNext,
  onKnown,
}: {
  onPrev: () => void;
  onNext: () => void;
  onKnown: () => void;
}) {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-2 no-print">
      <button
        type="button"
        onClick={onPrev}
        className="rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-2 text-sm"
      >
        Prev · הקודם
      </button>
      <button
        type="button"
        onClick={onNext}
        className="rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-2 text-sm"
      >
        Next · הבא
      </button>
      <button
        type="button"
        onClick={onKnown}
        className="rounded-full bg-[var(--accent-2)] px-4 py-2 text-sm text-white"
      >
        Know it · יודע ✓
      </button>
    </div>
  );
}

function Block({ label, he, en }: { label: string; he: string; en: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">{label}</p>
      {en ? <NamePair en={en} he={he} enClassName="mt-0.5" heClassName="text-xs opacity-70" /> : <p className="mt-0.5">{he}</p>}
    </div>
  );
}

function TopicChip({
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
