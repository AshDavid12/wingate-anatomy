import { cn } from "@/lib/utils";

export function bilingual(en?: string, he?: string) {
  if (en && he) return `${en} · ${he}`;
  return en || he || "";
}

export function NamePair({
  en,
  he,
  className,
  enClassName,
  heClassName,
  stacked = true,
  hide,
}: {
  en?: string;
  he?: string;
  className?: string;
  enClassName?: string;
  heClassName?: string;
  stacked?: boolean;
  hide?: boolean;
}) {
  if (!en && !he) return null;
  if (!stacked) {
    return (
      <span className={cn(hide && "hide-study", className)}>
        {en && <span className={cn("term font-bold", enClassName)}>{en}</span>}
        {en && he ? <span className="font-normal opacity-50"> · </span> : null}
        {he && <span className={cn("font-normal text-[var(--ink-soft)]", heClassName)}>{he}</span>}
      </span>
    );
  }
  return (
    <div className={cn(hide && "hide-study", className)}>
      {en && <p className={cn("term font-bold", enClassName)}>{en}</p>}
      {he && <p className={cn("text-[var(--ink-soft)]", heClassName)}>{he}</p>}
    </div>
  );
}
