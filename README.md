# Daves App Dings

## Starten

**DavesAppDings.html** herunterladen und in einem aktuellen Browser öffnen. Die Datei enthält Bilder, CSS und JavaScript vollständig und funktioniert offline ohne Webserver. Bei einem ZIP-Download zuerst entpacken.

Alternativ `login.html` öffnen. Dabei müssen `style.css`, `script.js`, `Dome.png` und `Oregano.png` im selben Ordner bleiben.

## Was wurde ergänzt?

- **Anpassbares Layout:** Hintergrund, zwölf Tasten und Beschriftungen skalieren gemeinsam für Desktop, Handy und Tablet. Das Motiv bleibt vollständig sichtbar und behält seine Proportionen; je nach Fensterformat entstehen schwarze Freiflächen.
- **Auflösung einstellen:** Oben rechts lassen sich Voreinstellungen oder freie Breite und Höhe von jeweils 1 bis 16384 Pixeln wählen. „Übernehmen“ stellt die Zeichenfläche ein. Die Bildschirmauflösung des Betriebssystems wird dadurch nicht verändert.
- **Automatisch / Originalgröße:** Automatisch passt die Fläche ins Fenster. Originalgröße zeigt sie 1:1 und erlaubt bei Bedarf Scrollen. Die Auswahl wird im Browser gespeichert, sofern lokaler Speicher verfügbar ist.
- **Direktes Öffnen:** Relative Dateipfade beheben fehlende Bilder und Skripte bei `file://`. Die eigenständige HTML-Datei benötigt keine Begleitdateien.
- **Bedienung:** Schaltflächen unterstützen Maus, Touch und Tastatur. Klick-Ereignisse werden explizit übergeben; drei unterschiedliche Spezialtasten lassen sich gleichzeitig per Touch aktivieren. Der anschließende Bildwechsel und der Neustart nach zehn Sekunden wurden korrigiert.
- **Tastenzuordnung:** Die zuvor unzugeordnete erste Taste erhält den bisher ungenutzten zwölften Code `UwU`. Die übrigen Codes bleiben an ihren bisherigen Positionen; die bestehende Codefolge bleibt erhalten.

## Dateien für Änderungen

`login.html`, `style.css` und `script.js` sind die bearbeitbaren Quellen. Nach Änderungen erzeugt `node build-standalone.cjs` die eigenständige `DavesAppDings.html` neu. Dafür ist nur Node.js nötig; zum normalen Start ist keine Installation erforderlich. Die ursprünglichen Bilddateien bleiben erhalten.

## Prüfung

In Microsoft Edge per direktem `file://`-Aufruf geprüft: 2560×1440, 1920×1080, 1280×720, 2360×1640, 390×844, 844×390 und 768×1024. Jeweils zwölf Tasten, Hintergrund, fehlender Seitenüberlauf sowie Klick- und Tastaturbedienung geprüft.

Die eigenständige HTML wurde zusätzlich in einem isolierten Ordner ohne Begleitdateien geprüft: freie Maße 1733×977, WQHD-Vorgabe, 1:1-Anzeige, Speichern/Neuladen, automatische Fensteranpassung und eingebettetes Folgebild. Der Handler für drei gleichzeitige Pointer wurde mit simulierten Ereignissen geprüft. Echte Mobilgeräte und Safari wurden nicht getestet.
