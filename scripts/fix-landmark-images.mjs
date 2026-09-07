import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const UA = "AnatomyExamStudy/1.0 (educational study app; https://cursor.com)";
const ROOT = path.resolve("public/anatomy/landmarks");
const OUT_TS = path.resolve("src/data/anatomy-images.ts");

const CURATED = {
  "vertebral-body": ["Lumbar vertebra 1 superior2.png", "Gray90.png"],
  "vertebral-foramen": ["Lumbar vertebra 1 superior2.png", "Gray90.png"],
  "transverse-process": ["Lumbar vertebra 1 superior2.png", "Gray90.png"],
  "spinous-process": ["Lumbar vertebra 1 posterior2.png", "Gray94.png"],
  "intervertebral-foramen": ["Intervertebral foramen.png", "Gray94.png"],
  "superior-articular-process": [
    "Superior articular process of lumbar vertebra01.png",
    "Lumbar vertebra 1 superior2.png",
    "Gray90.png",
  ],
  "inferior-articular-process": [
    "Inferior articular process of lumbar vertebra01.png",
    "Lumbar vertebra 1 inferior2.png",
    "Gray90.png",
  ],
  "cervical-transverse-foramen": ["Cervical vertebra english.png", "Gray84.png"],
  "atlas": ["Gray86.png", "Atlas (C1) superior.png", "Atlas01.png"],
  "axis-dens": ["Gray87.png", "Axis (C2) anterior.png", "Dens of axis01.png"],
  "thoracic-costal-facet": ["Thoracic vertebra 1 superior2.png", "Gray91.png"],
  "manubrium": ["Manubrium of sternum frontal2.png", "Manubrium01.png", "Gray117.png"],
  "clavicle-sternal": ["Sternal end of clavicle01.png", "Clavicle - anterior view.png", "Gray200.png"],
  "clavicle-acromial": ["Acromial end of clavicle01.png", "Clavicle - anterior view.png", "Gray200.png"],
  "acromion": ["Acromion of scapula02.png", "Acromion of scapula01.png"],
  "glenoid": ["Glenoid cavity of scapula02.png", "Glenoid cavity of scapula01.png"],
  "glenoid-labrum": ["Glenoid labrum01.png", "Gray327.png", "Shoulder joint.png"],
  "head-of-humerus": ["Head of humerus01.png", "Head of left humerus01.png", "Gray207.png"],
  "greater-tubercle": ["Greater tubercle of humerus01.png", "Gray207.png"],
  "lesser-tubercle": ["Lesser tubercle of humerus01.png", "Gray207.png"],
  "bicipital-groove": ["Intertubercular sulcus of humerus01.png", "Gray207.png"],
  "deltoid-tuberosity": ["Deltoid tuberosity of humerus01.png", "Gray207.png"],
  "medial-epicondyle-humerus": ["Medial epicondyle of humerus01.png", "Gray210.png"],
  "lateral-epicondyle-humerus": ["Lateral epicondyle of humerus01.png", "Gray210.png"],
  "olecranon-fossa": ["Olecranon fossa of humerus01.png", "Gray208.png"],
  "head-of-radius": ["Head of radius01.png", "Gray213.png"],
  "neck-of-radius": ["Neck of radius01.png", "Gray213.png"],
  "radial-tuberosity": ["Radial tuberosity01.png", "Gray213.png"],
  "olecranon": ["Olecranon of ulna01.png", "Olecranon01.png", "Gray212.png"],
  "ulnar-tuberosity": ["Tuberosity of ulna01.png", "Gray212.png"],
  "radial-styloid": ["Styloid process of radius01.png", "Gray219.png"],
  "ulnar-styloid": ["Styloid process of ulna01.png", "Gray219.png"],
  "gluteal-fossa": ["Gluteal surface of ilium01.png", "Ilium 03 - lateral view.png", "Gray237.png"],
  "asis": ["Anterior superior iliac spine01.png", "Gray236.png"],
  "psis": ["Posterior superior iliac spine01.png", "Gray237.png"],
  "superior-pubic-ramus": ["Superior pubic ramus01.png", "Gray241.png"],
  "inferior-pubic-ramus": ["Inferior pubic ramus01.png", "Gray241.png"],
  "pubic-symphysis": ["Pubic symphysis01.png", "Gray320.png"],
  "sacroiliac-joint": ["Sacroiliac joint01.png", "Gray237.png"],
  "head-of-femur": ["Head of femur01.png", "Gray244.png"],
  "greater-trochanter": ["Greater trochanter of femur01.png", "Gray244.png"],
  "lesser-trochanter": ["Lesser trochanter of femur01.png", "Gray244.png"],
  "linea-aspera": ["Linea aspera of femur01.png", "Linea aspera01.png", "Gray245.png"],
  "medial-condyle-femur": ["Medial condyle of femur01.png", "Gray246.png"],
  "lateral-condyle-femur": ["Lateral condyle of femur01.png", "Gray246.png"],
  "patellar-surface": ["Patellar surface of femur01.png", "Gray246.png"],
  "medial-condyle-tibia": ["Medial condyle of tibia01.png", "Gray258.png"],
  "lateral-condyle-tibia": ["Lateral condyle of tibia01.png", "Gray258.png"],
  "tibial-plateau": ["Proximal epiphysis of tibia01.png", "Gray258.png"],
  "tibial-tuberosity": ["Tibial tuberosity01.png", "Gray258.png"],
  "medial-malleolus": ["Medial malleolus01.png", "Gray258.png"],
  "head-of-fibula": ["Head of fibula01.png", "Gray259.png"],
  "lateral-malleolus": ["Lateral malleolus01.png", "Gray259.png"],
};

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function parseCatalog(txt) {
  const start = txt.indexOf("export const ANATOMY_IMAGES");
  const brace = txt.indexOf("{", start);
  const end = txt.lastIndexOf("};");
  return JSON.parse(txt.slice(brace, end + 1));
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
  if (!res.ok) return null;
  const data = await res.json();
  const page = Object.values(data?.query?.pages ?? {})[0];
  if (!page || page.missing || !page.imageinfo?.[0]) return null;
  const info = page.imageinfo[0];
  const url = info.thumburl || info.url;
  if (!url || /gif/i.test(info.mime || "")) return null;
  return { url, file: filename };
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`download ${res.status} ${url}`);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
}

const restored = parseCatalog(execSync("git show HEAD:src/data/anatomy-images.ts", { encoding: "utf8" }));
const current = parseCatalog(fs.readFileSync(OUT_TS, "utf8"));
const catalog = { ...restored };

for (const [key, meta] of Object.entries(current)) {
  if (key.startsWith("landmarks/")) catalog[key] = meta;
}

writeCatalog(catalog);
console.log(`restored ${Object.keys(restored).length} + landmarks → ${Object.keys(catalog).length}`);

for (const [id, files] of Object.entries(CURATED)) {
  let hit = null;
  for (const file of files) {
    try {
      hit = await commonsThumb(file);
      if (hit) break;
    } catch (err) {
      if (err.code === 429) await sleep(3000);
    }
    await sleep(120);
  }
  if (!hit) {
    console.warn(`still missing ${id}`);
    continue;
  }
  const dest = path.join(ROOT, `${id}.png`);
  try {
    await download(hit.url, dest);
    catalog[`landmarks/${id}`] = {
      src: `/anatomy/landmarks/${id}.png`,
      wikiTitle: hit.file,
      wikiPage: hit.file,
      file: hit.file,
    };
    console.log(`fixed ${id} ← ${hit.file}`);
  } catch (err) {
    console.warn(`fail ${id}:`, err.message);
  }
  await sleep(250);
}

writeCatalog(catalog);
console.log(`wrote ${Object.keys(catalog).length}`);
