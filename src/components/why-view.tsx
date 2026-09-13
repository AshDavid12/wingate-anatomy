"use client";

import { useMemo, useState } from "react";
import { Lightbulb } from "lucide-react";
import type { Muscle } from "@/data/types";
import { REGIONS, REGION_COLORS, type RegionId } from "@/data/regions";
import {
  MOVE_RULES,
  SIDE_ROWS,
  logicByRegion,
  whyById,
  type RegionLogic,
} from "@/data/why-moves";
import { muscles } from "@/data/muscles";
import { AnatomyThumb } from "@/components/anatomy-image";
import { NamePair, bilingual } from "@/components/name-pair";
import { MuscleHookBox } from "@/components/oi-mnemonics";
import { cn } from "@/lib/utils";

export function WhyView({
  list,
  region,
}: {
  list: Muscle[];
  region: RegionId | "all";
}) {
  const [openId, setOpenId] = useState<string | null>(list[0]?.id ?? null);
  const logic = region === "all" ? undefined : logicByRegion(region);

  const selectedId = list.some((m) => m.id === openId) ? openId : (list[0]?.id ?? null);

  return (
    <div className="space-y-8">
      <section>
        <p className="text-[11px] font-semibold tracking-[0.22em] text-[var(--accent)] uppercase">
          Stop memorizing · Start deducing
        </p>
        <h2 className="mt-1 text-2xl font-bold">Don&apos;t memorize actions. Deduce them.</h2>
        <p className="mt-1 text-lg font-semibold text-[var(--ink-soft)]">
          אל תזכרו תנועות. תסיקו אותן.
        </p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[var(--ink-soft)]">
          A muscle has no private magic — only a rubber band from Origin to Insertion.
          See where it comes from, which joint it crosses, and which side it sits on, and
          the action is a conclusion, not a list.
        </p>
        <p className="mt-1 max-w-3xl text-sm leading-relaxed text-[var(--ink-soft)]">
          לכל שריר אין ״קסם״ משלו. יש גומייה בין Origin ל־Insertion. ברגע שאתם רואים מאיפה
          היא באה, איזה מפרק היא חוצה, ואיפה היא יושבת — הפעולה כבר לא רשימה, היא מסקנה.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-5">
          {MOVE_RULES.map((r) => (
            <article
              key={r.n}
              className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-sm"
            >
              <p className="term text-xs font-bold text-[var(--accent)]">{r.n}</p>
              <h3 className="mt-1 text-sm font-bold leading-snug">{r.titleHe}</h3>
              <p className="term mt-0.5 text-[11px] text-[var(--ink-soft)]">{r.titleEn}</p>
              <p className="mt-2 text-xs leading-relaxed">{r.bodyHe}</p>
              <p className="term mt-1 text-[11px] leading-relaxed text-[var(--ink-soft)]">{r.bodyEn}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-dashed border-[var(--accent)]/40 bg-[var(--paper-2)] p-4">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-[var(--accent)] uppercase">
          Do memorize this · את זה כן לשנן
        </p>
        <h3 className="mt-1 text-lg font-bold">Origin and Insertion — by groups</h3>
        <p className="mt-1 max-w-3xl text-sm text-[var(--ink-soft)]">
          Actions are deduced here. The acronyms live in{" "}
          <span className="term font-semibold">Memorize · שינון</span>: SITS, PFPF, SGT, CAS…
          תנועות מסיקים כאן. ראשי התיבות בלשונית «שינון».
        </p>
      </section>

      <SideTable />

      {logic ? (
        <RegionLogicCard logic={logic} />
      ) : (
        <section className="space-y-3">
          <h3 className="text-lg font-bold">Compartment map by region · מפת תאים לפי אזור</h3>
          <p className="text-sm text-[var(--ink-soft)]">
            Pick a region above, or browse here. One compartment = one job. The muscles inside are the details.
            בחרו אזור למעלה, או עברו כאן. כל תא = אותה עבודה. השרירים בפנים רק מפרט.
          </p>
          <div className="grid gap-3 lg:grid-cols-2">
            {REGIONS.map((r) => {
              const item = logicByRegion(r.id);
              if (!item) return null;
              return <RegionLogicCard key={r.id} logic={item} compact />;
            })}
          </div>
        </section>
      )}

      <WhyDrill pool={list} />

      <section>
        <h3 className="text-lg font-bold">Why this muscle moves that way · למה השריר הזה זז ככה</h3>
        <p className="mt-1 text-sm text-[var(--ink-soft)]">
          Three steps: side → joints it crosses → conclusion. Click a muscle.
          שלושה צעדים: צד → מפרקים שהוא חוצה → מסקנה. לחצו על שריר.
        </p>
        <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,280px)_1fr]">
          <div className="max-h-[560px] space-y-1 overflow-auto rounded-2xl border border-[var(--line)] bg-[var(--card)] p-2">
            {list.map((m) => {
              const active = selectedId === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setOpenId(m.id)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-xl px-2 py-1.5 text-right text-sm transition",
                    active
                      ? "bg-[var(--ink)] text-[var(--paper)]"
                      : "hover:bg-[var(--paper-2)]",
                  )}
                >
                  <AnatomyThumb
                    kind="muscles"
                    id={m.id}
                    alt=""
                    size="sm"
                    className="!h-10 !w-10"
                    interactive={false}
                  />
                  <span className="min-w-0">
                    <span className="term block truncate font-bold">{m.nameEn}</span>
                    <span className={cn("block truncate text-[11px]", active ? "opacity-70" : "text-[var(--ink-soft)]")}>
                      {m.nameHe}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          {selectedId ? <MuscleWhyPanel muscleId={selectedId} /> : (
            <div className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--card)] p-6 text-sm text-[var(--ink-soft)]">
              No muscles in this filter. · אין שרירים בסינון הזה.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export function RegionLogicBanner({ regionId }: { regionId: RegionId }) {
  const logic = logicByRegion(regionId);
  if (!logic) return null;
  return <RegionLogicCard logic={logic} compact />;
}

export function MuscleWhyBox({ muscleId, ink }: { muscleId: string; ink?: boolean }) {
  const why = whyById(muscleId);
  if (!why) return null;
  return (
    <div
      className={cn(
        "rounded-xl border p-3",
        ink
          ? "border-white/20 bg-white/5"
          : "border-[var(--accent)]/30 bg-[var(--paper-2)]",
      )}
    >
      <p
        className={cn(
          "text-[10px] font-semibold uppercase tracking-wider",
          ink ? "text-amber-200" : "text-[var(--accent)]",
        )}
      >
        Why it moves · למה זה זז
      </p>
      <p className="mt-1 text-sm leading-relaxed">{why.becauseHe}</p>
      <p className="term mt-1 text-xs leading-relaxed opacity-70">{why.becauseEn}</p>
    </div>
  );
}

function SideTable() {
  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-sm">
      <div className="border-b border-[var(--line)] bg-[var(--paper-2)] px-4 py-3">
        <h3 className="font-bold">The side card — this has to sit in your head</h3>
        <p className="text-sm text-[var(--ink-soft)]">כרטיס הצד — זה מה שצריך לשבת בראש</p>
        <p className="mt-1 text-xs text-[var(--ink-soft)]">
          Most joints follow the same map. The knee is reversed. The ankle uses different words
          (dorsi / plantar) but front still lifts and back still presses the gas.
          רוב המפרקים מתנהגים אותו דבר. הברך הפוכה. הקרסול מדבר בשפה אחרת (דורסי / פלנטר)
          אבל הקדמי עדיין ״מרים״ והאחורי ״לוחץ גז״.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="text-xs text-[var(--ink-soft)]">
            <tr>
              <th className="px-4 py-2 text-right font-semibold">Side · צד</th>
              <th className="px-4 py-2 text-right font-semibold">Shoulder · elbow · hip · trunk · כתף · מרפק · ירך · גו</th>
              <th className="px-4 py-2 text-right font-semibold">Knee exception · ברך — היוצא מן הכלל</th>
              <th className="px-4 py-2 text-right font-semibold">Ankle · קרסול</th>
            </tr>
          </thead>
          <tbody>
            {SIDE_ROWS.map((row) => (
              <tr key={row.sideHe} className="border-t border-[var(--line)]">
                <td className="px-4 py-2 font-medium">{row.sideHe}</td>
                <td className="px-4 py-2">
                  <NamePair en={row.typicalEn} he={row.typicalHe} stacked={false} />
                </td>
                <td className="bg-amber-50/80 px-4 py-2">
                  <NamePair en={row.kneeEn} he={row.kneeHe} stacked={false} />
                </td>
                <td className="px-4 py-2">
                  <NamePair en={row.ankleEn} he={row.ankleHe} stacked={false} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function RegionLogicCard({ logic, compact }: { logic: RegionLogic; compact?: boolean }) {
  const region = REGIONS.find((r) => r.id === logic.region);
  return (
    <article className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        {region && (
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 text-[11px] font-medium",
              REGION_COLORS[logic.region],
            )}
          >
            {bilingual(region.en, region.he)}
          </span>
        )}
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
          Compartment map · מפת תא
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed">{logic.gistHe}</p>
      <p className="term mt-1 text-xs text-[var(--ink-soft)]">{logic.gistEn}</p>
      <div className={cn("mt-3 grid gap-2", compact ? "sm:grid-cols-2" : "md:grid-cols-2")}>
        {logic.groups.map((g) => (
          <div key={g.sideEn} className="rounded-xl border border-[var(--line)] bg-[var(--paper)]/60 px-3 py-2">
            <p className="text-xs font-bold">
              {g.sideHe} <span className="term font-semibold text-[var(--ink-soft)]">· {g.sideEn}</span>
            </p>
            <p className="mt-0.5 text-sm">{g.jobHe}</p>
            <p className="mt-1 text-[11px] leading-relaxed text-[var(--ink-soft)]">
              {g.muscleIds
                .map((id) => muscles.find((m) => m.id === id)?.nameEn)
                .filter(Boolean)
                .join(" · ")}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

function MuscleWhyPanel({ muscleId }: { muscleId: string }) {
  const muscle = muscles.find((m) => m.id === muscleId);
  const why = whyById(muscleId);
  if (!muscle || !why) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--card)] p-6 text-sm text-[var(--ink-soft)]">
        No explanation yet for this muscle. · אין עדיין הסבר לשריר הזה.
      </div>
    );
  }
  return (
    <article className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <AnatomyThumb kind="muscles" id={muscle.id} alt={muscle.nameHe} size="md" />
        <div>
          <NamePair en={muscle.nameEn} he={muscle.nameHe} enClassName="text-xl" heClassName="text-sm" />
          <p className="mt-1 text-xs text-[var(--ink-soft)]">{muscle.actionHe}</p>
        </div>
      </div>
      <ol className="mt-4 grid gap-2 md:grid-cols-3">
        <Step n="1" label="צד" en="Side" he={why.sideHe} enBody={why.sideEn} />
        <Step n="2" label="חוצה" en="Crosses" he={why.crossesHe} enBody={why.crossesEn} />
        <Step n="3" label="מסקנה" en="Therefore" he={muscle.actionHe} enBody={muscle.actionEn} />
      </ol>
      <div className="mt-4">
        <MuscleWhyBox muscleId={muscle.id} />
      </div>
      <div className="mt-4">
        <MuscleHookBox muscleId={muscle.id} />
      </div>
      <div className="mt-4 grid gap-3 text-xs md:grid-cols-2">
        <div>
          <p className="font-semibold text-[var(--accent)]">Origin</p>
          <NamePair en={muscle.originEn} he={muscle.originHe} enClassName="text-xs" heClassName="text-xs" />
        </div>
        <div>
          <p className="font-semibold text-[var(--accent)]">Insertion</p>
          <NamePair en={muscle.insertionEn} he={muscle.insertionHe} enClassName="text-xs" heClassName="text-xs" />
        </div>
      </div>
    </article>
  );
}

function Step({
  n,
  label,
  en,
  he,
  enBody,
}: {
  n: string;
  label: string;
  en: string;
  he: string;
  enBody: string;
}) {
  return (
    <li className="rounded-xl border border-[var(--line)] bg-[var(--paper)]/70 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
        {n} · {label} · {en}
      </p>
      <p className="mt-1 text-sm font-medium leading-snug">{he}</p>
      <p className="term mt-0.5 text-[11px] text-[var(--ink-soft)]">{enBody}</p>
    </li>
  );
}

function WhyDrill({ pool }: { pool: Muscle[] }) {
  const usable = useMemo(() => pool.filter((m) => whyById(m.id)), [pool]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const muscle = usable[index % Math.max(usable.length, 1)];
  const why = muscle ? whyById(muscle.id) : undefined;

  function next() {
    setRevealed(false);
    setIndex((n) => n + 1);
  }

  if (!muscle || !why) return null;

  return (
    <section className="rounded-2xl border border-[var(--ink)] bg-[var(--ink)] p-5 text-[var(--paper)] shadow-sm">
      <div className="flex items-center gap-2">
        <Lightbulb className="size-4 text-amber-200" />
        <h3 className="font-bold">Logic drill · תרגול היגיון</h3>
      </div>
      <p className="mt-1 text-xs opacity-70">
        Look at Origin and Insertion. Say out loud: which joint? which side? then the action.
        ראו Origin ו־Insertion. אמרו בקול: איזה מפרק? איזה צד? ורק אז את הפעולה.
      </p>
      <div className="mt-4 grid gap-4 md:grid-cols-[160px_1fr]">
        <AnatomyThumb
          kind="muscles"
          id={muscle.id}
          alt={muscle.nameHe}
          size="lg"
          className="border-white/15"
          interactive={false}
        />
        <div>
          <p className="term text-2xl font-bold">{muscle.nameEn}</p>
          <p className="text-sm opacity-70">{muscle.nameHe}</p>
          <div className="mt-3 grid gap-2 text-sm md:grid-cols-2">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-amber-200">Origin</p>
              <p>{muscle.originHe}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-amber-200">Insertion</p>
              <p>{muscle.insertionHe}</p>
            </div>
          </div>
          <p className="mt-3 text-sm opacity-80">
            Hint · רמז: {why.sideEn} · {why.sideHe} · crosses {why.crossesEn} · חוצה {why.crossesHe}
          </p>
        </div>
      </div>
      {!revealed ? (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="mt-4 rounded-full bg-[var(--paper)] px-5 py-2 text-sm font-medium text-[var(--ink)]"
        >
          Reveal the conclusion · חשפו את המסקנה
        </button>
      ) : (
        <div className="mt-4 space-y-3">
          <p className="text-sm font-semibold">{muscle.actionHe}</p>
          <MuscleWhyBox muscleId={muscle.id} ink />
          <button
            type="button"
            onClick={next}
            className="rounded-full border border-white/30 px-5 py-2 text-sm"
          >
            Next muscle · שריר הבא
          </button>
        </div>
      )}
    </section>
  );
}
