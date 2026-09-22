import Link from "next/link";
import { Activity, Bone } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--line)] bg-[var(--card)]/90 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-[var(--accent)] uppercase">
            Wingate · exam study
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight md:text-4xl">
            בחרו מקצוע · Anatomy or Physiology
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-[var(--ink-soft)] md:text-base">
            כלי לימוד למבחני מדריכים ומאמנים במכון וינגייט. אנטומיה לפי Origin, Insertion
            ו־Action, ופיזיולוגיה של תפקוד האדם לפי מסלולי האנרגיה, צריכת החמצן וההתאוששות.
          </p>
        </div>
      </header>

      <main className="mx-auto grid max-w-5xl gap-4 px-4 py-8 md:grid-cols-2 md:px-6 md:py-12">
        <Link
          href="/anatomy"
          className="group rounded-3xl border border-[var(--line)] bg-[var(--card)] p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--ink)] md:p-8"
        >
          <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-[var(--paper-2)] text-[var(--accent)]">
            <Bone className="size-5" />
          </span>
          <p className="mt-5 text-[11px] font-semibold tracking-[0.18em] text-[var(--accent)] uppercase">
            Anatomy
          </p>
          <h2 className="mt-1 text-2xl font-bold">אנטומיה</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
            שרירים, עצמות, מפרקים וחלקי עצם. Origin, Insertion, Action, היגיון תנועתי,
            שינון, כרטיסיות וחידון.
          </p>
          <p className="mt-5 text-sm font-semibold text-[var(--ink)] group-hover:underline">
            כניסה לאנטומיה
          </p>
        </Link>

        <Link
          href="/physiology"
          className="group rounded-3xl border border-[var(--line)] bg-[var(--card)] p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--ink)] md:p-8"
        >
          <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-[var(--paper-2)] text-[var(--accent-2)]">
            <Activity className="size-5" />
          </span>
          <p className="mt-5 text-[11px] font-semibold tracking-[0.18em] text-[var(--accent-2)] uppercase">
            Physiology
          </p>
          <h2 className="mt-1 text-2xl font-bold">פיזיולוגיה</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
            מבחן פיזיולוגיה של תפקוד האדם: הרכב הגוף, הומאוסטזיס, ATP, מסלול אלקטי, לקטי
            ואירובי, צח״מ, סף אנאירובי והתאוששות.
          </p>
          <p className="mt-5 text-sm font-semibold text-[var(--ink)] group-hover:underline">
            כניסה לפיזיולוגיה
          </p>
        </Link>
      </main>

      <footer className="px-4 py-8 text-center text-[11px] text-[var(--ink-soft)]">
        <p className="text-[13px] font-medium tracking-wide text-[var(--ink)]">
          Made by <span className="term text-[var(--accent)]">Gaash David</span>
          <span className="mx-1.5 opacity-40">·</span>
          נוצר על ידי געש דוד
        </p>
      </footer>
    </div>
  );
}
