/** Client-side Merkliste — localStorage + Overlay + Web3Forms */

export type MerkItem = {
  slug: string;
  titel: string;
  kuerzel: string;
  genre: string;
};

const KEY = "tvab_merk";
const WISH_KEY = "tvab_wishes";
export const WISH_OPTS = [
  "Ansichtsexemplar",
  "Rollensatz bestellen",
  "Aufführung anfragen",
  "Beratung / Preisauskunft",
] as const;

export function loadSaved(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveSaved(ids: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    /* ignore */
  }
}

export function loadWishes(): Record<string, string[]> {
  try {
    const raw = JSON.parse(localStorage.getItem(WISH_KEY) || "{}");
    const out: Record<string, string[]> = {};
    for (const [k, v] of Object.entries(raw)) {
      if (Array.isArray(v)) out[k] = v as string[];
      else if (typeof v === "string" && v) out[k] = [v];
    }
    return out;
  } catch {
    return {};
  }
}

export function saveWishes(w: Record<string, string[]>) {
  try {
    localStorage.setItem(WISH_KEY, JSON.stringify(w));
  } catch {
    /* ignore */
  }
}

export function catalogFromDom(): MerkItem[] {
  const nodes = document.querySelectorAll<HTMLElement>("[data-merk-item]");
  return Array.from(nodes).map((el) => ({
    slug: el.dataset.slug || "",
    titel: el.dataset.titel || "",
    kuerzel: el.dataset.kuerzel || "",
    genre: el.dataset.genre || "",
  }));
}

export function buildInquiryMessage(opts: {
  name: string;
  group: string;
  email: string;
  phone: string;
  period: string;
  message: string;
  items: { titel: string; kuerzel: string; genre: string; wishes: string[] }[];
}) {
  const lines = [
    "Über das Merklisten-Formular ist eine neue Anfrage eingegangen.",
    "",
    "Kontakt",
    `Name: ${opts.name}`,
    `Theatergruppe / Verein: ${opts.group || "—"}`,
    `E-Mail: ${opts.email}`,
    `Telefon: ${opts.phone || "—"}`,
    `Geplanter Aufführungszeitraum: ${opts.period || "—"}`,
    "",
    "Gewünschte Stücke & Leistungen",
  ];
  for (const it of opts.items) {
    lines.push("");
    lines.push(`[${it.kuerzel || "Kürzel folgt"}] ${it.titel} · ${it.genre}`);
    lines.push(`Wunsch: ${it.wishes.join(", ")}`);
  }
  if (opts.message.trim()) {
    lines.push("", "Nachricht:", opts.message.trim());
  }
  return lines.join("\n");
}
