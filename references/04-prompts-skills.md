# 04 — Prompts, Agent Skills & Workflows for a High-End Animated Portfolio

Researched **23 Oct 2026**. Every URL below was fetched and returned HTTP 200 unless marked otherwise.
Scope: reusable prompts, installable agent skills, and review loops for building a premium, motion-led
portfolio site (Next.js/Astro + Tailwind + a real animation library).

> **Project assumption used in the prompts:** the portfolio belongs to **Arash Ganjimanesh** — handmade
> *udu* and *kuzeh* clay percussion (see <https://doyek.com/>). If that is wrong, swap the `[CRAFT]` block;
> the prompt structure still holds. Confirm with the owner before art direction locks.

---

## 1. Where the good skills actually live (2026)

| Source | URL | What's inside | Relevant here? |
|---|---|---|---|
| **anthropics/skills** (official) | <https://github.com/anthropics/skills> · index <https://skills.sh/anthropics/skills/frontend-design> | `frontend-design`, `webapp-testing`, `web-artifacts-builder`, `canvas-design`, `theme-factory`, `brand-guidelines`, `skill-creator` | **Yes — the baseline.** `frontend-design` is explicitly an anti-AI-slop art-direction brief; `webapp-testing` ships a Playwright harness (`scripts/with_server.py`) |
| **skills.sh** (Vercel-run directory) | <https://skills.sh> · topics <https://skills.sh/topic> · design <https://skills.sh/topic/design> · official <https://skills.sh/official> · audits <https://skills.sh/audits> · docs <https://skills.sh/docs> | Largest live index; per-skill pages with `npx skills add` command, audit status, topic taxonomies | **Yes — start every search here.** `/topic/design` is the single best curated list for this build |
| **emilkowalski/skills** | <https://github.com/emilkowalski/skills> · <https://emilkowal.ski/> | `animate`, `animation-performance`, `animation-vocabulary`, `review-animations`, `find-animation-opportunities`, `improve-animations`, `apple-design`, `break-ui`, `pick-ui-library` | **Highest-value motion source.** Written from Vercel/Linear craft experience; fixes wrong easings, layout-thrashing animation, missing reduced-motion |
| **pbakaus/impeccable** | <https://github.com/pbakaus/impeccable> · <https://impeccable.style> | 1 skill + 24 commands (`init`, `craft`, `polish`, `critique`, `audit`, `animate`, `bolder`, `quieter`, `distill`) + 62 deterministic "AI tell" detector rules + browser extension | **Yes — best review loop.** Detectors catch purple gradients, nested cards, icon-tile-above-heading without spending tokens |
| **leonxlnx/taste-skill** | <https://github.com/leonxlnx/taste-skill> · <https://tasteskill.dev> | `design-taste-frontend`, `high-end-visual-design`; art direction via reference images + a browser check | **Yes** — closest thing to an "art director" skill; good for the brief phase |
| **vercel-labs/agent-skills** | <https://github.com/vercel-labs/agent-skills> | `web-design-guidelines` (100+ a11y/perf/UX rules), `react-best-practices`, `writing-guidelines`, `vercel-optimize` | **Yes** — the free, high-signal a11y/perf audit skill |
| **ibelick/ui-skills** | <https://github.com/ibelick/ui-skills> · <https://www.ui-skills.com> · playbook <https://www.ui-skills.com/playbook> | Design-engineering skill registry, CLI (`npx ui-skills`), MCP endpoint, playbook | Yes — good second opinion on baseline UI craft; motion category especially |
| **hesreallyhim/awesome-claude-code** | <https://github.com/hesreallyhim/awesome-claude-code> | Commands, hooks, workflows, CLAUDE.md examples; `obra/superpowers` (<https://github.com/obra/superpowers>) adds a full plan→TDD→review methodology | Medium — workflows and review discipline, but overkill for a one-pager |
| **travisvn/awesome-claude-skills** | <https://github.com/travisvn/awesome-claude-skills> | Curated skill list incl. shadcn, frontend-slides, design skills | Medium — good discovery list, less curated than skills.sh |
| **coreyhaines31/marketingskills** | <https://github.com/coreyhaines31/marketingskills> | CRO, copywriting, SEO, analytics skills | Yes for copy/SEO pass |
| **Lombiq/Tailwind-Agent-Skills** | <https://github.com/Lombiq/Tailwind-Agent-Skills> | Tailwind v4 docs snapshot + index as a skill | Only if the agent's Tailwind v4 knowledge is stale |
| **hixuanxuan/browser-automation** | <https://github.com/hixuanxuan/browser-automation> | `visual-diff` (Figma→page VET compare), `element-screenshot`, `chrome-cdp` | Niche but exactly the screenshot-diff loop, if you design in Figma |
| **claudeskills.directory** | <https://claudeskills.directory> | Directory | **Unreliable** — DNS resolves but returned empty/timeout responses. Skip; use skills.sh |

**Install (verified command shapes):**

```bash
npx skills add anthropics/skills --skill frontend-design
npx skills@latest add emilkowalski/skills
npx skills add vercel-labs/agent-skills --skill web-design-guidelines
npx impeccable install          # then: /impeccable init
npx ui-skills start             # browse by category, e.g. `npx ui-skills list --category motion`
```

---

## 2. Coverage map — what to install for each need

| Need | Skill / tool | Notes |
|---|---|---|
| Web design / aesthetics | `anthropics/skills@frontend-design`, `leonxlnx/taste-skill@high-end-visual-design` | frontend-design forces a named aesthetic direction *before* code; run it first, once |
| Design critique / polish | `pbakaus/impeccable` (`critique`, `polish`, `distill`) | Deterministic detectors + command vocabulary; cheapest quality gate |
| Animation | `emilkowalski/skills` (`animate`, `review-animations`, `animation-performance`, `find-animation-opportunities`) | Best in class. Pair with GSAP ScrollTrigger or Motion docs |
| Tailwind + shadcn/ui | `Lombiq/Tailwind-Agent-Skills`; <https://ui.shadcn.com/docs/skills>; MCP <https://ui.shadcn.com/docs/mcp> | shadcn skill enforces component patterns; MCP searches the registry. Optional — don't burn context |
| Accessibility audit | `vercel-labs/agent-skills@web-design-guidelines` + axe-core | Rules-based pass first, then manual keyboard/screen-reader pass |
| Performance audit | `vercel-labs/agent-skills@react-best-practices` + Lighthouse CI | Budgets must be enforced in CI, not by vibes |
| Copywriting | `coreyhaines31/marketingskills`, `vercel-labs/agent-skills@writing-guidelines` | Writing-guidelines also catches curly quotes/ellipsis/tabular-nums |
| SEO | `Illyism/seo-skills` | Metadata, OG, JSON-LD (`Person` + `CreativeWork`) |
| Screenshot-driven iteration | `anthropics/skills@webapp-testing` + Playwright MCP | Agent must *look* at the render, not infer it |
| Visual regression | Playwright `toHaveScreenshot` (<https://playwright.dev/docs/test-snapshots>) | Baseline per breakpoint; mask animation regions |
| Mobile/responsive | `sleekdotdesign/agent-skills` (mobile patterns) + custom audit prompt §3.7 | Test 390 / 768 / 1024 / 1440 and landscape phone |

---

## 3. Copy-paste prompts (12)

### 3.1 Art-direction brief generator

```
You are the design lead at a studio known for one-of-one visual identities. We are building a
portfolio for [OWNER NAME], a [CRAFT — e.g. maker of handmade clay percussion: udu and kuzeh].
Audience: [curators, festival programmers, collectors, collaborators]. Primary job of the site:
[make them want to hear/see the work and contact the owner].

Before any layout, produce an art-direction brief with these headings, max 700 words:
1. ONE SENTENCE THESIS — what this site should feel like, in language a photographer would use.
2. MATERIAL TRUTH — 5 physical properties of the craft (clay, firing, skin, resonance, dust) and
   how each becomes a digital decision (texture, grain, easing, sound, type weight).
3. PALETTE — 5 hex values with roles and a one-line rationale each. No purple/violet. No
   gradient unless it exists in the material. Give the "boring" neutral its own job.
4. TYPE — display face + text face + one numeric/utility face. Name real fonts, give fallbacks,
   and say why the display face is defensible for THIS subject (not "modern serif").
5. COMPOSITION — grid logic, max content width, asymmetry rule, where whitespace is spent.
6. MOTION THESIS — 3 verbs the motion must express (e.g. strike, settle, resonate), and what
   must NEVER move.
7. ONE RISK — a single choice that could fail, and the fallback if it does.
8. ANTI-REFERENCES — 5 specific things this site must not resemble, named concretely.

Do not write code. Do not propose sections yet. End with the 3 decisions you need from me.
```

### 3.2 Reference & anti-reference calibration (run before build)

```
I am going to give you 6 reference URLs and 6 anti-reference URLs for [PROJECT].
For each reference, extract only transferable mechanics — not vibes:
  (a) type scale ratio + actual sizes at 1440px, (b) grid and gutter, (c) one interaction detail
  worth stealing, (d) how motion is used to reveal hierarchy, (e) what makes it feel expensive.
For each anti-reference, name the specific tell that makes it read as AI-generated or template.
Then output a single-page "taste contract": 10 rules written as MUST / MUST NOT, each testable
from a screenshot in under 10 seconds. No rule may contain the words "modern", "clean",
"elegant", "sleek", or "minimal" without a measurable definition.
References: [URLS]. Anti-references: [URLS].
```

### 3.3 Section build prompt with acceptance criteria

```
Build ONE section: [SECTION NAME] of the [OWNER] portfolio.

Context: read DESIGN.md (tokens, type scale, motion rules) and the taste contract. Do not invent
new colors, fonts, or spacing outside those tokens; if a token is missing, stop and ask.

Content: [PASTE REAL COPY — no placeholder text, no lorem ipsum].
Layout intent: [e.g. asymmetric two-column, media bleeds off right edge, caption set in the margin].
Motion intent: [e.g. instrument image settles 24px up over 600ms as it enters; caption fades at +120ms].

Acceptance criteria — all must hold at 390, 768, 1440:
1. Renders with real content from the CMS/content file; zero hardcoded strings in the component.
2. Hierarchy readable at 50% zoom: the eye lands on [PRIMARY ELEMENT] first.
3. No layout shift on font or image load (reserve aspect ratios; font-display: swap + size-adjust).
4. Keyboard: every interactive element reachable, visible focus ring using [ACCENT] at 3:1 against bg.
5. prefers-reduced-motion: all transforms resolve to opacity-only or none; nothing depends on scroll.
6. Section adds < 25KB JS gzipped and causes no new long task > 50ms on a 4x CPU throttle.
7. Screenshot at 1440 is posted to shots/ and you have stated what you see, not what you intended.

Do not touch other sections. Do not refactor shared components unless the criteria require it;
if they do, list the change and wait for approval.
```

### 3.4 "Critique this screenshot like an art director"

```
You are an art director reviewing a screenshot, not a developer reviewing code. You did not build
this and you have no loyalty to it. The screenshot is at [PATH], viewport [WIDTH]x[HEIGHT].

Answer in this order, in under 350 words total:
1. FIRST 3 SECONDS — what does a stranger think this site sells? If it is not [CRAFT/PRODUCT],
   say so bluntly and name what is misleading them.
2. HIERARCHY — rank the 5 loudest elements. Is that the intended order? If not, what is stealing
   attention (contrast, size, color, motion, position)?
3. CRAFT ERRORS — list concrete, measurable defects: optical misalignment, inconsistent radii,
   uneven spacing, orphans/widows, cramped line-height, text over busy image, weak caption contrast,
   icon weights that don't match type weights. Cite pixel regions ("the caption block, lower left").
4. SIGNATURE — name the one thing that is genuinely distinctive. If there isn't one, say
   "no signature" and propose exactly one addition that would create it.
5. CUT — one element to delete entirely, and why the page improves without it.
6. VERDICT — Ship / Fix-then-ship / Rethink. One sentence of justification.

Rules: no praise sandwiches, no "consider", no generic advice like "improve spacing". Every
criticism must be actionable by a developer in one edit.
```

### 3.5 Animation choreography spec

```
Write the motion spec for [SECTION/PAGE]. Output a table, one row per animated element:
Element | Trigger (load / enter viewport at X% / hover / click / scroll progress) | Property |
From → To | Duration | Delay | Easing (cubic-bezier values) | Purpose (what it communicates)

Constraints:
- Durations: micro-feedback 120–180ms, UI transitions 200–320ms, narrative entrances 500–800ms,
  nothing over 900ms. No animation may delay access to content by more than 300ms.
- Easing: entrances ease-out, exits ease-in, continuous/ambient motion linear. Never ease-in on
  an entrance. Never bounce/elastic unless the material is elastic.
- Animate only transform and opacity. If a layout property must animate, state why and the cost.
- Stagger: 60–90ms, max 5 children; beyond that, animate the container.
- Scroll-linked motion must be driven by one rAF loop or ScrollTrigger, never per-element listeners.
- prefers-reduced-motion: define the reduced variant per row, not a global opt-out.
- Every row must answer: if I delete this animation, what information is lost? If "none", cut it.

Also list: the single hero moment (the one thing people remember), and 3 animations we are
deliberately NOT doing because they are clichés in this category.
```

### 3.6 Motion + reduced-motion audit

```
Audit the running site at http://localhost:[PORT] for motion quality and accessibility.
Use Playwright to capture: (1) 6s of scroll at 1440, (2) the same at 390, (3) the page with
`prefers-reduced-motion: reduce` emulated, (4) CPU 4x throttle + network Fast 3G.

Report:
1. JANK — identify any frame drop > 32ms, which element caused it, and whether it animates a
   non-composited property (top/left/width/height/filter/box-shadow).
2. HIJACK — is scroll position or wheel behavior overridden? Does the page still work with
   keyboard PageDown and with a trackpad fling? Scroll-jacking is a defect unless justified.
3. REDUCED MOTION — list every animation still running with the media query active. Each is a
   WCAG 2.2 §2.3.3 risk. Provide the exact CSS/JS guard per element.
4. VESTIGIAL MOTION — animations that communicate nothing. Recommend deletion, not shortening.
5. LOOP HYGIENE — any IntersectionObserver/rAF/timers not cleaned up on unmount; memory growth
   after 60s of scrolling.
6. INP — interaction-to-next-paint for the nav, any filter/toggle, and first scroll.
Output: table of defects (severity, element, evidence, fix), then the 3 highest-leverage fixes.
```

### 3.7 Responsive / mobile audit

```
Audit [URL] at 320, 390, 430, 768, 1024, 1440, 1920, and 844x390 landscape.
For each width capture a full-page screenshot and note:
1. BREAKS — overflow-x, clipped type, elements under 44x44px touch targets, hover-only
   affordances with no touch equivalent, fixed elements eating > 15% of viewport height.
2. TYPE — measure actual rendered sizes. Flag body text < 16px, line length > 75ch or < 35ch,
   display type that wraps to a single orphan word.
3. MEDIA — art direction per breakpoint (not just scaling): are crops, aspect ratios, and focal
   points correct? Any image upscaled beyond 1.2x its intrinsic width?
4. NAV — is the mobile nav reachable, dismissible, focus-trapped, and does it restore focus?
5. DENSITY — where does the layout merely stack instead of recomposing? Name those sections.
6. SAFE AREAS — notch/home-indicator padding, 100vh vs 100dvh bugs on iOS.
Output a defect list with severity + the specific CSS/component change, then a one-screen
summary of what a phone-first visitor experiences that a desktop visitor does not.
```

### 3.8 Accessibility audit (WCAG 2.2 AA, portfolio-specific)

```
Run a WCAG 2.2 AA audit of [URL]. Use axe-core for machine checks, then do the manual pass.
Do not report "issues found: 12" — every item needs a selector and a fix.

Manual checks that matter for a motion-heavy portfolio:
1. Contrast: all text incl. captions over imagery. Sample the actual pixels under the text, not
   the CSS background. Report measured ratios.
2. Keyboard: full tab traversal — order matches visual order, focus never lost, no trap outside
   modals, skip-link works, focus visible on every control at 3:1.
3. Media: video/audio has captions or a transcript; autoplay is muted and pausable; animated
   decorative elements are aria-hidden; nothing flashes > 3 times/sec.
4. Semantics: one h1, heading order, landmark regions, alt text that describes the work rather
   than the file ("udu, fired clay, 42cm" not "image1").
5. Forms: labels bound, errors announced, autocomplete attributes, no placeholder-as-label.
6. Zoom/reflow: 200% zoom and 320px reflow with no loss of content or function.
7. Reduced motion + forced-colors (Windows High Contrast) still usable.
Output: Critical / Serious / Moderate / Minor table with WCAG criterion, evidence, and patch.
```

### 3.9 Copy editing in the owner's voice

```
Edit the site copy in references/copy-draft.md so it sounds like [OWNER], not like a brand.

Voice source: these verbatim interview notes / WhatsApp messages: [PASTE 300–800 WORDS].
Extract the voice first: sentence length distribution, vocabulary the owner actually uses,
what they never say, how they describe materials and failure, whether they use humour.
Write that as a 6-line voice sheet, then edit.

Rules:
- Keep the owner's specificity: numbers, place names, process details, mistakes. Never generalise
  them into "craftsmanship" or "passion".
- Delete every phrase that could appear on any other portfolio: "digital experiences",
  "blending art and technology", "pushing boundaries", "elevate", "curated", "bespoke",
  "where creativity meets", "timeless", "journey".
- Headlines: max 7 words, concrete noun + verb. No colon-led slogans.
- Sentences: median 12 words, max 28. One idea per sentence. Active voice ≥ 90%.
- No em-dash chains, no tricolon ("clay, rhythm, and light"), no rhetorical questions.
- Keep the owner's language if the site is bilingual; do not translate idioms literally.
Deliver: before/after table per block, then the final copy as one clean file. Flag any claim
I need to verify with the owner (materials, dates, awards, dimensions).
```

### 3.10 Performance budget enforcement

```
Set and enforce a performance budget for [PROJECT].

1. Baseline first: build production, serve locally, run Lighthouse (mobile preset, 4x CPU,
   simulated Slow 4G) and record LCP, INP, CLS, TBT, total JS, total CSS, total image weight,
   font weight, request count. Report per-route, not site-wide.
2. Propose budgets with justification, then treat as hard gates:
   LCP ≤ 2.0s · INP ≤ 150ms · CLS ≤ 0.02 · TBT ≤ 150ms · JS ≤ [150]KB gz initial ·
   CSS ≤ [40]KB gz · fonts ≤ 2 files / [90]KB · hero image ≤ [250]KB AVIF ·
   no single request > [300]KB · Lighthouse perf ≥ 95.
3. Attribute every KB: list the 10 heaviest resources with what they buy us. Anything that buys
   no visible outcome gets removed — especially animation libraries imported whole.
4. Fix in this order: render-blocking, font loading (subset + preload + size-adjust), image
   formats/sizes, JS splitting, then dependency replacement.
5. Add enforcement: Lighthouse CI assertions in CI (fail the build), a bundle-size check on PR,
   and a Playwright script that fails if LCP regresses > 10% vs the stored baseline.
Deliver the budget file, the CI config, and a before/after table. Do not claim an improvement
without the two Lighthouse JSON reports attached.
```

### 3.11 SEO, metadata & social preview

```
Implement SEO for [PROJECT] with the owner's real details: [NAME], [LOCATION], [CRAFT],
[CANONICAL DOMAIN].

1. Titles: ≤ 60 chars, pattern "[Name] — [Craft], [City]". No keyword stuffing.
2. Meta description: ≤ 155 chars, one concrete fact + one invitation. No "Welcome to my portfolio".
3. Structured data: Person (name, jobTitle, url, sameAs to real profiles, address) +
   CreativeWork/Product per work with material, dimensions, year, image. Validate with the
   Rich Results test and paste the result.
4. OG/Twitter: 1200x630 per key page, real photography not text-on-gradient. Alt text on OG image.
5. Semantics: sitemap.xml, robots.txt, canonical URLs, hreflang if bilingual, descriptive slugs.
6. Crawl check: `curl` the deployed HTML and confirm work titles and copy are present server-side.
7. Report every changed string exactly, so the owner can approve wording.
```

### 3.12 Playwright visual-review harness (screenshot loop)

```
Create scripts/shoot.mjs for this repo. Requirements:
- Boots the dev/preview server, waits for network idle + fonts.ready + all images decoded.
- Captures full-page PNG at 390x844, 768x1024, 1440x900, 1920x1080 into shots/[GIT_SHA]/.
- Captures per-section crops using [data-shot="hero|work|about|contact"] and a 1440 "fold" shot.
- Emulates prefers-reduced-motion for a parallel set suffixed .rm.png.
- Disables animations/caret for stable diffs; masks video/canvas regions in `toHaveScreenshot`
  baselines; threshold 0.15, maxDiffPixels 400.
- Writes shots/[GIT_SHA]/manifest.json (viewport, DPR, url, sha, timestamp, console errors) and
  prints console errors + failed requests, exiting non-zero if any.
Then run it, open the 1440 and 390 full-page shots, and describe in 5 bullets what changed
versus the previous run — not what you intended to change.
```

---

## 4. Workflow notes

### 4.1 Sub-agent split that actually works

| Role | Context it gets | Must NOT get |
|---|---|---|
| **Art-direction researcher** | Brief, 6 reference URLs, competitor set | The codebase. It should think in references, not components |
| **Builder (main agent)** | DESIGN.md, taste contract, one section at a time | Permission to "improve" other sections |
| **Design reviewer** | Only screenshots + acceptance criteria | The diff or the reasoning. Fresh eyes are the point |
| **A11y/perf auditor** | Running URL + budgets | Authorship of the code it audits |
| **Copy editor** | Voice sheet + draft | The design, so it edits for meaning not space |

Rules of thumb: max 3 concurrent sub-agents; one section per builder task; reviewers return
**defect tables, not essays**; every sub-agent ends with "what I could not verify". Run experiments
in a git worktree so a failed art direction costs one directory, not a rollback.

### 4.2 The screenshot loop (non-negotiable)

1. Build → `node scripts/shoot.mjs` → agent **reads the PNGs** (multimodal), never guesses.
2. Compare against the previous SHA's shots; write 5 bullets of *observed* change.
3. Run `/impeccable critique` or prompt 3.4 on the 1440 fold shot.
4. Fix exactly the listed defects; re-shoot; diff again.
5. Only then run the perf/a11y gates. Never "polish" before hierarchy is right — polish on a bad
   composition is how sites end up expensive-looking and meaningless.
6. Keep `shots/` out of git; keep `manifest.json` + the 3 chosen shots per milestone.

### 4.3 Ban list — AI-slop tells (put this in AGENTS.md)

Hard bans, because they are the actual fingerprint of generated design in 2026:

- Purple/indigo/violet gradients; "aurora" blobs; glow behind dark hero text.
- Generic glassmorphism (`backdrop-blur` card over a gradient) as a personality substitute.
- Three-card feature rows with identical icon + title + two-line body; nested cards in cards.
- Emoji as icons; Lucide icons at three stroke weights on one screen; rounded-square icon tile
  floating above every section heading.
- Centered hero + two buttons ("View work" / "Get in touch") + scroll-down chevron.
- Stats row ("50+ projects", "10 years") with no source; cursor followers; scroll-jacking.
- Inter for everything; one weight at five sizes; letter-spacing hacks on body text.
- Copy that says: "digital experiences", "where creativity meets technology", "elevate",
  "bespoke", "curated", "journey", "passionate about", "pushing boundaries".
- Lorem-ish filler: "Project One", "Your Name", `example.com`, placeholder dates.
- Dark mode by default with neon accent, used to hide weak composition.
- Motion on everything, with no element given the privilege of stillness.
- Section labels in ALL CAPS with 0.3em tracking as the only hierarchy device.

Positive constraints that replace them: one accent colour with a job; two typefaces max, three
weights; real photography with grain; asymmetry with a stated rule; one hero motion moment;
whitespace as a material; captions that carry information, not decoration.

---

## 5. Definition of done

- [ ] Art-direction brief approved; taste contract (10 MUST/MUST NOT) written into `DESIGN.md`
- [ ] Tokens only — no ad-hoc hex, font sizes, or radii in components
- [ ] Real content everywhere; zero lorem, placeholder names, or dead links
- [ ] 12 sections/pages screenshotted at 390/768/1440 and reviewed by a fresh-context reviewer
- [ ] Lighthouse mobile: Perf ≥ 95, A11y 100, Best Practices ≥ 95, SEO 100 (report attached)
- [ ] LCP ≤ 2.0s, CLS ≤ 0.02, INP ≤ 150ms on 4x CPU / Slow 4G
- [ ] JS ≤ budget, fonts ≤ 2 files subset, images AVIF/WebP with width/height set
- [ ] axe-core: 0 critical/serious; manual keyboard pass; visible focus on every control
- [ ] `prefers-reduced-motion`: verified screenshot set, no residual transforms
- [ ] Works at 320px and 200% zoom; no horizontal scroll; touch targets ≥ 44px
- [ ] OG image renders correctly in a real preview (Slack/X/iMessage), not just the meta tag
- [ ] Copy read aloud once; no banned phrases; owner's specifics intact
- [ ] 404, favicon, sitemap, robots, canonical, JSON-LD validated; analytics/consent (if any) loads after interaction, no third-party JS on the critical path
- [ ] Repo: README with run/deploy, `shots/` ignored, CI gates green, one commit per section

---

## 6. MCP servers & tools worth wiring up

| Tool | Link | Why |
|---|---|---|
| **Playwright MCP** | <https://github.com/microsoft/playwright-mcp> | Agent drives a real browser: click, resize, screenshot, read console. Core of the review loop |
| **Chrome DevTools MCP** | <https://github.com/ChromeDevTools/chrome-devtools-mcp> | Traces, performance panels, network waterfalls, memory — the perf audit layer |
| **Figma MCP (official)** | <https://developers.figma.com/docs/figma-mcp-server/> | Pull frames, variables, and component structure into the build (lighter `GLips/Figma-Context-MCP` if you only need layout data) |
| **shadcn MCP** | <https://ui.shadcn.com/docs/mcp> | Registry search/install without hallucinated component APIs |
| **ui-skills MCP** | <https://www.ui-skills.com> (`https://www.ui-skills.com/mcp`) | `list_skills` / `get_skill` for design-engineering skills |
| **axe-core / pa11y** | <https://github.com/dequelabs/axe-core> · <https://github.com/pa11y/pa11y> | Automated a11y gate in CI |
| **Lighthouse CI** | <https://github.com/GoogleChrome/lighthouse-ci> | Budget assertions that fail the PR |
| **WCAG 2.2 Quick Ref** | <https://www.w3.org/WAI/WCAG22/quickref/> · reduced-motion: <https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion> | Audit checklist + guard syntax |
| **GSAP ScrollTrigger / Motion** | <https://gsap.com/docs/v3/Plugins/ScrollTrigger/> · <https://motion.dev/docs/react> | Scroll choreography in one timeline; Motion needs `LazyMotion` + `domAnimation` to stay in budget |
| **Lenis** | <https://github.com/darkroomengineering/lenis> | Smooth scroll that respects reduced-motion; don't stack it on ScrollTrigger incorrectly |

---

*Verification:* all links returned HTTP 200 on 23 Oct 2026 except `claudeskills.directory`, which
resolved in DNS but returned empty responses — treat it as unreliable, not authoritative.
