import fs from "node:fs";
import path from "node:path";
import { landmarks } from "../src/data/landmarks.ts";

const UA = "AnatomyExamStudy/1.0 (educational study app; https://cursor.com)";
const ROOT = path.resolve("public/anatomy/landmarks");
const OUT_TS = path.resolve("src/data/anatomy-images.ts");

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function extFromUrl(url) {
  const clean = url.split("?")[0].toLowerCase();
  const m = clean.match(/\.(jpe?g|png|gif|webp|svg)$/);
  return m ? m[1].replace("jpeg", "jpg") : "jpg";
}

function alreadyHas(id) {
  if (!fs.existsSync(ROOT)) return null;
  const hit = fs.readdirSync(ROOT).find((f) => f.startsWith(`${id}.`) && !f.endsWith(".gif"));
  return hit ? path.join(ROOT, hit) : null;
}

function loadCatalog() {
  if (!fs.existsSync(OUT_TS)) return {};
  const txt = fs.readFileSync(OUT_TS, "utf8");
  const marker = "export const ANATOMY_IMAGES";
  const start = txt.indexOf(marker);
  if (start < 0) return {};
  const brace = txt.indexOf("{", start);
  const end = txt.lastIndexOf("};");
  try {
    return JSON.parse(txt.slice(brace, end + 1));
  } catch {
    return {};
  }
}

async function commonsSearch(query) {
  const api = new URL("https://commons.wikimedia.org/w/api.php");
  api.searchParams.set("action", "query");
  api.searchParams.set("format", "json");
  api.searchParams.set("list", "search");
  api.searchParams.set("srsearch", `${query} png`);
  api.searchParams.set("srnamespace", "6");
  api.searchParams.set("srlimit", "12");

  const res = await fetch(api, { headers: { "User-Agent": UA, Accept: "application/json" } });
  if (res.status === 429) throw Object.assign(new Error("rate"), { code: 429 });
  if (!res.ok) throw new Error(`search ${res.status} ${query}`);
  const data = await res.json();
  return (data?.query?.search ?? [])
    .map((s) => s.title.replace(/^File:/, ""))
    .filter((t) => !/\.gif$/i.test(t) && !/animation/i.test(t));
}

function scoreFile(name, query) {
  const n = name.toLowerCase();
  const q = query.toLowerCase();
  let score = 0;
  if (n.includes("bodyparts3d") || /\d{2}\.png$/i.test(n)) score += 8;
  if (/01\.png$/i.test(n) || /02\.png$/i.test(n)) score += 6;
  if (n.startsWith(q)) score += 10;
  const words = q.split(/\s+/).filter(Boolean);
  for (const w of words) if (n.includes(w)) score += 2;
  if (/gray/i.test(n)) score += 3;
  if (/left /i.test(n)) score -= 1;
  if (/animation|video|icon|logo|flag|map/i.test(n)) score -= 20;
  return score;
}

async function commonsThumb(filename) {
  const api = new URL("https://commons.wikimedia.org/w/api.php");
  api.searchParams.set("action", "query");
  api.searchParams.set("format", "json");
  api.searchParams.set("prop", "imageinfo");
  api.searchParams.set("iiprop", "url|mime");
  api.searchParams.set("iiurlwidth", "900");
  api.searchParams.set("titles", `File:${filename}`);

  const res = await fetch(api, { headers: { "User-Agent": UA, Accept: "application/json" } });
  if (res.status === 429) throw Object.assign(new Error("rate"), { code: 429 });
  if (!res.ok) throw new Error(`info ${res.status} ${filename}`);
  const data = await res.json();
  const page = Object.values(data?.query?.pages ?? {})[0];
  if (!page || page.missing || !page.imageinfo?.[0]) return null;
  const info = page.imageinfo[0];
  const url = info.thumburl || info.url;
  if (!url || /gif/i.test(info.mime || url)) return null;
  return { url, file: filename };
}

async function wikiThumb(title) {
  const api = new URL("https://en.wikipedia.org/w/api.php");
  api.searchParams.set("action", "query");
  api.searchParams.set("format", "json");
  api.searchParams.set("redirects", "1");
  api.searchParams.set("prop", "pageimages");
  api.searchParams.set("piprop", "thumbnail|name");
  api.searchParams.set("pithumbsize", "900");
  api.searchParams.set("titles", title);
  const res = await fetch(api, { headers: { "User-Agent": UA, Accept: "application/json" } });
  if (!res.ok) return null;
  const data = await res.json();
  const page = Object.values(data?.query?.pages ?? {})[0];
  const url = page?.thumbnail?.source;
  if (!url || url.toLowerCase().endsWith(".gif")) return null;
  return { url: url.split("?")[0], file: page.pageimage || "", title: page.title };
}

async function download(url, dest) {
  let wait = 1500;
  for (let i = 0; i < 5; i++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.status === 429) {
      await sleep(wait);
      wait *= 2;
      continue;
    }
    if (!res.ok) throw new Error(`download ${res.status} ${url}`);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    return;
  }
  throw new Error(`download 429 exhausted ${url}`);
}

function writeCatalog(catalog) {
  const lines = [
    "export type AnatomyImageMeta = {",
    "  src: string;",
    "  wikiTitle: string;",
    "  wikiPage: string;",
    "  file: string;",
    "  source?: \"wiki\" | \"course\";",
    "  extras?: { src: string; label: string }[];",
    "};",
    "",
    "export const ANATOMY_IMAGES: Record<string, AnatomyImageMeta> = " +
      JSON.stringify(catalog, null, 2) +
      ";",
    "",
    'export type AnatomyKind = "muscles" | "bones" | "joints" | "regions" | "landmarks";',
    "",
    "export function anatomyImage(kind: AnatomyKind, id: string): AnatomyImageMeta | undefined {",
    "  return ANATOMY_IMAGES[`${kind}/${id}`];",
    "}",
    "",
  ];
  fs.writeFileSync(OUT_TS, lines.join("\n"));
}

const catalog = loadCatalog();
if (Object.keys(catalog).length === 0) {
  console.warn("catalog parse failed — aborting so existing images are not wiped");
  process.exit(1);
}
fs.mkdirSync(ROOT, { recursive: true });

for (const item of landmarks) {
  const key = `landmarks/${item.id}`;
  const existing = alreadyHas(item.id);
  if (existing) {
    const ext = path.extname(existing);
    catalog[key] = {
      src: `/anatomy/landmarks/${item.id}${ext}`,
      wikiTitle: item.nameEn,
      wikiPage: item.wikiTitles[0] ?? item.nameEn,
      file: catalog[key]?.file ?? "",
    };
    console.log(`have ${key}`);
    continue;
  }

  let hit = null;
  const queries = [item.search, item.nameEn, ...item.wikiTitles].filter(Boolean);
  const seen = new Set();

  for (const q of queries) {
    try {
      const files = await commonsSearch(q);
      const ranked = [...new Set(files)]
        .map((f) => ({ f, s: scoreFile(f, item.search || item.nameEn) }))
        .sort((a, b) => b.s - a.s);
      for (const { f, s } of ranked.slice(0, 5)) {
        if (seen.has(f) || s < 4) continue;
        seen.add(f);
        hit = await commonsThumb(f);
        if (hit) {
          hit.title = f;
          break;
        }
        await sleep(150);
      }
      if (hit) break;
    } catch (err) {
      if (err.code === 429) await sleep(4000);
      else console.warn(`search fail ${item.id}:`, err.message);
    }
    await sleep(200);
  }

  if (!hit) {
    for (const title of item.wikiTitles) {
      hit = await wikiThumb(title);
      if (hit) break;
      await sleep(150);
    }
  }

  if (!hit) {
    console.warn(`NO IMAGE: ${key}`);
    await sleep(200);
    continue;
  }

  let ext = extFromUrl(hit.url);
  if (ext === "gif" || ext === "svg") ext = "png";
  const dest = path.join(ROOT, `${item.id}.${ext}`);
  try {
    await download(hit.url, dest);
    catalog[key] = {
      src: `/anatomy/landmarks/${item.id}.${ext}`,
      wikiTitle: hit.title || item.nameEn,
      wikiPage: item.wikiTitles[0] ?? item.nameEn,
      file: hit.file || "",
    };
    console.log(`ok ${key} ← ${hit.file || hit.title || hit.url}`);
  } catch (err) {
    console.warn(`download fail ${item.id}:`, err.message);
  }
  await sleep(350);
}

writeCatalog(catalog);
console.log(`catalog ${Object.keys(catalog).length} → ${OUT_TS}`);
