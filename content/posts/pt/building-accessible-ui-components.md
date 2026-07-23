---
title: Construindo Componentes de UI Acessíveis
date: 2026-06-10
description: Boas práticas para criar componentes acessíveis e navegáveis por teclado que funcionam para todos. Conformidade com WCAG 2.1 AA na prática.
cover: https://picsum.photos/seed/building-accessible-ui-components/1200/675
author: ''
readTime: ''
tags:
  - accessibility
  - ui
  - best-practices
draft: false
---

# Construindo Componentes de UI Acessíveis

Acessibilidade não é _opcional_ — é essencial para criar aplicações web inclusivas.

## Por Que a Acessibilidade Importa

- **Mais de 15% da população mundial** tem alguma forma de deficiência
- **Requisitos legais**: conformidade com WCAG 2.1 AA
- **Melhor UX para todos**: recursos de acessibilidade ajudam todos os usuários

## Princípios Fundamentais

### 1. HTML Semântico

Sempre use os elementos HTML corretos:

```html
<!-- Bom -->
<button>Click me</button>

<!-- Ruim -->
<div onclick="handleClick()">Click me</div>
```

### 2. Atributos ARIA

Quando o HTML não é suficiente, use ARIA:

```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <h2 id="dialog-title">Confirm Action</h2>
  <p id="dialog-description">Are you sure?</p>
</div>
```

### 3. Navegação por Teclado

Garanta que todos os elementos interativos sejam acessíveis pelo teclado:

```tsx
function CustomButton() {
  return (
    <div
      tabindex="0"
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
      onClick={handleClick}
    >
      Custom Button
    </div>
  );
}
```

### 4. Gerenciamento de Foco

Gerencie o foco para modais e conteúdo dinâmico:

```tsx
import { useEffect, useRef } from "react";

function Modal({ isOpen, onClose }) {
  const modalRef = useRef(null);
  
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);
  
  return (
    <div ref={modalRef} tabindex="-1">
      {/* Modal content */}
    </div>
  );
}
```

## Testando a Acessibilidade

Use estas ferramentas:

- **axe DevTools**: extensão de navegador
- **Lighthouse**: integrado ao Chrome DevTools
- **NVDA/JAWS**: leitores de tela para testes

## Conclusão

Construir componentes acessíveis desde o início é mais fácil do que adaptar a acessibilidade depois. Faça disso um hábito!
