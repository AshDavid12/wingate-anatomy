"use client";

import { useMemo, useState } from "react";
import { JOINT_PATTERNS, type JointPattern } from "@/data/exercises/joints";
import { REGIONS, type RegionId } from "@/data/exercises/content";
import { cn } from "@/lib/utils";

export function ExercisesJoints({ query }: { query: string }) {
  const [region, setRegion] = useState<RegionId | "all">("all");
  const [onlyMistakes, setOnlyMistakes] = useState(false);
  const [hide, setHide] = useState(false);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return JOINT_PATTERNS.filter((item) => {
      if (region !== "all" && item.region !== region) return false;
      if (onlyMistakes && !item.mistakes?.length) return false;
      if (!q) return true;
      const hay = [
        item.he,
        item.en,
        item.when,
        item.hold ?? "",
        ...(item.mistakes ?? []),
        ...item.rows.flatMap((row) => [row.joint, row.action, row.agonist, row.synergist ?? ""]),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query, region, onlyMistakes]);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold">מפרק, ואז שריר · Joints</h2>
        <p className="mt-1 max-w-3xl text-sm text-[var(--ink-soft)]">
          במבחן מפרקים תרגיל מפרק-מפרק: איזה מפרק זז, מי האגוניסט, ומי רק עוזר. אחר כך מדגימים
          את הטעויות של אותו תרגיל.
        </p>
      </div>
      <div className="no-print flex flex-wrap items-center gap-1.5">
        <Chip active={region === "all"} onClick={() => setRegion("all")}>
          הכל ({list.length})
        </Chip>
        {REGIONS.map((item) => (
          <Chip key={item.id} active={region === item.id} onClick={() => setRegion(item.id)}>
            {item.he}
          </Chip>
        ))}
        <Chip active={onlyMistakes} onClick={() => setOnlyMistakes((value) => !value)}>
          רק טעויות
        </Chip>
        <label className="flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)] px-3 py-1 text-xs">
          <input type="checkbox" checked={hide} onChange={(event) => setHide(event.target.checked)} />
          הסתר שרירים וטעויות
        </label>
      </div>
      {list.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--card)] px-6 py-12 text-center text-sm text-[var(--ink-soft)]">
          אין תרגיל לסינון הזה.
        </p>
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {list.map((item) => (
            <PatternCard key={item.id} item={item} hide={hide} />
          ))}
        </div>
      )}
    </div>
  );
}

function PatternCard({ item, hide }: { item: JointPattern; hide: boolean }) {
  const region = REGIONS.find((entry) => entry.id === item.region)?.he;
  return (
    <article className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4">
      <p className="text-[11px] font-semibold text-[var(--accent)]">{region}</p>
      <h3 className="mt-1 text-base font-bold">
        {item.he} <span className="term font-semibold text-[var(--ink-soft)]">{item.en}</span>
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-[var(--ink-soft)]">{pinNumbers(item.when)}</p>
      <ul className="mt-3 space-y-2">
        {item.rows.map((row) => (
          <li key={`${row.joint}-${row.action}`} className="rounded-xl bg-[var(--paper)] px-3 py-2">
            <p className="text-sm font-semibold">
              {row.joint}
              <span className="font-normal text-[var(--ink-soft)]"> · {row.action}</span>
              {row.still && <span className="mr-2 text-xs font-medium text-[var(--accent)]">סטטי</span>}
            </p>
            <p className={cn("mt-1 text-sm", hide && "hide-study")}>
              <span className="text-[var(--ink-soft)]">אגוניסט </span>
              <span className="term">{row.agonist}</span>
            </p>
            {row.synergist && (
              <p className={cn("text-sm", hide && "hide-study")}>
                <span className="text-[var(--ink-soft)]">סינרגיסט </span>
                <span className="term">{row.synergist}</span>
              </p>
            )}
          </li>
        ))}
      </ul>
      {item.hold && (
        <p className={cn("mt-3 text-sm leading-relaxed", hide && "hide-study")}>{item.hold}</p>
      )}
      {item.mistakes && item.mistakes.length > 0 && (
        <div className={cn("mt-3", hide && "hide-study")}>
          <p className="text-[11px] font-semibold text-[var(--accent)]">טעויות לזכור</p>
          <ul className="mt-1 space-y-1 text-sm leading-relaxed">
            {item.mistakes.map((mistake) => (
              <li key={mistake}>{pinNumbers(mistake)}</li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

function Chip({
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
        "rounded-full border px-3 py-1 text-xs font-medium transition",
        active
          ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
          : "border-[var(--line)] bg-[var(--card)] text-[var(--ink)]",
      )}
    >
      {children}
    </button>
  );
}

function pinNumbers(value: string) {
  return value.replace(
    /[+\u00d7]?\d[\d,.]*(?:\s*[–\-−/]\s*[+\u00d7]?\d[\d,.]*)*%?/g,
    (match) => `\u200E${match}\u200E`,
  );
}
