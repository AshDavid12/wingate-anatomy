"use client";

import { useMemo, useState } from "react";
import { muscles } from "@/data/muscles";
import { bones } from "@/data/bones";
import { joints } from "@/data/joints";
import { anatomyImage, type AnatomyKind } from "@/data/anatomy-images";
import { AnatomyLightbox, AnatomyThumb } from "@/components/anatomy-image";
import { REGIONS, REGION_COLORS } from "@/data/regions";
import { cn } from "@/lib/utils";

type Kind = Exclude<AnatomyKind, "regions">;

const LABELS: { id: Kind; he: string }[] = [
  { id: "muscles", he: "שרירים" },
  { id: "bones", he: "עצמות" },
  { id: "joints", he: "מפרקים" },
];

type AtlasItem = {
  id: string;
  he: string;
  en: string;
  badge?: string;
  color?: string;
};

export function Atlas({ query }: { query: string }) {
  const [kind, setKind] = useState<Kind>("muscles");
  const [openId, setOpenId] = useState<string | null>(null);

  const items = useMemo((): AtlasItem[] => {
    const q = query.trim().toLowerCase();
    if (kind === "muscles") {
      return muscles
        .filter((m) => anatomyImage("muscles", m.id))
        .filter(
          (m) =>
            !q ||
            [m.nameHe, m.nameEn, m.actionHe].join(" ").toLowerCase().includes(q),
        )
        .map((m) => ({
          id: m.id,
          he: m.nameHe,
          en: m.nameEn,
          badge: REGIONS.find((r) => r.id === m.region)?.he,
          color: REGION_COLORS[m.region],
        }));
    }
    if (kind === "bones") {
      return bones
        .filter((b) => anatomyImage("bones", b.id))
        .filter((b) => !q || [b.nameHe, b.nameEn].join(" ").toLowerCase().includes(q))
        .map((b) => ({ id: b.id, he: b.nameHe, en: b.nameEn }));
    }
    return joints
      .filter((j) => anatomyImage("joints", j.id))
      .filter((j) => !q || [j.nameHe, j.nameEn].join(" ").toLowerCase().includes(q))
      .map((j) => ({ id: j.id, he: j.nameHe, en: j.nameEn }));
  }, [kind, query]);

  const open = items.find((i) => i.id === openId);

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-1.5">
        {LABELS.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => {
              setKind(l.id);
              setOpenId(null);
            }}
            className={cn(
              "rounded-full border px-3 py-1 text-sm",
              kind === l.id
                ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                : "border-[var(--line)] bg-[var(--card)]",
            )}
          >
            {l.he}
          </button>
        ))}
        <span className="ms-auto self-center text-xs text-[var(--ink-soft)]">
          {items.length} איורים · לחצו להגדלה
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpenId(item.id)}
            className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] text-right shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <AnatomyThumb
              kind={kind}
              id={item.id}
              alt={item.he}
              size="lg"
              className="rounded-none border-0 shadow-none"
              interactive={false}
            />
            <div className="px-3 py-2">
              <p className="line-clamp-1 text-sm font-bold">{item.he}</p>
              <p className="term line-clamp-1 text-[11px] text-[var(--ink-soft)]">{item.en}</p>
              {item.badge && (
                <span
                  className={cn(
                    "mt-1 inline-block rounded-full border px-2 py-0.5 text-[10px]",
                    item.color,
                  )}
                >
                  {item.badge}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {open && (
        <AnatomyLightbox
          open
          onClose={() => setOpenId(null)}
          kind={kind}
          id={open.id}
          title={open.he}
          subtitle={open.en}
        />
      )}
    </div>
  );
}
