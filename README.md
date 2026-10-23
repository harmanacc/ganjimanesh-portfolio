# مهدیه گنجی‌منش — Atlas

A single-page, Persian-first (RTL) portfolio built around an interactive 3D
brain atlas. Astro, static output, Cloudflare.

## Run

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview
npm run check
```

## Deploy on Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`
- Node version: `.nvmrc` pins `22.23.4` (Astro 7 needs Node ≥ 22.23.4)
- `public/_headers` adds long-lived caching for hashed JS/CSS, the GLBs and
  paper textures. `atlas.json` is cached for one hour.

The site is fully static: no server runtime, no external CDN, no environment
variables.

## Structure

- `src/pages/index.astro` — the only route
- `src/components/atlas/BrainAtlas.astro` — stage, paper UI, drawer styles
- `src/components/atlas/brain-atlas.ts` — three.js viewer, picking, camera,
  layers, search, clipping
- `src/layouts/Base.astro` — document shell
- `src/data/facts.ts` — verified personal facts
- `src/styles/global.css`, `src/styles/fonts.css` — tokens, reset, fonts
- `public/brain-atlas/surface.glb` — outer surfaces, loaded first
- `public/brain-atlas/internal.glb` — inner structures, loaded on demand
- `public/brain-atlas/atlas.json` — hierarchy, Persian names, notes, layers
- `public/brain-atlas/ATTRIBUTION.md` — source and licensing notes
- `public/paper/fiber.png` — paper grain
- `public/favicon.svg`

## Assets

The web-ready GLBs and `atlas.json` are committed. The page loads the surface
pack (~668 KB) first and fetches the internal pack (~2.2 MB) only when the
visitor opens a deep structure or a reading layer. No external CDN is used.

The 3D region meshes and base hierarchy come from the **Neurotorium 3D Brain
Atlas** (Lundbeck Foundation), extracted for a research prototype. Read
`public/brain-atlas/ATTRIBUTION.md` before publishing commercially.

The Persian labels, short notes, reading layers, interface and code are original
to this project.
