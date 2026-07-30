/**
 * Spielort (und Autor) aus den Live-Detailseiten importieren.
 * Quelle: h2 „Bühnenbild“ / „Bühnenbild (auch Freilichtbühne)“
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DATA = path.join(ROOT, "src/data/stuecke.json");
const CONCURRENCY = 8;

function decodeEntities(s) {
  return s
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&#8222;/g, "„")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function stripTags(s) {
  return decodeEntities(s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function inferSpielort(heading, body, untertitel) {
  const h = (heading || "").toLowerCase();
  const u = (untertitel || "").toLowerCase();
  const b = (body || "").toLowerCase();
  const blob = `${h} ${u} ${b}`;

  const freilichtHint =
    /freilicht/.test(h) ||
    /freilichtbühne|freilichtbuehne|für freilicht|fuer freilicht/.test(u) ||
    /freilichtbühne|freilichtbuehne/.test(b);

  const auchFreilicht = /auch\s+freilicht/.test(h) || /\(auch freilicht/.test(h);

  if (auchFreilicht || (/freilicht/.test(h) && /auch/.test(h))) return "beides";
  if (freilichtHint && !/saal|zimmer|wirtschaft|wohnhaus|küche|kueche|wohnzimmer/.test(blob)) {
    // explizit Freilicht-Stück
    if (/für freilicht|fuer freilicht|freilichtbühne|freilichtbuehne/.test(u)) return "Freilicht";
  }
  if (auchFreilicht || freilichtHint) return "beides";
  return "Saal";
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; TVAB-data-import/1.0)" },
  });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.text();
}

function parseDetail(html) {
  const h2 = html.match(/<h2[^>]*>\s*(Bühnenbild[^<]*)<\/h2>/i);
  const heading = h2 ? stripTags(h2[1]) : "";
  let body = "";
  if (h2) {
    const after = html.slice(h2.index + h2[0].length);
    const p = after.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    if (p) body = stripTags(p[1]);
  }
  const autor =
    stripTags(
      (html.match(/class="buch-autor"[^>]*>[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/i) ||
        [])[1] || "",
    ) || undefined;
  return { heading, body, autor };
}

async function mapPool(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: limit }, () => worker()));
  return out;
}

async function main() {
  const data = JSON.parse(fs.readFileSync(DATA, "utf8"));
  const results = await mapPool(data.stuecke, CONCURRENCY, async (s, idx) => {
    try {
      const html = await fetchText(s.url);
      const parsed = parseDetail(html);
      const spielort = inferSpielort(parsed.heading, parsed.body, s.untertitel);
      if ((idx + 1) % 25 === 0 || idx === 0) {
        console.log(`[${idx + 1}/${data.stuecke.length}] ${s.slug} → ${spielort}`);
      }
      return { ok: true, spielort, parsed };
    } catch (e) {
      console.warn("fail", s.slug, e.message);
      return { ok: false, error: String(e.message || e) };
    }
  });

  let updated = 0;
  let fails = 0;
  const counts = { Saal: 0, Freilicht: 0, beides: 0 };

  data.stuecke.forEach((s, i) => {
    const r = results[i];
    if (!r?.ok) {
      fails++;
      return;
    }
    s.spielort = r.spielort;
    counts[r.spielort] = (counts[r.spielort] || 0) + 1;
    if (r.parsed.body) s.buehnenbild = r.parsed.body;
    else if (r.parsed.heading) s.buehnenbild = r.parsed.heading;
    if (r.parsed.autor) s.autor = r.parsed.autor;
    updated++;
  });

  data.meta = {
    ...data.meta,
    stand: new Date().toISOString().slice(0, 10),
    spielort_import: {
      source: "detail pages Bühnenbild headings",
      updated,
      fails,
      counts,
    },
  };

  fs.writeFileSync(DATA, JSON.stringify(data, null, 2) + "\n");
  console.log({ updated, fails, counts });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
