"use client";

import { useEffect, useMemo, useState } from "react";
import { muscles } from "@/data/muscles";
import { anatomyImage } from "@/data/anatomy-images";
import { DICTIONARY_TOPICS, dictionaryTerms, topicLabel } from "@/data/dictionary";
import {
  examLandmarks,
  LANDMARK_REGIONS,
  type Landmark,
  type LandmarkRegionId,
} from "@/data/landmarks";
import { bilingual } from "@/components/name-pair";
import { AnatomyThumb } from "@/components/anatomy-image";
import { EmptyState } from "@/components/muscle-table";
import { ACTIONS, FAMILIES, PLANES, allGymMoves, planeById } from "@/data/planes";
import { OI_HOOKS, hooksForRegion, type OiHook } from "@/data/oi-mnemonics";
import { REGIONS, type RegionId } from "@/data/regions";
import { cn } from "@/lib/utils";
import type { Muscle } from "@/data/types";

type Kind =
  | "origin"
  | "insertion"
  | "action"
  | "name"
  | "picture"
  | "plane"
  | "family"
  | "hook"
  | "term"
  | "landmark"
  | "landmark-pic";

type QuizGroup = "all" | "muscles" | "family" | "hook" | "plane" | "term" | "landmark";

type Question = {
  muscleId: string;
  prompt: string;
  kind: Kind;
  answer: string;
  options: string[];
  landmarkId?: string;
};

type QuizFilter = {
  kinds: Kind[];
  muscles: Muscle[];
  families: typeof FAMILIES;
  hooks: OiHook[];
  terms: typeof dictionaryTerms;
  landmarks: Landmark[];
};

const MUSCLE_KINDS: Kind[] = ["origin", "insertion", "action", "name", "picture"];
const FAMILY_KINDS: Kind[] = ["family"];
const HOOK_KINDS: Kind[] = ["hook"];
const PLANE_KINDS: Kind[] = ["plane"];
const TERM_KINDS: Kind[] = ["term"];
const LANDMARK_KINDS: Kind[] = ["landmark", "landmark-pic"];

const GROUPS: { id: QuizGroup; en: string; he: string }[] = [
  { id: "all", en: "All", he: "הכל" },
  { id: "muscles", en: "Muscles", he: "שרירים" },
  { id: "family", en: "Families", he: "קבוצות" },
  { id: "hook", en: "Memory hooks", he: "קיצורי שינון" },
  { id: "plane", en: "Planes", he: "מישורים" },
  { id: "term", en: "Glossary", he: "מילון" },
  { id: "landmark", en: "Landmarks", he: "חלקי עצם" },
];

const REGION_TO_LANDMARKS: Record<RegionId, LandmarkRegionId[]> = {
  "shoulder-girdle": ["shoulder"],
  shoulder: ["shoulder"],
  arm: ["arm"],
  forearm: ["arm"],
  "neck-trunk": ["spine", "thorax", "skull"],
  hip: ["pelvis"],
  thigh: ["leg", "pelvis"],
  leg: ["leg"],
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function landmarkLabel(l: Landmark) {
  return bilingual(l.nameEn, l.nameHe);
}

function termLabel(t: (typeof dictionaryTerms)[number]) {
  return bilingual(t.en, t.he);
}

function musclePoolForRegion(region: RegionId | "all") {
  if (region === "all") return muscles.filter((m) => m.core);
  const inRegion = muscles.filter((m) => m.region === region);
  const core = inRegion.filter((m) => m.core);
  return core.length >= 2 ? core : inRegion;
}

function computeFilter(
  group: QuizGroup,
  region: RegionId | "all",
  familyId: string | "all",
  topic: string | "all",
  landmarkRegion: LandmarkRegionId | "all",
): QuizFilter {
  let pool = musclePoolForRegion(region);
  if (familyId !== "all") {
    const memberIds = new Set(FAMILIES.find((f) => f.id === familyId)?.members ?? []);
    pool = (region === "all" ? muscles : muscles.filter((m) => m.region === region)).filter((m) =>
      memberIds.has(m.id),
    );
  }

  const regionMuscles = region === "all" ? muscles : muscles.filter((m) => m.region === region);
  const families =
    familyId !== "all"
      ? FAMILIES.filter((f) => f.id === familyId)
      : FAMILIES.filter(
          (f) => region === "all" || f.members.some((id) => regionMuscles.some((m) => m.id === id)),
        );

  const terms =
    topic === "all"
      ? dictionaryTerms.filter((t) => t.definition.trim().length >= 8)
      : dictionaryTerms.filter((t) => t.topic === topic && t.definition.trim().length >= 8);

  let landmarkPool = examLandmarks;
  if (group === "landmark" && landmarkRegion !== "all") {
    landmarkPool = examLandmarks.filter((l) => l.region === landmarkRegion);
  } else if (group !== "landmark" && region !== "all") {
    const mapped = REGION_TO_LANDMARKS[region];
    landmarkPool = examLandmarks.filter((l) => mapped.includes(l.region));
  }

  const hooks = hooksForRegion(region);

  const familySelected = familyId !== "all";
  let kinds: Kind[];
  switch (group) {
    case "muscles":
      kinds = MUSCLE_KINDS;
      break;
    case "family":
      kinds = FAMILY_KINDS;
      break;
    case "hook":
      kinds = HOOK_KINDS;
      break;
    case "plane":
      kinds = PLANE_KINDS;
      break;
    case "term":
      kinds = TERM_KINDS;
      break;
    case "landmark":
      kinds = LANDMARK_KINDS;
      break;
    default:
      if (familySelected) {
        kinds = MUSCLE_KINDS;
      } else if (region !== "all") {
        kinds = [...MUSCLE_KINDS, ...FAMILY_KINDS, ...HOOK_KINDS, ...LANDMARK_KINDS];
      } else {
        kinds = [
          ...MUSCLE_KINDS,
          ...FAMILY_KINDS,
          ...HOOK_KINDS,
          ...PLANE_KINDS,
          ...TERM_KINDS,
          ...LANDMARK_KINDS,
        ];
      }
  }

  return { kinds, muscles: pool, families, hooks, terms, landmarks: landmarkPool };
}

function muscleDistractors(muscle: Muscle, pool: Muscle[]) {
  const same = pool.filter((m) => m.id !== muscle.id);
  const rest = muscles.filter((m) => m.id !== muscle.id && !same.some((x) => x.id === m.id));
  return shuffle([...same, ...rest]).slice(0, 3);
}

function hookMembers(hook: OiHook) {
  return hook.muscleIds
    .map((id) => {
      const m = muscles.find((x) => x.id === id);
      return m ? bilingual(m.nameEn, m.nameHe) : id;
    })
    .join(" · ");
}

function buildHookQuestion(pool: OiHook[]): Question | null {
  if (pool.length === 0) return null;
  const hook = pool[Math.floor(Math.random() * pool.length)]!;
  const others = shuffle(OI_HOOKS.filter((x) => x.id !== hook.id)).slice(0, 3);
  if (others.length < 3) return null;
  const named = hookMembers(hook);
  const style = Math.floor(Math.random() * 3);

  if (style === 0) {
    return {
      muscleId: hook.muscleIds[0] ?? "trapezius",
      kind: "hook",
      prompt: `What does ${hook.acronym} help you remember? · מה ${hook.acronym} עוזר לזכור?`,
      answer: bilingual(hook.landmarkEn, hook.landmarkHe),
      options: shuffle([hook, ...others].map((x) => bilingual(x.landmarkEn, x.landmarkHe))),
    };
  }
  if (style === 1) {
    return {
      muscleId: hook.muscleIds[0] ?? "trapezius",
      kind: "hook",
      prompt: `Which hook is ${named}? · איזה קיצור שינון מתאים ל־${named}?`,
      answer: `${hook.acronym} · ${hook.titleEn}`,
      options: shuffle([hook, ...others].map((x) => `${x.acronym} · ${x.titleEn}`)),
    };
  }
  return {
    muscleId: hook.muscleIds[0] ?? "trapezius",
    kind: "hook",
    prompt: `${hook.acronym} parks on which landmark? · על איזו נקודה חונה ${hook.acronym}?`,
    answer: bilingual(hook.landmarkEn, hook.landmarkHe),
    options: shuffle([hook, ...others].map((x) => bilingual(x.landmarkEn, x.landmarkHe))),
  };
}

function landmarkDistractors(item: Landmark, pool: Landmark[]) {
  const same = pool.filter((x) => x.id !== item.id && x.region === item.region);
  const rest = examLandmarks.filter((x) => x.id !== item.id && !same.some((s) => s.id === x.id));
  return shuffle([...same, ...rest]).slice(0, 3);
}

function buildLandmarkQuestion(pool: Landmark[], withPicture: boolean): Question | null {
  const pictured = pool.filter(
    (l) => anatomyImage("landmarks", l.id) || anatomyImage("bones", l.boneId),
  );
  const source = withPicture ? pictured : pool;
  if (source.length === 0) return null;
  const item = source[Math.floor(Math.random() * source.length)]!;
  const others = landmarkDistractors(item, pool);
  if (others.length < 3) return null;
  if (withPicture) {
    return {
      muscleId: item.boneId,
      landmarkId: item.id,
      kind: "landmark-pic",
      prompt: "Which landmark is marked? · איזה חלק עצם מסומן באיור?",
      answer: landmarkLabel(item),
      options: shuffle([item, ...others].map(landmarkLabel)),
    };
  }
  return {
    muscleId: item.boneId,
    landmarkId: item.id,
    kind: "landmark",
    prompt: `Where is ${landmarkLabel(item)}? · איפה נמצא ${landmarkLabel(item)}?`,
    answer: item.locationHe,
    options: shuffle([item.locationHe, ...others.map((x) => x.locationHe)]),
  };
}

function buildTermQuestion(pool: typeof dictionaryTerms): Question | null {
  if (pool.length === 0) return null;
  const term = pool[Math.floor(Math.random() * pool.length)]!;
  const unique = pool.filter((t) => t.id !== term.id && t.definition !== term.definition);
  const extra = dictionaryTerms.filter(
    (t) => t.id !== term.id && t.definition !== term.definition && !unique.some((u) => u.id === t.id),
  );
  const sameTopic = unique.filter((t) => t.topic === term.topic);
  const rest = [...unique.filter((t) => t.topic !== term.topic), ...extra];
  const distractors = shuffle([...sameTopic, ...rest])
    .filter((t, _, arr) => arr.findIndex((x) => x.definition === t.definition) === arr.indexOf(t))
    .slice(0, 3);

  if (distractors.length < 3) return null;

  if (Math.random() < 0.55) {
    return {
      muscleId: "trapezius",
      kind: "term",
      prompt: `What is the definition of ${termLabel(term)}? · מה ההגדרה של ${termLabel(term)}?`,
      answer: term.definition,
      options: shuffle([term.definition, ...distractors.map((d) => d.definition)]),
    };
  }

  return {
    muscleId: "trapezius",
    kind: "term",
    prompt: `Which term is this? · איזה מונח מתואר? ${term.definition}`,
    answer: termLabel(term),
    options: shuffle([term, ...distractors].map(termLabel)),
  };
}

function tryBuild(kind: Kind, filter: QuizFilter): Question | null {
  if (kind === "plane") {
    const gym = allGymMoves();
    if (gym.length > 0 && Math.random() < 0.55) {
      const item = gym[Math.floor(Math.random() * gym.length)]!;
      const p = planeById(item.plane);
      if (!p) return null;
      return {
        muscleId: "trapezius",
        kind: "plane",
        prompt: `Which plane is ${bilingual(item.move.en, item.move.he)}? · באיזה מישור מתבצע ${bilingual(item.move.en, item.move.he)}?`,
        answer: bilingual(p.en, p.he),
        options: shuffle(PLANES.map((x) => bilingual(x.en, x.he))),
      };
    }
    const moves = ACTIONS.filter((a) => a.plane);
    const a = moves[Math.floor(Math.random() * moves.length)];
    if (!a?.plane) return null;
    const p = planeById(a.plane);
    if (!p) return null;
    return {
      muscleId: "trapezius",
      kind: "plane",
      prompt: `Which plane is ${bilingual(a.en, a.he)}? · באיזה מישור מתבצעת ${bilingual(a.en, a.he)}?`,
      answer: bilingual(p.en, p.he),
      options: shuffle(PLANES.map((x) => bilingual(x.en, x.he))),
    };
  }

  if (kind === "term") {
    return buildTermQuestion(filter.terms);
  }

  if (kind === "landmark" || kind === "landmark-pic") {
    return buildLandmarkQuestion(filter.landmarks, kind === "landmark-pic");
  }

  if (kind === "family") {
    if (filter.families.length === 0) return null;
    const f = filter.families[Math.floor(Math.random() * filter.families.length)]!;
    const others = shuffle(FAMILIES.filter((x) => x.id !== f.id)).slice(0, 3);
    if (others.length < 3) return null;
    const named = f.members.slice(0, 2).map((id) => {
      const m = muscles.find((x) => x.id === id);
      return m ? bilingual(m.nameEn, m.nameHe) : id;
    });
    return {
      muscleId: f.members[0] ?? "trapezius",
      kind: "family",
      prompt: `Which family includes ${named.join(" / ")}? · לאיזו קבוצה שייכים ${named.join(" / ")}?`,
      answer: bilingual(f.en, f.he),
      options: shuffle([f, ...others].map((x) => bilingual(x.en, x.he))),
    };
  }

  if (kind === "hook") {
    return buildHookQuestion(filter.hooks);
  }

  const pictured = filter.muscles.filter((m) => anatomyImage("muscles", m.id));
  const source = kind === "picture" ? pictured : filter.muscles;
  if (source.length === 0) return null;
  const muscle = source[Math.floor(Math.random() * source.length)];
  if (!muscle) return null;
  const others = muscleDistractors(muscle, filter.muscles);
  if (others.length < 3) return null;

  if (kind === "name" || kind === "picture") {
    const answer = bilingual(muscle.nameEn, muscle.nameHe);
    return {
      muscleId: muscle.id,
      kind,
      prompt:
        kind === "picture"
          ? "Which muscle is in the picture? · איזה שריר מופיע באיור?"
          : `Which muscle? Origin: ${bilingual(muscle.originEn, muscle.originHe)} · איזה שריר?`,
      answer,
      options: shuffle([answer, ...others.map((m) => bilingual(m.nameEn, m.nameHe))]),
    };
  }

  const field =
    kind === "origin"
      ? { text: bilingual(muscle.originEn, muscle.originHe), label: "Origin" }
      : kind === "insertion"
        ? { text: bilingual(muscle.insertionEn, muscle.insertionHe), label: "Insertion" }
        : { text: bilingual(muscle.actionEn, muscle.actionHe), label: "Action" };

  const distractors = others.map((m) =>
    kind === "origin"
      ? bilingual(m.originEn, m.originHe)
      : kind === "insertion"
        ? bilingual(m.insertionEn, m.insertionHe)
        : bilingual(m.actionEn, m.actionHe),
  );

  return {
    muscleId: muscle.id,
    kind,
    prompt: `What is the ${field.label} of ${bilingual(muscle.nameEn, muscle.nameHe)}? · מה ה־${field.label} של ${bilingual(muscle.nameEn, muscle.nameHe)}?`,
    answer: field.text,
    options: shuffle([field.text, ...distractors]),
  };
}

function buildQuestion(filter: QuizFilter): Question | null {
  for (const kind of shuffle(filter.kinds)) {
    const q = tryBuild(kind, filter);
    if (q) return q;
  }
  return null;
}

export function Quiz() {
  const [group, setGroup] = useState<QuizGroup>("all");
  const [region, setRegion] = useState<RegionId | "all">("all");
  const [familyId, setFamilyId] = useState<string | "all">("all");
  const [topic, setTopic] = useState<string | "all">("all");
  const [landmarkRegion, setLandmarkRegion] = useState<LandmarkRegionId | "all">("all");
  const [q, setQ] = useState<Question | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState({ ok: 0, n: 0 });
  const [ready, setReady] = useState(false);

  const filter = useMemo(
    () => computeFilter(group, region, familyId, topic, landmarkRegion),
    [group, region, familyId, topic, landmarkRegion],
  );

  useEffect(() => {
    setPicked(null);
    setScore({ ok: 0, n: 0 });
    setQ(buildQuestion(filter));
    setReady(true);
  }, [filter]);

  function choose(option: string) {
    if (picked || !q) return;
    setPicked(option);
    setScore((s) => ({
      ok: s.ok + (option === q.answer ? 1 : 0),
      n: s.n + 1,
    }));
  }

  function next() {
    setPicked(null);
    setQ(buildQuestion(filter));
  }

  function selectGroup(nextGroup: QuizGroup) {
    setGroup(nextGroup);
    setRegion("all");
    setFamilyId("all");
    setTopic("all");
    setLandmarkRegion("all");
  }

  const showRegions = group === "all" || group === "muscles" || group === "family" || group === "hook";
  const showFamilies = group === "all" || group === "muscles";
  const showTopics = group === "term";
  const showLandmarkRegions = group === "landmark";
  const correct = picked === q?.answer;
  const pct = score.n ? Math.round((score.ok / score.n) * 100) : 0;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 space-y-3 no-print">
        <div>
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--ink-soft)]">
            Question type · סוג שאלה
          </p>
          <div className="flex flex-wrap gap-1.5">
            {GROUPS.map((g) => (
              <FilterChip key={g.id} active={group === g.id} onClick={() => selectGroup(g.id)}>
                {g.en} · {g.he}
              </FilterChip>
            ))}
          </div>
        </div>

        {showRegions && (
          <div>
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--ink-soft)]">
              Region · אזור
            </p>
            <div className="flex flex-wrap gap-1.5">
              <FilterChip active={region === "all"} onClick={() => setRegion("all")}>
                All · הכל
              </FilterChip>
              {REGIONS.map((r) => (
                <FilterChip
                  key={r.id}
                  active={region === r.id}
                  onClick={() => setRegion(r.id)}
                >
                  <span className="term font-bold">{r.en}</span>
                  <span className="font-normal"> · {r.he}</span>
                </FilterChip>
              ))}
            </div>
          </div>
        )}

        {showFamilies && (
          <div>
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--ink-soft)]">
              Muscle family · קבוצת שרירים
            </p>
            <div className="flex flex-wrap gap-1.5">
              <FilterChip active={familyId === "all"} onClick={() => setFamilyId("all")}>
                All · הכל
              </FilterChip>
              {FAMILIES.map((f) => (
                <FilterChip
                  key={f.id}
                  active={familyId === f.id}
                  onClick={() => setFamilyId(f.id)}
                >
                  <span className="term font-bold">{f.en}</span>
                  <span className="font-normal"> · {f.he}</span>
                </FilterChip>
              ))}
            </div>
          </div>
        )}

        {showTopics && (
          <div>
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--ink-soft)]">
              Glossary topic · נושא במילון
            </p>
            <div className="flex flex-wrap gap-1.5">
              <FilterChip active={topic === "all"} onClick={() => setTopic("all")}>
                All · הכל ({dictionaryTerms.length})
              </FilterChip>
              {DICTIONARY_TOPICS.map((tp) => {
                const n = dictionaryTerms.filter((t) => t.topic === tp).length;
                if (n === 0) return null;
                return (
                  <FilterChip key={tp} active={topic === tp} onClick={() => setTopic(tp)}>
                    {topicLabel(tp)} ({n})
                  </FilterChip>
                );
              })}
            </div>
          </div>
        )}

        {showLandmarkRegions && (
          <div>
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--ink-soft)]">
              Bone region · אזור עצם
            </p>
            <div className="flex flex-wrap gap-1.5">
              <FilterChip
                active={landmarkRegion === "all"}
                onClick={() => setLandmarkRegion("all")}
              >
                All · הכל ({examLandmarks.length})
              </FilterChip>
              {LANDMARK_REGIONS.map((r) => {
                const n = examLandmarks.filter((l) => l.region === r.id).length;
                if (n === 0) return null;
                return (
                  <FilterChip
                    key={r.id}
                    active={landmarkRegion === r.id}
                    onClick={() => setLandmarkRegion(r.id)}
                  >
                    <span className="term font-bold">{r.en}</span>
                    <span className="font-normal"> · {r.he}</span> ({n})
                  </FilterChip>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="mb-4 flex items-center justify-between text-sm">
        <p className="text-[var(--ink-soft)]">
          Score · ציון: <span className="font-bold text-[var(--ink)]">{score.ok}</span> / {score.n}
          {score.n > 0 && <span> ({pct}%)</span>}
        </p>
        <p className="text-xs text-[var(--ink-soft)]">
          Exam-style questions · שאלות בסגנון מבחן · Origin / landmarks / glossary
        </p>
      </div>

      {!ready ? (
        <div className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-8 text-center text-sm text-[var(--ink-soft)]">
          Loading a question… · טוען שאלה…
        </div>
      ) : !q ? (
        <EmptyState title="No questions in this filter · אין שאלות בסינון הזה" body="Change the question type, region, or muscle family. · שנו את סוג השאלה, האזור או קבוצת השרירים." />
      ) : (
        <div className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-sm md:p-7">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {q.kind}
          </p>
          <h2 className="mt-2 text-lg font-bold leading-snug md:text-xl">{q.prompt}</h2>
          {(q.kind === "picture" || q.kind === "landmark-pic") && <QuizPicture q={q} />}
          <div className="mt-5 grid gap-2">
            {q.options.map((opt) => {
              const isPick = picked === opt;
              const isAnswer = opt === q.answer;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => choose(opt)}
                  className={cn(
                    "rounded-xl border px-4 py-3 text-right text-sm leading-relaxed transition",
                    !picked && "border-[var(--line)] hover:border-[var(--ink)] hover:bg-[var(--paper)]",
                    picked && isAnswer && "border-emerald-700 bg-emerald-50",
                    picked && isPick && !correct && "border-red-700 bg-red-50",
                    picked && !isAnswer && !isPick && "border-[var(--line)] opacity-50",
                  )}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {picked && (
            <div className="mt-5 flex items-center justify-between">
              <p className={cn("text-sm font-semibold", correct ? "text-emerald-800" : "text-red-800")}>
                {correct ? "Correct · נכון" : "Not quite — the answer is in green · לא מדויק — התשובה מסומנת בירוק"}
              </p>
              <button
                type="button"
                onClick={next}
                className="rounded-full bg-[var(--ink)] px-5 py-2 text-sm text-[var(--paper)]"
              >
                Next question · שאלה הבאה
              </button>
            </div>
          )}
        </div>
      )}
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

function QuizPicture({ q }: { q: Question }) {
  const isLandmark = q.kind === "landmark-pic";
  const useLandmarkImg = Boolean(isLandmark && q.landmarkId && anatomyImage("landmarks", q.landmarkId));
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-[var(--line)] bg-white">
      <AnatomyThumb
        kind={isLandmark ? (useLandmarkImg ? "landmarks" : "bones") : "muscles"}
        id={useLandmarkImg ? q.landmarkId! : q.muscleId}
        alt={isLandmark ? "חלק עצם" : "איור שריר"}
        size="hero"
        className="mx-auto rounded-none border-0"
        interactive={false}
      />
    </div>
  );
}
