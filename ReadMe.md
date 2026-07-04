# HonoX + PandaCSS + Sveltia CMS Starter

A full-stack HonoX starter with type-safe CSS-in-JS (PandaCSS), a CMS-backed blog, and a component-only UI architecture.

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

### Component-Only API

All UI components live in `app/components/ui/` and serve as the primary entry points.

**Smart Switcher pattern:**
1. **Public Component** (`app/components/ui/*.tsx`) — decides whether to render a static primitive or an interactive island based on props (e.g. `onValueChange` or `interactive={true}`).
2. **Primitive** (`app/components/ui/*-primitive.tsx`) — stateless, server-side compatible.
3. **Island** (`app/islands/*.tsx`) — client-side state management. Never imported directly by routes.

Setting `interactive={true}` forces hydration as an island.

### Routes

| Route | File | Purpose |
|---|---|---|
| `/` | `app/routes/index.tsx` | Homepage |
| `/blog` | `app/routes/blog.tsx` | Post list with tag filtering |
| `/blog/:slug` | `app/routes/blog/[slug].tsx` | Individual post |
| `/admin/` | `public/admin/index.html` | Sveltia CMS UI |

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

2. **Manage** — Visit `/admin/` to edit posts via Sveltia CMS (requires GitHub OAuth).

3. **Build** — `bun run build` generates:
   - `dist/blog/index.html` — post list
   - `dist/blog/[slug].html` — individual post pages
   - Tag filtering works via `?tag=tutorial` query param.

### Sveltia CMS Setup

Edit `public/admin/config.yml`:

````yaml
backend:
  name: github
  repo: YOUR_USERNAME/YOUR_REPO   # ← update this
  branch: main
````

Then set up a GitHub OAuth App:
1. GitHub → Settings → Developer settings → OAuth Apps → New application
2. Homepage URL: `http://localhost:3000`
3. Authorization callback URL: `http://localhost:3000/callback`
4. Copy the Client ID into `config.yml`

---

## Scripts

| Command | Purpose |
|---|---|
| `bun run dev` | Dev server with HMR |
| `bun run build` | Client + server build + static post generation |
| `bun run start --static` | Serve `dist/` statically (no SSR) |
| `bun run deploy` | Deploy to Cloudflare Pages |

---

## Documentation

Component docs are in `docs/`. Each component has its own file with props, examples, and notes.

---

## Project Structure

````
app/
  components/ui/    # Public component API
  islands/          # Client-side interactive islands
  routes/           # File-based routing
    blog.tsx         # Post list
    blog/[slug].tsx  # Individual post
utils/
  markdown.ts        # Frontmatter parser + MD→HTML
content/posts/       # Blog post markdown files
public/admin/        # Sveltia CMS
scripts/
  generate-blog-posts.ts  # Post-build static HTML generator
````
