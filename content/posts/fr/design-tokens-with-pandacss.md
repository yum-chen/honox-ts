---
title: Tokens de Design avec PandaCSS
date: 2026-06-22
description: Une exploration approfondie de l'utilisation des tokens de design PandaCSS pour créer des systèmes de design cohérents et maintenables. Découvrez comment exploiter la puissance du CSS-in-JS type-safe.
cover: https://picsum.photos/seed/design-tokens-with-pandacss/1200/675
author: ''
readTime: ''
tags:
  - design
  - pandacss
  - css
draft: false
---

# Tokens de Design avec PandaCSS

PandaCSS est une bibliothèque CSS-in-JS moderne qui offre un style type-safe sans surcoût à l'exécution.

## Pourquoi des Tokens de Design ?

Les tokens de design sont les atomes visuels de votre système de design :

- Couleurs
- Typographie
- Espacement
- Ombres
- Rayon de bordure

## Configuration de PandaCSS

Installez PandaCSS dans votre projet HonoX :

```bash
npm install -D @pandacss/dev
```

## Création de Tokens de Design

Définissez vos tokens dans `panda.config.ts` :

```typescript
export default defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: { value: "#3b82f6" },
        secondary: { value: "#8b5cf6" },
      },
      spacing: {
        sm: { value: "0.5rem" },
        md: { value: "1rem" },
        lg: { value: "1.5rem" },
      },
    },
  },
});
```

## Utilisation des Tokens

```tsx
import { css } from "design-system/css";

function Button() {
  return (
    <button
      class={css({
        bg: "primary",
        color: "white",
        px: "md",
        py: "sm",
        borderRadius: "lg",
      })}
    >
      Click me
    </button>
  );
}
```

## Conclusion

Les tokens de design avec PandaCSS créent un système de design cohérent et maintenable qui évolue avec votre projet.
