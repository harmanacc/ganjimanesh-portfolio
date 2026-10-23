# 02 — Animation & Interaction Stack (Oct 2026)

Research date: **2026-10-23**. Versions read from the npm registry that day; KB figures are **min+gzip** for the library code only, produced with esbuild (React/three marked external where noted), not including your app code or fonts. Verify before pinning.

## 1. The 2026 core: what to use, what it costs

| Tool | Version | License / cost | Size (min+gzip) | Framework | Use when |
|---|---|---|---|---|---|
| **GSAP** | 3.15.0 | "No charge" Webflow license — free incl. commercial; **not** for building a competing visual animation builder | core+ScrollTrigger **18.3 KB**; +SplitText **21.3 KB**; core+Flip **9.7 KB**; whole core (`export *`) 27.2 KB | any (vanilla, React via `@gsap/react` 2.1.2, Vue, Svelte) | scroll choreography, pinning, timelines, text, SVG morph, FLIP |
| GSAP **SplitText** | 3.15.0 | same free license | **3.0 KB** over core+ScrollTrigger (3.6 KB standalone) | any | line/word/char reveals, masking, built-in `aria-label` |
| GSAP **ScrollSmoother** | 3.15.0 | same | +4.6 KB over ST+Split | any | only if you accept transform-based smooth scroll (breaks `position: fixed`/sticky more than Lenis) |
| **Motion** (ex-Framer Motion) | 14.6.0 | MIT core. **Motion+ is paid: $399 one-time** (splitText, animateView, UI components); code you copy is MIT | `motion/react` full **53.1 KB**; `LazyMotion`+`m` **33.4 KB**; `useScroll`+`useTransform` only **9.5 KB**; vanilla `animate`+`scroll` **28.9 KB**; `motion/mini` animate **3.7 KB** | React, Vue, Svelte, vanilla | React islands: layout animations, `AnimatePresence`, gestures, springs. Skip for pure Astro pages |
| **Lenis** | 1.3.27 | MIT | **5.4 KB** (react wrapper 6.1 KB) | any | one-line smooth wheel scroll; keeps native scrollbar, sticky, anchors. `respectReducedMotion: true` is the **default** |
| **CSS scroll-driven animations** (`animation-timeline`, `scroll-timeline`) | baseline 2026 | free, 0 KB | **0 KB** | native | progress bars, parallax, sticky-card shrink — anything expressible as a scroll→property mapping |
| **View Transitions** (cross-document) | native | free, 0 KB | **0 KB** | native | page wipes, shared-element hero morphs. Chrome 126+/Safari 18.2+; **Firefox has no cross-document support** (same-document only since 144) |
| **Three.js** | 0.186.1 (r186) | MIT | realistic scene (renderer+scene+orbit) **142.6 KB**; WebGPU build **215.3 KB** | any | true 3D only (model, camera, lighting, depth) |
| **React Three Fiber** | 9.8.2 | MIT | **58.7 KB** on top of three (React 19 required) | React 19 | React-managed 3D scenes |
| **Drei** | 10.7.9 | MIT | per-import; `Float`+`Environment` **69.6 KB** | React 19 | helpers; import individually, `Environment` is heavy |
| **OGL** | 1.0.11 | MIT | **7.2 KB** | vanilla | one full-screen shader plane / hero distortion — 20× cheaper than three |
| **Rive** | `@rive-app/canvas` 2.45.1 | runtime MIT; editor free = **splash screen**, $9/seat/mo to remove | **73.1 KB JS + 2.1 MB WASM (863 KB gzip)** | any | complex state-machine vector interaction (character, toggle). Expensive; lazy-load only |
| **Lottie / dotLottie** | `lottie-web` 5.13.0; `@lottiefiles/dotlottie-web` 0.81.0 | MIT | lottie-web light **48.2 KB**, full 77.6 KB; **dotLottie 13.7 KB** | any | After Effects illustration loops. Prefer **dotLottie** (3.5× smaller runtime, ~90% smaller files) |
| **Anime.js v4** | 4.5.0 | MIT | **15.9 KB** | any | small one-off timelines, WAAPI-backed, no scroll plugin ecosystem |
| **AutoAnimate** | 0.10.0 | MIT | **3.2 KB** | React/Vue/Svelte/Solid/vanilla | list add/remove/reorder only; no scroll work |
| **Theatre.js** | 0.7.2 (May 2024) | core Apache-2.0, studio AGPL-3.0 | **34.6 KB** core | React/three | ⚠️ 1.0 is in a private repo since 2023 — do **not** put on a client critical path |
| **Popmotion** | 11.0.5 (Aug 2022) | MIT | — | — | ❌ unmaintained; use Motion |
| **Locomotive Scroll** | 5.0.1 | MIT | — | — | ❌ scroll-jacking; avoid |

**Licensing gotchas**
- GSAP 3.13 (Apr 2025) made every plugin free, incl. SplitText/ScrollSmoother/MorphSVG. Any commercial site is permitted; the license only forbids embedding GSAP in a *visual animation builder* competing with Webflow — https://gsap.com/standard-license
- Motion's OSS is MIT, but **`splitText`, `animateView`, Ticker, Cursor, AnimateNumber UI components are Motion+ only** ($399 once). With GSAP SplitText free, don't pay for Motion+ unless you want the component library — https://motion.dev/pricing
- Rive free tier stamps a splash screen on export; runtime is MIT. $9/seat/mo removes it — https://rive.app/pricing

## 2. Decision matrix: effect → tool → cost

| Effect | Best tool | Cost / caveat |
|---|---|---|
| Fade/slide on load, hover states | **CSS** (`@keyframes`, `transition`) | 0 KB, compositor-friendly |
| Reveal on scroll (one-shot) | **CSS + IntersectionObserver class toggle** | ~0.3 KB; do not ship GSAP for this |
| Scroll progress bar | **CSS `animation-timeline: scroll()`** | 0 KB |
| Parallax (decorative) | **CSS `animation-timeline: view()`**; GSAP only if it must sync with pins | 0 KB vs 18 KB |
| Sticky card stack | **CSS `position: sticky`** (+ optional view-timeline scale) | 0 KB |
| Marquee | **CSS keyframes**, duplicate track, `aria-hidden` on clone | 0 KB |
| Number/stat count-up | **IO + rAF** (15 lines) | ~0.3 KB |
| Hero text reveal | **GSAP SplitText** (`mask:"lines"`, `autoSplit`) | 3.6 KB + 18 KB core |
| Section pin + horizontal gallery | **GSAP ScrollTrigger** `pin` + `scrub` | 18.3 KB |
| Long editorial scroll story | **GSAP ScrollTrigger + Lenis** | 23.7 KB total |
| Page-to-page wipe | **native cross-document View Transitions** | 0 KB; Firefox no cross-doc |
| Shared-element image morph between routes | **native VT** `view-transition-name` | 0 KB; needs stable names + same aspect ratio |
| React route/modal enter-exit | **Motion** `AnimatePresence` | 33–53 KB; only inside a React island |
| List reorder/add/remove | **AutoAnimate** | 3.2 KB |
| Drag-to-scroll gallery | **CSS `overflow-x:auto` + scroll-snap**; add arrows/keyboard | 0 KB; WCAG 2.5.7 needs a non-drag path |
| Complex vector state machine (character) | **Rive** | 73 KB + 863 KB gzip WASM, lazy |
| AE illustration loop | **dotLottie** | 13.7 KB + file |
| Real 3D object / camera / materials | **three.js** or **R3F** | 142 KB+; mobile budget risk |
| Full-screen shader distortion | **OGL** custom fragment shader | 7.2 KB + textures; skip on mobile |
| SVG line draw / morph | **GSAP DrawSVG / MorphSVG** | free, 3–8 KB |
| FLIP layout change (grid↔list) | **GSAP Flip** | 9.7 KB incl. core |

**"Don't use JS for this" list:** hover/focus states, simple fades, accordions (`details` + CSS), scroll snapping, sticky headers, progress bars, marquees, gradient/noise backgrounds (CSS/SVG), image hover zoom, button press feedback, page fades. Each of these is commonly shipped as 20–50 KB of JS for no visual gain.

## 3. Performance discipline

**Budgets**
- Frame: 16.67 ms at 60 Hz, 8.3 ms at 120 Hz. Aim for **≤8 ms of main-thread work per frame** on a mid-tier Android; never exceed 50 ms in one task (long task → bad INP).
- Animate **`transform` and `opacity` only** (plus `clip-path`, `filter` sparingly). `width/height/top/left/box-shadow` trigger layout/paint every frame.
- `will-change: transform` only on elements animating *now*; remove it after. Each layer costs GPU memory (~screen-size × 4 bytes), which matters on 3–4 GB phones. `filter: blur()` / large `backdrop-filter` are per-frame fill-rate killers — cap radius, limit area, or bake into an image.
- `content-visibility: auto` + `contain-intrinsic-size` for long pages (re-check ScrollTrigger measurements); use IntersectionObserver instead of scroll listeners; if you must listen, `{passive:true}`.
- Batch reads/writes; GSAP does this. Don't read `getBoundingClientRect()` inside a scroll handler.
- SplitText: split **lines or words, not chars**, and `revert()` when the intro finishes. Splitting a 400-word page into chars creates thousands of nodes.
- Lazy 3D: `import()` on intersection or `requestIdleCallback`; `frameloop="demand"` in R3F; `dpr={[1,1.5]}`; pause on `document.hidden` and when offscreen; dispose geometry/material/textures on unmount.
- Mobile GPU/battery: textures ≤2048², no post-processing chain, cap canvas DPR at 1.5–2, no full-screen shader at DPR 3; respect `navigator.connection.saveData`; never run an infinite rAF loop for a static hero. Prefer CSS/SVG for texture and glow — a noise PNG + `mix-blend-mode` beats a shader on battery.

**Concrete pre-ship checklist**
1. Lighthouse mobile ≥95 performance, TBT <100 ms (hard fail >200 ms).
2. LCP ≤1.8 s (good ≤2.5 s), CLS <0.05, INP <200 ms in the field.
3. Initial JS on the home route ≤60 KB gzip; no three/Rive/Lottie in the entry chunk.
4. Every animation is transform/opacity or `clip-path`; no animated layout properties in the Performance panel.
5. No more than ~2 promoted layers on screen at once; `will-change` audited.
6. Scroll at 6× CPU throttle in DevTools: no frame >32 ms; pin sections don't jank.
7. `prefers-reduced-motion: reduce` test: content visible, no transforms, no smooth scroll, no autoplay.
8. Keyboard-only pass: every revealed element is visible when focused; focus ring never clipped by overflow/pin.
9. 3D/Rive/dotLottie load only when in view (check Network: not on first load).
10. Airplane mode after first load: no animation-dependent blank sections; heap stable after 10 route transitions.
11. Test on a real mid-tier Android (or 4× throttle) — emulated desktop GPU lies; audit promoted layers in the Performance panel.

**Lighthouse mobile targets (lab)**

| Metric | Target | "Good" threshold |
|---|---|---|
| Performance score | ≥95 | 90–100 green |
| FCP | ≤1.2 s | ≤1.8 s |
| LCP | ≤1.8 s | ≤2.5 s |
| TBT | ≤100 ms | ≤200 ms |
| CLS | ≤0.05 | ≤0.1 |
| Speed Index | ≤2.5 s | ≤3.4 s |

Field targets (CrUX 75th pct): LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1.

## 4. Accessibility (WCAG 2.2)

- **2.3.3 Animation from Interactions (AAA)** — interaction-triggered motion must be disableable; `prefers-reduced-motion` is the accepted mechanism.
- **2.2.2 Pause, Stop, Hide (A)** — any auto-playing motion lasting >5 s (marquee, autoplay video, looping Lottie) needs a pause control or must stop. Marquees are the usual failure.
- **2.3.1 Three Flashes (A)** — no flashing >3×/s; watch strobe transitions and rapid scramble text.
- **2.4.7 Focus Visible (AA)** and **2.4.11 Focus Not Obscured (AA, new in 2.2)** — sticky headers, pinned sections, and cookie bars must not cover the focused element. `scroll-margin-top` on focusables; don't pin over the nav.
- **2.5.7 Dragging Movements (AA, new)** — drag-to-scroll galleries and custom-cursor drag need a single-pointer alternative (arrows, keyboard, scroll-snap).
- **2.5.8 Target Size Minimum (AA, new)** — 24×24 CSS px for interactive targets; custom cursor "magnetic" targets often shrink hit areas. Use a pseudo-element to expand the hit area, not the visual.
- **1.4.4 Resize Text / 1.4.10 Reflow / 1.4.12 Text Spacing** — split text must survive 200% zoom and increased line-height; avoid `text-wrap: balance` on split headings (GSAP explicitly warns it breaks splitting).
- **4.1.3 Status Messages** — count-up stats and filter results should be in a live region *only if* they change without focus; don't announce every frame.

**Reduced motion, done right**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important;
    transition-duration: .01ms !important; scroll-behavior: auto !important; }
}
```
Plus a JS branch for GSAP/WebGL (CSS alone can't stop `gsap.to` or a rAF loop): `if (reduce.matches) gsap.set("[data-reveal]", { opacity: 1, clearProps: "transform" });`
Lenis already honours the setting (`respectReducedMotion` defaults to `true`), and Astro's ClientRouter disables view transitions under reduced motion.

**Scroll-jacking harms** — hijacking wheel/touch breaks: spacebar/PageDown, Home/End, find-in-page scroll-to-match, anchor links, scrollbar dragging, and screen-reader virtual cursor navigation. Lenis is the least harmful option because it keeps native scroll and the scrollbar; it only smooths wheel input. Avoid full transform-based hijackers (Locomotive, custom `translate3d` body scrollers). Never take over arrow keys. Always keep `overflow` scrollable and `:target` anchors working.

**Custom cursor rules** — only on `(pointer:fine)`, never `cursor:none` without a visible replacement, hide the custom cursor on `blur`/leave, keep the native caret in inputs, and never rely on cursor proximity for information. Keyboard focus styles are non-negotiable.

## 5. Signature patterns (cheap → impressive)

### 1. Staggered line reveal — GSAP SplitText
```js
import { SplitText } from "gsap/SplitText";
SplitText.create("[data-split]", {
  type: "lines", mask: "lines", autoSplit: true,
  onSplit: (self) => gsap.from(self.lines, {
    yPercent: 110, duration: 1.05, ease: "expo.out", stagger: 0.07
  })
});
```
`mask:"lines"` gives the overflow-clip reveal for free; `autoSplit` re-splits after fonts load/resize. Don't split `chars` on body copy. `revert()` after the hero animation.

### 2. Pinned horizontal gallery — ScrollTrigger
```js
const track = document.querySelector(".track");
gsap.to(track, {
  x: () => -(track.scrollWidth - innerWidth), ease: "none",
  scrollTrigger: {
    trigger: ".gallery", start: "top top", pin: true, scrub: 1,
    end: () => "+=" + (track.scrollWidth - innerWidth), invalidateOnRefresh: true
  }
});
```
Wrap in `gsap.matchMedia().add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", …)`; on mobile fall back to `overflow-x:auto; scroll-snap-type:x mandatory`. Pinning is the #1 CLS/jank source — always `invalidateOnRefresh` and refresh after images.

### 3. Magnetic cursor — `gsap.quickTo`
```js
const fine = matchMedia("(pointer:fine)").matches
  && !matchMedia("(prefers-reduced-motion: reduce)").matches;
if (fine) {
  const x = gsap.quickTo(".cursor", "x", { duration: .35, ease: "power3" });
  const y = gsap.quickTo(".cursor", "y", { duration: .35, ease: "power3" });
  addEventListener("pointermove", (e) => { x(e.clientX); y(e.clientY); }, { passive: true });
  document.querySelectorAll("[data-magnetic]").forEach((el) => {
    const mx = gsap.quickTo(el, "x", { duration: .4, ease: "power3" });
    const my = gsap.quickTo(el, "y", { duration: .4, ease: "power3" });
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      mx((e.clientX - r.left - r.width / 2) * .25);
      my((e.clientY - r.top - r.height / 2) * .25);
    });
    el.addEventListener("pointerleave", () => gsap.to(el, {
      x: 0, y: 0, duration: .6, ease: "elastic.out(1,.4)", overwrite: "auto" }));
  });
}
```
Guard with `pointer:fine`; keep the real hit area (min 24 px) and a focus ring. Cursor element: `position:fixed; top:0; left:0; translate:-50% -50%; pointer-events:none`.

### 4. Marquee + scroll-velocity skew
```css
.marquee__track { display: flex; width: max-content; animation: marquee 28s linear infinite; }
@keyframes marquee { to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) { .marquee__track { animation: none; } }
```
```js
const skew = gsap.quickTo(".marquee__track", "skewX", { duration: .4, ease: "power2" });
ScrollTrigger.create({ onUpdate: (self) =>
  skew(gsap.utils.clamp(-10, 10, self.getVelocity() / -180)) });
```
Duplicate the list once and `aria-hidden="true"` the clone. Pause on hover/focus-within.

### 5. Clip-path image reveal — CSS + IO
```css
.reveal img { clip-path: inset(0 0 100% 0); transform: scale(1.08);
  transition: clip-path .9s cubic-bezier(.77,0,.18,1), transform 1.2s cubic-bezier(.77,0,.18,1); }
.reveal.is-in img { clip-path: inset(0); transform: scale(1); }
```
```js
const io = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
}), { threshold: .25 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
```
0 KB of animation library; also works with `@starting-style` for dialogs/accordions.

### 6. Page-transition wipe — native View Transitions
```css
@media (prefers-reduced-motion: no-preference) {
  @view-transition { navigation: auto; }
  ::view-transition-old(root) { animation: none; }
  ::view-transition-new(root) { animation: wipe .55s cubic-bezier(.77,0,.18,1) both; }
  @keyframes wipe { from { clip-path: inset(0 0 100% 0); } }
}
```
0 KB JS, works on every same-origin MPA navigation in Chromium/Safari. Add `view-transition-name: hero` to the same image on both pages for a shared-element morph (keep identical aspect ratio to avoid warping). Firefox falls back to an instant navigation.

### 7. Parallax layers — CSS scroll-driven
```css
@supports (animation-timeline: view()) {
  .parallax { animation: parallax linear both; animation-timeline: view(); animation-range: cover; }
  @keyframes parallax { from { translate: 0 12%; } to { translate: 0 -12%; } }
}
@media (prefers-reduced-motion: reduce) { .parallax { animation: none; } }
```
Runs off the main thread. Layer 2–3 depths max; more reads as fake. Do **not** combine with Lenis if you want the compositor benefit.

### 8. Stat count-up — IO + rAF
```js
const reduce = matchMedia("(prefers-reduced-motion: reduce)");
const io = new IntersectionObserver(([e]) => {
  if (!e.isIntersecting) return; io.disconnect();
  const el = e.target, end = +el.dataset.count, t0 = performance.now(), dur = 1100;
  if (reduce.matches) { el.textContent = end.toLocaleString(); return; }
  const tick = (t) => {
    const p = Math.min(1, (t - t0) / dur), eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(end * eased).toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}, { threshold: .6 });
document.querySelectorAll("[data-count]").forEach((el) => io.observe(el));
```
Set `font-variant-numeric: tabular-nums` so digits don't jiggle.

### 9. Sticky card stack — pure CSS (+ optional scroll-driven scale)
```css
.stack { display: grid; gap: 1.25rem; }
.card { position: sticky; top: 14vh; }
.card:nth-child(2) { top: 17vh; }  /* slight offset = visible stack edges */
@supports (animation-timeline: view()) {
  .card { animation: shrink linear both; animation-timeline: view();
          animation-range: entry 0% cover 45%; }
  @keyframes shrink { from { scale: .94; opacity: .6; } to { scale: 1; opacity: 1; } }
}
```
No JS, no layout thrash, and it keeps working with keyboard scrolling.

### 10. Hero WebGL distortion — only if the concept needs it
Use **OGL (7.2 KB)**, one full-screen triangle, a fragment shader sampling a WebP, mouse uniform lerped in rAF. Cap DPR at 1.5, pause when `document.hidden` or offscreen, and ship a static WebP fallback that is also the LCP image.
```js
import { Renderer, Program, Triangle, Mesh, Vec2 } from "ogl";
const r = new Renderer({ dpr: Math.min(devicePixelRatio, 1.5), alpha: true });
const gl = r.gl, geometry = new Triangle(gl);
const program = new Program(gl, { vertex, fragment,
  uniforms: { uTime: { value: 0 }, uMouse: { value: new Vec2() } } });
const mesh = new Mesh(gl, { geometry, program });
r.setSize(innerWidth, innerHeight);
(function loop(t) { program.uniforms.uTime.value = t / 1000; r.render({ scene: mesh }); requestAnimationFrame(loop); })(0);
```
Verdict: a still + CSS `filter`/mask gets 80% of the effect at 0 KB. Full three.js for a *distortion* is 20× the code and 142 KB — only justified if there is real geometry/camera interaction.

## 6. Integration recipe — Astro 7 + islands

**Decision: start with native cross-document VT, not `<ClientRouter />`.** Native VT is 0 KB and full page reloads mean GSAP/Lenis need no teardown at all. Astro's own docs now say `ClientRouter` "will increasingly become unnecessary" (https://docs.astro.build/en/guides/view-transitions/). Use `ClientRouter` only if you need persistent state across routes (audio player, saved filters) or transitions in Firefox.

**Layout head (no FOUC)**
```astro
<script is:inline>document.documentElement.classList.add("js")</script>
<style is:global>
  html.js [data-reveal] { opacity: 0; }
  @media (prefers-reduced-motion: reduce) { html.js [data-reveal] { opacity: 1; } }
</style>
```
Then animate or set each element to its visible state from JS (`gsap.to(el, { opacity: 1, y: 0 })`), and add a 3 s failsafe that reveals everything if the animation module fails to load. Never leave content hidden behind a class that only JS can remove.

**Lenis + GSAP, one ticker** (from the Lenis README, https://github.com/darkroomengineering/lenis)
```js
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({ autoRaf: false, anchors: true, stopInertiaOnNavigate: true });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```
Don't also call `ScrollTrigger.normalizeScroll()` — pick one scroll owner. Skip Lenis entirely on `(pointer:coarse)` if you want maximum mobile fidelity.

**Cleanup on client-router navigation** (only if using `<ClientRouter />`)
```js
let ctx, lenis;
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const tick = (time) => lenis?.raf(time * 1000);

function init() {
  ctx = gsap.context(() => { /* page-scoped tweens + ScrollTriggers */ }, document.body);
  if (!reduce) {
    lenis = new Lenis({ autoRaf: false, anchors: true, stopInertiaOnNavigate: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0);
  }
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}
function destroy() {
  gsap.ticker.remove(tick); lenis?.destroy(); lenis = null;
  ctx?.revert(); ctx = null;            // reverts tweens + kills their ScrollTriggers
  ScrollTrigger.getAll().forEach((t) => t.kill()); // belt-and-braces
}
document.addEventListener("astro:page-load", init);
document.addEventListener("astro:before-swap", destroy);
```
Bundled Astro module scripts execute **once**, so the `astro:page-load` listener must be registered at module top level — not inside another load handler. `transition:persist` islands keep their own state and must not be re-initialised.

**React islands (differences)**
- GSAP: `useGSAP(() => { … }, { scope: ref })` from `@gsap/react` 2.1.2 handles revert automatically. Register once: `gsap.registerPlugin(useGSAP, ScrollTrigger)`.
- Motion: `<MotionConfig reducedMotion="user">` + `LazyMotion features={domAnimation}` + `m.*` components → 33 KB instead of 53 KB. `AnimatePresence` only works inside one island; it cannot animate across Astro page navigations.
- R3F: hydrate `client:only="react"` (no SSR), wrap in `<Suspense>`, set `frameloop="demand"` and `dpr={[1,1.5]}`, and dynamically `import()` the canvas when its section is near the viewport.
- All islands are separate React roots; share nothing but the DOM. Put global scroll behaviour in a vanilla `<script>`, not in an island.

**Avoiding double-init** — guard any global with `if (window.__motionInit) return; window.__motionInit = true;` (Astro inline scripts can re-run; module scripts don't). Refresh ScrollTrigger after fonts, images, and any accordion open: `ScrollTrigger.refresh()`.

## 7. Tiered plan

**MVP — week 1 (ship-able, ≤25 KB gzip)**
1. CSS design system: easing tokens, durations (150/300/600 ms), `prefers-reduced-motion` block.
2. GSAP core + ScrollTrigger + SplitText, one `motion.js` entry (~22 KB gzip).
3. Hero line reveal (pattern 1), image clip reveals (5), count-up (8), CSS marquee (4).
4. Native page transitions with a simple crossfade (no wipe yet), 0 KB.
5. Lighthouse mobile ≥95; reduced-motion and keyboard pass.

**Enhanced — week 2 (+15 KB)**
6. Lenis smooth scroll + GSAP ticker (~5 KB), desktop only.
7. Pinned horizontal project strip (2) with mobile scroll-snap fallback.
8. Magnetic cursor on desktop (3) + sticky card stack (9).
9. Velocity skew marquee, page wipe (6), shared-element project image morph.
10. Add OGL hero distortion only if the art direction demands it (7 KB + texture), with static fallback.

**Stretch (only after the above is green)**
11. Three.js/R3F case-study scene, lazy-loaded on intersection (142 KB+); `frameloop="demand"`.
12. Rive state-machine character/mascot (863 KB gzip WASM) for one interactive moment — lazy, behind a click.
13. Scroll-driven SVG path draw / morph for the about section.
14. Motion-powered React island for a filterable gallery with layout animations (33 KB), if the gallery genuinely needs shared layout transitions.
15. View-transition "types" (`pageswap`/`pagereveal`) for directional forward/back wipes.

**Rule:** each tier must keep initial JS ≤60 KB gzip and Lighthouse mobile ≥95. If a stretch item breaks either, it ships behind an interaction or not at all.

## Sources

- GSAP 3.15 — https://gsap.com/blog/3-15 · license — https://gsap.com/standard-license · SplitText — https://gsap.com/docs/v3/Plugins/SplitText
- Motion 14.6 — https://motion.dev/changelog · Motion+ pricing — https://motion.dev/pricing · reduced motion — https://motion.dev/docs/react-accessibility
- Lenis (GSAP recipe, options) — https://github.com/darkroomengineering/lenis
- Astro view transitions — https://docs.astro.build/en/guides/view-transitions/
- MDN `@view-transition` — https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@view-transition · Chrome cross-document VT — https://developer.chrome.com/docs/web-platform/view-transitions/cross-document
- MDN BCD 8.1.7: `startViewTransition` Chrome 111/Safari 18/Firefox 144; `animation-timeline` Chrome 115/Safari 26/Firefox 159 · Firefox 159 beta notes (scroll-driven animations, ships 2026-10-27) — https://www.firefox.com/en-US/firefox/159.0beta/releasenotes
- R3F v9 / React 19 — https://r3f.docs.pmnd.rs/tutorials/v9-migration-guide
- Rive pricing — https://rive.app/pricing · dotLottie — https://dotlottie.io/intro · Lottie size study — https://lottiefiles.com/blog/working-with-lottie-animations/optimize-lottie-files-for-faster-page-load-speeds
- WCAG 2.2: 2.3.3 — https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions · 2.5.7 — https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements · 2.5.8 — https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum
- Lighthouse scoring — https://developer.chrome.com/docs/lighthouse/performance/performance-scoring · Web Vitals — https://web.dev/articles/vitals
- Cloudflare Pages limits (25 MiB/file, 20k files) — https://developers.cloudflare.com/pages/platform/limits/
