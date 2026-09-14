import type { ActionId } from "./planes";
import type { RegionId } from "./regions";

export type MusclePart = {
  id: string;
  nameEn: string;
  nameHe: string;
  sideEn: string;
  sideHe: string;
  originEn: string;
  originHe: string;
  /** Signature moves of this part (on top of the shared job). */
  actions: ActionId[];
  extraEn?: string;
  extraHe?: string;
  whyEn: string;
  whyHe: string;
  /** True when this head starts proximal enough to cross an extra joint. */
  extraJoint?: boolean;
  /** Quiz-only moves that may also be the shared job (e.g. middle deltoid = prime abductor). */
  quizActions?: ActionId[];
};

export type SplitMuscle = {
  id: string;
  region: RegionId;
  nameEn: string;
  nameHe: string;
  kindEn: string;
  kindHe: string;
  ruleEn: string;
  ruleHe: string;
  sharedInsertionEn: string;
  sharedInsertionHe: string;
  sharedActionEn: string;
  sharedActionHe: string;
  sharedActions: ActionId[];
  parts: MusclePart[];
  noteEn?: string;
  noteHe?: string;
};

export const MUSCLE_PARTS: SplitMuscle[] = [
  {
    id: "deltoid",
    region: "shoulder",
    nameEn: "Deltoid",
    nameHe: "דלתואיד",
    kindEn: "3 parts",
    kindHe: "שלושה חלקים",
    ruleEn:
      "CAS origin: Clavicle = front, Acromion = side, Spine = back. The side of the origin is the direction of pull.",
    ruleHe:
      "CAS: Clavicle = קדמי, Acromion = אמצעי, Spine = אחורי. הצד של ה-origin הוא כיוון המשיכה.",
    sharedInsertionEn: "Deltoid tuberosity of the humerus",
    sharedInsertionHe: "גבשון הדלתואיד בהומרוס",
    sharedActionEn: "All three abduct the shoulder.",
    sharedActionHe: "כל שלושת החלקים מרחיקים כתף.",
    sharedActions: ["abduction"],
    parts: [
      {
        id: "anterior",
        nameEn: "Anterior",
        nameHe: "קדמי",
        sideEn: "Front",
        sideHe: "מקדימה",
        originEn: "Lateral third of the clavicle",
        originHe: "שליש לטרלי של עצם הבריח",
        actions: ["flexion", "horizontal-adduction", "internal-rotation"],
        extraEn: "Front raise, pec-deck helper, some IR.",
        extraHe: "כפיפה, קרוב אופקי, סיוע ב-IR.",
        whyEn: "Starts on the clavicle, in front. Pulls the arm forward — a mini pec.",
        whyHe: "מתחיל בבריח, מקדימה. מושך את הזרוע לפנים — כמו פק מזערי.",
      },
      {
        id: "middle",
        nameEn: "Middle",
        nameHe: "אמצעי",
        sideEn: "Side",
        sideHe: "מהצד",
        originEn: "Acromion of the scapula",
        originHe: "האקרומיון של השכמה",
        actions: ["abduction"],
        quizActions: ["abduction"],
        extraEn: "The prime abductor once supraspinatus has started the lift.",
        extraHe: "מרחיק הכתף העיקרי אחרי שהעל-קוצי מתחיל.",
        whyEn: "Starts on the acromion, on the side. Shortens straight outward — abduction.",
        whyHe: "מתחיל באקרומיון, בצד. מתקצר ישר החוצה — הרחקה.",
      },
      {
        id: "posterior",
        nameEn: "Posterior",
        nameHe: "אחורי",
        sideEn: "Back",
        sideHe: "מאחור",
        originEn: "Spine of the scapula",
        originHe: "קוץ השכמה",
        actions: ["extension", "horizontal-abduction", "external-rotation"],
        extraEn: "Reverse fly, some ER.",
        extraHe: "פשיטה, הרחקה אופקית, סיוע ב-ER.",
        whyEn: "Starts on the scapular spine, behind. Pulls the arm back — a mini lat.",
        whyHe: "מתחיל בקוץ השכמה, מאחור. מושך את הזרוע אחורה — כמו לאט מזערי.",
      },
    ],
    noteEn: "Trapezius inserts on the same three CAS points that deltoid starts from — they handshake.",
    noteHe: "הטרפז נאחז באותן שלוש נקודות CAS שהדלתואיד מתחיל מהן — לחיצת יד.",
  },
  {
    id: "biceps-brachii",
    region: "arm",
    nameEn: "Biceps brachii",
    nameHe: "דו-ראשי זרועי",
    kindEn: "2 heads",
    kindHe: "שני ראשים",
    ruleEn:
      "Both start on the scapula and finish on the radius — so both flex the elbow and supinate. Long = above the socket. Short = the crow (coracoid).",
    ruleHe:
      "שניהם מהשכמה אל הרדיוס — לכן שניהם כופפים מרפק וסופינטים. ארוך = מעל השקע. קצר = העורב (coracoid).",
    sharedInsertionEn: "Radial tuberosity and bicipital aponeurosis",
    sharedInsertionHe: "גבשון הרדיוס ואפונוירוזה דו-ראשית",
    sharedActionEn: "Elbow flexion and supination.",
    sharedActionHe: "כפיפת מרפק וסופינציה.",
    sharedActions: ["flexion", "supination"],
    parts: [
      {
        id: "long",
        nameEn: "Long head",
        nameHe: "ראש ארוך",
        sideEn: "Above the socket",
        sideHe: "מעל ה-glenoid",
        originEn: "Supraglenoid tubercle of the scapula",
        originHe: "גבשון על-גלנואידי של השכמה",
        actions: ["abduction"],
        extraEn: "Helps flex the shoulder. Can abduct when the arm is in external rotation.",
        extraHe: "מסייע בכפיפת כתף. יכול להרחיק כתף כשהזרוע ברוטציה לטרלית.",
        extraJoint: true,
        whyEn: "Supra = above the glenoid. The tendon runs in the bicipital groove, so it also helps at the shoulder.",
        whyHe: "Supra = מעל ה-glenoid. הגיד רץ בתלם הבין-גבשוני, לכן גם עוזר בכתף.",
      },
      {
        id: "short",
        nameEn: "Short head",
        nameHe: "ראש קצר",
        sideEn: "Coracoid (PCB)",
        sideHe: "עורב (PCB)",
        originEn: "Coracoid process of the scapula",
        originHe: "מקור העורב (coracoid) של השכמה",
        actions: [],
        extraEn: "The main biceps helper for shoulder flexion (parks with coracobrachialis).",
        extraHe: "העוזר העיקרי של הדו-ראשי בכפיפת כתף (חונה עם coracobrachialis).",
        extraJoint: true,
        whyEn: "The crow holds PCB: Pec minor, Coracobrachialis, Biceps short head. Front-medial pull = shoulder flexion.",
        whyHe: "העורב מחזיק PCB: Pec minor, Coracobrachialis, הראש הקצר. משיכה קדמית-מדיאלית = כפיפת כתף.",
      },
    ],
    noteEn:
      "Socket sandwich: biceps long sits ABOVE the glenoid (supra). Triceps long sits BELOW it (infra). That is why biceps long can help lift the arm, and triceps long can help pull it back.",
    noteHe:
      "כריך השקע: הראש הארוך של הביצפס יושב מעל ה-glenoid (supra). הראש הארוך של התלת-ראשי יושב מתחתיו (infra). לכן ביצפס ארוך עוזר להרים, ותלת-ראשי ארוך עוזר למשוך אחורה.",
  },
  {
    id: "triceps-brachii",
    region: "arm",
    nameEn: "Triceps brachii",
    nameHe: "תלת-ראשי זרועי",
    kindEn: "3 heads",
    kindHe: "שלושה ראשים",
    ruleEn:
      "Three heads, one finish (olecranon). Only the long head starts on the scapula — so only the long head also moves the shoulder. The other two start on the humerus: elbow only.",
    ruleHe:
      "שלושה ראשים, סיום אחד (אולקרנון). רק הראש הארוך מתחיל בשכמה — לכן רק הוא גם מזיז כתף. השניים האחרים מההומרוס: מרפק בלבד.",
    sharedInsertionEn: "Olecranon of the ulna",
    sharedInsertionHe: "האולקרנון של האולנה",
    sharedActionEn: "All three extend the elbow.",
    sharedActionHe: "כל שלושת הראשים פושטים מרפק.",
    sharedActions: ["extension"],
    parts: [
      {
        id: "long",
        nameEn: "Long head",
        nameHe: "ראש ארוך",
        sideEn: "Below the socket",
        sideHe: "מתחת ל-glenoid",
        originEn: "Infraglenoid tubercle of the scapula",
        originHe: "גבשון תת-גלנואידי של השכמה",
        actions: ["extension", "adduction"],
        extraEn: "Also extends and adducts the shoulder — the only head that crosses it.",
        extraHe: "גם פשיטת כתף וקרוב — הראש היחיד שחוצה את הכתף.",
        extraJoint: true,
        whyEn: "Infra = below the glenoid. Starts on the scapula, so shortening also pulls the humerus back.",
        whyHe: "Infra = מתחת ל-glenoid. מתחיל בשכמה, אז קיצור גם מושך את ההומרוס אחורה.",
      },
      {
        id: "lateral",
        nameEn: "Lateral head",
        nameHe: "ראש לטרלי",
        sideEn: "Humerus, above the groove",
        sideHe: "הומרוס, מעל התלם",
        originEn: "Posterior humerus, above the radial groove",
        originHe: "הומרוס אחורי, מעל התלם הרדיאלי",
        actions: [],
        extraEn: "Elbow only. The powerful, more superficial head.",
        extraHe: "מרפק בלבד. הראש החזק והשטחי יותר.",
        whyEn: "Starts on the humerus, so it cannot reach the shoulder. Behind the elbow to the olecranon = extension.",
        whyHe: "מתחיל בהומרוס — לא מגיע לכתף. מאחורי המרפק אל האולקרנון = פשיטה.",
      },
      {
        id: "medial",
        nameEn: "Medial head",
        nameHe: "ראש מדיאלי",
        sideEn: "Humerus, below the groove",
        sideHe: "הומרוס, מתחת לתלם",
        originEn: "Posterior humerus, below the radial groove (deep)",
        originHe: "הומרוס אחורי, מתחת לתלם הרדיאלי (עמוק)",
        actions: [],
        extraEn: "Elbow only. The deep workhorse that stays on even in light extension.",
        extraHe: "מרפק בלבד. העובד העמוק שנשאר דולק גם בפשיטה קלה.",
        whyEn: "Same rule as the lateral head: humerus origin → elbow only. Deep to the lateral head.",
        whyHe: "אותו כלל כמו הלטרלי: origin בהומרוס → מרפק בלבד. עמוק ללטרלי.",
      },
    ],
    noteEn: "Exam favourite: long head of triceps = shoulder extension (and adduction). Lateral and medial do not.",
    noteHe: "אהוב על המבחן: ראש ארוך של תלת-ראשי = פשיטת כתף (וגם קרוב). לטרלי ומדיאלי לא.",
  },
  {
    id: "pectoralis-major",
    region: "shoulder",
    nameEn: "Pectoralis major",
    nameHe: "חזה גדול",
    kindEn: "2 heads",
    kindHe: "שני ראשים",
    ruleEn:
      "Same insertion, two start lines. Clavicular is higher → can flex. Sternal is lower → can extend the arm back from a flexed position.",
    ruleHe:
      "אותו סיום, שתי קווי התחלה. בריחי גבוה יותר → יכול לכופף. סטרנלי נמוך יותר → יכול לפשוט ממצב כפיפה.",
    sharedInsertionEn: "Lateral lip of the intertubercular groove",
    sharedInsertionHe: "שפה לטרלית של התלם הבין-גבשוני",
    sharedActionEn: "Horizontal adduction, adduction, internal rotation.",
    sharedActionHe: "קרוב אופקי, קרוב, ורוטציה מדיאלית.",
    sharedActions: ["horizontal-adduction", "adduction", "internal-rotation"],
    parts: [
      {
        id: "clavicular",
        nameEn: "Clavicular head",
        nameHe: "ראש בריחי",
        sideEn: "Upper chest",
        sideHe: "חזה עליון",
        originEn: "Medial two-thirds of the clavicle",
        originHe: "שני שליש מדיאליים של עצם הבריח",
        actions: ["flexion"],
        extraEn: "The upper pec: also flexes the shoulder.",
        extraHe: "הפק העליון: גם כופף כתף.",
        whyEn: "Higher origin, so the pull has an upward-forward component = flexion.",
        whyHe: "origin גבוה יותר, אז למשיכה יש רכיב קדימה-מעלה = כפיפה.",
      },
      {
        id: "sternal",
        nameEn: "Sternal head",
        nameHe: "ראש סטרנלי",
        sideEn: "Lower chest",
        sideHe: "חזה תחתון",
        originEn: "Sternum and costal cartilages 1–6",
        originHe: "עצם החזה וסחוסי צלעות 1–6",
        actions: ["extension"],
        extraEn: "Extends the shoulder from a flexed position (bring the arm down / back).",
        extraHe: "פושט כתף ממצב כפיפה (מוריד / מחזיר את הזרוע).",
        whyEn: "Lower origin, so from an overhead or flexed arm it pulls down into extension.",
        whyHe: "origin נמוך יותר, אז מזרוע מורמת הוא מושך מטה לפשיטה.",
      },
    ],
  },
  {
    id: "trapezius",
    region: "shoulder-girdle",
    nameEn: "Trapezius",
    nameHe: "טרפז",
    kindEn: "3 parts",
    kindHe: "שלושה חלקים",
    ruleEn:
      "Upper lifts, middle pinches, lower depresses. Upper + lower together upwardly rotate the scapula so the arm can go overhead.",
    ruleHe:
      "עליון מרים, אמצעי מקרב שכמות, תחתון מוריד. עליון+תחתון יחד מסובבים את השכמה מעלה כדי שהזרוע תעלה מעל הראש.",
    sharedInsertionEn: "Lateral third of clavicle, acromion, spine of scapula (CAS)",
    sharedInsertionHe: "שליש לטרלי של הבריח, אקרומיון, קוץ השכמה (CAS)",
    sharedActionEn: "All parts retract the scapula.",
    sharedActionHe: "כל החלקים מקרבים שכמות (retraction).",
    sharedActions: ["retraction"],
    parts: [
      {
        id: "upper",
        nameEn: "Upper",
        nameHe: "עליון",
        sideEn: "Neck / shoulder line",
        sideHe: "קו צוואר–כתף",
        originEn: "Occiput, nuchal ligament, C7",
        originHe: "עורף, רצועת העורף, C7",
        actions: ["elevation", "upward-rotation"],
        extraEn: "Shrugs and helps tilt the glenoid up.",
        extraHe: "הרמה וסיוע בסיבוב מעלה של השכמה.",
        whyEn: "Fibers run down toward CAS, so shortening lifts the scapula.",
        whyHe: "הסיבים יורדים אל CAS, אז קיצור מרים את השכמה.",
      },
      {
        id: "middle",
        nameEn: "Middle",
        nameHe: "אמצעי",
        sideEn: "Across the upper back",
        sideHe: "לרוחב הגב העליון",
        originEn: "Spinous processes around T1–T5",
        originHe: "זיזים קוציים באזור T1–T5",
        actions: ["retraction"],
        quizActions: ["retraction"],
        extraEn: "The pure retractor — squeeze the shoulder blades.",
        extraHe: "מקרב השכמות הטהור — סוחטים שכמות.",
        whyEn: "Fibers run horizontally, so shortening pinches the scapulae together.",
        whyHe: "הסיבים אופקיים, אז קיצור מקרב את השכמות זו לזו.",
      },
      {
        id: "lower",
        nameEn: "Lower",
        nameHe: "תחתון",
        sideEn: "Down the thoracic spine",
        sideHe: "לאורך החזה",
        originEn: "Spinous processes around T6–T12",
        originHe: "זיזים קוציים באזור T6–T12",
        actions: ["depression", "upward-rotation"],
        extraEn: "Pulls the scapula down; pairs with upper trap for upward rotation.",
        extraHe: "מוריד את השכמה; צמד עם העליון לסיבוב מעלה.",
        whyEn: "Fibers run up toward the spine of the scapula, so shortening depresses it.",
        whyHe: "הסיבים עולים אל קוץ השכמה, אז קיצור מוריד אותה.",
      },
    ],
  },
  {
    id: "biceps-femoris",
    region: "thigh",
    nameEn: "Biceps femoris",
    nameHe: "דו-ראשי ירכי",
    kindEn: "2 heads",
    kindHe: "שני ראשים",
    ruleEn:
      "Same rule as triceps: the long head starts on the pelvis, so it also moves the hip. The short head starts on the femur, so it is knee only.",
    ruleHe:
      "אותו כלל כמו התלת-ראשי: הראש הארוך מהאגן, לכן גם מזיז ירך. הראש הקצר מהפמור, לכן ברך בלבד.",
    sharedInsertionEn: "Head of the fibula",
    sharedInsertionHe: "ראש הפיבולה",
    sharedActionEn: "Both flex the knee (and externally rotate it when flexed).",
    sharedActionHe: "שניהם כופפים ברך (ומסובבים אותה לטרלית כשהיא כפופה).",
    sharedActions: ["flexion", "external-rotation"],
    parts: [
      {
        id: "long",
        nameEn: "Long head",
        nameHe: "ראש ארוך",
        sideEn: "Ischial tuberosity",
        sideHe: "ישבן",
        originEn: "Ischial tuberosity",
        originHe: "גבשון השת (ischial tuberosity)",
        actions: ["extension", "posterior-tilt"],
        extraEn: "Also hip extension and posterior pelvic tilt (P.P.T). True hamstring.",
        extraHe: "גם פשיטת ירך וגלגול אגן לאחור (P.P.T). המסטרינג אמיתי.",
        extraJoint: true,
        whyEn: "Starts on the sit-bone, so it crosses hip and knee. Same parking spot as the other hamstrings.",
        whyHe: "מתחיל בעצם הישיבה, אז חוצה ירך וברך. אותה חניה כמו שאר ההמסטרינג.",
      },
      {
        id: "short",
        nameEn: "Short head",
        nameHe: "ראש קצר",
        sideEn: "Femur only",
        sideHe: "פמור בלבד",
        originEn: "Lateral linea aspera of the femur",
        originHe: "linea aspera לטרלית של עצם הירך",
        actions: [],
        extraEn: "Knee only — it never crosses the hip, so it is not a true hamstring.",
        extraHe: "ברך בלבד — לא חוצה ירך, לכן אינו המסטרינג אמיתי.",
        whyEn: "Starts on the femur, distal to the hip. Same story as the lateral/medial triceps heads.",
        whyHe: "מתחיל בפמור, דיסטלית לירך. אותו סיפור כמו הראשים הלטרלי והמדיאלי של התלת-ראשי.",
      },
    ],
    noteEn: "Lateral hamstring. The two semis (medial) internally rotate the knee; biceps femoris externally rotates it.",
    noteHe: "ההמסטרינג הלטרלי. שני ה-semi (מדיאליים) מסובבים ברך פנימה; הדו-ראשי הירכי מסובב החוצה.",
  },
  {
    id: "adductor-magnus",
    region: "hip",
    nameEn: "Adductor magnus",
    nameHe: "מקרב גדול",
    kindEn: "2 heads",
    kindHe: "שני ראשים",
    ruleEn:
      "One muscle, two personalities. Anterior adductor part flexes. Posterior hamstring part extends. Both adduct.",
    ruleHe:
      "שריר אחד, שני אופיים. החלק הקדמי (מקרב) כופף. החלק האחורי (המסטרינג) פושט. שניהם מקרבים.",
    sharedInsertionEn: "Linea aspera and adductor tubercle of the femur",
    sharedInsertionHe: "linea aspera ו-adductor tubercle בירך",
    sharedActionEn: "Both heads adduct the hip.",
    sharedActionHe: "שני הראשים מקרבים ירך.",
    sharedActions: ["adduction"],
    parts: [
      {
        id: "anterior",
        nameEn: "Anterior (adductor) head",
        nameHe: "ראש קדמי (מקרב)",
        sideEn: "Pubis",
        sideHe: "חיק",
        originEn: "Pubic ramus",
        originHe: "ענף החיק",
        actions: ["flexion"],
        extraEn: "Adducts and helps flex the hip.",
        extraHe: "מקרב ומסייע בכפיפת ירך.",
        whyEn: "More anterior origin → a flexion component on top of adduction.",
        whyHe: "origin קדמי יותר → רכיב כפיפה מעל הקרוב.",
      },
      {
        id: "posterior",
        nameEn: "Posterior (hamstring) head",
        nameHe: "ראש אחורי (המסטרינג)",
        sideEn: "Ischial tuberosity",
        sideHe: "ישבן",
        originEn: "Ischial tuberosity",
        originHe: "גבשון השת (ischial tuberosity)",
        actions: ["extension"],
        extraEn: "The hamstring part: adducts and extends the hip.",
        extraHe: "חלק המסטרינג: מקרב ופושט ירך.",
        extraJoint: true,
        whyEn: "Same sit-bone start as the hamstrings, so it can extend the hip too.",
        whyHe: "אותה עצם ישיבה כמו ההמסטרינג, לכן גם פושט ירך.",
      },
    ],
  },
];

export function splitByMuscleId(id: string): SplitMuscle | undefined {
  return MUSCLE_PARTS.find((m) => m.id === id);
}

export function splitsForRegion(region: RegionId | "all"): SplitMuscle[] {
  if (region === "all") return MUSCLE_PARTS;
  return MUSCLE_PARTS.filter((m) => m.region === region);
}

export function searchSplits(query: string, list: SplitMuscle[] = MUSCLE_PARTS): SplitMuscle[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter((m) => {
    const blob = [
      m.nameEn,
      m.nameHe,
      m.kindEn,
      m.kindHe,
      m.ruleEn,
      m.ruleHe,
      m.sharedInsertionEn,
      m.sharedInsertionHe,
      m.noteEn ?? "",
      m.noteHe ?? "",
      ...m.parts.flatMap((p) => [
        p.nameEn,
        p.nameHe,
        p.sideEn,
        p.sideHe,
        p.originEn,
        p.originHe,
        p.extraEn ?? "",
        p.extraHe ?? "",
        p.whyEn,
        p.whyHe,
      ]),
    ]
      .join(" ")
      .toLowerCase();
    return blob.includes(q);
  });
}

export function partLabel(muscle: SplitMuscle, part: MusclePart) {
  return `${part.nameEn} of ${muscle.nameEn} · ${part.nameHe} של ${muscle.nameHe}`;
}

export function originLabel(part: MusclePart) {
  return `${part.originEn} · ${part.originHe}`;
}
