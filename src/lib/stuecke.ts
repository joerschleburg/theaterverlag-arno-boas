import raw from "../data/stuecke.json";
import { GENRE_INDEX } from "./site";
import { path } from "./paths";

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
