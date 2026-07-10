# HonoX + PandaCSS + Sveltia CMS Starter

Full-stack [HonoX](https://github.com/honojs/honox) starter with type-safe CSS-in-JS ([PandaCSS](https://panda-css.com/)), and a Git-backed CMS ([Sveltia CMS](https://sveltiacms.app/)).

Live demo: [https://honox.chen.so](https://honox.chen.so)

---

## What's Inside

| Feature | Details |
|---|---|
| **Framework** | [HonoX](https://honox.dev) — meta-framework on Hono |
| **Styling** | [PandaCSS](https://panda-css.com) — type-safe, zero-runtime CSS-in-JS |
| **CMS** | [Sveltia CMS](https://sveltiacms.app) — Git-backed, runs at `/admin/` |
| **Blog** | Markdown posts in `content/posts/`, rendered at `/blog` |
| **SSG** | Static site generation via `@hono/vite-ssg` |
| **Deploy** | Cloudflare Pages (`wrangler.jsonc`) |

---

## Architecture

### Routes

| Route | File | Purpose |
|---|---|---|
| `/` | `app/routes/index.tsx` | Homepage |
| `/blog` | `app/routes/blog.tsx` | Post list with tag filtering |
| `/blog/tag/:tag` | `app/routes/blog/tag/[tag].tsx` | Tag-filtered post list (static) |
| `/blog/:slug` | `app/routes/blog/[slug].tsx` | Individual post |
| `/admin/` | `public/admin/index.html` | Sveltia CMS UI |

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for UI components architecture details.

---

## Blog & CMS

### How it works

1. **Write** — Markdown files in `content/posts/*.md` with YAML frontmatter:
   ````markdown
   ---
   title: "My Post"
   date: "2026-07-04"
   description: "A summary..."
   tags: ["tutorial", "honox"]
   draft: false
   ---
   
   Post body in markdown...
   ````

2. **Manage** — Visit `/admin/` to edit posts via Sveltia CMS.

3. **Build** — `bun run build` generates:
   - `dist/blog/index.html` — post list
   - `dist/blog/[slug].html` — individual post pages
   - `dist/blog/tag/[tag].html` — tag-filtered post lists (static, no JS needed)

---

## Sveltia Page Builder

This starter contains an advanced layout builder inside the Sveltia CMS `pages` collection. Users can construct complex, responsive, dynamic pages directly from the CMS UI.

### Recursively Nestable Components

We support a full collection of over **25+ rich presentational and interactive components**:

* **Layout & Structure:** `Stack` (Direction/Align/Justify/Gap), `Group` (Grow/Attached), `Fieldset` (Legend/Helper/Error)
* **Text & Typography:** `Heading` (Level/Size), `Text` (Content/Size)
* **UI Elements:** `Button` (Variant/Palette/Size), `Badge` (Variant/Palette/Size), `Alert` (Status/Variant), `Card` (Variant/Size/Clickable)
* **Form & Controls:** `Checkbox`, `Combobox` (Items list/Clear trigger), `Field`, `RadioGroup`, `SegmentGroup`, `Slider`, `Switch`
* **Feedback & Loaders:** `Progress` (Linear/Circular), `Skeleton` (NoOfLines/Circle), `Spinner`
* **Overlays & Dialogs:** `Collapsible` (Trigger/Open), `Popover` (ShowArrow/Closable), `Dialog` (Cancel/Confirm/Closable), `Drawer` (Cancel/Confirm/Closable), `Menu` (Nestable item action list)
* **Tables & Data:** `PaginatedTable`, `Pagination`

### Multi-Level Nested Recursion

Components like `Stack`, `Fieldset`, `Group`, `HoverCard`, `Popover`, `Collapsible`, `Dialog`, and `Drawer` fully support **recursive children nesting**. Through carefully designed YAML anchors and references in Sveltia CMS `public/admin/config.yml` and a smart layout compiler inside `app/components/page-renderer.tsx`, users can nest components (e.g. Buttons/Skeletons inside a Card inside a Collapsible inside a Stack) to build sophisticated dashboard layouts.

---

## CMS Setup

Sveltia CMS is configured in `public/admin/config.yml`. You can use it **locally** or with a **Git backend**:
- **GitHub:** `name: github`
- **GitLab:** `name: gitlab`
- **Bitbucket:** `name: bitbucket`
- **Azure:** `name: azure`

See [Sveltia CMS docs](https://sveltiacms.app/en/docs/backends) for details.

---

## Local Development

### Prerequisites
- Bun 1.0+
- Node.js 18+ (for PandaCSS)

### Commands

| Command | Purpose |
|---|---|
| `bun run dev` | Dev server with HMR (`http://localhost:5173`) |
| `bun run build` | Client + server build + SSG |
| `bun run start --static` | Serve `dist/` statically (no SSR) |
| `bun run deploy` | Deploy to Cloudflare Pages |

---

## Project Structure

````
app/
  components/page-renderer.tsx # Dynamic Page layout compiler
  components/ui/    # Public component API
  islands/          # Client-side interactive islands
  routes/           # File-based routing
    blog.tsx         # Post list
    blog/[slug].tsx  # Individual post
    blog/tag/[tag].tsx  # Tag-filtered post list
    pages/[slug].tsx # Page builder SSG route
utils/
  markdown.ts        # Frontmatter parser + MD→HTML
content/posts/       # Blog post markdown files
content/pages/       # Page builder JSON layouts
public/admin/        # Sveltia CMS static files
  config.yml          # CMS configuration
  index.html          # CMS UI
````
