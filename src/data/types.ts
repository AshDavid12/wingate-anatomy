import type { RegionId } from "./regions";

export type Muscle = {
  id: string;
  nameHe: string;
  nameEn: string;
  region: RegionId;
  originHe: string;
  originEn: string;
  insertionHe: string;
  insertionEn: string;
  actionHe: string;
  actionEn: string;
  originBones: string[];
  insertionBones: string[];
  innervation?: string;
  notes?: string;
  core: boolean;
};

export type Bone = {
  id: string;
  nameHe: string;
  nameEn: string;
  skeleton: "axial" | "appendicular-upper" | "appendicular-lower";
  type: "ארוכה" | "שטוחה" | "קצרה" | "חסרת צורה" | "ססמואידית";
  typeEn: "Long" | "Flat" | "Short" | "Irregular" | "Sesamoid";
  landmarks: string[];
  joints: string[];
  movements: string[];
  notes?: string;
};

export type Joint = {
  id: string;
  nameHe: string;
  nameEn: string;
  bones: string[];
  typeHe: string;
  typeEn: string;
  movements: string[];
  notes?: string;
};
