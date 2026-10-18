# Chalet-Rutsch

Statische Website für die Ferienwohnung **Chalet-Rutsch in Adelboden im Berner Oberland**. Sie stellt die Wohnung vor, informiert über Ausflugsangebote und Anreise und ermöglicht vorerst Buchungsanfragen per E-Mail.

## Seiten

| Datei | Inhalt |
| --- | --- |
| `index.html` | Startseite mit Beschreibung, Bildergalerie und Ausstattung |
| `explore.html` | Berggebiete, Freizeitangebote und weiterführende Links |
| `buchen.html` | Demokalender zur Auswahl eines Wunschzeitraums und E-Mail-Anfrage |
| `directions.html` | Lage, Google Maps und Hinweise zu Parkplatz und Treppenzugang |
| `datenschutz.html` | Datenschutzerklärung mit aufklappbaren Abschnitten |
| `impressum.html` | Kontakt, Haftungsausschlüsse und Urheberrechte |
| `agb.html` | Mietbedingungen, Hausregeln und Stornobedingungen |

## Technik und Nutzung

Die Seiten verwenden HTML, CSS und JavaScript ohne Framework und ohne Build-Schritt. Styles und Skripte sind direkt in den HTML-Dateien enthalten. Das Layout passt sich an unterschiedliche Bildschirmgrössen an.

Alle HTML-Dateien im gleichen Ordner ablegen und `index.html` im Browser öffnen. Die Wohnungsfotos gehören in den Unterordner `img/`; Dateinamen und Pfade müssen mit den Angaben im HTML übereinstimmen. Das Signet ist in die Seiten eingebettet.

Die Bildergalerie wechselt automatisch alle drei Sekunden und lässt sich mit Pfeilen oder einer Pause-Taste bedienen. Der Kalender auf der Buchungsseite dient nur zur Auswahl eines Wunschzeitraums: Er zeigt keine tatsächliche Verfügbarkeit und nimmt keine verbindlichen Buchungen entgegen.

## Externe Dienste

- **Google Maps:** eingebettete Karte auf der Anreiseseite.
- **Thum.io:** Website-Vorschaubilder auf der Entdecken-Seite.
- **E-Mail:** Anfrage- und Kontaktlinks öffnen das E-Mail-Programm des Besuchers.

Karte und Website-Vorschaubilder benötigen eine Internetverbindung.

## Weiterentwicklung

Später sollen externe Buchungswidgets, beispielsweise von Smoobu, integriert und die Website auf einem Hosting-Angebot veröffentlicht werden. Hostpoint ist als möglicher Anbieter vorgesehen.

Vor der Veröffentlichung die echten Kontaktangaben, Bilder, rechtlichen Texte und Dienstkonfigurationen prüfen und offene Platzhalter ergänzen. Die Datenschutzerklärung enthält auch Angaben zu geplanten Diensten. Die Navigation aller Seiten auf die endgültigen Dateinamen abstimmen, insbesondere `directions.html` statt des früheren Links `anreise.html`.
