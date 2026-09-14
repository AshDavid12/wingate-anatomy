"use client";

import { useEffect, useMemo, useState } from "react";
import { DICTIONARY_TOPICS, dictionaryTerms, searchDictionary, topicLabel } from "@/data/dictionary";
import {
  ATP_CYCLE_STEPS,
  CONTRACTION_HIERARCHY,
  CONTRACTION_IMAGES,
  GROSS_ANATOMY_WRAPUP,
  SARCOMERE_PARTS,
  type ContractionImage,
} from "@/data/contraction";
import { filterReviewQuestions, type ReviewQuestion } from "@/data/review-questions";
import { directionalTerms, keyConcepts, movementTerms } from "@/data/terms";
import { EmptyState } from "@/components/muscle-table";
import { cn } from "@/lib/utils";

export function Glossary({ query }: { query: string }) {
  const [topic, setTopic] = useState<string | "all">("all");
  const [hideDef, setHideDef] = useState(false);

  const filtered = useMemo(() => {
    const list = searchDictionary(query);
    if (topic === "all") return list;
    return list.filter((t) => t.topic === topic);
  }, [query, topic]);

  const grouped = useMemo(() => {
    return DICTIONARY_TOPICS.map((tp) => ({
      topic: tp,
      terms: filtered.filter((t) => t.topic === tp),
    })).filter((g) => g.terms.length > 0);
  }, [filtered]);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-bold">Anatomy glossary · מילון אנטומיה · שלד ושריר</h2>
        <p className="mt-1 max-w-3xl text-sm text-[var(--ink-soft)]">
          Core booklet terms: tissues, bone, cartilage, joints, ligaments, tendons, and skeletal muscle.
          Check «Hide definitions» and say them out loud — like flashcards.
          מונחי יסוד מהחוברת. סמנו «הסתר הגדרות» ותרגלו בעל-פה — כמו בכרטיסיות.
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          <TopicChip
            active={topic === "all"}
            onClick={() => setTopic("all")}
          >
            All · הכל ({searchDictionary(query).length})
          </TopicChip>
          {DICTIONARY_TOPICS.map((tp) => {
            const n = searchDictionary(query).filter((t) => t.topic === tp).length;
            if (n === 0) return null;
            return (
              <TopicChip key={tp} active={topic === tp} onClick={() => setTopic(tp)}>
                {topicLabel(tp)} ({n})
              </TopicChip>
            );
          })}
        </div>

        <label className="mt-3 inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={hideDef}
            onChange={(e) => setHideDef(e.target.checked)}
          />
          Hide definitions to practice · הסתר הגדרות לתרגול
        </label>
      </section>

      {(topic === "all" || topic === "תהליך הכיווץ" || topic === "מבנה שריר שלד" || topic === "מבוא לאנטומיה") &&
        query.trim().length === 0 && (
          <ContractionReview
            showCycle={topic === "all" || topic === "תהליך הכיווץ" || topic === "מבנה שריר שלד"}
            showWrapup={
              topic === "all" || topic === "מבוא לאנטומיה" || topic === "תהליך הכיווץ"
            }
          />
        )}

      {query.trim().length === 0 && (
        <BookletOpenReview topic={topic} hideAnswers={hideDef} />
      )}

      {grouped.length === 0 ? (
        <EmptyState title="No matching terms · אין מונחים תואמים" body="Try a name in English, Hebrew, or another topic. · נסו שם בעברית, באנגלית או נושא אחר." />
      ) : (
        grouped.map((g) => (
          <section key={g.topic}>
            <h3 className="text-lg font-bold">{topicLabel(g.topic)}</h3>
            <div className="mt-3 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-[var(--paper-2)] text-xs text-[var(--ink-soft)]">
                  <tr>
                    <th className="px-4 py-2 text-right font-semibold">English</th>
                    <th className="hidden px-4 py-2 text-right font-semibold sm:table-cell">
                      עברית
                    </th>
                    <th className="px-4 py-2 text-right font-semibold">Definition · הגדרה</th>
                  </tr>
                </thead>
                <tbody>
                  {g.terms.map((t) => (
                    <tr
                      key={t.id}
                      className="border-t border-[var(--line)] align-top even:bg-[var(--paper)]/50"
                    >
                      <td className="px-4 py-2.5">
                        <p className="term font-bold">{t.en ?? t.he}</p>
                        {t.en && (
                          <p className="mt-0.5 text-xs font-normal text-[var(--ink-soft)] sm:hidden">
                            {t.he}
                          </p>
                        )}
                      </td>
                      <td className="hidden px-4 py-2.5 text-[var(--ink-soft)] sm:table-cell">
                        {t.en ? t.he : "—"}
                      </td>
                      <td className="px-4 py-2.5 leading-relaxed text-[var(--ink-soft)]">
                        <span className={cn(hideDef && "hide-study")}>{t.definition}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))
      )}

      <section>
        <h2 className="text-xl font-bold">Origin · Insertion · Action — and key ideas · ומושגי יסוד</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {keyConcepts.map((c) => (
            <article
              key={c.titleEn}
              className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-sm"
            >
              <h3 className="font-bold">{c.titleEn}</h3>
              <p className="text-sm text-[var(--ink-soft)]">{c.titleHe}</p>
              <p className="mt-2 text-sm leading-relaxed">{c.bodyHe}</p>
              <p className="term mt-1 text-xs leading-relaxed text-[var(--ink-soft)]">{c.bodyEn}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-[var(--accent)]/40 bg-[var(--paper-2)] p-4">
        <h2 className="text-lg font-bold">Origin / Insertion memory tips</h2>
        <p className="mt-1 text-sm text-[var(--ink-soft)]">
          Acronyms and parking-lot groups are in the{" "}
          <span className="term font-semibold">Memorize · שינון</span> tab — SITS, PFPF, SGT, CAS, PALMG.
          ראשי תיבות וקבוצות אחיזה בלשונית «שינון».
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">Movement terms · מונחי תנועה</h2>
        <div className="mt-3 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)]">
          <table className="w-full text-sm">
            <thead className="bg-[var(--paper-2)] text-xs text-[var(--ink-soft)]">
              <tr>
                <th className="px-4 py-2 text-right">English</th>
                <th className="px-4 py-2 text-right">עברית</th>
                <th className="px-4 py-2 text-right">Note · הסבר</th>
              </tr>
            </thead>
            <tbody>
              {movementTerms.map((t) => (
                <tr key={t.en} className="border-t border-[var(--line)] even:bg-[var(--paper)]/50">
                  <td className="term px-4 py-2 font-bold">{t.en}</td>
                  <td className="px-4 py-2 text-[var(--ink-soft)]">{t.he}</td>
                  <td className="px-4 py-2 text-[var(--ink-soft)]">{t.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold">Anatomical directions · כיוונים אנטומיים</h2>
        <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-5">
          {directionalTerms.map((t) => (
            <div
              key={t.en}
              className="rounded-xl border border-[var(--line)] bg-[var(--card)] px-3 py-3"
            >
              <p className="term font-bold">{t.en}</p>
              <p className="text-sm text-[var(--ink-soft)]">{t.he}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="text-center text-xs text-[var(--ink-soft)]">
        {dictionaryTerms.length} musculoskeletal glossary terms · מונחים במילון השלד-שריר
      </p>
    </div>
  );
}

function TopicChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-2.5 py-1 text-xs font-medium transition",
        active
          ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
          : "border-[var(--line)] bg-[var(--card)] text-[var(--ink-soft)] hover:border-[var(--ink)]",
      )}
    >
      {children}
    </button>
  );
}

function ContractionReview({
  showCycle,
  showWrapup,
}: {
  showCycle: boolean;
  showWrapup: boolean;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = CONTRACTION_IMAGES.find((img) => img.id === openId) ?? null;
  const byId = (id: string) => CONTRACTION_IMAGES.find((img) => img.id === id)!;

  return (
    <div className="space-y-6">
      {showCycle && (
        <section className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-sm">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            ATP muscle contraction · כיווץ שריר
          </p>
          <h3 className="mt-1 text-lg font-bold">Sliding filament · ארבעה שלבים</h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
            כיווץ הוא תהליך מהיר של חלבונים שתלוי בפירוק ATP. ראש המיוזין נצמד לאקטין — זה גשר הרוחב
            (Cross bridge). אחר כך הוא מושך, מתנתק, ונדרך מחדש. לחצו על איור כדי להגדיל.
          </p>
          <p className="term mt-1 text-xs leading-relaxed text-[var(--ink-soft)]">
            Contraction runs on ATP. The myosin head binds actin (cross bridge), pulls, detaches, and recocks.
            Tap a figure to enlarge.
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-[var(--ink-soft)]">
            Muscle → myofibril · שריר עד סרקומר
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-1.5 text-sm">
            {CONTRACTION_HIERARCHY.map((level, i) => (
              <span key={level.en} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-[var(--ink-soft)]">→</span>}
                <span className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1">
                  <span className="term font-semibold">{level.en}</span>
                  <span className="text-[var(--ink-soft)]"> · {level.he}</span>
                </span>
              </span>
            ))}
          </div>
          <ContractionFigureGrid
            images={[byId("structure"), byId("fiber-sr")]}
            onOpen={setOpenId}
          />
          <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-[var(--ink-soft)]">
            Sarcomere · סרקומר וגשרי רוחב
          </p>
          <ContractionFigureGrid
            images={[byId("sarcomere"), byId("sliding"), byId("actin-myosin")]}
            onOpen={setOpenId}
          />
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {ATP_CYCLE_STEPS.map((step) => (
              <article
                key={step.n}
                className="rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3"
              >
                <p className="text-xs font-bold text-[var(--accent)]">
                  {step.n} · {step.titleEn} · {step.titleHe}
                </p>
                <p className="mt-1 text-sm leading-relaxed">{step.bodyHe}</p>
                <p className="term mt-1 text-xs text-[var(--ink-soft)]">{step.bodyEn}</p>
              </article>
            ))}
          </div>
          <ContractionFigureGrid
            images={[byId("cross-bridge"), byId("cycle-steps")]}
            onOpen={setOpenId}
            tall
          />
          <div className="mt-4 overflow-hidden rounded-xl border border-[var(--line)]">
            <table className="w-full text-sm">
              <thead className="bg-[var(--paper-2)] text-xs text-[var(--ink-soft)]">
                <tr>
                  <th className="px-3 py-2 text-right font-semibold">Part · חלק</th>
                  <th className="px-3 py-2 text-right font-semibold">What it is · מה זה</th>
                </tr>
              </thead>
              <tbody>
                {SARCOMERE_PARTS.map((part) => (
                  <tr key={part.en} className="border-t border-[var(--line)] even:bg-[var(--paper)]/50">
                    <td className="px-3 py-2 align-top">
                      <p className="term font-bold">{part.en}</p>
                      <p className="text-xs text-[var(--ink-soft)]">{part.he}</p>
                    </td>
                    <td className="px-3 py-2 leading-relaxed text-[var(--ink-soft)]">{part.definition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-center text-[11px] text-[var(--ink-soft)]">
            איורים: OpenStax CC BY 4.0 · Blausen CC BY 3.0 · NIH / ויקישיתוף
          </p>
        </section>
      )}

      {showWrapup && (
        <section className="rounded-2xl border border-dashed border-[var(--accent)]/40 bg-[var(--paper-2)] p-5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            Chapter wrap-up · סוף פרק
          </p>
          <h3 className="mt-1 text-lg font-bold">{GROSS_ANATOMY_WRAPUP.titleHe}</h3>
          <p className="term text-sm text-[var(--ink-soft)]">{GROSS_ANATOMY_WRAPUP.titleEn}</p>
          <p className="mt-2 text-sm leading-relaxed">{GROSS_ANATOMY_WRAPUP.bodyHe}</p>
          <p className="term mt-1 text-xs leading-relaxed text-[var(--ink-soft)]">
            {GROSS_ANATOMY_WRAPUP.bodyEn}
          </p>
        </section>
      )}

      {open && <ContractionLightbox image={open} onClose={() => setOpenId(null)} />}
    </div>
  );
}

function ContractionFigureGrid({
  images,
  onOpen,
  tall,
}: {
  images: ContractionImage[];
  onOpen: (id: string) => void;
  tall?: boolean;
}) {
  return (
    <div className={cn("mt-3 grid gap-3", images.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3")}>
      {images.map((img) => (
        <button
          key={img.id}
          type="button"
          onClick={() => onOpen(img.id)}
          className="group overflow-hidden rounded-xl border border-[var(--line)] bg-white text-right shadow-sm"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt={img.titleHe}
            className={cn(
              "w-full bg-white object-contain transition group-hover:scale-[1.02]",
              tall ? "h-64 md:h-80" : "h-44 md:h-56",
            )}
          />
          <span className="block border-t border-[var(--line)] px-3 py-2">
            <span className="block text-xs font-semibold leading-snug">{img.titleHe}</span>
            <span className="term mt-0.5 block text-[11px] text-[var(--ink-soft)]">{img.titleEn}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

function ContractionLightbox({
  image,
  onClose,
}: {
  image: ContractionImage;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-3 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="max-h-[92vh] w-full max-w-4xl overflow-auto rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-[var(--line)] px-4 py-3">
          <div>
            <h2 className="text-lg font-bold">{image.titleHe}</h2>
            <p className="term text-sm text-[var(--ink-soft)]">{image.titleEn}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[var(--line)] px-3 py-1 text-sm"
          >
            סגור
          </button>
        </div>
        <div className="bg-white p-3 md:p-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt={image.titleHe}
            className="mx-auto max-h-[70vh] w-auto max-w-full object-contain"
          />
          <p className="mt-2 text-center text-[11px] text-[var(--ink-soft)]">{image.credit}</p>
        </div>
      </div>
    </div>
  );
}

function BookletOpenReview({
  topic,
  hideAnswers,
}: {
  topic: string | "all";
  hideAnswers: boolean;
}) {
  const questions =
    topic === "all"
      ? filterReviewQuestions("open", "תהליך הכיווץ")
      : filterReviewQuestions("open", topic);
  if (questions.length === 0) return null;
  return (
    <section>
      <h3 className="text-lg font-bold">Open review · שאלות חזרה פתוחות</h3>
      <p className="mt-1 text-sm text-[var(--ink-soft)]">
        Cover the answer, say it out loud, then reveal. · מכסים, אומרים בקול, ואז חושפים.
      </p>
      <div className="mt-3 grid gap-2">
        {questions.map((item, i) => (
          <OpenReviewRow key={item.id} index={i + 1} hide={hideAnswers} item={item} />
        ))}
      </div>
    </section>
  );
}

function OpenReviewRow({
  index,
  hide,
  item,
}: {
  index: number;
  hide: boolean;
  item: ReviewQuestion;
}) {
  const [open, setOpen] = useState(false);
  const shown = hide ? open : true;
  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      className="w-full rounded-xl border border-[var(--line)] bg-[var(--card)] px-4 py-3 text-right shadow-sm"
    >
      <p className="text-sm font-semibold">
        {index}. {item.promptHe}
      </p>
      <p className="term mt-0.5 text-xs text-[var(--ink-soft)]">{item.promptEn}</p>
      <p className={cn("mt-2 text-sm", !shown && "hide-study")}>
        <span className="font-bold text-[var(--accent)]">{item.answerHe}</span>
        {item.answerEn && (
          <span className="term ms-2 text-xs text-[var(--ink-soft)]">{item.answerEn}</span>
        )}
      </p>
    </button>
  );
}
