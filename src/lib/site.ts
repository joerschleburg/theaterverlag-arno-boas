import { path } from "./paths";

export const SITE = {
  name: "Theaterverlag Arno Boas",
  url: "https://theaterverlag-arno-boas.de",
  email: "info@theaterverlag-arno-boas.de",
  phone: "07933/20093",
  fax: "07933/20094",
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

export const GENRE_INDEX = [
  { slug: "komoedie", label: "Komödie", match: ["Komödie", "Lustspiel", "Schwank"] },
  { slug: "krimi", label: "Krimi", match: ["Krimi", "Krimikomödie"] },
  { slug: "maerchen", label: "Märchen", match: ["Märchen"] },
  { slug: "fuer-jugendliche", label: "Kinder & Jugend", match: ["Für Jugendliche"] },
  { slug: "weihnachten", label: "Weihnachten", match: ["Weihnachten"] },
  { slug: "drama", label: "Drama", match: ["Drama", "Tragikomödie"] },
] as const;
