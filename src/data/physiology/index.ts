import { CONCEPT_CARDS } from "./concepts";
import { FOUNDATION_CARDS } from "./foundations";
import { NUTRITION_CARDS } from "./nutrition";
import { OXYGEN_CARDS } from "./oxygen";
import { PATHWAY_CARDS } from "./pathways";
import { PHYSIO_TOPICS, type PhysioCard, type PhysioTopicId } from "./types";

export const PHYSIO_CARDS: PhysioCard[] = [
  ...CONCEPT_CARDS,
  ...NUTRITION_CARDS,
  ...FOUNDATION_CARDS,
  ...PATHWAY_CARDS,
  ...OXYGEN_CARDS,
];

export function topicLabel(id: PhysioTopicId) {
  const topic = PHYSIO_TOPICS.find((t) => t.id === id);
  return topic ? `${topic.en} · ${topic.he}` : id;
}

export function searchCards(query: string, topic?: PhysioTopicId | "all") {
  const q = query.trim().toLowerCase();
  return PHYSIO_CARDS.filter((card) => {
    if (topic && topic !== "all" && card.topic !== topic) return false;
    if (!q) return true;
    const hay = [card.titleHe, card.titleEn, card.bodyHe, ...(card.bullets ?? [])]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}
