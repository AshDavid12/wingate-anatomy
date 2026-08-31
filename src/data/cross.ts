import { muscles } from "./muscles";
import { FAMILIES, actionById, ACTION_ANTONYMS, type ActionId, type PlaneId } from "./planes";
import { MUSCLE_TAGS, JOINT_TAGS, type JointTag } from "./muscle-tags";
import type { Muscle } from "./types";

export function tagsFor(muscleId: string) {
  return MUSCLE_TAGS[muscleId];
}

export function musclesByAction(action: ActionId): Muscle[] {
  return muscles.filter((m) => MUSCLE_TAGS[m.id]?.actions.includes(action));
}

export function musclesByJoint(joint: JointTag): Muscle[] {
  return muscles.filter((m) => MUSCLE_TAGS[m.id]?.joints.includes(joint));
}

export function musclesByPlane(plane: PlaneId): Muscle[] {
  return muscles.filter((m) =>
    MUSCLE_TAGS[m.id]?.actions.some((a) => actionById(a)?.plane === plane),
  );
}

export function familyOf(muscleId: string) {
  return FAMILIES.find((f) => f.members.includes(muscleId));
}

export type SimilarHit = {
  muscle: Muscle;
  reasons: string[];
  score: number;
};

export function similarMuscles(muscleId: string, limit = 8): SimilarHit[] {
  const self = muscles.find((m) => m.id === muscleId);
  const tags = MUSCLE_TAGS[muscleId];
  if (!self || !tags) return [];

  const family = familyOf(muscleId);
  const { origins, insertions } = {
    origins: self.originBones,
    insertions: self.insertionBones,
  };

  const hits = new Map<string, SimilarHit>();

  function add(id: string, reason: string, pts: number) {
    if (id === muscleId) return;
    const muscle = muscles.find((m) => m.id === id);
    if (!muscle) return;
    const cur = hits.get(id) ?? { muscle, reasons: [], score: 0 };
    if (!cur.reasons.includes(reason)) cur.reasons.push(reason);
    cur.score += pts;
    hits.set(id, cur);
  }

  if (family) {
    for (const id of family.members) add(id, `קבוצה: ${family.he}`, 5);
  }

  for (const m of muscles) {
    const t = MUSCLE_TAGS[m.id];
    if (!t) continue;
    const sharedJoints = t.joints.filter((j) => tags.joints.includes(j));
    const sharedActions = t.actions.filter((a) => tags.actions.includes(a));
    if (sharedJoints.length && sharedActions.length) {
      const jHe = JOINT_TAGS.find((j) => j.id === sharedJoints[0])?.he ?? sharedJoints[0];
      const aHe = sharedActions.map((a) => actionById(a)?.he).filter(Boolean).join(", ");
      add(m.id, `אותו מפרק (${jHe}) + ${aHe}`, 4);
    } else if (sharedActions.length >= 2) {
      add(
        m.id,
        `תנועות משותפות: ${sharedActions.map((a) => actionById(a)?.he).join(", ")}`,
        3,
      );
    }
    const sharedIns = m.insertionBones.filter((b) => insertions.includes(b));
    if (sharedIns.length) add(m.id, `insertion על אותה עצם`, 2);
    const sharedOri = m.originBones.filter((b) => origins.includes(b));
    if (sharedOri.length) add(m.id, `origin על אותה עצם`, 1);
  }

  for (const action of tags.actions) {
    const anti = ACTION_ANTONYMS[action];
    if (!anti) continue;
    for (const m of musclesByAction(anti)) {
      const t = MUSCLE_TAGS[m.id];
      if (t?.joints.some((j) => tags.joints.includes(j))) {
        add(m.id, `אנטגוניסט: ${actionById(anti)?.he} מול ${actionById(action)?.he}`, 2);
      }
    }
  }

  return [...hits.values()].sort((a, b) => b.score - a.score).slice(0, limit);
}

export function actionsAtJoint(joint: JointTag): ActionId[] {
  const set = new Set<ActionId>();
  for (const m of musclesByJoint(joint)) {
    for (const a of MUSCLE_TAGS[m.id]?.actions ?? []) {
      if (MUSCLE_TAGS[m.id]?.joints.includes(joint)) set.add(a);
    }
  }
  return [...set];
}

export function groupByJoint(list: Muscle[]): { joint: JointTag; he: string; muscles: Muscle[] }[] {
  const map = new Map<JointTag, Muscle[]>();
  for (const m of list) {
    for (const j of MUSCLE_TAGS[m.id]?.joints ?? []) {
      const arr = map.get(j) ?? [];
      if (!arr.includes(m)) arr.push(m);
      map.set(j, arr);
    }
  }
  return JOINT_TAGS.filter((j) => map.has(j.id)).map((j) => ({
    joint: j.id,
    he: j.he,
    muscles: map.get(j.id) ?? [],
  }));
}
