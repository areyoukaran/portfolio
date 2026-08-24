# Karan Kashyap - Portfolio

Personal portfolio site. Static HTML/CSS/JS, no build step, no framework.

**Live:** https://karankashyap.me 

## Structure

```
.
├── index.html          Home
├── about.html           About
├── resume.html          Resume / experience / skills
├── contact.html          Contact form + direct links
├── style.css             Single shared stylesheet
├── script.js              Scroll-reveal + live GitHub stats fetch
├── KaranKashyap_CV.pdf     Downloadable résumé
├── vercel.json            Clean URLs, headers, caching, redirects
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── og-image.png            Social share preview (1200×630)
└── favicon.ico / favicon-*.png / apple-touch-icon.png / android-chrome-*.png
```

## Local preview

No build step needed. Either open `index.html` directly in a browser, or serve it locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

Deployed on [Vercel](https://vercel.com), connected to this repo. Every push to `main` auto-deploys.

`vercel.json` handles:
- Clean URLs (`/about` instead of `/about.html`)
- Permanent redirects from the old `.html` paths
- Security headers (`X-Frame-Options`, `X-Content-Type-Options`, etc.)
- Long-term caching for static assets (CSS/JS/images)
- `/cv` and `/resume.pdf` shortcuts to the résumé PDF

## Updating content

All content is hand-written directly in the HTML files - no CMS. Update the relevant `.html` file, commit, push; Vercel redeploys automatically.

If the résumé PDF changes, replace `KaranKashyap_CV.pdf` (keep the same filename, or update the references in `resume.html` and `vercel.json`).

## Before going live

- [ ] Replace `https://karankashyap.dev` placeholder with the real domain in: `sitemap.xml`, `robots.txt`, and the `<meta>`/canonical tags in all four HTML files
- [ ] Point domain DNS at Vercel (see deployment steps)
