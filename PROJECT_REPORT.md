# Ciigus Website — Project Report

_Analysis date: 2026-09-28 · Commit analysed: `179962a` (main, clean) · Analysis only, no source files changed._

> ## ✅ Fix log: 2026-09-28
>
> These fixes are applied in the working tree (uncommitted). Items fixed below are marked **✅ FIXED** in place.
>
> | # | Fix | Files | Verified |
> |---|---|---|---|
> | 1 | Base CSS moved into `@layer base`, so Tailwind text colours work on links again | `src/index.css` | Packages "Get Started" `rgb(13,13,13)` → white; active nav link → white; /contact WhatsApp link → teal `#00ba9c` |
> | 2 | "ClickUp" logo was Discord's; replaced with the real ClickUp mark, self-hosted | `src/data/content.js`, new `public/assets/tech/clickup.svg` | Loads in both marquee copies |
> | 3 | React key-spread warning | `src/components/Footer.jsx` | Warning gone on every page |
> | 4 | GSAP "target not found" (dead `data-hero="badge"` step removed). **Also found and fixed: the hero CTA buttons ("Explore Services" / "Start a Project") were invisible in production.** GSAP recorded opacity ~0 as their end value because of the buttons' CSS `transition-all`; the timeline now animates the `[data-hero="cta"]` wrapper instead | `src/components/Hero.jsx` | Warning gone; both CTAs at opacity 1; hover effects restored |
> | 5 | 404 page in the site's design, with a catch-all route | new `src/pages/NotFoundPage.jsx`, `src/App.jsx`, `src/data/content.js` (`notFound`) | Unknown and nested URLs show the 404 with navbar and footer |
> | 6 | Hero video 73 MB → **4.33 MB** (720p H.264 High@4.0, 4 reference frames, 0.88 Mbps, two-pass, audio removed, faststart; SSIM **0.982** vs the true 1080p source, see correction 6c). First-frame poster added (50 KB WebP). Autoplay skipped only when Chrome reports `slow-2g`/`2g` or Data Saver is on (poster only, zero video bytes) | `public/assets/Video/Ciigus_hero.mp4`, new `Ciigus_hero_poster.webp`, `src/components/Hero.jsx` | Chrome and Edge with hardware decoding: plays on every reload at 1440px and 390px. 2g / Data Saver: poster only, no video request |
> | 6b | **Follow-up bug in fix 6 (found after a user report that the video wasn't working):** the first version also skipped autoplay on `3g`. Chrome's `effectiveType` is mostly a round-trip-time estimate, and on this machine's normal broadband it flipped to `3g` (RTT 300–800 ms) after a few requests, leaving the hero frozen on the poster in Chrome and Edge. `3g` is no longer treated as slow. The video was also re-encoded from 16 to 4 reference frames at level 4.0 (it was 5.0) for phone hardware-decoder compatibility | `src/components/Hero.jsx`, `public/assets/Video/*` | Reload test: 6/6 plays in Chrome and 6/6 in Edge, including loads reporting `3g` |
>
> **Final check:** `npm run build` passes with no warnings. All 7 routes (including a 404 URL) were loaded at 1440px and 390px, scrolled end to end, with the Work modal opened. That produced **0 console warnings/errors in dev and 0 in production**, and no horizontal overflow.
>
> **Notes from the fixes:**
> - The original 73 MB video is still in git history (commit `b1fb4b6`), so the repo stays large unless the history is rewritten (optional, not done).
> - `navigator.connection` only exists in Chromium browsers; Safari and Firefox always autoplay.
> - `public/circuit-bg.jpg` (176 KB) is now redundant behind the poster and could be removed.

> ## ✅ Fix log: 2026-09-30 (contact forms)
>
> These changes are in the working tree (uncommitted).
>
> | # | Fix | Files |
> |---|---|---|
> | 7 | **Both contact forms now send email via Web3Forms.** They POST JSON to `https://api.web3forms.com/submit` with `subject: "New enquiry from Ciigus website"`, `from_name`, `replyto` (the sender's email, so Gmail's Reply goes straight to them) and a `form` field saying which form was used. The access key comes from `VITE_WEB3FORMS_KEY` in `.env` (git-ignored), and `.env.example` documents it. There is a Web3Forms `botcheck` honeypot, a loading state ("Sending…", disabled and `aria-busy`, double submits blocked), and a 15 s timeout. "Thanks!" shows only when Web3Forms returns `success: true`. On failure, an error appears with an "Or message us on WhatsApp" fallback link (pre-filled, so the typed message isn't lost), and the typed values are kept. The form clears after success. Inline validation covers name required, valid email and a non-empty message (the Contact page also keeps phone and service required, as before), with errors linked via `aria-describedby` and focus moved to the first invalid field | new `src/lib/contact.js`, `src/hooks/useEnquiryForm.js`, `src/components/EnquiryActions.jsx`, `src/components/FieldError.jsx`, `.env.example`; `src/components/Contact.jsx`, `src/pages/ContactPage.jsx`, `src/data/content.js` (`enquiryForm`) |
> | 8 | **WhatsApp:** every link now uses `https://wa.me/94782612328` through one helper, `whatsappUrl()`. A new **"Send via WhatsApp"** button next to each submit button opens WhatsApp with the name and message pre-filled (URL-encoded). The number displays as **078 261 2328** on the Contact page, the footer and the home contact section. The duplicate `formatPhone()` helpers were removed, and the old "Or reach us directly on WhatsApp" text link on /contact was replaced by the new button. There is **no floating WhatsApp button**; adding one is pending the owner's decision | `src/data/content.js` (`contact.whatsapp`, `contact.whatsappDisplay`), `src/components/Footer.jsx`, `src/pages/ContactPage.jsx`, `src/components/Contact.jsx` |
> | 9 | **Form accessibility:** every field has a `<label htmlFor>` matching its `id` (via `useId`; the home form uses visually hidden labels to keep its placeholder design). Success text changed from lime `text-green` (1.37:1 contrast) to `text-emerald-700` (readable) | same files |
>
> **Verified:** `npm run build` passes. An end-to-end browser test with **Web3Forms mocked** (no real emails sent) passed **53/53 checks** on both forms (home at 1440px, /contact at 390px). It covered labels, validation, focus, the exact request payload, loading and disabled state, triple click sending exactly one request, success clearing the form, failure showing the WhatsApp fallback, the honeypot, the WhatsApp pre-fill encoding, and every WhatsApp/mailto link on the site. The full route sweep still shows 0 console warnings.
>
> **Note:** Web3Forms access keys are public by design. Any `VITE_*` value is inlined into the built JavaScript, so `.env` keeps the key out of git but not out of the live site. That's expected for Web3Forms; to limit abuse, turn on domain restriction and spam protection in the Web3Forms dashboard if your plan offers it.
>
> **Before deploying:** add `VITE_WEB3FORMS_KEY` in Vercel → Project → Settings → Environment Variables (Production and Preview), then redeploy. Without it the forms show the error and WhatsApp fallback instead of sending.

> ## ✅ Fix log: 2026-10-01 (launch prep)
>
> All committed and pushed to `main`.
>
> | # | Change | Files |
> |---|---|---|
> | 10 | **Floating WhatsApp button** on every page: round WhatsApp green, fixed bottom-right (safe-area aware), opens `wa.me/94782612328` in a new tab with "Hi Ciigus Software, I'd like to know more about your services.", and has an accessible label. Its entrance animation runs only when the visitor hasn't asked for reduced motion (`gsap.matchMedia`), and the hover zoom is `motion-safe`. It sits below modals (z-40), and the footer gained bottom padding, so it never covers the last row. Verified at 390, 1024 and 1440px: it covers no link, button or text at the bottom of the page | new `FloatingWhatsApp.jsx`, `BrandIcon.jsx`; `RootLayout.jsx`, `Footer.jsx`, `content.js` |
> | 11 | **Phone and service optional** on /contact, labelled "(optional)". Empty fields are no longer sent, so enquiry emails have no blank lines | `ContactPage.jsx`, `lib/contact.js`, `content.js` |
> | 12 | **Real social profiles:** Facebook, LinkedIn and Instagram (YouTube and TikTok removed; placeholder comment removed). One `socialLinks` list now drives both the footer and the Contact page, through the shared `BrandIcon` (the duplicated SVG sets are gone) | `content.js`, `Footer.jsx`, `ContactPage.jsx` |
> | 13 | **Privacy Policy (/privacy) and Terms of Service (/terms)**, each with a visible "general template, please review" notice. The footer links to both (they were plain text before) | new `pages/LegalPage.jsx`; `App.jsx`, `Footer.jsx`, `content.js` (`privacyPolicy`, `termsOfService`) |
> | 14 | **SEO:** unique title and description per route, canonical URLs, Open Graph and Twitter `summary_large_image` tags, a 1200×630 share image (`og-image.jpg`, 85 KB) and the theme colour. Link-preview crawlers don't run JS, so a Vite plugin **prerenders one HTML file per route** with its tags baked in, and `vercel.json` `cleanUrls` serves `/services` from `services.html`. `usePageMeta` keeps tags in sync during in-app navigation, and the 404 is `noindex`. Square favicons (`favicon.ico` 16/32/48, 192px `favicon.png`, 180px `apple-touch-icon.png`). `robots.txt` and `sitemap.xml` are generated at build time with `https://www.ciigus.com` URLs | new `lib/seo.js`, `hooks/usePageMeta.js`, `public/og-image.jpg`, `public/favicon.ico`, `public/apple-touch-icon.png`; `vite.config.js`, `vercel.json`, `index.html`, `public/favicon.png`, `content.js` (`site`, `pageMeta`) |
>
> **Verified:** `npm run build` passes. **0 console warnings/errors on all 9 routes (including /privacy, /terms and a 404 URL) at 1440px and 390px, in both dev and the production build.** The contact-form suite passed 56/56 (Web3Forms mocked). All 8 page titles are unique and ≤ 60 characters, descriptions are ≤ 160 characters, and `sitemap.xml` is valid XML.

> ## ✅ Fix log: 2026-10-01 (Work section)
>
> All committed and pushed to `main`.
>
> | # | Change | Files |
> |---|---|---|
> | 6c | **Correction to fix 6b.** The phone-compatibility re-encode was made from the first 720p encode (git `HEAD` at the time was a local commit holding it), not from the original 73 MB 1080p file, and its "SSIM 0.990 vs source" figure was measured against that first encode. Re-encoded from the true original (commit `179962a`) with the same settings: SSIM against the real source went from **0.977 to 0.982** at the same 4.3 MB. Poster regenerated. Playback re-verified at 1440px and 390px | `public/assets/Video/*` |
> | 15 | **Work section rebuilt with the full list:** 12 projects in Business Systems, E-commerce & Web and AI Solutions (the two Ella restaurant projects merged; no client names). New fields: `id`, `category`, `status` (`completed`/`live`/`in-development`), `tech[]`, `link`, `image`, `featured`, plus LogMaster's `cta` ("Request a demo", which opens WhatsApp with "Hi, I'm interested in a LogMaster demo."). The **emoji thumbnails are replaced by designed covers** (category gradient, grid, category icon, project name); setting `image` swaps in a screenshot, and the visible card heading then reappears automatically. **Status badges** on every card. **/work filter tabs** (All / Business Systems / E-commerce & Web / AI Solutions): buttons with `aria-pressed` and counts, a live region announcing results, wrapping on mobile, and a reduced-motion-aware animation. The **home carousel shows the 4 featured projects first**. The **popup** shows Tech Stack and "Visit Live Site" only when filled (verified with temporary test data), plus the demo button. New /work section: **"Digital solutions for the timber & plywood industry"** (LogMaster, inventory, AI defect detection, website + SEO; each opens its project). **Hero stats** are now 10 delivered and 2 in development. The /work meta description is updated | `content.js`, `Work.jsx`, `pages/WorkPage.jsx`, `ProjectModal.jsx`, new `WorkCover.jsx`, `StatusBadge.jsx`, `CategoryIcon.jsx`, `ProjectCardFooter.jsx` |
> | 16 | **New service: "AI & Computer Vision Solutions"** (quality inspection, certificate verification, image recognition), with an image cut from the original hero footage. Also added to the footer service links, the contact form's service list and the /services meta description | `content.js`, `public/assets/Services/ai-computer-vision-quality-inspection.webp` |
>
> **Verified:** `npm run build` passes; 0 console warnings/errors on all 9 routes at 1440px and 390px in dev and production. Work tests passed 22/22 (order, badges, covers, filters, popup, demo link, industry section, mobile fit) plus 2/2 for tech/link rendering. Contact form tests still pass 56/56, and the hero video plays at both widths.
>
> **Still to fill in `content.js`:** each project's `tech` list, `link` for live sites (likely the greenhouse, printer supplies, plywood and Ella restaurant websites), and `image` once screenshots exist (e.g. `/assets/Work/logmaster.webp`).

**Method:** I read every file in `src/`, plus `index.html`, the config files, `README.md` and `CLAUDE.md`. I ran a production build, ran the dev server, and loaded every route in headless Chrome at desktop (1440px) and mobile (390px) widths. That run captured console output, network failures, computed styles and screenshots. I also checked every external image URL, measured all asset sizes, and ran `npm audit`.

---

## 1. Project overview

### What it is
This is **not a personal portfolio**. It is the marketing website for **Ciigus Software**, a software agency in Colombo, Sri Lanka. It presents the company's services, delivery process, recent client work, team values, pricing packages and contact details. The main goal is to generate leads: nearly every section ends in a "Start a Project" or "Contact" call to action.

### Tech stack

| Area | Choice |
|---|---|
| Framework | React 18.3 (SPA, client-side rendered) |
| Routing | react-router-dom 7.18 (`BrowserRouter`, 6 routes) |
| Language | JavaScript (JSX); no TypeScript, no PropTypes |
| Styling | Tailwind CSS v4.3 via `@tailwindcss/vite`; theme tokens in `src/index.css` under `@theme` |
| Animation | GSAP 3.15 + `@gsap/react` (ScrollTrigger, timelines, counters, marquees) |
| Build tool | Vite 5.4 + `@vitejs/plugin-react` |
| Package manager | **npm** (`package-lock.json`). A stale `bun.lockb` is also committed (see §5). |
| Fonts | Google Fonts: Space Grotesk (headings), Plus Jakarta Sans (body) |
| Hosting hint | `vercel.json` with an SPA rewrite, so it is set up for Vercel |

### Run it locally
Requires Node 18+ (tested with Node 22.14 / npm 10.9).

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve dist/ locally
```

### Does it run?
**Yes. The build succeeds and every page renders with no runtime exceptions.**

- `vite build` finished in about 1.5s with **no warnings**. JS bundle: 367 kB (125 kB gzip). CSS: 47 kB (8.4 kB gzip).
- The dev server started with no errors. All 6 routes load without exceptions and without 4xx responses.
- The console shows these warnings in dev (**✅ all three FIXED; 0 console warnings now**):
  1. **Every page, twice:** `Warning: A props object containing a "key" prop is being spread into JSX` from `Footer.jsx:152`. The call is `<SocialButton key={item.key} {...item} />`, and `item` itself contains `key`.
  2. **Home page:** `GSAP target [data-hero="badge"] not found` (plus a follow-on `GSAP target  not found`). `Hero.jsx:47` animates a badge element that no longer exists.
  3. **Unknown URLs:** `No routes matched location "/nope"`, and the page renders **completely blank** (no 404 route).
- `npm audit` finds moderate/high advisories in esbuild, nanoid and postcss. These are **build/dev tooling only**; nothing vulnerable ships to visitors.

---

## 2. Folder and file structure

```
Ciigus-Website/
├── index.html                  HTML shell: title, meta description, favicon, Google Fonts, inline .ticker-track CSS
├── package.json                Scripts (dev/build/preview) and dependencies
├── package-lock.json           npm lockfile (the one actually in use)
├── bun.lockb                   ⚠ Stale Bun lockfile (older than package-lock); should be removed
├── vite.config.js              Vite + React + Tailwind plugins
├── vite.config.js.timestamp-…mjs  ⚠ Vite temp artifact accidentally committed; delete it
├── vercel.json                 SPA rewrite so /services etc. don't 404 on refresh
├── .env                        VITE_WEB3FORMS_KEY (✅ git-ignored, never committed)
├── .env.example                Placeholder for VITE_WEB3FORMS_KEY (✅ added)
├── README.md                   ⚠ Outdated (describes per-component .css files and old CSS variable names)
├── CLAUDE.md                   Coding conventions (partly outdated: says "no routing")
├── dist/                       Old build output (git-ignored)
├── public/                     Served as-is at the site root
│   ├── favicon.png             Tab icon (✅ now square 192×192)
│   ├── favicon.ico             ✅ 16/32/48px icon
│   ├── apple-touch-icon.png    ✅ 180×180 iOS home-screen icon
│   ├── og-image.jpg            ✅ 1200×630 share image for WhatsApp/Facebook/LinkedIn
│   ├── circuit-bg.jpg          Hero fallback background (176 KB)
│   ├── logo-full.png           ⚠ Unused
│   ├── logo-mark.png           ⚠ Unused
│   └── assets/
│       ├── Services/*.webp     11 service card images (28–108 KB each, fine)
│       ├── tech/clickup.svg    ClickUp logo for the tech marquee (✅ added)
│       └── Video/
│           ├── Ciigus_hero.mp4          Hero background video (✅ now 4.33 MB, 720p; was 73 MB, 1080p)
│           └── Ciigus_hero_poster.webp  First-frame poster (✅ added, 50 KB)
└── src/
    ├── main.jsx                React entry; wraps App in BrowserRouter + StrictMode
    ├── App.jsx                 Intro logo overlay animation + route table
    ├── index.css               Tailwind import, @theme tokens, keyframes, base styles, @utility classes
    ├── layouts/
    │   └── RootLayout.jsx      ScrollToTop + Navbar + <Outlet/> + Footer
    ├── pages/                  One file per route
    │   ├── HomePage.jsx        Composes the home sections
    │   ├── ServicesPage.jsx    /services grid
    │   ├── WorkPage.jsx        /work grid + modal
    │   ├── AboutPage.jsx       /about: roles, values, process, CTA
    │   ├── PackagesPage.jsx    /packages: pricing cards + FAQ
    │   ├── ContactPage.jsx     /contact: details, socials, form, office hours (✅ form sends via Web3Forms)
    │   ├── LegalPage.jsx       ✅ /privacy and /terms (content from content.js)
    │   └── NotFoundPage.jsx    Catch-all 404 page (✅ added)
    ├── components/             Reusable sections and widgets
    │   ├── Navbar.jsx          Floating pill navbar + mobile hamburger menu
    │   ├── Footer.jsx          4-column footer, socials, contact info
    │   ├── Hero.jsx            Video hero, headline, CTAs, animated stat counters
    │   ├── TechMarquee.jsx     Scrolling tech-logo strip (CSS animation)
    │   ├── Marquee.jsx         ⚠ Unused text ticker (not imported anywhere)
    │   ├── Services.jsx        Home: auto-scrolling services carousel (GSAP)
    │   ├── Process.jsx         "Idea → product" winding road map (desktop + mobile SVGs)
    │   ├── Work.jsx            Home: stacked-card project carousel (swipe on mobile)
    │   ├── ProjectModal.jsx    Project detail modal (used by Work and WorkPage)
    │   ├── WorkCover.jsx       ✅ Designed project cover, or the `image` screenshot when set
    │   ├── StatusBadge.jsx     ✅ Completed / Live / In Development badge
    │   ├── About.jsx           Home: team roles + value cards
    │   ├── ValueCard.jsx       3D-tilt value card
    │   ├── Contact.jsx         Home: short contact form (✅ sends via Web3Forms)
    │   ├── EnquiryActions.jsx  Submit + "Send via WhatsApp" buttons, success/error messages (✅ added)
    │   ├── FieldError.jsx      Inline field error text (✅ added)
    │   ├── FadeUp.jsx          Scroll-triggered fade-up wrapper
    │   ├── ScrollToTop.jsx     Resets scroll on route change
    │   └── Logo.jsx            Logo mark/full renderer
    ├── hooks/
    │   └── useEnquiryForm.js   Form state, validation, submit/loading/success/error (✅ added)
    ├── lib/
    │   └── contact.js          sendEnquiry (Web3Forms), validateEnquiry, whatsappUrl (✅ added)
    ├── data/
    │   └── content.js          Single source of truth for services, work, packages, FAQ, contact, socials…
    └── assets/
        ├── Ciiguss_withou_text.png  Logo mark actually used (317×352, 83 KB, shown at 40px)
        ├── logo-full.png            Used by <Logo variant="full"> (that variant is never rendered)
        └── logo-mark.png            ⚠ Imported in Logo.jsx but never used
```

**Where things live:**
- Pages: `src/pages/`
- Components: `src/components/`
- Styles: `src/index.css`, plus Tailwind classes in the JSX
- Content: `src/data/content.js`
- Images/video: `public/` and `src/assets/`
- Config: `vite.config.js`, `vercel.json`, `index.html`

---

## 3. Pages and sections

### Routes

| Route | Page | Status | Notes |
|---|---|---|---|
| `/` | HomePage | ✅ | All sections render; ✅ FIXED: contact form now sends via Web3Forms |
| `/services` | ServicesPage | ✅ | Hero, 11-card image grid, CTA |
| `/work` | WorkPage | ✅ | ✅ REBUILT 2026-10-01: 12 projects, category filters, designed covers, status badges, timber & plywood section. Still needs tech stacks, live links and screenshots |
| `/about` | AboutPage | ✅ | Roles, value cards, process map, CTA (mostly the same content as the home About section) |
| `/packages` | PackagesPage | ✅ | Content complete; ✅ FIXED: the invisible "Get Started" buttons (§5 bug #1) |
| `/contact` | ContactPage | ✅ | ✅ FIXED: form sends via Web3Forms, with validation, loading/error states and WhatsApp fallback |
| `*` (unknown) | NotFoundPage | ✅ | ✅ FIXED: styled 404 with quick links and CTAs (was a blank page). Note: hosts still answer these URLs with HTTP 200 (an SPA "soft 404") |
| `/privacy`, `/terms` | LegalPage | ✅ | ✅ ADDED 2026-10-01: template pages with a review notice; linked from the footer |

### Home page sections (in order)

| Section | Status | Notes |
|---|---|---|
| Intro overlay (App.jsx) | ✅ | Logo fades, overlay slides up (about 1.3 s on every load, including 404s) |
| Navbar | ✅ | Works on desktop and mobile. ✅ FIXED: active link now turns white |
| Hero | ✅ | ✅ FIXED: dead `badge` animation removed; CTA buttons (previously invisible) now show; video compressed to 4.33 MB with poster and slow-connection handling |
| TechMarquee | ✅ | ✅ FIXED: "ClickUp" showed Discord's logo; now the real ClickUp mark (self-hosted) |
| Services carousel | ✅ | Auto-scrolls, pauses on hover |
| Process road map | ✅ | Separate desktop and mobile SVGs with scroll-scrubbed path |
| Work carousel | ✅ | ✅ 12 projects, featured first, designed covers and status badges (2026-10-01) |
| About | ✅ | Roles and value cards |
| Contact (short form) | ✅ | ✅ FIXED: sends via Web3Forms; "Send via WhatsApp" button added |
| Footer | ✅ | ✅ FIXED: Privacy/Terms are real links; real Facebook, LinkedIn and Instagram profiles |

### Placeholder, dummy and dead content found
- ~~**Contact forms (both):** fake submission.~~ ✅ FIXED (2026-09-30). Was: `Contact.jsx:22-38` has a commented Formspree example with `https://formspree.io/f/XXXX`. `ContactPage.jsx:122-132` only calls `setSent(true)`. **Every lead is lost.**
- ✅ FIXED (2026-10-01): real Facebook, LinkedIn and Instagram links; YouTube and TikTok removed. Was: **Social links** (`content.js:291-297`): `youtube.com/@ciigus`, `facebook.com/ciigus`, `instagram.com/ciigus`, `tiktok.com/@ciigus`. The source comment says _"update with your real profile URLs"_. Confirm they are really Ciigus's accounts.
- ✅ FIXED (2026-09-30): WhatsApp is now `94782612328` (wa.me format) with display `078 261 2328`, and `formatPhone()` is removed. Was: **Contact info** (`content.js:283-289`): the comment says _"update with your real info"_. The WhatsApp comment says "no + or spaces", but the value is `+94782612328`. wa.me links officially expect the number without the `+`. `formatPhone()` depends on the `+`, so fix both together.
- ✅ FIXED (2026-10-01): the full 12-project list with designed covers; `tech`/`link`/`image` fields are ready but still empty. Was: **Work items:** emoji thumbnails (🏔️📋🪵💰) instead of screenshots. No client names or links. The `tech` field that `ProjectModal` supports is never filled, so the modal's "Tech Stack" block never appears.
- ✅ FIXED (2026-10-01). **Footer:** `Privacy Policy · Terms of Service` was plain text (`Footer.jsx:203`), not links.
- **Footer service links:** all 6 go to `/services`. None deep-link to the specific service.
- ✅ FIXED (2026-10-01): hero stats are now "10 Projects Delivered / 2 In Development / 100% Client Focused", matching the project list. Was: "2+ Products Shipped / 3+ Active Projects".
- **Unused content:** `marqueeItems` (only used by the unused `Marquee.jsx`) and the `invert` flag on tech logos.
- **Typos/copy:** `ContactPage.jsx:173` "Tell us about your project **,** we'll…" (stray space before the comma). Asset filename `Ciiguss_withou_text.png`.
- No lorem ipsum and no TODO/FIXME comments anywhere.

---

## 4. Features and functionality

| Feature | Status | Detail |
|---|---|---|
| Routing / navigation | ✅ | 6 routes; navbar and footer links all resolve; scroll resets on route change; `vercel.json` handles refresh |
| Active nav state | ✅ | ✅ FIXED: underline and white text both work |
| Mobile menu | ✅ / 🟡 | Opens and closes, and closes on link click. No `aria-expanded`. Hidden links stay keyboard-focusable when closed |
| Responsive layout | ✅ | Tested at 390px and 1440px: no horizontal overflow; mobile-specific Process map and Work carousel |
| Dark mode | ❌ | Not implemented. The site is a fixed light theme with dark navbar, hero and footer. Recent commits deliberately removed dark styling, so this may be intentional |
| Animations | ✅ | Intro overlay, hero timeline, counters, marquees, scroll reveals, road-map scrub, 3D tilt cards, modal. No `prefers-reduced-motion` support |
| Contact form (home) | ✅ | ✅ FIXED: Web3Forms, validation, loading, success/error, honeypot, WhatsApp button |
| Contact form (/contact) | ✅ | ✅ FIXED: same as home; `?package=` prefill from Packages still works |
| WhatsApp / email links | ✅ | ✅ All `wa.me` links use `94782612328`; number shown as 078 261 2328; email is a `mailto:` link |
| Floating WhatsApp button | ✅ | ✅ ADDED 2026-10-01: every page, accessible, reduced-motion aware |
| Project filtering | ✅ | ✅ /work filter tabs with `aria-pressed`, counts and a live region (2026-10-01) |
| Project detail | 🟡 | ✅ Shows the cover, status, Tech Stack (when filled), Visit Live Site (when linked) and LogMaster's demo button. Still: opens and closes on backdrop/✕ only. No Escape-key close, no focus trap, no `role="dialog"`, no body scroll lock |
| Work carousel | ✅ | Arrows (desktop), swipe and dots (mobile), counter |
| 404 page | ✅ | ✅ FIXED: `NotFoundPage` via `<Route path="*">` |
| Legal pages | ❌ | Missing |
| Per-page titles / SEO | ✅ | ✅ FIXED 2026-10-01: unique title, description, OG/Twitter tags per route, prerendered for crawlers |
| Analytics | ❌ | None |

---

## 5. Code quality and problems

### Bugs (ordered by impact)

1. **✅ FIXED. 🔴 Unlayered base CSS overrides Tailwind text colours on every link.** `src/index.css:70-73` declares `a { color: inherit; }` outside any `@layer`. In Tailwind v4, utilities live in `@layer utilities`, and **unlayered rules always beat layered ones**, so `text-white`, `text-accent2`, `hover:text-white` etc. do nothing on `<a>`/`<Link>`. I verified the computed styles in the browser:
   - Packages page: the Starter and Enterprise **"Get Started →" buttons render `rgb(13,13,13)` text on a `#0d1626` card**, a 1.07:1 contrast ratio. They are effectively invisible (confirmed in a screenshot).
   - The navbar active link never turns white.
   - `/contact` "Or reach us directly on WhatsApp" renders black instead of teal.
   - This is likely why `Footer.jsx`, `TechMarquee.jsx` and the mobile menu use inline `style={{color}}` and JS `onMouseEnter` hover handlers: they were workarounds.
   - **Fix:** wrap the base rules (`html`, `body`, `a`, `img`, `button`) in `@layer base { … }`. Then check pages that relied on the old behaviour. Effort: small.
2. **✅ FIXED (2026-09-30). 🟠 No contact form backend.** Both forms show a success message while sending nothing. Effort: small–medium.
3. **✅ FIXED. 🟠 React key-spread warning** (`Footer.jsx:152`). `key` is now destructured out of `item`.
4. **✅ FIXED. 🟡 Dead GSAP target** (`Hero.jsx:47-51`): the `[data-hero="badge"]` step was removed.
   - **4b. ✅ FIXED (found during this fix). 🔴 Hero CTA buttons were invisible in production.** `.from('[data-hero="cta"] > *')` tweened the buttons themselves, and their `transition-all` class made GSAP record opacity ~0 and y 25px as the end state. The timeline now animates the wrapper.
5. **✅ FIXED. 🟡 Wrong logo:** "ClickUp" pointed to Discord's logo; it now uses the self-hosted `/assets/tech/clickup.svg`.
6. **✅ FIXED. 🟡 Blank 404:** `<Route path="*" element={<NotFoundPage />} />` inside `RootLayout`.
7. **🟡 Contact page has two `<h1>`s** ("Contact Us" and "Let's build something great together"). The second should be an `<h2>`.
8. **🟡 Conflicting classes** in `Hero.jsx:122`: `pb-6 … pb-24` and `md:pb-8 … md:pb-20`. The later class wins unpredictably.

### Unused files, code and dependencies
- `src/components/Marquee.jsx` and `marqueeItems` in `content.js`: never imported.
- `src/assets/logo-mark.png`: imported as `markLogo` in `Logo.jsx:1` but never used. It is still emitted into the build (8.9 KB).
- `public/logo-full.png`, `public/logo-mark.png`: never referenced.
- Unused keyframes/animation tokens in `index.css`: `scroll`, `pulse-animation`, `marquee-scroll`, `marquee-vertical` (`--animate-scroll`, `--animate-pulse-*`, `--animate-marquee-vertical`).
- `vite.config.js.timestamp-1782582224257-….mjs`: a Vite temp file committed to git. Delete it and add `*.timestamp-*.mjs` to `.gitignore`.
- `bun.lockb` alongside `package-lock.json`: two lockfiles. Keep npm's and delete `bun.lockb`, which is older and out of sync.
- All npm dependencies are used. Minor/patch updates are available; Vite 8 and React 19 are major upgrades and not required.

### Consistency and maintainability
- **Duplicate code:** ~~`formatPhone` (Footer and ContactPage)~~ (✅ removed), ~~four social SVG icons (Footer and ContactPage)~~ (✅ shared `BrandIcon`), `accentColors` plus the whole roles/values block (About and AboutPage), and project-card markup (Work, WorkPage, ProjectModal).
- **Convention drift from `CLAUDE.md`:** lots of copy is hardcoded in JSX (page headings, CTAs, hero text, footer tagline, office hours in the footer vs `officeHours` in content.js). Heavy inline `style={{}}` in Hero, Footer, ContactPage, Marquee and TechMarquee. Hardcoded hex colours (`#0a0f1e`, `#1e2d45`, `#a8b3cc`, `#0d1626`) that belong in `@theme` tokens.
- `index.html` contains an inline `<style>` for `.ticker-track`; it belongs in `index.css`.
- `README.md` and `CLAUDE.md` are out of date (README describes `.css` files per component and `--accent`/`--brand-grad` variables; CLAUDE.md says "no routing").
- A legacy Tailwind v3 class `bg-gradient-to-t` appears in `Services.jsx:81` (it still compiles in v4; `bg-linear-to-t` is the v4 name). `flex-shrink-0` is similar.

### Accessibility
- **Contrast failures (WCAG AA needs 4.5:1 for normal text):**

  | Element | Ratio |
  |---|---|
  | Packages "Get Started" link on card | ~~1.07:1~~ ✅ FIXED (now white on navy) |
  | Form success message `text-green` (#d5e73c) on white | ~~1.37:1~~ ✅ FIXED (now `text-emerald-700`) |
  | Section labels `text-accent2` (#00ba9c) on white, small text | **2.47:1** |
  | Footer copyright/legal (#4a5568 on #0a0f1e) | **2.54:1** |
  | `text-accent` (#0095fc) on white | 3.13:1 |
- ✅ FIXED (2026-09-30). **Form labels not linked to inputs:** `ContactPage.jsx` `<label>`s have no `htmlFor`, and the inputs have no `id`. The home `Contact.jsx` form has no labels at all (placeholder only).
- **Mobile menu:** no `aria-expanded`/`aria-controls`. The label is always "Open menu". Links remain tabbable while collapsed (it hides via `max-height`/`opacity`).
- **Modal:** no `role="dialog"`/`aria-modal`, no Escape key, no focus management.
- **Motion:** no `prefers-reduced-motion` handling. The autoplaying video, infinite marquees, 3D tilt and intro overlay all always run.
- **Emoji used as icons** (services, values, work, process) aren't `aria-hidden`, so screen readers announce them.
- Duplicated marquee items (rendered twice for looping) should be `aria-hidden` on the second copy.
- ✅ Good: all 5 `<img>` usages have `alt`; social icon links have `aria-label`s; carousel buttons have labels; `<html lang="en">` is set; semantic `<nav>`, `<section>` and `<footer>` are used.

### SEO basics

| Item | Status |
|---|---|
| `<title>` | ✅ unique per route (2026-10-01) |
| Meta description | ✅ present, same on every route |
| Favicon | ✅ `favicon.ico` 16/32/48, square 192px PNG, 180px `apple-touch-icon` (2026-10-01) |
| Open Graph / Twitter tags | ✅ per route, with a 1200×630 share image, prerendered into static HTML (2026-10-01) |
| Canonical URL | ✅ `https://www.ciigus.com/...` per route |
| `robots.txt` / `sitemap.xml` | ✅ generated at build time |
| Structured data (`LocalBusiness` JSON-LD) | ❌ worthwhile for a Sri Lankan agency |
| Rendering | Client-side only; content is invisible until JS runs (Google handles this, but other crawlers and link previewers won't) |

### Performance
- **✅ FIXED: now 4.33 MB at 720p with a WebP poster, and no autoplay on very slow (2g) connections or Data Saver. Remaining: the old blob is still in git history; `circuit-bg.jpg` is now redundant.**
- ~~🔴 Hero video is 73 MB~~ (1920×1080 H.264, 15.4 Mbps, 39 s). It autoplays on every device, including mobile data, and has no `poster`. It is also committed to git; GitHub warns above 50 MB and rejects files above 100 MB.
  - Re-encode to about 2–5 MB: 720p, around 1–1.5 Mbps, 10–15 s loop, WebM/VP9 plus an MP4 fallback.
  - Add `poster="/circuit-bg.jpg"` and `preload="metadata"`.
  - Consider skipping the video on small screens or when `prefers-reduced-motion` / Save-Data is set.
- Logo `Ciiguss_withou_text.png` is 83 KB at 317×352 but shown at 40–48 px. Export it about 96 px tall as WebP/SVG for a few KB.
- The intro overlay hides the page for about 1.3 s on every load, which hurts perceived speed and LCP.
- One JS bundle of 125 kB gzip. Fine for now; routes could be lazy-loaded with `React.lazy` later.
- The tech marquee loads 25 SVGs from three third-party CDNs (jsDelivr, Webflow, Wikimedia). Self-host them for reliability.
- Service images are already WebP and small. ✅

---

## 6. What's left to finish (prioritised)

| # | Task | Why | Effort |
|---|---|---|---|
| 1 | ✅ **DONE (2026-09-30)**: ~~Wire up both contact forms~~ (Web3Forms, loading/error/success states, honeypot, validation, WhatsApp fallback) | The site's main job is lead capture, and it currently loses every submission | Small–Medium |
| 2 | ✅ **DONE**: ~~Fix the unlayered base CSS (`@layer base`)~~ | Invisible Packages buttons; broken link colours | Small |
| 3 | ✅ **DONE**: ~~Compress the 73 MB hero video; add a poster~~ (4.33 MB, poster, slow-connection check) | Huge mobile data cost and slow first load | Small–Medium |
| 4 | ✅ **DONE**: contact info, WhatsApp format and real social media URLs (2026-10-01) | Wrong links = lost trust and leads | Small |
| 5 | 🟡 **Mostly DONE (2026-10-01)**: full project list, categories, filters, covers, status badges. **Still open:** fill `tech`, `link` and `image` per project | The portfolio is the key trust signal; emoji look unfinished | Medium |
| 6 | ✅ **DONE**: ~~Add a 404 route~~ | Unknown URLs are blank | Small |
| 7 | ✅ **DONE (2026-10-01)** except the optional LocalBusiness JSON-LD: ~~per-route title/description, Open Graph/Twitter + share image, robots.txt, sitemap.xml, square favicon and apple-touch-icon~~ | Discoverability and link previews | Medium |
| 8 | ✅ **DONE (2026-10-01)** as templates: ~~Privacy Policy and Terms pages, linked from the footer~~. **Still open:** have them reviewed, then remove the template notice | Legal and trust | Small–Medium |
| 9 | ✅ **DONE**: ~~Fix console warnings~~ (footer key, `badge` target), plus the invisible hero CTAs | Clean console | Small |
| 10 | ✅ **DONE**: ~~Fix the wrong "ClickUp" (Discord) logo~~. Still open: self-host the other 24 tech logos | Correctness and reliability | Small |
| 11 | **Accessibility pass**: ~~label/`id` pairs~~ ✅, contrast fixes (~~success message~~ ✅, section labels, footer legal), menu `aria-expanded` and focus handling, modal dialog semantics and Escape key, `prefers-reduced-motion` | Usability and compliance | Medium |
| 12 | **Clean-up**: delete `Marquee.jsx`, unused logos, unused keyframes, `bun.lockb`, the Vite timestamp file; remove the unused `markLogo` import | Hygiene | Small |
| 13 | **Refactor duplication** (~~shared social icons~~ ✅, ~~`formatPhone`~~ ✅, project card) and move hardcoded copy and colours into `content.js` and `@theme` per `CLAUDE.md` | Maintainability | Medium |
| 14 | **Update `README.md` and `CLAUDE.md`** to match the current router and page architecture | Onboarding | Small |
| 15 | Shorten or skip the intro overlay on repeat visits; optimise the logo PNG | Perceived performance | Small |
| 16 | Add analytics (Vercel Analytics / GA4 / Plausible) | Measure leads | Small |
| 17 | Optional: dark mode, project filtering, route lazy-loading, prerendering for SEO | Nice-to-have | Medium–Large |
| 18 | `npm audit fix` (non-breaking) for dev-tool advisories | Hygiene; build-time only | Small |

---

## 7. Deployment readiness

**Verdict: it is technically deployable today but not ready to launch.** It builds cleanly and works on desktop and mobile, and `vercel.json` already exists (likely already connected to Vercel, given the "fix 404 on route refresh" commit).

**Status (2026-10-01): all code-side launch blockers are fixed.** The site is live on Vercel at **https://www.ciigus.com** (`ciigus.com` 308-redirects there).

Fixed: contact forms, invisible Packages and hero buttons, the 73 MB video, social links, 404 page, Privacy/Terms pages, per-page SEO and share previews, favicons, robots.txt and sitemap.

**What's still left before launch, in priority order:**

| # | Item | Who | Effort |
|---|---|---|---|
| 1 | **Add `VITE_WEB3FORMS_KEY` in Vercel** (Settings → Environment Variables, Production + Preview) and **redeploy**, then send one real test enquiry from www.ciigus.com and check Gmail (and Spam) | Owner | 5 min |
| 2 | **Have the Privacy Policy and Terms reviewed**, then delete the `reviewNote` lines in `content.js` to remove the template notice | Owner / adviser | Small |
| 3 | After deploying, **check link previews** (paste www.ciigus.com/services into WhatsApp; use the Facebook Sharing Debugger and LinkedIn Post Inspector to refresh their caches) and **submit `https://www.ciigus.com/sitemap.xml` in Google Search Console** | Owner | Small |
| 4 | **Fill in project details** in `content.js`: `tech` for all 12, `link` for the live websites, and `image` screenshots (the designed covers stand in until then). Emoji are already gone (#5) | Owner + Dev | Small |
| 5 | **Remaining accessibility**: section-label contrast (`#00ba9c` on white, 2.47:1), footer copyright contrast (2.54:1), mobile menu `aria-expanded` and focus handling, project modal dialog semantics and Escape key, reduced motion for the marquees, intro overlay and hero video (#11) | Dev | Medium |
| 6 | **Clean-up**: unused `Marquee.jsx`, unused logos, `circuit-bg.jpg` (now redundant), unused keyframes, stale `bun.lockb`, the committed `vite.config.js.timestamp-….mjs`; optimise the 83 KB logo PNG (#12, #15) | Dev | Small |
| 7 | **Update `README.md` and `CLAUDE.md`** (routing, `src/lib`, `src/hooks`, SEO plugin, `.env`) (#14) | Dev | Small |
| 8 | Optional: LocalBusiness JSON-LD, analytics (if added, **update the Privacy Policy**, which currently says there are no analytics cookies), self-host the remaining tech logos, rewrite git history to drop the old 73 MB video | Dev | Small–Medium |

### Recommended hosting: Vercel
It fits Vite + React out of the box, the repo already has `vercel.json` for SPA routing, the free tier is enough, it gives HTTPS and a global CDN, and serverless functions can later handle the contact form.

**Steps:**
1. Push `main` to GitHub (`ciigussoftware-creator/Ciigus-Website`, already the remote).
2. At vercel.com, choose **Add New → Project → Import** this repository.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`. Install command: `npm install`. (`vercel.json` has `cleanUrls: true`, which the prerendered per-route HTML files rely on; keep it.)
4. **Add the environment variable `VITE_WEB3FORMS_KEY`** (your Web3Forms access key) under Settings → Environment Variables, for Production and Preview. Vite inlines it at build time, so **redeploy after adding or changing it**.
5. Deploy. Every push to `main` then redeploys, and every PR gets a preview URL.
6. **Settings → Domains**: add your domain (e.g. `ciigus.com`) and set the DNS records Vercel shows.
7. After launch, submit `sitemap.xml` in Google Search Console and test link previews (e.g. in WhatsApp).

**Alternatives:**
- **Netlify:** equivalent. Needs a `public/_redirects` file containing `/* /index.html 200` instead of `vercel.json`.
- **Cloudflare Pages:** also good. It serves the SPA fallback automatically, but its 25 MB per-file limit means the video must be compressed first.
- **GitHub Pages:** not recommended; it has no SPA rewrites (needs a 404.html hack) and serves static files only.
