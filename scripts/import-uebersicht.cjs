/**
 * Import Besetzung, Kürzel und Spieldauer aus der Live-Übersicht.
 * Quelle: https://theaterverlag-arno-boas.de/uebersicht-ueber-alle-stuecke
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DATA = path.join(ROOT, "src/data/stuecke.json");
const RAW = path.join(__dirname, "_uebersicht_raw.html");
const SOURCE_URL = "https://theaterverlag-arno-boas.de/uebersicht-ueber-alle-stuecke";

const SPIELART_MAP = {
  "Abendfüllendes Stück": "Abendfüllend",
  Einakter: "Einakter",
  Kurzstück: "Kurzstück",
  Sketch: "Sketch",
};

function decodeEntities(s) {
  return s
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, "„")
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&([a-z]+);/gi, (m) => m);
}

function stripTags(s) {
  return decodeEntities(s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function slugFromUrl(href) {
  const m = href.match(/\/stuecke\/([^/"'?#]+)/i);
  return m ? decodeURIComponent(m[1]).toLowerCase() : "";
}

function parseDuration(raw) {
  const t = stripTags(raw);
  if (!t) return { min: null, text: "" };
  const nums = [...t.matchAll(/(\d+)/g)].map((x) => Number(x[1]));
  if (!nums.length) return { min: null, text: t };
  // Bei Bereichen die Untergrenze nehmen (Filter/Anzeige)
  return { min: nums[0], text: t };
}

function parseTables(html) {
  const sections = [];
  const headingRe =
    /<h2[^>]*>\s*(Abendfüllendes Stück|Einakter|Kurzstück|Sketch)\s*<\/h2>/gi;
  const heads = [...html.matchAll(headingRe)];
  for (let i = 0; i < heads.length; i++) {
    const label = heads[i][1];
    const start = heads[i].index;
    const end = i + 1 < heads.length ? heads[i + 1].index : html.length;
    const chunk = html.slice(start, end);
    const tableMatch = chunk.match(/<table[\s\S]*?<\/table>/i);
    if (!tableMatch) continue;
    const rows = [];
    for (const tr of tableMatch[0].matchAll(/<tr>\s*<td[\s\S]*?<\/tr>/gi)) {
      const cells = [...tr[0].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(
        (c) => c[1],
      );
      if (cells.length < 5) continue;
      const a = cells[0].match(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/i);
      if (!a) continue;
      const kuerzelMatch = cells[0].match(/\(([^)]+)\)\s*<\/span>/i) ||
        cells[0].match(/\(([^)]+)\)/);
      const href = a[1];
      const titel = stripTags(a[2]);
      const m = Number(stripTags(cells[1]));
      const w = Number(stripTags(cells[2]));
      const hinweis = stripTags(cells[3]);
      const dauer = parseDuration(cells[4]);
      rows.push({
        titel,
        slug: slugFromUrl(href),
        url: href,
        kuerzel: kuerzelMatch ? kuerzelMatch[1].trim() : "",
        besetzung_m: Number.isFinite(m) ? m : null,
        besetzung_w: Number.isFinite(w) ? w : null,
        besetzung_hinweis: hinweis,
        spieldauer_min: dauer.min,
        spieldauer_text: dauer.text,
        spielart: SPIELART_MAP[label] || label,
      });
    }
    sections.push({ label, spielart: SPIELART_MAP[label], rows });
  }
  return sections;
}

function normTitle(t) {
  return t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function main() {
  const html = fs.readFileSync(RAW, "utf8");
  const data = JSON.parse(fs.readFileSync(DATA, "utf8"));
  const sections = parseTables(html);
  const scraped = sections.flatMap((s) => s.rows);
  console.log(
    "sections",
    sections.map((s) => `${s.label}: ${s.rows.length}`).join(", "),
  );
  console.log("scraped rows", scraped.length);

  const bySlug = new Map(data.stuecke.map((s) => [s.slug, s]));
  const byUrlSlug = new Map();
  for (const s of data.stuecke) {
    const u = slugFromUrl(s.url || "");
    if (u) byUrlSlug.set(u, s);
  }
  const byKuerzel = new Map();
  for (const s of data.stuecke) {
    if (s.kuerzel) byKuerzel.set(s.kuerzel.toLowerCase(), s);
  }
  const byTitle = new Map();
  for (const s of data.stuecke) {
    byTitle.set(normTitle(s.titel), s);
  }

  let matched = 0;
  let updated = 0;
  let unmatched = [];
  const seen = new Set();

  for (const row of scraped) {
    let target =
      bySlug.get(row.slug) ||
      byUrlSlug.get(row.slug) ||
      (row.kuerzel ? byKuerzel.get(row.kuerzel.toLowerCase()) : null) ||
      byTitle.get(normTitle(row.titel));

    if (!target) {
      unmatched.push(`${row.titel} (${row.kuerzel || row.slug})`);
      continue;
    }
    matched++;
    const key = target.slug;
    // Bei Doppel-Listung: Abendfüllend bevorzugen, sonst erste Treffer behalten
    if (seen.has(key)) {
      // nur fehlende Felder nachziehen
      if (!target.kuerzel && row.kuerzel) target.kuerzel = row.kuerzel;
      continue;
    }
    seen.add(key);

    const before = JSON.stringify({
      k: target.kuerzel,
      m: target.besetzung_m,
      w: target.besetzung_w,
      d: target.spieldauer_min,
      s: target.spielart_geschaetzt,
    });

    if (row.kuerzel) target.kuerzel = row.kuerzel.toLowerCase();
    if (row.besetzung_m != null) target.besetzung_m = row.besetzung_m;
    if (row.besetzung_w != null) target.besetzung_w = row.besetzung_w;
    if (row.besetzung_hinweis) target.besetzung_hinweis = row.besetzung_hinweis;
    if (row.spieldauer_min != null) target.spieldauer_min = row.spieldauer_min;
    if (row.spieldauer_text) target.spieldauer_text = row.spieldauer_text;
    if (row.spielart) target.spielart_geschaetzt = row.spielart;

    const after = JSON.stringify({
      k: target.kuerzel,
      m: target.besetzung_m,
      w: target.besetzung_w,
      d: target.spieldauer_min,
      s: target.spielart_geschaetzt,
    });
    if (before !== after) updated++;
  }

  // Stücke in unserer DB, die nicht in der Übersicht waren
  const missingLocal = data.stuecke.filter((s) => !seen.has(s.slug));

  data.meta = {
    ...data.meta,
    stand: new Date().toISOString().slice(0, 10),
    quelle: SOURCE_URL,
    hinweis:
      "Besetzung (m/w), Spieldauer und Kürzel aus der Live-Übersicht importiert. Spielort folgt aus Detailseiten, sofern vorhanden.",
    import: {
      scraped_rows: scraped.length,
      matched,
      updated,
      unmatched: unmatched.length,
      local_without_overview: missingLocal.length,
    },
  };

  fs.writeFileSync(DATA, JSON.stringify(data, null, 2) + "\n");
  fs.writeFileSync(
    path.join(__dirname, "_uebersicht_import_report.json"),
    JSON.stringify(
      {
        unmatched,
        missingLocal: missingLocal.map((s) => ({
          slug: s.slug,
          titel: s.titel,
        })),
        sample: data.stuecke.find((s) => s.besetzung_m != null),
      },
      null,
      2,
    ),
  );

  const withCast = data.stuecke.filter(
    (s) => typeof s.besetzung_m === "number",
  ).length;
  const withKuerzel = data.stuecke.filter((s) => s.kuerzel).length;
  const withDauer = data.stuecke.filter(
    (s) => typeof s.spieldauer_min === "number",
  ).length;

  console.log({ matched, updated, unmatched: unmatched.length, missingLocal: missingLocal.length, withCast, withKuerzel, withDauer });
  if (unmatched.length) console.log("unmatched sample", unmatched.slice(0, 15));
}

main();
