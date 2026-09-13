export const movementTerms = [
  { en: "Flexion", he: "כפיפה", note: "Decrease the joint angle · הקטנת הזווית במפרק" },
  { en: "Extension", he: "פשיטה", note: "Increase the angle / return from flexion · הגדלת הזווית / חזרה מכפיפה" },
  { en: "Abduction", he: "הרחקה", note: "Away from the midline · הרחקה מקו האמצע" },
  { en: "Adduction", he: "קרוב", note: "Toward the midline · קרוב אל קו האמצע" },
  { en: "Horizontal abduction", he: "הרחקה אופקית", note: "Shoulder, in the horizontal plane · בכתף, במישור האופקי" },
  { en: "Horizontal adduction", he: "קרוב אופקי", note: "Shoulder, in the horizontal plane · בכתף, במישור האופקי" },
  { en: "Internal (medial) rotation", he: "רוטציה מדיאלית", note: "Spin inward around the long axis · סיבוב פנימה סביב ציר האורך" },
  { en: "External (lateral) rotation", he: "רוטציה לטרלית", note: "Spin outward around the long axis · סיבוב החוצה סביב ציר האורך" },
  { en: "Upward rotation", he: "סיבוב מעלה", note: "Scapula — glenoid faces up · בשכמה — glenoid פונה מעלה" },
  { en: "Downward rotation", he: "סיבוב מטה", note: "Scapula — glenoid faces down · בשכמה — glenoid פונה מטה" },
  { en: "Elevation", he: "הרמה", note: "Scapula upward · שכמה כלפי מעלה" },
  { en: "Depression", he: "הורדה", note: "Scapula downward · שכמה כלפי מטה" },
  { en: "Protraction", he: "הרחקת שכמות", note: "Scapula forward around the ribcage · שכמה קדימה על בית החזה" },
  { en: "Retraction", he: "קרוב שכמות", note: "Scapula back toward the spine · שכמה אחורה לעמוד השדרה" },
  { en: "Dorsiflexion", he: "דורסיפלקשן", note: "Lift the foot toward the shin · קירוב גב כף הרגל לשוק" },
  { en: "Plantar flexion", he: "פלנטרפלקשן", note: "Point the foot / press the gas · הרמת עקבים / כפיפה כפית" },
  { en: "Inversion", he: "היפוך", note: "Sole faces inward · סוליית כף הרגל פונה פנימה" },
  { en: "Eversion", he: "אוורסיה", note: "Sole faces outward · סוליית כף הרגל פונה החוצה" },
  { en: "Pronation", he: "פרונציה", note: "Forearm: palm back. Foot: eversion + abduction · אמה: גב כף היד קדימה" },
  { en: "Supination", he: "סופינציה", note: "Forearm: palm forward (anatomical position) · אמה: כף היד קדימה" },
  { en: "Circumduction", he: "סיבוב מעגלי", note: "Combo of flexion, abduction, extension, adduction · שילוב כפיפה, הרחקה, פשיטה וקרוב" },
];

export const directionalTerms = [
  { en: "Superior", he: "עליון" },
  { en: "Inferior", he: "תחתון" },
  { en: "Anterior", he: "קדמי" },
  { en: "Posterior", he: "אחורי" },
  { en: "Medial", he: "תיכון — קרוב לקו האמצע" },
  { en: "Lateral", he: "צידי — רחוק מקו האמצע" },
  { en: "Proximal", he: "מקורב — קרוב לכתף או לירך" },
  { en: "Distal", he: "מרוחק — רחוק מהכתף או הירך" },
  { en: "Superficial", he: "שטחי" },
  { en: "Deep (profundus)", he: "עמוק" },
];

export const keyConcepts = [
  {
    titleEn: "Origin / Insertion / Action",
    titleHe: "התחלה · סיום · תנועה",
    bodyHe:
      "Origin (התחלה) — נקודת האחיזה הקרובה יותר למרכז הגוף או היציבה יותר. Insertion (סיום) — הנקודה שנעה יותר. Action נגזר משלושה דברים בלבד: כיוון המשיכה (השריר רק מושך), אילו מפרקים הוא חוצה, ובאיזה צד של המפרק הוא יושב.",
    bodyEn:
      "Origin is the more stable / proximal attachment. Insertion is the moving end. Action comes from three things only: the pull direction (muscles only pull), which joints it crosses, and which side of the joint it sits on.",
  },
  {
    titleEn: "How to remember action without memorizing",
    titleHe: "איך זוכרים תנועה בלי לשנן",
    bodyHe:
      "קדמי=כפיפה, אחורי=פשיטה, לטרלי=הרחקה, מדיאלי=קרוב. הברך הפוכה (קדמי פושט). תא שלם חולק עבודה. השם הלטיני (flexor, adductor, levator) הוא לעיתים התשובה עצמה.",
    bodyEn:
      "Anterior flexes, posterior extends, lateral abducts, medial adducts. The knee is reversed (front extends). A whole compartment shares the job. The Latin name (flexor, adductor, levator) is often the answer.",
  },
  {
    titleEn: "Anatomical position",
    titleHe: "עמידה אנטומית",
    bodyHe:
      "אדם זקוף, רגליים צמודות, בהונות קדימה, ידיים לצדי הגוף, כפות ידיים קדימה (סופינציה, אגודלים החוצה). כל תיאור אנטומי מתייחס לעמדה זו.",
    bodyEn:
      "Standing upright, feet together, toes forward, arms at the sides, palms forward (supination, thumbs out). Every anatomical description refers to this stance.",
  },
  {
    titleEn: "Axial vs appendicular skeleton",
    titleHe: "שלד ציר מול שלד תוספת",
    bodyHe: "Axial skeleton: גולגולת, עמוד שדרה, בית חזה. Appendicular: חגורת כתף + גף עליון, וחגורת אגן + גף תחתון.",
    bodyEn:
      "Axial: skull, spine, thorax. Appendicular: shoulder girdle + upper limb, and pelvic girdle + lower limb.",
  },
  {
    titleEn: "Bone types",
    titleHe: "סוגי עצמות",
    bodyHe:
      "ארוכות — מנוף לתנועה (גפיים). שטוחות — הגנה (גולגולת, שכמה, אגן, צלעות). קצרות — שורש כף יד/רגל. חסרות צורה — חוליות, פנים. ססמואידיות — בתוך גיד (פיקה).",
    bodyEn:
      "Long — levers for movement (limbs). Flat — protection (skull, scapula, pelvis, ribs). Short — wrist/ankle. Irregular — vertebrae, face. Sesamoid — inside a tendon (patella).",
  },
  {
    titleEn: "Rotator cuff — SITS",
    titleHe: "מייצבי הכתף",
    bodyHe:
      "Supraspinatus, Infraspinatus, Teres minor, Subscapularis. SIT יושבים על הגבשון הגדול (עליון/אמצעי/תחתון). Sub לבד על הגבשון הקטן. Teres major אינו חלק מהקבוצה.",
    bodyEn:
      "Supraspinatus, Infraspinatus, Teres minor, Subscapularis. SIT sit on the greater tubercle (top/middle/bottom). Sub sits on the lesser. Teres major is not in the group.",
  },
  {
    titleEn: "Quadriceps and hamstrings",
    titleHe: "ארבע-ראשי והמסטרינג",
    bodyHe:
      "Quadriceps: RF + VL + VM + VI — כולם פושטי ברך; רק RF גם כופף ירך. Hamstrings: BF + ST + SM — כופפי ברך ופושטי ירך (הראש הקצר של BF לא חוצה ירך).",
    bodyEn:
      "Quads: RF + VL + VM + VI — all extend the knee; only RF also flexes the hip. Hamstrings: BF + ST + SM — flex the knee and extend the hip (BF short head skips the hip).",
  },
  {
    titleEn: "Origin / Insertion groups",
    titleHe: "קבוצות Origin / Insertion",
    bodyHe:
      "זוכרים נקודת אחיזה, לא שריר בודד. CAS = טרפז נגמר / דלתואיד מתחיל. PCB = עורב. PLT = גברת בין שני מייג׳ורים. PFPF = אפיקונדיל מדיאלי. SGT = pes anserinus. PALMG = חמישה מהחיק.",
    bodyEn:
      "Memorize the parking spot, not one muscle. CAS = trap ends / deltoid begins. PCB = coracoid. PLT = lady between two majors. PFPF = medial epicondyle. SGT = pes anserinus. PALMG = five from the pubis.",
  },
];
