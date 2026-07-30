/** Basis-Pfad (leer lokal / Domain, gesetzt für GitHub Pages Project Site) */
export const BASE = (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "";

/** Absoluter Pfad inkl. optionalem Base-Prefix */
export function path(href: string): string {
  if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:")) {
    return href;
  }
  const p = href.startsWith("/") ? href : `/${href}`;
  return `${BASE}${p}`;
}
