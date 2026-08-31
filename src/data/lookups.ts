import { bones } from "./bones";
import { muscles } from "./muscles";
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
    ]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}

export function searchBones(query: string, list: typeof bones = bones): Bone[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter((b) =>
    [b.nameHe, b.nameEn, b.type, b.typeEn, ...b.landmarks, ...b.joints, ...b.movements, b.notes ?? ""]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}
