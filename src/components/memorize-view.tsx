"use client";

import { useMemo, useState } from "react";
import { Hash } from "lucide-react";
import { muscles } from "@/data/muscles";
import {
  hooksForRegion,
  hooksMatchingQuery,
  type OiHook,
  type OiKind,
} from "@/data/oi-mnemonics";
import { REGIONS, REGION_COLORS, type RegionId } from "@/data/regions";
import { AnatomyThumb } from "@/components/anatomy-image";
import { EmptyState } from "@/components/muscle-table";
import { bilingual, NamePair } from "@/components/name-pair";
import { cn } from "@/lib/utils";

const KIND_FILTERS: { id: OiKind | "all"; en: string; he: string }[] = [
  { id: "all", en: "All attachments", he: "כל האחיזות" },
  { id: "origin", en: "Origin", he: "התחלה" },
  { id: "insertion", en: "Insertion", he: "סיום" },
  { id: "both", en: "Origin + Insertion", he: "התחלה + סיום" },
];

const KIND_LABEL: Record<OiKind, { en: string; he: string }> = {
  origin: { en: "Origin", he: "התחלה" },
  insertion: { en: "Insertion", he: "סיום" },
  both: { en: "Origin + Insertion", he: "התחלה + סיום" },
};

const TIPS = [
  {
    n: "1",
    titleEn: "Park the group first",
    titleHe: "קודם חונים את הקבוצה",
    bodyEn: "One landmark, one acronym. Then fill the individual parking spaces.",
    bodyHe: "נקודה אחת, קיצור אחד. אחר כך אם ממלאים את המקומות.",
  },
  {
    n: "2",
    titleEn: "The name is often the map",
    titleHe: "השם הוא לעיתים המפה",
    bodyEn: "SCM, iliopsoas, flexor carpi radialis — read the Latin before you memorize.",
    bodyHe: "SCM, iliopsoas, flexor carpi radialis — קוראים את הלטינית לפני שמשננים.",
  },
  {
    n: "3",
    titleEn: "Hide, then say it out loud",
    titleHe: "מסתירים, ואז אומרים בקול",
    bodyEn: "Cover the hook. See the acronym. Recite the landmark and the muscles.",
    bodyHe: "מכסים את הקיצור. רואים את ראשי התיבות. אומרים את הנקודה ואת השרירים.",
  },
];

export function MemorizeView({
  region,
  query,
}: {
  region: RegionId | "all";
  query: string;
}) {
  const [kind, setKind] = useState<OiKind | "all">("all");
  const [hideHook, setHideHook] = useState(false);
  const [hideMembers, setHideMembers] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  const hooks = useMemo(() => {
    const byRegion = hooksForRegion(region);
    const allowed = new Set(byRegion.map((h) => h.id));
    return hooksMatchingQuery(query)
      .filter((h) => allowed.has(h.id))
      .filter((h) => kind === "all" || h.kind === kind);
  }, [region, query, kind]);

  const grouped = useMemo(() => {
    if (region !== "all") {
      const r = REGIONS.find((x) => x.id === region);
      return r ? [{ region: r, hooks }] : [];
    }
    return REGIONS.map((r) => ({
      region: r,
      hooks: hooks.filter((h) => h.regions[0] === r.id),
    })).filter((g) => g.hooks.length > 0);
  }, [hooks, region]);

  const selected = hooks.find((h) => h.id === openId) ?? hooks[0] ?? null;

  return (
    <div className="space-y-6">
      <section>
        <p className="text-[11px] font-semibold tracking-[0.22em] text-[var(--accent)] uppercase">
          Memorize attachments · Deduce actions
        </p>
        <h2 className="mt-1 text-2xl font-bold">Memory tips · טיפים לשינון</h2>
        <p className="mt-1 text-lg font-semibold text-[var(--ink-soft)]">
          Origin ו־Insertion — לפי קבוצות, לא שריר־שריר.
        </p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--ink-soft)]">
          Actions come from side + joint. These tips are only for who parks on the same bone point.
          תנועות מסיקים מהצד ומהמפרק. הטיפים האלה רק למי חונה על אותה נקודת עצם.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {TIPS.map((t) => (
            <article
              key={t.n}
              className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-sm"
            >
              <p className="term text-xs font-bold text-[var(--accent)]">{t.n}</p>
              <h3 className="mt-1 text-sm font-bold leading-snug">{t.titleHe}</h3>
              <p className="term mt-0.5 text-[11px] text-[var(--ink-soft)]">{t.titleEn}</p>
              <p className="mt-2 text-xs leading-relaxed">{t.bodyHe}</p>
              <p className="term mt-1 text-[11px] leading-relaxed text-[var(--ink-soft)]">{t.bodyEn}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        {KIND_FILTERS.map((k) => (
          <button
            key={k.id}
            type="button"
            onClick={() => setKind(k.id)}
            className={cn(
              "rounded-full border px-2.5 py-1 text-xs font-medium transition",
              kind === k.id
                ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                : "border-[var(--line)] bg-[var(--card)] text-[var(--ink-soft)] hover:border-[var(--ink)]",
            )}
          >
            <span className="term font-bold">{k.en}</span>
            <span className="font-normal"> · {k.he}</span>
          </button>
        ))}
        <span className="text-[var(--ink-soft)]">Hide to practice · הסתר לתרגול:</span>
        <label className="flex items-center gap-1.5">
          <input
            type="checkbox"
            checked={hideHook}
            onChange={(e) => setHideHook(e.target.checked)}
          />
          Tip · הקיצור
        </label>
        <label className="flex items-center gap-1.5">
          <input
            type="checkbox"
            checked={hideMembers}
            onChange={(e) => setHideMembers(e.target.checked)}
          />
          Muscles · שרירים
        </label>
        <span className="ms-auto text-xs text-[var(--ink-soft)]">
          {hooks.length} hooks · קיצורים
        </span>
      </div>

      {hooks.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {hooks.map((h) => (
            <button
              key={h.id}
              type="button"
              onClick={() => setOpenId(h.id)}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[11px] font-bold transition",
                selected?.id === h.id
                  ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                  : "border-[var(--accent)]/30 bg-[var(--paper-2)] hover:border-[var(--ink)]",
              )}
            >
              {h.acronym}
            </button>
          ))}
        </div>
      )}

      {hooks.length === 0 ? (
        <EmptyState
          title="No matching tips · אין טיפים תואמים"
          body="Try another region, search, or attachment filter. · נסו אזור, חיפוש או סינון אחר."
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)]">
          <div className="space-y-6">
            {grouped.map((g) => (
              <section key={g.region.id}>
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
                      REGION_COLORS[g.region.id],
                    )}
                  >
                    {bilingual(g.region.en, g.region.he)}
                  </span>
                  <span className="text-[11px] text-[var(--ink-soft)]">{g.hooks.length}</span>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {g.hooks.map((h) => (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => setOpenId(h.id)}
                      className={cn(
                        "rounded-2xl border p-4 text-right shadow-sm transition",
                        selected?.id === h.id
                          ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                          : "border-[var(--line)] bg-[var(--card)] hover:border-[var(--ink)]",
                      )}
                    >
                      <MemorizeCard
                        hook={h}
                        hideHook={hideHook}
                        hideMembers={hideMembers}
                        ink={selected?.id === h.id}
                      />
                    </button>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {selected && (
            <aside className="h-fit rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-sm lg:sticky lg:top-28">
              <div className="flex items-center gap-2">
                <Hash className="size-4 text-[var(--accent)]" />
                <p className="term text-2xl font-bold">{selected.acronym}</p>
              </div>
              <h3 className="mt-2 text-lg font-bold">{selected.titleEn}</h3>
              <p className="text-sm text-[var(--ink-soft)]">{selected.titleHe}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                {KIND_LABEL[selected.kind].en} · {KIND_LABEL[selected.kind].he}
              </p>
              <p className="mt-1 text-sm font-medium">{selected.landmarkEn}</p>
              <p className="text-xs text-[var(--ink-soft)]">{selected.landmarkHe}</p>
              <p className="mt-3 text-sm leading-relaxed">{selected.hookHe}</p>
              <p className="term mt-1 text-xs leading-relaxed text-[var(--ink-soft)]">{selected.hookEn}</p>
              <p className="mt-3 text-xs leading-relaxed text-[var(--ink-soft)]">{selected.detailHe}</p>
              <p className="term mt-1 text-[11px] leading-relaxed text-[var(--ink-soft)]">
                {selected.detailEn}
              </p>
              <div className="mt-4 space-y-2">
                {selected.muscleIds.map((id) => {
                  const m = muscles.find((x) => x.id === id);
                  if (!m) return null;
                  return (
                    <div
                      key={id}
                      className="flex items-start gap-2 rounded-xl border border-[var(--line)] bg-[var(--paper)]/70 p-2"
                    >
                      <AnatomyThumb
                        kind="muscles"
                        id={m.id}
                        alt={m.nameHe}
                        size="sm"
                        interactive={false}
                      />
                      <div className="min-w-0">
                        <NamePair
                          en={m.nameEn}
                          he={m.nameHe}
                          enClassName="text-sm"
                          heClassName="text-xs"
                        />
                        <p className="mt-1 text-[11px] text-[var(--ink-soft)]">
                          O: {m.originEn}
                        </p>
                        <p className="text-[11px] text-[var(--ink-soft)]">I: {m.insertionEn}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </aside>
          )}
        </div>
      )}
    </div>
  );
}

function MemorizeCard({
  hook,
  hideHook,
  hideMembers,
  ink,
}: {
  hook: OiHook;
  hideHook: boolean;
  hideMembers: boolean;
  ink: boolean;
}) {
  const kind = KIND_LABEL[hook.kind];
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "term rounded-full px-2.5 py-0.5 text-xs font-bold",
            ink ? "bg-white/15 text-[var(--paper)]" : "bg-[var(--ink)] text-[var(--paper)]",
          )}
        >
          {hook.acronym}
        </span>
        <span className={cn("text-[10px] font-semibold uppercase tracking-wider", ink ? "opacity-70" : "text-[var(--accent)]")}>
          {kind.en} · {kind.he}
        </span>
      </div>
      <h4 className="mt-2 text-sm font-bold leading-snug">{hook.titleEn}</h4>
      <p className={cn("text-xs", ink ? "opacity-70" : "text-[var(--ink-soft)]")}>{hook.titleHe}</p>
      <p className={cn("mt-2 text-[11px] font-medium", hideHook && "hide-study")}>
        {hook.landmarkEn}
        <span className={cn("font-normal", ink ? "opacity-70" : "text-[var(--ink-soft)]")}>
          {" "}
          · {hook.landmarkHe}
        </span>
      </p>
      <p className={cn("mt-2 text-xs leading-relaxed", hideHook && "hide-study")}>{hook.hookHe}</p>
      <p
        className={cn(
          "term mt-1 text-[11px] leading-relaxed",
          ink ? "opacity-70" : "text-[var(--ink-soft)]",
          hideHook && "hide-study",
        )}
      >
        {hook.hookEn}
      </p>
      <p
        className={cn(
          "mt-2 text-[11px] leading-relaxed",
          ink ? "opacity-70" : "text-[var(--ink-soft)]",
          hideMembers && "hide-study",
        )}
      >
        {hook.muscleIds
          .map((id) => {
            const m = muscles.find((x) => x.id === id);
            return m ? bilingual(m.nameEn, m.nameHe) : id;
          })
          .join(" · ")}
      </p>
    </div>
  );
}
