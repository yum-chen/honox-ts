# Splitter

A component that allows users to resize panels.

## Usage

```tsx
import { Splitter } from "../components/ui/splitter";

// Basic usage
<Splitter
  orientation="horizontal"
  panels={[
    { id: "left", content: <div>Left Panel</div> },
    { id: "right", content: <div>Right Panel</div> }
  ]}
/>

// Interactive with initial sizes
<Splitter
  orientation="horizontal"
  interactive
  panels={[
    { id: "sidebar", content: <Sidebar /> },
    { id: "main", content: <MainContent /> }
  ]}
  defaultSize={[
    { id: "sidebar", size: 25 },
    { id: "main", size: 75 }
  ]}
/>
```

## Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `panels` | `PanelConfig[]` | The configuration for the panels. |
| `orientation` | `"horizontal" \| "vertical"` | The orientation of the splitter. |
| `interactive` | `boolean` | Whether the splitter is interactive. |
| `defaultSize` | `SplitterSize[]` | The initial sizes of the panels. |
| `size` | `SplitterSize[]` | The sizes of the panels (controlled). |
| `onSizeChange` | `(size: SplitterSize[]) => void` | Callback called when sizes change. |
| `class` | `string` | Additional class name for the root element. |
| `resizeTriggerClass` | `string` | Additional class name for the resize triggers. |
