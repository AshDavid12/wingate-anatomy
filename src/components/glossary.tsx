import { directionalTerms, keyConcepts, movementTerms } from "@/data/terms";

export function Glossary() {
  return (
    <div className="space-y-8">
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
    </div>
  );
}
