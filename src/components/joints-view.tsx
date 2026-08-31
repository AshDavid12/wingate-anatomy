import { joints } from "@/data/joints";
import { bones } from "@/data/bones";

export function JointsView() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {joints.map((j) => {
        const boneNames = j.bones
          .map((id) => bones.find((b) => b.id === id)?.nameHe ?? id)
          .join(" + ");
        return (
          <article
            key={j.id}
            className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-sm"
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
              {j.typeEn}
            </p>
            <h2 className="mt-1 text-lg font-bold">{j.nameHe}</h2>
            <p className="term text-sm text-[var(--ink-soft)]">{j.nameEn}</p>
            <p className="mt-2 text-sm">
              <span className="text-[var(--ink-soft)]">עצמות: </span>
              {boneNames}
            </p>
            <p className="mt-1 text-sm">
              <span className="text-[var(--ink-soft)]">סוג: </span>
              {j.typeHe}
            </p>
            <ul className="mt-3 list-disc pr-4 text-sm leading-relaxed">
              {j.movements.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            {j.notes && <p className="mt-3 text-xs text-[var(--accent)]">{j.notes}</p>}
          </article>
        );
      })}
    </div>
  );
}
