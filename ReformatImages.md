# Reformat Images

Für PNG --> WebP eignet sich cwebp, das offizielle Kommandozeilenwerkzeug von Google. 
Es unterstützt auch JPEG und kann Bilder gleichzeitig skalieren.

## Installieren

```bash
brew install webp
```

### Anwenden

```bash
# Ein Foto umwandeln, Qualität 80:
cwebp -q 80 "wohnen.png" -o "wohnen.webp"
cwebp -q 80 "wohnen.jpg" -o "wohnen.webp"

# Gleichzeitig auf 1200 Pixel Breite skalieren, Höhe proportional:
cwebp -q 80 -resize 1200 0 "wohnen.png" -o "wohnen.webp"

# Alle PNG-Dateien im aktuellen Ordner umwandeln, Ergebnisse in einem Unterordner:
mkdir -p webp

for bild in ./*.png; do
  [ -f "$bild" ] || continue
  name="${bild##*/}"
  cwebp -q 80 "$bild" -o "webp/${name%.png}.webp"
done

for bild in ./*.jpg; do
  [ -f "$bild" ] || continue
  name="${bild##*/}"
  cwebp -q 80 "$bild" -o "webp/${name%.jpg}.webp"
done

# Für das Signet verlustfrei konvertieren:
cwebp -lossless "signet.png" -o "signet.webp"
```