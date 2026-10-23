# Stack research — animated one-page portfolio (Oct 2026)

Goal: a designer/creative one-pager, heavily animated, statically hosted for $0, fast on mid-range phones, easy to maintain for 2–3 years. Versions below were checked against the npm registry and vendor docs on **2026-10-23**.

> **Version reality check:** Astro 6 shipped in Feb 2026; **Astro 7.4.2 is current** (Rust compiler, Vite 8). Starting a new build on Astro 5/6 in Oct 2026 means starting one or two majors behind. Use 7.x. React is 19.3.1, Next 16.4.2, SvelteKit 3.1.0, Nuxt 4.6.2, Vite 8.3.5, Tailwind 4.3.3.

## 1. Candidate stacks and scored comparison

Scores are comparative judgments, not benchmarks. Weights reflect this brief: animation 20%, authoring 15%, bundle 15%, SEO 15%, build speed 10%, free-tier fit 10%, maintenance 10%, learning 5%.

| Stack | Build | Anim | Bundle | SEO | Free tier | Learn | Maint | Author | **Weighted** |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| **Astro 7.4.2 + islands + Tailwind 4.3.3** | 4 | 5 | 5 | 5 | 5 | 4 | 4 | 5 | **4.75** |
| **Plain HTML/CSS/TS + Vite 8.3.5** | 5 | 5 | 5 | 5 | 5 | 5 | 5 | 2 | **4.55** |
| **SvelteKit 3.1.0 + adapter-static** | 5 | 4 | 4 | 4 | 5 | 3 | 3 | 4 | **4.05** |
| **Nuxt 4.6.2 static (`nuxt generate`)** | 4 | 3 | 3 | 4 | 5 | 3 | 3 | 4 | **3.60** |
| **Next.js 16.4.2 static export** | 3 | 4 | 2 | 4 | 3 | 3 | 2 | 4 | **3.25** |
| **Vite 8.3.5 + React 19.3.1 SPA** | 5 | 4 | 2 | 2 | 4 | 4 | 3 | 3 | **3.25** |

**Why the ranking looks like this**

- **Astro** wins because the page is a document with animation, not an app. Default output is HTML/CSS with **zero framework JS**; you add only the scripts/islands you need. `<script>` bundles GSAP/Lenis as normal DOM code, so there is no hydration boundary around the animation. Its build-time image pipeline is the best free option here.
- **Plain Vite** is a genuine runner-up for a one-pager: total control, smallest output, no framework churn. It loses on authoring: you hand-roll `<head>`, SEO, image variants, section data, and shared layout. At 3+ case studies it becomes maintenance.
- **SvelteKit** is excellent if the portfolio grows into an app (filterable archive, CMS preview, client routing). Svelte 5 runes + transitions are pleasant, but you ship a runtime and the creative-dev ecosystem is thinner than Astro/GSAP.
- **Nuxt** is only compelling if you already know Vue. Vue's reactivity is fine; SSR/hydration adds concepts without helping a one-pager.
- **Next static export** is capable but the worst fit: App Router/RSC complexity, the largest client runtime, and static export disables the features people choose Next for (default image loader, server actions, headers/redirects, ISR). See https://nextjs.org/docs/app/guides/static-exports.
- **React SPA** is the wrong default for a portfolio: one empty shell, client-rendered content, poor social/SEO previews, and you still need a prerender step to fix it.

## 2. What “static” actually means, and where animation breaks

| Stack | Build output | What runs in the browser | Typical initial JS |
|---|---|---|---|
| Astro 7 | `dist/` with one HTML file per route; `output: 'static'` is the default | Only `<script>` tags and explicitly hydrated islands | 0 KB baseline; GSAP ~27 KB gzip + Lenis ~5.5 KB |
| Vite + React SPA | `dist/index.html` shell + hashed JS | The whole app renders client-side | React ~45–60 KB + app + animation libs |
| Next static export | `out/` with HTML per route; RSC runs at build | Client components hydrate; router runtime loads | Router + React + client components |
| SvelteKit adapter-static | `build/` with prerendered HTML per route | Svelte runtime hydrates the page | ~15–25 KB runtime + app |
| Nuxt static | `.output/public` with HTML + `_payload.json` | Vue hydrates; payload rehydrates route data | Vue runtime + payload + app |
| Plain HTML/TS + Vite | Literal HTML/CSS/JS | Only what you write | Whatever you import |

**Astro:** static HTML is generated at build; islands are separate bundles hydrated on the client. `client:load` hydrates immediately, `client:visible` when scrolled into view, `client:only` skips SSR entirely. For a one-pager, **do not put the scroll animation in an island** — put it in a normal `<script>`; it runs after the DOM is parsed and avoids React hydration cost. See https://docs.astro.build/en/concepts/islands/.

**Vite React SPA:** “static hosting” only means the files are static. The browser gets an empty `<div id="root">`; SEO and OG crawlers see nothing useful unless you prerender. Any host needs an SPA fallback rewrite to `index.html`.

**Next static export:** `output: 'export'` emits real HTML, but `next/image` needs a custom loader, and cookies, headers, redirects, rewrites, ISR, server actions and dynamic route handlers are unsupported (https://nextjs.org/docs/app/guides/static-exports). You also pay hydration for the whole client tree.

**SvelteKit:** `adapter-static` prerenders every route; `ssr` must stay `true` or you emit an empty shell, and `strict: true` catches routes you forgot to prerender (https://svelte.dev/docs/kit/adapter-static). SvelteKit 3 moved adapter configuration into `sveltekit({ adapter })` inside `vite.config.ts` — a real migration difference from v2.

**Nuxt:** `nuxt generate` prerenders routes with `ssr: true` and emits `200.html`/`404.html` fallbacks. `ssr: false` gives you a Vue SPA with the same SEO problem as React SPA (https://nuxt.com/docs/4.x/getting-started/deployment).

**Where animation libraries break**

- **Top-level `window`/`document`/`matchMedia`**: throws during SSR/prerender. Guard with `typeof window !== 'undefined'` or put the code in `<script>`/`onMount`/`useEffect`.
- **GSAP + ScrollTrigger**: needs layout. Register on the client, wait for `document.fonts.ready` and images, then `ScrollTrigger.refresh()`. Re-run after Astro view-transition swaps (`astro:after-swap`) and clean up on `astro:before-swap`.
- **React + Motion/GSAP**: `useLayoutEffect` warns on SSR; use `useEffect` or `useGSAP` with a scope. Random IDs, `Date.now()` or `window.innerWidth` during render cause hydration mismatches.
- **Lenis**: initialize once, on the client. Don’t put it in React state, and destroy/recreate it on route swaps. Disable smooth touch if iOS feels laggy.
- **Three.js/R3F**: 185 KB gzip for `three` alone (https://bundlephobia.com/package/three@0.186.1). Use `client:only`, dynamic import, and only if the design truly needs WebGL. A canvas hero is the #1 cause of a 4-second phone load.
- **SplitText**: free since GSAP 3.13 (https://gsap.com/pricing/), but splitting Arabic/Persian by character destroys shaping. Split by line, or by word at most.
- **No-JS / reduced motion**: don’t hide content in CSS by default. Add a `js` class first, animate from `opacity: 0`, and honor `prefers-reduced-motion`.

## 3. Free-tier hosting in 2026

| | **Cloudflare (Pages / Workers Static Assets)** | **Vercel Hobby** | **Netlify Free** |
|---|---|---|---|
| **Bandwidth** | Static asset requests **free and unlimited** (https://developers.cloudflare.com/pages/functions/pricing/) | First **100 GB** fast data transfer + **1M CDN requests**/mo (https://vercel.com/docs/plans/hobby) | **300 credits**/mo; bandwidth **20 credits/GB** ⇒ ~15 GB if that’s all you use (https://www.netlify.com/pricing/) |
| **Builds** | Pages: **500 builds/mo**, 1 concurrent, 20-min timeout (https://developers.cloudflare.com/pages/platform/limits/) | **100 deployments/day**, 2 vCPU/8 GB; no published monthly build-minute meter | **15 credits per production deploy** ⇒ ~20 deploys/mo; no build-minute meter (https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/billing-faq-for-credit-based-plans/) |
| **Custom domain + SSL** | Free | Free | Free |
| **Analytics** | Cloudflare Web Analytics, free, privacy-first (https://www.cloudflare.com/web-analytics/) | **50k events/mo**, 1 month data | Included, **1-day retention** on Free |
| **Forms** | None native; Pages Functions or third-party | None native; third-party | **Netlify Forms free and unlimited** on credit plans (https://docs.netlify.com/manage/forms/usage-and-billing/) |
| **Image optimization** | Images free plan: **5,000 unique transformations/mo**; paid after (https://developers.cloudflare.com/images/pricing/). Build-time sharp is free and better here. | **5k transformations/mo**, but Next static export can’t use the default loader | Netlify Image CDN available; draws on request/bandwidth credits |
| **Edge functions** | Workers/Pages Functions: **100k requests/day** free, 10 ms CPU/invocation | 1M invocations, 4 CPU-hrs | Compute metered in credits (GB-hours) |
| **Gotchas** | 20,000 files/site and 25 MiB/file on Free; 100 `_headers` rules; new projects throttled for first 48h; Pages still works but new feature work is on Workers Static Assets (https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/) | **Hobby is non-commercial only.** “Advertising the sale of a product or service” is explicitly commercial (https://vercel.com/docs/limits/fair-use-guidelines). A freelance designer’s portfolio is commercial. Exceeding limits can pause the project for 30 days. | **All sites pause** when the 300 credits run out, until next cycle. ~20 deploys/month is tight during design iteration. Forms are free, but you’re locked to Netlify. |

**Verdict:** Cloudflare is the only free tier that combines **unlimited static bandwidth** with **no commercial-use restriction**. Vercel Hobby is technically excellent but **not compliant for a portfolio that advertises paid services**; if you want Vercel, budget Pro ($20/mo). Netlify Free is fine to launch but 20 production deploys/month will annoy you; Netlify Forms is its one real differentiator.

**Pages vs Workers:** Cloudflare Pages still works and is fully supported, but new projects should use **Workers Static Assets** (same free static bandwidth, active development, `wrangler deploy`). For a pure static site the difference is mostly the config file and dashboard.

## 4. Recommendation

**Primary stack (use this):**

- **Astro 7.4.2**, `output: 'static'`, **no React** by default.
- **Tailwind CSS 4.3.3** via `@tailwindcss/vite` (CSS-first config; no `tailwind.config.js`).
- **TypeScript 6.0.3** (not TS 7 — `@astrojs/check` 0.9.12 still peers `^5 || ^6`).
- **GSAP 3.15.0** + ScrollTrigger for choreography; **Lenis 1.3.27** for smooth scroll; both as plain bundled `<script>` code.
- **sharp 0.35.5** via `astro:assets` for build-time AVIF/WebP and responsive `srcset`.
- **Cloudflare Workers Static Assets** (Pages also fine), **Web3Forms** for contact, **Cloudflare Web Analytics**.
- **Node 24 LTS** (Astro requires `>=22.23.4`).

**Justification:** the page is content + motion, not application state. Astro ships HTML with no framework runtime, lets GSAP own the DOM, and gives you the only free image pipeline that doesn’t depend on a vendor’s transformation quota. Cloudflare gives unlimited static bandwidth with no commercial clause. The whole stack is deployable with `wrangler deploy` and has no server to maintain.

**Runner-up:** **Plain HTML/CSS/TS + Vite 8.3.5 + GSAP** (4.55). Choose it if you are certain the site stays one page, you enjoy hand-writing the document shell, and you want zero framework upgrades. Switch to Astro the moment you add case-study pages, a blog, a CMS, or more than ~10 project images that need variants.

**When to switch from Astro:**

- **SvelteKit 3** if the portfolio becomes app-like: client-side filtering, saved collections, auth, CMS preview, complex shared state. Accept that you’re now maintaining an app.
- **Next.js 16** only if you need RSC, server actions, or Vercel-specific infrastructure and will pay for Pro. Static export is not the reason to choose Next.
- **Nuxt 4** only if your team is Vue-first.

## 5. Minimal project setup

```bash
# 1. Scaffold (Node 24 LTS)
npm create astro@latest ganjimanesh-portfolio -- --template minimal --typescript strict --install --git
cd ganjimanesh-portfolio

# 2. Runtime deps
npm i astro@7.4.2 tailwindcss@4.3.3 @tailwindcss/vite@4.3.3 \
  @astrojs/sitemap@3.7.4 gsap@3.15.0 lenis@1.3.27 sharp@0.35.5

# 3. Dev/tooling deps
npm i -D @astrojs/check@0.9.12 typescript@6.0.3 wrangler@4.152.0

# 4. Optional: React island only if you actually need one
# npm i @astrojs/react@7.1.1 react@19.3.1 react-dom@19.3.1
# npm i -D @types/react@19.3.0 @types/react-dom@19.3.0
```

**`package.json` (excerpt)**

```json
{
  "name": "ganjimanesh-portfolio",
  "private": true,
  "type": "module",
  "engines": { "node": ">=22.23.4" },
  "scripts": { "dev": "astro dev", "build": "astro build", "preview": "astro preview", "check": "astro check", "deploy": "wrangler deploy" },
  "dependencies": {
    "@astrojs/sitemap": "3.7.4", "@tailwindcss/vite": "4.3.3", "astro": "7.4.2",
    "gsap": "3.15.0", "lenis": "1.3.27", "sharp": "0.35.5", "tailwindcss": "4.3.3"
  },
  "devDependencies": { "@astrojs/check": "0.9.12", "typescript": "6.0.3", "wrangler": "4.152.0" }
}
```

**`astro.config.mjs`**

```js
// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://ganjimanesh.com",
  output: "static",
  compressHTML: true, // Astro 7 defaults to 'jsx', which strips spaces between inline elements
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
  image: { layout: "constrained", responsiveStyles: true },
  fonts: [
    { provider: fontProviders.fontsource(), name: "Inter", cssVariable: "--font-inter", weights: [400, 500, 600], subsets: ["latin"], fallbacks: ["sans-serif"] },
    { provider: fontProviders.fontsource(), name: "Vazirmatn", cssVariable: "--font-vazirmatn", weights: [400, 500, 700], subsets: ["arabic", "latin"], fallbacks: ["sans-serif"] },
  ],
  build: { inlineStylesheets: "auto" },
});
```

**`tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"],
  "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["src/*"] } }
}
```

**`src/styles/global.css`** — Tailwind v4 is configured here, not in a JS file:

```css
@import "tailwindcss";
@theme inline { --font-sans: var(--font-inter), var(--font-vazirmatn), ui-sans-serif, system-ui, sans-serif; }
@theme {
  --color-ink: oklch(0.18 0.01 260);
  --color-paper: oklch(0.97 0.005 90);
  --color-accent: oklch(0.62 0.19 35);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
}
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
```

**Folder structure**

```
ganjimanesh-portfolio/
├── astro.config.mjs · package.json · tsconfig.json · wrangler.jsonc
├── public/  cv/ganjimanesh-cv.pdf · favicon.svg · og.jpg · _headers
├── src/
│   ├── pages/index.astro
│   ├── layouts/Base.astro          # head, SEO, Font, JSON-LD
│   ├── components/{Nav,Footer,ProjectCard,Reveal}.astro
│   ├── sections/{Hero,Work,About,Services,Contact}.astro
│   ├── scripts/motion.ts           # GSAP + ScrollTrigger + Lenis
│   ├── styles/global.css
│   ├── data/projects.ts
│   └── assets/{portrait.jpg,work/*.jpg}
└── references/
```

**`src/scripts/motion.ts` (minimum viable, no hydration)**

```ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const lenis = new Lenis({ duration: 1.1, smoothWheel: true, smoothTouch: false });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
await document.fonts.ready;
gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
  gsap.from(el, { y: 32, autoAlpha: 0, duration: 0.9, ease: "expo.out",
    scrollTrigger: { trigger: el, start: "top 85%", once: true } });
});
```

In `Base.astro`: `<script>import "../scripts/motion";</script>` and add a tiny inline script that sets `document.documentElement.classList.add("js")` before paint, so no-JS users still see content.

**Deploy**

```bash
# Cloudflare Workers Static Assets (recommended)
npx wrangler login
npm run build
npx wrangler deploy

# Cloudflare Pages alternative
npx wrangler pages deploy dist --project-name ganjimanesh-portfolio

# Netlify / Vercel, if you ignore the advice
npx netlify deploy --prod --dir=dist
npx vercel --prod
```

`wrangler.jsonc`:

```jsonc
{
  "name": "ganjimanesh-portfolio",
  "compatibility_date": "2026-10-23",
  "assets": { "directory": "./dist", "not_found_handling": "404-page" }
}
```

`public/_headers`:

```
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/cv/*
  Content-Disposition: inline
  Cache-Control: public, max-age=3600
```

## 6. Image and asset pipeline

- **Put processed images in `src/assets/`**, not `public/`. Astro only optimizes images under `src/`; files in `public/` are copied as-is (https://docs.astro.build/en/guides/images/). CV, favicon and OG image belong in `public/`.
- **Portrait:** `<Picture src={portrait} formats={['avif','webp']} widths={[480, 800, 1200]} sizes="(min-width: 1024px) 480px, 100vw" alt="..." loading="eager" fetchpriority="high" />`. On a 2× phone, 800–1200 px is enough. Target <120 KB AVIF.
- **Project images:** 3–4 widths (480/800/1200/1600), `loading="lazy"`, explicit width/height, `layout="constrained"`. Target <180 KB each; total initial page <900 KB.
- **Hero:** preload only the hero image and the primary font. Everything below the fold lazy-loads.
- **CV PDF:** `public/cv/ganjimanesh-cv.pdf`, 1–2 pages, <1 MB. Compress with Ghostscript (`-dPDFSETTINGS=/ebook`), strip metadata with `exiftool -all=`, and link with `<a href="/cv/..." download>`. Also offer a `/cv` HTML page for ATS and mobile readers.
- **OG image:** 1200×630 JPEG/PNG, <300 KB; set `og:image`, `og:image:width/height`, `twitter:card=summary_large_image`.
- **Build-time only.** Cloudflare’s free 5k transformations and Vercel’s 5k transformations are runtime quotas; sharp at build time is free, deterministic and cacheable (`node_modules/.astro`). Netlify’s Image CDN is convenient but meters requests/bandwidth.
- **Watch the 20k file cap.** Every `srcset` variant is a file. 40 images × 4 widths × 2 formats = 320 files; fine. Don’t generate 10 widths × 3 formats for every image.

## 7. Contact forms with no backend

| Option | Free limit | Reliability / notes |
|---|---|---|
| **Web3Forms** | **250 submissions/mo**, 30-day history, no file uploads (https://web3forms.com/pricing) | Simplest: one `access_key`, native POST, honeypot + hCaptcha. Small vendor; over-limit submissions stop. Good for a portfolio. |
| **Formspree** | **50 submissions/mo**, 30-day history, 2 emails (https://formspree.io/plans) | Most established; better dashboard/spam tooling; AJAX or native POST. 50/mo is enough for a personal site unless spam hits. |
| **Netlify Forms** | **Free and unlimited** on credit plans; legacy free 100/mo (https://docs.netlify.com/manage/forms/usage-and-billing/) | First-party and zero-JS, but only if you host on Netlify. Build-time HTML detection; honeypot/reCAPTCHA. |
| **Cloudflare Function + Resend** | 100k Worker requests/day free + **3,000 emails/mo**, 100/day (https://resend.com/pricing) | Most control and best deliverability from your own domain; needs a secret, Turnstile, and ~40 lines of code. Use if spam/volume grows. |

**Recommendation:** start with **Web3Forms** native POST, a hidden honeypot, and a `redirect` back to `/?sent=1#contact`. No JS required, works with Astro static output, and 250/mo is plenty. If you get spam or need your own sending domain, move the same form to a Cloudflare Function + Resend + Turnstile (Turnstile is free: https://developers.cloudflare.com/turnstile/plans/). Formspree is the “boring, reliable, but only 50/mo” alternative.

## 8. Risks that will bite later

1. **Framework churn.** Astro ships majors roughly annually (6 → 7 in 2026); v7’s Rust compiler is stricter about unclosed/invalid HTML. Pin exact versions, upgrade in a branch, and keep the site’s animation code in plain TS so it survives framework changes.
2. **TypeScript 7 is not ready for Astro tooling.** `@astrojs/check` 0.9.12 peers `typescript ^5 || ^6`; using TS 7.0.2 will break `astro check`. Stay on **TS 6.0.3** until the peer range updates.
3. **Hydration cost on low-end phones.** A React island adds 45–60 KB gzip plus hydration; a Three.js hero adds ~185 KB gzip. Budget <100 KB JS on first load, use `client:visible` below the fold, and test with 4× CPU throttling on a mid-range Android.
4. **Font loading / CLS.** Persian fonts are large. Use Astro’s Fonts API with `preload` only for the hero font, 2–3 weights max, `subsets: ["arabic","latin"]`, and fallback metrics. Never load six weights “just in case”.
5. **RTL breaks naive animation.** Use `dir="rtl"`/`lang="fa"`, Tailwind logical utilities (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`, `text-start`), mirror arrows/marquees, and make GSAP `x` offsets direction-aware. Do **not** split Persian text by character; use line masks.
6. **Tailwind v4 browser floor.** Safari 16.4+, Chrome 111+, Firefox 128+ (https://tailwindcss.com/docs/compatibility). If you must support older devices, use Tailwind 3.4 or provide a reduced-motion/legacy stylesheet.
7. **Image/build blow-up.** Responsive variants multiply build time and file count. Cap widths, keep source images ≤2400 px, cache `node_modules/.astro`, and watch Cloudflare’s 20k-file / 25 MiB limits.
8. **Vendor and platform traps.** Vercel Hobby’s non-commercial clause; Netlify’s 300-credit pause and ~20 deploys; Cloudflare’s shift of new feature work from Pages to Workers; Web3Forms’ over-limit hard stop. Keep a `mailto:` fallback and a static CV so the site is still useful if a third party fails.
9. **Accessibility is not optional.** Scroll-jacking, autoplay video, and hidden-until-animated text fail keyboard/screen-reader users. Provide `prefers-reduced-motion`, visible focus, semantic headings, and real links for every section.
10. **SEO for a one-pager.** Put all copy in HTML (not client JS), add `Person`/`ProfessionalService` JSON-LD, canonical, OG/Twitter tags, `sitemap-index.xml`, and `robots.txt`. A single page can rank for your name; case-study pages are what rank for “motion designer Tehran” etc.
