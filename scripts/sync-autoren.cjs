/**
 * Baut AUTOREN aus stuecke.json und lädt fehlende Unsplash-Platzhalterporträts.
 * Usage: node scripts/sync-autoren.cjs
 */
const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = path.join(__dirname, "..");
const DATA = path.join(ROOT, "src/data/stuecke.json");
const OUT_TS = path.join(ROOT, "src/lib/autoren.ts");
const PHOTO_DIR = path.join(ROOT, "public/images/autoren");

/** Portrait-IDs (Unsplash) — Frauen */
const WOMEN = [
  "1494790108377-be9c29b29330",
  "1438761681033-6461ffad8d80",
  "1544005313-94ddf0286df2",
  "1580489944761-15a19d654956",
  "1573496359142-b8d87734a5a2",
  "1534528741775-53994a69daeb",
  "1531746020798-e6953c6e8e04",
  "1524504388940-b1c1722653e1",
  "1487412720507-e7ab37603c6f",
  "1488426862026-3ee34a7d66df",
  "1508214751196-bcfd4ca60f91",
  "1517841905240-472988babdf9",
  "1529626455594-4ff0802cfb7e",
  "1554151228-14d9def656e4",
  "1548142813-c348350df52b",
  "1573497019940-1cfe7490e997",
  "1546961329-78bef0414d8c",
  "1489424730004-5d4a8c2f9e2f",
];

/** Portrait-IDs (Unsplash) — Männer */
const MEN = [
  "1507003211169-0a1dd7228f2d",
  "1500648767791-00dcc994a43e",
  "1506794778202-cad84cf45f1d",
  "1472099645785-5658abf4ff4e",
  "1519085360753-af0119f7cbe7",
  "1560250097-0b93528c311a",
  "1566492031773-4f4e44671857",
  "1539571696357-5a69c17a67c6",
  "1492562080023-ab3db95bfbce",
  "1463453091185-61582044d556",
  "1519345182560-3f2917c472ef",
  "1507591064344-4c6ce005b128",
  "1552058544-f2b08422138a",
  "1545167622-3a6ac756afa4",
  "1568602471122-7832951cc4c5",
  "1570295999919-56ceb5ecca61",
  "1531427186611-ecfd6d936c79",
  "1557862921-37829c790f19",
  "1544723795-3fb6469f5b67",
  "1564564321837-a57b7070ac4f",
  "1552374196-c4e7ffc6eadb",
  "1542909163-46c0fddfcd87",
  "1615109398623-9430013625a4",
  "1556157382-97eda2d62296",
  "1599566150163-29194dcaad36",
  "1535713875002-d1d0cf377fde",
  "1633332755192-727a05c4013d",
  "1582750433449-648ed127bb54",
  "1619895862022-09114b4ac7f8",
  "1603415526960-f7e0328c63b1",
  "1560250097-0b93528c311a",
  "1506794778202-cad84cf45f1d",
  "1472099645785-5658abf4ff4e",
];

const FEMALE_FIRST = new Set(
  [
    "Angelika",
    "Doris",
    "Gabi",
    "Gerlinde",
    "Helga",
    "Iris",
    "Jutta",
    "Kerstin",
    "Krista",
    "Martina",
    "Nicola",
    "Paula",
    "Rosina",
    "Sylvia",
    "Uschi",
    "Angela",
  ].map((s) => s.toLowerCase()),
);

function normalizePerson(name) {
  return name
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function isFemaleName(name) {
  const first = name.split(/\s+/)[0].toLowerCase();
  if (FEMALE_FIRST.has(first)) return true;
  // Co-author pair with und
  if (/ und /i.test(name)) {
    const parts = name.split(/\s+und\s+/i);
    return parts.some((p) => FEMALE_FIRST.has(p.trim().split(/\s+/)[0].toLowerCase()));
  }
  return false;
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, { headers: { "User-Agent": "theaterverlag-sync/1.0" } }, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          fs.unlinkSync(dest);
          return download(res.headers.location, dest).then(resolve, reject);
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlinkSync(dest);
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        res.pipe(file);
        file.on("finish", () => file.close(() => resolve()));
      })
      .on("error", (err) => {
        file.close();
        try {
          fs.unlinkSync(dest);
        } catch {}
        reject(err);
      });
  });
}

async function main() {
  fs.mkdirSync(PHOTO_DIR, { recursive: true });
  const data = JSON.parse(fs.readFileSync(DATA, "utf8"));
  const names = [
    ...new Set(
      data.stuecke
        .map((s) => (s.autor || "").trim())
        .filter(Boolean),
    ),
  ].sort((a, b) => a.localeCompare(b, "de"));

  const SPECIAL = {
    "Arno Boas": {
      role: "Verlagsgründer · Autor · Theatermensch",
      photo: "/images/arno.jpg",
      photoStock: false,
      bio: "Gründer des Verlags (1997). Schreibt seit 1985 Stücke fürs Amateurtheater.",
    },
  };

  let wIdx = 0;
  let mIdx = 0;
  const authors = [];

  for (const name of names) {
    const slug = normalizePerson(name);
    const special = SPECIAL[name];
    if (special) {
      authors.push({
        slug,
        name,
        role: special.role,
        photo: special.photo,
        photoStock: special.photoStock,
        bio: special.bio,
      });
      continue;
    }

    const photoRel = `/images/autoren/${slug}.jpg`;
    const photoAbs = path.join(PHOTO_DIR, `${slug}.jpg`);
    const female = isFemaleName(name);
    const pool = female ? WOMEN : MEN;
    const idx = female ? wIdx++ : mIdx++;
    const photoId = pool[idx % pool.length];
    const url = `https://images.unsplash.com/photo-${photoId}?w=600&h=800&fit=crop&crop=faces&q=80`;

    if (!fs.existsSync(photoAbs) || fs.statSync(photoAbs).size < 5000) {
      process.stdout.write(`download ${slug} … `);
      try {
        await download(url, photoAbs);
        console.log("ok");
      } catch (e) {
        console.log("FAIL", e.message);
      }
    } else {
      console.log(`keep ${slug}`);
    }

    authors.push({
      slug,
      name,
      role: female ? "Autorin" : "Autor",
      photo: photoRel,
      photoStock: true,
    });
  }

  // Sort: Arno first, then A–Z
  authors.sort((a, b) => {
    if (a.slug === "arno-boas") return -1;
    if (b.slug === "arno-boas") return 1;
    return a.name.localeCompare(b.name, "de");
  });

  const lines = authors.map((a) => {
    const bio = a.bio ? `\n    bio: ${JSON.stringify(a.bio)},` : "";
    const stock =
      a.photoStock === false
        ? ""
        : `\n    photoStock: true,`;
    return `  {
    slug: ${JSON.stringify(a.slug)},
    name: ${JSON.stringify(a.name)},
    role: ${JSON.stringify(a.role)},
    photo: ${JSON.stringify(a.photo)},${stock}${bio}
  }`;
  });

  const ts = `import { path } from "./paths";

export type Autor = {
  slug: string;
  name: string;
  role: string;
  /** Relativer Bildpfad unter /images/… */
  photo: string;
  /** true = Stockfoto als Platzhalter, bis ein echtes Porträt vorliegt */
  photoStock?: boolean;
  bio?: string;
};

export const AUTOREN: Autor[] = [
${lines.join(",\n")},
];

export function getAutorBySlug(slug: string): Autor | undefined {
  return AUTOREN.find((a) => a.slug === slug);
}

export function getAutorByName(name?: string): Autor | undefined {
  if (!name) return undefined;
  const slug = name
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[\\u0300-\\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return getAutorBySlug(slug);
}

export function autorPhotoSrc(autor: Autor): string {
  return path(autor.photo);
}

export function autorPhotoAlt(autor: Autor): string {
  return autor.photoStock
    ? \`Platzhalterporträt für \${autor.name}\`
    : autor.name;
}
`;

  fs.writeFileSync(OUT_TS, ts);
  console.log(`Wrote ${authors.length} authors → ${OUT_TS}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
