# Daves App Dings

## Starten

**DavesAppDings.html** herunterladen und in einem aktuellen Browser öffnen. Die Datei enthält Bilder, CSS und JavaScript vollständig und funktioniert offline ohne Webserver. Bei einem ZIP-Download zuerst entpacken.

Alternativ `login.html` öffnen. Dabei müssen `style.css`, `script.js`, `Dome.png` und `Oregano.png` im selben Ordner bleiben.

## Was wurde ergänzt?

- **Anpassbares Layout:** Hintergrund, zwölf Tasten und Beschriftungen skalieren gemeinsam für Desktop, Handy und Tablet. Das Motiv bleibt vollständig sichtbar und behält seine Proportionen; je nach Fensterformat entstehen schwarze Freiflächen.
- **Auflösung einstellen:** Oben rechts lassen sich Voreinstellungen oder freie Breite und Höhe von jeweils 1 bis 16384 Pixeln wählen. „Übernehmen“ stellt die Zeichenfläche ein. Die Bildschirmauflösung des Betriebssystems wird dadurch nicht verändert.
- **Automatisch / Originalgröße:** Automatisch passt die Fläche ins Fenster. Originalgröße zeigt sie 1:1 und erlaubt bei Bedarf Scrollen. Die Auswahl wird im Browser gespeichert, sofern lokaler Speicher verfügbar ist.
- **Direktes Öffnen:** Relative Dateipfade beheben fehlende Bilder und Skripte bei `file://`. Die eigenständige HTML-Datei benötigt keine Begleitdateien.
- **Bedienung nach Referenzbild:** Drei Spalten, vier Reihen. Zuerst die elf Eingaben in der unten angegebenen Reihenfolge ausführen. Eine falsche Eingabe setzt den Fortschritt zurück.
- **Gleichzeitiger letzter Schritt:** Danach die drei Tasten der obersten Reihe gleichzeitig halten: am PC mit **Q + W + E**, am Tablet mit drei Fingern. Vorzeitiges Halten und drei einzelne Tastendrücke entsperren nicht. Gedrückte Felder leuchten auf. Nach dem Entsperren erscheint das Folgebild, nach zehn Sekunden startet die Seite neu.
- **Quer-/Hochformat:** Unter „Auflösung einstellen“ wechselt der Format-Button die Breite und Höhe. Der dekorative Rahmen dreht sich; Tasten und Beschriftungen bleiben aufrecht. Automatisch folgt wieder dem Browserfenster.

## Tastenfolge aus dem Bild

`5D// → 633// → 7*K → 10*\ → 994& → 5D// → 83-X → 633// → 7*K → 10*\ → 994&`

Schritt 12: die obersten drei Felder gleichzeitig (PC: **Q + W + E**).

| Reihe | Links | Mitte | Rechts |
| --- | --- | --- | --- |
| 1 | Abschluss Q | Abschluss W | Abschluss E |
| 2 | 7*K | 5D// | 83-X |
| 3 | 2469 | 67 | 633// |
| 4 | 10*\ | R2D2 | 994& |

Die im Foto nicht mit einem Code beschrifteten übrigen Felder behalten die bestehenden Werte 2469, 67 und R2D2. Sie gehören nicht zur richtigen Folge. Die erste Reihe dient nur dem gleichzeitigen Abschluss.

## Dateien für Änderungen

`login.html`, `style.css` und `script.js` sind die bearbeitbaren Quellen. Nach Änderungen erzeugt `node build-standalone.cjs` die eigenständige `DavesAppDings.html` neu. Dafür ist nur Node.js nötig; zum normalen Start ist keine Installation erforderlich. Die ursprünglichen Bilddateien bleiben erhalten.

## Prüfung

In Microsoft Edge per direktem `file://`-Aufruf geprüft: 2560×1440, 1920×1080, 1280×720, 2360×1640, 390×844, 844×390 und 768×1024. Jeweils zwölf Tasten, Hintergrund, fehlender Seitenüberlauf sowie Klick- und Tastaturbedienung geprüft.

Die eigenständige HTML wurde zusätzlich in einem isolierten Ordner ohne Begleitdateien geprüft: freie Maße 1733×977, WQHD-Vorgabe, 1:1-Anzeige, Speichern/Neuladen, automatische Fensteranpassung und eingebettetes Folgebild.

Für die neue Eingabe geprüft: korrekte Folge, falsche und wiederholte Eingaben, Sperre gegen vorzeitige/einzelne/zwei/gehaltene Abschluss-Tasten, Q/W/E gemeinsam, Loslassen bei Fokusverlust und keine Spiel-Tastenkürzel beim Bearbeiten der Einstellungen. Ein echter Drei-Punkt-Touch im emulierten Browser entsperrt nach der Folge. Quer-/Hochformat und Symbolgrenzen wurden bei fünf Fenstergrößen geprüft. Echte Mobilgeräte und Safari wurden nicht getestet.
