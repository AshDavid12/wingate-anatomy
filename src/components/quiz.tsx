"use client";

import { useEffect, useState } from "react";
import { muscles } from "@/data/muscles";
import { anatomyImage } from "@/data/anatomy-images";
import { dictionaryTerms } from "@/data/dictionary";
import { examLandmarks, type Landmark } from "@/data/landmarks";
import { bilingual } from "@/components/name-pair";
import { AnatomyThumb } from "@/components/anatomy-image";
import { ACTIONS, FAMILIES, PLANES, planeById } from "@/data/planes";
import { cn } from "@/lib/utils";

type Kind =
  | "origin"
  | "insertion"
  | "action"
  | "name"
  | "picture"
  | "plane"
  | "family"
  | "term"
  | "landmark"
  | "landmark-pic";

type Question = {
  muscleId: string;
  prompt: string;
  kind: Kind;
  answer: string;
  options: string[];
  landmarkId?: string;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickKind(): Kind {
  const kinds: Kind[] = [
    "origin",
    "insertion",
    "action",
    "name",
    "picture",
    "plane",
    "family",
    "term",
    "landmark",
    "landmark-pic",
  ];
  return kinds[Math.floor(Math.random() * kinds.length)];
}

function landmarkLabel(l: Landmark) {
  return bilingual(l.nameEn, l.nameHe);
}

function landmarkDistractors(item: Landmark) {
  const same = examLandmarks.filter((x) => x.id !== item.id && x.region === item.region);
  const rest = examLandmarks.filter((x) => x.id !== item.id && x.region !== item.region);
  return shuffle([...same, ...rest]).slice(0, 3);
}

function buildLandmarkQuestion(withPicture: boolean): Question {
  const pictured = examLandmarks.filter(
    (l) => anatomyImage("landmarks", l.id) || anatomyImage("bones", l.boneId),
  );
  const pool = withPicture ? pictured : examLandmarks;
  const item = pool[Math.floor(Math.random() * pool.length)] ?? examLandmarks[0]!;
  const others = landmarkDistractors(item);
  if (withPicture) {
    return {
      muscleId: item.boneId,
      landmarkId: item.id,
      kind: "landmark-pic",
      prompt: "איזה חלק עצם מסומן באיור?",
      answer: landmarkLabel(item),
      options: shuffle([item, ...others].map(landmarkLabel)),
    };
  }
  return {
    muscleId: item.boneId,
    landmarkId: item.id,
    kind: "landmark",
    prompt: `איפה נמצא ${landmarkLabel(item)}?`,
    answer: item.locationHe,
    options: shuffle([item.locationHe, ...others.map((x) => x.locationHe)]),
  };
}

function buildQuestion(pool = muscles.filter((m) => m.core)): Question {
  let kind = pickKind();
  const pictured = pool.filter((m) => anatomyImage("muscles", m.id));
  if (kind === "picture" && pictured.length < 4) kind = "name";

  if (kind === "plane") {
    const moves = ACTIONS.filter((a) => a.plane);
    const a = moves[Math.floor(Math.random() * moves.length)]!;
    const p = planeById(a.plane!)!;
    return {
      muscleId: "trapezius",
      kind: "plane",
      prompt: `באיזה מישור מתבצעת ${bilingual(a.en, a.he)}?`,
      answer: bilingual(p.en, p.he),
      options: shuffle(PLANES.map((x) => bilingual(x.en, x.he))),
    };
  }

  if (kind === "term") {
    return buildTermQuestion();
  }

  if (kind === "landmark" || kind === "landmark-pic") {
    return buildLandmarkQuestion(kind === "landmark-pic");
  }

  if (kind === "family") {
    const f = FAMILIES[Math.floor(Math.random() * FAMILIES.length)]!;
    const others = shuffle(FAMILIES.filter((x) => x.id !== f.id)).slice(0, 3);
    return {
      muscleId: f.members[0] ?? "trapezius",
      kind: "family",
      prompt: `לאיזו קבוצה שייכים ${f.members
        .slice(0, 2)
        .map((id) => {
          const m = muscles.find((x) => x.id === id);
          return m ? bilingual(m.nameEn, m.nameHe) : id;
        })
        .join(" / ")}?`,
      answer: bilingual(f.en, f.he),
      options: shuffle([f, ...others].map((x) => bilingual(x.en, x.he))),
    };
  }

  const source = kind === "picture" ? pictured : pool;
  const muscle = source[Math.floor(Math.random() * source.length)] ?? pool[0];
  if (!muscle) {
    return {
      muscleId: "trapezius",
      kind: "name",
      prompt: "אין שאלות",
      answer: "",
      options: [],
    };
  }
  const others = shuffle(pool.filter((m) => m.id !== muscle.id)).slice(0, 3);

  if (kind === "name" || kind === "picture") {
    const answer = bilingual(muscle.nameEn, muscle.nameHe);
    const options = shuffle([answer, ...others.map((m) => bilingual(m.nameEn, m.nameHe))]);
    return {
      muscleId: muscle.id,
      kind,
      prompt:
        kind === "picture"
          ? "איזה שריר מופיע באיור?"
          : `איזה שריר? Origin: ${muscle.originHe}`,
      answer,
      options,
    };
  }

  const field =
    kind === "origin"
      ? { he: muscle.originHe, label: "Origin (התחלה)" }
      : kind === "insertion"
        ? { he: muscle.insertionHe, label: "Insertion (סיום)" }
        : { he: muscle.actionHe, label: "Action (תנועה)" };

  const distractors = others.map((m) =>
    kind === "origin" ? m.originHe : kind === "insertion" ? m.insertionHe : m.actionHe,
  );

  return {
    muscleId: muscle.id,
    kind,
    prompt: `מה ה־${field.label} של ${bilingual(muscle.nameEn, muscle.nameHe)}?`,
    answer: field.he,
    options: shuffle([field.he, ...distractors]),
  };
}

function termLabel(t: (typeof dictionaryTerms)[number]) {
  return bilingual(t.en, t.he);
}

function buildTermQuestion(): Question {
  const pool = dictionaryTerms.filter((t) => t.definition.trim().length >= 8);
  const term = pool[Math.floor(Math.random() * pool.length)] ?? dictionaryTerms[0]!;
  const unique = pool.filter((t) => t.id !== term.id && t.definition !== term.definition);
  const sameTopic = unique.filter((t) => t.topic === term.topic);
  const rest = unique.filter((t) => t.topic !== term.topic);
  const distractors = shuffle([...sameTopic, ...rest])
    .filter((t, _, arr) => arr.findIndex((x) => x.definition === t.definition) === arr.indexOf(t))
    .slice(0, 3);

  if (distractors.length < 3) {
    return {
      muscleId: "trapezius",
      kind: "term",
      prompt: `מה ההגדרה של ${termLabel(term)}?`,
      answer: term.definition,
      options: [term.definition],
    };
  }

  if (Math.random() < 0.55) {
    return {
      muscleId: "trapezius",
      kind: "term",
      prompt: `מה ההגדרה של ${termLabel(term)}?`,
      answer: term.definition,
      options: shuffle([term.definition, ...distractors.map((d) => d.definition)]),
    };
  }

  return {
    muscleId: "trapezius",
    kind: "term",
    prompt: `איזה מונח מתואר? ${term.definition}`,
    answer: termLabel(term),
    options: shuffle([term, ...distractors].map(termLabel)),
  };
}

export function Quiz() {
  const [q, setQ] = useState<Question | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState({ ok: 0, n: 0 });

  useEffect(() => {
    setQ(buildQuestion());
  }, []);

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
    setQ(buildQuestion());
  }

  const correct = picked === q?.answer;
  const pct = score.n ? Math.round((score.ok / score.n) * 100) : 0;

  if (!q) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-[var(--line)] bg-[var(--card)] p-8 text-center text-sm text-[var(--ink-soft)]">
        טוען שאלה…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex items-center justify-between text-sm">
        <p className="text-[var(--ink-soft)]">
          ציון: <span className="font-bold text-[var(--ink)]">{score.ok}</span> / {score.n}
          {score.n > 0 && <span> ({pct}%)</span>}
        </p>
        <p className="text-xs text-[var(--ink-soft)]">שאלות בסגנון מבחן · Origin / חלקי עצם / מילון</p>
      </div>

      <div className="rounded-3xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-sm md:p-7">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
          {q.kind}
        </p>
        <h2 className="mt-2 text-lg font-bold leading-snug md:text-xl">{q.prompt}</h2>
        {(q.kind === "picture" || q.kind === "landmark-pic") && (
          <QuizPicture q={q} />
        )}
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
              {correct ? "נכון" : "לא מדויק — התשובה מסומנת בירוק"}
            </p>
            <button
              type="button"
              onClick={next}
              className="rounded-full bg-[var(--ink)] px-5 py-2 text-sm text-[var(--paper)]"
            >
              שאלה הבאה
            </button>
          </div>
        )}
      </div>
    </div>
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
