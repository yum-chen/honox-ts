import { HoverCard } from "../components/ui";

export default function TestHoverCardPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>HoverCard Test Page</h1>
      <div style={{ marginTop: "2rem" }}>
        <HoverCard
          trigger={<span id="trigger">Hover over me</span>}
          content={<div id="content">HoverCard Content</div>}
          openDelay={100}
        />
      </div>
    </div>
  );
}
