import { chromium } from 'playwright';

const b = await chromium.launch({ executablePath: '/usr/bin/google-chrome-stable' });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
p.on('console', (m) => console.log('CONSOLE', m.type(), m.text()));
p.on('pageerror', (e) => console.log('PAGEERROR', e.message));
await p.goto('http://localhost:4321/demos/02-paper/', { waitUntil: 'networkidle' });
await p.waitForTimeout(1200);
const out = await p.evaluate(async () => {
  const first = document.querySelector('.paper-reveal');
  const ioResult = await new Promise((res) => {
    const io = new IntersectionObserver(
      (entries) => res(entries.map((e) => ({ isIntersecting: e.isIntersecting, ratio: e.intersectionRatio }))),
      { threshold: 0.01, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(first);
    setTimeout(() => res('timeout'), 2000);
  });
  return {
    htmlClass: document.documentElement.className,
    count: document.querySelectorAll('.paper-reveal').length,
    inCount: document.querySelectorAll('.paper-in').length,
    firstRect: first.getBoundingClientRect().toJSON(),
    ioResult,
    scrollY: window.scrollY,
    scrollingElement: document.scrollingElement?.tagName,
    bodyOverflow: getComputedStyle(document.body).overflow,
    htmlOverflow: getComputedStyle(document.documentElement).overflow,
  };
});
console.log(JSON.stringify(out, null, 2));
await b.close();
