export const CONTRACTION_HIERARCHY = [
  { en: "Muscle", he: "שריר" },
  { en: "Muscle fibers / muscle-fiber cells", he: "סיבי שריר · תאי סיב שריר" },
  { en: "Myofibril", he: "מיופיבריל (סיבון)" },
  { en: "Sarcomere", he: "סרקומר" },
] as const;

export const SARCOMERE_PARTS = [
  {
    en: "Z disc / Z-line",
    he: "קו Z",
    definition: "גבול הסרקומר. האקטין (החוט הדק) צמוד אליו.",
  },
  {
    en: "I band",
    he: "פס I",
    definition: "האזור הבהיר — אקטין בלבד, משני צידי קו Z.",
  },
  {
    en: "A band",
    he: "פס A",
    definition: "האזור הכהה — כולל את המיוזין (החוט העבה).",
  },
  {
    en: "H zone",
    he: "אזור H",
    definition: "מרכז פס A — מיוזין בלבד, בלי חפיפה לאקטין.",
  },
  {
    en: "M line",
    he: "קו M",
    definition: "קו האמצע של הסרקומר, במרכז המיוזין.",
  },
  {
    en: "Thin filament (actin)",
    he: "חוט דק (אקטין)",
    definition: "חלבון דק הצמוד ל-Z-line. עליו אתר הקשירה לראש המיוזין, וגם טרופונין וטרופומיוזין.",
  },
  {
    en: "Thick filament (myosin)",
    he: "חוט עבה (מיוזין)",
    definition: "חלבון עבה במרכז הסרקומר. ראשו יוצר גשר רוחב עם האקטין.",
  },
] as const;

export const ATP_CYCLE_STEPS = [
  {
    n: 1,
    titleEn: "Cross bridge",
    titleHe: "גשר רוחב",
    bodyHe:
      "ראש מיוזין אחד צמוד לאקטין ויוצר גשר לרוחב הסרקומר. מולקולת ATP כבר התפרקה וסיפקה את האנרגיה האצורה בה.",
    bodyEn:
      "One myosin head is bound to actin, forming a cross bridge across the sarcomere. ATP has already split and supplied its stored energy.",
  },
  {
    n: 2,
    titleEn: "Power stroke",
    titleHe: "מכת כוח",
    bodyHe:
      "שלב התנועה: גשר הרוחב נע קדימה אל מרכז הסרקומר. כך נעים חלבוני החוט הדק (אקטין) אל המרכז, והסרקומר מתקצר.",
    bodyEn:
      "The movement step: the cross bridge pulls toward the sarcomere center. Thin (actin) filaments slide inward and the sarcomere shortens.",
  },
  {
    n: 3,
    titleEn: "Detach",
    titleHe: "ניתוק",
    bodyHe: "ATP נקשר לראש המיוזין. גשר הרוחב מתנתק מהאקטין.",
    bodyEn: "ATP binds the myosin head. The cross bridge detaches from actin.",
  },
  {
    n: 4,
    titleEn: "Recock",
    titleHe: "דריכה מחדש",
    bodyHe:
      "ATP מתפרק ל-ADP + Pi. ראש המיוזין נדרך שוב (cocked) ומוכן ליצירת גשר רוחב חדש.",
    bodyEn:
      "ATP splits into ADP + Pi. The myosin head recocks and is ready to form a new cross bridge.",
  },
] as const;

export const CONTRACTION_OPEN_QUESTIONS = [
  {
    id: "cq1",
    promptHe: "לאיזה חלבון נצמד הסידן?",
    promptEn: "Which protein does calcium bind to?",
    answerHe: "טרופונין.",
    answerEn: "Troponin.",
  },
  {
    id: "cq2",
    promptHe: "איזה חלבון נמצא במרכז הסרקומר?",
    promptEn: "Which protein sits in the center of the sarcomere?",
    answerHe: "מיוזין.",
    answerEn: "Myosin.",
  },
  {
    id: "cq3",
    promptHe: "לאן נצמד ראש המיוזין?",
    promptEn: "Where does the myosin head attach?",
    answerHe: "אתר הקשירה באקטין.",
    answerEn: "The binding site on actin.",
  },
  {
    id: "cq4",
    promptHe: "באיזה אברון נאגר הסידן?",
    promptEn: "In which organelle is calcium stored?",
    answerHe: "רשת תעלות — Sarcoplasmic reticulum.",
    answerEn: "The sarcoplasmic reticulum (SR).",
  },
  {
    id: "cq5",
    promptHe: "איזה חלבון צמוד אל ה-Z-line?",
    promptEn: "Which protein is attached to the Z-line?",
    answerHe: "אקטין.",
    answerEn: "Actin.",
  },
  {
    id: "cq6",
    promptHe: "מהי פעולת Power stroke?",
    promptEn: "What is the power stroke?",
    answerHe: "תנועה של גשר הרוחב.",
    answerEn: "Movement of the cross bridge.",
  },
  {
    id: "cq7",
    promptHe: "המשפט «חיבור, הזזה, ניתוק» מתאים ל:",
    promptEn: "The phrase “attach, slide, detach” belongs to:",
    answerHe: "גשר הרוחב.",
    answerEn: "The cross bridge.",
  },
] as const;

export const CONTRACTION_IMAGES = [
  {
    id: "structure",
    src: "/anatomy/contraction/muscle-structure.jpg",
    titleHe: "מבנה שריר שלד — שריר, פסיקולה, סיב",
    titleEn: "Skeletal muscle: tendon, fascicle, fiber",
    credit: "NIH / Wikimedia · public domain",
  },
  {
    id: "fiber-sr",
    src: "/anatomy/contraction/hierarchy.jpg",
    titleHe: "סיב שריר — רשת תעלות (SR), T-tubule וסידן",
    titleEn: "Muscle fiber: SR, T-tubule, triad — where calcium is stored",
    credit: "Blausen.com · CC BY 3.0",
  },
  {
    id: "sarcomere",
    src: "/anatomy/contraction/filaments.jpg",
    titleHe: "סרקומר — קו Z, פס I, פס A, אזור H, קו M · אקטין ומיוזין",
    titleEn: "Sarcomere bands (Z, I, A, H, M) plus actin, myosin, troponin",
    credit: "OpenStax Anatomy & Physiology · CC BY 4.0",
  },
  {
    id: "sliding",
    src: "/anatomy/contraction/sliding-filament.jpg",
    titleHe: "מודל ההחלקה — במנוחה מול כיווץ (Z מתקרבים)",
    titleEn: "Sliding filament: relaxed vs contracted (Z lines move in)",
    credit: "OpenStax Anatomy & Physiology · CC BY 4.0",
  },
  {
    id: "cross-bridge",
    src: "/anatomy/contraction/cross-bridge.jpg",
    titleHe: "מחזור גשר הרוחב — חיבור, Power stroke, ניתוק, דריכה",
    titleEn: "Cross-bridge cycle: attach, power stroke, detach, recock",
    credit: "OpenStax Anatomy & Physiology · CC BY 4.0",
  },
  {
    id: "actin-myosin",
    src: "/anatomy/contraction/actin-myosin.png",
    titleHe: "אקטין, טרופונין, טרופומיוזין וראש המיוזין",
    titleEn: "Actin, troponin, tropomyosin, and the myosin head",
    credit: "Wikimedia Commons",
  },
  {
    id: "cycle-steps",
    src: "/anatomy/contraction/cross-bridge-cycle.png",
    titleHe: "ארבעת השלבים של גשר הרוחב במבט צד",
    titleEn: "The four cross-bridge steps from the side",
    credit: "Almut Hampl · Wikimedia Commons",
  },
] as const;

export type ContractionImage = (typeof CONTRACTION_IMAGES)[number];

export const GROSS_ANATOMY_WRAPUP = {
  titleEn: "End of intro and tissues · Gross Anatomy",
  titleHe: "סוף פרק המבוא והרקמות",
  bodyHe:
    "בפרק הרקמות הכרתם את המבנה המיקרוסקופי של הגוף, את תכונות הרקמות, וכיצד הן מגיבות לעומסים בזמן פעילות גופנית. הפרק הבא הוא האנטומיה הקלאסית הנראית לעין: השפה האנטומית, השלד והשרירים — התמונה הגדולה שנקראת Gross Anatomy.",
  bodyEn:
    "The tissues chapter is the microscopic view: tissue properties and how they respond to load in exercise. Next is the anatomy you can see — language, skeleton, and muscles — Gross Anatomy.",
} as const;
