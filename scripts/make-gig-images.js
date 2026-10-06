#!/usr/bin/env node
// Erzeugt aus den Demo-Projekten:
//   portfolio/assets/*.jpg          Vorschaubilder für portfolio/index.html
//   fiverr/gig-bilder/*.png         Gig-Galerie (1280x769)
//   fiverr/portfolio-bilder/*.png   Fiverr-Portfolio-Projekte (1024x768, 4:3)
//
// Nutzung:  node scripts/make-gig-images.js
// Benötigt: Playwright (npm i -D playwright && npx playwright install chromium)

const fs = require('fs');
const os = require('os');
const path = require('path');

let playwright;
try { playwright = require('playwright'); } catch { playwright = require('/opt/node22/lib/node_modules/playwright'); }

const ROOT = path.resolve(__dirname, '..');
const DEMOS = path.join(ROOT, 'portfolio', 'demos');
const ASSETS = path.join(ROOT, 'portfolio', 'assets');
const OUT = path.join(ROOT, 'fiverr', 'gig-bilder');
const PF_OUT = path.join(ROOT, 'fiverr', 'portfolio-bilder');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'gig-shots-'));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Per gig: which demo, what the cover says, and how to stage the second "detail" shot.
const GIGS = [
  {
    file: '01-landing-page',
    pf: '1-lumora',
    demo: 'lumora-saas-landing',
    accent: '#f97316',
    kicker: 'Landing page',
    headline: 'Landing pages that turn visitors into customers',
    bullets: ['Custom design, no templates', 'Perfect on every phone', 'Fast and SEO-friendly'],
    detailLabel: 'Interactive pricing, FAQ and signup',
    async detail(page) { await scrollToSelector(page, ['#pricing']); },
  },
  {
    file: '02-business-website',
    pf: '2-harborview',
    demo: 'harborview-dental',
    accent: '#0ea5a4',
    kicker: 'Business website',
    headline: 'A website that makes your business look its best',
    bullets: ['Built for local businesses', 'Booking and contact forms', 'Mobile-first and fast'],
    detailLabel: 'Online booking form with validation',
    async detail(page) { await scrollToSelector(page, ['#book']); },
  },
  {
    file: '03-shopify-store',
    pf: '3-saltgrain',
    demo: 'saltgrain-bakery-shop',
    accent: '#d97706',
    kicker: 'Online store',
    headline: 'Online stores that are easy to buy from',
    bullets: ['Branded, trustworthy design', 'Products, pages and checkout set up', 'Mobile-first shopping'],
    detailLabel: 'Cart drawer with free-delivery progress',
    async detail(page) {
      const add = page.locator('button:has-text("Add to cart"), button:has-text("Add")');
      const n = await add.count();
      for (let i = 0; i < Math.min(2, n); i++) { await add.nth(i).click().catch(() => {}); await sleep(300); }
      const drawerVisible = await page.locator('[role="dialog"]:visible, .cart-drawer.open, .drawer.open, [aria-modal="true"]:visible').count();
      if (!drawerVisible) await page.locator('button[aria-label*="cart" i], button:has-text("Cart")').first().click().catch(() => {});
      await sleep(800);
    },
  },
  {
    file: '04-ai-chatbot',
    pf: '4-ironleaf',
    demo: 'ironleaf-fitness-chatbot',
    accent: '#84cc16',
    kicker: 'AI chatbot',
    headline: 'A chatbot that answers customers 24/7',
    bullets: ['Answers questions instantly', 'Collects leads for you', 'Works on any website'],
    detailLabel: 'Chat widget answering a visitor',
    async detail(page) {
      await page.click('#ivyLauncher');
      await sleep(2500);
      await page.fill('#ivyInput', 'How much does a membership cost?');
      await page.press('#ivyInput', 'Enter');
      await sleep(4000);
    },
    // Third phone in the portfolio image shows the full-screen chat on mobile.
    async mobileDetail(page) {
      await page.click('#ivyLauncher');
      await sleep(2500);
      await page.click('#ivyChips button >> nth=0').catch(() => {});
      await sleep(3500);
    },
  },
  {
    file: '05-automation',
    pf: '5-automation',
    demo: 'lead-automation-workflow',
    accent: '#8b5cf6',
    kicker: 'Automation',
    headline: 'Stop copy-pasting. Automate it.',
    bullets: ['Make, Zapier and n8n', 'Leads, orders, emails, reports', 'Tested and documented'],
    detailLabel: 'Every new lead handled automatically',
    async detail(page) {
      await page.click('#hero-run');
      await sleep(10000);
    },
  },
];

async function scrollToSelector(page, selectors) {
  for (const s of selectors) {
    const el = page.locator(s).first();
    if (await el.count()) { await el.scrollIntoViewIfNeeded(); await page.evaluate(() => window.scrollBy(0, -100)); await sleep(900); return; }
  }
}

async function openDemo(browser, demo, viewport) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto('file://' + path.join(DEMOS, demo, 'index.html'), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await sleep(1200);
  return { ctx, page };
}

// Scrolls a mobile page to a fraction of its height and waits for reveal animations.
async function mobileShotAt(page, fraction, file) {
  await page.evaluate((f) => window.scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * f), fraction);
  await sleep(1200);
  await page.screenshot({ path: file });
}

const dataUri = (file) => 'data:image/png;base64,' + fs.readFileSync(file).toString('base64');

function coverHtml(g, desktop, mobile) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  *{box-sizing:border-box;margin:0}
  body{width:1280px;height:769px;overflow:hidden;font-family:Inter,sans-serif;background:#0f1117;color:#fff;position:relative}
  .glow{position:absolute;width:900px;height:900px;border-radius:50%;background:radial-gradient(circle,${g.accent}55,transparent 65%);right:-260px;top:-180px}
  .left{position:absolute;left:64px;top:0;bottom:0;width:470px;display:flex;flex-direction:column;justify-content:center;gap:26px}
  .kicker{display:inline-block;align-self:flex-start;font-weight:700;font-size:20px;letter-spacing:.08em;text-transform:uppercase;color:${g.accent};border:2px solid ${g.accent};padding:6px 14px;border-radius:999px}
  h1{font-family:'Inter Display',Inter,sans-serif;font-weight:800;font-size:56px;line-height:1.04;letter-spacing:-.02em}
  ul{list-style:none;display:flex;flex-direction:column;gap:12px}
  li{font-size:25px;font-weight:600;display:flex;gap:12px;align-items:center;color:#e5e7eb}
  li:before{content:'';width:26px;height:26px;flex:none;border-radius:50%;background:${g.accent} url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M6 12.5l4 4 8-9' stroke='%23fff' stroke-width='3' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") center/18px no-repeat}
  .browser{position:absolute;left:560px;top:96px;width:820px;border-radius:14px;overflow:hidden;background:#1f2330;box-shadow:0 40px 80px -20px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.08)}
  .bar{height:34px;display:flex;align-items:center;gap:8px;padding:0 14px;background:#262b38}
  .bar i{width:11px;height:11px;border-radius:50%;background:#4b5263}
  .browser img{display:block;width:100%}
  .phone{position:absolute;left:520px;top:300px;width:230px;height:470px;border-radius:34px;background:#0b0d12;padding:10px;box-shadow:0 30px 60px -10px rgba(0,0,0,.8),0 0 0 2px rgba(255,255,255,.12)}
  .phone div{width:100%;height:100%;border-radius:25px;overflow:hidden}
  .phone img{width:100%;display:block}
  </style></head><body><div class="glow"></div>
  <div class="left"><span class="kicker">${g.kicker}</span><h1>${g.headline}</h1><ul>${g.bullets.map((b) => `<li>${b}</li>`).join('')}</ul></div>
  <div class="browser"><div class="bar"><i></i><i></i><i></i></div><img src="${desktop}"></div>
  <div class="phone"><div><img src="${mobile}"></div></div>
  </body></html>`;
}

function detailHtml(g, shot) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  *{box-sizing:border-box;margin:0}
  body{width:1280px;height:769px;overflow:hidden;font-family:Inter,sans-serif;background:linear-gradient(135deg,#0f1117,#1b1f2b);position:relative}
  .browser{position:absolute;left:120px;top:22px;width:1040px;border-radius:14px;overflow:hidden;background:#1f2330;box-shadow:0 40px 80px -20px rgba(0,0,0,.7),0 0 0 1px rgba(255,255,255,.08)}
  .bar{height:34px;display:flex;align-items:center;gap:8px;padding:0 14px;background:#262b38}
  .bar i{width:11px;height:11px;border-radius:50%;background:#4b5263}
  .browser img{display:block;width:100%}
  .label{position:absolute;left:50%;transform:translateX(-50%);bottom:14px;background:${g.accent};color:#0b0d12;font-weight:800;font-size:26px;padding:12px 26px;border-radius:999px;box-shadow:0 12px 30px -8px rgba(0,0,0,.6);white-space:nowrap}
  </style></head><body>
  <div class="browser"><div class="bar"><i></i><i></i><i></i></div><img src="${shot}"></div>
  <div class="label">${g.detailLabel}</div>
  </body></html>`;
}

const FRAME_CSS = `
  .browser{position:absolute;border-radius:12px;overflow:hidden;background:#1f2330;box-shadow:0 30px 60px -18px rgba(15,17,23,.55),0 0 0 1px rgba(15,17,23,.08)}
  .bar{height:28px;display:flex;align-items:center;gap:7px;padding:0 12px;background:#262b38}
  .bar i{width:10px;height:10px;border-radius:50%;background:#4b5263}
  .browser img{display:block;width:100%}
  .phone{position:absolute;border-radius:30px;background:#0b0d12;padding:8px;box-shadow:0 26px 50px -12px rgba(15,17,23,.6),0 0 0 2px rgba(255,255,255,.1)}
  .phone div{width:100%;height:100%;border-radius:23px;overflow:hidden}
  .phone img{width:100%;display:block}`;

// Light, neutral 4:3 canvas tinted with the gig accent, for Fiverr portfolio projects.
const pfBody = (g) => `*{box-sizing:border-box;margin:0}
  body{width:1024px;height:768px;overflow:hidden;font-family:Inter,sans-serif;position:relative;
  background:radial-gradient(circle at 85% 10%,${g.accent}33,transparent 55%),radial-gradient(circle at 0% 100%,${g.accent}22,transparent 50%),#f4f3ef}`;

function pfCoverHtml(g, desktop, mobile) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${pfBody(g)}${FRAME_CSS}
  .browser{left:48px;top:70px;width:800px}
  .phone{left:742px;top:250px;width:234px;height:478px}
  </style></head><body>
  <div class="browser"><div class="bar"><i></i><i></i><i></i></div><img src="${desktop}"></div>
  <div class="phone"><div><img src="${mobile}"></div></div>
  </body></html>`;
}

function pfDetailHtml(g, shot) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${pfBody(g)}${FRAME_CSS}
  .browser{left:42px;top:52px;width:940px}
  .label{position:absolute;left:50%;transform:translateX(-50%);bottom:30px;background:#111827;color:#fff;font-weight:700;font-size:21px;padding:10px 22px;border-radius:999px;white-space:nowrap}
  .label:before{content:'';display:inline-block;width:10px;height:10px;border-radius:50%;background:${g.accent};margin-right:10px;vertical-align:1px}
  </style></head><body>
  <div class="browser"><div class="bar"><i></i><i></i><i></i></div><img src="${shot}"></div>
  <div class="label">${g.detailLabel}</div>
  </body></html>`;
}

function pfMobileHtml(g, shots) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${pfBody(g)}${FRAME_CSS}
  .phone{top:84px;width:290px;height:600px}
  .phone:nth-child(1){left:42px}.phone:nth-child(2){left:367px;top:64px}.phone:nth-child(3){left:692px}
  </style></head><body>
  ${shots.map((s) => `<div class="phone"><div><img src="${s}"></div></div>`).join('')}
  </body></html>`;
}

(async () => {
  fs.mkdirSync(ASSETS, { recursive: true });
  fs.mkdirSync(OUT, { recursive: true });
  fs.mkdirSync(PF_OUT, { recursive: true });
  const browser = await playwright.chromium.launch();

  for (const g of GIGS) {
    if (!fs.existsSync(path.join(DEMOS, g.demo, 'index.html'))) { console.warn('Demo fehlt:', g.demo); continue; }
    const errors = [];

    // Desktop hero + portfolio thumbnail
    const d = await openDemo(browser, g.demo, { width: 1440, height: 900 });
    d.page.on('pageerror', (e) => errors.push(e.message));
    const desktopPng = path.join(TMP, g.demo + '-desktop.png');
    await d.page.screenshot({ path: desktopPng });
    await d.page.screenshot({ path: path.join(ASSETS, g.demo + '.jpg'), type: 'jpeg', quality: 80 });

    // Detail shot after staging an interaction
    await g.detail(d.page);
    const detailPng = path.join(TMP, g.demo + '-detail.png');
    await d.page.screenshot({ path: detailPng });
    await d.ctx.close();

    // Mobile hero
    const m = await openDemo(browser, g.demo, { width: 390, height: 844 });
    const mobilePng = path.join(TMP, g.demo + '-mobile.png');
    await m.page.screenshot({ path: mobilePng });
    const mobileMid = path.join(TMP, g.demo + '-mobile-mid.png');
    await mobileShotAt(m.page, 0.3, mobileMid);
    const mobileLate = path.join(TMP, g.demo + '-mobile-late.png');
    if (g.mobileDetail) {
      await m.page.evaluate(() => window.scrollTo(0, 0));
      await g.mobileDetail(m.page);
      await m.page.screenshot({ path: mobileLate });
    } else {
      await mobileShotAt(m.page, 0.6, mobileLate);
    }
    await m.ctx.close();

    // Compose gig gallery images
    const c = await browser.newContext({ viewport: { width: 1280, height: 769 } });
    const p = await c.newPage();
    await p.setContent(coverHtml(g, dataUri(desktopPng), dataUri(mobilePng)), { waitUntil: 'load' });
    await p.screenshot({ path: path.join(OUT, g.file + '-1.png') });
    await p.setContent(detailHtml(g, dataUri(detailPng)), { waitUntil: 'load' });
    await p.screenshot({ path: path.join(OUT, g.file + '-2.png') });
    await c.close();

    // Compose Fiverr portfolio images (4:3)
    const pc = await browser.newContext({ viewport: { width: 1024, height: 768 } });
    const pp = await pc.newPage();
    await pp.setContent(pfCoverHtml(g, dataUri(desktopPng), dataUri(mobilePng)), { waitUntil: 'load' });
    await pp.screenshot({ path: path.join(PF_OUT, g.pf + '-1.png') });
    await pp.setContent(pfDetailHtml(g, dataUri(detailPng)), { waitUntil: 'load' });
    await pp.screenshot({ path: path.join(PF_OUT, g.pf + '-2.png') });
    await pp.setContent(pfMobileHtml(g, [mobilePng, mobileMid, mobileLate].map(dataUri)), { waitUntil: 'load' });
    await pp.screenshot({ path: path.join(PF_OUT, g.pf + '-3.png') });
    await pc.close();

    console.log('✓', g.file, errors.length ? `(JS-Fehler: ${errors.join(' | ')})` : '');
  }

  await browser.close();
  fs.rmSync(TMP, { recursive: true, force: true });
})();
