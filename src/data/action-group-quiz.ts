import { ACTION_GROUPS, type ActionGroup, type ActionMember } from "./action-groups";

export const DRILL_KINDS = ["odd", "belongs", "group", "role", "all", "primes"] as const;
export type DrillKind = (typeof DRILL_KINDS)[number];

export type DrillOption = {
  id: string;
  en: string;
  he: string;
};

export type DrillQuestion = {
  id: string;
  kind: DrillKind;
  promptHe: string;
  promptEn: string;
  groupId: string;
  groupHe: string;
  groupEn: string;
  options: DrillOption[];
  answers: string[];
  multi: boolean;
  explainHe: string;
  explainEn: string;
};

export const DRILL_KIND_LABEL: Record<DrillKind, { en: string; he: string }> = {
  odd: { en: "Doesn't belong", he: "מי לא שייך" },
  belongs: { en: "Who belongs", he: "מי שייך" },
  group: { en: "Which group", he: "לאיזו קבוצה" },
  role: { en: "Prime or accessory", he: "עיקרי או משנה" },
  all: { en: "Select all", he: "סמנו את כולם" },
  primes: { en: "Prime movers", he: "העיקריים" },
};

const ROLE_PRIME: DrillOption = {
  id: "prime",
  en: "Prime mover",
  he: "שריר עיקרי",
};
const ROLE_ACCESSORY: DrillOption = {
  id: "accessory",
  en: "Accessory",
  he: "שריר משנה",
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

function uniqueByEn(list: ActionMember[]): ActionMember[] {
  const seen = new Set<string>();
  return list.filter((m) => {
    const k = m.en.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

function allMembers(g: ActionGroup): ActionMember[] {
  return uniqueByEn([...g.prime, ...g.accessory]);
}

function memberOption(m: ActionMember): DrillOption {
  return { id: m.en, en: m.en, he: m.he };
}

function groupOption(g: ActionGroup): DrillOption {
  return { id: g.id, en: g.groupEn, he: g.groupHe };
}

function memberInGroup(member: ActionMember, g: ActionGroup): boolean {
  const list = [...g.prime, ...g.accessory];
  if (list.some((x) => x.en.toLowerCase() === member.en.toLowerCase())) return true;
  if (member.muscleIds.length === 0) return false;
  return list.some((x) => x.muscleIds.some((id) => member.muscleIds.includes(id)));
}

function namesOf(list: ActionMember[]): string {
  return uniqueByEn(list)
    .map((m) => `${m.he} · ${m.en}`)
    .join("\n");
}

function groupRoster(g: ActionGroup): { he: string; en: string } {
  const primes = namesOf(g.prime) || "—";
  const accessories = g.accessory.length ? namesOf(g.accessory) : "—";
  return {
    he: `עיקריים:\n${primes}\n\nמשנה:\n${accessories}`,
    en: `Prime movers:\n${primes}\n\nAccessory:\n${accessories}`,
  };
}

function outsiderPool(target: ActionGroup, universe: ActionGroup[]): ActionMember[] {
  const seen = new Set<string>();
  const same: ActionMember[] = [];
  const other: ActionMember[] = [];
  for (const g of universe) {
    if (g.id === target.id) continue;
    for (const m of allMembers(g)) {
      const key = m.en.toLowerCase();
      if (seen.has(key) || memberInGroup(m, target)) continue;
      seen.add(key);
      (g.region === target.region ? same : other).push(m);
    }
  }
  return [...shuffle(same), ...shuffle(other)];
}

function pickOutsiders(target: ActionGroup, universe: ActionGroup[], n: number): ActionMember[] {
  return outsiderPool(target, universe).slice(0, n);
}

function groupExplain(g: ActionGroup, extraHe: string, extraEn: string): { he: string; en: string } {
  const roster = groupRoster(g);
  return {
    he: `${extraHe}\n\n${roster.he}`,
    en: `${extraEn}\n\n${roster.en}`,
  };
}

function tryOdd(pool: ActionGroup[], universe: ActionGroup[]): DrillQuestion | null {
  const candidates = pool.filter((g) => allMembers(g).length >= 3);
  const g = pick(candidates);
  if (!g) return null;
  const ins = shuffle(allMembers(g)).slice(0, 3);
  const odd = pickOutsiders(g, universe, 1)[0];
  if (!odd || ins.length < 3) return null;
  const options = shuffle([...ins, odd].map(memberOption));
  const explain = groupExplain(
    g,
    `${odd.he} אינו שייך לקבוצת ${g.groupHe}.`,
    `${odd.en} does not belong to the ${g.groupEn}.`,
  );
  return {
    id: `odd:${g.id}:${odd.en}:${ins.map((m) => m.en).sort().join(",")}`,
    kind: "odd",
    promptHe: `איזה שריר אינו שייך לקבוצת ${g.groupHe}?`,
    promptEn: `Which muscle does not belong to the ${g.groupEn}?`,
    groupId: g.id,
    groupHe: g.groupHe,
    groupEn: g.groupEn,
    options,
    answers: [odd.en],
    multi: false,
    explainHe: explain.he,
    explainEn: explain.en,
  };
}

function tryBelongs(pool: ActionGroup[], universe: ActionGroup[]): DrillQuestion | null {
  const g = pick(pool.filter((x) => allMembers(x).length >= 1));
  if (!g) return null;
  const insider = pick(allMembers(g));
  const outs = pickOutsiders(g, universe, 3);
  if (!insider || outs.length < 3) return null;
  const options = shuffle([insider, ...outs].map(memberOption));
  const role = g.prime.some((m) => m.en === insider.en) ? "עיקרי / prime mover" : "משנה / accessory";
  const explain = groupExplain(
    g,
    `${insider.he} שייך לקבוצת ${g.groupHe} (${role}).`,
    `${insider.en} belongs to the ${g.groupEn} (${role}).`,
  );
  return {
    id: `belongs:${g.id}:${insider.en}`,
    kind: "belongs",
    promptHe: `איזה שריר שייך לקבוצת ${g.groupHe}?`,
    promptEn: `Which muscle belongs to the ${g.groupEn}?`,
    groupId: g.id,
    groupHe: g.groupHe,
    groupEn: g.groupEn,
    options,
    answers: [insider.en],
    multi: false,
    explainHe: explain.he,
    explainEn: explain.en,
  };
}

function tryGroup(pool: ActionGroup[], universe: ActionGroup[]): DrillQuestion | null {
  const g = pick(pool.filter((x) => allMembers(x).length >= 1));
  if (!g) return null;
  const member = pick(allMembers(g));
  if (!member) return null;
  const distractors = shuffle(universe.filter((x) => x.id !== g.id && !memberInGroup(member, x))).slice(0, 3);
  if (distractors.length < 3) {
    const extra = shuffle(ACTION_GROUPS.filter((x) => x.id !== g.id && !memberInGroup(member, x))).slice(
      0,
      3 - distractors.length,
    );
    distractors.push(...extra.filter((x) => !distractors.some((d) => d.id === x.id)));
  }
  if (distractors.length < 3) return null;
  const options = shuffle([g, ...distractors.slice(0, 3)].map(groupOption));
  const explain = groupExplain(
    g,
    `${member.he} מופיע בקבוצת ${g.groupHe}.`,
    `${member.en} is listed with the ${g.groupEn}.`,
  );
  return {
    id: `group:${g.id}:${member.en}`,
    kind: "group",
    promptHe: `לאיזו קבוצת תנועה שייך ${member.he}?`,
    promptEn: `Which movement group includes ${member.en}?`,
    groupId: g.id,
    groupHe: g.groupHe,
    groupEn: g.groupEn,
    options,
    answers: [g.id],
    multi: false,
    explainHe: explain.he,
    explainEn: explain.en,
  };
}

function tryRole(pool: ActionGroup[]): DrillQuestion | null {
  const g = pick(pool.filter((x) => x.prime.length > 0 && x.accessory.length > 0));
  if (!g) return null;
  const fromPrime = Math.random() < 0.5;
  const member = pick(uniqueByEn(fromPrime ? g.prime : g.accessory));
  if (!member) return null;
  const answer = fromPrime ? ROLE_PRIME.id : ROLE_ACCESSORY.id;
  const explain = groupExplain(
    g,
    `${member.he} הוא ${fromPrime ? "שריר עיקרי" : "שריר משנה"} בקבוצת ${g.groupHe}.`,
    `${member.en} is a ${fromPrime ? "prime mover" : "an accessory"} for the ${g.groupEn}.`,
  );
  return {
    id: `role:${g.id}:${member.en}:${answer}`,
    kind: "role",
    promptHe: `${member.he} בקבוצת ${g.groupHe} הוא שריר עיקרי או שריר משנה?`,
    promptEn: `For the ${g.groupEn}, is ${member.en} a prime mover or an accessory?`,
    groupId: g.id,
    groupHe: g.groupHe,
    groupEn: g.groupEn,
    options: shuffle([ROLE_PRIME, ROLE_ACCESSORY]),
    answers: [answer],
    multi: false,
    explainHe: explain.he,
    explainEn: explain.en,
  };
}

function tryAll(pool: ActionGroup[], universe: ActionGroup[]): DrillQuestion | null {
  const g = pick(pool.filter((x) => allMembers(x).length >= 2));
  if (!g) return null;
  const members = shuffle(allMembers(g));
  const ins = members.slice(0, Math.min(3, members.length));
  const outs = pickOutsiders(g, universe, Math.max(2, 6 - ins.length));
  if (ins.length < 2 || outs.length < 2) return null;
  const options = shuffle([...ins, ...outs].map(memberOption)).slice(0, 6);
  const answers = options.filter((o) => ins.some((m) => m.en === o.id)).map((o) => o.id);
  if (answers.length < 2 || answers.length > options.length - 2) return null;
  const explain = groupExplain(
    g,
    `מהרשימה, שייכים ל${g.groupHe}:\n${ins.map((m) => `${m.he} · ${m.en}`).join("\n")}`,
    `From this list, these belong to the ${g.groupEn}:\n${ins.map((m) => `${m.en} · ${m.he}`).join("\n")}`,
  );
  return {
    id: `all:${g.id}:${options.map((o) => o.id).sort().join(",")}`,
    kind: "all",
    promptHe: `סמנו את כל השרירים ששייכים לקבוצת ${g.groupHe}`,
    promptEn: `Select every muscle that belongs to the ${g.groupEn}`,
    groupId: g.id,
    groupHe: g.groupHe,
    groupEn: g.groupEn,
    options,
    answers,
    multi: true,
    explainHe: explain.he,
    explainEn: explain.en,
  };
}

function tryPrimes(pool: ActionGroup[], universe: ActionGroup[]): DrillQuestion | null {
  const g = pick(pool.filter((x) => uniqueByEn(x.prime).length >= 2));
  if (!g) return null;
  const primes = shuffle(uniqueByEn(g.prime));
  const ins = primes.slice(0, Math.min(3, primes.length));
  const notPrime = uniqueByEn([...g.accessory, ...pickOutsiders(g, universe, 6)]).filter(
    (m) => !ins.some((p) => p.en === m.en) && !g.prime.some((p) => p.en === m.en),
  );
  const outs = shuffle(notPrime).slice(0, Math.max(2, 6 - ins.length));
  if (ins.length < 2 || outs.length < 2) return null;
  const options = shuffle([...ins, ...outs].map(memberOption)).slice(0, 6);
  const answers = options.filter((o) => ins.some((m) => m.en === o.id)).map((o) => o.id);
  if (answers.length < 2 || answers.length > options.length - 2) return null;
  const explain = groupExplain(
    g,
    `העיקריים ברשימה:\n${ins.map((m) => `${m.he} · ${m.en}`).join("\n")}`,
    `Prime movers in this list:\n${ins.map((m) => `${m.en} · ${m.he}`).join("\n")}`,
  );
  return {
    id: `primes:${g.id}:${options.map((o) => o.id).sort().join(",")}`,
    kind: "primes",
    promptHe: `סמנו את השרירים העיקריים של ${g.groupHe}`,
    promptEn: `Select the prime movers of the ${g.groupEn}`,
    groupId: g.id,
    groupHe: g.groupHe,
    groupEn: g.groupEn,
    options,
    answers,
    multi: true,
    explainHe: explain.he,
    explainEn: explain.en,
  };
}

function tryKind(kind: DrillKind, pool: ActionGroup[], universe: ActionGroup[]): DrillQuestion | null {
  switch (kind) {
    case "odd":
      return tryOdd(pool, universe);
    case "belongs":
      return tryBelongs(pool, universe);
    case "group":
      return tryGroup(pool, universe);
    case "role":
      return tryRole(pool);
    case "all":
      return tryAll(pool, universe);
    case "primes":
      return tryPrimes(pool, universe);
  }
}

export function generateActionGroupQuestion(
  pool: ActionGroup[],
  kinds: DrillKind[] = [...DRILL_KINDS],
  universe: ActionGroup[] = ACTION_GROUPS,
  avoid: Set<string> = new Set(),
): DrillQuestion | null {
  if (pool.length === 0 || kinds.length === 0) return null;
  const order = shuffle(kinds);
  let fallback: DrillQuestion | null = null;
  for (let attempt = 0; attempt < 36; attempt++) {
    for (const kind of order) {
      const q = tryKind(kind, pool, universe);
      if (!q) continue;
      if (!avoid.has(q.id)) return q;
      fallback = q;
    }
  }
  return fallback;
}
