import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const OUT = process.env.OUT_DIR ?? 'screenshots';
const CHROME = process.env.CHROME_PATH ?? '/usr/bin/google-chrome-stable';

const demos = [
  { slug: '01-lab', path: '/demos/01-lab/' },
  { slug: '02-paper', path: '/demos/02-paper/' },
  { slug: '03-archive', path: '/demos/03-archive/' },
  { slug: '04-mono', path: '/demos/04-mono/' },
  { slug: '05-neural', path: '/demos/05-neural/' },
  { slug: '06-swiss', path: '/demos/06-swiss/' },
];

const viewports = [
  { name: 'mobile', width: 390, height: 844, dpr: 2 },
  { name: 'tablet', width: 768, height: 1024, dpr: 1 },
  { name: 'desktop', width: 1440, height: 900, dpr: 1 },
];

const browser = await chromium.launch({ executablePath: CHROME });
const report = [];

for (const demo of demos) {
  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.dpr,
      locale: 'fa-IR',
      colorScheme: 'light',
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
    page.on('console', (m) => {
      if (m.type() === 'error') errors.push(`console: ${m.text()}`);
    });
    page.on('requestfailed', (r) =>
      errors.push(`requestfailed: ${r.url()} ${r.failure()?.errorText ?? ''}`)
    );

    const url = `${BASE}${demo.path}`;
    let status = 0;
    try {
      const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
      status = res?.status() ?? 0;
      await page.evaluate(() => document.fonts.ready);
      // Above-the-fold capture before any scroll.
      const dir = path.join(OUT, demo.slug);
      await mkdir(dir, { recursive: true });
      await page.waitForTimeout(700);
      await page.screenshot({ path: path.join(dir, `${vp.name}-hero.png`) });
      // Walk the page so IntersectionObserver reveals fire, then return to top.
      await page.evaluate(async () => {
        const step = Math.round(window.innerHeight * 0.8);
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
        await new Promise((r) => setTimeout(r, 600));
      });
      await page.waitForTimeout(900);

      await page.screenshot({
        path: path.join(dir, `${vp.name}.png`),
        fullPage: true,
      });

      const metrics = await page.evaluate(() => ({
        title: document.title,
        h1: document.querySelector('h1')?.textContent?.trim() ?? null,
        bodyScrollWidth: document.body.scrollWidth,
        viewportWidth: window.innerWidth,
        horizontalOverflow: document.body.scrollWidth > window.innerWidth + 1,
        height: document.body.scrollHeight,
        liveRegions: document.querySelectorAll('[aria-live]').length,
        imagesWithoutAlt: [...document.querySelectorAll('img:not([alt])')].length,
        links: document.querySelectorAll('a[href]').length,
      }));

      report.push({ ...demo, viewport: vp.name, status, ...metrics, errors });
    } catch (e) {
      report.push({
        ...demo,
        viewport: vp.name,
        status,
        fatal: String(e),
        errors,
      });
    } finally {
      await context.close();
    }
  }
}

await browser.close();
await mkdir(OUT, { recursive: true });
await writeFile(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
