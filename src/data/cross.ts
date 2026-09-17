import { muscles } from "./muscles";
import { FAMILIES, actionById, ACTION_ANTONYMS, type ActionId, type PlaneId } from "./planes";
import { MUSCLE_TAGS, JOINT_TAGS, JOINT_PRIMARY_ACTIONS, type JointTag } from "./muscle-tags";
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

/** Actions a muscle actually produces at a given joint (biarticular-aware). */
export function muscleActionsAtJoint(muscleId: string, joint: JointTag): ActionId[] {
  const tags = MUSCLE_TAGS[muscleId];
  if (!tags?.joints.includes(joint)) return [];
  if (tags.at?.[joint]) return tags.at[joint];
  const allowed = JOINT_PRIMARY_ACTIONS[joint];
  return tags.actions.filter((a) => allowed.includes(a));
}

export function musclesByPlane(plane: PlaneId): Muscle[] {
  return muscles.filter((m) =>
    MUSCLE_TAGS[m.id]?.actions.some((a) => actionById(a)?.plane === plane),
  );
}

export function familiesOf(muscleId: string) {
  return FAMILIES.filter((f) => f.members.includes(muscleId));
}

export function familyOf(muscleId: string) {
  return familiesOf(muscleId)[0];
}

/** Group labels shown on muscle names — exam families students must recognize. */
export const NAMED_FAMILIES = new Set(["quads", "hamstrings"]);

export function namedFamiliesOf(muscleId: string) {
  return familiesOf(muscleId).filter((f) => NAMED_FAMILIES.has(f.id));
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
    for (const id of family.members) add(id, `Family · קבוצה: ${family.en} · ${family.he}`, 5);
  }

  for (const m of muscles) {
    const t = MUSCLE_TAGS[m.id];
    if (!t) continue;
    const sharedJoints = t.joints.filter((j) => tags.joints.includes(j));
    const sharedActions = t.actions.filter((a) => tags.actions.includes(a));
    if (sharedJoints.length && sharedActions.length) {
      const jt = JOINT_TAGS.find((j) => j.id === sharedJoints[0]);
      const jLabel = jt ? `${jt.en} · ${jt.he}` : sharedJoints[0];
      const aLabel = sharedActions
        .map((a) => {
          const meta = actionById(a);
          return meta ? `${meta.en} · ${meta.he}` : a;
        })
        .join(", ");
      add(m.id, `Same joint · אותו מפרק (${jLabel}) + ${aLabel}`, 4);
    } else if (sharedActions.length >= 2) {
      add(
        m.id,
        `Shared actions · תנועות משותפות: ${sharedActions
          .map((a) => {
            const meta = actionById(a);
            return meta ? `${meta.en} · ${meta.he}` : a;
          })
          .join(", ")}`,
        3,
      );
    }
    const sharedIns = m.insertionBones.filter((b) => insertions.includes(b));
    if (sharedIns.length) add(m.id, "Same insertion bone · insertion על אותה עצם", 2);
    const sharedOri = m.originBones.filter((b) => origins.includes(b));
    if (sharedOri.length) add(m.id, "Same origin bone · origin על אותה עצם", 1);
  }

  for (const action of tags.actions) {
    const anti = ACTION_ANTONYMS[action];
    if (!anti) continue;
    for (const m of musclesByAction(anti)) {
      const t = MUSCLE_TAGS[m.id];
      if (t?.joints.some((j) => tags.joints.includes(j))) {
        add(
          m.id,
          `Antagonist · אנטגוניסט: ${actionById(anti)?.en} · ${actionById(anti)?.he} vs ${actionById(action)?.en} · ${actionById(action)?.he}`,
          2,
        );
      }
    }
  }

  return [...hits.values()].sort((a, b) => b.score - a.score).slice(0, limit);
}

export function actionsAtJoint(joint: JointTag): ActionId[] {
  const set = new Set<ActionId>();
  for (const m of musclesByJoint(joint)) {
    for (const a of muscleActionsAtJoint(m.id, joint)) set.add(a);
  }
  return JOINT_PRIMARY_ACTIONS[joint].filter((a) => set.has(a));
}

export function groupByJoint(list: Muscle[]): { joint: JointTag; he: string; en: string; muscles: Muscle[] }[] {
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
    en: j.en,
    muscles: map.get(j.id) ?? [],
  }));
}
