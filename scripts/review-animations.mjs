#!/usr/bin/env node
/**
 * Animation review system — motion spec v2.
 *
 * Drives the site with Playwright: captures mid-animation screenshots and a
 * scroll video per key page, collects hard gates (reduced-motion visibility,
 * console errors, layout shift, long tasks, counter integrity), and merges a
 * human/AI rubric score into one overall 0–10 verdict.
 *
 * Loop rule: re-run after each improvement round until overall >= 8, max 4
 * rounds, best round kept. A failed hard gate caps the overall score at 7.
 *
 * Usage:
 *   node scripts/review-animations.mjs --round 1 \
 *     [--scores fluidity=8,richness=7,choreography=8,consistency=8,craft=7] \
 *     [--pages /,/about] [--url http://localhost:3000] [--no-start-server]
 */

import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const ROUND = Number(flag("round", "1"));
const BASE_URL = flag("url", "http://localhost:3000");
const PAGES = (flag("pages", "/,/about,/services,/products,/contact,/blog")).split(",");
const START_SERVER = !args.includes("--no-start-server");
const SCORES_ARG = flag("scores", "");

const OUT_DIR = resolve(`review/animations/round-${ROUND}`);
const SHOTS_DIR = resolve(OUT_DIR, "shots");
const VIDEO_DIR = resolve(OUT_DIR, "video");

/** Rubric weights — fluidity leads because that was the core complaint. */
const RUBRIC = {
  fluidity: 0.25,
  choreography: 0.2,
  richness: 0.2,
  consistency: 0.2,
  craft: 0.15,
};
const PASS_THRESHOLD = 8;
const GATE_FAIL_CAP = 7;

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

const initScript = `
  window.__dcMotion = { cls: 0, clsEntries: 0, longTasks: 0, longTaskMs: 0 };
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          window.__dcMotion.cls += entry.value;
          window.__dcMotion.clsEntries++;
        }
      }
    }).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        window.__dcMotion.longTasks++;
        window.__dcMotion.longTaskMs += entry.duration;
      }
    }).observe({ type: "longtask", buffered: true });
  } catch {}
`;

async function auditPage(page, route) {
  const errors = [];
  page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));
  page.on("pageerror", (err) => errors.push(String(err)));

  await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });
  await sleep(600); // hydration + first tweens

  const shots = [];
  const shot = async (name) => {
    const path = resolve(SHOTS_DIR, `${route.replace(/\//g, "_") || "home"}-${name}.png`);
    await page.screenshot({ path, fullPage: false });
    shots.push(path);
  };

  // Hero intro: catch the title mask mid-flight, then settled.
  await sleep(250);
  await shot("01-hero-mid");
  await sleep(1800);
  await shot("02-hero-settled");

  // Scripted scroll pass — viewport screenshots mid-reveal at 4 marks.
  const maxScroll = await page.evaluate(() => document.body.scrollHeight - window.innerHeight);
  const steps = 14;
  const marks = new Set([3, 6, 9, 12]);
  for (let i = 1; i <= steps; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round((maxScroll * i) / steps));
    if (marks.has(i)) {
      await sleep(240); // reveals are ~0.8s — 240ms in is mid-flight
      await shot(`scroll-${String(i).padStart(2, "0")}`);
    } else {
      await sleep(130);
    }
  }
  await shot("03-lower-page");

  // Fast reverse + forward burst to exercise marquee velocity + smoothing.
  for (const frac of [1, 0.3, 0.7, 1]) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(maxScroll * frac));
    await sleep(180);
  }
  // Let ScrollSmoother's ~1.2s inertia settle at the bottom before judging
  // what's visible — otherwise bottom reveals look stuck.
  await sleep(2600);
  await shot("04-after-burst");

  const motion = await page.evaluate(() => ({
    ...window.__dcMotion,
    revealCount: document.querySelectorAll("[data-reveal]").length,
    splitTargets: document.querySelectorAll("[data-split]").length,
    splitLines: document.querySelectorAll(".split-line").length,
    marquees: document.querySelectorAll("[data-marquee]").length,
    smoothWrapper: Boolean(document.querySelector("#smooth-wrapper #smooth-content")),
    parallaxTracks: document.querySelectorAll("[data-marquee] .w-max").length,
    hiddenAtRest: [...document.querySelectorAll("[data-reveal], [data-split], [data-count]")]
      .filter((el) => {
        const cs = getComputedStyle(el);
        return Number(cs.opacity) < 1 || cs.visibility === "hidden";
      })
      .map((el) => el.outerHTML.slice(0, 120)),
    // Counter writes its pre-count placeholder ("0", "0+", "0%") at init —
    // the digit regex alone accepts that as final, and no real stat is 0.
    countersFinal: [...document.querySelectorAll("[data-count]")].every((el) => {
      const text = el.textContent ?? "";
      return text.match(/^[^\d]*[\d.,]+.*$/) !== null && !text.match(/^[^\d]*0+[^\d]*$/);
    }),
    counterSamples: [...document.querySelectorAll("[data-count]")].slice(0, 6).map((el) => el.textContent),
  }));

  return { route, errors, shots, motion };
}

async function reducedMotionAudit(browser) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.emulateMedia({ reducedMotion: "reduce" });
  const hiddenByRoute = {};
  for (const route of PAGES) {
    await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      document.documentElement.style.scrollBehavior = "auto";
      const max = document.body.scrollHeight - window.innerHeight;
      for (let y = 0; y <= max; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
    });
    await sleep(350);
    hiddenByRoute[route] = await page.evaluate(
      () =>
        [...document.querySelectorAll("[data-reveal], [data-split], [data-intro], [data-count]")]
          .filter((el) => {
            const cs = getComputedStyle(el);
            return Number(cs.opacity) < 1 || cs.visibility === "hidden";
          })
          .map((el) => el.outerHTML.slice(0, 120)),
    );
  }
  await context.close();
  return hiddenByRoute;
}

function evaluateGates(audits, reducedMotion) {
  const gates = {};
  gates.reducedMotion = Object.values(reducedMotion).every((list) => list.length === 0);
  gates.noConsoleErrors = audits.every((a) => a.errors.length === 0);
  const worstCls = Math.max(...audits.map((a) => a.motion.cls ?? 0));
  gates.layoutStability = worstCls < 0.02;
  const worstTasks = Math.max(...audits.map((a) => a.motion.longTasks ?? 0));
  gates.scrollPerformance = worstTasks <= 12;
  gates.nothingStuckHidden = audits.every((a) => a.motion.hiddenAtRest.length === 0);
  gates.countersFinal = audits.every((a) => a.motion.countersFinal);
  // Every page needs at least the canonical reveals; headline masks /
  // parallax depth are judged by the rubric, not hard-gated.
  gates.motionPresent = audits.every((a) => a.motion.revealCount > 0);
  return gates;
}

function parseScores(raw) {
  if (!raw) return null;
  const out = {};
  for (const pair of raw.split(",")) {
    const [k, v] = pair.split("=").map((s) => s.trim());
    if (k in RUBRIC && v !== undefined) out[k] = Number(v);
  }
  return Object.keys(out).length === Object.keys(RUBRIC).length ? out : null;
}

async function main() {
  mkdirSync(SHOTS_DIR, { recursive: true });
  mkdirSync(VIDEO_DIR, { recursive: true });

  let server = null;
  // detached ⇒ the child leads its own process group; kill that group so
  // pnpm/next actually die — a plain kill() leaks the dev server, whose
  // stale chunk state then poisons the next run's audit.
  const stopServer = () => {
    if (!server?.pid) return;
    try {
      process.kill(-server.pid, "SIGTERM");
    } catch {
      server.kill();
    }
  };
  const up = await waitForServer(BASE_URL, 1_000).catch(() => false);
  if (!up && START_SERVER) {
    console.log("starting dev server…");
    server = spawn(
      "bash",
      ["-c", '. "$HOME/.nvm/nvm.sh" >/dev/null 2>&1; nvm use --silent 22 >/dev/null 2>&1; pnpm dev'],
      { cwd: process.cwd(), stdio: "ignore", detached: true },
    );
    const ok = await waitForServer(BASE_URL);
    if (!ok) {
      console.error("dev server never came up");
      stopServer();
      process.exit(1);
    }
  } else if (!up) {
    console.error(`no server at ${BASE_URL} (use --no-start-server to remove this check's auto-start)`);
    process.exit(1);
  }

  const browser = await chromium.launch();
  const audits = [];
  for (const route of PAGES) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      recordVideo: { dir: VIDEO_DIR, size: { width: 1440, height: 900 } },
    });
    const page = await context.newPage();
    await page.addInitScript(initScript);
    console.log(`auditing ${route}…`);
    audits.push(await auditPage(page, route));
    await context.close(); // flushes video
  }
  const reducedMotion = await reducedMotionAudit(browser);
  await browser.close();
  stopServer();

  const gates = evaluateGates(audits, reducedMotion);
  const scores = parseScores(SCORES_ARG);
  const gatesPassed = Object.values(gates).every(Boolean);

  let overall = null;
  if (scores) {
    const weighted = Object.entries(RUBRIC).reduce((sum, [k, w]) => sum + scores[k] * w, 0);
    overall = gatesPassed ? Number(weighted.toFixed(1)) : Math.min(weighted, GATE_FAIL_CAP);
  }

  const report = {
    round: ROUND,
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    pages: PAGES,
    gates: { ...gates, passed: gatesPassed },
    scores,
    overall,
    passThreshold: PASS_THRESHOLD,
    passed: overall !== null && overall >= PASS_THRESHOLD && gatesPassed,
    audits: audits.map((a) => ({
      route: a.route,
      consoleErrors: a.errors,
      shots: a.shots.map((p) => p.replace(process.cwd() + "/", "")),
      ...a.motion,
    })),
    reducedMotionHidden: reducedMotion,
  };
  const reportPath = resolve(OUT_DIR, "report.json");
  writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log(`\n━━━ Animation review · round ${ROUND} ━━━`);
  for (const a of audits) {
    console.log(
      `${a.route.padEnd(12)} reveals=${a.motion.revealCount} splitLines=${a.motion.splitLines} ` +
        `marquees=${a.motion.marquees} smoother=${a.motion.smoothWrapper} ` +
        `cls=${(a.motion.cls ?? 0).toFixed(4)} longTasks=${a.motion.longTasks} errors=${a.errors.length}`,
    );
  }
  console.log("gates:", Object.entries(gates).map(([k, v]) => `${v ? "✓" : "✗"}${k}`).join("  "));
  if (scores) {
    console.log(
      "scores:",
      Object.entries(scores).map(([k, v]) => `${k}=${v}`).join("  "),
      `→ overall ${overall} (threshold ${PASS_THRESHOLD})`,
    );
    console.log(report.passed ? "RESULT: PASS" : "RESULT: FAIL — iterate and re-run");
  } else {
    console.log(
      `report + captures written to ${OUT_DIR}\n` +
        `review the shots/video, then re-run with --scores fluidity=…,richness=…,choreography=…,consistency=…,craft=…`,
    );
  }
  process.exit(report.passed ? 0 : scores ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
