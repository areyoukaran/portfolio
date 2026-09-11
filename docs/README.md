# Karan Kashyap - Portfolio

Personal portfolio for Karan Kashyap, a backend engineer focused on Python APIs, LLM evaluation, adversarial testing, and ML-powered applications.

Live site: [karankashyap.me](https://karankashyap.me)

## About the site

This is a lightweight static site built with plain HTML, CSS, and JavaScript. It has no build step, framework, or package manager dependency.

- Home page with positioning, measured proof, selected projects, and live GitHub activity
- About page with background and engineering approach
- Resume page with Ethara AI, Unified Mentor, and SkillCraft Technology experience, projects, certifications, and an interactive skills grid
- Contact page with email and social links
- Responsive layout with shared styling and scroll-reveal behavior

## Project structure

```text
.
├── index.html                 Home page
├── about.html                 About page
├── resume.html                Resume, experience, projects, certifications, and skills
├── contact.html               Contact details and links
├── css/style.css              Shared stylesheet
├── js/script.js               Scroll reveals, mobile navigation, and GitHub telemetry
├── assets/favicon.ico         Browser icon
├── assets/og-image.png        Social sharing image
├── assets/Karan_Kashyap_Resume.pdf Downloadable resume
├── public/robots.txt          Search crawler rules
├── public/sitemap.xml         Search sitemap
├── site.webmanifest            Web app metadata
└── vercel.json                Routes, headers, caching, and redirects
```

## Run locally

No installation is required. From the project root, start a local static server:

```bash
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000) in a browser. Opening `index.html` directly also works, but a local server better matches production URL behavior.

## Deployment

The site is configured for Vercel. Connect the repository to Vercel and deploy the `main` branch.

The Vercel configuration provides:

- Clean routes such as `/about`, `/resume`, and `/contact`
- Redirects from the original `.html` URLs
- `/cv` and `/resume.pdf` shortcuts for the resume PDF
- Security headers for every response
- Long-term caching for versioned static assets

The Home page reads repository count, language, latest push, and commit activity from GitHub's public API. Profile and repository cards degrade to `—` when GitHub rate-limits a request, while the direct profile link remains available.

## Updating the site

Edit the relevant HTML, CSS, or JavaScript file, then preview the result locally. Keep asset references relative to the file that uses them and keep moved files under their matching folders.

When replacing the resume, keep the filename `assets/Karan_Kashyap_Resume.pdf` or update both `resume.html` and `vercel.json`.

After testing, commit and push the changes. Vercel will deploy the updated site automatically.
