# Deploy runbook

## GitHub Pages (automatic)

Every push to `main` runs the `deploy` workflow (`.github/workflows/deploy.yml`):
lint + typecheck + static export (base path `/digital-chautari`) published to
**https://dhunganasaroj3.github.io/digital-chautari/** — no manual steps.

Static-hosting trade-offs (build-time gated; all disappear in server mode):

- The contact form validates client-side, then opens the visitor's email client
  with a prefilled message (`mailto:`) — no server-side sending, rate limit, or
  honeypot rejection on GitHub Pages.
- One static share image (`public/og.png`) for all pages — per-page generated
  OG images need a server.
- Security headers are server-only (GitHub Pages can't set response headers).

### Custom domain later

1. In `deploy.yml`, set `NEXT_PUBLIC_BASE_PATH: ""` and
   `NEXT_PUBLIC_SITE_URL: https://<your-domain>`.
2. Repo → Settings → Pages → Custom domain; DNS per GitHub's docs.

## Vercel (optional — full server mode)

1. Import the repo in Vercel (Framework: Next.js, defaults are correct).
2. Set env vars in Vercel → Settings → Environment Variables (Production):
   - `NEXT_PUBLIC_SITE_URL=https://<your-domain>`
   - `CONTACT_TO_EMAIL=<real inbox>`
   - `RESEND_API_KEY=<from resend.com>`
3. Deploy. Then verify: contact-form email arrives, OG preview (opengraph.xyz),
   `sitemap.xml` + `robots.txt`, security headers (securityheaders.com).
4. Post-launch: replace the ⟨TBC⟩ content items in `lib/data/`
   (all are data-file edits, no code changes).
