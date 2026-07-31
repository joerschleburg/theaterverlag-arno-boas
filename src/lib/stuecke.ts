import raw from "../data/stuecke.json";
import { GENRE_INDEX } from "./site";
import { path } from "./paths";
import { AUTOREN } from "./autoren";

export type Stueck = {
  titel: string;
  slug: string;
  url: string;
  kuerzel: string;
  untertitel: string;
  kategorien: string[];
  spielart_geschaetzt: string;
  autor?: string;
  besetzung_m?: number;
  besetzung_w?: number;
  besetzung_hinweis?: string;
  spieldauer_min?: number;
  spieldauer_text?: string;
  /** Saal | Freilicht | beides */
  spielort?: string;
  buehnenbild?: string;
  preis_rollensatz?: number;
  inhalt?: string;
  featured?: boolean;
  neu?: boolean;
};

type StueckeFile = {
  meta: {
    anzahl_stuecke: number;
    kategorien_taxonomie: string[];
    spieldauer_taxonomie: string[];
  };
  stuecke: Stueck[];
};

const data = raw as StueckeFile;

/** Zentrale Datenquelle — heute JSON, später API/Backend. */
export function getStuecke(): Stueck[] {
  return data.stuecke;
}

export function getStueckBySlug(slug: string): Stueck | undefined {
  return data.stuecke.find((s) => s.slug === slug);
}

export function getStueckeMeta() {
  return data.meta;
}

export function countByGenreMatch(match: readonly string[]): number {
  const set = new Set(match);
  return data.stuecke.filter((s) => s.kategorien.some((k) => set.has(k))).length;
}

export function getGenreIndexWithCounts() {
  return GENRE_INDEX.map((g, i) => ({
    ...g,
    n: String(i + 1).padStart(2, "0"),
    count: countByGenreMatch(g.match),
  }));
}

export function stueckHref(slug: string) {
  return path(`/stuecke/${slug}`);
}

export function overviewHref(params: Record<string, string | undefined> = {}) {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v && v !== "alle" && v !== "beliebig" && v !== "egal") q.set(k, v);
  }
  const s = q.toString();
  return s ? path(`/theaterstuecke?${s}`) : path("/theaterstuecke");
}

/** Bekannte Autorenseiten (Slug-Match über Normalisierung). */
const KNOWN_AUTHOR_SLUGS = new Set(AUTOREN.map((a) => a.slug));

function normalizePerson(name: string) {
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

export function autorHref(autor?: string): string | undefined {
  if (!autor) return undefined;
  const slug = normalizePerson(autor);
  return KNOWN_AUTHOR_SLUGS.has(slug) ? path(`/autoren/${slug}`) : undefined;
}

export function formatBesetzung(s: Stueck): string | undefined {
  if (typeof s.besetzung_m !== "number" && typeof s.besetzung_w !== "number") {
    return undefined;
  }
  const m = typeof s.besetzung_m === "number" ? s.besetzung_m : "–";
  const w = typeof s.besetzung_w === "number" ? s.besetzung_w : "–";
  return `${m} Herren · ${w} Damen`;
}

export function formatSpielort(spielort?: string): string | undefined {
  if (!spielort) return undefined;
  if (spielort === "beides") return "Saal und Freilicht";
  return spielort;
}

export function getRelatedStuecke(stueck: Stueck, limit = 3): Stueck[] {
  const genres = new Set(stueck.kategorien);
  return data.stuecke
    .filter((s) => s.slug !== stueck.slug)
    .map((s) => ({
      s,
      score: s.kategorien.reduce((n, k) => n + (genres.has(k) ? 1 : 0), 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.s.titel.localeCompare(b.s.titel, "de"))
    .slice(0, limit)
    .map((x) => x.s);
}
