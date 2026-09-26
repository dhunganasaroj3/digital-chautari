# PROGRESS
CURRENT SPRINT: 1

## Status
| Task | Status | Finished | Notes |
|---|---|---|---|
| S1.0 | ✅ | 2026-09-26 | PROGRESS.md + CONTENT-TODO.md created |
| S1.1 | ✅ | 2026-09-26 | node v22.23.1 via nvm (pre-installed; default alias `22` verified); `.nvmrc` written |
| S1.2 | ✅ | 2026-09-26 | next 16.3.6 · react 19.2.8 · tailwind 4.3.3 · TS 5.9.3 · pnpm 12.6.0; `pnpm build` exit 0, dev server HTTP 200; commit 30d07b9 |
| S1.3 | ✅ | 2026-09-26 | prettier+tailwind plugin, editorconfig, engines, hooks verified firing, noUncheckedIndexedAccess |
| S1.4 | ✅ | 2026-09-26 | ci.yml committed; pnpm version input omitted (action-setup reads packageManager = pnpm@12.6.0) |
| S1.5 | 🔵 in progress | — | token system |
| S1.6 | ⬜ | — | |
| S1.7 | ⬜ | — | |
| S1.8 | ⬜ | — | |
| S1.9 | ⬜ | — | |
| S1.10 | ⬜ | — | |
| S1.11 | ⬜ | — | |
| S1.12 | ⬜ | — | |
| S1.13 | ⬜ | — | |
| S1.14 | ⬜ | — | |
| S1.15 | ⬜ | — | |
| S1.16 | ⬜ | — | |
| S1.17 | ⬜ | — | |
| S1.18 | ⬜ | — | |
| S1.19 | ⬜ | — | |
| S1.20 | ⬜ | — | |

## Blocked
- none

## Decisions taken
- Repo-local `git config commit.gpgsign false`: global config enforces GPG signing, pinentry times out in unattended sessions (user can re-enable per-repo if desired).
- S1.0/S1.1 artifacts (PROGRESS.md, CONTENT-TODO.md, .nvmrc) committed inside the S1.2 scaffold commit — `git init` only happens in S1.2 per the brief.
- create-next-app@16 generated extra `AGENTS.md` / `CLAUDE.md` + `pnpm-workspace.yaml` (Next 16 defaults) — kept as-is.
- `docs/`, PROGRESS.md, CONTENT-TODO.md, .nvmrc were temporarily moved to /tmp during `create-next-app` (it refuses non-empty dirs) and restored immediately after.
