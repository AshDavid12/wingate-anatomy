import type { Joint } from "./types";

export const joints: Joint[] = [
  {
    id: "gh",
    nameHe: "מפרק הכתף",
    nameEn: "Glenohumeral (shoulder) joint",
    bones: ["scapula", "humerus"],
    typeHe: "סינוביאלי כדורי",
    typeEn: "Ball-and-socket synovial",
    movements: [
      "Flexion / extension",
      "Abduction / adduction",
      "Internal / external rotation",
      "Horizontal abduction / adduction",
      "Circumduction",
    ],
    notes: "ראש ההומרוס ב-glenoid fossa. יציבות בעיקר שרירית (rotator cuff).",
  },
  {
    id: "st",
    nameHe: "מפרק שכמה–חזה",
    nameEn: "Scapulothoracic joint",
    bones: ["scapula", "ribs"],
    typeHe: "מפרק פיזיולוגי (לא סינוביאלי)",
    typeEn: "Physiological (not a true synovial joint)",
    movements: [
      "Elevation / depression",
      "Protraction / retraction",
      "Upward / downward rotation",
    ],
    notes: "השכמה מחליקה על בית החזה. יחס סקפולוהומרלי ~2:1 בהרחקה.",
  },
  {
    id: "sc",
    nameHe: "מפרק סטרנום–בריח",
    nameEn: "Sternoclavicular joint",
    bones: ["sternum", "clavicle"],
    typeHe: "סינוביאלי אוכפי",
    typeEn: "Saddle synovial",
    movements: ["Elevation / depression, protraction / retraction, rotation of clavicle"],
    notes: "החיבור היחיד של הגף העליון לשלד הציר — חשוב במבחן.",
  },
  {
    id: "ac",
    nameHe: "מפרק אקרומיון–בריח",
    nameEn: "Acromioclavicular joint",
    bones: ["scapula", "clavicle"],
    typeHe: "סינוביאלי שטוח",
    typeEn: "Plane synovial",
    movements: ["התאמת זווית השכמה ביחס לבריח"],
    notes: "פציעה שכיחה: AC separation.",
  },
  {
    id: "elbow",
    nameHe: "מפרק המרפק",
    nameEn: "Elbow joint",
    bones: ["humerus", "ulna", "radius"],
    typeHe: "סינוביאלי צירי (hinge) + פיבוט ברדיו-אולנרי",
    typeEn: "Hinge + pivot",
    movements: ["Flexion / extension", "Pronation / supination (proximal radioulnar)"],
  },
  {
    id: "wrist",
    nameHe: "מפרק שורש כף היד",
    nameEn: "Radiocarpal joint",
    bones: ["radius", "carpals"],
    typeHe: "סינוביאלי אליפסואידי",
    typeEn: "Ellipsoid synovial",
    movements: ["Flexion / extension", "Radial / ulnar deviation"],
  },
  {
    id: "hip",
    nameHe: "מפרק הירך",
    nameEn: "Hip joint",
    bones: ["ilium", "ischium", "pubis", "femur"],
    typeHe: "סינוביאלי כדורי, רב-צירי (ball & socket)",
    typeEn: "Ball-and-socket synovial, multiaxial",
    movements: [
      "Flexion / extension",
      "Abduction / adduction",
      "Internal / external rotation",
      "כל התנועות בכל המישורים",
    ],
    notes: "Femur (head) + Coxa (acetabulum). יציב יותר מהכתף.",
    details: [
      {
        title: "עצמות המשתתפות",
        items: ["Femur — ראש הירך (head)", "Coxa — acetabulum של עצם האגן"],
      },
      {
        title: "יציבות המפרק",
        items: [
          "מפרק יציב מאוד, בעל התאמה מבנית",
          "קפסולה הדוקה",
          "Labrum התורם ליציבות",
          "מגוון רצועות מייצבות ומגוון שרירים מייצבים",
        ],
      },
      {
        title: "רצועות המפרק",
        items: [
          "Iliofemoral — קדמית, מ-AIIS אל הירך (Y)",
          "Pubofemoral — מהחיק אל הירך",
          "Ischiofemoral — אחורית, מה-ischium אל הטרוכנטר הגדול",
        ],
      },
      {
        title: "שרירים מניעים (מהמצגת)",
        items: [
          "Iliopsoas (psoas + iliacus) — כפיפה",
          "TFL — הרחקה, כפיפה, רוטציה מדיאלית",
          "Gluteus maximus / medius / minimus",
          "מקרבי הירך: pectineus, adductor longus/brevis/magnus, gracilis",
        ],
      },
    ],
  },
  {
    id: "knee",
    nameHe: "מפרק הברך",
    nameEn: "Knee joint",
    bones: ["femur", "tibia", "patella"],
    typeHe: "סינוביאלי צירי חד-צירי + מפרק פטלوفמורלי מחליק",
    typeEn: "Uniaxial synovial hinge + patellofemoral gliding",
    movements: ["Flexion / extension במישור הסגיטלי", "סיבוב קל בכפיפה"],
    notes: "שני מפרקים: tibiofemoral ו-patellofemoral. הפיקה שזורה בגיד הארבע-ראשי.",
    details: [
      {
        title: "Tibiofemoral",
        items: [
          "עצמות: Femur (condyles) + Tibia (tibial plateau)",
          "סוג: סינוביאלי, חד-צירי (uniaxial)",
          "תנועות: כפיפה ופשיטה במישור הסגיטלי",
        ],
      },
      {
        title: "Patellofemoral",
        items: [
          "עצמות: Femur (patellar surface) + Patella",
          "סוג: סינוביאלי, gliding",
          "הפיקה שזורה בתוך גיד הארבע-ראשי — עצם ססמואידית",
        ],
      },
      {
        title: "רצועות צידיות",
        items: [
          "LCL — רצועה צידית חיצונית: מונעת קריסה החוצה (varus)",
          "MCL — רצועה צידית פנימית: מונעת קריסה פנימה (valgus)",
          "שתיהן מונעות תנועה עודפת במישור הפרונטלי ושומרות על יציבות מדיאלית–לטרלית",
        ],
      },
      {
        title: "רצועות צולבות",
        items: [
          "ACL — רצועה צולבת קדמית",
          "PCL — רצועה צולבת אחורית",
          "מונעות תנועה עודפת במישור הסגיטלי וההוריזונטלי",
        ],
      },
      {
        title: "יישור הברך — genu",
        items: ["Genu varus — רגלי O", "Genu valgus — רגלי X"],
      },
      {
        title: "מניסקוסים (סחוס סיבי)",
        items: [
          "מניסקוס לטרלי ומניסקוס מדיאלי",
          "תפקידים: בלימת זעזועים, מניעת חיכוך, תאום בין חלקי המפרק, פיזור הנוזל הסינוביאלי",
          "סימני קרע: כאב חד ופתאומי, הצטברות נוזל סינוביאלי, ברך «נעולה» (קושי ביישור)",
        ],
      },
      {
        title: "בעייתיות הסחוס ודרגות פגיעה",
        items: [
          "אין אספקת דם ישירה = אין התחדשות אחרי נזק; אין עצבוב ישיר = אין כאב בשלבים הראשונים",
          "דרגה 1: לחץ נקודתי ממושך → שלפוחית על הסחוס",
          "דרגה 2: סדקים בתוך הסחוס",
          "דרגה 3: מחסור בסחוס באזור — העצם חשופה",
          "דרגה 4: כמו 3 אך בהיקף רחב — שחיקת סחוס (אופייני לגיל מבוגר)",
          "בדרגות 1–2 לעיתים אין כאב; ב-3–4 כאב בעיקר בהעמסת משקל",
        ],
      },
      {
        title: "פתולוגיות שכיחות במצגת",
        items: [
          "קרע ב-ACL",
          "דלקת בבורסה אינפרה-פטלרית (infrapatellar bursitis)",
          "אוסגוד-שלטר: בגילאי 9–16, עומס חוזר על גיד הפיקה ולוחית הצמיחה בגבשון הטיביה — אופייני לריצה וקפיצה",
        ],
      },
      {
        title: "שרירים מניעים (מהמצגת)",
        items: [
          "ארבע-ראשי: rectus femoris, vastus lateralis / medialis / intermedius — פשיטת ברך",
          "המסטרינג: biceps femoris, semitendinosus, semimembranosus — כפיפת ברך",
          "Gastrocnemius מסייע בכפיפת ברך",
        ],
      },
    ],
  },
  {
    id: "ankle",
    nameHe: "מפרק הקרסול",
    nameEn: "Talocrural (ankle) joint",
    bones: ["tibia", "fibula", "talus"],
    typeHe: "סינוביאלי צירי חד-צירי",
    typeEn: "Uniaxial synovial hinge",
    movements: ["Dorsiflexion / plantar flexion במישור הסגיטלי"],
    notes: "Tibia + Fibula + Talus. Inversion/eversion בעיקר ב-subtalar. פתולוגיה שכיחה: ankle sprain.",
    details: [
      {
        title: "עצמות המשתתפות",
        items: ["Tibia", "Fibula", "Talus"],
      },
      {
        title: "סוג ותנועות",
        items: [
          "סינוביאלי, חד-צירי (uniaxial)",
          "Dorsi + plantar flexion — כפיפה גבית וכפיפה כפית, במישור הסגיטלי",
        ],
      },
      {
        title: "פתולוגיה",
        items: ["Ankle sprain — נקע בקרסול (הפתולוגיה השכיחה במצגת)"],
      },
      {
        title: "שרירים מניעים (מהמצגת)",
        items: [
          "Gastrocnemius — פלנטרפלקשן + סיוע בכפיפת ברך",
          "Soleus — פלנטרפלקשן בלבד (לא חוצה את הברך)",
          "Tibialis anterior — דורסיפלקשן; אחז בעצם שורש כף הרגל ומסרק 1",
        ],
      },
    ],
  },
  {
    id: "subtalar",
    nameHe: "מפרק תת-קרסולי",
    nameEn: "Subtalar joint",
    bones: ["talus", "calcaneus"],
    typeHe: "סינוביאלי שטוח/מישורי",
    typeEn: "Plane synovial",
    movements: ["Inversion / eversion", "Pronation / supination of the foot"],
  },
];
