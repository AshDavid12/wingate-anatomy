import type { ActionId } from "./planes";
import type { RegionId } from "./regions";
import { muscles } from "./muscles";

export type ActionMember = {
  /** App muscle ids when the name is in the booklet list. Empty for extra names. */
  muscleIds: string[];
  en: string;
  he: string;
  extra?: boolean;
};

export type ActionGroup = {
  id: string;
  region: RegionId;
  groupHe: string;
  groupEn: string;
  action: ActionId;
  prime: ActionMember[];
  accessory: ActionMember[];
  noteHe?: string;
  noteEn?: string;
};

const m = (
  muscleIds: string[],
  en: string,
  he: string,
  extra = false,
): ActionMember => ({ muscleIds, en, he, extra });

export const ACTION_GROUPS: ActionGroup[] = [
  // —— Hip (booklet table) ——
  {
    id: "hip-flexors",
    region: "hip",
    groupHe: "כופפי הירך",
    groupEn: "Hip flexors",
    action: "flexion",
    prime: [
      m(["psoas-major", "iliacus"], "Iliopsoas", "איליופסואס (מותן-כסל)"),
      m(["sartorius"], "Sartorius", "חייטים"),
      m(["tfl"], "Tensor fasciae latae", "מותח מחתלת הירך"),
      m(["rectus-femoris"], "Rectus femoris", "ישר הירך"),
      m(["adductor-longus"], "Adductor longus", "מקרב ארוך"),
      m(["pectineus"], "Pectineus", "המסרק"),
    ],
    accessory: [
      m(["adductor-brevis"], "Adductor brevis", "מקרב קצר"),
      m(["gracilis"], "Gracilis", "הדק"),
      m(["gluteus-minimus"], "Anterior part of gluteus minimus", "חלק קדמי של עכוז קטן"),
    ],
  },
  {
    id: "hip-extensors",
    region: "hip",
    groupHe: "פושטי הירך",
    groupEn: "Hip extensors",
    action: "extension",
    prime: [
      m(["gluteus-maximus"], "Gluteus maximus", "עכוז גדול"),
      m(["adductor-magnus"], "Adductor magnus (posterior head)", "מקרב גדול (ראש אחורי)"),
      m(["biceps-femoris"], "Biceps femoris (long head)", "דו-ראשי ירכי (ראש ארוך)"),
      m(["semitendinosus"], "Semitendinosus", "חצי-גידי"),
      m(["semimembranosus"], "Semimembranosus", "חצי-קרומי"),
    ],
    accessory: [
      m(["gluteus-medius"], "Gluteus medius (middle and posterior fibers)", "עכוז אמצעי (סיבים אמצעיים ואחוריים)"),
      m(["adductor-magnus"], "Adductor magnus (anterior head)", "מקרב גדול (ראש קדמי)"),
    ],
  },
  {
    id: "hip-adductors",
    region: "hip",
    groupHe: "מקרבי הירך",
    groupEn: "Hip adductors",
    action: "adduction",
    prime: [
      m(["pectineus"], "Pectineus", "המסרק"),
      m(["adductor-longus"], "Adductor longus", "מקרב ארוך"),
      m(["gracilis"], "Gracilis", "הדק"),
      m(["adductor-brevis"], "Adductor brevis", "מקרב קצר"),
      m(["adductor-magnus"], "Adductor magnus (anterior and posterior heads)", "מקרב גדול (ראש קדמי ואחורי)"),
    ],
    accessory: [
      m(["biceps-femoris"], "Biceps femoris (long head)", "דו-ראשי ירכי (ראש ארוך)"),
      m([], "Quadratus femoris", "ריבועי הירך", true),
      m([], "Obturator externus", "סותם חיצוני", true),
      m(["gluteus-maximus"], "Gluteus maximus (posterior fibers)", "עכוז גדול (סיבים אחוריים)"),
    ],
  },
  {
    id: "hip-abductors",
    region: "hip",
    groupHe: "מרחיקי הירך",
    groupEn: "Hip abductors",
    action: "abduction",
    prime: [
      m(["gluteus-medius"], "Gluteus medius (all fibers)", "עכוז אמצעי (כל הסיבים)"),
      m(["gluteus-minimus"], "Gluteus minimus (all fibers)", "עכוז קטן (כל הסיבים)"),
      m(["tfl"], "Tensor fasciae latae", "מותח מחתלת הירך"),
    ],
    accessory: [
      m(["rectus-femoris"], "Rectus femoris", "ישר הירך"),
      m(["piriformis"], "Piriformis", "האגסי"),
      m(["sartorius"], "Sartorius", "חייטים"),
    ],
    noteHe: "לעכוז האמצעי יותר מ־60% מכוח מרחיקי הירך הכולל.",
    noteEn: "Gluteus medius contributes more than 60% of all hip-abductor force.",
  },
  {
    id: "hip-er",
    region: "hip",
    groupHe: "רוטציה לטרלית של הירך",
    groupEn: "Hip external rotators",
    action: "external-rotation",
    prime: [
      m(["piriformis"], "Piriformis", "האגסי"),
      m(["gluteus-maximus"], "Gluteus maximus", "עכוז גדול"),
      m([], "Obturator internus", "סותם פנימי", true),
      m([], "Quadratus femoris", "ריבועי הירך", true),
    ],
    accessory: [
      m(["sartorius"], "Sartorius", "חייטים"),
      m(["gluteus-medius"], "Gluteus medius (posterior fibers)", "עכוז אמצעי (סיבים אחוריים)"),
      m(["iliacus", "psoas-major"], "Iliopsoas", "איליופסואס"),
      m(["biceps-femoris"], "Biceps femoris (long head)", "דו-ראשי ירכי (ראש ארוך)"),
      m([], "Obturator externus", "סותם חיצוני", true),
      m([], "Gemellus superior and inferior", "תאומים עליון ותחתון", true),
    ],
  },
  {
    id: "hip-ir",
    region: "hip",
    groupHe: "רוטציה מדיאלית של הירך",
    groupEn: "Hip internal rotators",
    action: "internal-rotation",
    prime: [
      m(["gluteus-minimus"], "Gluteus minimus", "עכוז קטן"),
      m(["gluteus-medius"], "Gluteus medius (anterior fibers)", "עכוז אמצעי (סיבים קדמיים)"),
      m(["tfl"], "Tensor fasciae latae", "מותח מחתלת הירך"),
    ],
    accessory: [
      m(["adductor-longus"], "Adductor longus", "מקרב ארוך"),
      m(["pectineus"], "Pectineus", "המסרק"),
      m(["adductor-magnus"], "Adductor magnus", "מקרב גדול"),
      m(["semitendinosus"], "Semitendinosus", "חצי-גידי"),
      m(["semimembranosus"], "Semimembranosus", "חצי-קרומי"),
    ],
  },

  // —— Knee ——
  {
    id: "knee-extensors",
    region: "thigh",
    groupHe: "פושטי הברך",
    groupEn: "Knee extensors",
    action: "extension",
    prime: [
      m(["rectus-femoris"], "Rectus femoris", "ישר הירך"),
      m(["vastus-lateralis"], "Vastus lateralis", "רחב לטרלי"),
      m(["vastus-medialis"], "Vastus medialis", "רחב מדיאלי"),
      m(["vastus-intermedius"], "Vastus intermedius", "רחב ביניים"),
    ],
    accessory: [
      m(["tfl"], "Tensor fasciae latae (via ITB)", "מותח מחתלת הירך (דרך ה-ITB)"),
    ],
    noteHe: "רק ישר הירך חוצה גם את הירך — לכן הוא גם כופף ירך.",
    noteEn: "Only rectus femoris also crosses the hip, so it flexes the hip too.",
  },
  {
    id: "knee-flexors",
    region: "thigh",
    groupHe: "כופפי הברך",
    groupEn: "Knee flexors",
    action: "flexion",
    prime: [
      m(["biceps-femoris"], "Biceps femoris", "דו-ראשי ירכי"),
      m(["semitendinosus"], "Semitendinosus", "חצי-גידי"),
      m(["semimembranosus"], "Semimembranosus", "חצי-קרומי"),
    ],
    accessory: [
      m(["gastrocnemius"], "Gastrocnemius", "תאומים"),
      m(["sartorius"], "Sartorius", "חייטים"),
      m(["gracilis"], "Gracilis", "הדק"),
      m(["plantaris"], "Plantaris", "כף-הרגל"),
    ],
  },
  {
    id: "knee-ir",
    region: "thigh",
    groupHe: "רוטציה מדיאלית של הברך",
    groupEn: "Knee internal rotators",
    action: "internal-rotation",
    prime: [
      m(["semitendinosus"], "Semitendinosus", "חצי-גידי"),
      m(["semimembranosus"], "Semimembranosus", "חצי-קרומי"),
    ],
    accessory: [
      m(["sartorius"], "Sartorius", "חייטים"),
      m(["gracilis"], "Gracilis", "הדק"),
      m([], "Popliteus", "שריר המיתר (פופליטאוס)", true),
    ],
    noteHe: "רוטציית ברך קיימת בעיקר כשהברך כפופה.",
    noteEn: "Knee rotation is available mainly once the knee is flexed.",
  },
  {
    id: "knee-er",
    region: "thigh",
    groupHe: "רוטציה לטרלית של הברך",
    groupEn: "Knee external rotators",
    action: "external-rotation",
    prime: [m(["biceps-femoris"], "Biceps femoris", "דו-ראשי ירכי")],
    accessory: [],
  },

  // —— Ankle / foot ——
  {
    id: "ankle-df",
    region: "leg",
    groupHe: "דורסיפלקסורים",
    groupEn: "Dorsiflexors",
    action: "dorsiflexion",
    prime: [m(["tibialis-anterior"], "Tibialis anterior", "שוקה קדמית")],
    accessory: [
      m(["extensor-hallucis-longus"], "Extensor hallucis longus", "פושט הבוהן הארוך"),
      m([], "Extensor digitorum longus", "פושט האצבעות הארוך", true),
    ],
  },
  {
    id: "ankle-pf",
    region: "leg",
    groupHe: "פלנטרפלקסורים",
    groupEn: "Plantar flexors",
    action: "plantarflexion",
    prime: [
      m(["gastrocnemius"], "Gastrocnemius", "תאומים"),
      m(["soleus"], "Soleus", "סוליה"),
    ],
    accessory: [
      m(["plantaris"], "Plantaris", "כף-הרגל"),
      m(["tibialis-posterior"], "Tibialis posterior", "שוקה אחורית"),
      m(["flexor-hallucis-longus"], "Flexor hallucis longus", "כופף הבוהן הארוך"),
      m(["fibularis-longus"], "Fibularis longus", "שוקית ארוכה"),
      m(["fibularis-brevis"], "Fibularis brevis", "שוקית קצרה"),
    ],
  },
  {
    id: "foot-inversion",
    region: "leg",
    groupHe: "הופכי כף הרגל",
    groupEn: "Invertors",
    action: "inversion",
    prime: [
      m(["tibialis-anterior"], "Tibialis anterior", "שוקה קדמית"),
      m(["tibialis-posterior"], "Tibialis posterior", "שוקה אחורית"),
    ],
    accessory: [
      m(["flexor-hallucis-longus"], "Flexor hallucis longus", "כופף הבוהן הארוך"),
      m(["extensor-hallucis-longus"], "Extensor hallucis longus", "פושט הבוהן הארוך"),
    ],
  },
  {
    id: "foot-eversion",
    region: "leg",
    groupHe: "אוורטורים",
    groupEn: "Evertors",
    action: "eversion",
    prime: [
      m(["fibularis-longus"], "Fibularis longus", "שוקית ארוכה"),
      m(["fibularis-brevis"], "Fibularis brevis", "שוקית קצרה"),
    ],
    accessory: [
      m([], "Extensor digitorum longus", "פושט האצבעות הארוך", true),
      m([], "Fibularis tertius", "שוקית שלישית", true),
    ],
  },

  // —— Shoulder girdle ——
  {
    id: "scap-elevators",
    region: "shoulder-girdle",
    groupHe: "מרים השכמה",
    groupEn: "Scapular elevators",
    action: "elevation",
    prime: [
      m(["trapezius"], "Trapezius (upper)", "טרפז (עליון)"),
      m(["levator-scapulae"], "Levator scapulae", "מרים השכמה"),
    ],
    accessory: [
      m(["rhomboid-major"], "Rhomboid major", "מעוין גדול"),
      m(["rhomboid-minor"], "Rhomboid minor", "מעוין קטן"),
    ],
  },
  {
    id: "scap-depressors",
    region: "shoulder-girdle",
    groupHe: "מורידי השכמה",
    groupEn: "Scapular depressors",
    action: "depression",
    prime: [
      m(["trapezius"], "Trapezius (lower)", "טרפז (תחתון)"),
      m(["pectoralis-minor"], "Pectoralis minor", "חזה קטן"),
    ],
    accessory: [m(["latissimus-dorsi"], "Latissimus dorsi", "רחב גבי")],
  },
  {
    id: "scap-retractors",
    region: "shoulder-girdle",
    groupHe: "מקרבי שכמות",
    groupEn: "Scapular retractors",
    action: "retraction",
    prime: [
      m(["trapezius"], "Trapezius (middle)", "טרפז (אמצעי)"),
      m(["rhomboid-major"], "Rhomboid major", "מעוין גדול"),
      m(["rhomboid-minor"], "Rhomboid minor", "מעוין קטן"),
    ],
    accessory: [m(["trapezius"], "Trapezius (upper + lower)", "טרפז (עליון + תחתון)")],
  },
  {
    id: "scap-protractors",
    region: "shoulder-girdle",
    groupHe: "מרחיקי שכמות",
    groupEn: "Scapular protractors",
    action: "protraction",
    prime: [m(["serratus-anterior"], "Serratus anterior", "המסור הקדמי")],
    accessory: [m(["pectoralis-minor"], "Pectoralis minor", "חזה קטן")],
  },
  {
    id: "scap-upward",
    region: "shoulder-girdle",
    groupHe: "מסובבי שכמה מעלה",
    groupEn: "Upward rotators",
    action: "upward-rotation",
    prime: [
      m(["trapezius"], "Trapezius (upper + lower)", "טרפז (עליון + תחתון)"),
      m(["serratus-anterior"], "Serratus anterior", "המסור הקדמי"),
    ],
    accessory: [m(["trapezius"], "Trapezius (middle)", "טרפז (אמצעי)")],
  },
  {
    id: "scap-downward",
    region: "shoulder-girdle",
    groupHe: "מסובבי שכמה מטה",
    groupEn: "Downward rotators",
    action: "downward-rotation",
    prime: [
      m(["levator-scapulae"], "Levator scapulae", "מרים השכמה"),
      m(["rhomboid-major", "rhomboid-minor"], "Rhomboids", "מעוינים"),
      m(["pectoralis-minor"], "Pectoralis minor", "חזה קטן"),
    ],
    accessory: [m(["latissimus-dorsi"], "Latissimus dorsi", "רחב גבי")],
  },

  // —— Glenohumeral ——
  {
    id: "gh-flexors",
    region: "shoulder",
    groupHe: "כופפי הכתף",
    groupEn: "Shoulder flexors",
    action: "flexion",
    prime: [
      m(["deltoid"], "Deltoid (anterior)", "דלתואיד (קדמי)"),
      m(["pectoralis-major"], "Pectoralis major (clavicular head)", "חזה גדול (ראש בריחי)"),
    ],
    accessory: [
      m(["coracobrachialis"], "Coracobrachialis", "מקור-זרועי"),
      m(["biceps-brachii"], "Biceps brachii", "דו-ראשי זרועי"),
    ],
  },
  {
    id: "gh-extensors",
    region: "shoulder",
    groupHe: "פושטי הכתף",
    groupEn: "Shoulder extensors",
    action: "extension",
    prime: [
      m(["latissimus-dorsi"], "Latissimus dorsi", "רחב גבי"),
      m(["teres-major"], "Teres major", "עגול גדול"),
      m(["deltoid"], "Deltoid (posterior)", "דלתואיד (אחורי)"),
    ],
    accessory: [
      m(["triceps-brachii"], "Triceps brachii (long head)", "תלת-ראשי (ראש ארוך)"),
      m(["pectoralis-major"], "Pectoralis major (sternal head, from flexion)", "חזה גדול (ראש סטרנלי, ממצב כפיפה)"),
    ],
  },
  {
    id: "gh-abductors",
    region: "shoulder",
    groupHe: "מרחיקי הכתף",
    groupEn: "Shoulder abductors",
    action: "abduction",
    prime: [
      m(["deltoid"], "Deltoid (middle)", "דלתואיד (אמצעי)"),
      m(["supraspinatus"], "Supraspinatus", "על-קוצי"),
    ],
    accessory: [
      m(["biceps-brachii"], "Biceps brachii (long head, in external rotation)", "דו-ראשי זרועי (ראש ארוך, ברוטציה לטרלית)"),
      m(["deltoid"], "Deltoid (anterior and posterior)", "דלתואיד (קדמי ואחורי)"),
    ],
    noteHe: "על-קוצי מתחיל את ההרחקה; דלתואיד לוקח משם.",
    noteEn: "Supraspinatus starts abduction; deltoid takes over.",
  },
  {
    id: "gh-adductors",
    region: "shoulder",
    groupHe: "מקרבי הכתף",
    groupEn: "Shoulder adductors",
    action: "adduction",
    prime: [
      m(["pectoralis-major"], "Pectoralis major", "חזה גדול"),
      m(["latissimus-dorsi"], "Latissimus dorsi", "רחב גבי"),
      m(["teres-major"], "Teres major", "עגול גדול"),
    ],
    accessory: [
      m(["coracobrachialis"], "Coracobrachialis", "מקור-זרועי"),
      m(["triceps-brachii"], "Triceps brachii (long head)", "תלת-ראשי (ראש ארוך)"),
      m(["teres-minor"], "Teres minor", "עגול קטן"),
    ],
  },
  {
    id: "gh-had",
    region: "shoulder",
    groupHe: "קרוב אופקי",
    groupEn: "Horizontal adductors",
    action: "horizontal-adduction",
    prime: [m(["pectoralis-major"], "Pectoralis major", "חזה גדול")],
    accessory: [
      m(["deltoid"], "Deltoid (anterior)", "דלתואיד (קדמי)"),
      m(["coracobrachialis"], "Coracobrachialis", "מקור-זרועי"),
    ],
  },
  {
    id: "gh-hab",
    region: "shoulder",
    groupHe: "הרחקה אופקית",
    groupEn: "Horizontal abductors",
    action: "horizontal-abduction",
    prime: [m(["deltoid"], "Deltoid (posterior)", "דלתואיד (אחורי)")],
    accessory: [
      m(["infraspinatus"], "Infraspinatus", "תת-קוצי"),
      m(["teres-minor"], "Teres minor", "עגול קטן"),
    ],
  },
  {
    id: "gh-ir",
    region: "shoulder",
    groupHe: "רוטציה מדיאלית של הכתף",
    groupEn: "Shoulder internal rotators",
    action: "internal-rotation",
    prime: [
      m(["subscapularis"], "Subscapularis", "תת-שכמתי"),
      m(["latissimus-dorsi"], "Latissimus dorsi", "רחב גבי"),
      m(["teres-major"], "Teres major", "עגול גדול"),
      m(["pectoralis-major"], "Pectoralis major", "חזה גדול"),
    ],
    accessory: [m(["deltoid"], "Deltoid (anterior)", "דלתואיד (קדמי)")],
  },
  {
    id: "gh-er",
    region: "shoulder",
    groupHe: "רוטציה לטרלית של הכתף",
    groupEn: "Shoulder external rotators",
    action: "external-rotation",
    prime: [
      m(["infraspinatus"], "Infraspinatus", "תת-קוצי"),
      m(["teres-minor"], "Teres minor", "עגול קטן"),
    ],
    accessory: [m(["deltoid"], "Deltoid (posterior)", "דלתואיד (אחורי)")],
  },
  {
    id: "gh-cuff",
    region: "shoulder",
    groupHe: "מייצבי הכתף (השרוול)",
    groupEn: "Rotator cuff",
    action: "stabilize",
    prime: [
      m(["supraspinatus"], "Supraspinatus", "על-קוצי"),
      m(["infraspinatus"], "Infraspinatus", "תת-קוצי"),
      m(["teres-minor"], "Teres minor", "עגול קטן"),
      m(["subscapularis"], "Subscapularis", "תת-שכמתי"),
    ],
    accessory: [],
    noteHe: "SITS: על-קוצי מרחיק, תת-קוצי ועגול קטן מסובבים לטרלית, תת-שכמתי מסובב מדיאלית.",
    noteEn: "SITS: supraspinatus abducts; infraspinatus and teres minor ER; subscapularis IR.",
  },

  // —— Elbow / RU ——
  {
    id: "elbow-flexors",
    region: "arm",
    groupHe: "כופפי המרפק",
    groupEn: "Elbow flexors",
    action: "flexion",
    prime: [
      m(["brachialis"], "Brachialis", "ברכיאליס"),
      m(["biceps-brachii"], "Biceps brachii", "דו-ראשי זרועי"),
      m(["brachioradialis"], "Brachioradialis", "ברכיורדיאליס"),
    ],
    accessory: [
      m(["pronator-teres"], "Pronator teres", "פרונטור עגול"),
      m(["flexor-carpi-radialis"], "Flexor carpi radialis", "כופף שורש חישורי"),
    ],
    noteHe: "ברכיאליס הוא כופף המרפק הטהור. דו-ראשי גם סופינטור.",
    noteEn: "Brachialis is the pure elbow flexor. Biceps also supinates.",
  },
  {
    id: "elbow-extensors",
    region: "arm",
    groupHe: "פושטי המרפק",
    groupEn: "Elbow extensors",
    action: "extension",
    prime: [m(["triceps-brachii"], "Triceps brachii", "תלת-ראשי זרועי")],
    accessory: [m(["anconeus"], "Anconeus", "שריר המרפק")],
  },
  {
    id: "ru-pronators",
    region: "forearm",
    groupHe: "פרונטורים",
    groupEn: "Pronators",
    action: "pronation",
    prime: [
      m(["pronator-quadratus"], "Pronator quadratus", "פרונטור ריבועי"),
      m(["pronator-teres"], "Pronator teres", "פרונטור עגול"),
    ],
    accessory: [
      m(["flexor-carpi-radialis"], "Flexor carpi radialis", "כופף שורש חישורי"),
      m(["brachioradialis"], "Brachioradialis (from supination)", "ברכיורדיאליס (ממצב סופינציה)"),
    ],
  },
  {
    id: "ru-supinators",
    region: "forearm",
    groupHe: "סופינטורים",
    groupEn: "Supinators",
    action: "supination",
    prime: [
      m(["biceps-brachii"], "Biceps brachii", "דו-ראשי זרועי"),
      m(["supinator"], "Supinator", "סופינטור"),
    ],
    accessory: [m(["brachioradialis"], "Brachioradialis (from pronation)", "ברכיורדיאליס (ממצב פרונציה)")],
  },

  // —— Wrist ——
  {
    id: "wrist-flexors",
    region: "forearm",
    groupHe: "כופפי שורש כף היד",
    groupEn: "Wrist flexors",
    action: "flexion",
    prime: [
      m(["flexor-carpi-radialis"], "Flexor carpi radialis", "כופף שורש חישורי"),
      m(["flexor-carpi-ulnaris"], "Flexor carpi ulnaris", "כופף שורש גומדי"),
      m(["flexor-digitorum-superficialis"], "Flexor digitorum superficialis", "כופף אצבעות שטחי"),
    ],
    accessory: [m(["palmaris-longus"], "Palmaris longus", "כפי פלמרי ארוך")],
  },
  {
    id: "wrist-extensors",
    region: "forearm",
    groupHe: "פושטי שורש כף היד",
    groupEn: "Wrist extensors",
    action: "extension",
    prime: [
      m(["extensor-carpi-radialis-longus"], "Extensor carpi radialis longus", "פושט שורש חישורי ארוך"),
      m(["extensor-carpi-radialis-brevis"], "Extensor carpi radialis brevis", "פושט שורש חישורי קצר"),
      m(["extensor-carpi-ulnaris"], "Extensor carpi ulnaris", "פושט שורש גומדי"),
    ],
    accessory: [m(["extensor-digitorum"], "Extensor digitorum", "פושט האצבעות")],
  },
  {
    id: "wrist-radial",
    region: "forearm",
    groupHe: "הטיה רדיאלית",
    groupEn: "Radial deviation",
    action: "abduction",
    prime: [
      m(["flexor-carpi-radialis"], "Flexor carpi radialis", "כופף שורש חישורי"),
      m(["extensor-carpi-radialis-longus"], "Extensor carpi radialis longus", "פושט שורש חישורי ארוך"),
      m(["extensor-carpi-radialis-brevis"], "Extensor carpi radialis brevis", "פושט שורש חישורי קצר"),
    ],
    accessory: [m([], "Abductor pollicis longus", "מרחיק האגודל הארוך", true)],
  },
  {
    id: "wrist-ulnar",
    region: "forearm",
    groupHe: "הטיה אולנרית",
    groupEn: "Ulnar deviation",
    action: "adduction",
    prime: [
      m(["flexor-carpi-ulnaris"], "Flexor carpi ulnaris", "כופף שורש גומדי"),
      m(["extensor-carpi-ulnaris"], "Extensor carpi ulnaris", "פושט שורש גומדי"),
    ],
    accessory: [m(["extensor-digitorum"], "Extensor digitorum (ulnar side)", "פושט האצבעות (צד גומדי)")],
  },

  // —— Trunk / neck ——
  {
    id: "trunk-flexors",
    region: "neck-trunk",
    groupHe: "כופפי הגו",
    groupEn: "Trunk flexors",
    action: "flexion",
    prime: [
      m(["rectus-abdominis"], "Rectus abdominis", "ישר בטני"),
      m(["external-oblique"], "External oblique", "אלכסון חיצוני"),
      m(["internal-oblique"], "Internal oblique", "אלכסון פנימי"),
    ],
    accessory: [m(["psoas-major"], "Psoas major", "מותן גדול")],
  },
  {
    id: "trunk-extensors",
    region: "neck-trunk",
    groupHe: "פושטי הגב",
    groupEn: "Trunk extensors",
    action: "extension",
    prime: [m(["erector-spinae"], "Erector spinae", "זוקפי השדרה")],
    accessory: [
      m(["multifidus"], "Multifidus", "רב-מפוצל"),
      m(["quadratus-lumborum"], "Quadratus lumborum", "ריבועי מותני"),
    ],
  },
  {
    id: "trunk-latflex",
    region: "neck-trunk",
    groupHe: "כפיפה צידית",
    groupEn: "Lateral flexors",
    action: "lateral-flexion",
    prime: [
      m(["quadratus-lumborum"], "Quadratus lumborum", "ריבועי מותני"),
      m(["external-oblique"], "External oblique", "אלכסון חיצוני"),
      m(["internal-oblique"], "Internal oblique", "אלכסון פנימי"),
    ],
    accessory: [m(["erector-spinae"], "Erector spinae", "זוקפי השדרה")],
  },
  {
    id: "trunk-rot-contra",
    region: "neck-trunk",
    groupHe: "רוטציית גו לצד הנגדי",
    groupEn: "Contralateral rotators",
    action: "external-rotation",
    prime: [m(["external-oblique"], "External oblique", "אלכסון חיצוני")],
    accessory: [m(["multifidus"], "Multifidus", "רב-מפוצל")],
  },
  {
    id: "trunk-rot-ipsi",
    region: "neck-trunk",
    groupHe: "רוטציית גו לאותו צד",
    groupEn: "Ipsilateral rotators",
    action: "internal-rotation",
    prime: [m(["internal-oblique"], "Internal oblique", "אלכסון פנימי")],
    accessory: [m(["erector-spinae"], "Erector spinae", "זוקפי השדרה")],
  },
  {
    id: "neck-flexors",
    region: "neck-trunk",
    groupHe: "כופפי הצוואר",
    groupEn: "Neck flexors",
    action: "flexion",
    prime: [m(["scm"], "Sternocleidomastoid (bilateral)", "מפנה הראש (דו-צדדי)")],
    accessory: [m([], "Scalenes / longus colli", "מדרגות / ארוך הצוואר", true)],
  },
  {
    id: "neck-extensors",
    region: "neck-trunk",
    groupHe: "פושטי הצוואר",
    groupEn: "Neck extensors",
    action: "extension",
    prime: [
      m(["erector-spinae"], "Erector spinae", "זוקפי השדרה"),
      m(["trapezius"], "Trapezius (upper)", "טרפז (עליון)"),
    ],
    accessory: [
      m(["levator-scapulae"], "Levator scapulae", "מרים השכמה"),
      m(["multifidus"], "Multifidus", "רב-מפוצל"),
    ],
  },
  {
    id: "neck-latflex",
    region: "neck-trunk",
    groupHe: "כפיפה צידית של הצוואר",
    groupEn: "Neck lateral flexors",
    action: "lateral-flexion",
    prime: [
      m(["scm"], "Sternocleidomastoid (ipsilateral)", "מפנה הראש (אותו צד)"),
      m(["levator-scapulae"], "Levator scapulae", "מרים השכמה"),
    ],
    accessory: [
      m(["trapezius"], "Trapezius (upper)", "טרפז (עליון)"),
      m(["erector-spinae"], "Erector spinae", "זוקפי השדרה"),
    ],
  },
  {
    id: "neck-rot-contra",
    region: "neck-trunk",
    groupHe: "רוטציית צוואר לצד הנגדי",
    groupEn: "Neck contralateral rotators",
    action: "external-rotation",
    prime: [m(["scm"], "Sternocleidomastoid", "מפנה הראש")],
    accessory: [m(["trapezius"], "Trapezius (upper)", "טרפז (עליון)")],
  },
  {
    id: "trunk-stabilize",
    region: "neck-trunk",
    groupHe: "מייצבי הגו",
    groupEn: "Core stabilizers",
    action: "stabilize",
    prime: [
      m(["transversus-abdominis"], "Transversus abdominis", "הרוחבי הבטני"),
      m(["multifidus"], "Multifidus", "רב-מפוצל"),
    ],
    accessory: [
      m(["internal-oblique"], "Internal oblique", "אלכסון פנימי"),
      m(["external-oblique"], "External oblique", "אלכסון חיצוני"),
      m(["quadratus-lumborum"], "Quadratus lumborum", "ריבועי מותני"),
      m(["diaphragm"], "Diaphragm", "הסרעפת"),
      m(["intercostals"], "Intercostals", "בין-צלעיים"),
    ],
    noteHe: "הרוחבי אינו מכופף את הגו — הוא מחוך סביב המותן.",
    noteEn: "Transversus does not flex the trunk — it is a corset around the waist.",
  },
];

export function actionGroupsForRegion(region: RegionId | "all"): ActionGroup[] {
  if (region === "all") return ACTION_GROUPS;
  return ACTION_GROUPS.filter((g) => g.region === region);
}

export function searchActionGroups(query: string, list: ActionGroup[] = ACTION_GROUPS): ActionGroup[] {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  return list.filter((g) => {
    const members = [...g.prime, ...g.accessory]
      .flatMap((x) => [
        x.en,
        x.he,
        ...x.muscleIds.flatMap((id) => {
          const muscle = muscles.find((m) => m.id === id);
          return muscle ? [muscle.nameEn, muscle.nameHe] : [];
        }),
      ])
      .join(" ");
    return [g.groupHe, g.groupEn, g.noteHe ?? "", g.noteEn ?? "", members].join(" ").toLowerCase().includes(q);
  });
}
