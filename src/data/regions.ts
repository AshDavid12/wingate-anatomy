export const REGIONS = [
  { id: "shoulder-girdle", he: "חגורת הכתף", en: "Shoulder girdle" },
  { id: "shoulder", he: "מפרק הכתף", en: "Glenohumeral" },
  { id: "arm", he: "זרוע ומרפק", en: "Arm & elbow" },
  { id: "forearm", he: "אמה ושורש כף היד", en: "Forearm & wrist" },
  { id: "neck-trunk", he: "צוואר, בטן וגב", en: "Neck, trunk & back" },
  { id: "hip", he: "אגן וירך", en: "Hip & pelvis" },
  { id: "thigh", he: "ירך וברך", en: "Thigh & knee" },
  { id: "leg", he: "שוק וקרסול", en: "Leg & ankle" },
] as const;

export type RegionId = (typeof REGIONS)[number]["id"];

export const REGION_COLORS: Record<RegionId, string> = {
  "shoulder-girdle": "bg-teal-100 text-teal-900 border-teal-200",
  shoulder: "bg-sky-100 text-sky-900 border-sky-200",
  arm: "bg-indigo-100 text-indigo-900 border-indigo-200",
  forearm: "bg-violet-100 text-violet-900 border-violet-200",
  "neck-trunk": "bg-amber-100 text-amber-950 border-amber-200",
  hip: "bg-rose-100 text-rose-900 border-rose-200",
  thigh: "bg-orange-100 text-orange-950 border-orange-200",
  leg: "bg-lime-100 text-lime-950 border-lime-200",
};
