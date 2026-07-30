import { path } from "./paths";

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
  {
    slug: "arno-boas",
    name: "Arno Boas",
    role: "Verlagsgründer · Autor · Theatermensch",
    photo: "/images/arno.jpg",
    bio: "Gründer des Verlags (1997). Schreibt seit 1985 Stücke fürs Amateurtheater. Kurzbio und Werkverzeichnis werden ergänzt.",
  },
  {
    slug: "jochen-wiltschko",
    name: "Jochen Wiltschko",
    role: "Autor",
    photo: "/images/autoren/jochen-wiltschko.jpg",
    photoStock: true,
  },
  {
    slug: "christian-lange",
    name: "Christian Lange",
    role: "Autor",
    photo: "/images/autoren/christian-lange.jpg",
    photoStock: true,
  },
  {
    slug: "thorsten-boehner",
    name: "Thorsten Böhner",
    role: "Autor",
    photo: "/images/autoren/thorsten-boehner.jpg",
    photoStock: true,
  },
  {
    slug: "klaus-troebs",
    name: "Klaus Tröbs",
    role: "Autor",
    photo: "/images/autoren/klaus-troebs.jpg",
    photoStock: true,
  },
  {
    slug: "christian-ziegler",
    name: "Christian Ziegler",
    role: "Autor",
    photo: "/images/autoren/christian-ziegler.jpg",
    photoStock: true,
  },
  {
    slug: "georges-neuen",
    name: "Georges Neuen",
    role: "Autor · Übersetzer",
    photo: "/images/autoren/georges-neuen.jpg",
    photoStock: true,
  },
  {
    slug: "wilhelm-wolpert",
    name: "Wilhelm Wolpert",
    role: "Autor",
    photo: "/images/autoren/wilhelm-wolpert.jpg",
    photoStock: true,
  },
  {
    slug: "thomas-gehring",
    name: "Thomas Gehring",
    role: "Autor",
    photo: "/images/autoren/thomas-gehring.jpg",
    photoStock: true,
  },
];

export function getAutorBySlug(slug: string): Autor | undefined {
  return AUTOREN.find((a) => a.slug === slug);
}

export function autorPhotoSrc(autor: Autor): string {
  return path(autor.photo);
}

export function autorPhotoAlt(autor: Autor): string {
  return autor.photoStock
    ? `Platzhalterporträt für ${autor.name}`
    : autor.name;
}
