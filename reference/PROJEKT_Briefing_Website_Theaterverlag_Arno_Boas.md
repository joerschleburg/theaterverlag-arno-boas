# Projekt-Briefing — Website-Relaunch Theaterverlag Arno Boas

> Übergabedokument für die Umsetzung in Cursor / Claude Code.
> Stand: Juli 2026. Kann als `CLAUDE.md` bzw. `.cursorrules`-Referenz ins Projekt gelegt werden.

---

## 1. Projekt in einem Satz

Relaunch der Website **theaterverlag-arno-boas.de** — ein kleiner, seit 1997 bestehender Bühnenverlag für das Amateurtheater — als moderne, schnelle, DSGVO-konforme und AI-/SEO-lesbare Website mit ~250 Theaterstücken, komfortabler Suche, Merkliste, Anfrage-Funktion und Katalog-Download.

## 2. Ausgangslage & Warum der Relaunch

Die bestehende Seite läuft auf einem veralteten, mehrfach kompromittierten WordPress. Sie ist technisch am Ende, in Teilen von Spam/Schadcode betroffen und bei Google entsprechend abgestraft (die Anfragen sind über Monate stark zurückgegangen). Ziel des Relaunches:

- Saubere, wartbare, sichere Codebasis (kein verwundbares Alt-WordPress mehr).
- Deutlich bessere Auffindbarkeit (SEO) und Lesbarkeit für KI-Systeme (GEO).
- Ein Auftritt, der zum Verlag und zu seinem Gründer passt — seriös, warm, literarisch, kein Marktschreier.
- Erhalt der bestehenden Domain und der SEO-Substanz (301-Weiterleitungen, siehe Abschnitt 11).

## 3. Der Kunde — Arno Boas (Persona)

Das Design ist bewusst auf die Person des Verlegers zugeschnitten. Wer das umsetzt, sollte ihn im Kopf haben:

- **Arno Boas, Jahrgang 1960.** Schreibt seit 1985 Stücke fürs Amateurtheater, gründete den Verlag 1997 (anfangs „Arnos Theaterladen").
- **Autor und Journalist** — er lebt von und mit Sprache. Er liest jedes Stück im Programm selbst, oft mehrfach.
- **Bodenständig und elegant zugleich**, gebildet, gutes Allgemeinwissen, sportlich, humorvoll (trockener Humor).
- **Ausdrücklich kein Marktschreier.** Er verkauft nicht laut, er empfiehlt. Wer mit ihm telefoniert, bekommt eine ehrliche Einschätzung, keine Werbe­rede.
- Mehrfach ausgezeichnet (u. a. Kulturpreis Main-Tauber-Kreis 1990, Gottlob-Haag-Ehrenring 1999, Goldene Ehrennadel des Amateurtheaterverbandes BW 2011). Sein Drama „An einem Tag im März" erhielt den Theaterpreis „Lamathea" des Landes Baden-Württemberg.
- Verlagsmotto (Originalzitat): **„Vielfalt war und bleibt auch in Zukunft Trumpf unseres Verlages."**

## 4. Design-Philosophie — warum „Editorial"

Wir haben mehrere Richtungen geprüft (lautes Poster-Design, extremes Kachel-Mosaik, ruhiges Verzeichnis, modernes Bento). Entschieden hat sich Arno für das **Editorial-Design**. Der Grund ist inhaltlich, nicht nur ästhetisch:

**Ein Theaterverlag verkauft keine Ware, sondern Texte — Literatur für die Bühne.** Arno ist Autor und Journalist. Sein Metier ist das gedruckte, gut gesetzte Wort. Ein „Editorial"-Design — also die Anmutung einer hochwertigen Zeitschrift bzw. eines Programmhefts: Serifen-Headlines, Kolumnenziffern, Haarlinien, großzügiger Weißraum, redaktionelle Rubriken — überträgt genau diese Identität ins Web. Es sagt ohne Worte: *Hier arbeiten Menschen, die Sprache und Bühne ernst nehmen.*

Das Design ist damit **die visuelle Verlängerung von Arnos Beruf (Journalist/Autor) und seiner Berufung (dem Theater eine Bühne geben).** Es ist warm und würdevoll statt grell und verkäuferisch — passend zu einem Mann, der empfiehlt statt anpreist. Wichtige Leitplanken, die sich daraus ergeben:

- **Ruhig, nicht bunt.** Arno mag es nicht bunt. Farbe ist Akzent, nicht Dekoration.
- **Hell und freundlich.** Warme, papierartige Grundtöne.
- **Text hat Gewicht.** Gute Typografie trägt die Seite, nicht Effekte.
- **Kein Verkaufslärm.** Keine Störer, keine „Jetzt kaufen!"-Rhetorik, keine erfundenen Superlative.

## 5. Design-System

Referenz-Umsetzung liegt bei als **`Landingpage_V1_Editorial.html`** (die aktuell abgestimmte Startseite). Alle Tokens unten stammen daraus.

### 5.1 Schriften (Google Fonts)

- **Headlines / Titel:** `Playfair Display` (Serif) — Gewichte 600–900, auch kursiv. Trägt die redaktionelle, literarische Anmutung.
- **Fließtext / UI:** `Inter` (Sans) — Gewichte 400–700. Ruhig, gut lesbar, modern.
- Frühere Handschrift (`Caveat`) wird **nicht mehr** verwendet (auf Arnos Wunsch: Signaturen/Zitate in normaler Schrift).
- Body-Basisgröße **17 px**, Zeilenhöhe ~1.68.

### 5.2 Farbpalette (CSS-Variablen)

```
--wine:       #CF551A   /* Primär-Akzent (Logo-Orange), Links, Buttons */
--wine-dark:  #A8410F   /* Hover auf Akzent */
--gold:       #B98526   /* sekundärer Zierakzent */
--yellow:     #F2A81D   /* Highlights, Merklisten-Badge */
--ink:        #1A1611   /* Hauptschrift/Überschriften, sehr dunkles Braun-Schwarz */
--text:       #2C2620   /* Fließtext */
--muted:      #645B4D   /* Sekundärtext, Labels */
--paper:      #F1EBDD   /* Seitenhintergrund, warmes Papier */
--paper-2:    #EAE2D1   /* alternativer Flächenton */
--surface:    #FBF7EE   /* Karten/Suchleiste, helle Fläche */
--border:     #D6CCB8   /* Trennlinien */
--hair:       #C7BCA4   /* feine Haarlinien */
```

Genre-Farben (für Feature-Kacheln / Kategoriemarken, gedeckt):
```
Krimi #23262B · Komödie #8A3D12 · Märchen #0F5E49 · Weihnachten #6D1620 · Drama #123A63
```

### 5.3 Formen, Icons, Bewegung

- **Icons:** Tabler Icons (Webfont). Sparsam einsetzen.
- **Ecken:** überwiegend kantig/redaktionell; abgerundete Elemente nur gezielt (Pills bei Buttons/Suche im modernen Kontext).
- **Kolumnenziffern** („№ 01", „№ 02" …) als redaktionelles Ordnungselement über Rubriken.
- **Haarlinien & 2–2,5 px Regellinien** als Gestaltungsmittel statt Boxen/Schatten.
- **Bewegung:** dezent (leichter Hover-Versatz, sanftes Einblenden). Keine verspielten Animationen.

### 5.4 Wiederkehrende Komponenten

Rubrikkopf mit Kolumnenziffer + Serifen-H2 · redaktionelle Feature-Box (dunkle Bild-/Farbfläche + Detailspalte mit „Specs") · typografische Stückliste (zwei Spalten) · Genre-Index mit Zählern · Pull-Quote mit Porträt · Statistik-Zeile · dunkler Newsletter-Block · Footer mit Spalten.

## 6. Informationsarchitektur (Seiten)

- **Startseite** (die Landingpage — Referenzdatei).
- **Alle Stücke / Übersicht** — filter- und durchsuchbare Gesamtliste (Kernstück).
- **Stück-Detailseite** — pro Stück: Titel, Autor, Genre, Kurzbeschreibung/Inhalt, Besetzung, Spieldauer, Bühnenbild, Preis (Rollensatz), Leseprobe-PDF, „Für Aufführung anfragen", „Merken". Optional Bild(er).
- **Kategorie-Seiten** — Komödie (mit Lustspiel, Schwank), Krimi, Krimikomödie, Märchen, Drama, Tragikomödie, Weihnachten, Für Jugendliche, Für Senioren.
- **Autoren** (Übersicht) + optionale **Autorenseiten** (Kurzbio + Foto) — als Zusatzleistung vorgesehen.
- **Über den Verlag** · **Preise & Bedingungen** · **Kontakt**.
- **Rechtliches:** Impressum, Datenschutz, Widerrufsbelehrung.
- Bestehende Zusatzseiten aus dem Altbestand: Presseecho, Verlagsfreunde.

Navigation (Startseite, Stand jetzt): **Theaterstücke · Autoren · Über den Verlag · Preise & Bedingungen · Kontakt · Merkliste**. (Der frühere „Katalog (PDF)"-Punkt wurde aus der Navi entfernt — Katalog-Download läuft über einen Sticky-Button, siehe 7.)

## 7. Funktionen

- **Große Suche + Filter** (auf der Startseite prominent, auf der Übersicht als Filterleiste):
  Freitext · **Genre** (alle, Komödie, Krimi, Krimikomödie, Märchen, Drama, Weihnachten) · **Ensemble** (beliebig, bis 6, 7–10, über 10, Kinder & Jugend) · **Spielort** (egal, Saal, Freilicht, beides) · **Dauer** (alle, Abendfüllend, Einakter, Kurzstück).
- **Merkliste** — clientseitig (localStorage), kein Login. Merken-Icon an jedem Stück, Zähler im Header.
  - *Merken-Icon:* Hover = Tooltip „Merken"; Klick = Umschalten (füllt sich, Zähler +1, kurze Rückmeldung).
  - *Header-Merkliste:* Hover = Vorschau-Flyout mit den gemerkten Stücken (je mit Kürzel); Klick = vollständige Merkliste (Overlay bzw. eigene Seite).
- **Sammel-Anfrage aus der Merkliste.** In der Merkliste wählt man **pro Stück** aus, was gewünscht ist — Mehrfachauswahl über ein Klappmenü mit Häkchen: Leseprobe (PDF), Ansichtsexemplar, Rollensatz bestellen, Aufführung anfragen, Beratung/Preisauskunft.
  - Danach: Zusammenfassung (je Stück Kürzel + Titel + gewählte Leistungen) + Kontaktformular (Name*, Theatergruppe/Verein, E-Mail*, Telefon, Aufführungszeitraum, Nachricht, **DSGVO-Einwilligung***). „Zurück zur Auswahl" oben, „Anfrage absenden" unten. Danach Bestätigungs-Ansicht.
  - Beim Absenden geht eine **strukturierte E-Mail an info@theaterverlag-arno-boas.de** über einen DSGVO-konformen Formular-/Mail-Dienst: Kontaktdaten + je Stück **Kürzel, Titel und gewählte Leistungen**; Reply-To = Absender. Muster: `Anfrage_bei_Arno_Beispiel.html`.
  - Interaktions-Referenz: `Merkliste_Demo.html`. Umsetzung liegt beim Frontend (wir), nicht beim Backend-Programmierer.
- **Newsletter-Anmeldung** — über einen DSGVO-konformen EU-Dienst (Double-Opt-in).
- **Katalog-Download (PDF)** — Arno hat einen Gesamtkatalog als PDF; **wichtiger Download**. Umsetzung als **Sticky-Button unten rechts** („Katalog herunterladen"), auf allen Seiten präsent, auch mobil. Dateiname im Projekt: `Katalog_Theaterverlag_Arno_Boas.pdf`.
- **Hero-Bild rotiert** — bei jedem Seitenaufruf wird zufällig eines von 5 Bildern gezeigt (`hero_1.jpg` … `hero_5.jpg`). Umsetzung per kleinem JS-Snippet (siehe Referenzdatei). Bilder sind aktuell Platzhalter und werden durch echte Aufführungsfotos ersetzt.

## 8. Datenmodell „Stück"

Pro Stück (Felder, die die Detailseite und Filter bedienen):

```
id / slug            eindeutig (aus alter URL ableitbar → wichtig für 301)
kuerzel              Katalog-Kürzel, z. B. "af-57" — MUSS überall angezeigt und in
                     jeder Anfrage mitgeschickt werden (teils in Alt-URLs, Rest von Arno)
titel                z. B. "Mord im Moor"
untertitel/gattung   z. B. "Kriminalkomödie" (kurze Genre-/Typbeschreibung)
autor                z. B. "Jochen Wiltschko" (Arno Boas bei eigenen Stücken)
kategorien[]         eine oder mehrere: Komödie, Krimi, Krimikomödie, Märchen,
                     Drama, Tragikomödie, Weihnachten, Für Jugendliche, Für Senioren,
                     Lustspiel, Schwank
spielart/dauer       Abendfüllend | Einakter | Kurzstück | Sketch
besetzung_m          Anzahl Herrenrollen
besetzung_w          Anzahl Damenrollen
besetzung_var        optionale Hinweise (variabel, Doppelbesetzung …)
spieldauer_min       ca. Minuten
buehnenbild          z. B. "ein Bühnenbild" / "Freilicht möglich"
preis_rollensatz     € (Rollensatz) — dahinter liegt eine transparente Kalkulation
leseprobe_pdf        Link (auf der Altseite: ~die Hälfte des Stücks gratis als PDF)
bestelloptionen      Datei/Heft zum Selbstkopieren ODER gedruckter Rollensatz
auszeichnungen       optional, z. B. "Lamathea-Preis"
bilder[]             optional, nicht jedes Stück hat Fotos
inhalt/klappentext   Fließtext (später aus den echten Klappentexten)
```

**Kategorien & Spielarten** aus der aktuellen Website:
Komödie (→ Lustspiel, Schwank), Für Jugendliche, Tragikomödie, Krimi, Märchen, Drama, Weihnachten, Für Senioren · Spieldauer: Abendfüllendes Stück, Einakter, Kurzstück, Sketch.
Ergänzt auf Arnos Wunsch: **Krimikomödie** (Genre) und **Kinder & Jugend** (Ensemble-Filter).

## 9. Technische Architektur

Bewusst **kein klassisches CMS**. Aufteilung:

- **Frontend (wir / Cursor):** Custom, komponentenbasiert. Statische Generierung oder leichtes Framework — Empfehlung: schlank halten (z. B. Astro/Eleventy oder React/Next, je nach Präferenz). Die Stückdaten kommen als strukturierte Datei (JSON, siehe Migration) bzw. später aus dem Backend.
- **Backend (Programmierer Bernd / KraxWeb):** sehr einfache PHP-Lösung. Arno soll über simple Felder (wie ein Kontaktformular) Stücke pflegen und **pro Stück Bilder hochladen** können. Kein komplexes Redaktionssystem. Schnittstelle zum Frontend: definierte Felder gemäß Datenmodell (Abschnitt 8), Ausgabe idealerweise als JSON-Endpoint oder generierte Datei.
- **Merkliste & Anfrage:** Frontend-seitig (localStorage + Formular-Dienst). Nicht Bernds Aufgabe.
- **Newsletter:** externer DSGVO-Dienst (EU, Double-Opt-in).
- **Datenquelle Migration:** die ~250 Stücke werden aus der alten Website übernommen (siehe Abschnitt 10 + gelieferte Datendateien).

### Schnittstelle Frontend ⇄ Backend (Kurzvertrag für Bernd)

Backend liefert je Stück die Felder aus Abschnitt 8 (mind. titel, slug, untertitel, kategorien, besetzung, dauer, buehnenbild, preis, leseprobe_pdf, bilder). Bilder-Upload pro Stück. Frontend rendert daraus Übersicht, Filter und Detailseiten.

## 10. Migration der Stücke

- Quelle: die bestehenden Kategorie-/Übersichtsseiten und die `stuecke-sitemap.xml` der Altseite.
- Slugs der Altseite **beibehalten**, wo möglich — Basis für 301-Weiterleitungen und SEO-Erhalt.
- Erste, automatisch erzeugte Datenbasis wird als **`stuecke.json`** und **`stuecke.csv`** mitgeliefert (Titel, Slug/URL, Kategorie(n), Untertitel). Detailfelder (Besetzung, Dauer, Preis, Klappentext) werden schrittweise ergänzt — teils aus den Stück-Detailseiten, teils direkt durch Arno im neuen Backend.

## 11. SEO & GEO

- **Domain behalten.** Alte URLs per **301** auf die neuen mappen (Slugs erhalten!). Keine SEO-Substanz verschenken.
- **XML-Sitemap** neu erzeugen und in der Search Console einreichen; Indexierung prüfen.
- **Saubere Meta-Daten** (Title/Description) pro Seite; sprechende URLs.
- **Schema.org / strukturierte Daten** (JSON-LD): Organization/Publisher, CreativeWork je Stück (Titel, Autor, Genre), ggf. Event-Bezug. Das macht die Inhalte für Suchmaschinen **und** KI-Systeme (GEO) maschinenlesbar.
- **FAQ je Seite + FAQPage-Structured-Data (Pflicht für GEO).** Jede Seite erhält einen kurzen, thematisch passenden FAQ-Block (aufklappbar, `<details>`), mit ausschließlich belegbaren Antworten — dazu eingebettetes JSON-LD vom Typ `FAQPage`. Das verbessert die Zitierbarkeit in Suchmaschinen und KI-Antworten. Umgesetzte Referenzen: die FAQ-Blöcke auf Startseite, Übersicht, Stück-Detail, Autoren, Über den Verlag und Preise & Bedingungen.
- **Performance & Mobile:** schnelle Ladezeiten, responsives Layout (Mobilnutzung ist relevant), Bilder optimiert (WebP, lazy-loading).
- Bei Bedarf: alten Schadcode-/Spam-Ballast der Altseite **nicht** mitmigrieren; sauberer Neustart.

## 12. Recht & DSGVO

- Impressum, Datenschutzerklärung, Widerrufsbelehrung vorhanden/aktualisieren.
- Formulare und Newsletter DSGVO-konform (EU-Hosting, Einwilligung, Double-Opt-in).
- Cookie-/Consent nur wo nötig; datensparsam. Keine unnötigen Third-Party-Tracker.

## 13. Redaktions- & Tonrichtlinien (verbindlich)

- **Kein Gendern mit Stern/Doppelpunkt.** Immer ausschreiben: „**Autorinnen und Autoren**".
- **Kein Marktschreier-Ton.** Ruhig, sachlich, mit dezentem, trockenem Humor.
- **Nur belegbare Aussagen.** Keine erfundenen Fakten, Besetzungszahlen, Preise oder Zitate. Wo Angaben fehlen, offen lassen statt erfinden.
- **Zahlen:** Arno spricht von „über 250 Bühnenstücken" (die Altseite nennt „über 200"). Auf der neuen Seite: **über 250**.
- Zitate in Anführungszeichen, Namen in normaler Schrift.

## 14. Kontakt- & Verlagsdaten

```
Theaterverlag Arno Boas
Arno Boas · Finsterlohr 46 · 97993 Creglingen
Tel. 07933/20093 · Fax 07933/20094
info@theaterverlag-arno-boas.de
gegründet 1997
```

## 15. Roadmap für die Umsetzung

1. Projekt-Setup (Repo, gewähltes Framework, Design-Tokens/Fonts als Basis).
2. Startseite aus der Referenzdatei in Komponenten überführen (Header, Hero + Rotation, Suche, Rubriken, Feature, Liste, Index, Pull-Quote, Über, Newsletter, Footer, Sticky-Katalog).
3. Stückdaten (`stuecke.json`) einbinden → Übersicht + Filter live.
4. Stück-Detailseite als Template.
5. Merkliste (localStorage) + Anfrageformular + Newsletter-Dienst anbinden.
6. Backend-Schnittstelle mit Bernd abstimmen (Felder, Bild-Upload, JSON-Ausgabe).
7. Rechtsseiten, Meta/Schema.org, Sitemap, 301-Weiterleitungen.
8. Performance, Mobile, Test, Deployment auf bestehende Domain.

## 16. Referenzdateien im Ordner

- `Landingpage_V1_Editorial.html` — abgestimmte Startseite (Referenz-Design).
- `Stueck_Uebersicht_Editorial.html` — Übersicht/Suchergebnisse mit Filterleiste (orange Titelband, Herren-/Damenrollen-Filter).
- `Stueck_Detail_Editorial.html` — Stück-Detailseite (Eckdaten, Bestelloptionen, Anfrage/Leseprobe/Merken).
- `Autoren_Editorial.html` — Autoren-Fotoraster (alle ~40 gleichwertig).
- `Autor_Detail_Editorial.html` — Autoren-Detailseite mit vollständigem Werkverzeichnis.
- `Ueber_den_Verlag_Editorial.html` — Über den Verlag + Abschnitt „Verlagsfreunde".
- `Preise_und_Bedingungen_Editorial.html` — Preise & Bedingungen mit interaktivem Kostenrechner, Ablauf-Timeline und FAQ.
- `Kontakt_Editorial.html` — Kontaktseite mit Formular, Kontaktkarte, FAQ und Organization-/FAQPage-Schema.
- Noch offen: Impressum, Datenschutzerklärung, Widerrufsbelehrung (Rechtstexte von Arno).
- Alle Seiten enthalten je einen FAQ-Block mit `FAQPage`-JSON-LD (GEO).
- `Merkliste_Demo.html` — interaktive Referenz für Merkliste + Anfrage-Flow.
- `Anfrage_bei_Arno_Beispiel.html` — Muster der E-Mail, die beim Absenden bei Arno eingeht.
- `stuecke.json` / `stuecke.csv` — migrierte Stückdaten (inkl. Feld `kuerzel`).
- `hero_1.jpg` … `hero_5.jpg` — Hero-Bild-Slots (Platzhalter, ersetzbar).
- `logo-light.png` / `logo-dark.png` — Logo (hell/dunkel).
- `arno.jpg` — Porträt Arno Boas (niedrig aufgelöst — besseres Foto anfordern).
- `Katalog_Theaterverlag_Arno_Boas.pdf` — Gesamtkatalog (von Arno beizustellen).
- Weitere Projektunterlagen: Konzept-Empfehlung, Angebot, Programmierer-Briefing, Fragenkatalog.

---

*Dieses Briefing bündelt den Stand aus der Konzeptions- und Designphase. Es ist so gebaut, dass eine Entwicklerin oder ein Entwickler (oder Cursor/Claude Code) damit direkt starten kann.*
