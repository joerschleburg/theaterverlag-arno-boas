# Theaterverlag Arno Boas — Website

Astro-Frontend (statisch) nach Editorial-Design und Projekt-Briefing.

## Lokal starten

```bash
npm install
npm run dev
```

Öffnet die Vorschau unter http://localhost:4321

## Bau

```bash
npm run build
npm run preview
```

## Struktur

- `src/pages` — Routing
- `src/components` — UI-Bausteine
- `src/data/stuecke.json` — Stückdaten (Austausch gegen Backend-JSON später)
- `public/images` — Logos, Hero, Porträt
- `public/katalog/` — hier `Katalog_Theaterverlag_Arno_Boas.pdf` ablegen
- `reference/` — abgestimmte HTML-Referenzen + Briefing

## Status

Phase 1–3: Setup, Startseite, Übersicht, Details, Autoren,
Über den Verlag, Preise (Rechner), Kontakt, Merkliste + Anfrage-Flow.

## Formulare (Web3Forms)

1. Key unter https://web3forms.com holen (Ziel: `info@theaterverlag-arno-boas.de`)
2. `.env` anlegen: `PUBLIC_WEB3FORMS_ACCESS_KEY=…` (siehe `.env.example`)
3. Für GitHub Pages denselben Key als Repository-Secret hinterlegen

Ohne Key funktioniert die UI lokal; Absenden zeigt Erfolg, verschickt aber keine Mail.

## GitHub Pages

Workflow: `.github/workflows/deploy.yml` baut bei Push auf `main` und deployt `dist/`.

Repo anlegen, pushen, unter Settings → Pages „GitHub Actions“ wählen.
Wenn die Vorschau unter `username.github.io/repo` läuft, in `astro.config.mjs`
`site` und `base` entsprechend setzen.
