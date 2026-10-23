# BRIEF — مهدیه گنجی‌منش

Decided 2026-10-23 with Arman. This file is the source of truth; demos must not
contradict it.

## Positioning

**Personal brand across three identities — psychology leads.**

Order of weight: **روانشناسی شناختی → مدیریت پروژه → طراحی و وب**. Design is
the memorable twist, never the headline. Audience: organizations and HR
decision-makers, research/academic peers, and (secondarily) design clients.

No single job target. The site answers: *«این آدم کیست و چه کاری از او برمی‌آید؟»*

## Hard facts (verified)

- Name: **مهدیه گنجی‌منش** — Mahdieh Ganjimanesh
- Domain: **mahdiehgangi.ir**
- Email (only public contact): **ganimanesh_mahdieh@yahoo.com**
- Location: تهران، ایران
- **No portrait, no phone number, no photo of her.** Text and generated
  graphics only.
- Client organizations must be anonymized. Institutes/universities may be named.
- **Never invent metrics, clients, outcomes, testimonials, or awards.**
- Old CVs in `assets-inbox/old-cv/` are background only — do not reproduce them.

### Education

- کارشناسی روانشناسی — دانشکده رفاه — ۱۳۹۶ تا ۱۴۰۰
- کارشناسی ارشد علوم شناختی، گرایش روانشناسی شناختی — مؤسسه علوم شناختی —
  از ۱۴۰۲، در حال تحصیل

### Current roles

- مدیر پروژه — کلینیک ایماژ
- همکار ارزیابی سازمانی مبتنی بر نوار مغزی — انستیتو مغز ایماژ
- ارزیاب روانشناختی و تولیدکننده محتوا — رومینر — ۱۴۰۲ تا اکنون
- طراح، پشتیبان و مسئول سایت — مؤسسه تیبو — ۱۴۰۱ تا اکنون

### Past roles

- کارشناس پژوهش — دانشکده رفاه — ۱۴۰۰ تا ۱۴۰۱
- ارزیاب شناختی CANTAB — مرکز مشاوره و روانشناسی شایسته‌پرور — ۱۴۰۰ تا ۱۴۰۱
- پشتیبانی فنی کلاس‌های مجازی — کانون زبان ایران — ۱۳۹۹ تا ۱۴۰۱
- تولیدکننده محتوا و مسئول اجرایی کارگاه‌ها — کلینیک خانه آینه — ۱۳۹۸ تا ۱۳۹۹
- کارشناس مارکتینگ و مسئول اجرایی کارگاه‌ها — کلینیک خانواده پویا — ۱۳۹۷ تا ۱۳۹۸
- کارآموز تحریک مغناطیسی مغز (TMS) — کلینیک توانبخشی سکته مغزی تیبسم — ۱۴۰۲

### Certifications / training

QEEG، نوروفیدبک و لورتا، tDCS، NIBS (دانشگاه تهران و مؤسسه فارمد)، TMS،
ارزیابی شناختی CANTAB، طراحی تست‌های شناختی با پایتون، پایتون مقدماتی (CS50)،
تربیت پژوهشگر، تربیت مشاور پیش از ازدواج، مایندفولنس و ذهن‌آگاهی، فن ترجمه انگلیسی.

### Research

پایان‌نامه ارشد: **«رابطه جهت‌گیری عملکردی و تسلطی با تفکر واگرا و همگرا با نقش
تعدیل‌گر گشودگی به تجربه»**

### Skills

وردپرس، سئو، تولید محتوا، فتوشاپ، تدوین ویدیو (PowerDirector)، پایتون، HTML/CSS.

### Showable work

1. ارزیابی سازمانی مبتنی بر نوار مغزی — انستیتو مغز ایماژ (clients anonymized)
2. مدیریت پروژه — کلینیک ایماژ
3. وب‌سایت‌های وردپرسی — کلینیک آینه، مؤسسه تیبو (names only, **no links**)
4. پژوهش — پایان‌نامه ارشد
5. طراحی گرافیک و سوشال — بیش از ۱۰ پروژه فریلنسری

## Copy rules

- Persian, RTL, first person («من»), نیمه‌رسمی — credible, human, no corporate fog.
- Persian digits (۰–۹). Respect ZWNJ (نیم‌فاصله). No letter-spacing on Persian.
- Ban list: «خلاق و نوآور»، «با passion»، «همیشه در حال یادگیری»، «سفر من»،
  «دنیای رنگ‌ها»، emoji in place of icons, three-card feature rows, purple
  gradients, generic glassmorphism.
- No fake numbers. If a quantity isn't known, describe the work instead.
- Every section must survive the question: *«چه چیزی را ثابت می‌کند؟»*

## Demos (six, one route each)

| # | Route | Direction | Palette |
|---|-------|-----------|---------|
| 01 | `/demos/01-lab` | آزمایشگاه — clinical, EEG data-viz | white / ink / teal / coral |
| 02 | `/demos/02-paper` | کاغذ و مرکب — warm editorial | cream / ink / rust / olive |
| 03 | `/demos/03-archive` | آرشیو سرد — dark cinematic | near-black / bone / acid |
| 04 | `/demos/04-mono` | تک‌رنگ + برق — bento, cobalt | off-white / black / #2B3BFF |
| 05 | `/demos/05-neural` | نقشه مغز — neural, atmospheric | navy / blue-violet / glow |
| 06 | `/demos/06-swiss` | سوئیسی — strict grid, restrained | bone / black / red |

Each demo writes its own copy. Tone is being tested, not assumed.

## Technical

- Astro 7, static, `output: 'static'`.
- Shared: `src/styles/global.css`, `src/layouts/Base.astro`, `src/data/facts.ts`.
- Self-hosted fonts only (`@fontsource*`), no Google Fonts CDN (unreliable in Iran).
- JS budget: prefer CSS + IntersectionObserver. GSAP/Lenis allowed if justified.
- Must respect `prefers-reduced-motion`, keyboard nav, visible focus, 4.5:1 body
  contrast, 390/768/1440 breakpoints.
- Generated SVG/CSS/canvas visuals only. No stock photos, no external images.
- Deploy target: Cloudflare. Review: local screenshots at 390/768/1440.
