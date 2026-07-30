/**
 * Inhaltstexte (+ sauberes Bühnenbild) aus Live-Detailseiten importieren.
 * Quelle: .inhaltsbeschreibung > p  und  h2 Bühnenbild + folgender p
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
    .replace(/&#8220;/g, "„")
    .replace(/&#8221;/g, "“")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8217;/g, "’")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripTags(s) {
  return decodeEntities(s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; TVAB-data-import/1.0)" },
  });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.text();
}

function parseInhalt(html) {
  const block = html.match(
    /<div[^>]*class="[^"]*inhaltsbeschreibung[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
  );
  if (!block) return undefined;
  const paras = [...block[1].matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)].map((m) =>
    stripTags(m[1]),
  );
  const text = paras.filter(Boolean).join("\n\n").trim();
  return text || undefined;
}

function parseBuehnenbild(html) {
  // Nur „Bühnenbild“ / „Bühnenbilder“ mit echtem Absatz danach
  const h2 = html.match(/<h2[^>]*>\s*(Bühnenbilder?[^<]*)<\/h2>/i);
  if (!h2) return undefined;
  const after = html.slice(h2.index + h2[0].length);
  const p = after.match(/^\s*<p[^>]*>([\s\S]*?)<\/p>/i);
  if (!p) return undefined;
  const body = stripTags(p[1]);
  if (!body || body.length < 8) return undefined;
  return body;
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
      const inhalt = parseInhalt(html);
      const buehnenbild = parseBuehnenbild(html);
      if ((idx + 1) % 25 === 0 || idx === 0) {
        console.log(
          `[${idx + 1}/${data.stuecke.length}] ${s.slug} inhalt=${inhalt ? inhalt.length : 0} bb=${buehnenbild ? buehnenbild.length : 0}`,
        );
      }
      return { ok: true, inhalt, buehnenbild };
    } catch (e) {
      console.warn("fail", s.slug, e.message);
      return { ok: false, error: String(e.message || e) };
    }
  });

  let withInhalt = 0;
  let withBb = 0;
  let clearedBb = 0;
  let clearedHinweis = 0;
  let fails = 0;

  data.stuecke.forEach((s, i) => {
    const r = results[i];
    if (!r?.ok) {
      fails++;
      return;
    }

    if (r.inhalt) {
      s.inhalt = r.inhalt;
      withInhalt++;
    }

    if (r.buehnenbild) {
      // echte Bühnenbild-Beschreibung
      if (r.buehnenbild !== s.untertitel && r.buehnenbild !== s.titel) {
        s.buehnenbild = r.buehnenbild;
        withBb++;
      }
    } else if (
      s.buehnenbild &&
      (s.buehnenbild === s.untertitel ||
        s.buehnenbild === s.titel ||
        /^bühnenbilder?$/i.test(s.buehnenbild.trim()))
    ) {
      delete s.buehnenbild;
      clearedBb++;
    }

    if (s.besetzung_hinweis && /^\d+$/.test(String(s.besetzung_hinweis).trim())) {
      delete s.besetzung_hinweis;
      clearedHinweis++;
    }
  });

  data.meta = {
    ...data.meta,
    stand: new Date().toISOString().slice(0, 10),
    inhalt_import: {
      source: "detail pages .inhaltsbeschreibung",
      withInhalt,
      withBb,
      clearedBb,
      clearedHinweis,
      fails,
    },
  };

  fs.writeFileSync(DATA, JSON.stringify(data, null, 2) + "\n");
  console.log({ withInhalt, withBb, clearedBb, clearedHinweis, fails });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
