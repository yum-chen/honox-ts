---
title: Barrierefreie UI-Komponenten Erstellen
date: 2026-06-10
description: Best Practices zur Erstellung barrierefreier, per Tastatur navigierbarer Komponenten, die für alle funktionieren. WCAG-2.1-AA-Konformität praktisch umgesetzt.
cover: https://picsum.photos/seed/building-accessible-ui-components/1200/675
author: ''
readTime: ''
tags:
  - accessibility
  - ui
  - best-practices
draft: false
---

# Barrierefreie UI-Komponenten Erstellen

Barrierefreiheit ist nicht _optional_ — sie ist essenziell für die Erstellung inklusiver Webanwendungen.

## Warum Barrierefreiheit Wichtig Ist

- **Über 15 % der Weltbevölkerung** haben eine Form von Behinderung
- **Gesetzliche Anforderungen**: WCAG-2.1-AA-Konformität
- **Bessere UX für alle**: Barrierefreiheitsfunktionen helfen allen Nutzern

## Grundprinzipien

### 1. Semantisches HTML

Verwenden Sie immer die richtigen HTML-Elemente:

```html
<!-- Gut -->
<button>Click me</button>

<!-- Schlecht -->
<div onclick="handleClick()">Click me</div>
```

### 2. ARIA-Attribute

Wenn HTML nicht ausreicht, verwenden Sie ARIA:

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

### 3. Tastaturnavigation

Stellen Sie sicher, dass alle interaktiven Elemente per Tastatur zugänglich sind:

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

### 4. Fokus-Management

Verwalten Sie den Fokus für Modals und dynamische Inhalte:

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

## Barrierefreiheit Testen

Verwenden Sie diese Tools:

- **axe DevTools**: Browser-Erweiterung
- **Lighthouse**: In die Chrome DevTools integriert
- **NVDA/JAWS**: Screenreader zum Testen

## Fazit

Barrierefreie Komponenten von Anfang an zu erstellen ist einfacher, als Barrierefreiheit später nachzurüsten. Machen Sie es sich zur Gewohnheit!
