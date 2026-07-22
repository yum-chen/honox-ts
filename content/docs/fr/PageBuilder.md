---
title: Générateur de page CMS
---

## Introduction

Le Générateur de page dynamique basé sur [Sveltia CMS](https://sveltiacms.app/en/docs/intro) permet aux éditeurs non techniques de créer des pages complexes, imbriquées de manière récursive, entièrement via l'interface utilisateur du CMS (`/admin/`).

Les mises en page sont enregistrées sous forme de fichiers JSON dans `content/pages/*.json` et sont compilées à la demande ou prégénérées statiquement (via Hono SSG) sous `/pages/[slug]`.

***

## Composants pris en charge

Le Générateur de page prend en charge une riche palette de plus de 40 composants de mise en page, de typographie, décoratifs et interactifs.

### 1. Structure et mise en page

* **Stack** : Regroupe les enfants verticalement ou horizontalement avec un alignement, une justification et un espacement (gap) contrôlables.
* **Grid** : Mise en page CSS Grid réactive — nombre fixe de colonnes/lignes, ou ajustement automatique (auto-fit) selon la largeur minimale de l'enfant.
* **Group** : Aligne des éléments comme des boutons de manière compacte (prend en charge les propriétés `attached` et `grow`).
* **Fieldset** : Organise les composants de formulaire associés dans un conteneur stylisé, avec `legend`, `helperText` et `errorText`.
* **AbsoluteCenter** : Centre un seul bloc imbriqué dans son parent le long de l'un ou des deux axes.
* **Splitter** : Panneaux redimensionnables séparés par des poignées de glissement. Toujours rendu de manière statique dans le Générateur de page.
* **Breadcrumb** : Fil d'Ariane des éléments liés avec un séparateur personnalisable.

### 2. Typographie et contenu

* **Heading** : Titres stylisés de niveaux `h1` à `h6` et plusieurs tailles de texte réactives.
* **Text** : Texte au niveau du paragraphe avec des tailles ajustables.

### 3. Présentation et statut

* **Alert** : Rend des alertes d'avertissement/succès/erreur/information avec des états et des icônes standard.
* **Badge** : Étiquettes de métadonnées colorées avec des palettes de couleurs et des styles personnalisés.
* **Card** : Un conteneur enrichi qui prend en charge les blocs imbriqués, les en-têtes, les pieds de page et les positions d'image haut/bas/gauche/droite.
* **Progress** : Rend des indicateurs de progression linéaires ou circulaires.
* **Skeleton** : Squelettes de remplacement hautement personnalisables (prend en charge les formes de cercle et le texte multiligne).
* **Loader** / **Spinner** : Indicateurs de chargement, avec texte d'accompagnement facultatif.
* **Table** : Données tabulaires statiques avec des colonnes configurables et un tableau de lignes codé en JSON.
* **Icon** : Balisage SVG brut avec contrôles de taille/couleur.

### 4. Superpositions et interactifs

* **Button** : Cibles cliquables principales prenant en charge des palettes, tailles et variantes de style personnalisées.
* **Checkbox** : Cases à cocher pour entrée booléenne avec liaisons aria accessibles.
* **Combobox** : Menus déroulants avec actions d'effacement et listes d'éléments.
* **Collapsible** : Conteneurs de divulgation qui affichent/masquent des arbres de composants imbriqués.
* **Popover** : Contenu descriptif flottant ancré à des déclencheurs de texte standard.
* **Tooltip** : Texte d'aide contextuelle ancré à un bouton déclencheur au survol/focus.
* **HoverCard** : Contenu déclenché au survol plus riche qu'un Tooltip, avec titre/description facultatifs.
* **Dialog** : Boîtes modales avec capture complète du focus, boutons Confirmer/Annuler personnalisés et liste d'enfants personnalisée.
* **Drawer** : Panneaux latéraux réactifs qui glissent depuis le bord de la page, avec liste d'enfants personnalisée.
* **Dropdown** (type de bloc `menu`) : Menus d'action avec options personnalisées de case, sélection et séparateur.

### 5. Données et avancés

* **Select** : Menu déroulant personnalisé de sélection unique/multiple, pouvant être soumis dans un formulaire.
* **DatePicker** : Sélection de date unique/multiple/plage avec un calendrier contextuel.
* **TagsInput** : Liste d'étiquettes de texte libre.
* **RadioGroup** / **RadioCardGroup** : Listes d'options personnalisées avec logique de sélection unique accessible.
* **SegmentGroup** : Contrôles segmentés coulissants pour sélection de type onglets.
* **Slider** : Composants de curseur de plage.
* **Switch** : Commutateurs d'activation.
* **Editable** : Texte en ligne modifiable par clic.
* **ColorPicker** : Sélecteur de couleur de saturation/teinte/alpha avec entrée hex/RGBA/HSLA.
* **FileUpload** : Sélection de fichiers par glisser-déposer ou par clic.
* **Carousel** : Présentation d'images automatique ou manuelle.
* **PaginatedTable** : Composants de tableau dynamique interactif avec prise en charge de la pagination.
* **Pagination** : Contrôleurs de page interactifs.

***

## Architecture

### 1. Définitions de schéma du CMS (`public/admin/config.yml`)

Nous utilisons des **ancres et alias YAML** avancés (`&` et `*`) pour résoudre le défi de la récursion infinie dans les spécifications YAML.

* Les **ancres de base** (`button_fields`, `checkbox_fields`, etc.) sont déclarées une seule fois.
* Les **composants de niveau 1** définissent des éléments plats et un conteneur `Stack`/`Collapsible` qui prend en charge les **composants de niveau 2** (`*l2_components`).
* Les **composants de niveau 2** permettent récursivement une autre couche de conteneurs imbriqués (`*l3_components`).
* Cela permet aux éditeurs d'imbriquer des mises en page jusqu'à **4 niveaux de profondeur** sans dépasser les limites de l'analyseur YAML/CMS.

### 2. Rendu de mise en page (`app/components/page-renderer.tsx`)

Le moteur de mise en page importe tous les modules de composants publics depuis `app/components/ui/` et les mappe dans un compilateur JSX performant et entièrement sécurisé au niveau des types.

* Les types d'entrée sont convertis strictement en dictionnaires d'enregistrement `unknown` standard pour éviter la coercition de types et maintenir les vérifications de lint de Biome totalement propres.
* Les conteneurs imbriqués sont gérés de manière récursive par des appels imbriqués au composant `<PageRenderer content={...} />`.

***

## Pipelines de construction de contenu

Les mises en page du Générateur de page sont l'un des trois types de contenu sous `content/`, chacun découvert avec `import.meta.glob` de Vite et rendu par sa propre route. Tous trois sont générés statiquement de la même manière : le middleware `ssgParams` d'une route répertorie chaque fichier de sa collection au moment de la compilation, et `bun run build` (via `@hono/vite-ssg`) parcourt ces paramètres pour prégénérer un fichier HTML statique par slug dans `dist/`.

### 1. Mises en page JSON (`content/pages/*.json`)

* Chargées avec `import.meta.glob("/content/pages/*.json", { import: "default" })` dans `app/routes/pages/[slug].tsx`.
* Chaque fichier est analysé comme du JSON plat — sans markdown impliqué — et son tableau `content` est directement transmis à `<PageRenderer />`, qui le compile récursivement dans les composants d'interface utilisateur correspondants.

### 2. Markdown brut (`content/posts/*.md`, `content/docs/*.md`)

* Chargés avec `import.meta.glob(..., { query: "?raw", import: "default" })`, qui renvoie le code source markdown brut sous forme de chaîne de caractères.
* Analysés au moment de la requête/compilation par `app/utils/markdown.ts` (canalisation `remark`/`rehype`) : `parseFrontmatter()` sépare le bloc de frontmatter YAML du corps, et `markdownToHtml()` convertit le corps en chaîne HTML.

### 3. Documents MDX (`content/docs/*.mdx`)

* Compilés à l'avance via le plugin Vite `@mdx-js/rollup` (configuré dans `vite.config.ts`).
* Chaque fichier `.mdx` devient un composant réel et importable, chargé dans `app/lib/docs.ts` via un `import.meta.glob` plat.
* Comme la sortie est un composant plutôt qu'une chaîne HTML, les documents `.mdx` peuvent intégrer des exemples interactifs réellement rendus directement dans le texte.

***

## Exemple de structure JSON

Voici un exemple de fichier de mise en page représentant une page de tableau de bord complexe (`content/pages/dashboard.json`) :

```json
{
  "title": "Tableau de bord interactif",
  "content": [
    {
      "type": "heading",
      "text": "Analyses du tableau de bord",
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
          "title": "Bienvenue !",
          "description": "Voici l'état de votre système.",
          "variant": "outline",
          "children": [
            {
              "type": "alert",
              "status": "success",
              "title": "Tous les systèmes opérationnels",
              "variant": "surface"
            }
          ]
        },
        {
          "type": "fieldset",
          "legend": "Préférences utilisateur",
          "children": [
            {
              "type": "switch",
              "defaultChecked": true,
              "text": "Activer les notifications push"
            },
            {
              "type": "checkbox",
              "text": "S'abonner à la newsletter"
            }
          ]
        }
      ]
    }
  ]
}
```
