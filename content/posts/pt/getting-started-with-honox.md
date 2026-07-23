---
title: Primeiros Passos com HonoX
date: 2026-06-28
description: Aprenda como construir aplicações full-stack com HonoX, o meta-framework construído sobre o Hono. Este guia completo aborda roteamento, middleware e estratégias de implantação.
cover: https://picsum.photos/seed/getting-started-with-honox/1200/675
author: ''
readTime: ''
tags:
  - tutorial
  - honox
  - getting-started
draft: false
---

# Primeiros Passos com HonoX

HonoX é um meta-framework poderoso construído sobre o Hono que permite criar aplicações web full-stack com facilidade.

## O que é o HonoX?

HonoX combina a simplicidade do Hono com recursos avançados como:

- Roteamento baseado em arquivos
- Renderização no servidor (SSR)
- Geração de site estático (SSG)
- Arquitetura de ilhas para componentes interativos

## Instalação

```bash
npm create honox@latest
```

## Estrutura do Projeto

Um projeto HonoX típico se parece com:

```plain
my-app/
  ├── app/
  │   ├── routes/       # Roteamento baseado em arquivos
  │   ├── components/   # Componentes reutilizáveis
  │   └── islands/      # Componentes interativos do lado do cliente
  ├── public/           # Arquivos estáticos
  └── package.json
```

## Criando Sua Primeira Rota

Crie um novo arquivo `app/routes/about.tsx`:

```tsx
import { createRoute } from "honox/factory";

export default createRoute((c) => {
  return c.render(
    <div>
      <h1>About Page</h1>
      <p>Welcome to my HonoX app!</p>
    </div>
  );
});
```

## Conclusão

HonoX oferece uma forma moderna, rápida e flexível de construir aplicações web. Experimente!
