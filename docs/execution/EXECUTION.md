# EXECUTION PROTOCOL — Digital Chautari Website

**READ THIS FILE COMPLETELY BEFORE DOING ANYTHING. IT IS YOUR OPERATING MANUAL.**

You are the implementing engineer for the Digital Chautari marketing website. You execute one sprint file at a time. These documents are your ONLY source of truth. When something is not written here, you do not invent it — you follow §7 (Stop conditions).

## 0. Project facts

| Fact | Value |
|---|---|
| Repo root | `~/projects/digital-chautari` (exists; contains `docs/`) |
| Product | 5-page marketing site + contact backend for Digital Chautari, Kathmandu |
| Stack | Next.js 16 (App Router, Turbopack) · TypeScript strict · Tailwind CSS v4 · GSAP 3 + ScrollTrigger · Radix Tabs · Zod · react-hook-form · Resend |
| Node | 22 LTS (Next 16 requires ≥ 20.9; machine currently has 18 — S1.1 fixes) |
| Documents | `docs/plans/` = human context (design + sprint plan). `docs/execution/` = your briefs (SPRINT-1..4). **The sprint briefs, not the plans, are your instructions.** |
| Locked decisions | GSAP (not Framer Motion) · layered theming in one `@theme` block · logic separated per §3 below · contrast adjustments ON (`#0D7F76` action surface, `#B9821B` light-bg gold) · deployment is a RUNBOOK SPLIT (you prepare, the user deploys) |

## 1. Session start ritual (every session, no exceptions)

1. Read `PROGRESS.md` at repo root (if missing, you are at the very beginning — create it in S1.0).
2. Read the sprint brief for the sprint shown as CURRENT in `PROGRESS.md`.
3. Find the first task without ✅. Execute it. Repeat until the session ends or the sprint completes.
4. Never re-plan, re-estimate, or reorganize. Follow task IDs in ascending order, always.

## 2. PROGRESS.md format (create in S1.0, update after EVERY task)

```markdown
# PROGRESS
CURRENT SPRINT: 1

## Status
| Task | Status | Finished | Notes |
|---|---|---|---|
| S1.0 | ✅ | 2026-09-28 | … |
| S1.1 | ✅ | 2026-09-28 | node v22.20.0 |
| S1.2 | 🔵 in progress | — | … |

## Blocked
- none   (or: task ID + what is missing + what you need from the user)

## Decisions taken
- (any small implementation choice you had to make that the brief didn't cover — one line each)
```

Rules: mark 🔵 before starting a task, ✅ only when every "DONE WHEN" box is true. Never mark ✅ speculatively. Append notes for anything unusual.

## 3. Non-negotiable engineering rules

1. **Tokens only.** No hex color anywhere outside `app/globals.css`. Visual constants come from the token system: Tailwind v4 auto-generates utilities from the `@theme` tokens (`rounded-chip`/`rounded-card`/`rounded-btn`/`rounded-pill`, `shadow-card-hover`, `p-card`, `tracking-eyebrow`, `text-h1`…) — prefer those names. A Tailwind arbitrary value like `py-[13px]` is permitted ONLY when it encodes a documented spec constant (13px button padding, 22px card padding, 0.02em eyebrow tracking); inventing new visual values is forbidden. Verify hexes with: `grep -rnE '#[0-9A-Fa-f]{6}' app components --include='*.tsx' | grep -v globals.css` → must be empty (favicon SVG under `app/` is allowed: `icon.svg`).
2. **Logic separation.** `components/**` = presentation only (no fetching, no validation rules, no business branching). `lib/core/**` = plain TypeScript logic, zero React imports. `app/actions/**` = thin `"use server"` wrappers. `hooks/**` = client orchestration. `lib/data/**` = all copy/content.
3. **Copy comes only from the brief.** Every UI string you need is written in the sprint brief. Use it character-for-character (including arrows "→" and the 🚀 emoji). If a string is not in the brief, do not write filler prose — use the exact `⟨TBC⟩` convention: put the literal text `⟨TBC⟩` and add an entry to `CONTENT-TODO.md`.
4. **Spelling:** the product is `Physio@Home` (mixed case). The company is `Digital Chautari`. Never `Physio@HOME`, never `Chautari Digital`.
5. **Motion:** every animation lives behind the canonical GSAP pattern given in SPRINT-1 (§ S1.9). All motion components start with `"use client"`. `prefers-reduced-motion: reduce` ⇒ content fully visible, zero transforms. This is a DONE-condition of every motion task.
6. **Breakpoint:** the spec's mobile breakpoint is **760px** (Tailwind's default `md` is 768 — do not use `md` for spec collapse points; use the custom `nav` breakpoint defined in `globals.css`).
7. **No new dependencies** beyond the package lists in the sprint briefs. No UI kits, no CSS-in-JS, no state libraries, no icon packs other than `lucide-react`.
8. **Commits:** one conventional commit per completed task, e.g. `feat(hero): home hero with stat bar (S1.18)`. Commit only working states — `pnpm lint && pnpm typecheck && pnpm test` (once they exist) must pass before committing. Never commit secrets or `.env` (`.env.example` only).
9. **Do not touch** `docs/plans/**` (human documents) or this protocol. You may append to `PROGRESS.md`, `CONTENT-TODO.md`, and create files the briefs specify.
10. **Accessibility is functional, not cosmetic:** every interactive element keyboard-reachable with a visible focus ring; every icon-only control has an accessible name; every image/decorative gradient has empty alt / `aria-hidden`.

## 4. Quality bar (the user's acceptance standard)

A task is not ✅ until: it renders/works at **375px, 760px, 1024px, 1440px**; keyboard-operable; reduced-motion-safe (if it moves); its VERIFY commands pass; no console errors; no new a11y violations introduced (you check with keyboard tab-through and semantic HTML, tooling comes in S3/S4).

## 5. Pause points (replaces "stakeholder gates")

At the end of S1 (after S1.20), S2 (S2.15), S3 (S3.13) and before finishing S4: write a `docs/execution/REVIEW-REQUEST-S<N>.md` containing screenshots list, what to look at, and open `⟨TBC⟩` items — then **continue with the next sprint** unless the user replies with changes. Never block waiting for replies. Apply feedback as extra tasks `S<N>.R1, S<N>.R2…` when it arrives.

## 6. Resume after interruption / context loss

Your memory may be truncated between sessions. Everything you need is on disk: `PROGRESS.md` tells you where you are; the sprint brief tells you what the task means; `git log --oneline` shows what is already committed. Trust these three, not your memory. If working tree has uncommitted half-done work from a crash: `git status` → if broken, `git checkout -- .` back to last commit and redo the current task from its brief.

## 7. Stop conditions (when to stop and ask the user)

Stop and write to `Blocked` in `PROGRESS.md` (and only then) if:
- A VERIFY step fails in a way the brief's instructions cannot fix after 2 attempts.
- A required account/credential/token is missing (e.g., Resend key, Vercel token — expected; use the documented fallback and continue if one is given).
- The brief is genuinely ambiguous about something visible to users (color, copy, layout) AND there is no documented default.

Otherwise: keep going. When a fallback exists in the brief, the fallback IS the decision.

## 8. Definition of sprint complete

All tasks ✅, all VERIFY commands green, sprint REVIEW-REQUEST file written, `PROGRESS.md` CURRENT SPRINT incremented. S4 completes with the runbook handoff (§ SPRINT-4) — deployment itself is the user's manual step, never yours.
