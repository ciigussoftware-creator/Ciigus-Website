# CLAUDE.md

Marketing site for Ciigus Software (Sri Lanka). Client-side React SPA, deployed on Vercel.

## Stack
- React 18 + Vite 5, plain JS/JSX (no TypeScript, no PropTypes)
- react-router-dom 7 (`BrowserRouter` in `src/main.jsx`)
- Tailwind CSS v4 via `@tailwindcss/vite`; theme lives in `src/index.css` `@theme` (no `tailwind.config.js`)
- GSAP + `@gsap/react` for all animation. Don't add another animation library.
- No lint, formatter, tests or CI are configured.

## Commands
```bash
npm install
cp .env.example .env   # set VITE_WEB3FORMS_KEY
npm run dev            # http://localhost:5173
npm run build          # dist/ + per-route HTML, sitemap.xml, robots.txt
npm run preview
```

## Routes (`src/App.jsx`, all nested in `src/layouts/RootLayout.jsx`)
| Path | Page |
|---|---|
| `/` | `pages/HomePage.jsx` (Hero, TechMarquee, Services, Process, Work, About, Contact) |
| `/services` | `pages/ServicesPage.jsx` |
| `/work` | `pages/WorkPage.jsx` (`?category=` filter, `?project=<id>` opens that project's popup, `#timber-plywood`) |
| `/about` | `pages/AboutPage.jsx` |
| `/packages` | `pages/PackagesPage.jsx` (`?industry=` selects a package tab) |
| `/contact` | `pages/ContactPage.jsx` (`?service=`, `?package=` pre-fill) |
| `/privacy`, `/terms` | `pages/LegalPage.jsx` with `privacyPolicy` / `termsOfService` |
| `*` | `pages/NotFoundPage.jsx` |

`RootLayout` renders ScrollToTop, Navbar, the page, Footer and FloatingWhatsApp, and calls `usePageMeta`. Adding a route means adding it in `App.jsx` **and** a `pageMeta` entry in `content.js` (that drives titles, the sitemap and the prerendered HTML).

## Structure
- `src/pages/` one file per route; `src/components/` sections and shared UI (one default-exported function per file)
- `src/data/content.js` single source for copy and data: `services`, `workItems`, `industryPackages`/`packageSystems`, `contact`, `pageMeta`, legal text, nav/footer links. Components map over it; put new copy here, not in JSX. Stats (`workStats`) are computed from `workItems`.
- `src/lib/contact.js` WhatsApp URLs, form validation, Web3Forms submit
- `src/lib/seo.js` per-route meta tags, shared by `vite.config.js` and `src/hooks/usePageMeta.js`
- `src/hooks/useEnquiryForm.js` form state, errors, honeypot, submit status
- `public/assets/` Services, work screenshots, hero video, tech logos (referenced as `/assets/...`). Commit optimized `.webp` only; PNG originals in `public/assets/work/` are git-ignored.
- `src/assets/` logo images imported by `Logo.jsx`

## Contact forms
Two forms (`components/Contact.jsx` on Home, `pages/ContactPage.jsx`) share `useEnquiryForm`. On submit they POST JSON to `https://api.web3forms.com/submit` with `access_key` = `import.meta.env.VITE_WEB3FORMS_KEY`. The key is inlined into the public bundle (normal for Web3Forms) and must also be set in Vercel's environment variables; without it the forms show the error state with a WhatsApp fallback. Every WhatsApp link goes through `whatsappUrl()` in `lib/contact.js`.

## SEO / build
The `ciigus-seo` plugin in `vite.config.js` writes `<route>.html` for each `pageMeta` route with its meta baked in, plus `sitemap.xml` and `robots.txt`. `vercel.json` `cleanUrls` serves them; keep it.

## Styling
- Tailwind classes inline in JSX. No CSS modules, CSS-in-JS or per-component stylesheets.
- Repeated patterns are `@utility` classes in `index.css` (`section-label`, `section-title`, `section-sub`, `btn-primary`, `btn-outline`, `btn-outline-light`…). Add tokens to `@theme` before reusing an arbitrary value.
- Base styles must stay inside `@layer base`, or they override Tailwind utilities.

## Animation (GSAP)
- On-mount animations: `useGSAP(() => {...}, { scope: ref })`, targeting children by `data-*` attributes.
- Scroll reveals: `gsap.registerPlugin(ScrollTrigger)` at module scope; in `useEffect`, use `gsap.context(..., ref)` and return `ctx.revert()`. Use `start: 'top 80%'` and `toggleActions: 'play none none none'`.
- Lists: collect nodes with `ref={(el) => (arr.current[i] = el)}` and animate with `stagger`.
- Wrap new animations in `gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', ...)`.
- Animate a plain wrapper, not elements with CSS `transition-*` classes (buttons); otherwise GSAP records wrong end values.

## Conventions
- Destructure props with defaults in the signature (`Logo({ variant = 'mark', size = 36 })`).
- Comments only for non-obvious constraints or workarounds.
- Some older components still hardcode copy or use inline `style={{}}`; don't copy that pattern into new code.
