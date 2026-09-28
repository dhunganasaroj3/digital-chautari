#!/usr/bin/env node
/**
 * UI review harness — static/visual quality pass (companion to review-animations.mjs).
 *
 * Captures settled screenshots of every page at desktop + mobile widths:
 *   - hero after intro settles
 *   - evenly spaced scroll marks (waits long enough for ScrollSmoother inertia
 *     + reveal tweens + counters so shots show the at-rest UI)
 *   - interaction states (products tabs, mobile menu)
 * plus objective DOM checks (console errors, broken images, horizontal
 * overflow, font load status). The judging itself is done by independent
 * agents that read the PNGs — this script only produces the evidence.
 *
 * Usage:
 *   node scripts/review-ui.mjs --round 1 [--url http://localhost:3000] \
 *     [--pages /,/about] [--out review/ui]
 */

import { chromium } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const ROUND = Number(flag("round", "1"));
const BASE_URL = flag("url", "http://localhost:3000");
const PAGES = (flag("pages", "/,/about,/services,/products,/blog,/contact,/faq")).split(",");
const OUT_ROOT = resolve(flag("out", "review/ui"), `round-${ROUND}`);
const SHOTS_DIR = resolve(OUT_ROOT, "shots");

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForServer(url, timeoutMs = 90_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) return true;
    } catch {}
    await sleep(1000);
  }
  return false;
}

/** Settled-state DOM checks. Overflow offenders exclude decorative aria-hidden
 * elements and marquee tracks (intentionally oversized, clipped by overflow-hidden). */
async function domChecks(page) {
  return page.evaluate(() => {
    const vw = window.innerWidth;
    const overflow = [...document.querySelectorAll("body *")]
      .filter((el) => {
        if (el.closest("[data-marquee]") || el.closest("[aria-hidden='true']")) return false;
        const cs = getComputedStyle(el);
        if (cs.position === "fixed") return false;
        const r = el.getBoundingClientRect();
        if (r.width < 8 || r.height < 8) return false;
        return r.right > vw + 2 || r.left < -2;
      })
      .slice(0, 12)
      .map((el) => {
        const r = el.getBoundingClientRect();
        const cls = typeof el.className === "string" ? el.className.slice(0, 70) : "";
        return `${el.tagName.toLowerCase()}[${cls}] rect=(${Math.round(r.left)},${Math.round(r.right)})`;
      });
    const brokenImgs = [...document.querySelectorAll("img")]
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => img.src.slice(0, 120));
    return {
      overflow,
      brokenImgs,
      fonts: document.fonts.status,
      scrollHeight: document.body.scrollHeight,
    };
  });
}

async function capturePage(browser, route, vp) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
  });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));
  page.on("pageerror", (err) => errors.push(String(err)));

  const routeName = route === "/" ? "home" : route.replace(/\//g, "_");
  const shot = async (label) => {
    const path = resolve(SHOTS_DIR, `${routeName}-${vp.name}-${label}.png`);
    await page.screenshot({ path, fullPage: false });
    return path.replace(process.cwd() + "/", "");
  };

  await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });
  await sleep(2400); // hero intro (~1.6s + stagger) fully settles
  const shots = [await shot("00-hero")];

  // Interaction states that live near the top of the page.
  if (route === "/products") {
    const tabs = page.getByRole("tab");
    const n = Math.min(await tabs.count(), 4);
    for (let i = 1; i < n; i++) {
      await tabs.nth(i).click();
      await sleep(1400); // panel reveal stagger
      shots.push(await shot(`05-tab-${i}`));
    }
    await tabs.nth(0).click();
    await sleep(800);
  }
  if (vp.name === "mobile") {
    const burger = page.getByRole("button", { name: "Open menu" });
    if (await burger.count()) {
      await burger.click();
      await sleep(700);
      shots.push(await shot("04-menu-open"));
      await page.getByRole("button", { name: "Close menu" }).click();
      await sleep(500);
    }
  }

  // Scroll pass — marks spread over the scrollable range; every stop waits for
  // smoother inertia (~1.2s) + reveal tweens (0.8s + stagger) + counters (1.6s).
  // The extra margin also lets the smoother's transform land close enough to
  // integral pixels that text rasterization can't split letter pairs.
  const maxScroll = await page.evaluate(
    () => document.body.scrollHeight - window.innerHeight,
  );
  const segments = maxScroll > 3200 ? 8 : maxScroll > 1600 ? 6 : 4;
  for (let i = 1; i <= segments; i++) {
    const y = Math.round((maxScroll * i) / segments);
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await sleep(2100);
    shots.push(await shot(`seg-${String(i).padStart(2, "0")}`));
  }

  const checks = await domChecks(page);
  await context.close();
  return { route, viewport: vp.name, shots, consoleErrors: errors, ...checks };
}

async function main() {
  mkdirSync(SHOTS_DIR, { recursive: true });
  const up = await waitForServer(BASE_URL, 5_000);
  if (!up) {
    console.error(`no server at ${BASE_URL} — start one first (pnpm start)`);
    process.exit(1);
  }

  const browser = await chromium.launch();
  const results = [];
  for (const route of PAGES) {
    for (const vp of VIEWPORTS) {
      console.log(`capturing ${route} [${vp.name}]…`);
      results.push(await capturePage(browser, route, vp));
    }
  }
  await browser.close();

  const report = {
    round: ROUND,
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    results,
  };
  const reportPath = resolve(OUT_ROOT, "report.json");
  writeFileSync(reportPath, JSON.stringify(report, null, 2));

  let problems = 0;
  for (const r of results) {
    const bad =
      r.consoleErrors.length + r.brokenImgs.length + r.overflow.length;
    problems += bad;
    console.log(
      `${r.route.padEnd(11)} ${r.viewport.padEnd(8)} shots=${r.shots.length} ` +
        `errors=${r.consoleErrors.length} brokenImg=${r.brokenImgs.length} ` +
        `overflow=${r.overflow.length} fonts=${r.fonts}`,
    );
    for (const o of r.overflow) console.log(`   overflow: ${o}`);
  }
  console.log(
    `\n${problems === 0 ? "objective checks clean" : `${problems} objective problem(s)`} — report: ${reportPath}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
