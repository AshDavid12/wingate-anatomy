"use client";

import { useEffect } from "react";
import { anatomyImage, type AnatomyKind } from "@/data/anatomy-images";
import { cn } from "@/lib/utils";

const SIZE: Record<string, string> = {
  sm: "h-16 w-16",
  md: "h-28 w-28",
  lg: "h-48 w-full",
  hero: "h-72 w-full md:h-80",
};

export function AnatomyThumb({
  kind,
  id,
  alt,
  size = "md",
  className,
  onOpen,
  interactive = true,
}: {
  kind: AnatomyKind;
  id: string;
  alt: string;
  size?: keyof typeof SIZE;
  className?: string;
  onOpen?: () => void;
  interactive?: boolean;
}) {
  const meta = anatomyImage(kind, id);
  const box = cn(
    "relative shrink-0 overflow-hidden rounded-lg border border-[var(--line)] bg-white shadow-sm",
    SIZE[size],
    className,
  );

  if (!meta) {
    return (
      <div
        className={cn(
          "flex shrink-0 items-center justify-center rounded-lg border border-dashed border-[var(--line)] bg-[var(--paper-2)] text-[10px] text-[var(--ink-soft)]",
          SIZE[size],
          className,
        )}
      >
        אין איור
      </div>
    );
  }

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={meta.src}
      alt={alt}
      className="h-full w-full object-contain transition group-hover:scale-[1.03]"
    />
  );

  if (!interactive) {
    return <div className={box}>{img}</div>;
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onOpen?.();
      }}
      className={cn("group", box)}
      aria-label={`הגדל איור: ${alt}`}
    >
      {img}
    </button>
  );
}

export function AnatomyLightbox({
  open,
  onClose,
  kind,
  id,
  title,
  subtitle,
  children,
}: {
  open: boolean;
  onClose: () => void;
  kind: AnatomyKind;
  id: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  const meta = anatomyImage(kind, id);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

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
            <h2 className="text-lg font-bold">{title}</h2>
            {subtitle && <p className="term text-sm text-[var(--ink-soft)]">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[var(--line)] px-3 py-1 text-sm"
          >
            סגור
          </button>
        </div>
        {meta ? (
          <div className="bg-white p-3 md:p-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={meta.src}
              alt={title}
              className={cn(
                "mx-auto w-auto max-w-full object-contain",
                children ? "max-h-[38vh]" : "max-h-[58vh]",
              )}
            />
            <p className="mt-2 text-center text-[11px] text-[var(--ink-soft)]">
              איור: {meta.wikiTitle} · ויקיפדיה / ויקישיתוף
            </p>
          </div>
        ) : (
          <p className="px-4 py-8 text-center text-sm text-[var(--ink-soft)]">אין איור זמין</p>
        )}
        {children && <div className="border-t border-[var(--line)] px-4 py-4">{children}</div>}
      </div>
    </div>
  );
}
