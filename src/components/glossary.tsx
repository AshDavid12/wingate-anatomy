"use client";

import { useMemo, useState } from "react";
import { DICTIONARY_TOPICS, dictionaryTerms, searchDictionary } from "@/data/dictionary";
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
        <h2 className="text-xl font-bold">מילון אנטומיה · שלד ושריר</h2>
        <p className="mt-1 max-w-3xl text-sm text-[var(--ink-soft)]">
          מונחי יסוד מהחוברת: רקמות, עצם, סחוס, מפרקים, רצועות, גידים ומבנה שריר השלד.
          סמנו «הסתר הגדרות» ותרגלו בעל-פה — כמו בכרטיסיות.
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          <TopicChip
            active={topic === "all"}
            onClick={() => setTopic("all")}
          >
            הכל ({searchDictionary(query).length})
          </TopicChip>
          {DICTIONARY_TOPICS.map((tp) => {
            const n = searchDictionary(query).filter((t) => t.topic === tp).length;
            if (n === 0) return null;
            return (
              <TopicChip key={tp} active={topic === tp} onClick={() => setTopic(tp)}>
                {tp} ({n})
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
          הסתר הגדרות לתרגול
        </label>
      </section>

      {grouped.length === 0 ? (
        <EmptyState title="אין מונחים תואמים" body="נסו שם בעברית, באנגלית או נושא אחר." />
      ) : (
        grouped.map((g) => (
          <section key={g.topic}>
            <h3 className="text-lg font-bold">{g.topic}</h3>
            <div className="mt-3 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-sm">
              <table className="w-full text-sm">
                <thead className="bg-[var(--paper-2)] text-xs text-[var(--ink-soft)]">
                  <tr>
                    <th className="px-4 py-2 text-right font-semibold">מונח</th>
                    <th className="hidden px-4 py-2 text-right font-semibold sm:table-cell">
                      English
                    </th>
                    <th className="px-4 py-2 text-right font-semibold">הגדרה</th>
                  </tr>
                </thead>
                <tbody>
                  {g.terms.map((t) => (
                    <tr
                      key={t.id}
                      className="border-t border-[var(--line)] align-top even:bg-[var(--paper)]/50"
                    >
                      <td className="px-4 py-2.5 font-medium">
                        {t.he}
                        {t.en && (
                          <p className="term mt-0.5 text-xs font-normal text-[var(--ink-soft)] sm:hidden">
                            {t.en}
                          </p>
                        )}
                      </td>
                      <td className="term hidden px-4 py-2.5 text-[var(--ink-soft)] sm:table-cell">
                        {t.en ?? "—"}
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
        <h2 className="text-xl font-bold">Origin · Insertion · Action — ומושגי יסוד</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          {keyConcepts.map((c) => (
            <article
              key={c.title}
              className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-sm"
            >
              <h3 className="font-bold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{c.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold">מונחי תנועה</h2>
        <div className="mt-3 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)]">
          <table className="w-full text-sm">
            <thead className="bg-[var(--paper-2)] text-xs text-[var(--ink-soft)]">
              <tr>
                <th className="px-4 py-2 text-right">עברית</th>
                <th className="px-4 py-2 text-right">English</th>
                <th className="px-4 py-2 text-right">הסבר</th>
              </tr>
            </thead>
            <tbody>
              {movementTerms.map((t) => (
                <tr key={t.en} className="border-t border-[var(--line)] even:bg-[var(--paper)]/50">
                  <td className="px-4 py-2 font-medium">{t.he}</td>
                  <td className="term px-4 py-2">{t.en}</td>
                  <td className="px-4 py-2 text-[var(--ink-soft)]">{t.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold">כיוונים אנטומיים</h2>
        <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-5">
          {directionalTerms.map((t) => (
            <div
              key={t.en}
              className="rounded-xl border border-[var(--line)] bg-[var(--card)] px-3 py-3"
            >
              <p className="term text-xs text-[var(--ink-soft)]">{t.en}</p>
              <p className="font-semibold">{t.he}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="text-center text-xs text-[var(--ink-soft)]">
        {dictionaryTerms.length} מונחים במילון השלד-שריר
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
