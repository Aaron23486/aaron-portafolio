# Aurora Digital — Aarón Gutiérrez Morales

Personal portfolio of **Aarón Gutiérrez Morales**, software developer. It presents four real business applications with authentic screenshots, verified technologies and direct links to their public GitHub repositories, in Spanish and English.

The site is a showcase, not a platform: there is no login, backend, database, contact form or embedded app. It is a static export of Next.js, served for free on Vercel.

![Open Graph card](public/og/og-en.png)

## Features

- **Four projects, a closed list:** [DACTIVOS](https://github.com/Aaron23486/dactivos), [DDEVOLUCIONES](https://github.com/Aaron23486/ddevoluciones), [DFACTURAS](https://github.com/Aaron23486/dfacturas) and [DCONTROL](https://github.com/Aaron23486/dcontrol). Each card shows a real screenshot, a short summary, the technologies verified in its repository and a **View repository** button.
- **Spanish and English** at `/es/` and `/en/`, sharing the same components. The **ES | EN** switcher keeps the current section and remembers the choice; `/` sends visitors to their saved or browser language (Spanish by default).
- **Résumé download** in the active language, with the other language as an alternative. A button is rendered only if its PDF exists at build time, so there are never broken links.
- **Contact** by email (`mailto:`) and GitHub.
- **Aurora Digital design system:** layered auroras, mountain silhouettes, curved light strokes, glass panels and luminous borders, with a depth composition of real screenshots in the hero.
- **Motion with restraint:** scroll reveals, staggered entrances, hover depth, a cursor spotlight and a subtle pointer parallax. With `prefers-reduced-motion` everything stays usable and still.
- **Accessible:** semantic landmarks, skip link, visible focus, keyboard-operable mobile menu, translated `alt` and ARIA text, WCAG 2.2 AA contrast checked in tests.
- **SEO:** localized titles and descriptions, canonical and `hreflang` links, Open Graph and Twitter cards per language, `sitemap.xml` and `robots.txt`.

## Tech stack

| Layer     | Technology                                                        |
| --------- | ----------------------------------------------------------------- |
| Framework | Next.js 16 (App Router, static export), React 19                  |
| Language  | TypeScript (strict, `noUncheckedIndexedAccess`)                   |
| Styling   | Tailwind CSS 4 with CSS design tokens                             |
| Motion    | Motion for React (`LazyMotion`), CSS keyframes and SVG            |
| Icons     | Lucide                                                            |
| Fonts     | Sora and Inter, self-hosted at build time by `next/font`          |
| Testing   | Vitest, Playwright with axe-core                                  |
| Tooling   | ESLint, Prettier, sharp (image and Open Graph generation scripts) |
| Hosting   | Vercel (free plan, `*.vercel.app`)                                |

## Architecture

Components follow **Atomic Design**, applied pragmatically:

```text
src/
├── app/
│   ├── [locale]/          # /es/ and /en/: root layout (lang, metadata) and page
│   ├── (entry)/           # /: picks the visitor's language and redirects
│   ├── global-not-found.tsx
│   ├── sitemap.ts · robots.ts · icon.svg · globals.css (design tokens)
├── components/
│   ├── atoms/             # Button, Link, Badge, Typography, DecorativeGlow, GithubIcon, BrandMark
│   ├── molecules/         # LanguageSwitcher, NavigationItem, SocialLink, ProjectActions, CvDownload, …
│   ├── organisms/         # Navbar, HeroSection, ProjectCard, ProjectsSection, AboutSection, …
│   └── templates/         # PortfolioTemplate, MotionProvider, RevealObserver
├── data/                  # site config, project catalog, technologies, hero shots, navigation
├── i18n/                  # typed dictionaries (es is the reference type, en must match it)
├── hooks/ · lib/ · types/
public/
├── projects/<repo>/       # optimized WebP screenshots (800 and 1600 px)
├── og/                    # Open Graph images per language
└── cv/                    # résumé PDFs (not versioned, see below)
```

- **Presentation is decoupled from data.** Pages resolve the dictionary, catalog and available CVs, and the template only distributes them. Components receive typed props and never import content directly.
- **Every visible string lives in the dictionaries.** `Dictionary` is inferred from `es.ts`; `en.ts` must have the same shape or the build fails.
- **The catalog is validated at build time.** A repository URL outside `https://github.com/Aaron23486/`, a duplicate id or order, or a screenshot outside the project's folder stops the build.
- **Server components by default.** Only the navbar, the hero composition, the language switcher, the card spotlight and the reveal observer run on the client.

## Getting started

Requirements: Node.js 22 or newer.

```bash
npm ci
npm run dev          # http://localhost:3000/es/
```

To preview the production build exactly as it is deployed:

```bash
npm run build        # static export to out/
npm start            # serves out/ at http://localhost:4173 with brotli/gzip
```

### Scripts

| Script              | What it does                                                      |
| ------------------- | ----------------------------------------------------------------- |
| `npm run dev`       | Development server                                                |
| `npm run build`     | Static export to `out/`                                           |
| `npm start`         | Serves `out/` locally (dependency-free Node server)               |
| `npm run lint`      | ESLint                                                            |
| `npm run typecheck` | Generates route types and runs `tsc`                              |
| `npm run format`    | Prettier (`format:check` to verify only)                          |
| `npm test`          | Unit tests (Vitest)                                               |
| `npm run test:e2e`  | End-to-end and accessibility tests on the built site (Playwright) |
| `npm run images`    | Regenerates the WebP screenshots from local copies of the repos   |
| `npm run og`        | Regenerates the Open Graph images                                 |

Before committing: `npm run format:check && npm run lint && npm run typecheck && npm test && npm run build && npm run test:e2e`. The first end-to-end run needs `npx playwright install chromium`.

## Updating the content

### Add or change a project

1. Add the screenshots (see below) to `public/projects/<id>/`.
2. Add an entry to `src/data/projects.ts`: `id`, `name`, `repositoryUrl`, `subtitle` and `summary` in both languages, `technologies` (verified in the repository), `cover` with its size and `alt` text in both languages, `accent`, `icon`, `order` and `visible`.
3. Run `npm test` and `npm run build`. No component changes are needed.

The portfolio intentionally shows only the four projects above; the unit tests enforce that list, so update them when the list changes on purpose.

### Replace the screenshots

Screenshots come from each repository's `docs/screenshots` or `docs/images` folder and are only resized and converted to WebP, never edited. With the four repositories cloned next to this folder:

```bash
npm run images                      # or: REPOS_ROOT=/path/to/repos npm run images
```

To use a different screenshot, change its source in `scripts/optimize-images.mjs` and its path, size and `alt` text in `src/data/projects.ts` (or `src/data/hero.ts`).

### Update the résumé

Place the files at:

```text
public/cv/aaron-gutierrez-es.pdf
public/cv/aaron-gutierrez-en.pdf
```

The PDFs are listed in `.gitignore` until a public version is approved, so they are not published by accident. To publish them, remove the `/public/cv/*.pdf` line from `.gitignore` and commit the files. Without them the site builds normally and simply hides the download buttons.

### Change contact details or texts

- Name, GitHub, email and public URL: `src/data/site.ts`.
- Any text: `src/i18n/dictionaries/es.ts` and `en.ts` (always both).
- Technologies: `src/data/technologies.ts`.

## Deploying to Vercel (free plan)

1. Push this repository to GitHub (`aaron-portafolio`).
2. In Vercel, **Add New → Project**, import the repository and keep the detected **Next.js** preset. No build settings need to change: the static export goes to `out/`.
3. No environment variables are required: canonical URLs, Open Graph, the sitemap and `robots.txt` use the production domain Vercel exposes at build time (`VERCEL_PROJECT_PRODUCTION_URL`). Set `SITE_URL` only if you add a custom domain later.
4. Deploy. The project name defines the free `*.vercel.app` subdomain (for example `aaron-portafolio.vercel.app`).
5. Every push to `main` deploys again; pull requests get preview URLs.

`vercel.json` adds the security headers: a Content Security Policy, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Cross-Origin-Opener-Policy`, `Permissions-Policy` and HSTS. It also sets long-lived caching for hashed assets. The policy allows inline scripts because a static export cannot use per-request nonces; there are no third-party scripts.

## Security

- No secrets, tokens or environment variables reach the client; the site URL is public by design.
- External links open in a new tab with `rel="noopener noreferrer"` and announce it to screen readers.
- Repository URLs are validated against the owner's GitHub profile.
- Dependencies are kept to a minimum; `npm audit` reports no known vulnerabilities at the time of writing.
- The site has no forms, cookies or analytics.

## License

© Aarón Gutiérrez Morales. All rights reserved. The source code may be read for evaluation purposes.
