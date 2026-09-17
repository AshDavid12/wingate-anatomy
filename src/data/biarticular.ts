import type { ActionId } from "./planes";
import type { JointTag } from "./muscle-tags";
import type { RegionId } from "./regions";
import { muscles } from "./muscles";

export type BiarticularAt = {
  joint: JointTag;
  actions: ActionId[];
};

export type BiarticularMuscle = {
  muscleId: string;
  /** When only one head crosses both joints. */
  headEn?: string;
  headHe?: string;
  at: BiarticularAt[];
  noteHe?: string;
  noteEn?: string;
  extra?: boolean;
};

export type BiarticularLookalike = {
  nameEn: string;
  nameHe: string;
  whyEn: string;
  whyHe: string;
};

export type BiarticularGroup = {
  id: string;
  regions: RegionId[];
  pairEn: string;
  pairHe: string;
  ruleEn: string;
  ruleHe: string;
  muscles: BiarticularMuscle[];
  lookalikes: BiarticularLookalike[];
};

export const BIARTICULAR_GROUPS: BiarticularGroup[] = [
  {
    id: "gh-elbow",
    regions: ["arm", "shoulder"],
    pairEn: "Shoulder + elbow",
    pairHe: "כתף + מרפק",
    ruleEn:
      "Starts on the scapula, finishes past the elbow. Only that path crosses both joints.",
    ruleHe:
      "מתחיל בשכמה ומסתיים אחרי המרפק. רק המסלול הזה חוצה את שני המפרקים.",
    muscles: [
      {
        muscleId: "biceps-brachii",
        at: [
          { joint: "gh", actions: ["flexion"] },
          { joint: "elbow", actions: ["flexion"] },
          { joint: "ru", actions: ["supination"] },
        ],
        noteHe: "שני הראשים מהשכמה אל הרדיוס — שניהם דו-מפרקיים. גם סופינציה.",
        noteEn: "Both heads start on the scapula and finish on the radius — both are biarticular. Also supinates.",
      },
      {
        muscleId: "triceps-brachii",
        headEn: "Long head",
        headHe: "ראש ארוך",
        at: [
          { joint: "gh", actions: ["extension"] },
          { joint: "elbow", actions: ["extension"] },
        ],
        noteHe: "רק הראש הארוך מתחיל בשכמה (תת-גלנואיד). הלטרלי והמדיאלי מההומרוס — מרפק בלבד.",
        noteEn: "Only the long head starts on the scapula (infraglenoid). Lateral and medial heads start on the humerus — elbow only.",
      },
    ],
    lookalikes: [
      {
        nameEn: "Brachialis",
        nameHe: "שריר הזרוע",
        whyEn: "Humerus → ulna. Elbow only.",
        whyHe: "הומרוס → אולנה. מרפק בלבד.",
      },
      {
        nameEn: "Triceps, lateral & medial heads",
        nameHe: "תלת-ראשי, ראשים לטרלי ומדיאלי",
        whyEn: "Start on the humerus, distal to the shoulder.",
        whyHe: "מתחילים בהומרוס, דיסטלית לכתף.",
      },
      {
        nameEn: "Coracobrachialis",
        nameHe: "מקור-זרועי",
        whyEn: "Scapula → humerus. Shoulder only — it never reaches the elbow.",
        whyHe: "שכמה → הומרוס. כתף בלבד — לא מגיע למרפק.",
      },
    ],
  },
  {
    id: "hip-knee",
    regions: ["hip", "thigh"],
    pairEn: "Hip + knee",
    pairHe: "ירך + ברך",
    ruleEn:
      "Pelvis (or lumbar spine) to tibia/fibula. If it starts on the femur it cannot move the hip.",
    ruleHe:
      "אגן (או מותן) אל טיביה/פיבולה. אם הוא מתחיל בפמור — הוא לא מזיז ירך.",
    muscles: [
      {
        muscleId: "rectus-femoris",
        at: [
          { joint: "hip", actions: ["flexion"] },
          { joint: "knee", actions: ["extension"] },
        ],
        noteHe: "הראש היחיד בארבע-ראשי שחוצה ירך. שלושת ה-vastus — ברך בלבד.",
        noteEn: "The only quadriceps head that crosses the hip. The three vasti are knee only.",
      },
      {
        muscleId: "sartorius",
        at: [
          { joint: "hip", actions: ["flexion", "abduction", "external-rotation"] },
          { joint: "knee", actions: ["flexion"] },
        ],
        noteHe: "ASIS → pes anserinus. תנוחת החייט בשני המפרקים.",
        noteEn: "ASIS → pes anserinus. Tailor sitting at both joints.",
      },
      {
        muscleId: "gracilis",
        at: [
          { joint: "hip", actions: ["adduction", "flexion"] },
          { joint: "knee", actions: ["flexion"] },
        ],
        noteHe: "המקרב היחיד שממשיך מעבר לברך (גם הוא ב-pes anserinus).",
        noteEn: "The only adductor that continues past the knee (also pes anserinus).",
      },
      {
        muscleId: "semitendinosus",
        at: [
          { joint: "hip", actions: ["extension"] },
          { joint: "knee", actions: ["flexion", "internal-rotation"] },
        ],
      },
      {
        muscleId: "semimembranosus",
        at: [
          { joint: "hip", actions: ["extension"] },
          { joint: "knee", actions: ["flexion", "internal-rotation"] },
        ],
      },
      {
        muscleId: "biceps-femoris",
        headEn: "Long head",
        headHe: "ראש ארוך",
        at: [
          { joint: "hip", actions: ["extension"] },
          { joint: "knee", actions: ["flexion", "external-rotation"] },
        ],
        noteHe: "רק הראש הארוך מהישבן. הראש הקצר מהפמור — ברך בלבד, אינו המסטרינג אמיתי.",
        noteEn: "Only the long head starts on the sit-bone. The short head starts on the femur — knee only, not a true hamstring.",
      },
      {
        muscleId: "tfl",
        at: [
          { joint: "hip", actions: ["flexion", "abduction", "internal-rotation"] },
          { joint: "knee", actions: ["stabilize"] },
        ],
        noteHe: "נאחז בטיביה דרך ה-ITB (גבשון גרדי) — מייצב ברך מלטרלית.",
        noteEn: "Reaches the tibia via the ITB (Gerdy's tubercle) — lateral knee stabilizer.",
      },
    ],
    lookalikes: [
      {
        nameEn: "Vastus lateralis / medialis / intermedius",
        nameHe: "נרחב לטרלי / מדיאלי / ביניים",
        whyEn: "Start on the femur. Knee extension only.",
        whyHe: "מתחילים בפמור. פשיטת ברך בלבד.",
      },
      {
        nameEn: "Biceps femoris, short head",
        nameHe: "דו-ראשי ירכי, ראש קצר",
        whyEn: "Starts on the linea aspera — distal to the hip.",
        whyHe: "מתחיל ב-linea aspera — דיסטלית לירך.",
      },
      {
        nameEn: "Iliacus",
        nameHe: "כסל",
        whyEn: "Iliac fossa → lesser trochanter. Hip only (psoas is the one that also crosses the lumbar spine).",
        whyHe: "גומה כסלית → טרוכנטר קטן. ירך בלבד (הפסואס הוא זה שגם חוצה מותן).",
      },
    ],
  },
  {
    id: "knee-ankle",
    regions: ["leg", "thigh"],
    pairEn: "Knee + ankle",
    pairHe: "ברך + קרסול",
    ruleEn:
      "Starts on the femur, finishes on the calcaneus. Soleus starts below the knee, so ankle only.",
    ruleHe:
      "מתחיל בפמור ומסתיים בעקב. הסוליה מתחילה מתחת לברך — קרסול בלבד.",
    muscles: [
      {
        muscleId: "gastrocnemius",
        at: [
          { joint: "knee", actions: ["flexion"] },
          { joint: "ankle", actions: ["plantarflexion"] },
        ],
        noteHe: "חלש יותר בפלנטרפלקשן כשהברך כפופה — אז הסוליה עושה את העבודה.",
        noteEn: "Weaker at plantar flexion when the knee is bent — then soleus does the work.",
      },
      {
        muscleId: "plantaris",
        extra: true,
        at: [
          { joint: "knee", actions: ["flexion"] },
          { joint: "ankle", actions: ["plantarflexion"] },
        ],
        noteHe: "עוזר חלש. לעיתים חסר.",
        noteEn: "A weak helper. Often absent.",
      },
    ],
    lookalikes: [
      {
        nameEn: "Soleus",
        nameHe: "סוליה",
        whyEn: "Starts on tibia + fibula, distal to the knee. The standing plantar-flexor.",
        whyHe: "מתחיל בטיביה + פיבולה, דיסטלית לברך. פושט הקרסול של העמידה.",
      },
    ],
  },
  {
    id: "spine-hip",
    regions: ["hip", "neck-trunk"],
    pairEn: "Lumbar spine + hip",
    pairHe: "מותן + ירך",
    ruleEn: "From lumbar vertebrae past the hip to the lesser trochanter.",
    ruleHe: "מחוליית המותן, חוצה את הירך, אל הטרוכנטר הקטן.",
    muscles: [
      {
        muscleId: "psoas-major",
        at: [
          { joint: "spine", actions: ["flexion"] },
          { joint: "hip", actions: ["flexion", "anterior-tilt"] },
        ],
        noteHe: "האיליאקוס שותף באיליופסואס אבל מתחיל באגן — ירך בלבד.",
        noteEn: "Iliacus shares iliopsoas but starts on the pelvis — hip only.",
      },
    ],
    lookalikes: [
      {
        nameEn: "Iliacus",
        nameHe: "כסל",
        whyEn: "Iliac fossa is already distal to the lumbar spine.",
        whyHe: "הגומה הכסלית כבר דיסטלית לעמוד השדרה המותני.",
      },
    ],
  },
  {
    id: "elbow-ru",
    regions: ["forearm", "arm"],
    pairEn: "Elbow + radioulnar",
    pairHe: "מרפק + רדיו–אולנרי",
    ruleEn: "Crosses the elbow and then turns the forearm.",
    ruleHe: "חוצה את המרפק ואז מסובב את האמה.",
    muscles: [
      {
        muscleId: "pronator-teres",
        extra: true,
        at: [
          { joint: "elbow", actions: ["flexion"] },
          { joint: "ru", actions: ["pronation"] },
        ],
        noteHe: "פרונטור עיקרי שגם מסייע בכפיפת מרפק. הפרונטור הרבוע — רדיו–אולנרי בלבד.",
        noteEn: "The prime pronator that also helps flex the elbow. Pronator quadratus is radioulnar only.",
      },
    ],
    lookalikes: [
      {
        nameEn: "Pronator quadratus",
        nameHe: "המסובב הרבוע",
        whyEn: "Distal radioulnar only — no elbow.",
        whyHe: "רדיו–אולנרי דיסטלי בלבד — בלי מרפק.",
      },
      {
        nameEn: "Supinator",
        nameHe: "הסופינטור",
        whyEn: "Turns the forearm; does not flex the elbow.",
        whyHe: "מסובב אמה; לא כופף מרפק.",
      },
    ],
  },
];

const BY_MUSCLE = new Map<string, BiarticularMuscle & { group: BiarticularGroup }>();
for (const group of BIARTICULAR_GROUPS) {
  for (const muscle of group.muscles) {
    BY_MUSCLE.set(muscle.muscleId, { ...muscle, group });
  }
}

export function biarticularOf(muscleId: string) {
  return BY_MUSCLE.get(muscleId);
}

export function isBiarticular(muscleId: string) {
  return BY_MUSCLE.has(muscleId);
}

export function biarticularGroupsForRegion(region: RegionId | "all") {
  if (region === "all") return BIARTICULAR_GROUPS;
  return BIARTICULAR_GROUPS.filter((g) => g.regions.includes(region));
}

export function searchBiarticularGroups(
  query: string,
  list: BiarticularGroup[] = BIARTICULAR_GROUPS,
): BiarticularGroup[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  const keys = [
    "biarticular",
    "bi-articular",
    "two-joint",
    "דו-מפרק",
    "דו מפרק",
    "דומפרק",
  ];
  if (keys.some((k) => k.includes(q) || q.includes(k))) return list;

  return list
    .map((group) => {
      const musclesMatch = group.muscles.filter((row) => {
        const m = muscles.find((x) => x.id === row.muscleId);
        return [
          group.pairEn,
          group.pairHe,
          group.ruleEn,
          group.ruleHe,
          row.headEn ?? "",
          row.headHe ?? "",
          row.noteEn ?? "",
          row.noteHe ?? "",
          m?.nameEn ?? "",
          m?.nameHe ?? "",
        ]
          .join(" ")
          .toLowerCase()
          .includes(q);
      });
      const headerHit = `${group.pairEn} ${group.pairHe} ${group.ruleEn} ${group.ruleHe}`
        .toLowerCase()
        .includes(q);
      if (headerHit) return group;
      if (musclesMatch.length === 0) return null;
      return { ...group, muscles: musclesMatch };
    })
    .filter((g): g is BiarticularGroup => g != null);
}

export const BIARTICULAR_COUNT = BIARTICULAR_GROUPS.reduce(
  (n, g) => n + g.muscles.length,
  0,
);
