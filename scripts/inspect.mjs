import { chromium } from 'playwright';

const url = process.argv[2] ?? 'http://localhost:4321/demos/02-paper/';
const selector = process.argv[3] ?? '.paper-reveal';

const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome-stable' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(url, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
await p.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 700) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 100));
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 500));
});
const info = await p.evaluate((sel) => {
  const rev = [...document.querySelectorAll(sel)].map((el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      tag: el.tagName,
      cls: el.className,
      top: Math.round(r.top + scrollY),
      h: Math.round(r.height),
      clip: cs.clipPath,
      op: cs.opacity,
      disp: cs.display,
    };
  });
  const secs = [...document.querySelectorAll('section')].map((el) => {
    const r = el.getBoundingClientRect();
    return { cls: el.className, top: Math.round(r.top + scrollY), h: Math.round(r.height) };
  });
  return { rev, secs, h: document.body.scrollHeight };
}, selector);
console.log(JSON.stringify(info, null, 2));
await b.close();
