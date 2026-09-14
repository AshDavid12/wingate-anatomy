import { DICTIONARY_TOPICS } from "./dictionary";

export type ReviewFormat = "open" | "american";

export type ReviewQuestion = {
  id: string;
  bookletId: number;
  format: ReviewFormat;
  topic: (typeof DICTIONARY_TOPICS)[number];
  promptHe: string;
  promptEn: string;
  options?: [string, string, string, string];
  answer?: 0 | 1 | 2 | 3;
  answerHe?: string;
  answerEn?: string;
  explainHe?: string;
  explainEn?: string;
};

export const TISSUE_QUESTIONS: ReviewQuestion[] = [
  {
    id: "open-1",
    bookletId: 1,
    format: "open",
    topic: "רקמת הסחוס",
    promptHe: "מהם המרכיבים של הסחוס ההיאלני? מהן תכונותיו המכניות? מה חסר לסחוס ההיאלני ומה הבעיה שנוצרה עקב כך?",
    promptEn: "What are the components of hyaline cartilage? What are its mechanical properties? What does hyaline cartilage lack, and what problem does that create?",
    answerHe:
      "הסחוס מורכב מכונדרוציטים, קולגן Type 2, Ground substance ובו פרוטאוגליקנים הקשורים מים. סחוס זה חזק, עומד בדחיסה ומתיחה, חדיר לחומרים שונים. אין לו אספקת דם ועצבוב ישירים ולכן הזנתו אינה ישירה והוא חסר תחושת כאב.",
    answerEn:
      "Made of chondrocytes, type II collagen, and ground substance with water-binding proteoglycans. Strong, resists compression and tension, and permeable. No direct blood supply or innervation, so nutrition is indirect and it has no pain sensation.",
  },
  {
    id: "open-2",
    bookletId: 2,
    format: "open",
    topic: "רקמת הסחוס",
    promptHe: "היכן נמצא בגופנו סחוס היאלני?",
    promptEn: "Where in the body is hyaline cartilage found?",
    answerHe:
      "סחוס היאלני מרכיב את השלד העוברי, את חלקו הקדמי של הצלעות, את קצות העצמות המחליקות האחת על השנייה, את קנה הנשימה והסמפונות המכונה \"עץ הסמפונות\".",
    answerEn:
      "Fetal skeleton, the anterior part of the ribs, the sliding ends of bones, and the trachea and bronchi (the bronchial tree).",
  },
  {
    id: "open-3",
    bookletId: 3,
    format: "open",
    topic: "רקמת הסחוס",
    promptHe: "מאיזה חומר מורכב הדיסק? מהם שני החלקים המרכיבים אותו?",
    promptEn: "What material makes up the disc? What are its two parts?",
    answerHe: "הדיסק מורכב מסחוס סיבי ולו שני חלקים: Annulus fibrosus and nucleus pulposus.",
    answerEn: "Fibrocartilage, with two parts: annulus fibrosus and nucleus pulposus.",
  },
  {
    id: "open-4",
    bookletId: 4,
    format: "open",
    topic: "רקמת העצם",
    promptHe: "מהן התכונות המאפיינות את העצם?",
    promptEn: "What properties characterize bone?",
    answerHe: "העצם קלה, אלסטית וחזקה, בעלת אספקת דם עשירה.",
    answerEn: "Bone is light, elastic, and strong, with a rich blood supply.",
  },
  {
    id: "open-5",
    bookletId: 5,
    format: "open",
    topic: "מבנה עצם ארוכה",
    promptHe: "כיצד מסודרת העצם הספוגית? הצפופה?",
    promptEn: "How is spongy bone organized? Compact bone?",
    answerHe: "העצם הספוגית מורכבת מיחידות המכונות טרבקולות. הצפופה מיחידות המכונות מערכות הוורס.",
    answerEn: "Spongy bone is made of trabeculae. Compact bone is made of Haversian systems.",
  },
  {
    id: "open-6",
    bookletId: 6,
    format: "open",
    topic: "התגרמות",
    promptHe: "תארו את תהליך ההתגרמות בעצם הארוכה.",
    promptEn: "Describe the ossification process in a long bone.",
    answerHe:
      "המודל הסחוסי, התגרמות ראשונית בדיאפיזה, התגרמות משנית באפיפיזה, יצירת פלטת האפיפיזה. בסיום התהליך נבחין בקו אפיפיזה.",
    answerEn:
      "Cartilage model, primary ossification in the diaphysis, secondary ossification in the epiphysis, formation of the epiphyseal plate. At the end of the process the epiphyseal line appears.",
  },
  {
    id: "open-7",
    bookletId: 7,
    format: "open",
    topic: "התגרמות",
    promptHe: "מהי פלטת האפיפיזה? מאיזו חומר היא מורכבת ועל מה מעידה נוכחותה?",
    promptEn: "What is the epiphyseal plate? What is it made of, and what does its presence indicate?",
    answerHe:
      "פלטת האפיפיזה מורכבת מסחוס היאלני. נוכחותה מעידה על המשך התפתחותה: היא מוסיפה להתעבות במרכזה והצמיחה לגובה ממשיכה.",
    answerEn:
      "The epiphyseal plate is hyaline cartilage. Its presence means growth is still going on: it keeps thickening in the center and height growth continues.",
  },
  {
    id: "open-8",
    bookletId: 8,
    format: "open",
    topic: "התגרמות",
    promptHe: "מהו קו האפיפיזה?",
    promptEn: "What is the epiphyseal line?",
    answerHe: "קו האפיפיזה הוא קו צפוף הנראה בתוך העצם ומעיד על סיום התהליך.",
    answerEn: "A dense line seen inside the bone that marks the end of the growth process.",
  },
  {
    id: "open-9",
    bookletId: 9,
    format: "open",
    topic: "אוסטאופורוזיס",
    promptHe: "מהם הגורמים הקובעים את צפיפות עצמותינו?",
    promptEn: "What factors determine our bone density?",
    answerHe:
      "הגורמים העיקריים הם גורמים גנטיים וגורמים סביבתיים:\nא. מין והתניות — לנשים צפיפות נמוכה יחסית לגברים; לנשים לבנות או אסייתיות עצם דלה יחסית לנשים אפריקאיות.\nב. גיל — כמו כל רקמה בגופנו, גם רקמה זו מזדקנת ונעלמת.\nג. צריכת סידן שאינה מספקת, צריכת מוצרים שפוגעים בספיגת הסידן, עישון, מחסור בפעילות גופנית.\nד. צריכת תרופות ושימוש מופרז באלכוהול פוגעים ברקמת העצם.",
    answerEn:
      "Mainly genetic and environmental:\nA. Sex and ancestry — women have lower density than men; White or Asian women have lower bone density than African women.\nB. Age — like other tissues, bone ages and is lost.\nC. Inadequate calcium, foods that impair calcium absorption, smoking, lack of physical activity.\nD. Medications and excessive alcohol harm bone tissue.",
  },
  {
    id: "open-10",
    bookletId: 10,
    format: "open",
    topic: "תאי העצם",
    promptHe: "מה תפקידם של האוסטאובלסטים? האוסטאוקלסטים?",
    promptEn: "What is the role of osteoblasts? Of osteoclasts?",
    answerHe: "האוסטאובלסטים יוצרים את רקמת העצם. האוסטאוקלסטים הורסים עצם בלויה.",
    answerEn: "Osteoblasts build bone tissue. Osteoclasts break down worn-out bone.",
  },
  {
    id: "open-11",
    bookletId: 11,
    format: "open",
    topic: "סוגי עצמות",
    promptHe: "איזה עצמות נחשבות כעצמות ססמואידיות? כעצמות ארוכות? מה תפקידן?",
    promptEn: "Which bones are considered sesamoid? Long bones? What is their function?",
    answerHe:
      "ססמואידיות: הדוגמה הטובה ביותר היא עצם הפיקה שתפקידה להגדיל את מרחק השריר מהציר. ארוכות: עצמות הגפיים שתפקידן להוות מנוף לתנועה.",
    answerEn:
      "Sesamoid: the best example is the patella, which increases the muscle’s distance from the axis. Long bones: the limb bones, which act as levers for movement.",
  },
  {
    id: "american-1",
    bookletId: 1,
    format: "american",
    topic: "רקמת הסחוס",
    promptHe: "Annulus Fibrosus הוא חומר שתפקידו:",
    promptEn: "Annulus fibrosus is a material whose function is:",
    options: [
      "למנוע חיכוך.",
      "לבלום זעזועים.",
      "להציג יכולת החלקה טובה.",
      "תשובות א' + ב' נכונות.",
    ],
    answer: 3,
  },
  {
    id: "american-2",
    bookletId: 2,
    format: "american",
    topic: "רקמת הסחוס",
    promptHe: "Chondrocyte:",
    promptEn: "Chondrocyte:",
    options: [
      "נמצא ברקמת העצם הצפופה.",
      "מייצר קולגן.",
      "הוא חלק מהחומר האנאורגני של הסחוס.",
      "נמצא ברקמת חיבור צפופה.",
    ],
    answer: 1,
  },
  {
    id: "american-3",
    bookletId: 3,
    format: "american",
    topic: "רקמת הסחוס",
    promptHe: "בעניין הסחוס ההיאלני שבקצות העצמות, מי מבין המשפטים הבאים הוא הנכון:",
    promptEn: "Regarding hyaline cartilage at the ends of bones, which statement is correct?",
    options: [
      "אלסטי מאוד הודות לאחוזו הגבוה של סיבי האלסטין המצוי בו.",
      "נמצא בדיסק הבין-חולייתי.",
      "מקבל חומרי מזון וחמצן בדיפוזיה.",
      "עשיר באספקת דם.",
    ],
    answer: 2,
  },
  {
    id: "american-4",
    bookletId: 4,
    format: "american",
    topic: "מבנה עצם ארוכה",
    promptHe: "מה מייחד את העצם הצפופה?",
    promptEn: "What distinguishes compact bone?",
    options: [
      "מורכבת מיחידות המסודרות בצורה קונצנטרית.",
      "חסרת אספקה דמית.",
      "נמצאת בעיקר בחלקן הפנימי של האפיפיזות.",
      "נמצאת בחלקה הספוגי של העצם.",
    ],
    answer: 0,
  },
  {
    id: "american-5",
    bookletId: 5,
    format: "american",
    topic: "רקמת חיבור",
    promptHe: "Loose connective tissue (רקמת חיבור אמיתית רפה) נמצאת:",
    promptEn: "Loose connective tissue is found:",
    options: [
      "בשכבה הפנימית של כלי הדם.",
      "סביב מערכות הוורס.",
      "בין סיבי השריר.",
      "בגיד אכילס.",
    ],
    answer: 2,
  },
  {
    id: "american-6",
    bookletId: 6,
    format: "american",
    topic: "רקמת הסחוס",
    promptHe: "המים ברקמת הסחוס:",
    promptEn: "Water in cartilage tissue:",
    options: [
      "קשורים אל הפרוטאוגליקנים.",
      "מגיעים מהנוזל הסינוביאלי.",
      "נמצאים בתוך תאי הסחוס.",
      "נאגרים בצורה חופשית במפרק.",
    ],
    answer: 0,
  },
  {
    id: "american-7",
    bookletId: 7,
    format: "american",
    topic: "רקמת חיבור",
    promptHe: "קולגן Type 1 מספק את התכונה העיקרית הבאה:",
    promptEn: "Type I collagen mainly provides:",
    options: [
      "עומד בכוחות דחיסה גדולים.",
      "מתיח מאוד.",
      "כמעט ואינו מתיח.",
      "אלסטיות גדולה.",
    ],
    answer: 2,
  },
];

export const TISSUE_TOPICS = DICTIONARY_TOPICS.filter((topic) =>
  TISSUE_QUESTIONS.some((q) => q.topic === topic),
);

export function reviewFormatLabel(format: ReviewFormat) {
  return format === "open"
    ? "Open review · שאלות חזרה פתוחות"
    : "American · שאלות אמריקאיות";
}

export function filterReviewQuestions(
  format: ReviewFormat | "all",
  topic: string | "all",
) {
  return TISSUE_QUESTIONS.filter((q) => {
    if (format !== "all" && q.format !== format) return false;
    if (topic !== "all" && q.topic !== topic) return false;
    return true;
  });
}
