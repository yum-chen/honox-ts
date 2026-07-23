---
title: Design-Tokens mit PandaCSS
date: 2026-06-22
description: Ein tiefer Einblick in die Verwendung von PandaCSS-Design-Tokens zur Erstellung konsistenter, wartbarer Designsysteme. Erfahren Sie, wie Sie die Leistungsfähigkeit von typsicherem CSS-in-JS nutzen.
cover: https://picsum.photos/seed/design-tokens-with-pandacss/1200/675
author: ''
readTime: ''
tags:
  - design
  - pandacss
  - css
draft: false
---

# Design-Tokens mit PandaCSS

PandaCSS ist eine moderne CSS-in-JS-Bibliothek, die typsicheres Styling ohne Laufzeit-Overhead bietet.

## Warum Design-Tokens?

Design-Tokens sind die visuellen Design-Atome Ihres Designsystems:

- Farben
- Typografie
- Abstände
- Schatten
- Randradius

## PandaCSS Einrichten

Installieren Sie PandaCSS in Ihrem HonoX-Projekt:

```bash
npm install -D @pandacss/dev
```

## Design-Tokens Erstellen

Definieren Sie Ihre Tokens in `panda.config.ts`:

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

## Tokens Verwenden

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

## Fazit

Design-Tokens mit PandaCSS schaffen ein konsistentes, wartbares Designsystem, das mit Ihrem Projekt skaliert.
