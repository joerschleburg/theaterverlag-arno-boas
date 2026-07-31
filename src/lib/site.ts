import { path } from "./paths";

export const SITE = {
  name: "Theaterverlag Arno Boas",
  url: "https://theaterverlag-arno-boas.de",
  email: "info@theaterverlag-arno-boas.de",
  phone: "07933/20093",
  fax: "07933/20094",
  vatId: "DE263971681",
  address: {
    street: "Finsterlohr 46",
    zip: "97993",
    city: "Creglingen",
  },
  founded: 1997,
  description:
    "Bühnenverlag für das Amateurtheater mit über 250 Stücken von rund 40 Autorinnen und Autoren.",
  /** Preview/Staging: false. Vor dem Go-live auf true setzen. */
  indexable: false,
} as const;

export const NAV = [
  { href: path("/theaterstuecke"), label: "Theaterstücke", match: "/theaterstuecke" },
  { href: path("/autoren"), label: "Autoren", match: "/autoren" },
  { href: path("/ueber-den-verlag"), label: "Über den Verlag", match: "/ueber-den-verlag" },
  {
    href: path("/preise-und-bedingungen"),
    label: "Preise & Bedingungen",
    match: "/preise-und-bedingungen",
  },
  { href: path("/kontakt"), label: "Kontakt", match: "/kontakt" },
] as const;

/** Optionen für Genre-Selects (Übersicht + Hero). Datenkategorie bleibt „Für Jugendliche“. */
export const GENRE_FILTER_OPTIONS = [
  "alle",
  "Komödie",
  "Krimi",
  "Märchen",
  "Drama",
  "Weihnachten",
  "Tragikomödie",
  "Kinder & Jugend",
  "Für Senioren",
] as const;

export type GenreFilterOption = (typeof GENRE_FILTER_OPTIONS)[number];

/** Anzeigename / URL-Wert für Genre-Filter (Datenkategorie → Filterlabel). */
export function genreFilterLabel(kategorie: string): string {
  return kategorie === "Für Jugendliche" ? "Kinder & Jugend" : kategorie;
}

function genreSlug(label: string) {
  return label
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/&/g, "und")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Welche Daten-Kategorien zu einem Filterpunkt zählen. */
const GENRE_MATCH: Record<string, readonly string[]> = {
  Komödie: ["Komödie", "Lustspiel", "Schwank"],
  "Kinder & Jugend": ["Für Jugendliche"],
};

/**
 * Startseiten-Index „Nach Genre stöbern“ — gleiche Punkte wie der Filter (ohne „alle“).
 */
export const GENRE_INDEX = GENRE_FILTER_OPTIONS.filter((g) => g !== "alle").map(
  (label) => ({
    slug: genreSlug(label),
    label,
    match: GENRE_MATCH[label] ?? [label],
  }),
);
