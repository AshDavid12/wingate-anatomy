import type { RegionId } from "./regions";

export type MuscleWhy = {
  sideHe: string;
  sideEn: string;
  crossesHe: string;
  crossesEn: string;
  becauseHe: string;
  becauseEn: string;
};

export type CompartmentGroup = {
  sideHe: string;
  sideEn: string;
  jobHe: string;
  jobEn: string;
  muscleIds: string[];
};

export type RegionLogic = {
  region: RegionId;
  gistHe: string;
  gistEn: string;
  groups: CompartmentGroup[];
};

export const MOVE_RULES = [
  {
    n: "1",
    titleHe: "שריר רק מושך",
    titleEn: "Muscles only pull",
    bodyHe:
      "אין שריר שדוחף. דמיינו גומייה בין Origin ל־Insertion: בכיווץ היא מתקצרת, והסיום נמשך אל ההתחלה. הפעולה = כיוון המשיכה.",
    bodyEn: "Never a push. A rubber band from origin to insertion shortens; insertion is dragged toward origin.",
  },
  {
    n: "2",
    titleHe: "רק מפרק שהוא חוצה",
    titleEn: "Only joints it crosses",
    bodyHe:
      "אם השריר לא עובר מעל המפרק — הוא לא מזיז אותו. חוצה מפרק אחד = פעולה אחת. חוצה שניים (דו־מפרקי) = יכול להזיז את שניהם.",
    bodyEn: "No crossing, no movement. One joint = one job. Two joints (biarticular) = both can move.",
  },
  {
    n: "3",
    titleHe: "הצד קובע את המשפחה",
    titleEn: "Side of the joint = the family",
    bodyHe:
      "קדמי → כפיפה. אחורי → פשיטה. לטרלי → הרחקה. מדיאלי → קרוב. היוצא מן הכלל: הברך הפוכה — קדמי פושט, אחורי כופף.",
    bodyEn: "Anterior flexes, posterior extends, lateral abducts, medial adducts. Knee is reversed.",
  },
  {
    n: "4",
    titleHe: "תא = אותה עבודה",
    titleEn: "Compartment = shared job",
    bodyHe:
      "אל תלמדו 70 פעולות. למדו 8 תאים: קדמת זרוע כופפת מרפק, אחורי ירך כופף ברך, שוק לטרלית עושה אוורסיה. השרירים בתא חולקים תפקיד.",
    bodyEn: "Learn 8 compartments, not 70 actions. Everyone in a compartment shares the job.",
  },
  {
    n: "5",
    titleHe: "השם הלטיני מרמה פחות",
    titleEn: "The name is the cheat",
    bodyHe:
      "Flexor / Extensor / Adductor / Levator / Pronator — השם הוא הפעולה. Carpi = שורש כף היד, Digitorum = אצבעות, Hallucis = בוהן. Radialis מדיאל? לא: חישורי = הטיה רדיאלית.",
    bodyEn: "Flexor, extensor, adductor, levator often are the action. Carpi = wrist, hallucis = big toe.",
  },
] as const;

export const SIDE_ROWS = [
  {
    sideHe: "קדמי · Anterior",
    typicalHe: "כפיפה",
    typicalEn: "Flexion",
    kneeHe: "פשיטה",
    kneeEn: "Extension",
    ankleHe: "דורסיפלקשן",
    ankleEn: "Dorsiflexion",
  },
  {
    sideHe: "אחורי · Posterior",
    typicalHe: "פשיטה",
    typicalEn: "Extension",
    kneeHe: "כפיפה",
    kneeEn: "Flexion",
    ankleHe: "פלנטרפלקשן",
    ankleEn: "Plantar flexion",
  },
  {
    sideHe: "לטרלי · Lateral",
    typicalHe: "הרחקה",
    typicalEn: "Abduction",
    kneeHe: "—",
    kneeEn: "—",
    ankleHe: "אוורסיה",
    ankleEn: "Eversion",
  },
  {
    sideHe: "מדיאלי · Medial",
    typicalHe: "קרוב",
    typicalEn: "Adduction",
    kneeHe: "—",
    kneeEn: "—",
    ankleHe: "היפוך",
    ankleEn: "Inversion",
  },
] as const;

export const REGION_LOGIC: RegionLogic[] = [
  {
    region: "shoulder-girdle",
    gistHe: "השכמה מחליקה על בית החזה. אחורה לכיוון עמוד השדרה = retraction. קדימה סביב הצלעות = protraction. למעלה = elevation.",
    gistEn: "Scapula slides on the ribcage. Toward the spine = retract. Around the ribs = protract. Up = elevate.",
    groups: [
      {
        sideHe: "גב מדיאלי",
        sideEn: "Back, toward spine",
        jobHe: "קרוב שכמות (retraction)",
        jobEn: "Retraction",
        muscleIds: ["trapezius", "rhomboid-major", "rhomboid-minor"],
      },
      {
        sideHe: "למעלה על הצוואר",
        sideEn: "Up the neck",
        jobHe: "הרמת שכמה",
        jobEn: "Elevation",
        muscleIds: ["levator-scapulae", "trapezius"],
      },
      {
        sideHe: "עוטף צלעות מקדימה",
        sideEn: "Wraps the ribs",
        jobHe: "הרחקת שכמות (protraction)",
        jobEn: "Protraction",
        muscleIds: ["serratus-anterior", "pectoralis-minor"],
      },
    ],
  },
  {
    region: "shoulder",
    gistHe: "הומרוס בתוך glenoid. קדמי מושך את הזרוע קדימה (כפיפה / קרוב אופקי / IR). צידי מרים אותה (הרחקה). אחורי מחזיר אחורה (פשיטה). ה-cuff מסובב את הראש.",
    gistEn: "Front pulls the arm forward, side lifts it, back pulls it behind. Cuff spins the humeral head.",
    groups: [
      {
        sideHe: "קדמי",
        sideEn: "Anterior",
        jobHe: "כפיפה, קרוב אופקי, רוטציה מדיאלית",
        jobEn: "Flexion, horizontal adduction, IR",
        muscleIds: ["pectoralis-major", "coracobrachialis", "deltoid"],
      },
      {
        sideHe: "צידי",
        sideEn: "Lateral",
        jobHe: "הרחקת כתף",
        jobEn: "Abduction",
        muscleIds: ["deltoid", "supraspinatus"],
      },
      {
        sideHe: "אחורי / בית שחי",
        sideEn: "Posterior / axilla",
        jobHe: "פשיטה, קרוב, רוטציה מדיאלית",
        jobEn: "Extension, adduction, IR",
        muscleIds: ["latissimus-dorsi", "teres-major"],
      },
      {
        sideHe: "Cuff אחורי",
        sideEn: "Posterior cuff",
        jobHe: "רוטציה לטרלית",
        jobEn: "External rotation",
        muscleIds: ["infraspinatus", "teres-minor"],
      },
      {
        sideHe: "Cuff קדמי",
        sideEn: "Anterior cuff",
        jobHe: "רוטציה מדיאלית",
        jobEn: "Internal rotation",
        muscleIds: ["subscapularis"],
      },
    ],
  },
  {
    region: "arm",
    gistHe: "זרוע = תא קדמי כופף מרפק, תא אחורי פושט מרפק. מי שנאחז ברדיוס יכול גם לסובב (biceps = סופינציה).",
    gistEn: "Anterior arm flexes the elbow. Posterior extends it. Attach on the radius and you can also spin it.",
    groups: [
      {
        sideHe: "קדמי",
        sideEn: "Anterior",
        jobHe: "כפיפת מרפק",
        jobEn: "Elbow flexion",
        muscleIds: ["biceps-brachii", "brachialis", "brachioradialis"],
      },
      {
        sideHe: "אחורי",
        sideEn: "Posterior",
        jobHe: "פשיטת מרפק",
        jobEn: "Elbow extension",
        muscleIds: ["triceps-brachii", "anconeus"],
      },
    ],
  },
  {
    region: "forearm",
    gistHe: "אפיקונדיל מדיאלי = כופפים. אפיקונדיל לטרלי = פושטים. חישורי = הטיה רדיאלית. גומדי = הטיה אולנרית. מי שכורך את הרדיוס מסובב אותו.",
    gistEn: "Medial epicondyle flexes. Lateral extends. Radial side tilts radial, ulnar tilts ulnar.",
    groups: [
      {
        sideHe: "מדיאלי (common flexor)",
        sideEn: "Medial epicondyle",
        jobHe: "כפיפת שורש כף היד",
        jobEn: "Wrist flexion",
        muscleIds: [
          "flexor-carpi-radialis",
          "flexor-carpi-ulnaris",
          "palmaris-longus",
          "flexor-digitorum-superficialis",
          "pronator-teres",
        ],
      },
      {
        sideHe: "לטרלי (common extensor)",
        sideEn: "Lateral epicondyle",
        jobHe: "פשיטת שורש כף היד",
        jobEn: "Wrist extension",
        muscleIds: [
          "extensor-carpi-radialis-longus",
          "extensor-carpi-radialis-brevis",
          "extensor-carpi-ulnaris",
          "extensor-digitorum",
          "supinator",
        ],
      },
      {
        sideHe: "כורכים את הרדיוס",
        sideEn: "Wrap the radius",
        jobHe: "פרונציה / סופינציה",
        jobEn: "Pronation / supination",
        muscleIds: ["pronator-teres", "pronator-quadratus", "supinator", "biceps-brachii"],
      },
    ],
  },
  {
    region: "neck-trunk",
    gistHe: "קדמת הבטן כופפת את הגו. הגב זוקף. צד עושה כפיפה צידית. אלכסון חיצוני מסובב לצד הנגדי, פנימי לאותו צד.",
    gistEn: "Front flexes, back extends, side bends. External oblique rotates contralaterally; internal ipsilaterally.",
    groups: [
      {
        sideHe: "קדמי",
        sideEn: "Anterior",
        jobHe: "כפיפת גו",
        jobEn: "Trunk flexion",
        muscleIds: ["rectus-abdominis", "external-oblique", "internal-oblique"],
      },
      {
        sideHe: "אחורי",
        sideEn: "Posterior",
        jobHe: "פשיטת עמוד שדרה",
        jobEn: "Spinal extension",
        muscleIds: ["erector-spinae", "multifidus"],
      },
      {
        sideHe: "צידי",
        sideEn: "Lateral",
        jobHe: "כפיפה צידית",
        jobEn: "Lateral flexion",
        muscleIds: ["quadratus-lumborum", "external-oblique", "internal-oblique"],
      },
    ],
  },
  {
    region: "hip",
    gistHe: "ירך מתנהגת ״רגיל״: קדמי כופף, אחורי פושט, לטרלי מרחיק, מדיאלי מקרב. זה ההפך מהברך — אל תערבבו.",
    gistEn: "Hip is the normal map: front flexes, back extends, side abducts, medial adducts.",
    groups: [
      {
        sideHe: "קדמי",
        sideEn: "Anterior",
        jobHe: "כפיפת ירך",
        jobEn: "Hip flexion",
        muscleIds: ["psoas-major", "iliacus", "tfl", "sartorius", "rectus-femoris"],
      },
      {
        sideHe: "אחורי",
        sideEn: "Posterior",
        jobHe: "פשיטת ירך",
        jobEn: "Hip extension",
        muscleIds: ["gluteus-maximus", "biceps-femoris", "semitendinosus", "semimembranosus"],
      },
      {
        sideHe: "לטרלי",
        sideEn: "Lateral",
        jobHe: "הרחקת ירך",
        jobEn: "Hip abduction",
        muscleIds: ["gluteus-medius", "gluteus-minimus", "tfl"],
      },
      {
        sideHe: "מדיאלי",
        sideEn: "Medial",
        jobHe: "קרוב ירך",
        jobEn: "Hip adduction",
        muscleIds: ["pectineus", "adductor-longus", "adductor-brevis", "adductor-magnus", "gracilis"],
      },
    ],
  },
  {
    region: "thigh",
    gistHe: "הברך הפוכה מהירך. קדמת הירך (quads) פושטת ברך. אחורי (hamstrings) כופף ברך. מי שחוצה גם ירך עושה את שניהם.",
    gistEn: "Knee is reversed. Anterior quads extend it. Posterior hamstrings flex it.",
    groups: [
      {
        sideHe: "קדמי · Quads",
        sideEn: "Anterior",
        jobHe: "פשיטת ברך (RF גם כפיפת ירך)",
        jobEn: "Knee extension (RF also flexes hip)",
        muscleIds: ["rectus-femoris", "vastus-lateralis", "vastus-medialis", "vastus-intermedius"],
      },
      {
        sideHe: "אחורי · Hamstrings",
        sideEn: "Posterior",
        jobHe: "כפיפת ברך + פשיטת ירך",
        jobEn: "Knee flexion + hip extension",
        muscleIds: ["biceps-femoris", "semitendinosus", "semimembranosus"],
      },
    ],
  },
  {
    region: "leg",
    gistHe: "קדמת השוק מרים את כף הרגל (דורסיפלקשן). אחורי לוחץ על הגז (פלנטרפלקשן). לטרלי הופך את הסוליה החוצה. טיביאליס מושך מדיאלית = היפוך.",
    gistEn: "Front lifts the foot, back points it, lateral everts, tibialis inverts.",
    groups: [
      {
        sideHe: "קדמי",
        sideEn: "Anterior",
        jobHe: "דורסיפלקשן",
        jobEn: "Dorsiflexion",
        muscleIds: ["tibialis-anterior", "extensor-hallucis-longus"],
      },
      {
        sideHe: "אחורי",
        sideEn: "Posterior",
        jobHe: "פלנטרפלקשן",
        jobEn: "Plantar flexion",
        muscleIds: ["gastrocnemius", "soleus", "plantaris", "tibialis-posterior", "flexor-hallucis-longus"],
      },
      {
        sideHe: "לטרלי · Fibularis",
        sideEn: "Lateral",
        jobHe: "אוורסיה",
        jobEn: "Eversion",
        muscleIds: ["fibularis-longus", "fibularis-brevis"],
      },
      {
        sideHe: "מדיאלי · Tibialis",
        sideEn: "Medial pull",
        jobHe: "היפוך",
        jobEn: "Inversion",
        muscleIds: ["tibialis-anterior", "tibialis-posterior"],
      },
    ],
  },
];

export const MUSCLE_WHY: Record<string, MuscleWhy> = {
  trapezius: {
    sideHe: "שטחי בגב, שלושה כיווני סיבים",
    sideEn: "Superficial back, three fiber directions",
    crossesHe: "שכמה–חזה (לא את מפרק הכתף עצמו)",
    crossesEn: "Scapulothoracic only",
    becauseHe:
      "הסיבים נמשכים לעצם הבריח/אקרומיון/קוץ השכמה. אמצעיים אופקיים מושכים את השכמה לעמוד השדרה (retraction). עליונים מושכים למעלה. תחתונים מושכים למטה. עליון+תחתון יחד מסובבים את ה-glenoid מעלה.",
    becauseEn: "Fiber direction is the action: middle retracts, upper elevates, lower depresses; upper+lower upward-rotate.",
  },
  "levator-scapulae": {
    sideHe: "צידי צוואר → זווית עליונה של השכמה",
    sideEn: "Side of neck to superior angle",
    crossesHe: "שכמה + צוואר",
    crossesEn: "Scapula and neck",
    becauseHe:
      "השם הוא הפעולה: Levator = מרים. מושך את הזווית העליונה לכיוון C1–C4 — השכמה עולה ומסתובבת מטה. אם השכמה קבועה, הוא כופף את הצוואר לאותו צד.",
    becauseEn: "The name is the job: it lifts the superior angle toward C1–C4, so the scapula elevates and downward-rotates.",
  },
  "rhomboid-major": {
    sideHe: "בין עמוד השדרה לגבול המדיאלי של השכמה",
    sideEn: "Spine to medial scapular border",
    crossesHe: "שכמה–חזה",
    crossesEn: "Scapulothoracic",
    becauseHe:
      "גומייה אופקית-אלכסונית מהחוליות לגבול המדיאלי. קיצור = השכמה נמשכת לעמוד השדרה (retraction) וקצת למעלה, וה-glenoid נוטה מטה.",
    becauseEn: "A band from the spine to the medial border shortens: scapula retracts, elevates a little, downward-rotates.",
  },
  "rhomboid-minor": {
    sideHe: "כמו הגדול, רק גבוה יותר",
    sideEn: "Same line as major, higher",
    crossesHe: "שכמה–חזה",
    crossesEn: "Scapulothoracic",
    becauseHe: "אותה גומייה כמו המעוין הגדול, רק בגובה קוץ השכמה. אותה משפחה: retraction, elevation, downward rotation.",
    becauseEn: "Same pull as rhomboid major, just at the spine of the scapula.",
  },
  "serratus-anterior": {
    sideHe: "צלעות לטרליות → מתחת לשכמה לגבול המדיאלי",
    sideEn: "Lateral ribs, under the scapula",
    crossesHe: "שכמה–חזה",
    crossesEn: "Scapulothoracic",
    becauseHe:
      "הוא עוטף את בית החזה ומושך את הגבול המדיאלי קדימה סביב הצלעות — protraction. הסיבים התחתונים גם מסובבים את ה-glenoid מעלה (בן זוג לטרפז בהרמת יד).",
    becauseEn: "It wraps the ribcage and pulls the medial border forward: protraction plus upward rotation.",
  },
  "pectoralis-minor": {
    sideHe: "צלעות קדמיות → coracoid",
    sideEn: "Front ribs to coracoid",
    crossesHe: "שכמה–חזה",
    crossesEn: "Scapulothoracic",
    becauseHe:
      "מושך את מקור העורב למטה ולקדימה. השכמה יורדת, יוצאת קדימה ומסתובבת מטה. לא חוצה את מפרק הכתף — לכן לא מזיז את ההומרוס.",
    becauseEn: "Pulls the coracoid down and forward: depression, protraction, downward rotation. Does not move the humerus.",
  },
  "latissimus-dorsi": {
    sideHe: "גב תחתון → רצפת התלם בהומרוס (מלפנים)",
    sideEn: "Low back to the front of the humerus",
    crossesHe: "מפרק הכתף (עובר בית שחי)",
    crossesEn: "Glenohumeral, through the axilla",
    becauseHe:
      "הגיד מגיע מאחור, נכנס לבית השחי ונאחז בקדמת ההומרוס. קיצור מושך את הזרוע אחורה (פשיטה), אליכם (קרוב) ומסובב אותה פנימה. ״המשוט״ — כמו משיכת עלייה.",
    becauseEn: "From the back, through the armpit, onto the front of the humerus: extend, adduct, internally rotate.",
  },
  "pectoralis-major": {
    sideHe: "חזה קדמי → שפה לטרלית של התלם",
    sideEn: "Chest to the front of the humerus",
    crossesHe: "מפרק הכתף מקדימה",
    crossesEn: "Front of the glenohumeral joint",
    becauseHe:
      "גומייה מקדימה על בית החזה. קיצור מביא את הזרוע אל קו האמצע מלפנים — קרוב אופקי (חיבוק / pec-deck). גם מקרב ומסובב פנימה. ראש בריחי גבוה יותר → גם כפיפה.",
    becauseEn: "A chest rubber band hugs the arm across the body: horizontal adduction, adduction, IR.",
  },
  deltoid: {
    sideHe: "כובע מעל הכתף, שלושה חלקים",
    sideEn: "Cap over the shoulder, three parts",
    crossesHe: "מפרק הכתף מכל הצדדים",
    crossesEn: "Glenohumeral from front, side, and back",
    becauseHe:
      "השריר כולו יושב לטרלית ומכניס את ההומרוס החוצה = הרחקה. קדמי = כמו פק מזערי (כפיפה / קרוב אופקי). אחורי = כמו לאט מזערי (פשיטה / הרחקה אופקית). אותו שריר, שלושה כיווני משיכה.",
    becauseEn: "The whole muscle sits laterally so it abducts. Anterior acts like a mini-pec; posterior like a mini-lat.",
  },
  supraspinatus: {
    sideHe: "מעל קוץ השכמה → ראש ההומרוס מלמעלה",
    sideEn: "Above the scapular spine, onto the top of the humeral head",
    crossesHe: "כתף, מלמעלה",
    crossesEn: "Top of the glenohumeral joint",
    becauseHe:
      "הגיד עובר מעל ראש ההומרוס. קיצור מרים את הראש ומתחיל הרחקה (15° הראשונים). בלי זה הדלתואיד היה מושך את הראש למעלה מתוך ה-glenoid.",
    becauseEn: "It pulls the humeral head up into the first degrees of abduction and keeps it seated.",
  },
  infraspinatus: {
    sideHe: "אחורי השכמה → greater tubercle מאחור",
    sideEn: "Back of scapula to the back of the greater tubercle",
    crossesHe: "כתף, מאחור",
    crossesEn: "Posterior glenohumeral",
    becauseHe:
      "נאחז מאחור על הגבשון הגדול. קיצור מסובב את ההומרוס החוצה — רוטציה לטרלית. כלל ה-cuff: צד האחיזה על הראש = כיוון הסיבוב.",
    becauseEn: "Inserts on the back of the humeral head, so it spins the arm into external rotation.",
  },
  "teres-minor": {
    sideHe: "גבול לטרלי אחורי → greater tubercle מלמטה-מאחור",
    sideEn: "Lateral border to the back of the humeral head",
    crossesHe: "כתף, מאחור",
    crossesEn: "Posterior glenohumeral",
    becauseHe: "אותו צד כמו תת-הקוץ, רק נמוך יותר. אחורי על הראש = רוטציה לטרלית. חלק מ-SITS, לא העגול הגדול.",
    becauseEn: "Same posterior spin as infraspinatus. SITS member — not teres major.",
  },
  subscapularis: {
    sideHe: "הצד הקדמי של השכמה → lesser tubercle",
    sideEn: "Front of the scapula to the lesser tubercle",
    crossesHe: "כתף, מקדימה",
    crossesEn: "Anterior glenohumeral",
    becauseHe:
      "היחיד מ-SITS שיושב על הבטן של השכמה ונאחז בגבשון הקטן מלפנים. קדמי על הראש = רוטציה מדיאלית. ההפך מ-infra + teres minor.",
    becauseEn: "Only cuff muscle on the front of the scapula, so it internally rotates.",
  },
  "teres-major": {
    sideHe: "זווית תחתונה של השכמה → קדמת ההומרוס",
    sideEn: "Inferior angle to the front of the humerus",
    crossesHe: "כתף, דרך בית השחי",
    crossesEn: "Glenohumeral via the axilla",
    becauseHe:
      "אותו מסלול כמו הרחב גבי — מאחור, דרך בית השחי, אל קדמת ההומרוס. לכן אותה שלישייה: פשיטה, קרוב, IR. הגיד לא נכנס לקפסולה, אז הוא לא cuff.",
    becauseEn: "Lat’s little helper: same axillary path, same extend / adduct / IR. Not rotator cuff.",
  },
  coracobrachialis: {
    sideHe: "coracoid → אמצע מדיאלי של ההומרוס",
    sideEn: "Coracoid to medial mid-humerus",
    crossesHe: "כתף בלבד, מקדימה-מדיאלית",
    crossesEn: "Glenohumeral only, front-medial",
    becauseHe:
      "השם: מקור-זרועי. לא חוצה מרפק, אז לא כופף מרפק. מושך את ההומרוס אל ה-coracoid — כפיפה וקרוב. שכנו הקצר של הדו-ראשי בלי ההמשך לרדיוס.",
    becauseEn: "Coracoid to humerus only — flexes and adducts the shoulder, never the elbow.",
  },
  "biceps-brachii": {
    sideHe: "קדמת הזרוע, נאחז ברדיוס",
    sideEn: "Anterior arm, onto the radius",
    crossesHe: "כתף + מרפק (דו־מפרקי)",
    crossesEn: "Shoulder and elbow",
    becauseHe:
      "קדמי למרפק = כפיפה. נאחז ברדיוס המסתובב, לא באולנה — לכן גם סופינציה (כמו פותחן). הראש הקצר מה-coracoid מסייע בכפיפת כתף. brachialis הוא כופף המרפק הטהור; biceps הוא כופף+מסובב.",
    becauseEn: "Front of the elbow flexes it; insertion on the radius also supinates. Short head helps flex the shoulder.",
  },
  brachialis: {
    sideHe: "עמוק בקדמת הזרוע → אולנה",
    sideEn: "Deep anterior arm to the ulna",
    crossesHe: "מרפק בלבד",
    crossesEn: "Elbow only",
    becauseHe:
      "חוצה רק את המרפק מקדימה ונאחז באולנה שלא מסתובבת. לכן כפיפה טהורה — לא סופינציה, לא כתף. זה כופף המרפק האמיתי בכל מצב אמה.",
    becauseEn: "Crosses only the elbow, onto the ulna: pure flexion, any forearm position.",
  },
  brachioradialis: {
    sideHe: "לטרלי דיסטלי של הזרוע → סטיילואיד הרדיוס",
    sideEn: "Lateral distal humerus to radial styloid",
    crossesHe: "מרפק, בצד החישורי",
    crossesEn: "Elbow, radial side",
    becauseHe:
      "יושב באלכסון על צד האגודל. כופף הכי חזק כשהאמה בנייטרל (אגודל למעלה, כמו לחיצת יד). לא באמת מסובב — רק מביא את האמה לנייטרל וכופף.",
    becauseEn: "Thumb-side elbow flexor, strongest in mid-position (handshake / beer-pour).",
  },
  "triceps-brachii": {
    sideHe: "כל אחורי הזרוע → olecranon",
    sideEn: "Whole back of the arm to the olecranon",
    crossesHe: "מרפק מאחור; הראש הארוך גם כתף",
    crossesEn: "Elbow (long head also shoulder)",
    becauseHe:
      "אחורי למרפק + אחיזה בזיז המרפק = פשיטה. הראש הארוך מתחיל מתחת ל-glenoid, אז גם מושך את ההומרוס אחורה (פשיטת כתף). שני הראשים הקצרים לא נוגעים בכתף.",
    becauseEn: "Behind the elbow to the olecranon = extension. Long head also extends the shoulder.",
  },
  anconeus: {
    sideHe: "אפיקונדיל לטרלי → צד ה-olecranon",
    sideEn: "Lateral epicondyle to the olecranon",
    crossesHe: "מרפק מאחור-לטרלית",
    crossesEn: "Posterior-lateral elbow",
    becauseHe: "עזר קטן מאחורי המרפק. אותה משפחה כמו התלת-ראשי: פשיטה וייצוב, לא כוכב.",
    becauseEn: "A small posterior helper of triceps: extend and stabilize.",
  },
  "pronator-teres": {
    sideHe: "אפיקונדיל מדיאלי → צד הרדיוס",
    sideEn: "Medial epicondyle onto the radius",
    crossesHe: "מפרק רדיו–אולנרי (+ מרפק)",
    crossesEn: "Radioulnar (+ elbow)",
    becauseHe:
      "השם: Pronator. כורך את הרדיוס כך שגב כף היד פונה קדימה. כי הוא גם מהאפיקונדיל המדיאלי, הוא מסייע קצת בכפיפת מרפק.",
    becauseEn: "It wraps the radius into pronation. Medial-epicondyle origin also helps flex the elbow.",
  },
  "pronator-quadratus": {
    sideHe: "קדמת האמה דיסטלית, אולנה → רדיוס",
    sideEn: "Distal anterior ulna to radius",
    crossesHe: "רדיו–אולנרי דיסטלי בלבד",
    crossesEn: "Distal radioulnar only",
    becauseHe: "ריבוע קצר בין שתי העצמות ממש מעל שורש כף היד. קיצור מסובב את הרדיוס מעל האולנה — הפרונטור העיקרי, בלי מרפק.",
    becauseEn: "A short square just above the wrist: the prime pronator, no elbow action.",
  },
  supinator: {
    sideHe: "אפיקונדיל לטרלי / אולנה → רדיוס פרוקסימלי",
    sideEn: "Lateral elbow onto proximal radius",
    crossesHe: "רדיו–אולנרי פרוקסימלי",
    crossesEn: "Proximal radioulnar",
    becauseHe:
      "השם: Supinator. כורך את הרדיוס חזרה לעמידה אנטומית (כף היד קדימה). חזק כשהמרפק ישר; כשהמרפק כפוף ה-biceps גונב את העבודה.",
    becauseEn: "Unwraps the radius into supination. Owns the job when the elbow is straight; biceps takes over when flexed.",
  },
  "flexor-carpi-radialis": {
    sideHe: "אפיקונדיל מדיאלי → מטקרפל 2–3",
    sideEn: "Medial epicondyle to metacarpals 2–3",
    crossesHe: "שורש כף היד, בצד החישורי",
    crossesEn: "Wrist, radial side",
    becauseHe:
      "פרקו את השם: Flexor = כופף, Carpi = שורש כף היד, Radialis = הטיה לצד הרדיוס. מדיאלי + חישורי = כפיפה והטייה רדיאלית.",
    becauseEn: "The name is the action: flex the wrist and tilt it radially.",
  },
  "flexor-carpi-ulnaris": {
    sideHe: "אפיקונדיל מדיאלי → צד הזרת",
    sideEn: "Medial epicondyle to the ulnar side of the hand",
    crossesHe: "שורש כף היד, בצד האולנרי",
    crossesEn: "Wrist, ulnar side",
    becauseHe: "Flexor + Carpi + Ulnaris. מדיאלי = כפיפה, גומדי = הטיה אולנרית. הזוג של FCR מהצד השני.",
    becauseEn: "Flexor + carpi + ulnaris: flex and ulnar-deviate.",
  },
  "palmaris-longus": {
    sideHe: "אפיקונדיל מדיאלי → פאשיה פלמרית",
    sideEn: "Medial epicondyle to palmar fascia",
    crossesHe: "שורש כף היד מקדימה",
    crossesEn: "Anterior wrist",
    becauseHe: "קדמי לשורש כף היד בלי אחיזה חזקה בעצם. כפיפה חלשה בלבד. חסר אצל הרבה אנשים — לכן לא ליבה.",
    becauseEn: "A weak anterior wrist flexor into fascia. Often missing.",
  },
  "flexor-digitorum-superficialis": {
    sideHe: "קדמת האמה → גלילים אמצעיים",
    sideEn: "Anterior forearm to middle phalanges",
    crossesHe: "שורש כף היד + אצבעות (MCP, PIP)",
    crossesEn: "Wrist and finger MCP/PIP",
    becauseHe: "Flexor + Digitorum: כופף אצבעות. שטחי = עד הגליל האמצעי (PIP), לא את קצה האצבע. בדרך הוא גם מסייע בכפיפת שורש כף היד.",
    becauseEn: "Flexor of the digits to the middle phalanx (PIP), and it helps flex the wrist on the way.",
  },
  "extensor-carpi-radialis-longus": {
    sideHe: "רכס לטרלי → מטקרפל 2",
    sideEn: "Lateral ridge to 2nd metacarpal",
    crossesHe: "שורש כף היד מאחור, חישורי",
    crossesEn: "Dorsal wrist, radial",
    becauseHe: "Extensor + Carpi + Radialis. לטרלי = פשיטה, חישורי = הטיה רדיאלית. האנטגוניסט של FCR.",
    becauseEn: "Name = job: extend the wrist and radially deviate.",
  },
  "extensor-carpi-radialis-brevis": {
    sideHe: "אפיקונדיל לטרלי → מטקרפל 3",
    sideEn: "Lateral epicondyle to 3rd metacarpal",
    crossesHe: "שורש כף היד מאחור, חישורי",
    crossesEn: "Dorsal wrist, radial",
    becauseHe: "אותה משפחה כמו הארוך, רק מה-common extensor origin. זה השריר שצועק בטניס אלבו.",
    becauseEn: "Same extend + radial deviate as ECRL, from the common extensor origin (tennis elbow).",
  },
  "extensor-carpi-ulnaris": {
    sideHe: "אפיקונדיל לטרלי → מטקרפל 5",
    sideEn: "Lateral epicondyle to 5th metacarpal",
    crossesHe: "שורש כף היד מאחור, אולנרי",
    crossesEn: "Dorsal wrist, ulnar",
    becauseHe: "Extensor + Carpi + Ulnaris. אחורי = פשיטה, גומדי = הטיה אולנרית. האנטגוניסט של FCU.",
    becauseEn: "Extend and ulnar-deviate — the opposite corner from FCU.",
  },
  "extensor-digitorum": {
    sideHe: "אפיקונדיל לטרלי → גב האצבעות",
    sideEn: "Lateral epicondyle to the finger extensor hoods",
    crossesHe: "שורש כף היד + אצבעות מאחור",
    crossesEn: "Dorsal wrist and fingers",
    becauseHe: "Extensor + Digitorum. אחורי לאצבעות = פשיטת אצבעות 2–5, ובדרך גם פשיטת שורש כף היד.",
    becauseEn: "Extends digits 2–5; the wrist comes along for the ride.",
  },
  scm: {
    sideHe: "חזה/בריח → מאחורי האוזן",
    sideEn: "Sternum/clavicle to behind the ear",
    crossesHe: "צוואר, באלכסון",
    crossesEn: "Neck, diagonally",
    becauseHe:
      "גומייה אלכסונית מקדימה-למטה אל מאחורי האוזן. חד-צדדי: מושך את הראש לסיבוב לצד הנגדי וכפיפה צידית לאותו צד. שני הצדדים יחד: כפיפת צוואר.",
    becauseEn: "A diagonal strap: one side turns the head away and tilts it toward itself; both sides flex the neck.",
  },
  "rectus-abdominis": {
    sideHe: "קדמת הבטן, סיבים ישרים למעלה",
    sideEn: "Front of the abdomen, vertical",
    crossesHe: "עמוד השדרה המותני מקדימה",
    crossesEn: "Anterior lumbar spine",
    becauseHe:
      "חיק → צלעות. קיצור מקרב את בית החזה לאגן = כפיפת גו, או מגלגל את האגן לאחור (PPT). קדמי = כפיפה, בלי סיבוב כי הסיבים ישרים.",
    becauseEn: "Pubis to ribs: crunch the trunk or posteriorly tilt the pelvis. Straight fibers = no rotation.",
  },
  "external-oblique": {
    sideHe: "צלעות → iliac crest, סיבים ״יד בכיס״",
    sideEn: "Ribs to iliac crest, pocket-hand fibers",
    crossesHe: "גו, באלכסון",
    crossesEn: "Trunk, diagonally",
    becauseHe:
      "סיבים כמו להכניס יד לכיס. חד-צדדי הם מסובבים את הגו לצד הנגדי (כתף ימין לכיוון אגן שמאל). שני הצדדים: כפיפה. כלל: חיצוני = contralateral.",
    becauseEn: "Pocket-hand fibers rotate the trunk to the opposite side. Bilateral = flexion.",
  },
  "internal-oblique": {
    sideHe: "iliac crest → צלעות, סיבים הפוכים לחיצוני",
    sideEn: "Iliac crest to ribs, opposite diagonal",
    crossesHe: "גו, באלכסון",
    crossesEn: "Trunk, diagonally",
    becauseHe:
      "הסיבים הפוכים לאלכסון החיצוני, אז הסיבוב הפוך: לאותו צד. יחד עם החיצוני הנגדי הם יוצרים רצועה אחת מסביב לגוף.",
    becauseEn: "Opposite fiber slant = ipsilateral rotation. Pairs with the opposite external oblique.",
  },
  "transversus-abdominis": {
    sideHe: "אופקי סביב המותן, כמו מחוך",
    sideEn: "Horizontal corset",
    crossesHe: "לא באמת מפרק תנועה — חגורת לחץ",
    crossesEn: "Pressure belt, not a mover",
    becauseHe:
      "הסיבים אופקיים. קיצור מצר את המותן ומעלה לחץ תוך-בטני. אין לו רגע שמכופף או מסובב — רק ייצוב. לכן ״לא מזיז״ הוא התשובה הנכונה.",
    becauseEn: "Horizontal fibers cinch the waist. Stabilizer, not a flexor.",
  },
  "quadratus-lumborum": {
    sideHe: "iliac crest → צלע 12 וזיזים מותניים",
    sideEn: "Iliac crest to 12th rib / lumbar TPs",
    crossesHe: "מותן, בצד",
    crossesEn: "Lateral lumbar spine",
    becauseHe:
      "ריבוע בצד המותן. קיצור חד-צדדי מקרב את הצלע ה-12 לאגן = כפיפה צידית. שני הצדדים מייצבים / עוזרים בפשיטה. לא כופף קדמי.",
    becauseEn: "A side square that side-bends the lumbar spine and parks the 12th rib.",
  },
  "erector-spinae": {
    sideHe: "לאורך הגב, מאחורי החוליות",
    sideEn: "Longitudinal, behind the spine",
    crossesHe: "כל עמוד השדרה מאחור",
    crossesEn: "Whole posterior spine",
    becauseHe:
      "אחורי לאורך החוליות = פשיטה (לקום מכפיפה, לעמוד זקוף). חד-צדדי: כפיפה צידית. שלוש עמודות מהחוץ פנימה: iliocostalis, longissimus, spinalis.",
    becauseEn: "Behind the spine = extension and posture. One side also laterally flexes.",
  },
  multifidus: {
    sideHe: "עמוק, סגמנט לחוליה",
    sideEn: "Deep, segment to segment",
    crossesHe: "2–4 חוליות מאחור",
    crossesEn: "2–4 vertebrae posteriorly",
    becauseHe: "קצר ועמוק. לא מייצר תנועה גדולה — נועל חוליה לחוליה בזמן שהזוקפים עובדים. סיוע קטן בפשיטה וסיבוב נגדי.",
    becauseEn: "A segmental lock, not a prime mover. Helps extend and rotate contralaterally.",
  },
  diaphragm: {
    sideHe: "כיפה בין בית החזה לבטן",
    sideEn: "Dome between thorax and abdomen",
    crossesHe: "לא מפרק גפיים — רצפת בית החזה",
    crossesEn: "Thoracic floor, not a limb joint",
    becauseHe:
      "בכיווץ הכיפה נעשית שטוחה. נפח בית החזה גדל, הלחץ יורד, אוויר נכנס. זו לא ״תנועת מפרק״ — זו משאבת נפח. C3–C4–C5 keep the diaphragm alive.",
    becauseEn: "It flattens, thoracic volume rises, air in. A pump, not a joint mover.",
  },
  intercostals: {
    sideHe: "בין צלע לצלע",
    sideEn: "Between the ribs",
    crossesHe: "מרווחים בין-צלעיים",
    crossesEn: "Intercostal spaces",
    becauseHe:
      "חיצוניים מרימים צלעות (כמו דליי משאבה בשאיפה). פנימיים מורידים בנשיפה מאומצת. שוב: משיכה בין שתי צלעות, לא דחיפה.",
    becauseEn: "Externals lift ribs to inhale; internals depress them in forced expiration.",
  },
  "psoas-major": {
    sideHe: "חוליות מותן → lesser trochanter, מקדימה למפרק הירך",
    sideEn: "Lumbar spine to lesser trochanter, in front of the hip",
    crossesHe: "מותן + ירך",
    crossesEn: "Lumbar spine and hip",
    becauseHe:
      "עובר מקדימה למפרק הירך אל הטרוכנטר הקטן. קדמי לירך = כפיפה. כי המוצא על החוליות, הוא גם מושך את המותן לפנים (לורדוזה). יחד עם iliacus = כופף הירך העיקרי.",
    becauseEn: "Front of the hip to the lesser trochanter = flexion. Lumbar origin also increases lordosis.",
  },
  iliacus: {
    sideHe: "קערת האגן → lesser trochanter",
    sideEn: "Iliac fossa to lesser trochanter",
    crossesHe: "ירך מקדימה",
    crossesEn: "Anterior hip",
    becauseHe:
      "יושב בתוך קערת האגן ויוצא מקדימה אל אותו טרוכנטר קטן. אותה כפיפת ירך כמו psoas, ובנוסף מגלגל את האגן לפנים (APT) כי המוצא על ה-ilium.",
    becauseEn: "Same lesser-trochanter flexor as psoas; iliac origin also anteriorly tilts the pelvis.",
  },
  "gluteus-maximus": {
    sideHe: "אחורי האגן → אחורי הירך / ITB",
    sideEn: "Back of pelvis to back of femur / ITB",
    crossesHe: "ירך מאחור",
    crossesEn: "Posterior hip",
    becauseHe:
      "השריר הכי אחורי על הירך. אחורי = פשיטה (לקום, לרוץ, hip hinge). הסיבים גם מושכים לצד וסובבים החוצה. דרך ה-ITB הוא מייצב את הברך מבחוץ — בלי לחצות את הברך כשריר כופף.",
    becauseEn: "The most posterior hip muscle: extend and externally rotate. ITB steadies the knee from the outside.",
  },
  "gluteus-medius": {
    sideHe: "צד האגן → greater trochanter",
    sideEn: "Side of ilium to greater trochanter",
    crossesHe: "ירך מלטרלית",
    crossesEn: "Lateral hip",
    becauseHe:
      "יושב על צד האגן ומושך את הטרוכנטר הגדול למעלה = הרחקה. בעמידת רגל אחת הוא לא ״מרחיק״ — הוא מונע מהאגן ליפול לצד השני (Trendelenburg). סיבים קדמיים / אחוריים מוסיפים IR / ER.",
    becauseEn: "Side of the hip = abductor and pelvic leveler in single-leg stance.",
  },
  "gluteus-minimus": {
    sideHe: "עמוק בצד האגן, אחיזה קדמית יותר על הטרוכנטר",
    sideEn: "Deep lateral hip, more anterior insertion",
    crossesHe: "ירך מלטרלית",
    crossesEn: "Lateral hip",
    becauseHe: "אותו תא כמו העכוז האמצעי, עם אחיזה קצת יותר קדמית — לכן הרחקה ועוד קצת רוטציה מדיאלית.",
    becauseEn: "Medius’s deep twin: abduct, with a bit more internal rotation.",
  },
  tfl: {
    sideHe: "ASIS קדמי-לטרלי → ITB",
    sideEn: "Anterior-lateral ASIS into the ITB",
    crossesHe: "ירך מקדימה-מבחוץ; מייצב ברך דרך ITB",
    crossesEn: "Anterior-lateral hip; ITB to the knee",
    becauseHe:
      "קדמי + לטרלי על הירך = כפיפה והרחקה, וגם IR. ה-ITB ממשיך לטיביה אז הוא מייצב את הברך מבחוץ, בלי להיות כופף ברך אמיתי.",
    becauseEn: "Front-side of the hip: flex, abduct, IR. ITB steadies the knee laterally.",
  },
  piriformis: {
    sideHe: "סקרום קדמי → greater trochanter, מאחורי הירך",
    sideEn: "Front of sacrum to greater trochanter, behind the hip",
    crossesHe: "ירך מאחור",
    crossesEn: "Posterior hip",
    becauseHe:
      "רצועה קצרה מאחורי צוואר הירך. בעמידה (ירך בפישוט) היא מסובבת את הירך החוצה. מעל 90° כפיפה קו המשיכה מתהפך — לכן במבחן: ER ביישור, לפעמים IR בכפיפה.",
    becauseEn: "A short posterior strap: ER in extension; the line of pull flips past 90° flexion.",
  },
  sartorius: {
    sideHe: "ASIS → טיביה מדיאלית, רצועה אלכסונית מעל הירך",
    sideEn: "ASIS to medial tibia, a long diagonal strap",
    crossesHe: "ירך + ברך (דו־מפרקי)",
    crossesEn: "Hip and knee",
    becauseHe:
      "השריר הארוך בגוף, באלכסון של ״רגל על רגל״. בירך הוא קדמי-לטרלי (כפיפה, הרחקה, ER). בברך הוא מגיע מאחור-מדיאלית ל-pes anserinus — ושם הברך הפוכה: אחורי = כפיפה.",
    becauseEn: "Tailor’s pose: flex/abduct/ER the hip, then flex the knee from the pes anserinus.",
  },
  pectineus: {
    sideHe: "חיק → מתחת לטרוכנטר הקטן, מדיאלי-קדמי",
    sideEn: "Pubis to femur, medial-anterior",
    crossesHe: "ירך",
    crossesEn: "Hip",
    becauseHe: "קרוב לחיק ומקדימה לירך. מדיאלי = קרוב, קדמי = כפיפה. הגשר בין מקרבים לכופפים.",
    becauseEn: "Medial + anterior hip: adduct and flex. The bridge between adductors and flexors.",
  },
  "adductor-longus": {
    sideHe: "חיק → linea aspera, מדיאלי",
    sideEn: "Pubis to linea aspera",
    crossesHe: "ירך, מבפנים",
    crossesEn: "Medial hip",
    becauseHe: "השם: Adductor. כולם מתחילים בחיק ונאחזים בצד הפנימי של הירך. קיצור מקרב את הירך לקו האמצע. קצת כפיפה כי הוא לא לגמרי מאחור.",
    becauseEn: "The name is the job. Pubis to the inside of the femur = adduct (and a little flexion).",
  },
  "adductor-brevis": {
    sideHe: "חיק → linea aspera פרוקסימלית",
    sideEn: "Pubis to proximal linea aspera",
    crossesHe: "ירך, מבפנים",
    crossesEn: "Medial hip",
    becauseHe: "אותו תא, רק קצר ועמוק יותר. מדיאלי = קרוב. אל תחפשו הבדל דרמטי בפעולה — המיקום זהה.",
    becauseEn: "Same medial compartment, shorter and deeper. Adduction.",
  },
  "adductor-magnus": {
    sideHe: "חיק + ישבן → כל ה-linea aspera",
    sideEn: "Pubis and ischium down the linea aspera",
    crossesHe: "ירך, חלק קדמי וחלק אחורי",
    crossesEn: "Hip, both front and back fibers",
    becauseHe:
      "שריר עם שני אישיות. כולו מדיאלי = קרוב. החלק הקדמי מהחיק קצת כופף. החלק האחורי מ-ischial tuberosity הוא ״המסטרינג״ — אחורי לירך = פשיטה.",
    becauseEn: "All of it adducts. Front fibers flex; the ischial hamstring part extends.",
  },
  gracilis: {
    sideHe: "חיק → טיביה מדיאלית",
    sideEn: "Pubis to medial tibia",
    crossesHe: "ירך + ברך",
    crossesEn: "Hip and knee",
    becauseHe:
      "המקרב היחיד שחוצה ברך (נאחז ב-pes anserinus). בירך מדיאלי = קרוב. בברך הוא מגיע מבפנים-מאחור = כפיפה + רוטציה מדיאלית של הטיביה.",
    becauseEn: "Only adductor that crosses the knee, so it adducts the hip and flexes the knee.",
  },
  "rectus-femoris": {
    sideHe: "AIIS → פיקה → גבשון הטיביה, קדמי",
    sideEn: "AIIS to tibial tuberosity, straight down the front",
    crossesHe: "ירך + ברך",
    crossesEn: "Hip and knee",
    becauseHe:
      "היחיד מהארבע-ראשי שמתחיל על האגן. קדמי לירך = כפיפת ירך. קדמי לברך = פשיטת ברך (זוכרים? ברך הפוכה). שלושת ה-vastus לא נוגעים בירך.",
    becauseEn: "Only quad that crosses the hip: flex hip + extend knee. The vasti skip the hip.",
  },
  "vastus-lateralis": {
    sideHe: "גוף הירך לטרלי → פיקה",
    sideEn: "Lateral femur to the patella",
    crossesHe: "ברך מקדימה בלבד",
    crossesEn: "Knee only, anterior",
    becauseHe: "מתחיל על הירך, לא על האגן — לא חוצה ירך. קדמי לברך = פשיטה. זה הכל. אל תחפשו כפיפה.",
    becauseEn: "Femur to tibia in front of the knee: extend only. No hip.",
  },
  "vastus-medialis": {
    sideHe: "גוף הירך מדיאלי → פיקה",
    sideEn: "Medial femur to the patella",
    crossesHe: "ברך מקדימה בלבד",
    crossesEn: "Knee only, anterior",
    becauseHe: "אותה פשיטת ברך כמו שאר ה-vastus. הסיבים האלכסוניים (VMO) מושכים את הפיקה פנימה כדי שלא תברח לטרלית.",
    becauseEn: "Knee extension, plus VMO fibers that keep the patella from drifting laterally.",
  },
  "vastus-intermedius": {
    sideHe: "גוף הירך באמצע, מתחת ל-RF",
    sideEn: "Middle of the femoral shaft, under RF",
    crossesHe: "ברך מקדימה בלבד",
    crossesEn: "Knee only, anterior",
    becauseHe: "העמוק שבקדמת הירך. חוצה רק ברך מקדימה = פשיטה טהורה. בלי דרמה, בלי ירך.",
    becauseEn: "Deep anterior femur to the patella: pure knee extension.",
  },
  "biceps-femoris": {
    sideHe: "אחורי-לטרלי של הירך → ראש הפיבולה",
    sideEn: "Posterior-lateral thigh to the fibular head",
    crossesHe: "ברך מאחור; הראש הארוך גם ירך",
    crossesEn: "Knee; long head also hip",
    becauseHe:
      "אחורי לברך = כפיפה (ברך הפוכה). הראש הארוך מ-ischial tuberosity חוצה גם ירך מאחור = פשיטת ירך. הראש הקצר מתחיל על הירך — רק ברך. נאחז בפיבולה לטרלית, אז גם מסובב את הטיביה החוצה.",
    becauseEn: "Behind the knee = flex. Long head also extends the hip. Fibular insertion externally rotates the tibia.",
  },
  semitendinosus: {
    sideHe: "ischial tuberosity → pes anserinus מדיאלי",
    sideEn: "Ischial tuberosity to pes anserinus",
    crossesHe: "ירך מאחור + ברך מאחור-מדיאלית",
    crossesEn: "Posterior hip and medial knee",
    becauseHe:
      "המסטרינג מדיאלי. אחורי לירך = פשיטה. אחורי לברך = כפיפה. אחיזה מדיאלית על הטיביה = רוטציה פנימה. הזוג של הדו-ראשי מהצד השני.",
    becauseEn: "Medial hamstring: extend hip, flex knee, internally rotate the tibia.",
  },
  semimembranosus: {
    sideHe: "אותו מוצא, אחיזה עמוקה יותר על הטיביה",
    sideEn: "Same origin, deeper medial tibial insertion",
    crossesHe: "ירך מאחור + ברך מאחור-מדיאלית",
    crossesEn: "Posterior hip and medial knee",
    becauseHe: "תאום של החצי-גידי: אותו תא, אותה פעולה. אחורי + מדיאלי = פשיטת ירך, כפיפת ברך, IR של הטיביה.",
    becauseEn: "Semitendinosus’s deeper twin. Same posterior-medial logic.",
  },
  gastrocnemius: {
    sideHe: "קונדילים אחוריים של הירך → עקב",
    sideEn: "Posterior femoral condyles to the heel",
    crossesHe: "ברך מאחור + קרסול מאחור",
    crossesEn: "Posterior knee and ankle",
    becauseHe:
      "דו־מפרקי אחורי. אחורי לברך = כפיפה. אחורי לקרסול, נאחז בעקב = פלנטרפלקשן (ללחוץ גז). הסוליה חזקה יותר בעמידה כי הגסטרו נח כשהברך כפופה.",
    becauseEn: "Behind both joints: flex the knee and plantarflex the ankle. Weakens when the knee is bent.",
  },
  soleus: {
    sideHe: "אחורי השוק, מתחת לתאומים",
    sideEn: "Deep posterior leg",
    crossesHe: "קרסול מאחור בלבד",
    crossesEn: "Ankle only",
    becauseHe:
      "מתחיל על טיביה/פיבולה — לא חוצה ברך. אחורי לקרסול + אכילס לעקב = פלנטרפלקשן טהור. שריר היציבה בעמידה (ברך ישרה או כפופה).",
    becauseEn: "Does not cross the knee. Posterior ankle to the heel = pure plantar flexion, especially in stance.",
  },
  plantaris: {
    sideHe: "מעל הקונדיל הלטרלי → עקב",
    sideEn: "Lateral femoral ridge to the heel",
    crossesHe: "ברך + קרסול מאחור",
    crossesEn: "Posterior knee and ankle",
    becauseHe: "גרסה חלשה של התאומים. אותה גומייה אחורית: כפיפת ברך + פלנטרפלקשן. לעיתים חסר.",
    becauseEn: "A tiny gastrocnemius: weak knee flexion and plantar flexion.",
  },
  "tibialis-anterior": {
    sideHe: "קדמת השוק → צד מדיאלי של כף הרגל",
    sideEn: "Front of the tibia to the medial foot",
    crossesHe: "קרסול מקדימה, נאחז מדיאלית",
    crossesEn: "Anterior ankle, medial foot",
    becauseHe:
      "קדמי לקרסול = דורסיפלקשן (עקבים, לא בהונות). האחיזה בצד הפנימי של כף הרגל מושכת את הסוליה פנימה = היפוך. חולשה = drop foot.",
    becauseEn: "Front of the ankle lifts the foot; medial insertion also inverts it.",
  },
  "tibialis-posterior": {
    sideHe: "אחורי עמוק → עצם הסירה / קשת מדיאלית",
    sideEn: "Deep posterior leg to the navicular / medial arch",
    crossesHe: "קרסול מאחור, נאחז מדיאלית",
    crossesEn: "Posterior ankle, medial foot",
    becauseHe:
      "אחורי = פלנטרפלקשן. מדיאלי (navicular) = היפוך ותמיכה בקשת. אותו ״טיביאליס״ כמו הקדמי להיפוך, אבל מאחור אז גם לוחץ גז במקום להרים את כף הרגל.",
    becauseEn: "The posterior tibialis: plantarflex and invert, and hold up the medial arch.",
  },
  "fibularis-longus": {
    sideHe: "פיבולה לטרלית → מתחת לכף הרגל למטטרסל 1",
    sideEn: "Lateral fibula, under the foot to metatarsal 1",
    crossesHe: "קרסול מאחור-לטרלית + תת-קרסולי",
    crossesEn: "Lateral ankle / subtalar",
    becauseHe:
      "Fibularis = על הפיבולה, בצד החיצוני. לטרלי לקרסול = אוורסיה (סוליה החוצה). הגיד עובר מאחורי המלאולוס הלטרלי אז גם פלנטרפלקשן, וחוצה מתחת לקשת.",
    becauseEn: "Lateral compartment: evert. Behind the lateral malleolus so it also plantarflexes.",
  },
  "fibularis-brevis": {
    sideHe: "פיבולה דיסטלית → בסיס מטטרסל 5",
    sideEn: "Distal fibula to the 5th metatarsal",
    crossesHe: "קרסול לטרלי",
    crossesEn: "Lateral ankle",
    becauseHe: "אותו תא לטרלי, אחיזה ישירה בצד החיצוני של כף הרגל. אוורסיה נקייה, עם קצת פלנטרפלקשן. הנקודה שנשברת בנקע חזק.",
    becauseEn: "Same eversion family, straight onto metatarsal 5.",
  },
  "extensor-hallucis-longus": {
    sideHe: "קדמת השוק → גליל הבוהן",
    sideEn: "Anterior leg to the big-toe distal phalanx",
    crossesHe: "קרסול מקדימה + בוהן",
    crossesEn: "Anterior ankle and hallux",
    becauseHe: "Extensor + Hallucis: פושט בוהן. קדמי לקרסול אז גם מסייע בדורסיפלקשן. השם עושה את העבודה.",
    becauseEn: "Name = job: extend the big toe, and help dorsiflex.",
  },
  "flexor-hallucis-longus": {
    sideHe: "אחורי הפיבולה → גליל הבוהן מלמטה",
    sideEn: "Posterior fibula to the plantar big toe",
    crossesHe: "קרסול מאחור + בוהן מלמטה",
    crossesEn: "Posterior ankle and plantar hallux",
    becauseHe: "Flexor + Hallucis: כופף בוהן (דחיפת הליכה). אחורי לקרסול = פלנטרפלקשן מסייע, ותומך בקשת המדיאלית.",
    becauseEn: "Name = job: flex the big toe. Posterior ankle so it also helps plantarflex.",
  },
};

export function whyById(id: string) {
  return MUSCLE_WHY[id];
}

export function logicByRegion(region: RegionId) {
  return REGION_LOGIC.find((r) => r.region === region);
}
