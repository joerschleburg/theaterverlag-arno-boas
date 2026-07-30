# -*- coding: utf-8 -*-
"""Baut stuecke.json und stuecke.csv aus den Kategorieseiten der Altsite.
Quelle: theaterverlag-arno-boas.de (Kategorieseiten, Juli 2026).
Feld untertitel = Gattungszeile aus der Listenansicht.
kategorien = Zugehörigkeit(en) laut Website-Navigation.
spielart_geschaetzt = grob aus der Gattungszeile abgeleitet (zu prüfen)."""
import json, csv, re

DATA = r"""
# Komödie
der-letzte-tag | Der letzte Tag | Komödie über den letzten Arbeitstag, der fast im Chaos endet
geteiltes-glueck-ist-gar-kein-glueck | Geteiltes Glück ist gar kein Glück | Einakter über eine gute Tat, die nach hinten los geht
showdown-im-park | Showdown im Park | Satirische Kriminalkomödie
familie-fuer-fortgeschrittene | Zum Teufel mit der Familie | Komödie über den ganz normalen Familienwahnsinn
die-schafkopf-gang-und-ihr-prophet | Die Schafkopf-Gang und ihr Prophet | Komödie über eine außergewöhnliche Begabung
der-tod-ist-auch-nur-ein-mensch | Der Tod ist auch nur ein Mensch | Komödie mit schwarzem Humor über die Liebe, den Tod, aber nicht den Teufel
hectors-toedliches-vermaechtnis | Hectors tödliches Vermächtnis | Schwarzhumorige Krimi-Komödie über vier Möchtegern-Killer
diebesgut-und-spitzenhoeschen | Diebesgut und Spitzenhöschen | Gauner-Komödie über einen an sich sympathischen Diamantendieb
buerger-franz | Bürger Franz | Komödie über einen Spießbürger par excellence
vollgas-fuer-die-kranken | Vollgas für die Kranken | Eine ärztliche Komödie
e-63-abseits | Abseits | Ein Stück aus dem Fußball-Leben einer Ehe mit umgekehrten Vorzeichen
mit-ta-tue-trara-zum-superstar | Mit Ta-Tü-Trara zum Superstar | Eine Komödie über eine aus dem Ruder laufende Casting-Show
herr-leopold | Herr Leopold | Einakter über den alltäglichen Irrsinn eines Versicherungsvertreters
das-beziehungsprinzip | Das Beziehungsprinzip | Komödie über das, was Beziehungen auch sein können
tee-oder-kaffee | Tee oder Kaffee | Komödie über (Text)probleme bei einer Theaterprobe
abseits | Abseits | Komödie über die (verkehrte) Fußballwelt
mobbing-aber-richtig | Mobbing – aber richtig | Komödie über den täglichen Bürowahnsinn
so-ein-sauhaufen | So ein Sauhaufen | Tierische Komödie
allen-alles-recht-gemacht | Allen alles recht gemacht | Einakter über eine verunglückte Geburtstagsfeten-Vorbereitung
hochzeit-mit-leichen-im-keller | Hochzeit mit Leichen im Keller | Komödie über eine Hochzeit, die in einem Fiasko endet
der-verflixte-jungbrunnen | Der verflixte Jungbrunnen | Komödie über ein besonderes Elexier
ein-killer-kommt-selten-allein | Killer im Doppelpack | Schwarzhumorige Krimi-Komödie
pizza-vs-lerberkas | Pizza vs. Lerberkäs | Eine deutsch-italienische Komödie
unter-schwestern | Unter Schwestern | Komödie über eine Erbschaft und deren unerwartete Folgen
ein-boomerang-auf-zwei-beinen | Ein Boomerang auf zwei Beinen | Komödie
gn-59-zuckerguss-und-krauterkekse | Zuckerguss und Kräuterkekse | Komödie
die-kunterbunte-wunderkuh | Die kunterbunte Wunderkuh | Schwank
millen-ze-verkaafen | Millen ze verkaafen (Müllers Mühle) | Komödie von Christian Lange, in einer luxemburgischen Übersetzung von Georges Neuen
gut-gehext-ist-halb-gewonnen | Gut gehext ist halb gewonnen | Eine Fantasy-Komödie in drei Akten
fauler-zauber | Fauler Zauber | Eine eso-hyst-erische Komödie
in-der-tur-geirrt | In der Tür geirrt | Einakter über den Wahnsinn bei der Wohnungssuche
der-herr-liebt-auch-die-kleinen-boxer | Der Herr liebt auch die kleinen Boxer | Lustspiel von Jochen Wiltschko
aufstand-im-olymp | Aufstand im Olymp | Göttliche Komödie
matroschka | Matroschka | Krimi-Komödie
josef-kennt-sich-nicht-mehr-aus | Josef kennt sich nicht mehr aus | Turbulenter Bauernschwank
ub-immer-treu-und-redlichkeit | Üb immer Treu und Redlichkeit | Einakter von Christian Lange
eine-familie-steht-kopf | Eine Familie steht Kopf | Komödie
eine-frau-fur-willi | Eine Frau für Willi | Schwank
gn-46-ein-tag-und-drei-leben | Ein Tag und drei Leben | Komödie für Freilichtbühnen
saustall-beim-amtsgericht | Saustall beim Amtsgericht | Gerichts-Komödie
ein-teppich-voller-leichen | Ein Teppich voller Leichen | Kriminalkomödie
mit-himmelsmacht-und-hollenfeuer | Mit Himmelsmacht und Höllenfeuer | Komödie
verflixt-verhext-verzaubert | Verflixt, verhext, verzaubert | Modernes Märchen
netzwerkfehler | Netzwerkfehler | Jugend-Komödie
radio-muk | Radio MuK | oder der mediale Kampf ums Überleben
der-grose-coup-von-wickenham | Der große Coup von Wickenham | Westernkomödie
der-letzte-spieser | Der letzte Spießer | Komödie
die-kneipe-zur-sanduhr | Die Kneipe zur Sanduhr | Komödie
mann-in-der-mitte | Mann in der Mitte | Komödie für Senioren
alte-hahne-kampferprobt | Alte Hähne, kampferprobt | Komödie für Senioren
bescherung-ohne-geschenk | Bescherung ohne Geschenk | Komödie (Sketch)
der-fast-vergessene-weihnachtsengel | Der (fast) vergessene Weihnachtsengel | Einakter
willkommen-im-club | Willkommen im Glubb | Komödie (Einakter) für FC Nürnberg-Fans
reif-fur-die-insel | Reif für die Insel | Komödie (Einakter)
die-aischgrund-cops | Die Aischgrund-Cops | Komödie (Einakter)
das-bisschen-haushalt | Das bisschen Haushalt | Komödie (Einakter)
bauer-sucht-sau | Bauer sucht Sau | Komödie (Einakter)
der-aufstieg | Der Aufstieg | Komödie um eine missglückte Bergwanderung
vor-dem-grosen-auftritt | Vor dem großen Auftritt | Komödie
spinatulus-wachtulus | Spinatulus Wachtulus | Komödie
der-lenz-der-bengel | Der Lenz, der Bengel | Komödie aus einer fränkisch-hochdeutschen Mischehe
silvestergeister | Silvestergeister | Komödie
nur-eine-nummer | Nur eine Nummer | Komödie
aufs-herrchen-kommts-an | Aufs Herrchen kommt's an | Komödie
stadtfuhrung | Stadtführung | Komödie
schicksalsschlage | Schicksalsschläge | Komödie
der-nachste-bitte | Der Nächste, bitte | Komödie
der-weibliche-zwilling | Der weibliche Zwilling | Komödie
zwei-im-selben-boot | Zwei im selben Boot | Komödie
unsere-freundin-ingrid | Unsere Freundin Ingrid | Komödie
vernagelt-und-verbohrt | Vernagelt und verbohrt |
kaufhaus-zum-gluck | Kaufhaus zum Glück | Komödie
hochststrafe-kurschatten | Höchststrafe: Kurschatten | Komödie
die-dichterlesung | Die Dichterlesung | Komödie
der-experte | Der Experte | Komödie
mein-lieber-schwan | Mein lieber Schwan | Komödie
der-hansibub | Der Hansibub | Komödie
ein-superbes-mahl | Ein superbes Mahl | Komödie (Einakter)
am-bahnschalter | Am Bahnschalter | Komödie
topf-und-deckel | Topf und Deckel | Komödie
die-permanente-frau | Die Permanente Frau | Komödie (Einakter)
ein-dorf-im-theaterfieber | Ein Dorf im Theaterfieber | Komödie (Einakter)
gros-blond-blauaugig | Groß, blond, blauäugig! | Komödie (Einakter)
onoldia-oder-mein-lieber-herr-gesangsverein | Onoldia oder Mein lieber Herr Gesangsverein | Komödie (Einakter)
im-reiseburo | Im Reisebüro | Komödie (Einakter)
drei-pfund-zuviel | Drei Pfund zuviel | Komödie (Einakter)
super-kollege-schmitt | Super-Kollege Schmitt | Komödie (Einakter, Spieldauer ca. 60 Min.)
pfingsten-kann-sehr-lang-sein | Pfingsten kann sehr lang sein | Komödie (Einakter)
wartezimmer-gschmarri-ii | Wartezimmer-Gschmarri II | Komödie (Einakter)
der-meisterfotograf | Der Meisterfotograf | Komödie (Einakter)
wartezimmer-gschmarri | Wartezimmer-Gschmarri | Komödie (Einakter)
abgesagt | Abgesägt! | Öko-Komödie (Einakter)
der-doppelte-onkel | Der doppelte Onkel | Schwank (Einakter)
drei-und-drei-macht-glucklich | Drei und drei macht glücklich | Komödie
der-erlebnisbericht | Der Erlebnisbericht | Komödie (Einakter)
die-kaffeefahrt | Die Kaffeefahrt | Komödie
was-denn-nun-sein-oder-schein | Was denn nun: Sein oder Schein | Komödie (Einakter)
bei-uns-daham | Bei uns daham | Komödie (Einakter)
der-hexenschuss | Der Hexenschuss | Komödie
zwei-verschwiegene-tochter | Zwei verschwiegene Töchter | Komödie (Einakter)
der-neue-freund | Der neue Freund | Komödie (Einakter)
auf-der-autobahn | Auf der Autobahn | Komödie (Einakter)
auch-drachen-sind-nur-menschen | Auch Drachen sind nur Menschen | Modernes Märchen
auf-der-schonheitsfarm | Auf der Schönheitsfarm | Komödie
grundungsfieber | Gründungsfieber | Krimi-Komödie
im-himmel-trifft-man-sich-wieder | Im Himmel trifft man sich wieder | Historische Komödie aus dem 16. Jahrhundert
angies-ausflug | Angies Ausflug | Komödie (ca. 75 Minuten)
aufs-kreuz-gelegt | Aufs Kreuz gelegt | Tragikomödie
lauter-spinner | Lauter Spinner | Zeitkritisches ländliches Lustspiel
das-bruderherz | Das Bruderherz | Lustspiel
das-miststuck | Das Miststück | Ländliches Lustspiel
das-eigentor | Das Eigentor | Sportliches Lustspiel
und-dess-am-hellichten-dooch | und dess am hellichten Dooch | Komödie
der-erbschaftsjodler | Der Erbschaftsjodler | Schwank
der-niemandshof | Der Niemandshof | Ländliches Lustspiel
gleichgmacht-ganz-leichtgmacht | Gleichg'macht ganz leichtg'macht | Zeitkritisches ländliches Lustspiel
muggebatsche-oum-mistbrialouch | Muggebatsche oum Mistbrialouch | Zeitkritische Komödie / Lustspiel (Neuauflage)
vier-hammel-auf-brautschau | Vier Hammel auf Brautschau | Lustspiel
die-vierte-glocke | Die vierte Glocke | Ländliches Lustspiel
nidd-woahr | Nidd woahr | Komödie über die Wahrheit, und was wir darunter verstehen
der-spurhund-von-sankt-anton | Der Spürhund von Sankt Anton | Katholische Krimi-Komödie
nussknacker-und-compagnie | Nussknacker und Compagnie | Boulevard-Komödie
bis-dass-der-tod-uns-scheidet | Bis dass der Tod uns scheidet | Tragikomödie
der-letzte-schrei | Der letzte Schrei | Krimi-Komödie
hotel-sonnenschein-vollpension-mit-stromausfall | Hotel Sonnenschein: Vollpension mit Stromausfall | Urlaubs-Komödie
ja-mama | Ja, Mama | Boulevard-Komödie
pardon-mein-freund | Pardon, mein Freund | Komödie
dass-ich-in-den-himmel-komm | Dass ich in den Himmel komm | Lustspiel
mach-dein-testament-franz | Mach Dein Testament, Franz | Schwank
goldregen-aus-ubersee | Goldregen aus Übersee | Komödie
das-verruckte-haus | Das verrückte Haus | Komödie
der-31-november | Der 31. November | Komödie
die-steinreiche-lumpenbande | Die steinreiche Lumpenbande | Krimi-Komödie
die-giftige-verwandtschaft | Die giftige Verwandtschaft | Komödie
dinner-for-four | Dinner for Four | Komödie
chaos-auf-dem-bauernhof | Chaos auf dem Bauernhof | Ländliches Lustspiel
reise-nach-jerusalem | Reise nach Jerusalem | Boulevard-Komödie
scheinheiligkeit-hat-einen-namen | Scheinheiligkeit hat einen Namen | Lustspiel
wenn-erst-einmal-die-schonen-bluten-bluhen | Wenn erst einmal die schönen Blüten blühen | Boulevard-Komödie mit Krimi-Touch
alles-blos-theater | Alles bloß Theater? | Komödie ums Theater im Theater
der-jubilaums-zinnober | Der Jubiläums-Zinnober | Lustspiel
wer-beruhmt-sein-will-muss-sterben | Wer berühmt sein will, muss sterben | Komödie
wellness-now | Wellness now | Komödie
rauber-im-rock | Räuber im Rock | Komödie
bier-bits-und-ein-baby | Bier, Bits und ein Baby | Komödie
heiratsfieber | Heiratsfieber | Schwank
der-hecht-im-karpfenteich | Der Hecht im Karpfenteich | Komödie
weihnachtsuberraschung-tante-anna | Weihnachtsüberraschung Tante Anna | Lustspiel
so-ein-durcheinander | So ein Durcheinander | Schwank
hau-mich-nicht-how-mich-nett | Hau mich nicht (How mich nett) | Lustspiel
abends-wenn-die-ahnfrau-geistert | Abends, wenn die Ahnfrau geistert | Spuk-Komödie
immer-dasselbe | Immer dasselbe | Komödie
wer-kusst-die-braut | Wer küsst die Braut? | Komödie
der-letzte-vorhang | Der letzte Vorhang | Komödie
ein-amt-auf-abwegen | Ein Amt auf Abwegen | Komödie
schwarzer-blitz-und-roter-hahn | Schwarzer Blitz und roter Hahn | Kirchlich-kommunistische Komödie
geist-ist-geil | Geist ist geil | Komödie über die menschliche Gier
im-verruckten-wilden-westen | Im verrückten Wilden Westen | Western-Komödie
gibts-im-himmel-kartoffeln | Gibt's im Himmel Kartoffeln? oder De Grumbeerkeenisch vun Ruchem | Himmlisch-höllische Komödie
obacht-erbschleicher | Obacht Erbschleicher | Komödie
aspirin-bratkartoffeln | Aspirin & Bratkartoffeln | Komödie
ochsle | Öchsle | Historische Komödie aus dem 17. Jahrhundert
die-falsche-erbtante | Die falsche Erbtante | Schwank
in-schottland-sind-die-nachte-lang | In Schottland sind die Nächte lang | Komödie
mord-im-moor | Mord im Moor | Kriminalkomödie
ein-sommer-voller-traume | Ein Sommer voller Träume | Hippie-Komödie mit tragischen Zügen
die-dicksten-bauern-60-min | Die dicksten Bauern (60 Min.) | Komödie nach einer alten Volkserzählung (Kurzfassung)
die-dicksten-bauern-95-min | Die dicksten Bauern (95 Min.) | Komödie nach einer alten Volkserzählung
der-ehrendoktorhut | Der Ehrendoktorhut | Komödie über den provinziellen Ehrenkäs
drei-typen-von-vorgestern | Drei Typen von vorgestern | Zeitübergreifende Komödie
ein-paar-zuviel | Ein Paar zuviel | Komödie
der-machtkampf | Der Machtkampf | Lustspiel
das-klosterliche-wickelkind | Das klösterliche Wickelkind | Schwank
katharina-und-das-ewige-leben | Katharina und das ewige Leben | Himmlisch-höllisches Volksstück
mullers-muhle | Müllers Mühle | Komödie
allmacht-episode-ii | Allmächt – Episode II | Zeitkritische Komödie
die-schneiders-hochzeit | Die Schneiders-Hochzeit | Komödie
pension-rhonblick | Pension Rhönblick | Komödie
der-westentaschen-gigolo | Der Westentaschen-Gigolo | Komödie
herzlichen-gluckwunsch-julius | Herzlichen Glückwunsch, Julius | Bitterböse Kriminalkomödie
der-mit-dem-king-tanzt | Der mit dem King tanzt | Komödie über den King of Rock'n'Roll
auf-gute-feindschaft | Auf gute Feindschaft | Komödie in drei Akten
geld-muss-her | Geld muss her | Schwank
herr-im-haus-bin-ich | Herr im Haus bin ich | Schwank
allmacht | Allmächt | Zeitkritische Komödie
beim-franko-ist-was-los | Beim Franko ist was los | Komödie

# Krimi
sicher-ist-sicher | Sicher ist sicher | Krimi-Komödie (Einakter)

# Märchen
nala-und-die-reifepruefung | Nala und die Reifeprüfung | Modernes Märchen
app-ins-marchenland | App ins Märchenland | Modernes Märchen
wie-verhext | Wie verhext | Märchen (Einakter)
adlig-sein-ist-ganz-schon-schwer | Adlig sein ist ganz schön schwer | Komödie (Einakter)
die-retter-der-marchenwelt | Die Retter der Märchenwelt | Modernes Märchen (Einakter)
magische-marken | Magische Marken | Modernes Märchen (Einakter)
der-gluckliche-hans | Der glückliche Hans | Parabel für Kinder (Einakter)

# Drama
die-wahrheit-zum-dessert | Die Wahrheit zum Dessert | Drama
an-einem-tag-im-marz | An einem Tag im März | Drama nach einer wahren Begebenheit
auf-den-letzten-drucker | Auf den letzten Drücker | Einakter über eine missglückte Entführung
heimatfront | Heimatfront | Drama aus den letzten Kriegstagen

# Weihnachten
achtung-nikolaus | Achtung, Nikolaus | Einakter von Christian Ziegler
lied-oder-gedicht | Lied oder Gedicht | Weihnachtskomödie
pia-allein-zuhaus | Pia allein zuhaus | Weihnachtskomödie
es-weihnachtet-sehr | Es weihnachtet sehr | Komödie (Sketch)
hintergrubers-blautanne | Hintergrubers Blautanne | Komödie (Einakter)
tradition | Tradition | Komödie (Sketch)
agentur-weihnachtsengel | Agentur Weihnachtsengel | Komödie (Sketch)
der-traumjob | Der Traumjob | Komödie (Sketch)
das-familienfest | Das Familienfest | Komödie (Sketch)

# Tragikomödie
minderheitenschutz | Minderheitenschutz | Visionär-groteske Komödie (Einakter)
rechts-vor-links | Rechts vor Links(?) | Zeitkritische Komödie (Einakter)
hier-ist-eden | Hier ist Eden | Einakter
die-treibjagd | Die Treibjagd | Tragikomödie für ambitionierte Bühnen
kaltgestellt | Kaltgestellt | Tragikomödie, ausgezeichnet mit dem Oskarle

# Für Jugendliche
der-held-der-kieselsteine | Der Held der Kieselsteine | Jugendtheaterstück
meister-lampe-wird-vermisst | Meister Lampe wird vermisst | Kindertheaterstück von Klaus Tröbs, angelehnt an die Geschichte von Hase und Igel
die-zweite-chance | Die zweite Chance | Zumba, Zoff und Zickenkrieg
endlich-pause | Endlich Pause | Komödie (Einakter)
faust-aufs-auge | Faust aufs Auge | Komödie (Einakter)
kinderwahnsinn | Kinderwahnsinn | Komödie (Einakter)
immer-der-arger-mit-diesen-lehren | Immer der Ärger mit diesen Lehren | Komödie (Einakter)
der-frosch-konig-oder-wenns-handy-in-den-brunnen-fallt | Der Frosch-König oder Wenn's Handy in den Brunnen fällt | Modernes Märchen (Einakter)

# Für Senioren
das-geburtstagsgeschenk | Das Geburtstagsgeschenk | Komödie (Sketch)
die-bankler | Die Bänkler | Komödie für Senioren (Einakter)
der-liebevolle-friedrich | Der liebevolle Friedrich | Komödie (Sketch)
die-junge-mutter | Die junge Mutter | Komödie (Sketch)
auch-der-herbst-hat-schone-tage | Auch der Herbst hat schöne Tage | Komödie (Einakter)
rosa-gibt-nicht-auf | Rosa gibt nicht auf | Komödie für Senioren (Einakter)
vorsicht-tango | Vorsicht Tango | Spätsommerliche Romanze (Einakter)
"""

# Vollständige Kategorien-Zugehörigkeit laut den Kategorieseiten (Mehrfachnennung möglich)
MEMBERSHIP = {
 "Krimi": ["showdown-im-park","hectors-toedliches-vermaechtnis","ein-killer-kommt-selten-allein",
   "gut-gehext-ist-halb-gewonnen","matroschka","saustall-beim-amtsgericht","ein-teppich-voller-leichen",
   "sicher-ist-sicher","grundungsfieber","der-spurhund-von-sankt-anton","der-letzte-schrei",
   "die-steinreiche-lumpenbande","wenn-erst-einmal-die-schonen-bluten-bluhen","mord-im-moor",
   "pension-rhonblick","herzlichen-gluckwunsch-julius"],
 "Märchen": ["nala-und-die-reifepruefung","app-ins-marchenland","verflixt-verhext-verzaubert","wie-verhext",
   "adlig-sein-ist-ganz-schon-schwer","die-retter-der-marchenwelt","magische-marken","der-gluckliche-hans",
   "auch-drachen-sind-nur-menschen"],
 "Drama": ["die-wahrheit-zum-dessert","an-einem-tag-im-marz","auf-den-letzten-drucker","aufs-kreuz-gelegt",
   "heimatfront"],
 "Weihnachten": ["achtung-nikolaus","lied-oder-gedicht","pia-allein-zuhaus","bescherung-ohne-geschenk",
   "es-weihnachtet-sehr","der-fast-vergessene-weihnachtsengel","hintergrubers-blautanne","tradition",
   "agentur-weihnachtsengel","der-traumjob","das-familienfest"],
 "Tragikomödie": ["minderheitenschutz","rechts-vor-links","hier-ist-eden","aufs-kreuz-gelegt",
   "bis-dass-der-tod-uns-scheidet","alles-blos-theater","die-treibjagd","ein-sommer-voller-traume",
   "katharina-und-das-ewige-leben","kaltgestellt"],
 "Für Jugendliche": ["der-held-der-kieselsteine","meister-lampe-wird-vermisst","app-ins-marchenland",
   "netzwerkfehler","die-zweite-chance","der-fast-vergessene-weihnachtsengel","endlich-pause","faust-aufs-auge",
   "wie-verhext","kinderwahnsinn","adlig-sein-ist-ganz-schon-schwer","immer-der-arger-mit-diesen-lehren",
   "die-retter-der-marchenwelt","magische-marken","der-frosch-konig-oder-wenns-handy-in-den-brunnen-fallt",
   "der-gluckliche-hans","angies-ausflug"],
 "Für Senioren": ["mann-in-der-mitte","alte-hahne-kampferprobt","das-geburtstagsgeschenk","die-bankler",
   "der-liebevolle-friedrich","die-junge-mutter","auch-der-herbst-hat-schone-tage","rosa-gibt-nicht-auf",
   "vorsicht-tango"],
}

BASE = "https://theaterverlag-arno-boas.de/stuecke/"

def spielart(u):
    ul = u.lower()
    if "sketch" in ul: return "Sketch"
    if "einakter" in ul: return "Einakter"
    if "kurzstück" in ul or "kurzstueck" in ul: return "Kurzstück"
    return "Abendfüllend"

def kuerzel(slug):
    # Katalog-Kürzel wie "e-63", "gn-59" tauchen bei einigen Slugs als Präfix auf.
    # (1–2 Buchstaben + Zahl). Der Großteil der Kürzel steht NICHT im Slug und
    # muss aus Arnos Bestandsliste ergänzt werden.
    m = re.match(r'^([a-z]{1,2}-\d+)-', slug)
    return m.group(1) if m else ""

plays = {}   # slug -> record
cat = None
for line in DATA.splitlines():
    line = line.strip()
    if not line: continue
    if line.startswith("#"):
        cat = line.lstrip("# ").strip()
        continue
    parts = [p.strip() for p in line.split("|")]
    slug = parts[0]
    title = parts[1] if len(parts) > 1 else ""
    unter = parts[2] if len(parts) > 2 else ""
    if slug not in plays:
        plays[slug] = {"titel": title, "slug": slug, "url": BASE + slug,
                       "kuerzel": kuerzel(slug),
                       "untertitel": unter, "kategorien": [],
                       "spielart_geschaetzt": spielart(unter)}
    rec = plays[slug]
    if unter and not rec["untertitel"]:
        rec["untertitel"] = unter
        rec["spielart_geschaetzt"] = spielart(unter)
    if cat and cat not in rec["kategorien"]:
        rec["kategorien"].append(cat)

# Vollständige Kategorien aus MEMBERSHIP ergänzen (Mehrfachzuordnung)
for c, slugs in MEMBERSHIP.items():
    for s in slugs:
        if s in plays and c not in plays[s]["kategorien"]:
            plays[s]["kategorien"].append(c)

# "Krimikomödie" aus der Gattung ableiten (Arno-Wunsch als eigener Genre-Filter)
for rec in plays.values():
    ul = rec["untertitel"].lower()
    if ("krimi-komödie" in ul or "kriminalkomödie" in ul or "krimikomödie" in ul):
        if "Krimikomödie" not in rec["kategorien"]:
            rec["kategorien"].append("Krimikomödie")

# Kategorien sortiert ausgeben (Komödie zuerst, dann alphabetisch)
order = {"Komödie":0}
for rec in plays.values():
    rec["kategorien"].sort(key=lambda c: (order.get(c, 1), c))

records = sorted(plays.values(), key=lambda r: r["titel"].lower())

out = {
    "meta": {
        "verlag": "Theaterverlag Arno Boas",
        "quelle": "theaterverlag-arno-boas.de (Kategorieseiten)",
        "stand": "2026-07",
        "anzahl_stuecke": len(records),
        "hinweis": ("untertitel = Gattungszeile aus der Listenansicht. "
                    "spielart_geschaetzt aus dieser Zeile abgeleitet (zu pruefen). "
                    "kuerzel = Katalog-Kuerzel; nur bei einigen Stuecken aus dem Slug ableitbar, "
                    "der Rest muss aus Arnos Bestandsliste ergaenzt werden. Kuerzel MUSS immer "
                    "angezeigt und in jeder Anfrage mitgeschickt werden. "
                    "Besetzung, Dauer, Preis, Klappentext folgen aus den Detailseiten/Backend."),
        "kategorien_taxonomie": ["Komödie", "Lustspiel", "Schwank", "Krimi", "Krimikomödie",
                                 "Märchen", "Drama", "Tragikomödie", "Weihnachten",
                                 "Für Jugendliche", "Für Senioren"],
        "spieldauer_taxonomie": ["Abendfüllend", "Einakter", "Kurzstück", "Sketch"]
    },
    "stuecke": records
}

with open("stuecke.json", "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=2)

with open("stuecke.csv", "w", encoding="utf-8", newline="") as f:
    w = csv.writer(f, delimiter=";")
    w.writerow(["titel", "kuerzel", "slug", "url", "untertitel", "kategorien", "spielart_geschaetzt"])
    for r in records:
        w.writerow([r["titel"], r["kuerzel"], r["slug"], r["url"], r["untertitel"],
                    ", ".join(r["kategorien"]), r["spielart_geschaetzt"]])

# kurze Statistik
from collections import Counter
catc = Counter()
for r in records:
    for c in r["kategorien"]:
        catc[c] += 1
print("Stücke gesamt:", len(records))
print("Kategorien:", dict(catc))
print("ohne Kategorie:", sum(1 for r in records if not r["kategorien"]))
print("ohne Untertitel:", sum(1 for r in records if not r["untertitel"]))
