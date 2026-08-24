# Karan Kashyap - Portfolio

Personal portfolio for Karan Kashyap, an AI backend engineer focused on agentic AI, LLM evaluation, retrieval systems, and backend infrastructure.

Live site: [karankashyap.me](https://karankashyap.me)

## About the site

This is a lightweight static site built with plain HTML, CSS, and JavaScript. It has no build step, framework, or package manager dependency.

- Home page with a short introduction, technical stack, featured work, and GitHub activity
- About page with background and engineering interests
- Resume page with experience, projects, skills, and a downloadable PDF
- Contact page with email and social links
- Responsive layout with shared styling and scroll-reveal behavior

## Project structure

```text
.
├── index.html                 Home page
├── about.html                 About page
├── resume.html                Resume, experience, projects, and skills
├── contact.html               Contact details and links
├── css/style.css              Shared stylesheet
├── js/script.js               Scroll reveals and GitHub activity
├── assets/favicon.ico         Browser icon
├── assets/og-image.png        Social sharing image
├── assets/KaranKashyap_CV.pdf Downloadable resume
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

## Updating the site

Edit the relevant HTML, CSS, or JavaScript file, then preview the result locally. Keep asset references relative to the file that uses them and keep moved files under their matching folders.

When replacing the resume, keep the filename `assets/KaranKashyap_CV.pdf` or update both `resume.html` and `vercel.json`.

After testing, commit and push the changes. Vercel will deploy the updated site automatically.
