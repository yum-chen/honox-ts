---
title: Tokens de Design com PandaCSS
date: 2026-06-22
description: Uma análise profunda sobre o uso de tokens de design do PandaCSS para criar sistemas de design consistentes e sustentáveis. Aprenda a aproveitar o poder do CSS-in-JS type-safe.
cover: https://picsum.photos/seed/design-tokens-with-pandacss/1200/675
author: ''
readTime: ''
tags:
  - design
  - pandacss
  - css
draft: false
---

# Tokens de Design com PandaCSS

PandaCSS é uma biblioteca moderna de CSS-in-JS que oferece estilização type-safe com overhead zero em tempo de execução.

## Por Que Tokens de Design?

Tokens de design são os átomos visuais do seu sistema de design:

- Cores
- Tipografia
- Espaçamento
- Sombras
- Raio de borda

## Configurando o PandaCSS

Instale o PandaCSS no seu projeto HonoX:

```bash
npm install -D @pandacss/dev
```

## Criando Tokens de Design

Defina seus tokens em `panda.config.ts`:

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

## Usando Tokens

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

## Conclusão

Tokens de design com PandaCSS criam um sistema de design consistente e sustentável que escala com seu projeto.
