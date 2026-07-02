---
name: testing-honox-islands
description: Test HonoX island interactivity (hydration, state, compound components). Use when verifying interactive UI components.
---

# Testing HonoX Islands

## Dev Server

```bash
bun run dev  # starts on localhost:5173 (or next available port)
```

## Key Architecture Constraint

HonoX islands serialize props as JSON for client hydration. Only **simple/primitive props** (strings, numbers, booleans) survive serialization. Complex JSX children are NOT serialized.

### Working Pattern (self-contained islands)
Islands that render ALL UI internally with serializable props work correctly:
- Switch: `children` is a string like `"Checked"` -> serialized as `{"children":"Checked"}`
- Checkbox: same pattern
- Tooltip (InteractiveTooltip): self-contained, accepts `content` as a prop

### Broken Pattern (compound component islands)
Islands that receive JSX children from outside the island boundary do NOT work:
- Popover (Root+Trigger+Content via Context): serialized props = `{}`
- Dialog: same issue
- Drawer: same issue

The compound component children (`<Popover.Trigger>`, `<Popover.Content>`, etc.) are complex JSX that cannot be serialized to JSON, so the island receives empty props on hydration.

## Testing Islands with Playwright

Connect to the existing Chrome via CDP:
```javascript
const { chromium } = require('playwright');
const browser = await chromium.connectOverCDP('http://localhost:29229');
const page = browser.contexts()[0].pages()[0];
```

### Verify Island Hydration
```javascript
const islands = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('honox-island')).map(el => ({
    name: el.getAttribute('component-name'),
    props: el.dataset.serializedProps,
    hydrated: el.dataset.honoHydrated
  }));
});
```

- `data-hono-hydrated="true"` means the island script loaded
- Check `serializedProps` to verify children/props are being passed
- If `serializedProps` is `"{}"`, the island's children were complex JSX and weren't serialized

### Test Interactive State Changes
```javascript
// Example: test Switch toggle (works because children are strings)
const switchInput = page.locator('label:has-text("Interactive") input[type="checkbox"]');
const before = await switchInput.isChecked();
await switchInput.click();
const after = await switchInput.isChecked();
console.log('Toggled:', before !== after);
```

## Lint & Build

```bash
bun run check   # Biome lint + format
bun run build   # Vite dual-build (client + SSG)
```

## Devin Secrets Needed

None required for local testing.
