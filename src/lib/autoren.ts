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
    bio: "Gründer des Verlags (1997). Schreibt seit 1985 Stücke fürs Amateurtheater.",
  },
  {
    slug: "adolf-koehler",
    name: "Adolf Köhler",
    role: "Autor",
    photo: "/images/autoren/adolf-koehler.jpg",
    photoStock: true,
  },
  {
    slug: "angelika-grimm",
    name: "Angelika Grimm",
    role: "Autorin",
    photo: "/images/autoren/angelika-grimm.jpg",
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
    slug: "christian-ziegler",
    name: "Christian Ziegler",
    role: "Autor",
    photo: "/images/autoren/christian-ziegler.jpg",
    photoStock: true,
  },
  {
    slug: "dieter-bauer",
    name: "Dieter Bauer",
    role: "Autor",
    photo: "/images/autoren/dieter-bauer.jpg",
    photoStock: true,
  },
  {
    slug: "dieter-fuchs",
    name: "Dieter Fuchs",
    role: "Autor",
    photo: "/images/autoren/dieter-fuchs.jpg",
    photoStock: true,
  },
  {
    slug: "dirk-salzbrunn",
    name: "Dirk Salzbrunn",
    role: "Autor",
    photo: "/images/autoren/dirk-salzbrunn.jpg",
    photoStock: true,
  },
  {
    slug: "doris-albert",
    name: "Doris Albert",
    role: "Autorin",
    photo: "/images/autoren/doris-albert.jpg",
    photoStock: true,
  },
  {
    slug: "friedhelm-mueller",
    name: "Friedhelm Müller",
    role: "Autor",
    photo: "/images/autoren/friedhelm-mueller.jpg",
    photoStock: true,
  },
  {
    slug: "gabi-hansen",
    name: "Gabi Hansen",
    role: "Autorin",
    photo: "/images/autoren/gabi-hansen.jpg",
    photoStock: true,
  },
  {
    slug: "gerhard-osswald",
    name: "Gerhard Osswald",
    role: "Autor",
    photo: "/images/autoren/gerhard-osswald.jpg",
    photoStock: true,
  },
  {
    slug: "gerlinde-panzer",
    name: "Gerlinde Panzer",
    role: "Autorin",
    photo: "/images/autoren/gerlinde-panzer.jpg",
    photoStock: true,
  },
  {
    slug: "helga-kerth-foerster",
    name: "Helga Kerth-Förster",
    role: "Autorin",
    photo: "/images/autoren/helga-kerth-foerster.jpg",
    photoStock: true,
  },
  {
    slug: "henry-doll",
    name: "Henry Doll",
    role: "Autor",
    photo: "/images/autoren/henry-doll.jpg",
    photoStock: true,
  },
  {
    slug: "horst-kayling",
    name: "Horst Kayling",
    role: "Autor",
    photo: "/images/autoren/horst-kayling.jpg",
    photoStock: true,
  },
  {
    slug: "iris-klasen",
    name: "Iris Klasen",
    role: "Autorin",
    photo: "/images/autoren/iris-klasen.jpg",
    photoStock: true,
  },
  {
    slug: "jochen-gruebel",
    name: "Jochen Grübel",
    role: "Autor",
    photo: "/images/autoren/jochen-gruebel.jpg",
    photoStock: true,
  },
  {
    slug: "jochen-wiltschko",
    name: "Jochen Wiltschko",
    role: "Autor",
    photo: "/images/autoren/jochen-wiltschko.jpg",
    photoStock: true,
  },
  {
    slug: "johannes-kaplan",
    name: "Johannes Kaplan",
    role: "Autor",
    photo: "/images/autoren/johannes-kaplan.jpg",
    photoStock: true,
  },
  {
    slug: "joerg-bettermann",
    name: "Jörg Bettermann",
    role: "Autor",
    photo: "/images/autoren/joerg-bettermann.jpg",
    photoStock: true,
  },
  {
    slug: "jutta-doepfer",
    name: "Jutta Döpfer",
    role: "Autorin",
    photo: "/images/autoren/jutta-doepfer.jpg",
    photoStock: true,
  },
  {
    slug: "kerstin-schertel",
    name: "Kerstin Schertel",
    role: "Autorin",
    photo: "/images/autoren/kerstin-schertel.jpg",
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
    slug: "klaus-wagner",
    name: "Klaus Wagner",
    role: "Autor",
    photo: "/images/autoren/klaus-wagner.jpg",
    photoStock: true,
  },
  {
    slug: "klaus-ziegler",
    name: "Klaus Ziegler",
    role: "Autor",
    photo: "/images/autoren/klaus-ziegler.jpg",
    photoStock: true,
  },
  {
    slug: "martin-schoerle",
    name: "Martin Schörle",
    role: "Autor",
    photo: "/images/autoren/martin-schoerle.jpg",
    photoStock: true,
  },
  {
    slug: "martina-klaerle",
    name: "Martina Klärle",
    role: "Autorin",
    photo: "/images/autoren/martina-klaerle.jpg",
    photoStock: true,
  },
  {
    slug: "martina-landshuter",
    name: "Martina Landshuter",
    role: "Autorin",
    photo: "/images/autoren/martina-landshuter.jpg",
    photoStock: true,
  },
  {
    slug: "nicola-quass",
    name: "Nicola Quaß",
    role: "Autorin",
    photo: "/images/autoren/nicola-quass.jpg",
    photoStock: true,
  },
  {
    slug: "raimund-zenkert-und-angela-leupold",
    name: "Raimund Zenkert und Angela Leupold",
    role: "Autoren",
    photo: "/images/autoren/raimund-zenkert-und-angela-leupold.jpg",
    photoStock: true,
  },
  {
    slug: "rainald-methlow",
    name: "Rainald Methlow",
    role: "Autor",
    photo: "/images/autoren/rainald-methlow.jpg",
    photoStock: true,
  },
  {
    slug: "ralf-kaspari",
    name: "Ralf Kaspari",
    role: "Autor",
    photo: "/images/autoren/ralf-kaspari.jpg",
    photoStock: true,
  },
  {
    slug: "rene-rueprich",
    name: "Rene Rüprich",
    role: "Autor",
    photo: "/images/autoren/rene-rueprich.jpg",
    photoStock: true,
  },
  {
    slug: "roland-papenfuss",
    name: "Roland Papenfuß",
    role: "Autor",
    photo: "/images/autoren/roland-papenfuss.jpg",
    photoStock: true,
  },
  {
    slug: "rosina-erhart",
    name: "Rosina Erhart",
    role: "Autorin",
    photo: "/images/autoren/rosina-erhart.jpg",
    photoStock: true,
  },
  {
    slug: "sylvia-wilkerson",
    name: "Sylvia Wilkerson",
    role: "Autorin",
    photo: "/images/autoren/sylvia-wilkerson.jpg",
    photoStock: true,
  },
  {
    slug: "thomas-gehring",
    name: "Thomas Gehring",
    role: "Autor",
    photo: "/images/autoren/thomas-gehring.jpg",
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
    slug: "uschi-podljeska",
    name: "Uschi Podljeska",
    role: "Autorin",
    photo: "/images/autoren/uschi-podljeska.jpg",
    photoStock: true,
  },
  {
    slug: "walter-brunhuber",
    name: "Walter Brunhuber",
    role: "Autor",
    photo: "/images/autoren/walter-brunhuber.jpg",
    photoStock: true,
  },
  {
    slug: "walter-tausendpfund",
    name: "Walter Tausendpfund",
    role: "Autor",
    photo: "/images/autoren/walter-tausendpfund.jpg",
    photoStock: true,
  },
  {
    slug: "walter-winkler",
    name: "Walter Winkler",
    role: "Autor",
    photo: "/images/autoren/walter-winkler.jpg",
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
    slug: "wolfgang-stock",
    name: "Wolfgang Stock",
    role: "Autor",
    photo: "/images/autoren/wolfgang-stock.jpg",
    photoStock: true,
  },
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
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return getAutorBySlug(slug);
}

export function autorPhotoSrc(autor: Autor): string {
  return path(autor.photo);
}

export function autorPhotoAlt(autor: Autor): string {
  return autor.photoStock
    ? `Platzhalterporträt für ${autor.name}`
    : autor.name;
}
