import { muscles } from "./muscles";
import type { RegionId } from "./regions";

export type OiKind = "origin" | "insertion" | "both";

export type OiHook = {
  id: string;
  acronym: string;
  titleEn: string;
  titleHe: string;
  kind: OiKind;
  landmarkEn: string;
  landmarkHe: string;
  hookEn: string;
  hookHe: string;
  detailEn: string;
  detailHe: string;
  muscleIds: string[];
  regions: RegionId[];
};

export const OI_HOOKS: OiHook[] = [
  {
    id: "cas",
    acronym: "CAS",
    titleEn: "Trap ends, Deltoid begins",
    titleHe: "הטרפז נגמר, הדלתואיד מתחיל",
    kind: "both",
    landmarkEn: "Clavicle + Acromion + Spine of scapula",
    landmarkHe: "בריח + אקרומיון + קוץ השכמה",
    hookEn: "CAS: Clavicle, Acromion, Spine. Trapezius inserts here. Deltoid originates here. Same three points — they handshake.",
    hookHe: "CAS: Clavicle, Acromion, Spine. הטרפז נאחז כאן. הדלתואיד מתחיל כאן. אותן שלוש נקודות — לחיצת יד.",
    detailEn: "Trapezius I = lateral third of clavicle, acromion, scapular spine. Deltoid O = the same three landmarks.",
    detailHe: "טרפז סיום = שליש לטרלי של הבריח, אקרומיון, קוץ השכמה. דלתואיד התחלה = אותן שלוש נקודות.",
    muscleIds: ["trapezius", "deltoid"],
    regions: ["shoulder-girdle", "shoulder"],
  },
  {
    id: "lmm-s",
    acronym: "LMM+S",
    titleEn: "Medial-border stack",
    titleHe: "מגדל הגבול המדיאלי",
    kind: "insertion",
    landmarkEn: "Medial border of the scapula",
    landmarkHe: "הגבול המדיאלי של השכמה",
    hookEn: "From the top: Levator, Minor, Major. Serratus hugs the front of the same border.",
    hookHe: "מלמעלה למטה: Levator, Minor, Major. המסור הקדמי מחבק את אותו גבול מלפנים.",
    detailEn:
      "Levator → superior angle / above the spine. Rhomboid minor → at the spine. Rhomboid major → below the spine. Serratus anterior → anterior surface of the medial border (from ribs 1–8).",
    detailHe:
      "מרים השכמה → זווית עליונה / מעל הקוץ. מעוין קטן → בגובה הקוץ. מעוין גדול → מתחת לקוץ. מסור קדמי → השטח הקדמי של הגבול המדיאלי (מצלעות 1–8).",
    muscleIds: ["levator-scapulae", "rhomboid-minor", "rhomboid-major", "serratus-anterior"],
    regions: ["shoulder-girdle"],
  },
  {
    id: "pcb",
    acronym: "PCB",
    titleEn: "The crow holds three",
    titleHe: "העורב מחזיק שלושה",
    kind: "both",
    landmarkEn: "Coracoid process",
    landmarkHe: "מקור העורב (coracoid)",
    hookEn: "The crow (coracoid) holds PCB: Pec minor, Coracobrachialis, Biceps short head.",
    hookHe: "העורב (coracoid) מחזיק PCB: Pec minor, Coracobrachialis, הראש הקצר של הדו-ראשי.",
    detailEn:
      "Pec minor I = coracoid (from ribs 3–5). Coracobrachialis O = coracoid. Biceps short head O = coracoid. Two leave the crow; one arrives.",
    detailHe:
      "חזה קטן נאחז במקור העורב (מצלעות 3–5). Coracobrachialis והראש הקצר של הביצפס מתחילים שם. שניים יוצאים מהעורב, אחד מגיע.",
    muscleIds: ["pectoralis-minor", "coracobrachialis", "biceps-brachii"],
    regions: ["shoulder-girdle", "shoulder", "arm"],
  },
  {
    id: "sits",
    acronym: "SITS",
    titleEn: "Rotator cuff attachments",
    titleHe: "אחיזות מייצבי הכתף",
    kind: "both",
    landmarkEn: "Greater tubercle (SIT) and lesser tubercle (Sub)",
    landmarkHe: "גבשון גדול (SIT) וגבשון קטן (Sub)",
    hookEn: "SIT sit on the greater tubercle — top, middle, bottom. Sub sits alone on the lesser. Origins match the fossae in the name.",
    hookHe: "SIT יושבים על הגבשון הגדול — עליון, אמצעי, תחתון. Sub לבד על הגבשון הקטן. ה-origin הוא הגומה שבשם.",
    detailEn:
      "Supraspinatus: supraspinous fossa → superior facet of greater tubercle. Infraspinatus: infraspinous fossa → middle facet. Teres minor: lateral border → inferior facet. Subscapularis: subscapular fossa → lesser tubercle. Teres major is not SITS.",
    detailHe:
      "על-קוצי: גומה על-קוצית → פן עליון של הגבשון הגדול. תת-קוצי: גומה תת-קוצית → פן אמצעי. עגול קטן: גבול לטרלי → פן תחתון. תת-שכמתי: גומה תת-שכמתית → גבשון קטן. העגול הגדול אינו SITS.",
    muscleIds: ["supraspinatus", "infraspinatus", "teres-minor", "subscapularis"],
    regions: ["shoulder"],
  },
  {
    id: "lady",
    acronym: "PLT",
    titleEn: "A lady between two majors",
    titleHe: "גברת בין שני מייג׳ורים",
    kind: "insertion",
    landmarkEn: "Intertubercular (bicipital) groove of the humerus",
    landmarkHe: "התלם הבין-גבשוני בהומרוס",
    hookEn: "A lady (Lat) between two majors: Pec major = lateral lip, Lat = floor, Teres major = medial lip.",
    hookHe: "גברת (Lat) בין שני majors: חזה גדול = שפה לטרלית, רחב גבי = רצפה, עגול גדול = שפה מדיאלית.",
    detailEn: "Lateral → medial: Pectoralis major, Latissimus dorsi, Teres major. Same groove, three parking spots.",
    detailHe: "מלטרלי למדיאלי: חזה גדול, רחב גבי, עגול גדול. אותו תלם, שלוש חניות.",
    muscleIds: ["pectoralis-major", "latissimus-dorsi", "teres-major"],
    regions: ["shoulder"],
  },
  {
    id: "bbb",
    acronym: "3B",
    titleEn: "Three B's bend the elbow",
    titleHe: "שלושה B כופפים מרפק",
    kind: "both",
    landmarkEn: "Radius / ulna / radial styloid",
    landmarkHe: "רדיוס / אולנה / זיז הרדיוס",
    hookEn: "3 B's bend the elbow. Biceps → Radius. Brachialis → ulna. BR → styloid.",
    hookHe: "3 B כופפים את המרפק. Biceps לרדיוס. Brachialis לאולנה. BR לזיז הרדיוס.",
    detailEn:
      "Biceps O = scapula (supraglenoid + coracoid), I = radial tuberosity. Brachialis O = anterior humerus, I = ulnar tuberosity. Brachioradialis O = lateral supracondylar ridge, I = radial styloid.",
    detailHe:
      "דו-ראשי: שכמה (על-גלנואיד + עורב) → גבשון הרדיוס. ברכיאליס: הומרוס קדמי → גבשון האולנה. ברכיורדיאליס: רכס על-קונדיל לטרלי → זיז הרדיוס.",
    muscleIds: ["biceps-brachii", "brachialis", "brachioradialis"],
    regions: ["arm"],
  },
  {
    id: "olecranon",
    acronym: "3→O",
    titleEn: "Three heads, one olecranon",
    titleHe: "שלושה ראשים, אולקרנון אחד",
    kind: "both",
    landmarkEn: "Olecranon of the ulna",
    landmarkHe: "האולקרנון של האולנה",
    hookEn: "Triceps: three heads, one finish. Long head from the scapula (infraglenoid). The other two from the humerus. Anconeus tags along.",
    hookHe: "תלת-ראשי: שלושה ראשים, סיום אחד. הראש הארוך מהשכמה (תת-גלנואיד). השניים האחרים מההומרוס. Anconeus נצמד אליהם.",
    detailEn: "Long head O = infraglenoid tubercle. Lateral and medial heads O = posterior humerus. Shared I = olecranon. Anconeus O = lateral epicondyle, I = lateral olecranon.",
    detailHe: "ראש ארוך התחלה = גבשון תת-גלנואיד. ראשים לטרלי ומדיאלי = הומרוס אחורי. סיום משותף = אולקרנון. Anconeus התחלה = אפיקונדיל לטרלי, סיום = אולקרנון לטרלי.",
    muscleIds: ["triceps-brachii", "anconeus"],
    regions: ["arm"],
  },
  {
    id: "pfpf",
    acronym: "PFPF",
    titleEn: "Pass Fail Pass Fail",
    titleHe: "עובר נכשל עובר נכשל",
    kind: "origin",
    landmarkEn: "Medial epicondyle of the humerus",
    landmarkHe: "אפיקונדיל מדיאלי של ההומרוס",
    hookEn: "Pass Fail Pass Fail — lateral to medial on the common flexor origin: Pronator teres, Flexor carpi radialis, Palmaris longus, Flexor carpi ulnaris.",
    hookHe: "עובר-נכשל-עובר-נכשל — מלטרלי למדיאלי על ה-origin המשותף: Pronator teres, FCR, Palmaris longus, FCU.",
    detailEn: "All four start on the medial epicondyle. FDS sits deeper on the same epicondyle. Golf elbow lives here.",
    detailHe: "ארבעתם מתחילים באפיקונדיל המדיאלי. FDS עמוק יותר על אותו אפיקונדיל. כאן גר גולף אלבו.",
    muscleIds: [
      "pronator-teres",
      "flexor-carpi-radialis",
      "palmaris-longus",
      "flexor-carpi-ulnaris",
      "flexor-digitorum-superficialis",
    ],
    regions: ["forearm"],
  },
  {
    id: "tennis",
    acronym: "CEO",
    titleEn: "Tennis-elbow club",
    titleHe: "מועדון טניס אלבו",
    kind: "origin",
    landmarkEn: "Lateral epicondyle of the humerus",
    landmarkHe: "אפיקונדיל לטרלי של ההומרוס",
    hookEn: "CEO = Common Extensor Origin. Tennis-elbow club on the lateral epicondyle: ECRB, extensor digitorum, ECU, plus anconeus and supinator.",
    hookHe: "CEO = Common Extensor Origin. מועדון טניס אלבו על האפיקונדיל הלטרלי: ECRB, פושט האצבעות, ECU, ועמם anconeus ו-supinator.",
    detailEn: "ECRL is the exception — it starts on the lateral supracondylar ridge, just above the club.",
    detailHe: "ECRL הוא החריג — מתחיל ברכס מעל האפיקונדיל, לא במועדון עצמו.",
    muscleIds: [
      "extensor-carpi-radialis-brevis",
      "extensor-digitorum",
      "extensor-carpi-ulnaris",
      "anconeus",
      "supinator",
    ],
    regions: ["arm", "forearm"],
  },
  {
    id: "scm",
    acronym: "SCM",
    titleEn: "The name is the map",
    titleHe: "השם הוא המפה",
    kind: "both",
    landmarkEn: "Sternum + clavicle → mastoid",
    landmarkHe: "סטרנום + בריח → מסטואיד",
    hookEn: "Sterno-Cleido-Mastoid. Read the name: starts on sternum and clavicle, ends on the mastoid.",
    hookHe: "Sterno-Cleido-Mastoid. קוראים את השם: מתחיל בסטרנום ובבריח, נגמר במסטואיד.",
    detailEn: "O = manubrium + medial third of clavicle. I = mastoid process and superior nuchal line.",
    detailHe: "התחלה = מנובריום + שליש מדיאלי של הבריח. סיום = זיז המסטואיד וקו העורף העליון.",
    muscleIds: ["scm"],
    regions: ["neck-trunk"],
  },
  {
    id: "pockets",
    acronym: "POCKETS",
    titleEn: "Hands in pockets",
    titleHe: "ידיים בכיסים",
    kind: "both",
    landmarkEn: "Ribs ↔ iliac crest / pubis / xiphoid",
    landmarkHe: "צלעות ↔ iliac crest / חיק / זיז החרב",
    hookEn: "External puts hands in pockets: ribs down to the hip. Internal climbs the other way: hip up to the ribs. Rectus is pubis to xiphoid.",
    hookHe: "האלכסון החיצוני מכניס ידיים לכיסים: מצלעות למטה לאגן. הפנימי מטפס הפוך: מהאגן למעלה לצלעות. הישר הבטני מהחיק לזיז החרב.",
    detailEn:
      "Rectus O = pubis, I = costal cartilages 5–7 + xiphoid. External oblique O = ribs 5–12, I = iliac crest / linea alba. Internal oblique O = iliac crest, I = ribs 8–12. Transversus is the belt — it does not flex the trunk.",
    detailHe:
      "ישר בטני התחלה = חיק, סיום = סחוסי צלעות 5–7 + זיז החרב. אלכסון חיצוני התחלה = צלעות 5–12, סיום = iliac crest / linea alba. אלכסון פנימי התחלה = iliac crest, סיום = צלעות 8–12. הרוחבי הוא מחוך — לא מכופף את הגו.",
    muscleIds: ["rectus-abdominis", "external-oblique", "internal-oblique", "transversus-abdominis"],
    regions: ["neck-trunk"],
  },
  {
    id: "spaghetti",
    acronym: "ILS",
    titleEn: "I Love Spaghetti",
    titleHe: "אני אוהב ספגטי",
    kind: "origin",
    landmarkEn: "Common tendon from sacrum and iliac crest",
    landmarkHe: "גיד משותף מסקרום ומסרט הכסל",
    hookEn: "I Love Spaghetti: Iliocostalis, Longissimus, Spinalis — three columns climbing from one sacral / iliac origin.",
    hookHe: "I Love Spaghetti: Iliocostalis, Longissimus, Spinalis — שלוש עמודות שעולות מ-origin אחד בסקרום ובכסל.",
    detailEn: "Lateral to medial: iliocostalis → longissimus → spinalis. They insert on ribs, transverse processes, and the skull base.",
    detailHe: "מלטרלי למדיאלי: iliocostalis → longissimus → spinalis. נאחזים בצלעות, בזיזים רוחביים ובבסיס הגולגולת.",
    muscleIds: ["erector-spinae"],
    regions: ["neck-trunk"],
  },
  {
    id: "ql",
    acronym: "QL",
    titleEn: "Hip to the last rib",
    titleHe: "מהאגן לצלע האחרונה",
    kind: "both",
    landmarkEn: "Iliac crest → 12th rib + L1–L4",
    landmarkHe: "iliac crest → צלע 12 + L1–L4",
    hookEn: "The square of the waist: hip bone to the last rib.",
    hookHe: "הריבוע של המותן: מעצם האגן לצלע האחרונה.",
    detailEn: "O = posterior iliac crest. I = 12th rib and lumbar transverse processes L1–L4.",
    detailHe: "התחלה = iliac crest אחורי. סיום = צלע 12 וזיזים רוחביים L1–L4.",
    muscleIds: ["quadratus-lumborum"],
    regions: ["neck-trunk"],
  },
  {
    id: "lt",
    acronym: "LT",
    titleEn: "Two starts, one dock",
    titleHe: "שתי התחלות, רציף אחד",
    kind: "insertion",
    landmarkEn: "Lesser trochanter of the femur",
    landmarkHe: "הטרוכנטר הקטן של הירך",
    hookEn: "Psoas from the lumbar spine, iliacus from the iliac fossa — both dock on the lesser trochanter as iliopsoas.",
    hookHe: "Psoas מחוליות המותן, iliacus מהגומה הכסלית — שניהם נחים על הטרוכנטר הקטן כאיליופסואס.",
    detailEn: "Psoas O = T12–L5. Iliacus O = iliac fossa. Shared I = lesser trochanter.",
    detailHe: "Psoas התחלה = T12–L5. Iliacus התחלה = iliac fossa. סיום משותף = טרוכנטר קטן.",
    muscleIds: ["psoas-major", "iliacus"],
    regions: ["hip"],
  },
  {
    id: "gt",
    acronym: "GT",
    titleEn: "Greater-trochanter dock",
    titleHe: "רציף הטרוכנטר הגדול",
    kind: "insertion",
    landmarkEn: "Greater trochanter of the femur",
    landmarkHe: "הטרוכנטר הגדול של הירך",
    hookEn: "Greater trochanter is the abductor dock: medius, minimus, plus piriformis.",
    hookHe: "הטרוכנטר הגדול הוא רציף המרחיקים: עכוז אמצעי, עכוז קטן, וגם האגסי.",
    detailEn: "Gluteus medius and minimus from the gluteal fossa. Piriformis from the anterior sacrum. All three insert on the greater trochanter.",
    detailHe: "עכוז אמצעי וקטן מהגומה הגלוטאלית. אגסי מהסקרום הקדמי. שלושתם נאחזים בטרוכנטר הגדול.",
    muscleIds: ["gluteus-medius", "gluteus-minimus", "piriformis"],
    regions: ["hip"],
  },
  {
    id: "asis",
    acronym: "ASIS",
    titleEn: "Two straps leave ASIS",
    titleHe: "שני רצועות יוצאים מ-ASIS",
    kind: "origin",
    landmarkEn: "Anterior superior iliac spine",
    landmarkHe: "ASIS — הזווית הקדמית-עליונה של הכסל",
    hookEn: "Two straps leave ASIS: the tailor (sartorius) and TFL.",
    hookHe: "שני רצועות יוצאים מ-ASIS: החייט (sartorius) וה-TFL.",
    detailEn: "Sartorius runs to pes anserinus. TFL runs into the ITB toward Gerdy's tubercle.",
    detailHe: "החייט רץ ל-pes anserinus. TFL נכנס ל-ITB עד גבשון גרדי.",
    muscleIds: ["sartorius", "tfl"],
    regions: ["hip"],
  },
  {
    id: "aiis",
    acronym: "AIIS",
    titleEn: "The only quad from the hip",
    titleHe: "הקוואד היחיד מהירך",
    kind: "origin",
    landmarkEn: "Anterior inferior iliac spine",
    landmarkHe: "AIIS — מתחת ל-ASIS",
    hookEn: "AIIS = Almost-Iliac Insertion Start of the only quad that flexes the hip. The three vasti stay on the femur.",
    hookHe: "AIIS = ההתחלה של הקוואד היחיד שכופף ירך. שלושת ה-vasti נשארים על עצם הירך.",
    detailEn: "Rectus femoris O = AIIS + acetabular rim. I = tibial tuberosity via the patella (with the other quads).",
    detailHe: "ישר הירך התחלה = AIIS + שפת האצטבולום. סיום = גבשון הטיביה דרך הפיקה (עם שאר הארבע-ראשי).",
    muscleIds: ["rectus-femoris"],
    regions: ["thigh", "hip"],
  },
  {
    id: "palmg",
    acronym: "PALMG",
    titleEn: "Five from the pubis",
    titleHe: "חמישה מהחיק",
    kind: "both",
    landmarkEn: "Pubis → linea aspera (except gracilis)",
    landmarkHe: "חיק → linea aspera (חוץ מהדק)",
    hookEn: "PALMG: Pectineus, Adductor Longus, Adductor brevis, Magnus, Gracilis. Five from the pubis. Four park on linea aspera. Gracilis visits the knee.",
    hookHe: "PALMG: Pectineus, Longus, brevis, Magnus, Gracilis. חמישה מהחיק. ארבעה נחים על linea aspera. הדק מבקר בברך.",
    detailEn:
      "Shared origin = pubis (magnus also from the ischial tuberosity). Insertions: pectineus just below lesser trochanter; longus / brevis / magnus on linea aspera; gracilis on the tibia (pes anserinus).",
    detailHe:
      "origin משותף = החיק (magnus גם מ-ischial tuberosity). סיום: pectineus מתחת לטרוכנטר הקטן; longus / brevis / magnus על linea aspera; gracilis על הטיביה (pes anserinus).",
    muscleIds: ["pectineus", "adductor-longus", "adductor-brevis", "adductor-magnus", "gracilis"],
    regions: ["hip"],
  },
  {
    id: "sit-bone",
    acronym: "SIT-bone",
    titleEn: "Hamstrings start where you sit",
    titleHe: "המסטרינג מתחילים איפה שיושבים",
    kind: "both",
    landmarkEn: "Ischial tuberosity",
    landmarkHe: "גבשון השת (ischial tuberosity)",
    hookEn: "Sit-bone start. Lateral hamstring (biceps femoris) to the fibula. Medial semis to the tibia.",
    hookHe: "מתחילים בעצם הישיבה. המסטרינג לטרלי (דו-ראשי) לפיבולה. שני ה-semi לטיביה.",
    detailEn:
      "Long head of biceps, semitendinosus, semimembranosus (and the hamstring part of adductor magnus) start on the ischial tuberosity. BF short head starts on the femur and skips the hip. BF I = fibular head. ST = pes anserinus. SM = medial tibial condyle.",
    detailHe:
      "הראש הארוך של הדו-ראשי, חצי-גידי, חצי-קרומי (וגם חלק המסטרינג של המקרב הגדול) מתחילים ב-ischial tuberosity. הראש הקצר מתחיל בירך ולא חוצה ירך. BF נאחז בראש הפיבולה. ST ב-pes anserinus. SM בקונדיל המדיאלי של הטיביה.",
    muscleIds: ["biceps-femoris", "semitendinosus", "semimembranosus", "adductor-magnus"],
    regions: ["thigh", "hip"],
  },
  {
    id: "sgt",
    acronym: "SGT",
    titleEn: "Say Grace before Tea",
    titleHe: "Say Grace before Tea",
    kind: "insertion",
    landmarkEn: "Pes anserinus — proximal medial tibia",
    landmarkHe: "Pes anserinus — טיביה מדיאלית פרוקסימלית",
    hookEn: "Say Grace before Tea: Sartorius, Gracilis, semiTendinosus. Three different origins, one goose-foot on the tibia.",
    hookHe: "Say Grace before Tea: Sartorius, Gracilis, semiTendinosus. שלוש התחלות שונות, כף-אווז אחת על הטיביה.",
    detailEn: "Sartorius from ASIS. Gracilis from pubis. Semitendinosus from the ischial tuberosity. They meet on the proximal medial tibia.",
    detailHe: "חייט מ-ASIS. דק מהחיק. חצי-גידי מעצם הישיבה. נפגשים על הטיביה המדיאלית.",
    muscleIds: ["sartorius", "gracilis", "semitendinosus"],
    regions: ["hip", "thigh"],
  },
  {
    id: "quads",
    acronym: "RF+3V",
    titleEn: "All four to the tuberosity",
    titleHe: "ארבעה לגבשון הטיביה",
    kind: "both",
    landmarkEn: "Tibial tuberosity via the patella",
    landmarkHe: "גבשון הטיביה דרך הפיקה",
    hookEn: "RF from the hip (AIIS). Three vasti from the femoral shaft. All four finish on the tibial tuberosity through the patella.",
    hookHe: "RF מהירך (AIIS). שלושה vasti מגוף הירך. ארבעתם נגמרים בגבשון הטיביה דרך הפיקה.",
    detailEn: "Shared insertion = quadriceps tendon → patella → patellar tendon → tibial tuberosity. Only rectus femoris crosses the hip.",
    detailHe: "סיום משותף = גיד הארבע-ראשי → פיקה → גיד הפיקה → גבשון הטיביה. רק ישר הירך חוצה גם את מפרק הירך.",
    muscleIds: ["rectus-femoris", "vastus-lateralis", "vastus-medialis", "vastus-intermedius"],
    regions: ["thigh"],
  },
  {
    id: "itb",
    acronym: "ITB",
    titleEn: "Lateral knee strap",
    titleHe: "רצועת הברך הלטרלית",
    kind: "insertion",
    landmarkEn: "Iliotibial band → Gerdy's tubercle",
    landmarkHe: "ITB → גבשון גרדי",
    hookEn: "ITB strap: TFL from ASIS, glute max from the sacrum — both tighten the lateral knee.",
    hookHe: "רצועת ITB: TFL מ-ASIS, עכוז גדול מהסקרום — שניהם מייצבים את הברך מלטרלית.",
    detailEn: "TFL I = ITB to Gerdy. Gluteus maximus I = gluteal tuberosity + ITB.",
    detailHe: "TFL נאחז ב-ITB עד גרדי. עכוז גדול נאחז בגבשון הגלוטאלי וב-ITB.",
    muscleIds: ["tfl", "gluteus-maximus"],
    regions: ["hip"],
  },
  {
    id: "achilles",
    acronym: "GSP",
    titleEn: "Achilles trio",
    titleHe: "שלישיית אכילס",
    kind: "insertion",
    landmarkEn: "Calcaneus via the Achilles tendon",
    landmarkHe: "העקב דרך גיד אכילס",
    hookEn: "Gastroc crosses the knee, Soleus does not. All three (plus tiny plantaris) to the heel.",
    hookHe: "התאומים חוצים ברך, הסוליה לא. שלושתם (ו-plantaris הקטן) לעקב.",
    detailEn: "Gastroc O = femoral condyles. Soleus O = tibia + fibula. Plantaris O = femur. Shared I = posterior calcaneus.",
    detailHe: "תאומים התחלה = קונדילי הירך. סוליה = טיביה + פיבולה. Plantaris = ירך. סיום משותף = עקב אחורי.",
    muscleIds: ["gastrocnemius", "soleus", "plantaris"],
    regions: ["leg"],
  },
  {
    id: "stirrup",
    acronym: "STIRRUP",
    titleEn: "Stirrup under the foot",
    titleHe: "ארכוף מתחת לכף הרגל",
    kind: "insertion",
    landmarkEn: "Medial cuneiform + 1st metatarsal",
    landmarkHe: "יתד מדיאלית + מטטרסל 1",
    hookEn: "Stirrup under the foot: tibialis anterior from the front, fibularis longus from the side. They meet under the first ray.",
    hookHe: "ארכוף מתחת לכף הרגל: שוקה קדמית מלפנים, שוקית ארוכה מהצד. נפגשים מתחת לקרן הראשונה.",
    detailEn: "TA O = lateral tibia. FL O = fibula. Shared I = medial cuneiform and base of metatarsal 1 (FL arrives plantar).",
    detailHe: "שוקה קדמית התחלה = טיביה לטרלית. שוקית ארוכה = פיבולה. סיום משותף = יתד מדיאלית ובסיס מטטרסל 1 (הארוכה מגיעה מלמטה).",
    muscleIds: ["tibialis-anterior", "fibularis-longus"],
    regions: ["leg"],
  },
  {
    id: "brevis5",
    acronym: "B5",
    titleEn: "Brevis stays on five",
    titleHe: "הקצרה נשארת על חמש",
    kind: "insertion",
    landmarkEn: "Base of the 5th metatarsal",
    landmarkHe: "בסיס מטטרסל 5",
    hookEn: "Longus crosses the sole. Brevis stays on five.",
    hookHe: "הארוכה חוצה את הסוליה. הקצרה נשארת על חמש.",
    detailEn: "Fibularis brevis O = distal fibula. I = tuberosity of the 5th metatarsal. Avulsion fractures love this spot.",
    detailHe: "שוקית קצרה התחלה = פיבולה דיסטלית. סיום = גבשון מטטרסל 5. שברים תלישתיים אוהבים את הנקודה הזו.",
    muscleIds: ["fibularis-brevis"],
    regions: ["leg"],
  },
  {
    id: "tom-harry",
    acronym: "T+H",
    titleEn: "Tom and Harry",
    titleHe: "טום והארי",
    kind: "both",
    landmarkEn: "Behind the medial malleolus",
    landmarkHe: "מאחורי הפטישון המדיאלי",
    hookEn: "Tom (tibialis posterior) and Harry (flexor hallucis longus) sneak behind the medial malleolus. Tom goes to the navicular.",
    hookHe: "טום (שוקה אחורית) והארי (כופף הבוהן) מתגנבים מאחורי הפטישון המדיאלי. טום הולך לעצם הסירה.",
    detailEn:
      "Tibialis posterior I = navicular + cuneiforms. FHL I = distal phalanx of the hallux. Classic full mnemonic is Tom, Dick and Harry — Dick (FDL) is not in this booklet.",
    detailHe:
      "שוקה אחורית נאחזת בסירה וביתדות. כופף הבוהן בגליל הדיסטלי של הבוהן. המנמוניקה המלאה היא Tom, Dick and Harry — Dick (FDL) לא בחוברת.",
    muscleIds: ["tibialis-posterior", "flexor-hallucis-longus"],
    regions: ["leg"],
  },
];

export function hooksForMuscle(muscleId: string): OiHook[] {
  return OI_HOOKS.filter((h) => h.muscleIds.includes(muscleId));
}

export function hooksForRegion(region: RegionId | "all"): OiHook[] {
  if (region === "all") return OI_HOOKS;
  return OI_HOOKS.filter((h) => h.regions.includes(region));
}

export function hookById(id: string): OiHook | undefined {
  return OI_HOOKS.find((h) => h.id === id);
}

export function hookSearchBlob(hook: OiHook): string {
  const names = hook.muscleIds
    .map((id) => {
      const m = muscles.find((x) => x.id === id);
      return m ? `${m.nameEn} ${m.nameHe}` : id;
    })
    .join(" ");
  return [
    hook.acronym,
    hook.titleEn,
    hook.titleHe,
    hook.landmarkEn,
    hook.landmarkHe,
    hook.hookEn,
    hook.hookHe,
    hook.detailEn,
    hook.detailHe,
    names,
  ].join(" ");
}

export function hooksMatchingQuery(query: string): OiHook[] {
  const q = query.trim().toLowerCase();
  if (!q) return OI_HOOKS;
  return OI_HOOKS.filter((h) => hookSearchBlob(h).toLowerCase().includes(q));
}
