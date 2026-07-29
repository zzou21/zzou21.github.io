# A. Cartographer — personal site starter

A static HTML/CSS/JS starter for a personal research site, inspired by Jorge
Luis Borges's *On Exactitude in Science*: the idea that a perfect
representation is impossible, and that what survives is a useful, imperfect
fragment.

No build step, no framework, no dependencies except two Google Fonts loaded
by `<link>` in `index.html`.

## Files

```
index.html       home page — hero and links out to each section
about.html        About
research.html      Research
writing.html        Writing
cv.html               C.V.
contact.html            Contact
css/style.css     the whole design system (palette, type, layout)
js/main.js        mobile nav, grid drift on scroll, "scale 1:1" interaction
```

Each page is a standalone HTML file sharing the same header, footer, and
stylesheet — there's no templating engine, so the header/nav markup is
duplicated across files. If you add a page, copy the `<header>` and
`<footer>` blocks from an existing one and update the `aria-current`
attribute on the matching nav link.

## Deploying to GitHub Pages

1. Create a new repository, e.g. `yourusername.github.io` (for a root
   domain) or any name (for a project page at `/reponame/`).
2. Put these three files/folders at the repo root.
3. Push to the `main` branch.
4. In the repo settings, go to **Pages** → **Source**, and select the
   `main` branch, root folder.
5. Your site will be live at `https://yourusername.github.io/` (or
   `/reponame/`) within a minute or two.

No `npm install`, no build command — GitHub Pages serves the HTML directly.

## What to customize first

- **Your name / title** — replace "A. Cartographer" in the `<div
  class="wordmark">` and the `<title>` tag.
- **Hero copy** — `<h1>` and `.hero-note` in `index.html`.
- **Each section page** — `about.html`, `research.html`, `writing.html`,
  `cv.html`, `contact.html` each hold their own placeholder content;
  duplicate the `<article class="territory">` or `<li>` blocks within a
  page to add more entries.
- **CV file** — the "Download full C.V." link in `cv.html` points to
  `cv.pdf`; add your actual file at the repo root, or change the link.
- **Email / links** — update the `mailto:` and placeholder `href="#"`
  links in `contact.html`.
- **Adding a new page** — copy any existing page, keep the `<header>` and
  `<footer>` markup as-is, update `<title>`, the `aria-current` nav link,
  and the `<main>` content, then add a link to it from the nav in
  every page.
- **Colors** — all named as CSS custom properties at the top of
  `style.css` (`--paper`, `--ink`, `--accent`, `--moss`, `--line`). Change
  these five values and the whole palette follows.
- **Fonts** — swap the Google Fonts `<link>` in `index.html` and the
  `--font-display` / `--font-body` / `--font-mono` variables in
  `style.css` if you want a different pairing.

## Notes on the design

- The background coordinate grid and the "scale 1 : 1" hero label are the
  Borges nod — deliberately restrained so the rest of the site (research
  listings, CV, contact) stays plain and legible.
- Clicking or pressing Enter on "scale 1 : 1" triggers a brief zoom
  animation on the hero — the page trying, and failing, to become the
  territory it maps.
- All motion respects `prefers-reduced-motion` and is disabled entirely
  for users who have that setting on.
- The "surveyed territories" grid (Research section) and the dispatch
  list (Writing section) are two different patterns for listing
  content — pick whichever fits how much you plan to publish, or use
  both for different content types as shown.
