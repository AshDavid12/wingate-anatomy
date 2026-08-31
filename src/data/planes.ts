export type PlaneId = "sagittal" | "frontal" | "horizontal";

export type ActionId =
  | "flexion"
  | "extension"
  | "dorsiflexion"
  | "plantarflexion"
  | "abduction"
  | "adduction"
  | "lateral-flexion"
  | "elevation"
  | "depression"
  | "upward-rotation"
  | "downward-rotation"
  | "inversion"
  | "eversion"
  | "internal-rotation"
  | "external-rotation"
  | "horizontal-abduction"
  | "horizontal-adduction"
  | "pronation"
  | "supination"
  | "protraction"
  | "retraction"
  | "anterior-tilt"
  | "posterior-tilt"
  | "stabilize";

export const PLANES: {
  id: PlaneId;
  he: string;
  en: string;
  also: string;
  splits: string;
  axisHe: string;
  axisEn: string;
  mnemonic: string;
  examples: string[];
  color: string;
  bg: string;
}[] = [
  {
    id: "sagittal",
    he: "מישור סגיטלי",
    en: "Sagittal plane",
    also: "anteroposterior",
    splits: "מחלק ימין / שמאל",
    axisHe: "ציר מדיאלי–לטרלי (פרונטלי)",
    axisEn: "Mediolateral (frontal) axis",
    mnemonic: "קדימה–אחורה. כמו לרוץ, סקוואט, כפיפת מרפק, כן-לא של הראש.",
    examples: ["סקוואט", "לאנג'", "Biceps curl", "Deadlift", "כפיפות בטן"],
    color: "text-teal-900",
    bg: "bg-teal-100 border-teal-200",
  },
  {
    id: "frontal",
    he: "מישור פרונטלי",
    en: "Frontal (coronal) plane",
    also: "coronal",
    splits: "מחלק קדימה / אחורה",
    axisHe: "ציר קדמי–אחורי",
    axisEn: "Anteroposterior axis",
    mnemonic: "ימינה–שמאלה. כמו jumping jacks, הרחקת כתף, כפיפה צידית.",
    examples: ["Side raise", "Jumping jacks", "Side plank", "Hip abduction"],
    color: "text-rose-900",
    bg: "bg-rose-100 border-rose-200",
  },
  {
    id: "horizontal",
    he: "מישור הוריזונטלי",
    en: "Horizontal (transverse) plane",
    also: "transverse",
    splits: "מחלק למעלה / למטה",
    axisHe: "ציר אנכי / אורכי",
    axisEn: "Vertical / longitudinal axis",
    mnemonic: "סיבוב סביב הציר. כמו רוטציית גו, pec-deck, סיבוב כתף.",
    examples: ["Chest fly / pec deck", "Russian twist", "Shoulder ER/IR", "סופינציה"],
    color: "text-amber-950",
    bg: "bg-amber-100 border-amber-200",
  },
];

export const ACTIONS: {
  id: ActionId;
  he: string;
  en: string;
  plane: PlaneId | null;
  note: string;
}[] = [
  { id: "flexion", he: "כפיפה", en: "Flexion", plane: "sagittal", note: "הקטנת הזווית במפרק" },
  { id: "extension", he: "פשיטה", en: "Extension", plane: "sagittal", note: "הגדלת הזווית / חזרה מכפיפה" },
  {
    id: "dorsiflexion",
    he: "דורסיפלקשן",
    en: "Dorsiflexion",
    plane: "sagittal",
    note: "גב כף הרגל לכיוון השוק",
  },
  {
    id: "plantarflexion",
    he: "פלנטרפלקשן",
    en: "Plantar flexion",
    plane: "sagittal",
    note: "הרמת עקבים / כפיפה כפית",
  },
  { id: "anterior-tilt", he: "סיבוב אגן לפנים", en: "Anterior pelvic tilt", plane: "sagittal", note: "הגדלת לורדוזה" },
  { id: "posterior-tilt", he: "סיבוב אגן לאחור", en: "Posterior pelvic tilt", plane: "sagittal", note: "השטחת לורדוזה" },
  { id: "abduction", he: "הרחקה", en: "Abduction", plane: "frontal", note: "הרחקה מקו האמצע" },
  { id: "adduction", he: "קרוב", en: "Adduction", plane: "frontal", note: "קרוב אל קו האמצע" },
  { id: "lateral-flexion", he: "כפיפה צידית", en: "Lateral flexion", plane: "frontal", note: "כפיפת גו/צוואר לצד" },
  { id: "elevation", he: "הרמה", en: "Elevation", plane: "frontal", note: "שכמה כלפי מעלה" },
  { id: "depression", he: "הורדה", en: "Depression", plane: "frontal", note: "שכמה כלפי מטה" },
  {
    id: "upward-rotation",
    he: "סיבוב מעלה",
    en: "Upward rotation",
    plane: "frontal",
    note: "glenoid פונה מעלה — בהרחקת כתף",
  },
  {
    id: "downward-rotation",
    he: "סיבוב מטה",
    en: "Downward rotation",
    plane: "frontal",
    note: "glenoid פונה מטה",
  },
  { id: "inversion", he: "היפוך", en: "Inversion", plane: "frontal", note: "סוליית כף הרגל פנימה" },
  { id: "eversion", he: "אוורסיה", en: "Eversion", plane: "frontal", note: "סוליית כף הרגל החוצה" },
  {
    id: "internal-rotation",
    he: "רוטציה מדיאלית",
    en: "Internal (medial) rotation",
    plane: "horizontal",
    note: "סיבוב פנימה סביב ציר האורך",
  },
  {
    id: "external-rotation",
    he: "רוטציה לטרלית",
    en: "External (lateral) rotation",
    plane: "horizontal",
    note: "סיבוב החוצה סביב ציר האורך",
  },
  {
    id: "horizontal-abduction",
    he: "הרחקה אופקית",
    en: "Horizontal abduction",
    plane: "horizontal",
    note: "בכתף, זרוע מורמת ל־90°",
  },
  {
    id: "horizontal-adduction",
    he: "קרוב אופקי",
    en: "Horizontal adduction",
    plane: "horizontal",
    note: "בכתף, זרוע מורמת ל־90°",
  },
  { id: "pronation", he: "פרונציה", en: "Pronation", plane: "horizontal", note: "אמה: גב כף היד קדימה" },
  { id: "supination", he: "סופינציה", en: "Supination", plane: "horizontal", note: "אמה: כף היד קדימה" },
  { id: "protraction", he: "הרחקת שכמות", en: "Protraction", plane: "horizontal", note: "שכמה קדימה על בית החזה" },
  { id: "retraction", he: "קרוב שכמות", en: "Retraction", plane: "horizontal", note: "שכמה אחורה לעמוד השדרה" },
  { id: "stabilize", he: "ייצוב", en: "Stabilization", plane: null, note: "לא תנועה במישור אחד" },
];

export const ACTION_ANTONYMS: Partial<Record<ActionId, ActionId>> = {
  flexion: "extension",
  extension: "flexion",
  dorsiflexion: "plantarflexion",
  plantarflexion: "dorsiflexion",
  abduction: "adduction",
  adduction: "abduction",
  elevation: "depression",
  depression: "elevation",
  "upward-rotation": "downward-rotation",
  "downward-rotation": "upward-rotation",
  inversion: "eversion",
  eversion: "inversion",
  "internal-rotation": "external-rotation",
  "external-rotation": "internal-rotation",
  "horizontal-abduction": "horizontal-adduction",
  "horizontal-adduction": "horizontal-abduction",
  pronation: "supination",
  supination: "pronation",
  protraction: "retraction",
  retraction: "protraction",
  "anterior-tilt": "posterior-tilt",
  "posterior-tilt": "anterior-tilt",
};

export const FAMILIES: { id: string; he: string; en: string; members: string[] }[] = [
  {
    id: "rotator-cuff",
    he: "מייצבי הכתף (SITS)",
    en: "Rotator cuff",
    members: ["supraspinatus", "infraspinatus", "teres-minor", "subscapularis"],
  },
  {
    id: "lat-teres",
    he: "פושטי–מקרבי כתף (Lat + Teres major)",
    en: "Shoulder ext / add / IR pair",
    members: ["latissimus-dorsi", "teres-major"],
  },
  {
    id: "quads",
    he: "ארבע-ראשי",
    en: "Quadriceps",
    members: ["rectus-femoris", "vastus-lateralis", "vastus-medialis", "vastus-intermedius"],
  },
  {
    id: "hamstrings",
    he: "המסטרינג",
    en: "Hamstrings",
    members: ["biceps-femoris", "semitendinosus", "semimembranosus"],
  },
  {
    id: "adductors",
    he: "מקרבי ירך",
    en: "Hip adductors",
    members: ["adductor-longus", "adductor-brevis", "adductor-magnus", "gracilis", "pectineus"],
  },
  {
    id: "glutes",
    he: "שרירי העכוז",
    en: "Gluteals",
    members: ["gluteus-maximus", "gluteus-medius", "gluteus-minimus"],
  },
  {
    id: "iliopsoas",
    he: "איליופסואס",
    en: "Iliopsoas",
    members: ["psoas-major", "iliacus"],
  },
  {
    id: "triceps-surae",
    he: "תאומים + סוליה",
    en: "Triceps surae",
    members: ["gastrocnemius", "soleus", "plantaris"],
  },
  {
    id: "elbow-flexors",
    he: "כופפי מרפק",
    en: "Elbow flexors",
    members: ["biceps-brachii", "brachialis", "brachioradialis"],
  },
  {
    id: "rhomboids",
    he: "מעוינים",
    en: "Rhomboids",
    members: ["rhomboid-major", "rhomboid-minor"],
  },
  {
    id: "abs",
    he: "שרירי הבטן",
    en: "Abdominals",
    members: ["rectus-abdominis", "external-oblique", "internal-oblique", "transversus-abdominis"],
  },
  {
    id: "pes-anserinus",
    he: "Pes anserinus (SGT)",
    en: "Pes anserinus",
    members: ["sartorius", "gracilis", "semitendinosus"],
  },
];

export function actionById(id: ActionId) {
  return ACTIONS.find((a) => a.id === id);
}

export function planeById(id: PlaneId) {
  return PLANES.find((p) => p.id === id);
}
