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
import { ACTIONS, FAMILIES, PLANES, actionById, allGymMoves, planeById } from "@/data/planes";
import { OI_HOOKS, hooksForRegion, type OiHook } from "@/data/oi-mnemonics";
import {
  EXAM_QUESTIONS,
  OPTION_LETTERS,
  REVIEW_QUESTIONS,
  type ExamQuestion,
} from "@/data/exam-questions";
import {
  TISSUE_QUESTIONS,
  TISSUE_TOPICS,
  filterReviewQuestions,
  reviewFormatLabel,
  type ReviewFormat,
  type ReviewQuestion,
} from "@/data/review-questions";
import {
  MUSCLE_PARTS,
  originLabel,
  partLabel,
  splitsForRegion,
  type SplitMuscle,
} from "@/data/muscle-parts";
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
  | "landmark-pic"
  | "exam"
  | "parts";

type QuizGroup =
  | "all"
  | "exam"
  | "review"
  | "tissues"
  | "muscles"
  | "family"
  | "hook"
  | "plane"
  | "term"
  | "landmark"
  | "parts";

type Question = {
  muscleId: string;
  prompt: string;
  promptEn?: string;
  kind: Kind;
  answer: string;
  options: string[];
  landmarkId?: string;
  examId?: number;
  explainHe?: string;
  explainEn?: string;
  topic?: string;
  source?: "exam" | "contraction" | "tissues";
  format?: ReviewFormat;
};

const TISSUE_AMERICAN_BANK: ExamQuestion[] = TISSUE_QUESTIONS.filter(
  (q): q is ReviewQuestion & { options: [string, string, string, string]; answer: 0 | 1 | 2 | 3 } =>
    q.format === "american" && q.options != null && q.answer != null,
).map((q) => ({
  id: 200 + q.bookletId,
  promptHe: q.promptHe,
  promptEn: q.promptEn,
  options: q.options,
  answer: q.answer,
  topic: q.topic,
  source: "tissues",
}));

const ALL_BANK_QUESTIONS = [...EXAM_QUESTIONS, ...REVIEW_QUESTIONS, ...TISSUE_AMERICAN_BANK];
const REVIEW_IDS = new Set(REVIEW_QUESTIONS.map((q) => q.id));

function bankForGroup(group: QuizGroup): ExamQuestion[] {
  if (group === "exam") return EXAM_QUESTIONS;
  if (group === "review") return REVIEW_QUESTIONS;
  return ALL_BANK_QUESTIONS;
}

type QuizFilter = {
  kinds: Kind[];
  muscles: Muscle[];
  families: typeof FAMILIES;
  hooks: OiHook[];
  terms: typeof dictionaryTerms;
  landmarks: Landmark[];
  splits: SplitMuscle[];
  examBank: ExamQuestion[];
};

const MUSCLE_KINDS: Kind[] = ["origin", "insertion", "action", "name", "picture"];
const FAMILY_KINDS: Kind[] = ["family"];
const HOOK_KINDS: Kind[] = ["hook"];
const PLANE_KINDS: Kind[] = ["plane"];
const TERM_KINDS: Kind[] = ["term"];
const LANDMARK_KINDS: Kind[] = ["landmark", "landmark-pic"];
const EXAM_KINDS: Kind[] = ["exam"];
const PARTS_KINDS: Kind[] = ["parts"];

const GROUPS: { id: QuizGroup; en: string; he: string }[] = [
  { id: "all", en: "All", he: "הכל" },
  { id: "exam", en: "Practice exam", he: "מבחן לדוגמה" },
  { id: "review", en: "Contraction review", he: "חזרה — כיווץ" },
  { id: "tissues", en: "Tissues", he: "רקמות" },
  { id: "muscles", en: "Muscles", he: "שרירים" },
  { id: "parts", en: "Heads / parts", he: "ראשים וחלקים" },
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
  const poolIds = new Set(pool.map((m) => m.id));
  const splits = splitsForRegion(region).filter(
    (s) => poolIds.size === 0 || poolIds.has(s.id) || group === "parts",
  );

  const familySelected = familyId !== "all";
  let kinds: Kind[];
  switch (group) {
    case "exam":
    case "review":
    case "tissues":
      kinds = EXAM_KINDS;
      break;
    case "muscles":
      kinds = MUSCLE_KINDS;
      break;
    case "parts":
      kinds = PARTS_KINDS;
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
        kinds = [...MUSCLE_KINDS, ...PARTS_KINDS, ...FAMILY_KINDS, ...HOOK_KINDS, ...LANDMARK_KINDS];
      } else {
        kinds = [
          ...MUSCLE_KINDS,
          ...PARTS_KINDS,
          ...FAMILY_KINDS,
          ...HOOK_KINDS,
          ...PLANE_KINDS,
          ...TERM_KINDS,
          ...LANDMARK_KINDS,
          ...EXAM_KINDS,
        ];
      }
  }

  return { kinds, muscles: pool, families, hooks, terms, landmarks: landmarkPool, splits, examBank: bankForGroup(group) };
}

function uniquePartActions(muscle: SplitMuscle, part: SplitMuscle["parts"][number]) {
  if (part.quizActions?.length) return part.quizActions;
  return part.actions.filter((a) => !muscle.sharedActions.includes(a));
}

function fourOptions(answer: string, extras: string[]): string[] | null {
  const uniq = extras.filter((x, i, arr) => x !== answer && x.length > 0 && arr.indexOf(x) === i);
  if (uniq.length < 3) return null;
  return shuffle([answer, ...shuffle(uniq).slice(0, 3)]);
}

function buildPartsQuestion(pool: SplitMuscle[]): Question | null {
  if (pool.length === 0) return null;
  const muscle = pool[Math.floor(Math.random() * pool.length)]!;
  const part = muscle.parts[Math.floor(Math.random() * muscle.parts.length)]!;
  const unique = uniquePartActions(muscle, part);
  const extraJointHeads = muscle.parts.filter((p) => p.extraJoint);
  const onlyJointHeads = muscle.parts.filter((p) => !p.extraJoint);

  const styles: Array<"origin" | "name-from-origin" | "action" | "joint"> = ["origin", "name-from-origin"];
  if (unique.length > 0) styles.push("action");
  if (extraJointHeads.length === 1 && onlyJointHeads.length > 0) styles.push("joint");

  const style = styles[Math.floor(Math.random() * styles.length)]!;
  const allOrigins = MUSCLE_PARTS.flatMap((m) => m.parts.map(originLabel));
  const allPartNames = MUSCLE_PARTS.flatMap((m) => m.parts.map((p) => partLabel(m, p)));

  if (style === "origin") {
    const answer = originLabel(part);
    const options = fourOptions(answer, allOrigins);
    if (!options) return null;
    return {
      muscleId: muscle.id,
      kind: "parts",
      prompt: `What is the origin of the ${part.nameEn} of ${muscle.nameEn}? · מה ה־Origin של ${part.nameHe} של ${muscle.nameHe}?`,
      answer,
      options,
    };
  }

  if (style === "name-from-origin") {
    const answer = partLabel(muscle, part);
    const options = fourOptions(answer, allPartNames);
    if (!options) return null;
    return {
      muscleId: muscle.id,
      kind: "parts",
      prompt: `Which head / part starts here: ${originLabel(part)}? · איזה ראש / חלק מתחיל כאן: ${originLabel(part)}?`,
      answer,
      options,
    };
  }

  if (style === "action") {
    const actionId = unique[Math.floor(Math.random() * unique.length)]!;
    const action = actionById(actionId);
    if (!action) return null;
    const answer = bilingual(part.nameEn, part.nameHe);
    const siblingNames = muscle.parts.map((p) => bilingual(p.nameEn, p.nameHe));
    const pad = [
      "All parts equally · כל החלקים באותה מידה",
      ...MUSCLE_PARTS.filter((m) => m.id !== muscle.id).flatMap((m) =>
        m.parts.map((p) => bilingual(p.nameEn, p.nameHe)),
      ),
    ];
    const options = fourOptions(answer, [...siblingNames, ...pad]);
    if (!options) return null;
    return {
      muscleId: muscle.id,
      kind: "parts",
      prompt: `Which part of ${bilingual(muscle.nameEn, muscle.nameHe)} is the main one for ${bilingual(action.en, action.he)}? · איזה חלק של ${bilingual(muscle.nameEn, muscle.nameHe)} אחראי בעיקר ל־${bilingual(action.en, action.he)}?`,
      answer,
      options,
    };
  }

  const winner = extraJointHeads[0]!;
  const answer = bilingual(winner.nameEn, winner.nameHe);
  const siblingNames = muscle.parts.map((p) => bilingual(p.nameEn, p.nameHe));
  const options = fourOptions(answer, [
    ...siblingNames,
    "All heads equally · כל הראשים באותה מידה",
    "Neither head · אף ראש לא",
  ]);
  if (!options) return null;
  return {
    muscleId: muscle.id,
    kind: "parts",
    prompt: `Which head of ${bilingual(muscle.nameEn, muscle.nameHe)} also crosses an extra joint? · איזה ראש של ${bilingual(muscle.nameEn, muscle.nameHe)} חוצה גם מפרק נוסף?`,
    answer,
    options,
  };
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

function examToQuestion(item: ExamQuestion, shuffleOpts: boolean): Question {
  const answer = item.options[item.answer]!;
  const source = item.source ?? (REVIEW_IDS.has(item.id) ? "contraction" : "exam");
  return {
    muscleId: `exam-${item.id}`,
    examId: item.id,
    kind: "exam",
    prompt: item.promptHe,
    promptEn: item.promptEn,
    answer,
    options: shuffleOpts ? shuffle([...item.options]) : [...item.options],
    explainHe: item.explainHe,
    explainEn: item.explainEn,
    topic: item.topic ?? (source === "contraction" ? "תהליך הכיווץ" : undefined),
    source,
    format: "american",
  };
}

function tissueToQuestion(item: ReviewQuestion, shuffleOpts: boolean): Question {
  if (item.format === "american" && item.options && item.answer != null) {
    const answer = item.options[item.answer]!;
    return {
      muscleId: `tissue-${item.id}`,
      examId: 200 + item.bookletId,
      kind: "exam",
      prompt: item.promptHe,
      promptEn: item.promptEn,
      answer,
      options: shuffleOpts ? shuffle([...item.options]) : [...item.options],
      explainHe: item.explainHe,
      explainEn: item.explainEn,
      topic: item.topic,
      source: "tissues",
      format: "american",
    };
  }
  return {
    muscleId: `tissue-${item.id}`,
    examId: item.bookletId,
    kind: "exam",
    prompt: item.promptHe,
    promptEn: item.promptEn,
    answer: item.answerHe ?? "",
    options: [],
    explainHe: item.answerHe,
    explainEn: item.answerEn,
    topic: item.topic,
    source: "tissues",
    format: "open",
  };
}

function buildExamQuestion(bank: ExamQuestion[]): Question {
  const item = bank[Math.floor(Math.random() * bank.length)]!;
  return examToQuestion(item, true);
}

function tryBuild(kind: Kind, filter: QuizFilter): Question | null {
  if (kind === "exam") {
    return buildExamQuestion(filter.examBank);
  }

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

  if (kind === "parts") {
    return buildPartsQuestion(filter.splits);
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
  const [tissueFormat, setTissueFormat] = useState<ReviewFormat | "all">("all");
  const [tissueTopic, setTissueTopic] = useState<string | "all">("all");
  const [q, setQ] = useState<Question | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState({ ok: 0, n: 0 });
  const [ready, setReady] = useState(false);
  const [examIndex, setExamIndex] = useState(0);
  const [examFinished, setExamFinished] = useState(false);

  const tissueBank = useMemo(
    () => filterReviewQuestions(tissueFormat, tissueTopic),
    [tissueFormat, tissueTopic],
  );
  const sequentialBank = group === "exam" || group === "review" ? bankForGroup(group) : null;
  const tissueMode = group === "tissues";
  const examMode = sequentialBank !== null || tissueMode;
  const sequentialLength = tissueMode ? tissueBank.length : sequentialBank?.length ?? 0;

  const filter = useMemo(
    () => computeFilter(group, region, familyId, topic, landmarkRegion),
    [group, region, familyId, topic, landmarkRegion],
  );

  useEffect(() => {
    setPicked(null);
    setRevealed(false);
    setScore({ ok: 0, n: 0 });
    setExamIndex(0);
    setExamFinished(false);
    if (group === "exam" || group === "review") {
      const bank = bankForGroup(group);
      setQ(examToQuestion(bank[0]!, false));
    } else if (group === "tissues") {
      setQ(tissueBank[0] ? tissueToQuestion(tissueBank[0], false) : null);
    } else {
      setQ(buildQuestion(filter));
    }
    setReady(true);
  }, [filter, group, tissueBank]);

  function choose(option: string) {
    if (picked || !q) return;
    setPicked(option);
    setScore((s) => ({
      ok: s.ok + (option === q.answer ? 1 : 0),
      n: s.n + 1,
    }));
  }

  function markOpen(knew: boolean) {
    if (picked || !q) return;
    setPicked(knew ? q.answer : "__miss__");
    setScore((s) => ({
      ok: s.ok + (knew ? 1 : 0),
      n: s.n + 1,
    }));
  }

  function next() {
    setPicked(null);
    setRevealed(false);
    if (tissueMode) {
      const nextI = examIndex + 1;
      if (nextI >= tissueBank.length) {
        setExamFinished(true);
        setQ(null);
        return;
      }
      setExamIndex(nextI);
      setQ(tissueToQuestion(tissueBank[nextI]!, false));
      return;
    }
    if (sequentialBank) {
      const nextI = examIndex + 1;
      if (nextI >= sequentialBank.length) {
        setExamFinished(true);
        setQ(null);
        return;
      }
      setExamIndex(nextI);
      setQ(examToQuestion(sequentialBank[nextI]!, false));
      return;
    }
    setQ(buildQuestion(filter));
  }

  function restartExam() {
    setPicked(null);
    setRevealed(false);
    setScore({ ok: 0, n: 0 });
    setExamIndex(0);
    setExamFinished(false);
    if (tissueMode) {
      setQ(tissueBank[0] ? tissueToQuestion(tissueBank[0], false) : null);
      return;
    }
    if (!sequentialBank) return;
    setQ(examToQuestion(sequentialBank[0]!, false));
  }

  function selectGroup(nextGroup: QuizGroup) {
    setGroup(nextGroup);
    setRegion("all");
    setFamilyId("all");
    setTopic("all");
    setLandmarkRegion("all");
    setTissueFormat("all");
    setTissueTopic("all");
  }

  const showRegions = group === "all" || group === "muscles" || group === "family" || group === "hook" || group === "parts";
  const showFamilies = group === "all" || group === "muscles";
  const showTopics = group === "term";
  const showLandmarkRegions = group === "landmark";
  const showTissueFilters = group === "tissues";
  const correct = picked === q?.answer;
  const pct = score.n ? Math.round((score.ok / score.n) * 100) : 0;
  const lastExamQuestion = examMode && sequentialLength > 0 && examIndex === sequentialLength - 1;
  const sequentialLabel = tissueMode
    ? "Tissues · רקמות"
    : group === "review"
      ? "Contraction review · חזרה — כיווץ"
      : "Practice exam · מבחן לדוגמה";
  const isReviewItem = q?.source === "contraction" || (q?.examId != null && REVIEW_IDS.has(q.examId));
  const examBadge = q
    ? q.source === "tissues" || group === "tissues"
      ? [
          "Tissues · רקמות",
          q.format ? (q.format === "open" ? "Open · פתוחה" : "American · אמריקאית") : null,
          q.topic ? topicLabel(q.topic) : null,
          tissueMode && sequentialLength ? `${examIndex + 1}/${sequentialLength}` : null,
        ]
          .filter(Boolean)
          .join(" · ")
      : q.kind === "exam"
        ? isReviewItem || group === "review"
          ? `Contraction review · חזרה — כיווץ${q.examId && sequentialBank ? ` · ${examIndex + 1}/${sequentialBank.length}` : ""}`
          : `Practice exam · מבחן לדוגמה${q.examId ? ` · ${q.examId}/${EXAM_QUESTIONS.length}` : ""}`
        : q.kind
    : null;

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
                {g.id === "exam" ? ` (${EXAM_QUESTIONS.length})` : ""}
                {g.id === "review" ? ` (${REVIEW_QUESTIONS.length})` : ""}
                {g.id === "tissues" ? ` (${TISSUE_QUESTIONS.length})` : ""}
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

        {showTissueFilters && (
          <>
            <div>
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--ink-soft)]">
                Format · סוג שאלה
              </p>
              <div className="flex flex-wrap gap-1.5">
                <FilterChip active={tissueFormat === "all"} onClick={() => setTissueFormat("all")}>
                  All · הכל ({TISSUE_QUESTIONS.length})
                </FilterChip>
                <FilterChip active={tissueFormat === "open"} onClick={() => setTissueFormat("open")}>
                  {reviewFormatLabel("open")} (
                  {TISSUE_QUESTIONS.filter((x) => x.format === "open").length})
                </FilterChip>
                <FilterChip
                  active={tissueFormat === "american"}
                  onClick={() => setTissueFormat("american")}
                >
                  {reviewFormatLabel("american")} (
                  {TISSUE_QUESTIONS.filter((x) => x.format === "american").length})
                </FilterChip>
              </div>
            </div>
            <div>
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--ink-soft)]">
                Category · קטגוריה
              </p>
              <div className="flex flex-wrap gap-1.5">
                <FilterChip active={tissueTopic === "all"} onClick={() => setTissueTopic("all")}>
                  All · הכל
                </FilterChip>
                {TISSUE_TOPICS.map((tp) => {
                  const n = TISSUE_QUESTIONS.filter(
                    (x) =>
                      x.topic === tp && (tissueFormat === "all" || x.format === tissueFormat),
                  ).length;
                  if (n === 0) return null;
                  return (
                    <FilterChip key={tp} active={tissueTopic === tp} onClick={() => setTissueTopic(tp)}>
                      {topicLabel(tp)} ({n})
                    </FilterChip>
                  );
                })}
              </div>
            </div>
          </>
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
          {examMode
            ? examFinished
              ? `Finished · הסתיים · ${sequentialLength} questions`
              : `Question ${examIndex + 1} of ${sequentialLength} · שאלה ${examIndex + 1} מתוך ${sequentialLength}`
            : "Exam-style questions · שאלות בסגנון מבחן · Origin / landmarks / glossary"}
        </p>
      </div>

      {!ready ? (
        <div className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-8 text-center text-sm text-[var(--ink-soft)]">
          Loading a question… · טוען שאלה…
        </div>
      ) : examFinished && examMode ? (
        <div className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-8 text-center shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {sequentialLabel}
          </p>
          <h2 className="mt-2 text-2xl font-bold">Done · הסתיים</h2>
          <p className="mt-3 text-lg">
            <span className="font-bold">{score.ok}</span> / {sequentialLength}
            <span className="text-[var(--ink-soft)]"> ({pct}%)</span>
          </p>
          <button
            type="button"
            onClick={restartExam}
            className="mt-6 rounded-full bg-[var(--ink)] px-5 py-2 text-sm text-[var(--paper)]"
          >
            Start again · להתחיל מחדש
          </button>
        </div>
      ) : !q ? (
        <EmptyState title="No questions in this filter · אין שאלות בסינון הזה" body="Change the question type, region, or muscle family. · שנו את סוג השאלה, האזור או קבוצת השרירים." />
      ) : (
        <div className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-sm md:p-7">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {examBadge}
          </p>
          <h2 className="mt-2 text-lg font-bold leading-snug md:text-xl">{q.prompt}</h2>
          {q.promptEn && (
            <p className="mt-1 text-sm leading-relaxed text-[var(--ink-soft)]">{q.promptEn}</p>
          )}
          {(q.kind === "picture" || q.kind === "landmark-pic") && <QuizPicture q={q} />}
          {q.format === "open" ? (
            <div className="mt-5 space-y-3">
              {!revealed ? (
                <button
                  type="button"
                  onClick={() => setRevealed(true)}
                  className="rounded-full bg-[var(--ink)] px-5 py-2 text-sm text-[var(--paper)]"
                >
                  Reveal answer · חשפו תשובה
                </button>
              ) : (
                <>
                  <div className="whitespace-pre-line rounded-xl border border-emerald-700 bg-emerald-50 px-4 py-3 text-right text-sm leading-relaxed">
                    {q.explainHe ?? q.answer}
                    {q.explainEn && (
                      <span className="term mt-2 block text-xs text-[var(--ink-soft)]">{q.explainEn}</span>
                    )}
                  </div>
                  {!picked ? (
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => markOpen(true)}
                        className="rounded-full border border-emerald-700 px-4 py-2 text-sm font-medium text-emerald-800"
                      >
                        I knew it · ידעתי
                      </button>
                      <button
                        type="button"
                        onClick={() => markOpen(false)}
                        className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--ink-soft)]"
                      >
                        Not quite · לא מדויק
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-3">
                      <p className={cn("text-sm font-semibold", correct ? "text-emerald-800" : "text-red-800")}>
                        {correct ? "Correct · נכון" : "Review the answer above · עברו על התשובה למעלה"}
                      </p>
                      <button
                        type="button"
                        onClick={next}
                        className="shrink-0 rounded-full bg-[var(--ink)] px-5 py-2 text-sm text-[var(--paper)]"
                      >
                        {lastExamQuestion ? "See score · לציון" : "Next question · שאלה הבאה"}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <>
          <div className="mt-5 grid gap-2">
            {q.options.map((opt, i) => {
              const isPick = picked === opt;
              const isAnswer = opt === q.answer;
              const letter = q.kind === "exam" ? OPTION_LETTERS[i] : null;
              return (
                <button
                  key={`${i}-${opt}`}
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
                  {letter ? (
                    <span>
                      <span className="font-bold">{letter}. </span>
                      {opt}
                    </span>
                  ) : (
                    opt
                  )}
                </button>
              );
            })}
          </div>
          {picked && (
            <div className="mt-5 space-y-3">
              {(q.explainHe || q.explainEn) && (
                <p className="rounded-xl bg-[var(--paper)] px-4 py-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {q.explainHe}
                  {q.explainEn && (
                    <span className="term mt-1 block text-xs">{q.explainEn}</span>
                  )}
                </p>
              )}
              <div className="flex items-center justify-between gap-3">
                <p className={cn("text-sm font-semibold", correct ? "text-emerald-800" : "text-red-800")}>
                  {correct ? "Correct · נכון" : "Not quite — the answer is in green · לא מדויק — התשובה מסומנת בירוק"}
                </p>
              <button
                type="button"
                onClick={next}
                className="shrink-0 rounded-full bg-[var(--ink)] px-5 py-2 text-sm text-[var(--paper)]"
              >
                {lastExamQuestion ? "See score · לציון" : "Next question · שאלה הבאה"}
              </button>
              </div>
            </div>
          )}
            </>
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
