# eXtrameile · Brand Guide & KI Test

Export der Onepage-Seite `/extrameile-ki-test` (Site „Marketing Fundamentals"):
11 Sektionen als React-Projekt, 1:1 aus Onepage übernommen, keine Design-Änderungen.

## Aufbau

```
index.html                 Einstieg (Vite)
export/index.html          fertige Einzeldatei (HTML + CSS + JS inline) – direkt nutzbar
src/App.tsx                setzt die 11 Sektionen in der Reihenfolge der Seite zusammen
src/sections/<name>/       je Sektion: index.tsx, styles.module.css, package.json (Standardtexte)
src/siteui/xm-*/           die 15 gemeinsamen Bausteine (Button, Titel, Text, FAQ, Formularfeld …)
src/defaults.json          wird aus den package.json der Sektionen erzeugt (npm run defaults)
src/lib/onepage-kit.ts     Ersatz für das Onepage-interne Formular-Paket (siehe unten)
```

Reihenfolge: Navigation, Hero, Entlastungsbedarf, Unterstützung, Einladungsweg,
Aus der Praxis, Über uns, Zusammenarbeit, Häufige Fragen, Kontakt, Footer.

## Starten

```bash
npm install
npm run dev            # lokale Vorschau
npm run build          # Ordner dist/
npm run build:single   # Einzeldatei in dist-single/index.html
```

## Texte ändern

Alle Texte, Farben und Links stehen je Sektion in `src/sections/<name>/package.json`
unter `onepage.control` → `default`. Danach `npm run defaults` (läuft bei `dev` und `build` automatisch).

## Was sich gegenüber Onepage unterscheidet

- **Kontaktformular:** In Onepage lief es über ein eingebautes CRM (`onepage-kit`). Hier sendet es per POST (JSON)
  an die Adresse aus `VITE_FORM_ENDPOINT` (z. B. ein GoHighLevel-Webhook). Ohne diese Variable zeigt das
  Formular beim Absenden die Fehlermeldung, es wird kein Erfolg vorgetäuscht.
  In der Einzeldatei `export/index.html` ist kein Endpoint eingebaut. Dafür vor `npm run build:single`
  `VITE_FORM_ENDPOINT=https://… ` setzen, oder das Formular in GoHighLevel neu anbinden.
- **Navigation:** In Onepage haftet sie per iframe-Trick oben. Hier übernimmt das ein `position: sticky`-Wrapper in `App.tsx`.
- **Bilder:** Hero-Bild und Bild in „Über uns" liegen noch auf dem Onepage-CDN (`onecdn.io`). Die Dateien
  konnten beim Export nicht heruntergeladen werden. Für Unabhängigkeit von Onepage die Bilder ins Projekt legen
  und die Adressen in `src/sections/hero/package.json` und `src/sections/ueber-uns/package.json` ersetzen.
- **Schriften:** Inter Tight und JetBrains Mono werden von Google Fonts geladen (wie in Onepage).
- **Textstand:** Die Texte stammen aus den Standardwerten der Sektionen. Stichproben gegen die Live-Seite
  (Hero, FAQ-Fragen, Kontakt, Footer) stimmen überein. Nachträgliche Änderungen im Onepage-Editor, die nur dort
  gespeichert sind, wären hier nicht enthalten.
