---
title: CMS Seiten-Builder
---

## Einführung

Der auf [Sveltia CMS](https://sveltiacms.app/en/docs/intro) basierende dynamische Seiten-Builder ermöglicht es nicht-technischen Redakteuren, komplexe, rekursiv verschachtelte Seiten vollständig über die CMS-Benutzeroberfläche (`/admin/`) zu erstellen.

Seitenlayouts werden als JSON-Dateien in `content/pages/*.json` gespeichert und bei Bedarf kompiliert oder statisch im Voraus generiert (via Hono SSG) unter `/pages/[slug]`.

***

## Unterstützte Komponenten

Der Seiten-Builder unterstützt eine reichhaltige Palette von über 40 Layout-, Typografie-, dekorativen und interaktiven Komponenten.

### 1. Struktur & Layout

* **Stack**: Gruppiert untergeordnete Elemente vertikal oder horizontal mit anpassbarer Ausrichtung, Verteilung und Abstand.
* **Grid**: Responsives CSS-Grid-Layout — feste Spalten-/Zeilenanzahl oder automatische Anpassung basierend auf der minimalen Breite der untergeordneten Elemente.
* **Group**: Richtet Elemente wie Buttons eng beieinander aus (unterstützt die Eigenschaften `attached` und `grow`).
* **Fieldset**: Organisiert zusammengehörige Formularkomponenten unter einem gestalteten Container mit `legend`, `helperText` und `errorText`.
* **AbsoluteCenter**: Zentriert einen einzelnen verschachtelten Block innerhalb seines übergeordneten Elements entlang einer oder beider Achsen.
* **Splitter**: In der Größe veränderbare Panels, die durch Ziehgriffe getrennt sind. Renders im Seiten-Builder immer statisch (Panel-Inhalte können die Island-Hydrierungsgrenze nicht überschreiten).
* **Breadcrumb**: Navigationspfad aus verlinkten Elementen mit einem anpassbaren Trennzeichen.

### 2. Typografie & Inhalt

* **Heading**: Gestaltete Überschriften der Ebenen `h1` bis `h6` und verschiedene responsive Textgrößen.
* **Text**: Absatztext mit anpassbaren Größen.

### 3. Darstellung & Präsentation

* **Alert**: Rendert Warnungs-/Erfolgs-/Fehler-/Info-Meldungen mit Standard-Status und Symbolen.
* **Badge**: Farbige Metadaten-Labels mit benutzerdefinierten Farbpaletten und Stilen.
* **Card**: Ein reichhaltiger Container, der verschachtelte Blöcke, Header, Footer und obere/untere/linke/rechte Bildpositionen unterstützt.
* **Progress**: Rendert lineare oder kreisförmige Fortschrittsanzeigen.
* **Skeleton**: Hochgradig anpassbare Platzhalter-Skelette (unterstützt Kreis- und mehrzeilige Textformen).
* **Loader** / **Spinner**: Ladeanzeigen, optional mit begleitendem Text.
* **Table**: Statische tabellarische Daten mit konfigurierbaren Spalten und einem JSON-kodierten Zeilen-Array.
* **Icon**: Unformatiertes Inline-SVG-Markup mit Größen- und Farbsteuerungen.

### 4. Interaktiv & Overlays

* **Button**: Primäre klickbare Ziele, die benutzerdefinierte Paletten, Größen und Designvarianten unterstützen.
* **Checkbox**: Kontrollkästchen für boolesche Eingaben mit barrierefreien Aria-Bindungen.
* **Combobox**: Dropdowns mit Löschaktionen und Elementlisten.
* **Collapsible**: Offenlegungscontainer, die verschachtelte Komponentenbäume ein- oder ausblenden.
* **Popover**: Schwebende beschreibende Inhalte, die an Standard-Texttriggern verankert sind.
* **Tooltip**: Kontextbezogener Hinweistext, der beim Hovern/Fokussieren an einer Trigger-Schaltfläche verankert ist.
* **HoverCard**: Reichhaltigerer, durch Hovern ausgelöster Inhalt als ein Tooltip, mit optionalem Titel/Beschreibung.
* **Dialog**: Vollständig fokussierte Modalfenster mit benutzerdefinierten Bestätigungs-/Abbrechen-Schaltflächen und benutzerdefinierter Liste untergeordneter Elemente.
* **Drawer**: Responsive Seitenleisten, die vom Bildschirmrand heringeschoben werden, mit benutzerdefinierter Liste untergeordneter Elemente.
* **Dropdown** (Blocktyp `menu`): Aktionsmenüs mit benutzerdefinierten auswählbaren Optionen und Trennelementen.

### 5. Fortgeschritten & Daten

* **Select**: Benutzerdefiniertes Einzel-/Mehrfachauswahl-Dropdown, übermittlungsfähig in Formularen.
* **DatePicker**: Einzel-/Mehrfach-/Bereichsdatumsauswahl mit einem Popup-Kalender.
* **TagsField**: Freiformliste von Text-Tags.
* **RadioGroup** / **RadioCardGroup**: Benutzerdefinierte Radiolisten mit barrierefreier Einzelauswahllogik.
* **SegmentGroup**: Schieberegler für tabellarische Auswahl.
* **Slider**: Bereichs-Schieberegler-Komponenten.
* **Switch**: Kippschalter.
* **Editable**: Inline-Text, der per Klick bearbeitet werden kann.
* **ColorPicker**: Sättigungs-/Farbton-/Alpha-Farbauswahl mit Hex-/RGBA-/HSLA-Eingabe.
* **FileUpload**: Drag-and-Drop oder Klick zur Dateiauswahl.
* **Carousel**: Automatisch oder manuell abspielende Bild-Diashow.
* **PaginatedTable**: Interaktive dynamische Tabellenkomponenten mit Unterstützung für Seitennummerierung.
* **Pagination**: Interaktive Seitennummerierungs-Steuerelemente.

***

## Architektur

### 1. CMS-Schema-Definitionen (`public/admin/config.yml`)

Wir nutzen fortschrittliche **YAML-Anchor und -Aliases** (`&` und `*`), um die Herausforderung der unendlichen Rekursion in YAML-Spezifikationen zu lösen.

* **Basis-Anchor** (`button_fields`, `checkbox_fields` etc.) werden einmal deklariert.
* **Stufe 1 Komponenten** definieren flache Elemente und einen `Stack`/`Collapsible`-Container, der **Stufe 2 Komponenten** (`*l2_components`) unterstützt.
* **Stufe 2 Komponenten** ermöglichen rekursiv eine weitere Ebene verschachtelter Container (`*l3_components`).
* Dies ermöglicht es Redakteuren, Layouts mit einer Tiefe von bis zu **4 Ebenen** zu verschachteln, ohne die Grenzen von YAML-Parsern oder des CMS zu überschreiten.

### 2. Layout-Renderer (`app/components/page-renderer.tsx`)

Die Layout-Engine importiert alle öffentlichen Komponentenmodule aus `app/components/ui/` und ordnet sie in einem hochperformanten, vollständig typsicheren JSX-Compiler zu.

* Eingabetypen werden streng in standardmäßige `unknown` Record-Dictionaries konvertiert, um Typkonvertierungen zu verhindern und Biome-Lint-Prüfungen vollständig sauber zu halten.
* Verschachtelte Container werden rekursiv durch verschachtelte Aufrufe der Komponente `<PageRenderer content={...} />` behandelt.

***

## Content-Build-Pipelines

Page Builder-Layouts sind einer von drei Inhaltstypen unter `content/`, die jeweils mit Vites `import.meta.glob` ermittelt und durch ihre eigene Route gerendert werden. Alle drei werden auf dieselbe Weise statisch generiert: Die Middleware `ssgParams` einer Route zählt zum Build-Zeitpunkt jede Datei in ihrer Collection auf, und `bun run build` (via `@hono/vite-ssg`) durchsucht diese Parameter, um eine statische HTML-Datei pro Slug in `dist/` zu generieren.

### 1. JSON-Seitenlayouts (`content/pages/*.json`)

* Geladen mit `import.meta.glob("/content/pages/*.json", { import: "default" })` in `app/routes/pages/[slug].tsx`.
* Jede Datei wird als reines JSON analysiert — ohne Markdown — und ihr `content`-Array wird direkt an `<PageRenderer />` übergeben (siehe Architektur oben), der es rekursiv in die passenden UI-Komponenten kompiliert.
* Dies ist die einzige Pipeline der drei ohne separaten Analyse-/Kompilierschritt: Das JSON *ist* der Render-Baum.

### 2. Unformatiertes Markdown (`content/posts/*.md`, `content/docs/*.md`)

* Geladen mit `import.meta.glob(..., { query: "?raw", import: "default" })`, was die rohe Markdown-Quelle als String anstelle eines kompilierten Moduls zurückgibt.
* Wird zum Abfrage-/Build-Zeitpunkt durch `app/utils/markdown.ts` analysiert, eine `remark`/`rehype`-Pipeline (`remark-parse` → `remark-gfm` → `remark-rehype` → `rehype-stringify`): `parseFrontmatter()` trennt den YAML-Frontmatter-Block vom Textkörper, und `markdownToHtml()` wandelt den Textkörper in einen HTML-String um.
* Der resultierende String wird über `dangerouslySetInnerHTML` eingefügt (siehe `app/lib/posts.ts` and `app/lib/docs.ts`) — es ist kein JSX beteiligt, sodass diese Pipeline keine Live-Komponenten einbetten kann.
* Blog-Posts jagen ihren Textkörper auch durch `stripMarkdown()`, um einen Klartext-Suchindex für `/api/*/search.json` aufzubauen.

### 3. MDX-Dokumente (`content/docs/*.mdx`)

* Im Voraus kompiliert durch das Vite-Plugin `@mdx-js/rollup` (konfiguriert in `vite.config.ts`, beschränkt auf `.mdx`, sodass es niemals die rohen `.md`-Importe oben abfängt), unter Verwendung von `remark-frontmatter` + `remark-mdx-frontmatter` + `remark-gfm`.
* Jede `.mdx`-Datei wird zu einer echten, importierbaren Komponente (plus einem separaten `frontmatter`-Export), geladen in `app/lib/docs.ts` über ein einfaches (nicht-`?raw`) `import.meta.glob`.
* Da die Ausgabe eine Komponente und kein HTML-String ist, können `.mdx`-Dokumente tatsächlich gerenderte, interaktive Beispiele (z. B. eine Live-`<Button>`-Demo) direkt in den Text einbetten — der Kompromiss dafür ist der Compile-Schritt beim Build, den unformatiertes `.md` nicht benötigt.

`app/lib/docs.ts` lädt sowohl `.md` als auch `.mdx`-Collections nebeneinander und führt sie in einer Seitenleiste zusammen, sodass die von einem bestimmten Dokument verwendete Pipeline ein für den Leser unsichtbares Implementierungsdetail ist — wählen Sie `.md` für einfachen Text und `.mdx` nur, wenn eine Seite eine darin eingebettete Live-Komponente benötigt.

***

## Beispiel für eine JSON-Struktur

Hier ist eine Beispiel-Layoutdatei, die eine komplexe Dashboard-Seite darstellt (`content/pages/dashboard.json`):

```json
{
  "title": "Interaktives Dashboard",
  "content": [
    {
      "type": "heading",
      "text": "Dashboard-Analysen",
      "as": "h1",
      "size": "3xl"
    },
    {
      "type": "stack",
      "direction": "vertical",
      "gap": "6",
      "children": [
        {
          "type": "card",
          "title": "Willkommen!",
          "description": "Hier ist Ihr Systemstatus.",
          "variant": "outline",
          "children": [
            {
              "type": "alert",
              "status": "success",
              "title": "Alle Systeme betriebsbereit",
              "variant": "surface"
            }
          ]
        },
        {
          "type": "fieldset",
          "legend": "Benutzereinstellungen",
          "children": [
            {
              "type": "switch",
              "defaultChecked": true,
              "text": "Push-Benachrichtigungen aktivieren"
            },
            {
              "type": "checkbox",
              "text": "Newsletter abonnieren"
            }
          ]
        }
      ]
    }
  ]
}
```
