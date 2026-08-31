import type { Muscle } from "@/data/types";
import { REGIONS, REGION_COLORS } from "@/data/regions";
import { cn } from "@/lib/utils";

type Hidden = { o: boolean; i: boolean; a: boolean };

export function MuscleTable({
  muscles,
  hidden,
}: {
  muscles: Muscle[];
  hidden: Hidden;
}) {
  if (muscles.length === 0) {
    return (
      <EmptyState title="אין שרירים תואמים" body="נסו מילת חיפוש אחרת או אפסו את הסינון." />
    );
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-sm md:block">
        <table className="w-full text-sm">
          <thead className="bg-[var(--paper-2)] text-right text-xs uppercase tracking-wide text-[var(--ink-soft)]">
            <tr>
              <th className="px-4 py-3 font-semibold">שריר</th>
              <th className="px-4 py-3 font-semibold">
                Origin <span className="font-normal">התחלה</span>
              </th>
              <th className="px-4 py-3 font-semibold">
                Insertion <span className="font-normal">סיום</span>
              </th>
              <th className="px-4 py-3 font-semibold">
                Action <span className="font-normal">תנועה</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {muscles.map((m) => (
              <tr key={m.id} className="border-t border-[var(--line)] align-top even:bg-[var(--paper)]/50">
                <td className="px-4 py-3">
                  <MuscleName m={m} />
                </td>
                <td className={cn("px-4 py-3", hidden.o && "hide-study")}>
                  <p>{m.originHe}</p>
                  <p className="term mt-1 text-xs text-[var(--ink-soft)]">{m.originEn}</p>
                </td>
                <td className={cn("px-4 py-3", hidden.i && "hide-study")}>
                  <p>{m.insertionHe}</p>
                  <p className="term mt-1 text-xs text-[var(--ink-soft)]">{m.insertionEn}</p>
                </td>
                <td className={cn("px-4 py-3", hidden.a && "hide-study")}>
                  <p>{m.actionHe}</p>
                  <p className="term mt-1 text-xs text-[var(--ink-soft)]">{m.actionEn}</p>
                  {m.innervation && (
                    <p className="mt-1 text-[11px] text-[var(--ink-soft)]">עצבוב: {m.innervation}</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 md:hidden">
        {muscles.map((m) => (
          <article
            key={m.id}
            className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-sm"
          >
            <MuscleName m={m} />
            <Field label="Origin · התחלה" hidden={hidden.o} he={m.originHe} en={m.originEn} />
            <Field label="Insertion · סיום" hidden={hidden.i} he={m.insertionHe} en={m.insertionEn} />
            <Field label="Action · תנועה" hidden={hidden.a} he={m.actionHe} en={m.actionEn} />
            {m.innervation && (
              <p className="mt-2 text-xs text-[var(--ink-soft)]">עצבוב: {m.innervation}</p>
            )}
            {m.notes && <p className="mt-2 text-xs text-[var(--accent)]">{m.notes}</p>}
          </article>
        ))}
      </div>
    </>
  );
}

function MuscleName({ m }: { m: Muscle }) {
  const region = REGIONS.find((r) => r.id === m.region);
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-bold">{m.nameHe}</span>
        {!m.core && (
          <span className="rounded-full border border-[var(--line)] px-2 py-0.5 text-[10px] text-[var(--ink-soft)]">
            הרחבה
          </span>
        )}
      </div>
      <p className="term text-xs text-[var(--ink-soft)]">{m.nameEn}</p>
      {region && (
        <span
          className={cn(
            "mt-1 inline-block rounded-full border px-2 py-0.5 text-[10px] font-medium",
            REGION_COLORS[m.region],
          )}
        >
          {region.he}
        </span>
      )}
    </div>
  );
}

function Field({
  label,
  he,
  en,
  hidden,
}: {
  label: string;
  he: string;
  en: string;
  hidden: boolean;
}) {
  return (
    <div className="mt-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
        {label}
      </p>
      <div className={cn(hidden && "hide-study")}>
        <p className="mt-0.5 text-sm">{he}</p>
        <p className="term text-xs text-[var(--ink-soft)]">{en}</p>
      </div>
    </div>
  );
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--card)] px-6 py-16 text-center">
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm text-[var(--ink-soft)]">{body}</p>
    </div>
  );
}
