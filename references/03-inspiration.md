# Design Inspiration & Content Structure

Research for an award-worthy personal portfolio for a creative professional. Compiled 2026-10-23.
All 25 reference URLs below returned HTTP 200 on that date. Award facts link to Awwwards' annual results.
Recent (2024–26) anchors include Igloo Inc (2024 SOTY), Lando Norris (2025 SOTY), and Olivier Larose's 2026 portfolio; older references are included where their pattern is still the one being copied.
**Buildability scale (static site):** 5 = plain HTML/CSS, no JS required · 4 = static + light JS · 3 = animation library or asset pipeline · 2 = heavy motion, custom media · 1 = bespoke WebGL/3D production.

---

## 1. Reference sites worth studying

### Editorial / minimal

| # | Site | For whom | What to steal | Build |
|---|------|----------|---------------|-------|
| 1 | [rauno.me](https://rauno.me) | Rauno Freiberg, interaction designer (Vercel) | Single narrow column; year-grouped timeline index; hairline rules; micro-labels in mono; red/blue used only on links; copy that states a craft philosophy ("Make it fast. Make it beautiful."). Theme toggle is instant, no transition flash. | 5 |
| 2 | [paco.me](https://paco.me) | Paco Coursey, design engineer (Linear) | Résumé-as-portfolio: Building / Projects / Writing / Now / Connect as one scroll. Project entries are 2-line specs, not cards. A real "Now" paragraph. ⌘K command menu as a power-user affordance. | 5 |
| 3 | [emilkowal.ski](https://emilkowal.ski) | Emil Kowalski, design engineer (Linear) | Warm off-white `#fdfdfc` on ink `#21201c`; a dated "Today" status line; project list where each link states the outcome ("Sonner — an opinionated toast component"); writing list doubles as proof of thinking. | 5 |
| 4 | [niccolomiranda.com](https://www.niccolomiranda.com) | Niccolò Miranda, interactive designer, Amsterdam | "Paper Portfolio": bone `#cdc6be` canvas; index rows with year/client; hover and drag reveal large image plates; oversized self-description broken across lines; filter chips; deliberate paper texture. The best index-as-interface model here. | 4 |
| 5 | [instrument.com](https://www.instrument.com) | Instrument, design & technology company | Editorial grid at billboard scale; peach `#fdedd3`, orange `#fb6b39`, lilac `#dbbdf1` as full-bleed section fields; serif/sans/italic mix; case-study cards labelled client + capability; a "Recent Recognition" strip that adds proof without a brag page. | 3 |

### Dark cinematic

| # | Site | For whom | What to steal | Build |
|---|------|----------|---------------|-------|
| 6 | [igloo.inc](https://www.igloo.inc) | Igloo Inc. (Pudgy Penguins), Awwwards [Site of the Year 2024](https://www.awwwards.com/annual-awards-2024/site-of-the-year) | One continuous 3D world with scroll-driven camera instead of sections; ice-blue palette; one clear entry CTA that never competes with the scene; hover micro-interactions. Study the [case study](https://www.awwwards.com/igloo-inc-case-study.html) for how they budgeted the 3D payload. | 1 |
| 7 | [landonorris.com](https://landonorris.com) | Lando Norris, F1 driver, Awwwards [Site of the Year 2025](https://www.awwwards.com/annual-awards-2025/site-of-the-year) | Acid `#d2ff00` on near-black `#101400`; the "ON TRACK / OFF TRACK" duality as actual content architecture; telemetry numerals as display type; full-bleed crops that change rhythm every screen. | 2 |
| 8 | [kokoro.co](https://www.kokoro.co) | Kokoro Hospitality, Japanese heritage properties | Near-black olive `#1b1d16`; tall cinematic crops; quiet serif captions; property storytelling with location metadata; slow cross-fades and almost no UI chrome. | 4 |
| 9 | [lerandom.art](https://www.lerandom.art) | Le Random, digital generative art institution | Bone `#efe9d8` + vermilion `#ff4c00` + deep teal `#0a1b21`; museum-style Collection / Artists / Timeline nav; artwork plates with tombstone captions (title, artist, year, medium); a scrollable generative-art timeline. | 4 |
| 10 | [daviduzochukwu.com](https://www.daviduzochukwu.com) | David Uzochukwu, photographer | Name set monumentally; "bodies of work" index with year ranges; edge-to-edge image sequences with no frames; warm ochre `#f3c073` accents on near-black; almost zero interface — images do the talking. | 4 |

### Playful / brutalist

| # | Site | For whom | What to steal | Build |
|---|------|----------|---------------|-------|
| 11 | [studiofeixen.ch](https://www.studiofeixen.ch) | Studio Feixen, Swiss graphic design | Custom display face as the brand; saturated primaries on off-white; poster wall with mixed aspect ratios; type treated as image; playful cursor/shape behaviour; "Space / Surface / Time" as an unusual nav. | 3 |
| 12 | [are.na](https://are.na) | Are.na, knowledge platform | Radical plainness: system sans, gray rules, dense rows, no hero image. Channels as a model for curated project collections. Proof that information architecture can be the aesthetic. | 5 |
| 13 | [maggieappleton.com](https://www.maggieappleton.com) | Maggie Appleton, design technologist and visual essayist | Hand-drawn illustration system on warm paper; a "digital garden" taxonomy (Garden / Essays / Notes / Patterns / Now) instead of Work/About; essay cards with reading time; personality without a single 3D asset. | 4 |
| 14 | [joshwcomeau.com](https://www.joshwcomeau.com) | Josh Comeau, front-end educator | Illustrated hero with personality; pastel-on-dark interactive widgets; course/product cards; first-person, friendly voice; hover physics that reward curiosity. | 3 |
| 15 | [amygoodchild.com](https://www.amygoodchild.com) | Amy Goodchild, generative artist | Algorithmic and plotter work as the visual system; art-first index with medium/edition metadata; a shop folded into the same grid; restrained chrome so the work carries colour; an about written as a practice, not a CV. | 4 |

### 3D / WebGL

| # | Site | For whom | What to steal | Build |
|---|------|----------|---------------|-------|
| 16 | [bruno-simon.com](https://bruno-simon.com) | Bruno Simon, creative developer | Portfolio as a playable low-poly world; physics-based controls; an obvious start affordance and keyboard fallback; the same projects also exist as plain links. The benchmark for "game, but still a portfolio". | 1 |
| 17 | [lusion.co](https://www.lusion.co) | Lusion, 3D/interactive studio | Dark cinematic WebGL hero with fluid/particle simulation; oversized sans headline layered over canvas; project cards that preview motion; static poster fallback at first paint. | 1 |
| 18 | [monogrid.com](https://www.monogrid.com) | Monogrid, digital studio | A single electric blue `#0000ff` accent on monochrome; 3D scenes used as transitions rather than decoration; very few labels; disciplined scroll choreography instead of many effects. | 1 |
| 19 | [olivierlarose.com](https://www.olivierlarose.com) | Olivier Larose, design engineer, Montreal (2026 portfolio) | Off-white `#ebebeb` canvas; "Selected projects" grid with motion/WebGL thumbnails; PP Editorial New + PP Mondwest mixing; a tutorial library that doubles as credibility. | 3 |
| 20 | [activetheory.net](https://activetheory.net) | Active Theory, creative digital experiences | Dark full-screen WebGL stage; versioning ("V6") as content; multiplayer/AI flourishes; loading choreography as brand. Copy the pacing, not the payload. | 1 |

### Motion-first

| # | Site | For whom | What to steal | Build |
|---|------|----------|---------------|-------|
| 21 | [unseen.co](https://www.unseen.co) | Unseen Studio, brand/digital/motion, UK | Sound-gated entry with an explicit "Enter without audio" choice (accessible pattern); Neue Montreal + Saol Display; numbered index; drag-to-explore project world; sticky "Say hello" footer. | 2 |
| 22 | [plus-ex.com](https://www.plus-ex.com) | Plus X, Japanese creative partner | Monochrome; billboard-scale type; abrupt cuts; horizontal project browsing; Japanese/Latin type mixing; UI reduced to almost nothing. | 2 |
| 23 | [antfood.com](https://www.antfood.com) | Antfood, sonic branding | Black + amber `#eeb300`; sound-first interactions with a visible mute control; waveform/visualiser motifs; projects labelled by discipline; footer as a contact billboard. | 3 |
| 24 | [buck.co](https://www.buck.co) | BUCK, global creative company | Motion-led hero; work grid led by bold client names; motion previews on hover; playful case-study headlines; generous white space around dense motion work. | 3 |
| 25 | [ordinaryfolk.co](https://www.ordinaryfolk.co) | Ordinary Folk, motion studio, Vancouver | Warm taupe `#b7b5a9` + black; oversized wordmark; showreel with a sound-off poster; case studies led by motion stills; tiny meta labels for role/year. | 3 |

---

## 2. Structural patterns that recur (and which convert)

### Hero archetypes

1. **Identity + proof (highest conversion).** Name, discipline, location, one outcome, availability, email. Used by rauno.me, paco.me, emilkowal.ski. Converts because a recruiter can answer "who is this, what do they do, can I hire them" in under five seconds.
2. **Index-as-hero.** The work list is the first screen (niccolomiranda.com, daviduzochukwu.com). Great for visual portfolios with 8+ strong pieces; weaker when the work needs context.
3. **Full-bleed spectacle.** 3D scene or film fills the viewport (igloo.inc, lusion.co). Wins juries, loses hiring managers unless a text layer states role and contact above the fold.
4. **Work-first mosaic.** A grid of 3–6 crops with client names (instrument.com, buck.co). Good for studios; for an individual, add a one-line role statement so the grid is not anonymous.
5. **Playground/object.** A toy or interactive scene is the portfolio (bruno-simon.com, amygoodchild.com). Memorable, but needs a conventional path underneath.

**Rule:** award juries reward concept and craft; hiring managers reward specificity. The sites that convert do both: spectacle in the first viewport, a plain-text "what I do / selected outcomes / contact" layer within one scroll.

### Navigation

- 4–6 visible text items beat a hamburger on desktop. The reliable set: **Work, About, Writing/Notes, Contact** (+ optional Play/Archive).
- Persistent small header with a monogram; current section indicated by weight or a dot, not colour alone.
- Numbered index (01–08) gives orientation in long pages and reads as editorial.
- A ⌘K palette (paco.me) is a delightful secondary path, never the only one.
- Hidden navigation hurts discoverability — NN/g's [hidden-navigation study](https://www.nngroup.com/articles/hidden-navigation-methodology) is the citation to keep handy.
- Avoid "Explore", "Universe", "Manifesto", "Selected Experiments" as primary labels; they are mystery meat.

### Work grid vs case-study flow

Use three tiers, not one:

| Tier | Count | Format | Job |
|------|-------|--------|-----|
| Index | 8–12 | Row: thumbnail, title, client, year, role tag | Scannability, breadth |
| Selected | 3–5 | Half/full-bleed plate + 30-word outcome | Curatorial point of view |
| Case study | 2–3 | Problem → constraints → role → process → outcome → credits | Depth, interview ammunition |

If you use a hero carousel at all, treat [Baymard's 10 UX requirements](https://baymard.com/research-articles/homepage-carousel) as a floor; a static grid almost always scans better.

Index rows should be readable without images loading. Case studies: 800–1,200 words, 6–9 images, 60–90 seconds to skim, outcome stated in the first paragraph and repeated in the caption. Put team credits and your specific role near the top — "we" without a role reads as inflated.

### About page framing

Three working modes:

- **Practitioner:** "I design [X] for [Y]. Currently [role] at [place]. Previously [credibility]."
- **Point of view:** three beliefs about the craft, each with a concrete example. This is what peers remember.
- **Person:** a place, a non-work obsession, a current question. One paragraph, not a memoir.

Award portfolios tend to under-write About. Hiring managers want scope, stack, collaboration style, timezone, and availability. Include a downloadable CV and a real photo; skip the "passionate about creating meaningful experiences" opener.

### "Currently" sections

A dated 1–3 line status block ("Today: designing X at Y; reading Z; open to Q3 projects") signals a living site and gives return visitors a reason to care. Emil Kowalski and Paco Coursey both do this well. Update monthly; stale dates are worse than no date.

### Contact CTAs

- Put the email address as selectable text, not only a form or an icon. `mailto:` with a prefilled subject lowers friction.
- State response time and booking window ("Replies within 2 working days; booking November–January").
- Repeat contact in the footer; never make it a separate page.
- A form is optional; if used, 3 fields maximum and a visible fallback email.

### Footer easter eggs

Local time, weather, now-playing, a colophon (typefaces, stack, hosting), "last updated", keyboard shortcuts, a secret Konami code. They reward the curious and cost little. Keep them **below** the contact CTA and never let them replace it.

**Converts to interviews:** role clarity, named outcomes, process evidence, availability, fast contact.
**Only looks pretty:** unlabeled spectacle, endless smooth scroll, hidden nav, "let's create something amazing".

---

## 3. Typography

### 10 free pairings (Google Fonts = OFL; Fontshare = free commercial license, not open source)

| # | Display | Body | Links | Why it works | Best for |
|---|---------|------|-------|--------------|----------|
| 1 | Instrument Serif | Instrument Sans | [Serif](https://fonts.google.com/specimen/Instrument+Serif) · [Sans](https://fonts.google.com/specimen/Instrument+Sans) | High-contrast display against a neutral grotesque; designed as a family | Editorial, photography, architecture |
| 2 | Fraunces | General Sans | [Fraunces](https://fonts.google.com/specimen/Fraunces) · [General Sans](https://www.fontshare.com/fonts/general-sans) | Warm, slightly wonky serif (`opsz`, `SOFT`, `WONK`) with a calm sans | Personal story, craft, food/culture |
| 3 | Bricolage Grotesque | Newsreader | [Bricolage](https://fonts.google.com/specimen/Bricolage+Grotesque) · [Newsreader](https://fonts.google.com/specimen/Newsreader) | Contemporary, slightly irregular display + readable long-form serif | Design studio, cultural projects |
| 4 | Clash Display | Satoshi | [Clash](https://www.fontshare.com/fonts/clash-display) · [Satoshi](https://www.fontshare.com/fonts/satoshi) | Fashion-grade geometric display with a clean UI sans | Fashion, motion, bold personal brands |
| 5 | Cabinet Grotesk | Bespoke Serif | [Cabinet](https://www.fontshare.com/fonts/cabinet-grotesk) · [Bespoke](https://www.fontshare.com/fonts/bespoke-serif) | Friendly grotesque + warm serif; less default than Inter | Studio, illustration, branding |
| 6 | Unbounded | Manrope | [Unbounded](https://fonts.google.com/specimen/Unbounded) · [Manrope](https://fonts.google.com/specimen/Manrope) | Wide, techy display with an even, modern body | 3D, product, WebGL |
| 7 | Anton | Inter Tight | [Anton](https://fonts.google.com/specimen/Anton) · [Inter Tight](https://fonts.google.com/specimen/Inter+Tight) | Poster impact; Anton only at large sizes, Inter Tight for UI | Brutalist, music, events |
| 8 | Syne | Work Sans | [Syne](https://fonts.google.com/specimen/Syne) · [Work Sans](https://fonts.google.com/specimen/Work+Sans) | Quirky art-school display + dependable body | Art direction, experimental |
| 9 | Bodoni Moda | Figtree | [Bodoni](https://fonts.google.com/specimen/Bodoni+Moda) · [Figtree](https://fonts.google.com/specimen/Figtree) | Luxury contrast + soft geometric sans; use Bodoni at 48px+ | Fashion, beauty, premium |
| 10 | Space Grotesk | IBM Plex Mono | [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) · [Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) | Technical, design-engineer energy; mono for labels only | Dev/design hybrid, product |

Alternates worth knowing: [Gambetta](https://www.fontshare.com/fonts/gambetta) + [Switzer](https://www.fontshare.com/fonts/switzer), [Libre Caslon Display](https://fonts.google.com/specimen/Libre+Caslon+Display) + [Public Sans](https://fonts.google.com/specimen/Public+Sans), [Melodrama](https://www.fontshare.com/fonts/melodrama) + [Erode](https://www.fontshare.com/fonts/erode), [Gilda Display](https://fonts.google.com/specimen/Gilda+Display) + [Jost](https://fonts.google.com/specimen/Jost).

### Variable font tips

- Load one variable file per family, not 6 static weights. Declare `font-weight: 100 900;` in `@font-face`.
- Use `font-optical-sizing: auto` where the family has an `opsz` axis (Fraunces, Newsreader, Bodoni Moda).
- Reserve `font-variation-settings` for axes CSS doesn't expose (`SOFT`, `WONK`); plain `font-weight` is more robust and animatable.
- Subset aggressively (Latin, Latin-ext, Arabic separately), `font-display: swap`, preload only the hero face, and set a `size-adjust` fallback to avoid CLS. See [web.dev on variable fonts](https://web.dev/articles/variable-fonts) and [Google Fonts' guide](https://fonts.google.com/knowledge/using_type/using_variable_fonts_in_css).
- Never rely on `font-synthesis` for bold/italic; it looks cheap and breaks Arabic joining.

### Fluid type scale

```css
:root {
  --step--1: clamp(0.78rem, 0.75rem + 0.15vw, 0.875rem);
  --step-0:  clamp(1rem,    0.96rem + 0.20vw, 1.125rem);
  --step-1:  clamp(1.25rem, 1.15rem + 0.50vw, 1.50rem);
  --step-2:  clamp(1.56rem, 1.35rem + 1.05vw, 2.25rem);
  --step-3:  clamp(1.95rem, 1.55rem + 2.00vw, 3.375rem);
  --step-4:  clamp(2.44rem, 1.70rem + 3.70vw, 5.06rem);
  --display: clamp(3.50rem, 1.00rem + 11vw,  12rem);
}
body { font-size: var(--step-0); line-height: 1.55; }
h1   { font-size: var(--display); line-height: 0.92; letter-spacing: -0.02em; text-wrap: balance; }
.fa  { line-height: 1.85; }
```

Rules: body never below 16px; measure 60–75ch Latin, 45–55ch Persian; display lines max 2 at desktop; test at 200% zoom and 360px width. The scale ratio is ~1.25 — enough contrast for hierarchy without a jumpy page.

### Persian / Arabic options (for a bilingual build)

| Font | Source | License | Use |
|------|--------|---------|-----|
| [Vazirmatn](https://fonts.google.com/specimen/Vazirmatn) | [GitHub](https://github.com/rastikerdar/vazirmatn) | OFL | Body/UI, variable 100–900; Latin is Roboto-based |
| [Estedad](https://fonts.google.com/specimen/Estedad) | [GitHub](https://github.com/aminabedi68/Estedad) | OFL | Variable display + body; compact, screen-optimised |
| [Kalameh](https://fontiran.com/fonts/kalameh/) | Fontiran | Free download; verify commercial web license | Display headlines, geometric |
| [Morabba](https://fontiran.com/fonts/morabba/) | Fontiran | Free download; verify license | Bold display, poster |
| [Peyda](https://fontiran.com/fonts/peyda/) | Fontiran | Free download; verify license | Modern body/UI |
| [Shabnam](https://github.com/rastikerdar/shabnam-font) | GitHub | OFL (archived) | Reliable body text |
| [Lalezar](https://fonts.google.com/specimen/Lalezar) | Google Fonts | OFL | Loud display, single weight |
| [Gulzar](https://fonts.google.com/specimen/Gulzar) | Google Fonts | OFL | Nastaliq; poetry/quotes only |
| [Alexandria](https://fonts.google.com/specimen/Alexandria) | Google Fonts | OFL | Arabic variable geometric sans |
| [IBM Plex Sans Arabic](https://fonts.google.com/specimen/IBM+Plex+Sans+Arabic) | Google Fonts | OFL | Product UI, bilingual dashboards |
| [Noto Naskh Arabic](https://fonts.google.com/specimen/Noto+Naskh+Arabic) | Google Fonts | OFL | Long-form reading |
| [Readex Pro](https://fonts.google.com/specimen/Readex+Pro) | Google Fonts | OFL | Arabic UI variable |

Bilingual rules:

- Stack Latin display first, then Persian: `font-family: "Instrument Serif", "Vazirmatn", serif;` — the browser falls back per glyph, so Latin stays high-contrast and Persian stays legible.
- Override with `:lang(fa) { font-family: "Vazirmatn", sans-serif; line-height: 1.85; letter-spacing: 0; }` and set `dir="rtl"` on the Persian document.
- Never letter-space or uppercase Persian. Use weight, size, or colour for emphasis; faux italic is unacceptable.
- Use logical properties (`margin-inline-start`, `padding-inline`) so one stylesheet serves both directions.
- Respect ZWNJ (U+200C) in compound words; type Persian digits (۱۲۳) deliberately, e.g. `Intl.NumberFormat('fa-IR')`.
- Test the toggle for layout shift: mirrored grids, arrow icons, and progress bars all need RTL variants.
- Good bilingual pairs: Instrument Serif + Vazirmatn; Fraunces + Estedad; Space Grotesk + Vazirmatn; Lalezar + Vazirmatn (display/body).

---

## 4. Colour & surface directions

| Direction | Roles (hex) | Contrast notes |
|-----------|-------------|----------------|
| **A. Cold Archive** (dark cinematic) | bg `#0B0D0F` · surface `#15191D` · text `#ECE9E2` · muted `#A3A39B` · accent `#C6FF3D` · secondary `#FF5C33` | Text 16.1:1, muted 7.7:1, accent 16.5:1. Acid green is invisible on white (1.2:1) — dark surfaces only. |
| **B. Paper & Ink** (warm editorial) | bg `#F3EDE2` · surface `#E8DFD1` · ink `#1A1712` · muted `#6A6255` · rust `#B23A22` · olive `#2F4A3F` | Ink 15.3:1, muted 5.2:1, rust 5.1:1, olive 8.3:1. Rust on the darker surface is 4.5:1 — borderline, use 18px+. |
| **C. Monochrome + Electric** | bg `#FAFAF7` · ink `#0D0D0D` · muted `#6B6B6B` · accent `#2B3BFF` · rule `rgba(13,13,13,.12)` | Ink 18.6:1, muted 5.1:1, accent 6.3:1, white on accent 6.6:1. The safest "one accent" system. |
| **D. Pastel Playful** | bg `#FFF7EC` · ink `#1F1B17` · pink `#FFC2D1` · mint `#BFE3D0` · lilac `#D7C4F5` · accent `#C43C14` | Ink on pastels 10.7–12.3:1. The pop orange `#E4491F` is only 3.8:1 on cream — large text/shapes only; `#C43C14` is the body-safe accent (4.9:1). |
| **E. Brutalist Primary** | bg `#F0EFE9` · black `#000000` · red `#C92700` (safe) / `#FF2E00` (display) · blue `#1B2BFF` · yellow `#FFD400` | Black on bg 18.2:1, yellow 14.7:1. Pure red as text is 3.2:1; white on `#FF2E00` is 3.7:1 — use `#C92700` for body red, pure red only for fills/large type. |

Surface rules:

- One background + one elevated surface is enough. Add depth with 1px rules at 10–14% ink, not drop shadows.
- A 1–2% grain overlay kills "flat template" energy; keep it out of text contrast calculations.
- Avoid glassmorphism unless it signals a state (sticky header over imagery). Blur over text destroys legibility.
- Pure `#000` on pure `#FFF` is harsh at display sizes; use ink `#111`–`#1A1712` on bone.
- Check every palette in grayscale and with a contrast checker; the numbers above are WCAG 2.1 ratios. For large display type, 3:1 is the floor but 4.5:1 still reads better.

---

## 5. Layout ideas (with build notes)

- **Bento grid.** 12 columns, 3–6 tiles with varied spans (2×2 hero, 1×1 detail, wide text tile). CSS Grid + `aspect-ratio`; one tile must be contact/availability. Avoid equal tiles — that is template energy.
- **Oversized type.** `font-size: clamp(3.5rem, 11vw, 12rem)`, two lines max, `text-wrap: balance`. Set `overflow-wrap: anywhere` for long names; verify at 200% zoom and 360px.
- **Sticky split-scroll.** Left rail (title, client, year, role) `position: sticky; top: 6rem`; right column scrolls through plates. Stacks on mobile. Cheap to build, reads as expensive.
- **Horizontal gallery.** `scroll-snap-type: x mandatory` + visible prev/next buttons + arrow-key support. Never hijack vertical wheel; provide a "view all" grid.
- **Index-style list.** Rows with title / client / role / year, hover preview. Best pattern for 8+ projects; semantic `<ul>` with real links, thumbnails lazy-loaded and hidden from AT.
- **Cursor-follow preview.** Enable only under `@media (hover: hover) and (pointer: fine)`; 140ms fade, image preloaded on row focus. On touch, show an inline thumbnail. Never make the preview the only access to information.
- **Workbench hero.** A small "currently building" object/experiment beside the intro copy; humanises the page without a 3D scene.
- **Marquee.** Duplicate the track, pause on hover/focus, disable with `prefers-reduced-motion`. Keep it decorative and `aria-hidden`.

---

## 6. Copywriting

Portfolio copy fails when it describes qualities ("passionate, detail-oriented") instead of evidence. Write like a case-study caption: subject, action, result.

**Hero line:** role + domain + outcome, in that order. One sentence, under 20 words, no adjectives that a competitor couldn't also claim.

**Project blurb:** problem → your role → outcome. 25–45 words. One number or concrete artifact. Name the team if it was a team.

**About:** 120–220 words, first person, three moves: what I do now, how I think, who I am. End with a human detail and a contact path.

### Five fill-in-the-blank templates

1. **Identity hero**
   > I'm **[Name]**, a **[discipline]** in **[city]**. I turn **[messy input]** into **[clear outcome]** for **[audience]**.
   *Example:* "I'm [Name], a brand designer in Tehran. I turn half-formed ideas into identities that survive their first investor deck."

2. **Proof hero** (when the work is stronger than the bio)
   > **[Outcome]** for **[client]**. **[Outcome]** for **[client]**. **[Outcome]** for **[client]**. Designed and shipped by one person — **[availability/contact]**.

3. **Project card**
   > **[Project]** — **[client]**. **[Problem in one clause]**. I led **[scope]**; **[outcome with a number]**. **[Link]**
   *Example:* "Kernel — fintech onboarding. 41% of signups stalled at KYC. I redesigned the six-step flow and rewrote the error copy; completion rose to 78% in eight weeks."

4. **Case-study opener**
   > **[Client]** came with **[problem]**. In **[timeframe]**, I **[role]** alongside **[team]**. We shipped **[artifact]**, which **[measurable outcome]**. Here is how.

5. **About paragraph**
   > I've spent **[N]** years **[verb]ing [domain]** for **[audience]**. My work sits between **[discipline A]** and **[discipline B]** — **[principle 1]**, **[principle 2]**, **[principle 3]**. Before **[current role]**, I **[credibility]**. Off-screen: **[human detail]**.

Bonus micro-copy: contact — "Have a **[project type]** that needs **[outcome]**? I'm booking **[window]** and reply within **[N]** hours. → **[email]**." Footer — "Designed and built by **[Name]**. Type: **[faces]**. Last updated **[date]**."

---

## 7. Anti-patterns to avoid

- **Stock gradients and generic AI imagery.** They signal "template" before a word is read. Use real work, custom photography, or one deliberate graphic system.
- **Template energy:** centred hero, three equal cards, "Welcome to my portfolio", rounded-corner everything. Fix with a distinctive type scale, an asymmetric grid, and an index.
- **Autoplay video with sound.** Fails WCAG [1.4.2 Audio Control](https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html); start muted with a visible unmute, and never autoplay audio.
- **Excessive preloaders.** NN/g's [response-time limits](https://www.nngroup.com/articles/response-times-3-important-limits/) still apply: keep first meaningful paint under ~1s, hard-cap any loader at 2s, and show real content behind it.
- **Unreadable body text.** Sub-16px copy, 120ch measures, 3:1 gray-on-gray. Use 16–18px, 1.5–1.7 line-height, 4.5:1 minimum ([WCAG 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)).
- **Mystery-meat navigation.** Icon-only or concept-label nav ("Universe", "Playground"). Label things; keep Work/About/Contact visible.
- **Scrolljacking / horizontal hijack.** Breaks trackpads, keyboards, and accessibility. Use native scroll, snap points, and visible controls.
- **Custom cursors that hide the pointer or shrink targets.** Keep a native cursor, 44×44px minimum targets, and visible focus rings.
- **Heavy autoplay hero video.** It becomes the LCP element and tanks [Core Web Vitals](https://web.dev/articles/lcp). Use a poster + click-to-play, or a short muted loop with `preload="none"`.
- **3D for its own sake.** No static fallback, no keyboard path, 15MB of assets. If the concept needs 3D, budget it; otherwise spend the effort on type and work.
- **"Coming soon", lorem ipsum, dead links, 2019 copyright.** Instant credibility loss.
- **Desktop-only composition.** Test 360px, thumb reach, and RTL; mobile is the first visit for most hiring managers.
- **Missing metadata.** No `<title>`, description, OG image, or favicon — the link looks broken when shared.

---

## 8. Recommended art direction

### "The Quiet Index"

An editorial archive that treats the portfolio as a catalogue raisonné, not a pitch deck. Calm paper surfaces, monumental type, and an index that reveals work only when you engage with it. The ambition is Awwwards-level craft without a WebGL tax: every effect is CSS or a single small JS module.

**Type**
- Display: **Instrument Serif** 400, tight leading (0.92), sizes 64–180px, occasional italic for emphasis.
- Body: **Instrument Sans** 400/500, 17–18px, 1.55 line-height, 62ch measure.
- Meta: **JetBrains Mono** 11–12px, uppercase, 0.08em tracking, for years, roles, captions, and the colophon.
- Persian: **Vazirmatn** 300–600, 1.85 line-height, no tracking; pair with Instrument Serif for Latin display. One `:lang(fa)` block flips direction and metrics.

**Colour**
- Paper `#F3EDE2`, ink `#1A1712`, muted `#6A6255`, rust `#B23A22`, olive `#2F4A3F`.
- Rust is the only accent: links, index numbers, the availability dot, one full-bleed case-study field. Never more than ~5% of a viewport.
- Optional dark mode: `#0B0D0F` / `#ECE9E2`, rust lightened to `#E0704F` (verify 4.5:1 before shipping).

**Grid**
- 12 columns, max-width 1440px, 24px gutters, 8px baseline.
- Hero: asymmetric 7/5 split — statement left, availability/portrait right.
- Work index: full-bleed rows separated by 1px rules; columns: year · title · client · role · arrow.
- Case study: 4-column text rail + 8-column plate field; sticky metadata on the left at ≥1024px.
- Footer: 3 columns — contact, colophon, local time/last updated.

**Motion**
- No preloader. First paint is the design.
- Hero: 350ms clip-path/translate reveal, staggered 40ms per line.
- Hover previews: 140ms opacity/scale, ease-out; no bounce.
- Page transitions: View Transitions API, 300ms cross-fade with a 4px upward drift.
- One signature moment per page, not five. Everything respects `prefers-reduced-motion` ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)).

**Signature interactions**
1. Index rows reveal a large image plate that follows the cursor on desktop and expands inline on touch.
2. Press-and-hold a plate to preview motion; release to return to the still.
3. A language toggle that swaps the type stack and flips the grid without a reload.
4. A dated "Currently" line in the hero's right column.
5. A colophon footer with typefaces, stack, local time, and "last updated".

**Build**
Astro or Eleventy static output; CSS Grid + custom properties; View Transitions; one ~4KB JS module for previews; GSAP only if a specific case study needs it. No WebGL. Self-host subset fonts, AVIF/WebP images with width/height, target LCP < 2.0s and Lighthouse ≥ 95. Page weight under 500KB on first load.

**Synthesises:** [niccolomiranda.com](https://www.niccolomiranda.com) (index + hover plates + paper palette) · [rauno.me](https://rauno.me) (restraint, timeline, micro-craft) · [instrument.com](https://www.instrument.com) (editorial scale and case-study rhythm) · [daviduzochukwu.com](https://www.daviduzochukwu.com) (image pacing, monumental name, ochre accent) · [emilkowal.ski](https://emilkowal.ski) (status line, plain-spoken project specs, warm off-white).

---

## Sources

- Reference sites: the 25 URLs above, all HTTP 200 on 2026-10-23.
- Awwwards: [Site of the Year 2024](https://www.awwwards.com/annual-awards-2024/site-of-the-year) (Igloo Inc), [Site of the Year 2025](https://www.awwwards.com/annual-awards-2025/site-of-the-year) (Lando Norris), [Igloo case study](https://www.awwwards.com/igloo-inc-case-study.html).
- NN/g: [F-shaped pattern](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/), [response-time limits](https://www.nngroup.com/articles/response-times-3-important-limits/), [hidden navigation](https://www.nngroup.com/articles/hidden-navigation-methodology).
- Baymard: [homepage carousel UX](https://baymard.com/research-articles/homepage-carousel).
- W3C WAI: [Audio Control](https://www.w3.org/WAI/WCAG22/Understanding/audio-control.html), [Contrast Minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
- Typography: [MDN clamp()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/clamp), [web.dev variable fonts](https://web.dev/articles/variable-fonts), [Google Fonts variable-font guide](https://fonts.google.com/knowledge/using_type/using_variable_fonts_in_css), [MDN prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion), [web.dev LCP](https://web.dev/articles/lcp).
- Persian fonts: [Vazirmatn](https://github.com/rastikerdar/vazirmatn), [Estedad](https://github.com/aminabedi68/Estedad), [Shabnam](https://github.com/rastikerdar/shabnam-font), [Fontiran](https://fontiran.com/fonts) (Kalameh, Morabba, Peyda), Google Fonts specimens linked above.
