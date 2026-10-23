# BRIEF — مهدیه گنجی‌منش / اطلس مغز

Pivoted 2026-10-23. **One page only.** The notebook and all earlier lab routes
are removed; git history keeps them.

## Concept — «مغز، از نزدیک»

A single anatomical plate on paper. The brain is the page: it turns under the
hand, opens, and names its parts. The interface is the margin of a notebook —
pencil, ink, one red pen — not a dashboard.

The page is both the portfolio and the proof: she reads organizations through
brain data, so the visitor reads a brain first.

## What a visitor must understand

1. She is a **cognitive scientist / psychologist**, not a designer.
2. She does **organizational assessment based on brain data** — the rare offer.
3. The atlas is a working instrument, not decoration.
4. How to email her.

## One page, four moves

| Move | What happens |
|---|---|
| ورود | the brain settles onto the paper; name and offer appear |
| چرخاندن | drag / pinch; the brain is the hero |
| باز کردن | search a structure or choose a reading layer; the cortex fades to a shell |
| خواندن | a paper drawer gives the Persian name, Latin name, path, and a short note |

No navbar, no page transitions, no card grid. One drawer, one layer strip,
one email.

## Visual system

- **Paper:** sheet `#efe6d2`, fiber overlay `public/paper/fiber.png`, soft
  vignette. Never pure white.
- **Ink:** `#2a241c`. Pencil `#6f6353`. Red pen `#b23a2b`. Blue pen `#2f4f8f`.
- **Brain:** bone `#dfcfb0`, rendered with a generated pencil-hatch matcap.
  Internal structures use muted colored-pencil tints. Selection is the red pen;
  hover is the blue pen.
- **Type:** `Gulzar` for the title and structure names; `Vazirmatn` for body and
  UI; `Caveat` for Latin names only. No sans-serif headline.
- **Rules:** hairline 1px at 20–30% ink; paper drawer with a taped top and a
  faint red margin line. One soft paper shadow.
- **Restraint:** the brain is the only loud element. Everything else is quiet.

## Interaction

- **Orbit:** pointer drag, wheel/pinch zoom, double-click reset, arrow keys,
  `+`/`−`, `R`.
- **Select:** click a structure or a search result. Surface structures keep the
  cortex visible and mark the patch red. Internal structures fade the cortex to
  a faint shell and fly to the region.
- **Layers:** توجه، خودتنظیمی، حافظه، هیجان، پاداش، زبان، خواب و ریتم. Each
  layer highlights a defensible set of structures and opens a short reading note.
- **Display:** opacity and a clipping plane (sagittal / horizontal / coronal).
- **Deep links:** `/#<structure-code>` selects a region on load.
- **Accessibility:** real buttons and inputs, visible focus, live announcements,
  `Esc` closes/deselects, reduced motion respected.
- **No JS / no WebGL:** a plain message and the email address.

## Technical

- Astro 7, static, Cloudflare.
- three.js with meshopt-compressed GLBs, generated matcap, local clipping.
- Initial surface pack ~668 KB; internal pack ~2.2 MB loaded on demand.
- Mobile: the drawer becomes a bottom sheet; the brain scales to fit.
- Budget: keep the page under ~3 MB transferred; no external CDN.

## Assets and attribution

- 3D region meshes and the base hierarchy are extracted from the
  **Neurotorium 3D Brain Atlas** (Lundbeck Foundation) for a research prototype.
  See `public/brain-atlas/ATTRIBUTION.md`. For a public commercial launch,
  obtain permission or replace the meshes with an open-licensed atlas.
- Persian names, short descriptions, and reading layers in
  `public/brain-atlas/atlas.json` are original.
- The committed GLBs are already merged and meshopt-compressed; raw source
  assets are not part of the repository.

## Facts (verified)

Name: مهدیه گنجی‌منش · mahdiehgangi.ir · ganimanesh_mahdieh@yahoo.com · تهران.
MSc Cognitive Sciences (in progress), BA Psychology (Rafah). Project manager at
کلینیک ایماژ. Organizational assessment based on brain data at انستیتو مغز ایماژ.
QEEG, neurofeedback, tDCS, NIBS, TMS, CANTAB, Python test design. WordPress sites
for کلینیک آینه and مؤسسه تیبو (names only). 10+ freelance design projects.
Thesis: «رابطه جهت‌گیری عملکردی و تسلطی با تفکر واگرا و همگرا با نقش تعدیل‌گر
گشودگی به تجربه» — in progress, not defended.
No photo, no phone. Email only. Client organizations anonymized.
