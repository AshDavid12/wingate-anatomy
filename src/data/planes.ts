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

export type GymMove = {
  en: string;
  he: string;
  whyEn: string;
  whyHe: string;
};

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
  gym: GymMove[];
  color: string;
  bg: string;
}[] = [
  {
    id: "sagittal",
    he: "מישור סגיטלי",
    en: "Sagittal plane",
    also: "anteroposterior",
    splits: "Splits left / right · מחלק ימין / שמאל",
    axisHe: "ציר מדיאלי–לטרלי (פרונטלי)",
    axisEn: "Mediolateral (frontal) axis",
    mnemonic: "Front–back. Run, squat, elbow curl, nodding yes. · קדימה–אחורה. כמו לרוץ, סקוואט, כפיפת מרפק, כן-לא של הראש.",
    examples: ["Squat · סקוואט", "Lunge · לאנג'", "Biceps curl", "Deadlift", "Crunch · כפיפות בטן"],
    gym: [
      { en: "Squat", he: "סקוואט", whyEn: "Hip + knee flexion going down, extension standing up.", whyHe: "כפיפת ירך וברך בירידה, פשיטה בעלייה." },
      { en: "Forward lunge", he: "לאנג' קדמי", whyEn: "Same hip/knee fold — the step stays front–back.", whyHe: "אותה כפיפת ירך/ברך — הצעד נשאר קדימה–אחורה." },
      { en: "Deadlift / RDL", he: "דדליפט / RDL", whyEn: "Hip hinge: fold forward, then extend the hip.", whyHe: "ציר ירך: מתקפלים לפנים ואז פושטים את הירך." },
      { en: "Hip thrust / glute bridge", he: "היפ תרסט / גשר", whyEn: "Hip extension against the floor or bench.", whyHe: "פשיטת ירך מול הרצפה או הספסל." },
      { en: "Leg press", he: "לחיצת רגליים", whyEn: "Machine squat — hip and knee still flex/extend.", whyHe: "סקוואט במכונה — ירך וברך עדיין כופפות/פושטות." },
      { en: "Leg extension", he: "פשיטת ברך במכונה", whyEn: "Pure knee extension.", whyHe: "פשיטת ברך נקייה." },
      { en: "Leg curl / Nordic curl", he: "כפיפת ברך / נורדיק", whyEn: "Pure knee flexion (Nordic is the eccentric version).", whyHe: "כפיפת ברך נקייה (נורדיק = אותה תנועה אקסצנטרית)." },
      { en: "Calf raise", he: "הרמת עקבים", whyEn: "Plantar flexion — pointing the foot like a gas pedal.", whyHe: "פלנטרפלקשן — כמו ללחוץ על הגז." },
      { en: "Tibialis / toe raise", he: "הרמת בהונות", whyEn: "Dorsiflexion — foot toward the shin.", whyHe: "דורסיפלקשן — כף הרגל לכיוון השוק." },
      { en: "Biceps curl", he: "כפיפת מרפק / כפיפות ידיים", whyEn: "Elbow flexion. Watch the forearm swing forward.", whyHe: "כפיפת מרפק. האמה נעה קדימה." },
      { en: "Triceps pushdown / skull crusher", he: "פושדאון / סקאל קראשר", whyEn: "Elbow extension — the opposite curl.", whyHe: "פשיטת מרפק — ההפך מכפיפה." },
      { en: "Front raise", he: "הרמה קדמית", whyEn: "Shoulder flexion — arm lifts straight forward.", whyHe: "כפיפת כתף — הזרוע עולה ישר לפנים." },
      { en: "Crunch / sit-up", he: "כפיפות בטן", whyEn: "Trunk flexion — ribs toward the pelvis.", whyHe: "כפיפת גו — הצלעות מתקרבות לאגן." },
      { en: "Back extension / Superman", he: "פשיטת גב / סופרמן", whyEn: "Trunk extension — opening the front of the body.", whyHe: "פשיטת גו — פותחים את קדמת הגוף." },
      { en: "Treadmill walk / run / bike", he: "הליכה / ריצה / אופניים", whyEn: "Alternating hip and knee flexion–extension.", whyHe: "כפיפה–פשיטה לסירוגין בירך ובברך." },
    ],
    color: "text-teal-900",
    bg: "bg-teal-100 border-teal-200",
  },
  {
    id: "frontal",
    he: "מישור פרונטלי",
    en: "Frontal (coronal) plane",
    also: "coronal",
    splits: "Splits front / back · מחלק קדימה / אחורה",
    axisHe: "ציר קדמי–אחורי",
    axisEn: "Anteroposterior axis",
    mnemonic: "Side to side. Jumping jacks, shoulder abduction, side bend. · ימינה–שמאלה. כמו jumping jacks, הרחקת כתף, כפיפה צידית.",
    examples: ["Side raise", "Jumping jacks", "Side plank", "Hip abduction"],
    gym: [
      { en: "Lateral raise", he: "הרמה צידית", whyEn: "Shoulder abduction — arms rise out to the sides.", whyHe: "הרחקת כתף — הידיים עולות הצידה." },
      { en: "Jumping jacks", he: "ג'מפינג ג'קס", whyEn: "Abduction on the way out, adduction on the way in.", whyHe: "הרחקה בפתיחה, קרוב בסגירה." },
      { en: "Lateral lunge", he: "לאנג' צידי", whyEn: "The step goes sideways — hip abducts then adducts.", whyHe: "הצעד הצידה — הירך מתרחקת וחוזרת בקרוב." },
      { en: "Hip abduction machine / cable", he: "מכונת / כבל הרחקת ירך", whyEn: "Classic hip abduction.", whyHe: "הרחקת ירך קלאסית." },
      { en: "Hip adduction machine", he: "מכונת קרוב ירך", whyEn: "Squeeze the thighs together — hip adduction.", whyHe: "סוחטים את הירכיים זו לזו — קרוב ירך." },
      { en: "Lateral band walk", he: "הליכת גומייה צידית", whyEn: "Small side steps against a band — hip abduction.", whyHe: "צעדים קטנים הצידה נגד גומייה — הרחקת ירך." },
      { en: "Lat pulldown (arms out wide)", he: "פולדאון רחב", whyEn: "The shoulder's job is adduction — elbows travel down the sides. The elbow also flexes (sagittal).", whyHe: "תפקיד הכתף הוא קרוב — המרפקים יורדים בצדדים. המרפק גם נכפף (סגיטלי)." },
      { en: "Wide / military press", he: "לחיצה מעל הראש רחבה", whyEn: "Arms travel out and up — closer to abduction than a front raise.", whyHe: "הידיים עולות החוצה ולמעלה — יותר הרחקה מהרמה קדמית." },
      { en: "Shrug", he: "שראג", whyEn: "Scapular elevation — shoulders toward the ears.", whyHe: "הרמת שכמות — כתפיים לכיוון האוזניים." },
      { en: "Side bend / suitcase carry", he: "כפיפה צידית / מזוודה", whyEn: "Lateral flexion of the trunk — or resisting it.", whyHe: "כפיפה צידית של הגו — או התנגדות לה." },
      { en: "Side plank", he: "פלאנק צידי", whyEn: "Anti-lateral-flexion: the obliques stop you from collapsing sideways.", whyHe: "נגד כפיפה צידית: האלכסוניים מונעים קריסה הצידה." },
      { en: "Copenhagen plank", he: "פלאנק קופנהגן", whyEn: "Isometric hip adduction on the bench.", whyHe: "קרוב ירך איזומטרי על הספסל." },
      { en: "Ankle inversion / eversion band", he: "היפוך / אוורסיה בגומייה", whyEn: "Sole turns in or out — frontal-plane foot motion.", whyHe: "הסוליה פונה פנימה או החוצה — כף רגל במישור הפרונטלי." },
    ],
    color: "text-rose-900",
    bg: "bg-rose-100 border-rose-200",
  },
  {
    id: "horizontal",
    he: "מישור הוריזונטלי",
    en: "Horizontal (transverse) plane",
    also: "transverse",
    splits: "Splits top / bottom · מחלק למעלה / למטה",
    axisHe: "ציר אנכי / אורכי",
    axisEn: "Vertical / longitudinal axis",
    mnemonic: "Rotation around the long axis. Trunk twist, pec-deck, shoulder spin. · סיבוב סביב הציר. כמו רוטציית גו, pec-deck, סיבוב כתף.",
    examples: ["Chest fly / pec deck", "Russian twist", "Shoulder ER/IR", "Supination · סופינציה"],
    gym: [
      { en: "Chest fly / pec deck", he: "פליי חזה / פק-דק", whyEn: "Arms start open at 90° and hug in — horizontal adduction.", whyHe: "הידיים פתוחות ב־90° ומתקרבות — קרוב אופקי." },
      { en: "Cable crossover", he: "קרוסאובר", whyEn: "Same hug: horizontal adduction of the shoulder.", whyHe: "אותו חיבוק: קרוב אופקי של הכתף." },
      { en: "Reverse fly / rear-delt fly", he: "פליי אחורי", whyEn: "Open the arms from a hug — horizontal abduction.", whyHe: "פותחים את הידיים מחיבוק — הרחקה אופקית." },
      { en: "Face pull", he: "פייס פול", whyEn: "Horizontal abduction plus external rotation.", whyHe: "הרחקה אופקית וגם רוטציה לטרלית." },
      { en: "Russian twist", he: "טוויסט רוסי", whyEn: "Trunk rotation around the long axis.", whyHe: "רוטציית גו סביב ציר האורך." },
      { en: "Cable woodchop", he: "וודצ'ופ בכבל", whyEn: "Diagonal rotation of the trunk — still a spin, not a side bend.", whyHe: "רוטציה אלכסונית של הגו — עדיין סיבוב, לא כפיפה צידית." },
      { en: "Pallof press", he: "פאלוף פרס", whyEn: "Anti-rotation: you refuse to twist. Same plane.", whyHe: "נגד רוטציה: מסרבים להסתובב. אותו מישור." },
      { en: "Bicycle crunch", he: "אופניים", whyEn: "Shoulder toward opposite hip — trunk rotation.", whyHe: "כתף לירך הנגדית — רוטציית גו." },
      { en: "Landmine / med-ball rotation", he: "רוטציית לנדמיין / כדור", whyEn: "Standing spin of the trunk.", whyHe: "סיבוב גו בעמידה." },
      { en: "Shoulder IR / ER cables", he: "רוטציית כתף בכבל", whyEn: "Upper arm spins in or out around its long axis.", whyHe: "הזרוע מסתובבת פנימה או החוצה סביב ציר האורך." },
      { en: "Clamshell", he: "קלאמשל", whyEn: "Hip external rotation — the femur spins, the knee does not hinge.", whyHe: "רוטציה לטרלית של הירך — עצם הירך מסתובבת, הברך לא נכפפת." },
      { en: "Pronation–supination with dumbbell", he: "פרונציה–סופינציה עם משקולת", whyEn: "Forearm spin: palm down then palm up.", whyHe: "סיבוב אמה: גב כף היד ואז כף היד למעלה." },
      { en: "Seated row squeeze", he: "חתירה — קרוב שכמות", whyEn: "Scapular retraction: pinch the shoulder blades together.", whyHe: "קרוב שכמות: סוחטים את השכמות זו לזו." },
      { en: "Push-up plus / serratus punch", he: "פאנץ' סראטוס", whyEn: "Scapular protraction — slide the blades forward on the ribs.", whyHe: "הרחקת שכמות — השכמות מחליקות קדימה על הצלעות." },
    ],
    color: "text-amber-950",
    bg: "bg-amber-100 border-amber-200",
  },
];

/** Compound gym lifts: each joint still has its own plane. */
export const MIXED_GYM: {
  en: string;
  he: string;
  whyEn: string;
  whyHe: string;
}[] = [
  {
    en: "Bench press / push-up",
    he: "לחיצת חזה / שכיבות סמיכה",
    whyEn: "Shoulder hugs in (horizontal adduction) while the elbow extends (sagittal).",
    whyHe: "הכתף מתקרבת בחיבוק (קרוב אופקי) והמרפק נפשט (סגיטלי).",
  },
  {
    en: "Pull-up / chin-up",
    he: "מתח",
    whyEn: "Shoulder adducts down the sides (frontal) while the elbow flexes (sagittal).",
    whyHe: "הכתף מתקרבת לצד הגוף (פרונטלי) והמרפק נכפף (סגיטלי).",
  },
  {
    en: "Bent-over / seated row",
    he: "חתירה",
    whyEn: "Shoulder extends back (sagittal) and the scapulae retract (horizontal).",
    whyHe: "הכתף נפשטת אחורה (סגיטלי) והשכמות מתקרבות (הוריזונטלי).",
  },
  {
    en: "Overhead squat",
    he: "סקוואט מעל הראש",
    whyEn: "Legs stay sagittal; the shoulders hold abduction in the frontal plane.",
    whyHe: "הרגליים סגיטליות; הכתפיים מחזיקות הרחקה במישור הפרונטלי.",
  },
  {
    en: "Walking lunge + twist",
    he: "לאנג' עם סיבוב",
    whyEn: "Legs step in the sagittal plane; the trunk rotates in the horizontal plane.",
    whyHe: "הרגליים צועדות בסגיטלי; הגו מסתובב בהוריזונטלי.",
  },
];

export function gymMovesByPlane(id: PlaneId) {
  return PLANES.find((p) => p.id === id)?.gym ?? [];
}

export function allGymMoves() {
  return PLANES.flatMap((p) => p.gym.map((move) => ({ plane: p.id, move })));
}

export const ACTIONS: {
  id: ActionId;
  he: string;
  en: string;
  plane: PlaneId | null;
  note: string;
}[] = [
  { id: "flexion", he: "כפיפה", en: "Flexion", plane: "sagittal", note: "Decrease the joint angle · הקטנת הזווית במפרק" },
  { id: "extension", he: "פשיטה", en: "Extension", plane: "sagittal", note: "Increase the angle / return from flexion · הגדלת הזווית / חזרה מכפיפה" },
  {
    id: "dorsiflexion",
    he: "דורסיפלקשן",
    en: "Dorsiflexion",
    plane: "sagittal",
    note: "Foot toward the shin · גב כף הרגל לכיוון השוק",
  },
  {
    id: "plantarflexion",
    he: "פלנטרפלקשן",
    en: "Plantar flexion",
    plane: "sagittal",
    note: "Point the foot / press the gas · הרמת עקבים / כפיפה כפית",
  },
  { id: "anterior-tilt", he: "סיבוב אגן לפנים", en: "Anterior pelvic tilt", plane: "sagittal", note: "Increase lordosis · הגדלת לורדוזה" },
  { id: "posterior-tilt", he: "סיבוב אגן לאחור", en: "Posterior pelvic tilt", plane: "sagittal", note: "Flatten lordosis · השטחת לורדוזה" },
  { id: "abduction", he: "הרחקה", en: "Abduction", plane: "frontal", note: "Away from the midline · הרחקה מקו האמצע" },
  { id: "adduction", he: "קרוב", en: "Adduction", plane: "frontal", note: "Toward the midline · קרוב אל קו האמצע" },
  { id: "lateral-flexion", he: "כפיפה צידית", en: "Lateral flexion", plane: "frontal", note: "Side-bend trunk or neck · כפיפת גו/צוואר לצד" },
  { id: "elevation", he: "הרמה", en: "Elevation", plane: "frontal", note: "Scapula upward · שכמה כלפי מעלה" },
  { id: "depression", he: "הורדה", en: "Depression", plane: "frontal", note: "Scapula downward · שכמה כלפי מטה" },
  {
    id: "upward-rotation",
    he: "סיבוב מעלה",
    en: "Upward rotation",
    plane: "frontal",
    note: "Glenoid faces up — with shoulder abduction · glenoid פונה מעלה — בהרחקת כתף",
  },
  {
    id: "downward-rotation",
    he: "סיבוב מטה",
    en: "Downward rotation",
    plane: "frontal",
    note: "Glenoid faces down · glenoid פונה מטה",
  },
  { id: "inversion", he: "היפוך", en: "Inversion", plane: "frontal", note: "Sole faces inward · סוליית כף הרגל פנימה" },
  { id: "eversion", he: "אוורסיה", en: "Eversion", plane: "frontal", note: "Sole faces outward · סוליית כף הרגל החוצה" },
  {
    id: "internal-rotation",
    he: "רוטציה מדיאלית",
    en: "Internal (medial) rotation",
    plane: "horizontal",
    note: "Spin inward around the long axis · סיבוב פנימה סביב ציר האורך",
  },
  {
    id: "external-rotation",
    he: "רוטציה לטרלית",
    en: "External (lateral) rotation",
    plane: "horizontal",
    note: "Spin outward around the long axis · סיבוב החוצה סביב ציר האורך",
  },
  {
    id: "horizontal-abduction",
    he: "הרחקה אופקית",
    en: "Horizontal abduction",
    plane: "horizontal",
    note: "Shoulder, arm at 90° · בכתף, זרוע מורמת ל־90°",
  },
  {
    id: "horizontal-adduction",
    he: "קרוב אופקי",
    en: "Horizontal adduction",
    plane: "horizontal",
    note: "Shoulder, arm at 90° · בכתף, זרוע מורמת ל־90°",
  },
  { id: "pronation", he: "פרונציה", en: "Pronation", plane: "horizontal", note: "Forearm: palm back · אמה: גב כף היד קדימה" },
  { id: "supination", he: "סופינציה", en: "Supination", plane: "horizontal", note: "Forearm: palm forward · אמה: כף היד קדימה" },
  { id: "protraction", he: "הרחקת שכמות", en: "Protraction", plane: "horizontal", note: "Scapula forward on the ribcage · שכמה קדימה על בית החזה" },
  { id: "retraction", he: "קרוב שכמות", en: "Retraction", plane: "horizontal", note: "Scapula back toward the spine · שכמה אחורה לעמוד השדרה" },
  { id: "stabilize", he: "ייצוב", en: "Stabilization", plane: null, note: "Not a single-plane movement · לא תנועה במישור אחד" },
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
