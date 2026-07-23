---
title: Créer des Composants d'Interface Accessibles
date: 2026-06-10
description: Bonnes pratiques pour créer des composants accessibles et navigables au clavier qui fonctionnent pour tout le monde. La conformité WCAG 2.1 AA rendue pratique.
cover: https://picsum.photos/seed/building-accessible-ui-components/1200/675
author: ''
readTime: ''
tags:
  - accessibility
  - ui
  - best-practices
draft: false
---

# Créer des Composants d'Interface Accessibles

L'accessibilité n'est pas _optionnelle_ — elle est essentielle pour créer des applications web inclusives.

## Pourquoi l'Accessibilité Compte

- **Plus de 15 % de la population mondiale** vit avec une forme de handicap
- **Exigences légales** : conformité WCAG 2.1 AA
- **Meilleure expérience pour tous** : les fonctionnalités d'accessibilité profitent à tous les utilisateurs

## Principes Clés

### 1. HTML Sémantique

Utilisez toujours les bons éléments HTML :

```html
<!-- Bon -->
<button>Click me</button>

<!-- Mauvais -->
<div onclick="handleClick()">Click me</div>
```

### 2. Attributs ARIA

Lorsque le HTML ne suffit pas, utilisez ARIA :

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

### 3. Navigation au Clavier

Assurez-vous que tous les éléments interactifs sont accessibles au clavier :

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

### 4. Gestion du Focus

Gérez le focus pour les modales et le contenu dynamique :

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

## Tester l'Accessibilité

Utilisez ces outils :

- **axe DevTools** : extension de navigateur
- **Lighthouse** : intégré à Chrome DevTools
- **NVDA/JAWS** : lecteurs d'écran pour les tests

## Conclusion

Créer des composants accessibles dès le départ est plus simple que d'ajouter l'accessibilité après coup. Faites-en une habitude !
