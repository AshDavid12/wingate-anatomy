export const PHYSIO_TOPICS = [
  { id: "concepts", he: "מושגים", en: "Concepts" },
  { id: "nutrition", he: "הרכב ותזונה", en: "Nutrition" },
  { id: "foundations", he: "יסודות", en: "Foundations" },
  { id: "pathways", he: "מסלולים", en: "Pathways" },
  { id: "oxygen", he: "חמצן והתאוששות", en: "Oxygen" },
] as const;

export type PhysioTopicId = (typeof PHYSIO_TOPICS)[number]["id"];

export type PhysioCard = {
  id: string;
  topic: PhysioTopicId;
  titleHe: string;
  titleEn: string;
  bodyHe: string;
  bullets?: string[];
};

export type PhysioQuestion = {
  id: string;
  topic: PhysioTopicId;
  format: "open" | "mc";
  promptHe: string;
  options?: [string, string, string, string];
  /** Index of the correct option for multiple choice. */
  answer?: 0 | 1 | 2 | 3;
  answerHe: string;
  explainHe?: string;
};
