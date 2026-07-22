---
title: Hydratation
---

Ce projet utilise l'architecture d'**Hydratation d'Îles** de [HonoX](https://github.com/honojs/honox) et [**@hono/vite-ssg**](https://github.com/honojs/vite-plugins/tree/main/packages/ssg) pour la Génération de Sites Statiques (SSG) de pages, émettant du **HTML statique** par défaut, et seuls les composants qui nécessitent réellement une interactivité côté client sont "promus" en îles (snippets JS client).

> Le comportement d'hydratation de chaque composant passe par le prédicat `shouldHydrate`
> dans `app/components/ui/island-utils.ts`. Toute décision concernant _le moment d'afficher du HTML statique_
> par rapport au _moment de monter une île côté client_ est résolue ici — voir
> [Hydratation](/docs/Hydration) pour le modèle de niveaux complet, les règles de décision et la
> classification par composant.

1. **Zéro JS redondant** — les composants sans interaction n'ont jamais besoin d'un script d'hydratation.
2. **Zéro rupture silencieuse** — les composants qui ont _besoin_ d'interaction doivent s'hydrater automatiquement, même si l'appelant oublie de passer `interactive`.
3. **Source unique de vérité** — chaque décision "est-ce que cela doit s'hydrater ?" passe par une seule fonction partagée `shouldHydrate`, éliminant les branches ad-hoc `if (interactive)` par composant.

## Le Prédicat de Base

`app/components/ui/island-utils.ts`:

```ts
/**
 * Decide whether a component should hydrate as a client-side island.
 *
 * @param interactive - the component's `interactive` prop (boolean | undefined)
 * @param hasSignal   - whether the component carries a "behaviour signal": an event
 *                      handler (onClick / onValueChange …) or a controlled/default
 *                      state (value / checked / open …) that only makes sense with JS.
 *
 * Semantics:
 *  - interactive === false → never hydrate (explicit opt-out)
 *  - interactive === true  → always hydrate (explicit opt-in)
 *  - interactive omitted    → hydrate iff hasSignal is true
 */
export function shouldHydrate(interactive: unknown, hasSignal: boolean): boolean {
	return interactive !== false && Boolean(interactive || hasSignal);
}
```

### Table de vérité

| `interactive` | `hasSignal` | Résultat | Signification |
| --- | --- | --- | --- |
| `false` | n'importe lequel | `false` | Interdit explicitement d'hydrater (purement statique) |
| `true` | n'importe lequel | `true` | Forcé explicitement à hydrater |
| `undefined` | `true` | `true` | Détection intelligente : signal présent → hydrater |
| `undefined` | `false` | `false` | Détection intelligente : pas de signal → statique |

***

## Le modèle à 3 niveaux

### Niveau 1 — Auto-interactif

> **Règle de base : `shouldHydrate(interactive, true)`**

Ces composants _sont_ l'interaction — toute leur valeur dépend du JS du client
(superpositions, modales, poignées de glissement, étendre/réduire). Ils s'hydratent
à moins que l'appelant ne passe explicitement `interactive={false}`.

S'applique à :

- Familles de superposition / popover (tooltip, hover-card, popover, menu)
- Modales / tiroirs / glissement (dialog, drawer, splitter)
- Étendre / réduire (collapsible)
- Singletons purement client (toast)

### Niveau 2 — Détection automatique intelligente

> **Règle de base : `shouldHydrate(interactive, hasSignal)`**

Ces composants sont _statiques par défaut, interactifs uniquement lorsqu'un signal est présent_.
Ce sont des **contrôles de formulaire contrôlés/non contrôlés ou des groupes sélectionnables** : l'hydratation
n'a d'importance que lorsqu'un état (`value` / `checked` / `defaultValue`) ou un gestionnaire
(`onChange` / `onClick` …) est fourni ; sinon, le balisage statique suffit.

S'applique à :

- Contrôles de formulaire (button, checkbox, switch, textarea, field, slider, combobox, radio-group)
- Groupes sélectionnables (segment-group, toggle-group)
- Tableaux avec clics sur les lignes (table)
- Avatar avec un `src` (le chargement asynchrone d'image / cycle de vie d'erreur est un signal réservé au client)
- Paginaton / tags-input (état + gestionnaires ; une pagination de `type="link"` qui fournit
  `getPageUrl` est une navigation pure et reste statique)

### Niveau 3 — Présentationnel

> **Ne monte jamais d'île**

Composants purement typographiques / décoratifs sans comportement client. Ils **ne doivent pas déclarer**
**de propriété `interactive`** (historiquement, `badge` / `heading` / `text` / `fieldset` l'ont déclarée
par erreur et ont laissé fuir l'attribut sur le DOM — désormais supprimés).

S'applique à :

- Typographie (text, heading, badge)
- Mise en page (group, absolute-center, fieldset)
- Indicateurs d'état (alert, breadcrumb, loader, skeleton, spinner, progress)
- Graphiques (icon)

***

## Classification complète des composants

### Niveau 1 (auto-interactif)

| Composant | Règle | Déclencheur | Statut |
| --- | --- | --- | --- |
| `dialog` | `shouldHydrate(interactive, true)` | S'hydrate toujours sauf `interactive={false}` | ✅ `dialog.tsx` |
| `drawer` | `shouldHydrate(interactive, true)` | S'hydrate toujours sauf `interactive={false}` | ✅ `drawer.tsx` |
| `splitter` | `shouldHydrate(interactive, true)` | S'hydrate always sauf `interactive={false}` | ✅ `splitter.tsx` |
| `tooltip` | `shouldHydrate(interactive, true)` | S'hydrate toujours | ✅ `tooltip.tsx` |
| `hover-card` | `shouldHydrate(interactive, true)` | S'hydrate toujours | ✅ `hover-card.tsx` |
| `popover` | `shouldHydrate(interactive, true)` | S'hydrate toujours | ✅ `popover.tsx` |
| `menu` | `shouldHydrate(interactive, true)` | S'hydrate toujours | ✅ `menu.tsx` |
| `select` | `shouldHydrate(interactive, true)` | S'hydrate toujours — l'ouverture du menu déroulant et la sélection d'un élément nécessitent JS | ✅ `select.tsx` (Niveau 1) |
| `collapsible` | `shouldHydrate(interactive, true)` | S'hydrate toujours | ✅ `collapsible.tsx` (Niveau 1) |
| `toast` | Toujours île (singleton client) | Pas de prop, toujours une île | ✅ `toast.tsx` |

### Niveau 2 (détection automatique intelligente)

| Composant | Signal de comportement (`hasSignal` est vrai quand…) | Statut |
| --- | --- | --- |
| `button` | `onClick` / `onPointerDown` / `onSubmit` | ✅ `button.tsx` |
| `card` | `onClick` / `onPointerDown` | ✅ `card.tsx` |
| `table` | tout `row.onClick` | ✅ `table.tsx` |
| `segment-group` | `value` / `defaultValue` / `onValueChange` | ✅ `segment-group.tsx` |
| `toggle-group` | `value` / `defaultValue` / `onValueChange` | ✅ `toggle-group.tsx` |
| `slider` | `value` / `defaultValue` / `onChange` / `onDraggingChange` | ✅ `slider.tsx` |
| `checkbox` | `checked` / `defaultChecked` / `onCheckedChange` | ✅ `checkbox.tsx` |
| `switch` | `checked` / `defaultChecked` / `onCheckedChange` | ✅ `switch.tsx` |
| `textarea` | `value` / `defaultValue` / `onValueChange` / `validator` / `minLength` | ✅ `textarea.tsx` |
| `field` | `value` / `defaultValue` / `onValueChange` / `validator` / `minLength` | ✅ `field.tsx` |
| `combobox` | `open` / `inputValue` / `onToggle` / `onInputChange` / `onItemSelect` | ✅ `combobox.tsx` |
| `radio-group` | `value` / `defaultValue` / `onValueChange` | ✅ `radio-group.tsx` |
| `avatar` | `src` (chargement d'image asynchrone / cycle de vie d'erreur) | ✅ `avatar.tsx` (Niveau 2) |
| `pagination` | `onPageChange`, ou `page` / `defaultPage` / `pageSize` / `defaultPageSize` hors mode lien | ✅ `pagination.tsx` |
| `tags-input` | `onValueChange` / `onInputValueChange` / `value` / `inputValue` / `defaultValue` / `defaultInputValue` | ✅ `tags-input.tsx` |
| `paginated-table` | Toujours île (gère l'état de pagination interne) | ✅ `paginated-table.tsx` |
| `date-picker` | `value` / `defaultValue` / `focusedValue` / `open` / `defaultOpen` / `onValueChange` / `onOpenChange` | ✅ `date-picker.tsx` |
| `color-picker` | `value` / `defaultValue` / `format` / `defaultFormat` / `open` / `defaultOpen` / `onValueChange` / `onFormatChange` / `onOpenChange` | ✅ `color-picker.tsx` |

### Niveau 3 (présentationnel)

| Composant | Notes | Statut |
| --- | --- | --- |
| `text` | Texte typographique | ✅ |
| `heading` | Titre | ✅ |
| `badge` | Insigne | ✅ (propriété `interactive` morte supprimée) |
| `fieldset` | Ensemble de champs de formulaire | ✅ (propriété `interactive` morte supprimée) |
| `alert` | Boîte d'alerte | ✅ |
| `breadcrumb` | Fil d'Ariane | ✅ |
| `group` | Regroupement de mise en page | ✅ |
| `absolute-center` | Mise en page de centrage | ✅ |
| `loader` | Indicateur de chargement | ✅ |
| `skeleton` | Écran squelette | ✅ |
| `spinner` | Indicateur rotatif | ✅ |
| `progress` | Barre de progression (gérée par valeur, statique par défaut) | ✅ |
| `icon` | Enveloppe d'icône SVG (taille/couleur uniquement, pas d'état client) | ✅ `icon.tsx` |
