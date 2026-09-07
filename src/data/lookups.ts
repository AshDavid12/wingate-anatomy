import { bones } from "./bones";
import { muscles } from "./muscles";
import { landmarks } from "./landmarks";
import { MUSCLE_TAGS, JOINT_TAGS } from "./muscle-tags";
import { actionById } from "./planes";
import type { Bone, Muscle } from "./types";

export function musclesForBone(boneId: string): {
  origins: Muscle[];
  insertions: Muscle[];
} {
  return {
    origins: muscles.filter((m) => m.originBones.includes(boneId)),
    insertions: muscles.filter((m) => m.insertionBones.includes(boneId)),
  };
}

export function boneById(id: string): Bone | undefined {
  return bones.find((b) => b.id === id);
}

export function searchMuscles(query: string, list: Muscle[] = muscles): Muscle[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter((m) =>
    [
      m.nameHe,
      m.nameEn,
      m.originHe,
      m.originEn,
      m.insertionHe,
      m.insertionEn,
      m.actionHe,
      m.actionEn,
      m.innervation ?? "",
      m.notes ?? "",
      ...(MUSCLE_TAGS[m.id]?.actions.map((a) => `${actionById(a)?.he ?? ""} ${actionById(a)?.en ?? ""}`) ?? []),
      ...(MUSCLE_TAGS[m.id]?.joints.map((j) => JOINT_TAGS.find((x) => x.id === j)?.he ?? j) ?? []),
    ]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}

export function searchBones(query: string, list: typeof bones = bones): Bone[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter((b) => {
    const parts = landmarks
      .filter((l) => l.boneId === b.id)
      .flatMap((l) => [l.nameHe, l.nameEn, l.locationHe]);
    return [b.nameHe, b.nameEn, b.type, b.typeEn, ...b.landmarks, ...b.joints, ...b.movements, b.notes ?? "", ...parts]
      .join(" ")
      .toLowerCase()
      .includes(q);
  });
}
