# Design language — six directions

Shared rules first; per-demo specs below. Every demo must express its direction
through **tokens, generated assets, and a four-act story** — not just color.

## Shared system

### Motion grammar (from emil-design-eng + better-ui)

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | entrances, hover, press |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | scene/section transitions |
| `--ease-linear` | `linear` | marquee, progress, waveform |
| `--dur-press` | `120ms` | button/row press |
| `--dur-ui` | `180ms` | hover, focus, small state |
| `--dur-enter` | `420ms` | block entrance |
| `--dur-scene` | `720ms` | hero / large reveal |
| `--stagger` | `70ms` | between sibling items |

Rules:
- Animate only `transform`, `opacity`, `clip-path`, `filter`. Never `width`,
  `height`, `top`, `left`, or `transition: all`.
- Never enter from `scale(0)`; use `scale(0.96)` + opacity.
- Hover motion only inside `@media (hover: hover) and (pointer: fine)`.
- Press feedback: `scale(0.96)`.
- `prefers-reduced-motion`: remove translation/parallax/pin; keep a 200ms fade.
- Stagger is decorative — never delay interaction.
- Every animated state also needs a static cue (color, rule, label).

### Typography

- Persian: no letter-spacing, no uppercase, no faux italic. Use weight, size,
  color. Line-height 1.7–2.0 for body, 1.05–1.25 for display.
- Persian digits everywhere. Correct ZWNJ.
- Body measure 55–70 Persian characters. Minimum body size 16px; 17px preferred.
- Optical alignment beats geometric: nudge punctuation, numerals, and icons.

### Composition

- One idea per viewport. Sections must breathe; whitespace is a material.
- Rules/hairlines at 10–18% ink instead of shadows. One elevated surface max.
- Grain 1–2% only, never over body text contrast calculations.
- Every section answers: «چه چیزی را ثابت میکند؟» If not, cut it.

### Story spine (all demos, re-told in their own voice)

| Act | Beat | Job |
|---|---|---|
| ۰ | **سیگنال** | A question or tension. Not "welcome to my portfolio". |
| ۱ | **روش** | How she reads people: psychology, measurement, attention. |
| ۲ | **میدان** | Where the method meets organizations: PM, clinic, HR assessment. |
| ۳ | **اثر** | Proof: work, research, design. Evidence, not adjectives. |
| ۴ | **دعوت** | One clear invitation. Email only. |

Through-line: one motif recurs and transforms across the page (waveform, margin
note, index number, grid, node, rule). Each section's last line pulls into the
next. No section may be shuffled without breaking the argument.

---

## ۰۱ — آزمایشگاه / «Clinical Instrument»

**Metaphor:** a precision instrument, not a hospital. Calm surface, exact labels.

**Tokens**
```
--lab-bg #F5F8F8   --lab-ink #0C1A1E   --lab-teal #0F6B68
--lab-mint #9FD8D0 --lab-coral #FF5A36 --lab-rule #D5E3E3
--lab-display: var(--font-display)  --lab-body: var(--font-body)
--lab-mono: var(--font-mono)
scale 12 / 16 / 20 / 28 / 40 / 64 / clamp(3.5rem, 8vw, 7rem)
radius 2px (instrument panel, not pills)
```

**Generated assets** (in `src/components/demos/lab/`)
- `SignalMark.astro` — 32×32 mark: three stacked EEG traces inside a circle.
- `WaveField.astro` — full-width 4-path SVG, layered amplitudes, `pathLength`
  draw-in, one coral trace.
- `GridPlate.astro` — 12-column hairline plate used behind sections.
- `CalibrationRule.astro` — a rule with tick marks and a mono label.
- `TraceGlyph.astro` — small per-work glyph (3 variants: attention, signal, grid).

**Story**
- ۰ سیگنال: «چطور میشود آدم را پیش از قضاوت خواند؟» + live waveform.
- ۱ روش: attention as a measurable act; QEEG/CANTAB named as instruments.
- ۲ میدان: clinic projects + organizational assessment (clients anonymous).
- ۳ اثر: work table, thesis, certifications as calibration record.
- ۴ دعوت: one email line, no form.

**Motion:** instrument boot — waveform draws once (`1.8s linear`), sections
"calibrate" (rule sweeps 720ms, content settles 420ms), work rows reveal a coral
index on hover. No parallax.

---

## ۰۲ — کاغذ و مرکب / «Margin Notes»

**Metaphor:** a printed monograph with her notes in the margin.

**Tokens**
```
--paper-bg #F3EDE2  --paper-surface #E8DFD1 --paper-ink #1A1712
--paper-muted #6A6255 --paper-rust #B23A22 --paper-olive #2F4A3F
--paper-rule rgba(26,23,18,.18)
--paper-display: var(--font-naskh) --paper-body: var(--font-body)
--paper-latin: var(--font-serif)
scale clamp(2.75rem, 7vw, 7.5rem) / 1.9rem / 1.25rem / 1rem / .8125rem
```

**Generated assets**
- `Monogram.astro` — «مگ» set in Naskh, drawn as a single SVG path frame.
- `RuleOrnament.astro` — printer's rule with a small rust square.
- `PaperGrain.astro` — 1.5% noise via `<feTurbulence>`, fixed, pointer-events none.
- `DropCap.astro` — first-letter treatment with hanging baseline.
- `FootnoteMark.astro` — superscript numeral + hairline connector.

**Story**
- ۰ سیگنال: thesis line — «آدمها را باید خواند، نه دستهبندی کرد.»
- ۱ روش: three layers, psychology longest; margin notes carry asides.
- ۲ میدان: project index as a table of contents, not cards.
- ۳ اثر: thesis as pull-quote; work list with years; design as a colophon.
- ۴ دعوت: a letter-like closing, signed with her name.

**Motion:** ink reveal — `clip-path: inset(0 0 100% 0)` to `inset(0)` over 720ms,
staggered by paragraph; underline sweep on index rows; no bounce, no parallax.

---

## ۰۳ — آرشیو سرد / «Cold Signal»

**Metaphor:** a film title sequence for a documentary about attention.

**Tokens**
```
--arch-bg #0B0D0F --arch-surface #15191D --arch-text #ECE9E2
--arch-muted #A3A39B --arch-acid #C6FF3D --arch-coral #FF5C33
--arch-rule rgba(236,233,226,.14)
--arch-display: var(--font-display) 800 --arch-body: var(--font-body)
--arch-mono: var(--font-mono)
scale clamp(3.5rem, 11vw, 12rem) / 2rem / 1.125rem / .875rem / .6875rem
```

**Generated assets**
- `GrainPlate.astro` — animated 2% film grain, `steps()` not smooth.
- `BigIndex.astro` — 5rem mono numerals, outlined variant.
- `ProjectPlate.astro` — one abstract SVG per project: orbit, grid, waveform,
  typographic block. Four variants, same stroke weight.
- `ScanLine.astro` — 1px acid line with a slow 8s vertical drift.
- `MarqueeTape.astro` — acid strip, duplicated track, `aria-hidden`.

**Story**
- ۰ سیگنال: title card — name, one cold line, status row.
- ۱ روش: three short declaratives, each with a numeral.
- ۲ میدان: horizontal rail, each project a scene with a logline.
- ۳ اثر: research + certifications as a credits roll.
- ۴ دعوت: huge mailto, no button chrome.

**Motion:** title-card line reveal (masked spans, 90ms stagger), horizontal pin
on desktop only (native scroll on mobile/reduced motion), magnetic mailto
(desktop only). Nothing loops except grain and scan line.

---

## ۰۴ — تک‌رنگ + برق / «Electric Grid»

**Metaphor:** a wall of well-made objects with one live wire running through.

**Tokens**
```
--mono-bg #FAFAF7 --mono-ink #0D0D0D --mono-muted #6B6B6B
--mono-accent #2B3BFF --mono-rule rgba(13,13,13,.12)
--mono-display: var(--font-display) --mono-body: var(--font-body)
--mono-latin: var(--font-serif) italic --mono-mono: var(--font-mono)
scale clamp(2.5rem, 6vw, 5.5rem) / 1.75rem / 1.125rem / .9375rem
radius 0 (sharp tiles) with one 999px orbit element as the exception
```

**Generated assets**
- `AsteriskMark.astro` — 8-spoke cobalt asterisk, one spoke offset.
- `OrbitDot.astro` — small SVG orbit with a single dot, used as a cursor accent.
- `BentoTile.astro` — tile shell with 3 generative fill variants (grid, arcs,
  type specimen) to avoid empty boxes.
- `MarqueeStrip.astro` — thin rule strip with repeated Persian triad.
- `HoverPlate.astro` — the cursor-follow preview panel (text only).

**Story**
- ۰ سیگنال: name + one line + status; the asterisk pulses once.
- ۱ روش: bento map of three lenses; psychology tile is 2×2.
- ۲ میدان: work list with hover plates; each row states role and kind.
- ۳ اثر: research tile + certifications strip.
- ۴ دعوت: a full-width cobalt band with email, the only saturated surface.

**Motion:** bento stagger 70ms; marquee linear 30s; hover plate follows cursor
with rAF and `translate3d` (desktop only); press 0.96. Reduced motion: no plate,
no marquee movement.

---

## ۰۵ — نقشه مغز / «Night Map»

**Metaphor:** a map of attention at night — depth, signal, quiet.

**Tokens**
```
--neu-bg #070B14 --neu-surface #0F1728 --neu-text #E8EEF7
--neu-muted #93A0B8 --neu-blue #6EA8FF --neu-violet #9B7BFF
--neu-border rgba(232,238,247,.12)
--neu-display: var(--font-display) --neu-body: var(--font-body)
--neu-mono: var(--font-mono)
scale clamp(2.75rem, 7vw, 6.5rem) / 1.75rem / 1.0625rem / .875rem
```

**Generated assets**
- `NodeField.astro` — 3 SVG layers (12 / 20 / 28 nodes) with curved edges,
  opacity by depth; no filters on large areas.
- `SignalLine.astro` — a 1px blue line that travels the viewport width once.
- `GlowOrb.astro` — radial-gradient orb, 2 sizes, never over text.
- `ConstellationMark.astro` — 7-node mark used as the logo.
- `TimelineNode.astro` — node + stem for the career timeline.

**Story**
- ۰ سیگنال: «هر آدم یک الگوست؛ خواندنش کار من است.»
- ۱ روش: attention, self-regulation, cognitive assessment — in plain language.
- ۲ میدان: timeline as a signal path; each role is a node.
- ۳ اثر: 3–4 projects + thesis panel.
- ۴ دعوت: signal resolves to one email line.

**Motion:** node pulse (4s, staggered), 2-layer scroll parallax (max 24px),
signal line sweep on load. All frozen under reduced motion. JS ≤ 3KB.

---

## ۰۶ — سوئیسی / «The Record»

**Metaphor:** an annual report about a person. Facts as typography.

**Tokens**
```
--sw-bg #F4F4F0 --sw-ink #111111 --sw-muted #8A8A84
--sw-accent #E63B2E --sw-rule rgba(17,17,17,.16)
--sw-display: var(--font-body) 800 --sw-body: var(--font-body)
--sw-mono: var(--font-mono)
scale clamp(2.5rem, 6vw, 5rem) / 1.5rem / 1.0625rem / .875rem / .75rem
```

**Generated assets**
- `RedRule.astro` — the single accent rule; variants with a 12px overhang.
- `NumberColumn.astro` — mono section numerals ۰۱–۰۶ aligned to the margin.
- `RecordTable.astro` — semantic table shell with hairline rows.
- `StampMark.astro` — small square stamp «م.گ» used once, in the footer.
- `Colophon.astro` — footer block with domain, year, email.

**Story**
- ۰ سیگنال: name + one sentence + fact table. No adjectives.
- ۱ روش: profile paragraph, then education table.
- ۲ میدان: experience table, current roles first.
- ۳ اثر: numbered work list + thesis line.
- ۴ دعوت: colophon with email as the last typographic event.

**Motion:** almost none — row reveal 8px/240ms, link underline sweep 180ms.
No parallax, no marquee, no cursor effects. Restraint is the statement.

---

## Asset rules (all demos)

- Every visual must be generated: inline SVG, CSS gradients, or `<canvas>`.
  No external images, no icon fonts, no stock.
- One stroke weight per asset family (1.25px at 16px, 1.5px at 24px+).
- SVGs use `currentColor` where possible; decorative ones get `aria-hidden`.
- Assets live in `src/components/demos/<slug>/` and are imported by the page.
- Keep each SVG under 8KB; no filters over large areas; no `blur()` on mobile.
