"use client";

import { useState } from "react";
import {
  NUMBER_GROUPS,
  searchNumbers,
  USEFUL_NUMBERS,
  type NumberGroupId,
} from "@/data/physiology/numbers";
import { cn } from "@/lib/utils";

export function NumbersView({ query, hide }: { query: string; hide: boolean }) {
  const [group, setGroup] = useState<NumberGroupId | "all">("all");
  const items = searchNumbers(query, group);

  return (
    <div className="space-y-4">
      <p className="max-w-3xl text-sm text-[var(--ink-soft)]">
        המספרים שמופיעים בחומר ושווה לשנן למבחן: זמני מסלולים, קלוריות, גליקוגן, סף
        והתאוששות. {USEFUL_NUMBERS.length} מספרים.
      </p>

      <div className="no-print flex flex-wrap gap-1.5">
        <FilterChip active={group === "all"} onClick={() => setGroup("all")}>
          All · הכל ({searchNumbers(query).length})
        </FilterChip>
        {NUMBER_GROUPS.map((g) => (
          <FilterChip key={g.id} active={group === g.id} onClick={() => setGroup(g.id)}>
            <span className="term font-bold">{g.en}</span>
            <span className="font-normal"> · {g.he}</span> ({searchNumbers(query, g.id).length})
          </FilterChip>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--card)] px-6 py-12 text-center text-sm text-[var(--ink-soft)]">
          אין מספרים לחיפוש הזה.
        </p>
      ) : (
        <div className="space-y-6">
          {NUMBER_GROUPS.filter((g) => group === "all" || group === g.id).map((g) => {
            const rows = items.filter((item) => item.group === g.id);
            if (rows.length === 0) return null;
            return (
              <section key={g.id}>
                <h2 className="mb-2 text-sm font-bold">
                  <span className="term text-[var(--accent-2)]">{g.en}</span>
                  <span className="mx-1.5 opacity-40">·</span>
                  {g.he}
                </h2>
                <ul className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)]">
                  {rows.map((item) => (
                    <li
                      key={item.id}
                      className="grid grid-cols-1 gap-1 border-b border-[var(--line)] px-4 py-3 last:border-0 sm:grid-cols-[9.5rem_1fr] sm:items-start sm:gap-4"
                    >
                      <p
                        className={cn(
                          "w-fit text-lg font-bold leading-tight text-[var(--accent-2)]",
                          hide && "hide-study",
                        )}
                      >
                        {pinNumbers(item.value)}
                      </p>
                      <div>
                        <p className="font-semibold">{item.titleHe}</p>
                        <p className="mt-0.5 text-sm leading-relaxed text-[var(--ink-soft)]">
                          {pinNumbers(item.noteHe)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Keeps ranges like 4–8 from flipping to 8–4 in RTL. */
function pinNumbers(value: string) {
  return value.replace(
    /[+\u00d7]?\d[\d,.]*(?:\s*[–\-→+]\s*[+\u00d7]?\d[\d,.]*)*%?/g,
    (match) => `\u200E${match}\u200E`,
  );
}

function FilterChip({
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
