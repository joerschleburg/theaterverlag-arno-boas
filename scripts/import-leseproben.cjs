/**
 * Leseproben (50 %-Auszüge) von der Live-Seite ziehen.
 * Speichert Dateien unter public/leseproben/ und schreibt leseprobe.{file,format,source} in stuecke.json.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const DATA = path.join(ROOT, "src/data/stuecke.json");
const OUT_DIR = path.join(ROOT, "public/leseproben");
const CONCURRENCY = 6;

const EXT_TO_FORMAT = {
  pdf: "pdf",
  doc: "doc",
  docx: "docx",
};

function decodeEntities(s) {
  return s
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; TVAB-leseprobe-import/1.0)" },
  });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.text();
}

function parseLeseprobeUrl(html) {
  const block = html.match(
    /<h2[^>]*>\s*Leseprobe\s*<\/h2>([\s\S]{0,2500}?)(?:<h2|<\/div>|<aside)/i,
  );
  const hay = block ? block[1] : html;
  const m = hay.match(
    /href="([^"]+\.(?:pdf|docx?|PDF|DOCX?))"/i,
  );
  if (!m) return undefined;
  let url = decodeEntities(m[1]);
  if (url.startsWith("//")) url = "https:" + url;
  if (url.startsWith("/")) url = "https://theaterverlag-arno-boas.de" + url;
  return url;
}

function extFromUrl(url) {
  const clean = url.split("?")[0].toLowerCase();
  const ext = clean.match(/\.([a-z0-9]+)$/)?.[1];
  return EXT_TO_FORMAT[ext] || undefined;
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
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const dry = process.argv.includes("--urls-only");
  let found = 0;
  let missing = 0;
  let downloaded = 0;
  let failed = 0;
  const missingSlugs = [];

  await mapPool(data.stuecke, CONCURRENCY, async (s, idx) => {
    const sourceUrl = s.url || `https://theaterverlag-arno-boas.de/stuecke/${s.slug}`;
    try {
      const html = await fetchText(sourceUrl);
      const fileUrl = parseLeseprobeUrl(html);
      if (!fileUrl) {
        missing += 1;
        missingSlugs.push(s.slug);
        delete s.leseprobe;
        if ((idx + 1) % 20 === 0) {
          console.log(`… ${idx + 1}/${data.stuecke.length} (found ${found}, missing ${missing})`);
        }
        return;
      }
      const format = extFromUrl(fileUrl);
      if (!format) {
        missing += 1;
        missingSlugs.push(s.slug);
        return;
      }
      found += 1;
      const destName = `${s.slug}.${format}`;
      const destPath = path.join(OUT_DIR, destName);
      s.leseprobe = {
        format,
        file: `/leseproben/${destName}`,
        source: fileUrl,
      };
      if (dry) return;
      if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
        downloaded += 1;
        return;
      }
      const res = await fetch(fileUrl, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; TVAB-leseprobe-import/1.0)" },
      });
      if (!res.ok) throw new Error(`download ${fileUrl} → ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 200) throw new Error(`tiny file ${fileUrl} (${buf.length}b)`);
      fs.writeFileSync(destPath, buf);
      downloaded += 1;
    } catch (err) {
      failed += 1;
      missingSlugs.push(s.slug);
      console.warn(`fail ${s.slug}: ${err.message}`);
    }
    if ((idx + 1) % 20 === 0) {
      console.log(`… ${idx + 1}/${data.stuecke.length} (found ${found}, missing ${missing}, fail ${failed})`);
    }
  });

  data.meta = data.meta || {};
  data.meta.leseprobe_import = {
    source: "detail pages h2 Leseprobe download links",
    found,
    missing,
    failed,
    downloaded,
    missingSlugs,
  };
  fs.writeFileSync(DATA, JSON.stringify(data, null, 2) + "\n");
  console.log(
    JSON.stringify(
      { found, missing, failed, downloaded, missingSlugs: missingSlugs.slice(0, 30) },
      null,
      2,
    ),
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
