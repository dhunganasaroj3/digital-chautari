# Deploy runbook (for the site owner — the AI does NOT run these)

1. Push repo to GitHub; import in Vercel (Framework: Next.js, defaults are correct).
2. Set env vars in Vercel → Settings → Environment Variables (Production):
   - `NEXT_PUBLIC_SITE_URL=https://<your-domain>`
   - `CONTACT_TO_EMAIL=<real inbox>`
   - `RESEND_API_KEY=<from resend.com>`
3. Deploy. Then verify:
   - HTTPS + security headers (securityheaders.com)
   - submit the contact form and confirm the email arrives
   - OG preview (opengraph.xyz)
   - `sitemap.xml` + `robots.txt` load
4. The localhost fallbacks swap automatically once `NEXT_PUBLIC_SITE_URL` is set —
   redeploy if the variable is added after the first deploy.
5. Post-launch: replace the ⟨TBC⟩ content items in `lib/data/`
   (all are data-file edits, no code changes).
