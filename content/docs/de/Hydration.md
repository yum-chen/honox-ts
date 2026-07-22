---
title: Hydrierung
---

Dieses Projekt verwendet die **Islands-Hydrierung** von [HonoX](https://github.com/honojs/honox) und [**@hono/vite-ssg**](https://github.com/honojs/vite-plugins/tree/main/packages/ssg) für **SSG** (Statische Seitengenerierung). Standardmäßig wird **statisches HTML** ausgegeben, und nur Komponenten, die eine echte clientseitige Interaktivität benötigen, werden zu "Islands" (Client-JS-Snippets) aufgewertet.

> Das Hydrierungsverhalten jeder Komponente wird durch das Prädikat `shouldHydrate` in `app/components/ui/island-utils.ts` gesteuert. Jede Entscheidung darüber, *wann statisches HTML gerendert werden soll* versus *wann ein clientseitiges Island geladen werden soll*, wird hier aufgelöst. Siehe [Hydrierung](/docs/Hydration) für das vollständige Stufenmodell, Entscheidungsregeln und die Klassifizierung pro Komponente.

1. **Kein überflüssiges JS** — Komponenten ohne Interaktion müssen niemals ein Hydrierungsskript laden.
2. **Keine unbemerkten Fehler** — Komponenten, die Interaktivität *benötigen*, werden automatisch hydriert, selbst wenn der Aufrufer vergisst, das Prop `interactive` zu übergeben.
3. **Single Source of Truth** — Jede Entscheidung bezüglich der Hydrierung läuft über die gemeinsame Funktion `shouldHydrate`, was ad-hoc `if (interactive)`-Bedingungen in einzelnen Komponenten überflüssig macht.

## Das Kern-Prädikat

`app/components/ui/island-utils.ts`:

```ts
/**
 * Entscheidet, ob eine Komponente als clientseitiges Island hydriert werden soll.
 *
 * @param interactive - das `interactive`-Prop der Komponente (boolean | undefined)
 * @param hasSignal   - ob die Komponente ein interaktives Signal trägt: einen Event-Handler
 *                      (onClick / onValueChange …) oder einen kontrollierten/Standard-Zustand
 *                      (value / checked / open …), der nur mit JS Sinn macht.
 *
 * Semantik:
 *  - interactive === false → niemals hydrieren (expliziter Opt-Out)
 *  - interactive === true  → immer hydrieren (expliziter Opt-In)
 *  - interactive nicht angegeben → hydrieren, wenn hasSignal true ist
 */
export function shouldHydrate(interactive: unknown, hasSignal: boolean): boolean {
	return interactive !== false && Boolean(interactive || hasSignal);
}
```

### Wahrheitstabelle

| `interactive` | `hasSignal` | Ergebnis | Bedeutung |
| --- | --- | --- | --- |
| `false` | beliebig | `false` | Explizit von der Hydrierung ausgeschlossen (rein statisch) |
| `true` | beliebig | `true` | Explizit zur Hydrierung gezwungen |
| `undefined` | `true` | `true` | Smart-Detect: Signal vorhanden → hydrieren |
| `undefined` | `false` | `false` | Smart-Detect: kein Signal → statisch |

***

## Das 3-Stufen-Modell

### Stufe 1 — Auto-interaktiv

> **Kernregel: `shouldHydrate(interactive, true)`**

Diese Komponenten *sind* die Interaktion selbst — ihr gesamter Nutzen hängt von clientseitigem JS ab (Overlays, Modale, Drag-Griffe, Ein-/Ausklappen). Sie werden immer hydriert, es sei denn, der Aufrufer übergibt explizit `interactive={false}`.

Gilt für:

- Overlay- / Popover-Familien (Tooltip, Hover-Card, Popover, Menu)
- Modale / Drawers / Drag-Layouts (Dialog, Drawer, Splitter)
- Ein-/Ausklappbare Bereiche (Collapsible)
- Reine Client-Singletons (Toast)

### Stufe 2 — Smart Auto-Detect

> **Kernregel: `shouldHydrate(interactive, hasSignal)`**

Diese Komponenten sind *standardmäßig statisch und werden nur interaktiv, wenn ein Signal vorhanden ist*. Es handelt sich um **kontrollierte/unkontrollierte Formularelemente oder auswählbare Gruppen**. Eine Hydrierung ist nur wichtig, wenn ein Zustand (`value` / `checked` / `defaultValue`) oder ein Handler (`onChange` / `onClick` …) übergeben wird; andernfalls reicht das statische Markup aus.

Gilt für:

- Formularelemente (Button, Checkbox, Switch, Textarea, Field, Slider, Combobox, Radio-Group)
- Auswählbare Gruppen (Segment-Group, Toggle-Group)
- Tabellen mit Zeilenklicks (Table)
- Avatar mit einem `src`-Attribut (der asynchrone Bildlade-/Fehler-Lebenszyklus ist ein rein clientseitiges Signal)
- Pagination / Tags-Field / Pin-Field (Zustand + Handler; eine Pagination vom Typ `"link"`, die `getPageUrl` bereitstellt, ist reine Navigation und bleibt statisch)

### Stufe 3 — Präsentativ

> **Wird niemals als Island geladen**

Reine typografische oder dekorative Komponenten ohne clientseitiges Verhalten. Sie **dürfen kein `interactive`-Prop** deklarieren.

Gilt für:

- Typografie (Text, Heading, Badge)
- Layout (Group, Absolute-Center, Fieldset)
- Statusanzeigen (Alert, Breadcrumb, Loader, Skeleton, Spinner, Progress)
- Grafiken (Icon)

***

## Vollständige Komponenten-Klassifizierung

> Status-Legende: `✅` entspricht den Konventionen; `⚠️` weicht von den Konventionen ab und muss migriert werden. Nach dem neuesten Bereinigungsdurchlauf sind **alle Komponenten `✅`**.

### Stufe 1 (auto-interaktiv)

| Komponente | Regel | Trigger | Status |
| --- | --- | --- | --- |
| `dialog` | `shouldHydrate(interactive, true)` | Hydriert immer, außer bei `interactive={false}` | ✅ `dialog.tsx` |
| `drawer` | `shouldHydrate(interactive, true)` | Hydriert immer, außer bei `interactive={false}` | ✅ `drawer.tsx` |
| `splitter` | `shouldHydrate(interactive, true)` | Hydriert immer, außer bei `interactive={false}` | ✅ `splitter.tsx` |
| `tooltip` | `shouldHydrate(interactive, true)` | Hydriert immer | ✅ `tooltip.tsx` |
| `hover-card` | `shouldHydrate(interactive, true)` | Hydriert immer | ✅ `hover-card.tsx` |
| `popover` | `shouldHydrate(interactive, true)` | Hydriert immer | ✅ `popover.tsx` |
| `menu` | `shouldHydrate(interactive, true)` | Hydriert immer | ✅ `menu.tsx` |
| `select` | `shouldHydrate(interactive, true)` | Hydriert immer — das Öffnen des Dropdowns und die Auswahl eines Eintrags erfordern JS; es gibt kein statisches Fallback (das native `<select>` ist visuell ausgeblendet und dient nur der Formularübermittlung) | ✅ `select.tsx` (Stufe 1) |
| `collapsible` | `shouldHydrate(interactive, true)` | Hydriert immer (Ein-/Ausklappen erfordert JS) | ✅ `collapsible.tsx` (Stufe 1) |
| `toast` | Immer ein Island (Client-Singleton) | Kein Prop, immer ein Island | ✅ `toast.tsx` |

### Stufe 2 (Smart Auto-Detect)

| Komponente | Verhaltenssignal (`hasSignal` ist true, wenn…) | Status |
| --- | --- | --- |
| `button` | `onClick` / `onPointerDown` / `onSubmit` | ✅ `button.tsx` |
| `card` | `onClick` / `onPointerDown` | ✅ `card.tsx` |
| `table` | beliebiges `row.onClick` | ✅ `table.tsx` |
| `segment-group` | `value` / `defaultValue` / `onValueChange` | ✅ `segment-group.tsx` |
| `toggle-group` | `value` / `defaultValue` / `onValueChange` | ✅ `toggle-group.tsx` |
| `slider` | `value` / `defaultValue` / `onChange` / `onDraggingChange` | ✅ `slider.tsx` |
| `checkbox` | `checked` / `defaultChecked` / `onCheckedChange` | ✅ `checkbox.tsx` |
| `switch` | `checked` / `defaultChecked` / `onCheckedChange` | ✅ `switch.tsx` |
| `textarea` | `value` / `defaultValue` / `onValueChange` / `validator` / `minLength` | ✅ `textarea.tsx` |
| `field` | `value` / `defaultValue` / `onValueChange` / `validator` / `minLength` | ✅ `field.tsx` |
| `combobox` | `open` / `inputValue` / `onToggle` / `onInputChange` / `onItemSelect` | ✅ `combobox.tsx` |
| `radio-group` | `value` / `defaultValue` / `onValueChange` | ✅ `radio-group.tsx` |
| `avatar` | `src` (asynchroner Lebenszyklus zum Laden von Bildern/Fehlern) | ✅ `avatar.tsx` (Stufe 2) |
| `pagination` | `onPageChange` oder Nicht-Link-Eigenschaften `page` / `defaultPage` / `pageSize` / `defaultPageSize` | ✅ `pagination.tsx` |
| `tags-field` | `onValueChange` / `onInputValueChange` / `value` / `inputValue` / `defaultValue` / `defaultInputValue` | ✅ `tags-field.tsx` |
| `pin-field` | `value` / `defaultValue` / `onValueChange` / `onValueComplete` / `onValueInvalid` / `validator` / `autoSubmit` / `onAutoSubmit` | ✅ `pin-field.tsx` |
| `paginated-table` | Immer Island (verwaltet den internen Paginationszustand) | ✅ `paginated-table.tsx` (Stufe 2 Logik) |
| `date-picker` | `value` / `defaultValue` / `focusedValue` / `open` / `defaultOpen` / `onValueChange` / `onOpenChange` / (Tastatur-/Klick-/Eingabeereignisse) | ✅ `date-picker.tsx` |
| `color-picker` | `value` / `defaultValue` / `format` / `defaultFormat` / `open` / `defaultOpen` / `onValueChange` / `onFormatChange` / `onOpenChange` / (Pointer-/Tastatur-/Eingabeereignisse) | ✅ `color-picker.tsx` |

### Stufe 3 (Präsentativ)

| Komponente | Hinweise | Status |
| --- | --- | --- |
| `text` | Typografischer Text | ✅ |
| `heading` | Überschrift | ✅ |
| `badge` | Abzeichen / Badge | ✅ (überflüssiges `interactive`-Prop entfernt) |
| `fieldset` | Formular-Fieldset | ✅ (überflüssiges `interactive`-Prop entfernt) |
| `alert` | Benachrichtigungsfeld | ✅ |
| `breadcrumb` | Brotkrümel-Navigation | ✅ |
| `group` | Layout-Gruppierung | ✅ |
| `absolute-center` | Zentrierendes Layout | ✅ |
| `loader` | Ladeindikator | ✅ |
| `skeleton` | Platzhalter-Skelett | ✅ |
| `spinner` | Lade-Spinner | ✅ |
| `progress` | Fortschrittsbalken (wertgesteuert, standardmäßig statisch) | ✅ |
| `icon` | SVG-Icon-Wrapper (nur Größe/Farbe, kein Client-Zustand) | ✅ `icon.tsx` |

***

## Auslösebedingungen pro Stufe

### Stufe 1 Bedingungen

- Die Kerninteraktion der Komponente (Öffnen eines Overlays, Ziehen eines Splitters, Ein-/Ausklappen, Modal-Fokus-Falle) **kann nicht in reinem HTML ausgedrückt werden**, daher ist `hasSignal` standardmäßig `true`.
- Der einzige gültige Opt-Out ist `interactive={false}` (z. B. das erzwungene Deaktivieren eines Overlays in einem rein statischen Dokument).
- `toast` ist ein Sonderfall: Es handelt sich um ein globales Client-Singleton (`toaster.create(...)`) und bietet kein `interactive`-Prop an.

### Stufe 2 Bedingungen

Das `hasSignal` jeder Komponente ist ein boolesches ODER über "Ist diese Eigenschaft definiert?":

```typescript
// Typisches Muster (am Beispiel von segment-group)
const hasSignal =
	rest.value !== undefined ||
	rest.defaultValue !== undefined ||
	rest.onValueChange !== undefined;
if (shouldHydrate(interactive, hasSignal)) return <SegmentGroupIsland {...rest} />;
return <Root {...rest}>{/* statische Struktur */}</Root>;
```

Entscheidungsprinzipien:

1. **Kontrollierter Zustand** (`value` / `checked` / `open` / `inputValue`) → benötigt JS, um synchron zu bleiben.
2. **Unkontrollierter Anfangswert** (`defaultValue` / `defaultChecked`) → benötigt JS, um den internen Zustand zu halten.
3. **Event-Handler** (`onChange` / `onClick` / `onValueChange` / `onItemSelect` …) → benötigt JS zur Reaktion.
4. **Validierung / Einschränkungen** (`validator` / `minLength`) → benötigt JS zur Ausführung.
5. **Asynchrone / rein clientseitige Signale** — `src` bei `avatar` (impliziert einen Lade-/Fehler-Lebenszyklus) oder jede Eigenschaft, deren einziger Zweck ein clientseitiger Effekt ist (Medien, Intersection, Lazy Loading). Diese können nicht ohne JS aufgelöst werden und zählen daher als Signal.
6. Wenn eine der oben genannten Bedingungen erfüllt ist, ist `hasSignal` true, was die Hydrierung auslöst. Wenn alle fehlen, wird die Komponente als rein statisches Markup gerendert.

> **`avatar` ist unter den Stufe-2-Komponenten besonders:** Sein Signal ist das asynchrone Ladesignal `src`. Wenn `src` vorhanden ist, benötigt das Bild ein clientseitiges Lade-/Fehler-Handling, sodass `shouldHydrate(interactive, Boolean(src))` es hydriert; ein `avatar` ohne `src` (z. B. ein Namenskürzel-Fallback) bleibt statisch. Ein explizites `interactive={false}` unterdrückt die Hydrierung, selbst wenn `src` existiert (konsistent mit der bibliotheksweiten „False-Wins“-Semantik).

> **`pagination` Link-Modus-Ausnahme:** Eine Pagination mit `type="link"`, die `getPageUrl` bereitstellt, ist reine Navigation (jede Seite ist ein Link), sodass sie statisch bleibt, es sei denn, ein expliziter `onPageChange`-Handler wird bereitgestellt. Nur im Button-Modus (oder mit `onPageChange`) zählen die Eigenschaften `page` / `defaultPage` / `pageSize` / `defaultPageSize` als Signale.

### Stufe 3 Bedingungen

- Die Komponente besitzt keinen Client-Zustand und reagiert auf keine Ereignisse.
- Sie deklariert kein `interactive`-Prop. (Historisch gesehen haben `badge` / `heading` / `text` / `fieldset` dies fälschlicherweise deklariert und `interactive="true"` an das DOM weitergegeben; dies wurde im Zuge der Bereinigung entfernt.)

***

## Entscheidungs-Checkliste für neue Komponenten

Gehen Sie die Liste der Reihe nach durch; stoppen Sie beim ersten Treffer:

1. **Hängt die Existenz der Komponente vollständig von clientseitigem JS ab?**
   Overlay / Modal / Drag / Expand-Collapse → **Stufe 1**, verwenden Sie `shouldHydrate(interactive, true)`.
2. **Handelt es sich um ein Formularelement oder eine visuell auswählbare Komponente, die kontrolliert oder unkontrolliert sein kann?**
   Button / Checkbox / Switch / Slider / Combobox / Row-Click-Table … → **Stufe 2**, definieren Sie `hasSignal` (Zustand + Handler) und rufen Sie anschließend `shouldHydrate(interactive, hasSignal)` auf.
3. **Ist sie rein typografisch / Layout / dekorativ?**
   Text / Heading / Alert / Group / Progress … → **Stufe 3**, kein `interactive`-Prop, kein Island.

**Harte Implementierungsanforderungen:**

- Keine Komponente darf eine einfache `if (interactive) { … }`-Abzweigung schreiben; gehen Sie immer über `shouldHydrate`.
- `interactive` ist nur ein „Regler“: `true` erzwingt, `false` verbietet, `undefined` überlässt die Entscheidung `hasSignal`.
- Jede Stufe-1- / Stufe-2-Komponente sollte einen Abschnitt `# Hydrierung` in ihrer `content/components/<Component>.mdx` hinzufügen und auf diese Datei verweisen sowie das Frontmatter-Feld `hydration` (`1` / `2` / `3`) entsprechend anpassen.

***
