import fs from "node:fs";
import path from "node:path";
import { WIKI_PAGES } from "../src/data/wiki-pages.ts";

const UA =
  "AnatomyExamStudy/1.0 (educational study app; https://cursor.com)";
const ROOT = path.resolve("public/anatomy");
const OUT_TS = path.resolve("src/data/anatomy-images.ts");

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function extFromUrl(url) {
  const clean = url.split("?")[0].toLowerCase();
  const m = clean.match(/\.(jpe?g|png|gif|webp|svg)$/);
  return m ? m[1].replace("jpeg", "jpg") : "jpg";
}

function cleanUrl(url) {
  try {
    const u = new URL(url);
    u.search = "";
    return u.toString();
  } catch {
    return url.split("?")[0];
  }
}

function alreadyHas(kind, id) {
  const dir = path.join(ROOT, kind);
  if (!fs.existsSync(dir)) return null;
  const hit = fs.readdirSync(dir).find((f) => f.startsWith(`${id}.`) && !f.endsWith(".gif"));
  return hit ? path.join(dir, hit) : null;
}

async function wikiThumb(title) {
  const api = new URL("https://en.wikipedia.org/w/api.php");
  api.searchParams.set("action", "query");
  api.searchParams.set("format", "json");
  api.searchParams.set("redirects", "1");
  api.searchParams.set("prop", "pageimages");
  api.searchParams.set("piprop", "thumbnail|name");
  api.searchParams.set("pithumbsize", "800");
  api.searchParams.set("titles", title);

  const res = await fetch(api, { headers: { "User-Agent": UA, Accept: "application/json" } });
  if (res.status === 429) throw Object.assign(new Error("rate"), { code: 429 });
  if (!res.ok) throw new Error(`wiki ${res.status} for ${title}`);
  const data = await res.json();
  const pages = data?.query?.pages ?? {};
  const page = Object.values(pages)[0];
  if (!page || page.missing) return null;
  let url = page.thumbnail?.source;
  if (!url) return null;
  url = cleanUrl(url);
  if (url.toLowerCase().endsWith(".gif") && page.pageimage) {
    const file = page.pageimage.replace(/ /g, "_");
    url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=800`;
  }
  return { url: cleanUrl(url), title: page.title, file: page.pageimage || "" };
}

async function download(url, dest) {
  let wait = 1500;
  for (let i = 0; i < 5; i++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.status === 429) {
      console.warn(`429 ${url} — wait ${wait}ms`);
      await sleep(wait);
      wait *= 2;
      continue;
    }
    if (!res.ok) throw new Error(`download ${res.status} ${url}`);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, buf);
    return;
  }
  throw new Error(`download 429 exhausted ${url}`);
}

const catalog = fs.existsSync(OUT_TS)
  ? {}
  : {};

if (fs.existsSync(OUT_TS)) {
  // rebuild catalog from disk + previous metadata if present
}

const prev = {};
if (fs.existsSync(OUT_TS)) {
  try {
    const txt = fs.readFileSync(OUT_TS, "utf8");
    const json = txt.slice(txt.indexOf("{"), txt.lastIndexOf("}") + 1);
    Object.assign(prev, JSON.parse(json));
  } catch {
    /* ignore */
  }
}

for (const entry of WIKI_PAGES) {
  const key = `${entry.kind}/${entry.id}`;
  const existing = alreadyHas(entry.kind, entry.id);
  if (existing) {
    const ext = path.extname(existing);
    catalog[key] = prev[key] || {
      src: `/anatomy/${entry.kind}/${entry.id}${ext}`,
      wikiTitle: entry.titles[0],
      wikiPage: entry.titles[0],
      file: "",
    };
    catalog[key].src = `/anatomy/${entry.kind}/${entry.id}${ext}`;
    continue;
  }

  let hit = null;
  let usedTitle = "";
  for (const title of entry.titles) {
    try {
      hit = await wikiThumb(title);
      usedTitle = title;
      if (hit) break;
    } catch (err) {
      if (err.code === 429) {
        await sleep(4000);
        try {
          hit = await wikiThumb(title);
          usedTitle = title;
          if (hit) break;
        } catch (e2) {
          console.warn(`fail ${entry.id} / ${title}:`, e2.message);
        }
      } else {
        console.warn(`fail ${entry.id} / ${title}:`, err.message);
      }
    }
    await sleep(200);
  }

  if (!hit) {
    console.warn(`NO IMAGE: ${key}`);
    await sleep(200);
    continue;
  }

  let ext = extFromUrl(hit.url);
  if (ext === "gif") ext = "png";
  const dest = path.join(ROOT, entry.kind, `${entry.id}.${ext}`);
  try {
    await download(hit.url, dest);
    catalog[key] = {
      src: `/anatomy/${entry.kind}/${entry.id}.${ext}`,
      wikiTitle: hit.title,
      wikiPage: usedTitle,
      file: hit.file,
    };
    console.log(`ok ${key} ← ${hit.title}`);
  } catch (err) {
    console.warn(`download fail ${entry.id}:`, err.message);
  }
  await sleep(400);
}

const lines = [
  "export type AnatomyImageMeta = {",
  "  src: string;",
  "  wikiTitle: string;",
  "  wikiPage: string;",
  "  file: string;",
  "};",
  "",
  "export const ANATOMY_IMAGES: Record<string, AnatomyImageMeta> = " +
    JSON.stringify(catalog, null, 2) +
    ";",
  "",
  'export type AnatomyKind = "muscles" | "bones" | "joints" | "regions";',
  "",
  "export function anatomyImage(kind: AnatomyKind, id: string): AnatomyImageMeta | undefined {",
  "  return ANATOMY_IMAGES[`${kind}/${id}`];",
  "}",
  "",
];

fs.writeFileSync(OUT_TS, lines.join("\n"));
console.log(`wrote ${Object.keys(catalog).length} images → ${OUT_TS}`);
