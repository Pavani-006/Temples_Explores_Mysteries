# Refactor to React JSX + React Router SPA

This is a **framework swap**, not just a rename. The current project is TanStack Start (SSR, file-based routing, server functions, strict TS). Your target structure (`src/pages/`, `App.jsx`, React Router, `/temple/:slug`) is a classic **Vite + React + React Router DOM SPA**. I'll execute that migration end to end.

## What you keep
- Every visual element: colors, typography, hero, particles, animations, atmosphere.
- All temple data (49 temples, enriched overviews, galleries).
- All page sections (Featured Temples, Mysteries, Architecture, Gallery, About, Legends, Temple Detail with sticky nav).
- shadcn/ui components (kept as-is so future `shadcn add` keeps working — see Technical Notes).

## What changes
- **Routing**: TanStack Router → `react-router-dom` v6. URLs change from `/temples/:slug` to `/temple/:slug` per your spec. Old `/temples` list stays as `/temples`.
- **No SSR / no server functions**: pure client-side SPA. The current project has no real backend logic (just static temple data), so nothing functional is lost.
- **File extensions**: your app code → `.jsx` / `.js`. Type annotations stripped.
- **Entry point**: `src/routes/__root.tsx` + `src/router.tsx` → `src/App.jsx` + `src/main.jsx`.

## New structure

```text
src/
├── App.jsx                    # <BrowserRouter> + <Routes>
├── main.jsx                   # ReactDOM.createRoot
├── components/
│   ├── Navbar.jsx             # was site/Nav.tsx
│   ├── HeroSection.jsx        # was site/Hero.tsx
│   ├── TempleCard.jsx
│   ├── TempleGallery.jsx      # new, extracted from temple detail
│   ├── Timeline.jsx           # new, extracted from temple detail
│   ├── Footer.jsx
│   ├── FeaturedTemples.jsx
│   ├── PageHero.jsx
│   ├── Particles.jsx
│   ├── SanskritDivider.jsx
│   ├── SectionHeading.jsx
│   └── ui/                    # shadcn (kept as .tsx, see notes)
├── pages/
│   ├── Home.jsx
│   ├── Temples.jsx
│   ├── TempleDetail.jsx
│   ├── Mysteries.jsx
│   ├── Architecture.jsx
│   ├── Gallery.jsx
│   ├── Legends.jsx
│   └── About.jsx
├── data/
│   └── temples.js             # exports `temples` array + `getTempleBySlug`
├── hooks/
│   └── use-reveal.js
├── lib/
│   └── utils.js
├── assets/                    # unchanged
└── styles.css                 # unchanged
```

## Routes

| URL | Page |
|---|---|
| `/` | Home |
| `/temples` | Temples list |
| `/temple/:slug` | Temple detail |
| `/mysteries` | Mysteries |
| `/architecture` | Architecture |
| `/gallery` | Gallery |
| `/legends` | Legends |
| `/about` | About |
| `*` | 404 redirect to Home |

## Temple data shape (per your spec)

```js
{ id, slug, name, location, deity, architecture, heroImage, galleryImages,
  overview, history, mythology, mysteries, rituals, festivals }
```

I'll **map the existing rich fields** into this shape — no content loss. Extra fields already in the dataset (timeline, references, rare facts, state, period, mysteryType, tagline) will be preserved as additional properties so the detail page keeps its current depth.

## Files deleted
- `src/routes/` (entire folder, ~12 route files)
- `src/router.tsx`, `src/server.ts`, `src/start.ts`, `src/routeTree.gen.ts`
- `src/lib/api/`, `src/lib/config.server.ts`, `src/lib/error-capture.ts`, `src/lib/error-page.ts`
- `src/integrations/` (Supabase wiring — unused)
- `tsconfig.json`, TS-specific dev deps
- TanStack Start packages removed from `package.json`

## Files added / replaced
- `index.html` updated to mount `/src/main.jsx`
- `vite.config.js` — vanilla `@vitejs/plugin-react`, no TanStack plugin
- `package.json` — removes `@tanstack/react-router`, `@tanstack/react-start`, `@lovable.dev/vite-tanstack-config`; adds `react-router-dom`

## Technical notes (for you / future maintenance)

1. **shadcn/ui stays as `.tsx`.** Those 50 files are vendored, not "your code." Converting them strips all prop typing and breaks future `shadcn add` commands. Vite handles `.tsx` and `.jsx` in the same project natively. If you insist on converting them too, say so and I'll do a second pass — but I recommend leaving them.
2. **`tsconfig.json` kept (minimal)** only so `.tsx` files in `components/ui/` still compile. All your authored code is `.jsx`/`.js`.
3. **SEO**: SSR head metadata is gone. I'll add `react-helmet-async` for per-page `<title>` / `<meta>` so social sharing still works.
4. **No more type-safe routing**: typos in `<Link to="/temple/foo">` won't be caught at build time, only at runtime (404).
5. **Build verification**: after the swap I'll run a production build via the harness and fix any runtime errors that surface.

## Execution order
1. Update `package.json`, `vite.config`, `index.html`, `tsconfig`.
2. Create `src/data/temples.js` (mapped from existing dataset).
3. Create `src/components/*.jsx` (port + strip types).
4. Create `src/pages/*.jsx`.
5. Create `src/App.jsx` + `src/main.jsx`.
6. Delete TanStack files.
7. Run build, fix runtime issues.

Approve and I'll execute the full migration in one pass.