# Ciigus Website: Project Overview

_Read-only analysis, 2026-11-04. Commit `9b10d30` on `main`, clean working tree. No source files, dependencies or config were changed; this file is the only addition._

**Method:** I read every file under `src/`, plus `index.html`, `package.json`, `vite.config.js`, `vercel.json`, `.env.example`, `.gitignore`, `README.md`, `CLAUDE.md`, the existing `dist/` build output and the earlier `PROJECT_REPORT.md`. I checked every local asset path the code references, measured asset sizes and image dimensions, ran `npm outdated` and requested each external logo URL. I did **not** run the dev server, a fresh build or a browser test, so runtime behaviour below is read from the code. Anything I couldn't confirm is marked **(unverified)** or **(guess)**.

> **Note:** `PROJECT_REPORT.md` (in the repo root) is an earlier report plus a fix log from 28 Sep to 1 Oct 2026. Much of it is now outdated (it says "Legal pages ❌ Missing" in one table, for example). This overview is based on the current code. Where the two disagree, trust this file and check the code.

---

## 1. Project summary

**What it is:** the marketing website for **Ciigus Software**, a small software development company in Colombo, Sri Lanka (`src/data/content.js:7-12`, `contact.location`).

**Who it's for:** Sri Lankan SMEs and growing businesses, with a particular focus on the **timber & plywood industry**. It also targets construction, agriculture/tea, retail, hospitality, healthcare and manufacturing (`workItems[].industry`). The copy also says "clients worldwide" (`footerAbout`).

**What it's trying to achieve:** generate leads. Every page ends in a "Start a Project" / WhatsApp / contact-form call to action. The site:
- presents 8 services (ERP, AI & computer vision, websites & e-commerce, restaurant systems, SEO, mobile/desktop apps, branding, timber & plywood solutions)
- shows a 12-project portfolio
- publishes indicative LKR pricing (3 packages)
- captures enquiries through two contact forms (emailed via Web3Forms) and WhatsApp deep links

**Overall state: functionally complete. A few content and polish gaps remain.**
- All 8 routes plus a 404 are built and styled.
- The forms send real email, provided the env key is set.
- Per-route SEO and the sitemap are generated at build time.
- What's missing is mostly **content**, not features:
  - no tech stacks or live links on any project
  - 5 of 12 projects have no screenshot
  - no testimonials, client logos or team bios
  - the legal pages carry a "template, please review" notice
- There are also accessibility gaps and one serious **image-size regression** in the latest commit (see §11).
- The earlier report says the site is live on Vercel at `https://www.ciigus.com`. My request to that domain timed out, so that's **(unverified)**.

---

## 2. Tech stack

| Area | What's used | Source |
|---|---|---|
| Framework | **React 18.3.1** + react-dom 18.3.1, client-side SPA | `package.json`, `src/main.jsx` |
| Routing | **react-router-dom 7.18.2** (`BrowserRouter`, `<Routes>`, one layout route) | `src/main.jsx`, `src/App.jsx` |
| Language | Plain **JavaScript / JSX** (ES modules). No TypeScript, no PropTypes | |
| Build tool | **Vite 5.4.21** + `@vitejs/plugin-react` 4.7.0, plus a **custom SEO plugin** inside `vite.config.js` | `vite.config.js` |
| Styling | **Tailwind CSS v4.3.2** via `@tailwindcss/vite`. Theme tokens in `@theme` in `src/index.css` (there is no `tailwind.config.js`). Shared `@utility` classes in the same file. A fair amount of **inline `style={{}}`** too (see §11) | `src/index.css` |
| UI libraries | None (no component library). Everything is hand-built | |
| Animation | **GSAP 3.15.0** + **@gsap/react 2.1.2** (`useGSAP`, `ScrollTrigger`, `gsap.matchMedia`, `gsap.ticker`). Plus a few CSS keyframes (`ticker`, `gradient-wave`, `glow-drift`, `grid-pan`) | components, `index.html`, `index.css` |
| Icons | Inline SVG components: `BrandIcon.jsx` (WhatsApp, Facebook, Instagram, LinkedIn), `CategoryIcon.jsx` (3 project categories). A few inline SVG icons in `ContactPage.jsx`. **Emoji** used as icons in several places. Tech logos come from external CDNs | |
| Forms | No form library. A custom hook (`src/hooks/useEnquiryForm.js`) plus helpers (`src/lib/contact.js`) post to **Web3Forms** | |
| Fonts | Google Fonts: **Space Grotesk** (headings) and **Plus Jakarta Sans** (body), weights 300–700, `display=swap`, with preconnect | `index.html:13-18` |
| Linting / formatting | **None.** No ESLint, Prettier or EditorConfig config in the repo | |
| Testing | **None.** No test runner or test files. (The earlier report describes ad-hoc Playwright scripts, which aren't in the repo.) | |
| CI | **None.** No `.github/` workflows | |
| Hosting | **Vercel**: `vercel.json` sets `cleanUrls: true` and an SPA rewrite `/(.*) → /`. The canonical domain in code is `https://www.ciigus.com` (`content.js:9`) | `vercel.json` |
| Package manager | **npm** (`package-lock.json`). There is **also a stale `bun.lockb`** (from July) | |
| Node | No `engines` field or `.nvmrc`. README says Node 18+. This machine has Node 24.21 / npm 11.19 | |

**Outdated packages** (`npm outdated`, 2026-11-04):

| Package | Installed | Latest | Upgrade type |
|---|---|---|---|
| `tailwindcss`, `@tailwindcss/vite` | 4.3.2 | 4.3.4 | patch |
| `gsap` | 3.15.0 | 3.15.1 | patch |
| `react-router-dom` | 7.18.2 | 7.18.5 | patch |
| `react`, `react-dom` | 18.3.1 | 19.3.1 | **major** |
| `vite` | 5.4.21 | 8.3.5 | **major** |
| `@vitejs/plugin-react` | 4.7.0 | 6.2.1 | **major** |

None of these is urgent.

---

## 3. Folder structure

```
Ciigus-Website/
├── index.html                  HTML shell: SEO placeholder block, favicons, Google Fonts, inline .ticker-track CSS
├── vite.config.js              Vite config + custom "ciigus-seo" plugin (per-route HTML, sitemap.xml, robots.txt)
├── vercel.json                 cleanUrls + SPA rewrite
├── package.json / package-lock.json
├── bun.lockb                   stale second lockfile (unused)
├── vite.config.js.timestamp-…mjs   Vite temp file accidentally committed (old config, C:\Personal\… paths)
├── .env.example                documents VITE_WEB3FORMS_KEY
├── .env                        (git-ignored) holds the real key locally
├── README.md                   OUTDATED (describes per-component .css files, Formspree, no router)
├── CLAUDE.md                   coding conventions; partly OUTDATED (says "no routing", mentions Marquee)
├── PROJECT_REPORT.md           earlier audit + fix log (Sep–Oct 2026)
├── dist/                       (git-ignored) last production build, 2 Oct 2026
├── public/                     static files served as-is from "/"
│   ├── favicon.ico, favicon.png, apple-touch-icon.png, og-image.jpg
│   ├── circuit-bg.jpg          hero fallback background (now mostly hidden behind the video poster)
│   ├── logo-full.png, logo-mark.png   UNUSED copies
│   └── assets/
│       ├── Services/           8 service images (.webp)
│       ├── Video/              hero video (4.3 MB mp4) + poster (.webp)
│       ├── tech/clickup.svg    self-hosted ClickUp logo
│       └── work/               7 project screenshots (.webp committed; .png originals git-ignored)
└── src/
    ├── main.jsx                React entry: BrowserRouter + App + index.css
    ├── App.jsx                 intro "logo reveal" overlay + route table
    ├── index.css               Tailwind import, @theme tokens, keyframes, base layer, @utility classes
    ├── layouts/
    │   └── RootLayout.jsx      ScrollToTop + Navbar + <Outlet/> + Footer + FloatingWhatsApp; sets page meta
    ├── pages/                  one file per route (8 files, LegalPage serves 2 routes)
    ├── components/             22 section and shared UI components
    ├── data/
    │   └── content.js          single source of most copy and data (765 lines)
    ├── hooks/
    │   ├── useEnquiryForm.js   form state, validation, submit, honeypot
    │   └── usePageMeta.js      updates <title>/meta/canonical on client-side navigation
    ├── lib/
    │   ├── contact.js          whatsappUrl(), whatsappEnquiryText(), validateEnquiry(), sendEnquiry() → Web3Forms
    │   └── seo.js              per-route meta tag list, shared by the build plugin and usePageMeta
    └── assets/                 logos imported by Logo.jsx (only Ciiguss_withou_text.png is displayed)
```

---

## 4. Routing and pages

All routes are defined in **`src/App.jsx:47-59`**, nested inside **`RootLayout`** (`src/layouts/RootLayout.jsx`). Every page therefore gets the Navbar, Footer, floating WhatsApp button, scroll-to-top-on-navigate behaviour and per-route meta tags.

### Route table

| Route | File | Purpose | In navbar? |
|---|---|---|---|
| `/` | `src/pages/HomePage.jsx` | Landing page: pitch, services, process, portfolio, about, contact | Logo only (also footer "Home") |
| `/services` | `src/pages/ServicesPage.jsx` | Detailed service catalogue | ✅ |
| `/work` | `src/pages/WorkPage.jsx` | Full portfolio with category filter | ✅ |
| `/about` | `src/pages/AboutPage.jsx` | Team roles, values, process | ✅ |
| `/packages` | `src/pages/PackagesPage.jsx` | Pricing tiers + FAQ | ✅ |
| `/contact` | `src/pages/ContactPage.jsx` | Full contact form, details, office hours | ✅ |
| `/privacy` | `src/pages/LegalPage.jsx` with `doc={privacyPolicy}` | Privacy policy (template) | ❌ footer only |
| `/terms` | `src/pages/LegalPage.jsx` with `doc={termsOfService}` | Terms of service (template) | ❌ footer only |
| `*` (anything else) | `src/pages/NotFoundPage.jsx` | 404 page | n/a |

**Dynamic routes:** none. There are no `/projects/:slug` pages. Projects open in a **modal** (`ProjectModal.jsx`) instead.

**Query parameters and hash links that change behaviour:**

| URL | Effect | Code |
|---|---|---|
| `/work?category=business-systems \| ecommerce-web \| ai-solutions` | Pre-selects the filter tab; changing the tab updates the URL (`replace`) | `WorkPage.jsx:26-35` |
| `/contact?service=<exact service title>` | Pre-selects the service dropdown (ignored if it doesn't match) | `ContactPage.jsx:65,72` |
| `/contact?package=<package name>` | Pre-fills the message: "Hi, I'm interested in the Growth Package." | `ContactPage.jsx:64,73` |
| `/services#<service-id>` | Scrolls to that service card | `ScrollToTop.jsx` |
| `/work#timber-plywood` | Scrolls to the industry section | `WorkPage.jsx:163` |

**Layout behaviour** (`RootLayout.jsx`, `App.jsx`):
- On every **full page load** (not on in-app navigation), a full-screen white overlay shows the logo for about 1.3 s, then slides up (`App.jsx:20-45`, z-index 200).
- `ScrollToTop` scrolls to the `#hash` target if there is one, otherwise to the top, on every path or hash change.
- `usePageMeta` rewrites `<title>`, the description, Open Graph/Twitter tags, robots and canonical on each navigation.

---

### 4.1 Home (`/`): `src/pages/HomePage.jsx`

The sections, in order:

| # | Section | Component | Content | Real or placeholder | Interactivity |
|---|---|---|---|---|---|
| 0 | Navbar | `Navbar.jsx` | Logo, 5 nav links, "Start a Project" | Real | Fixed pill navbar that darkens on scroll; hamburger menu below 768 px |
| 1 | Hero | `Hero.jsx` | H1 "We build software that moves **businesses** forward." + `heroDesc` + 2 CTAs (Explore Services → `/services`, Start a Project → `/contact`) + 3 stats | Real. **Stats:** "10 Projects Delivered" and "2 In Development" are **computed** from `workItems`; "100% Client Focused" is a marketing line | Muted autoplay looping background video (skipped on 2g or Data Saver, Chromium only); GSAP entrance timeline; count-up numbers (IntersectionObserver); animated gradient text |
| 2 | Tech marquee | `TechMarquee.jsx` | 25 technology logos + names (React, Node.js … OpenCV) | Real list, but logos load from **external CDNs**; **the AWS logo URL returns 403** (broken image) | Infinite CSS scroll (50 s); logos go from greyscale to colour on hover |
| 3 | Services strip | `Services.jsx` | "What We Do" header + 8 service cards (image, number, title, description, "Learn more") + "View all services" button | Real (`services`, `servicesSection`) | Horizontally swipeable track auto-scrolled by `gsap.ticker`. Pauses on hover, touch (resumes 2.5 s later), focus, or a visible Pause/Resume button. No auto-scroll under reduced motion. Each card links to `/services#id` |
| 4 | Process ("The Journey") | `Process.jsx` | "From idea to product" + 8-step winding road map (Client Idea → Maintenance & Support) | Real (`journeySteps`) but **generic**. The heading copy is hardcoded | Separate desktop and mobile SVG roads; path draws as you scroll (`scrub`); step cards slide in; the final step is a red map pin |
| 5 | Work carousel ("Recent Work") | `Work.jsx` | "Products we've built and are building." + a stacked card carousel of all 12 projects (the 4 featured first) | Real titles and descriptions. 7/12 have screenshots; the others show a **designed placeholder cover** (`WorkCover.jsx`). Header copy hardcoded | Prev/next arrows (desktop), swipe + dots (mobile), "01 / 12" counter, "View Project" opens `ProjectModal` |
| 6 | About | `About.jsx` | "A versatile team. Ready for anything." + 5 role pills + 4 value cards (emoji icons) | Real (`roles`, `values`) but generic; no actual people | 3D tilt + icon pop on hover (`ValueCard.jsx`); scroll reveals |
| 7 | Contact (short form) | `Contact.jsx` | "Let's build something great together." + form (name, email, message) + email and WhatsApp links | Real, working form (see §8) | Validation, sending state, success/error, "Send via WhatsApp" pre-filled button |
| 8 | Footer | `Footer.jsx` | Logo, tagline, about blurb, 3 social icons; columns Services (8), Company (5), Get in Touch; © line; Privacy/Terms links | Real. **Footer hours are hardcoded** and omit Saturday (see §11) | Columns fade up on scroll; JS-driven hover colours |
| 9 | Floating WhatsApp | `FloatingWhatsApp.jsx` | Round green button, bottom-right | Real | Opens `wa.me/94782612328` with a greeting; entrance pop (motion-safe) |

**Data source:** `src/data/content.js` (`heroDesc`, `stats`, `techStack`, `services`, `servicesSection`, `journeySteps`, `workItems`, `roles`, `values`, `contact`, `enquiryForm`, footer link arrays). Some headings are hardcoded in the JSX (§11).

---

### 4.2 Services (`/services`): `src/pages/ServicesPage.jsx`

This is the most polished page. Copy comes from `servicesPage`, `services`, `industryFocus` and `workItems` in `content.js`.

| # | Section | Content | Interactivity |
|---|---|---|---|
| a | Dark hero | "Software that runs **real businesses.**", description, CTAs (Start a Project, See Our Work). On desktop (lg and up), a numbered **index of all 8 services** linking to `#id` | Panning grid and drifting glows (motion-safe); staggered GSAP entrance |
| b | Bento grid | "Eight ways we build for your business". 8 `ServiceCard`s: ERP and AI are large featured cards, Timber & Plywood is highlighted with a gradient border. Each card shows its image, outlined number, `<h3>` title, description, feature tags, a "Built for" proof line, **"See projects"** (→ `/work?category=…` or `/work#timber-plywood`) and **"Ask about this"** (→ `/contact?service=…`) | Lift, glow and image-zoom hover; staggered scroll reveal. Mobile & Desktop has no projects, so it shows only "Ask about this". Branding has a proof line but no work category, so the same applies |
| c | Timber & Plywood spotlight (`id="timber-spotlight"`) | 4 numbered items (LogMaster, Inventory, AI defect detection, Website + SEO) with status badges; "Request a LogMaster demo" (WhatsApp) and "See timber projects" | Scroll reveal |
| d | How we work | 4 steps: Discover, Design, Build, Support. Horizontal timeline on desktop, vertical on mobile | Gradient line draws in; steps stagger |
| e | Why Ciigus: "Proof, not promises" | 4 counters: 10 projects delivered, 4 AI systems built, 7 industries served, 2 platforms in development (**all computed** from `workItems`) | Count-up on scroll |
| f | Final CTA | "Have a process that still runs on paper?" + Start a Project + Chat on WhatsApp | Fade-up |

All copy is real. Animations use `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`.

---

### 4.3 Work (`/work`): `src/pages/WorkPage.jsx`

| # | Section | Content | Interactivity |
|---|---|---|---|
| 1 | Hero | "Portfolio / Our work." + subtitle (**hardcoded**) | GSAP entrance |
| 2 | Filter + grid | Filter buttons: All (12), Business Systems (4), E-commerce & Web (4), AI Solutions (4). A 2-column grid of project cards (cover, title, description, status badge, "View Project"). LogMaster also has a "Request a demo" WhatsApp button | `aria-pressed` filter buttons; URL sync (`?category=`); a screen-reader live region announces the result count; fade-in on filter change (motion-safe) |
| 3 | Industry focus (`id="timber-plywood"`) | "Digital solutions for the timber & plywood industry", 4 clickable tiles that open the project modal, plus "Request a LogMaster demo" and "Talk to us" | Modal |
| 4 | CTA | "Got a project in mind?" → `/contact` (**hardcoded**) | |
| — | `ProjectModal` | Cover or screenshot, category, title, description, status. **Tech Stack** shows only if `tech[]` is filled, and **Visit Live Site** only if `link` is set. **Neither is filled for any project** | Opens with a scale and fade. Closes on backdrop click or ✕ only (no Escape key; see §9) |

**Content state:** 12 real project descriptions (anonymised; there are no client names, by design per the code comment at `content.js:198-204`). 5 projects show the designed placeholder cover because they have no screenshot.

---

### 4.4 About (`/about`): `src/pages/AboutPage.jsx`

| # | Section | Content | Real or placeholder |
|---|---|---|---|
| 1 | Hero | "About Ciigus / A versatile team. Ready for anything." + description + 5 role pills | Real but generic (**hardcoded**, duplicated from `About.jsx`) |
| 2 | Values grid | 4 `ValueCard`s (Clean Architecture, UI/UX Quality, Agile Workflows, Long-Term Thinking) with emoji icons | Real but generic |
| 3 | Process | The **same `<Process />` component as the home page** (8-step road map) | Duplicate of home content |
| 4 | CTA | "Ready to work with us?" → `/contact` (**hardcoded**) | |

This page is thin. It has **no team members, founding story, mission, location photos, certifications or numbers**, and it largely repeats the home page.

---

### 4.5 Packages (`/packages`): `src/pages/PackagesPage.jsx`

| # | Section | Content | Real or placeholder |
|---|---|---|---|
| 1 | Hero | "Pricing / Packages built for where you're at." (**hardcoded**) | Real |
| 2 | 3 pricing cards | **Starter** LKR 35,000–60,000 · **Growth** LKR 80,000–150,000 ("Most Popular") · **Enterprise** Custom. Each card shows "Best for", "Covers" (derived from service names), a feature list and **Get Started** (→ `/contact?package=<name>`) | Real prices in `content.js` (**confirm they're current**). A note below says AI and Branding are quoted individually |
| 3 | FAQ | 5 Q&As about pricing, payment, support, upgrades and timelines | Real. **Static list**, not an accordion |
| 4 | CTA | "Still not sure which package fits?" → `/contact` | |

Interactivity: scroll reveals only.

---

### 4.6 Contact (`/contact`): `src/pages/ContactPage.jsx`

| # | Section | Content |
|---|---|---|
| 1 | Dark banner | **`<h1>` "Contact Us"** + subtitle (inline styles, hardcoded) |
| 2 | Get in touch | **A second `<h1>`**, "Let's build something great together.", with the typo "Tell us about your project **,** we'll…" (line 118). Then the email (mailto), WhatsApp 078 261 2328, "Colombo, Sri Lanka", "We typically respond within 24 hours", and 3 social icon links |
| 3 | Form | Name\*, Email\*, Phone (optional), Service (optional; 8 services + "Other"), Message\*, honeypot, **Send Message** + **Send via WhatsApp** |
| 4 | Office hours | Mon–Fri 9:00 AM–6:00 PM, Sat 10:00 AM–2:00 PM, Sun closed (from `officeHours`) |

There is **no map embed**. This is the only page with a **white background** throughout. The others mix dark and light sections.

---

### 4.7 Privacy (`/privacy`) and Terms (`/terms`): `src/pages/LegalPage.jsx`

- A generic renderer for the `privacyPolicy` (8 sections) and `termsOfService` (10 sections) objects in `content.js:599-733`.
- Each page shows "Last updated: 1 October 2026" and an amber **"Template notice: … should be reviewed by a qualified professional"** box.
- The content is real and specific: it mentions Web3Forms, Gmail and the Sri Lankan PDPA No. 9 of 2022. It is still **explicitly a template**.

### 4.8 404 (`*`): `src/pages/NotFoundPage.jsx`

- Shows a big gradient "404", the text "This page took a wrong turn.", pills linking to all 5 nav pages, and Back to Home / Contact Us buttons.
- The meta tags set it to `noindex`.
- On Vercel, unknown URLs still return **HTTP 200** (an SPA soft 404), because `vercel.json` rewrites everything to `/`. I inferred this from the config.

### 4.9 Pages that exist but aren't linked from the navbar
- `/privacy` and `/terms`: footer only.
- `/` (Home): reached through the logo and footer "Home". There's no "Home" item in the navbar, which is normal.
- Home-page section anchors (`#home`, `#services`, `#process`, `#work`, `#about`, `#contact`) exist but nothing links to them.
- `#timber-spotlight` on /services: the id exists but nothing links to it.

---

## 5. Navigation and user flow

### Header (`Navbar.jsx`, items from `navItems` in `content.js:473-479`)

| Item | Goes to |
|---|---|
| Logo ("Ciigus") | `/` |
| Services | `/services` |
| Work | `/work` |
| About | `/about` |
| Packages | `/packages` |
| Contact | `/contact` |
| "Start a Project" button | `/contact` |

On mobile (below 768 px), the hamburger opens a dropdown with the same items. The dropdown closes when you tap a link.

### Footer (`Footer.jsx`)

| Column | Links |
|---|---|
| Brand | Facebook, LinkedIn (a **personal-profile URL**, `/in/ciigus-software-…`, not a `/company/` page), Instagram, all opening in new tabs |
| Services | 8 links → `/services#<service-id>` (generated from `services`) |
| Company | Home, Work, About, Packages, Contact. **Services isn't listed here**, though it has its own column |
| Get in Touch | `mailto:ciigussoftware@gmail.com`, WhatsApp `wa.me/94782612328`, "📍 Colombo, Sri Lanka", "🕐 Mon–Fri, 9AM–6PM" (plain text) |
| Bottom bar | © {year} Ciigus · Modern Digital Solutions · Sri Lanka · Privacy Policy · Terms of Service |

### Broken, missing or placeholder links
- **No `href="#"` or empty routes anywhere.** Every internal link resolves to a defined route.
- **The AWS logo image is broken** (jsDelivr devicon URL returns 403; `content.js:73`).
- **Projects have no `link`:** "Visit Live Site" never appears. This includes "Restaurant Website + QR Digital Menu — Ella", whose status is **Live**.
- WhatsApp is the main conversion channel, and **every WhatsApp link depends on one number**, `contact.whatsapp`.
- The LinkedIn URL points to a personal profile, not a company page. Confirm it's the right one.

### Typical visitor flow
1. Lands on **Home** (or a deep link shared on WhatsApp or social, which shows the per-route preview).
2. Hero → **Explore Services** (`/services`) or **Start a Project** (`/contact`).
3. On **/services**: a card → **See projects** (`/work?category=…`) for proof, or **Ask about this** (`/contact?service=…`, service pre-selected).
4. On **/work**: filter, open a project modal. LogMaster → **Request a demo** (WhatsApp).
5. **/packages** → **Get Started** → `/contact?package=…` (message pre-filled).
6. Converts through the **contact form** (emailed via Web3Forms), the **Send via WhatsApp** button, or the **floating WhatsApp button** on every page.

---

## 6. Components

All components are in `src/components/` and use default exports.

### Section components (page-specific)

| Component | Purpose | Main props | Used on |
|---|---|---|---|
| `Hero.jsx` | Video hero, headline, CTAs, stats | none | `/` |
| `TechMarquee.jsx` | Scrolling tech-logo ticker | none | `/` |
| `Services.jsx` | Auto-scrolling service card strip | none | `/` |
| `Process.jsx` | 8-step SVG road map | none | `/`, `/about` |
| `Work.jsx` | Stacked project carousel + modal | none | `/` |
| `About.jsx` | Roles + value cards | none | `/` |
| `Contact.jsx` | Short enquiry form + contact links | none | `/` |
| `Navbar.jsx` | Fixed header + mobile menu | none | all (layout) |
| `Footer.jsx` | Site footer | none | all (layout) |
| `FloatingWhatsApp.jsx` | Fixed WhatsApp button | none | all (layout) |
| `ScrollToTop.jsx` | Scroll reset / hash scroll on navigation (renders nothing) | none | all (layout) |

### Reusable UI components

| Component | Purpose | Main props | Used by |
|---|---|---|---|
| `Logo.jsx` | Logo image + optional "Ciigus" wordmark | `variant='mark'\|'full'`, `size=36`, `showText=true` | App (intro), Navbar, Footer. **`variant="full"` is never used** |
| `FadeUp.jsx` | Wrapper that fades and slides children in on scroll | `as='div'`, `y=40`, `duration=0.7`, `delay=0`, `start='top 85%'`, `className`, `...rest` | About, Contact, AboutPage, PackagesPage, ContactPage, LegalPage |
| `ValueCard.jsx` | Value card with 3D mouse tilt | `icon`, `title`, `desc`, `accentColor`, `cardRef` | About, AboutPage |
| `ServiceCard.jsx` | Rich service card for the bento grid | `service`, `number` | ServicesPage |
| `WorkCover.jsx` | Project screenshot (contained over a blurred copy) or designed gradient placeholder | `item`, `size='sm'\|'md'`, `natural=false` | Work, WorkPage, ProjectModal |
| `ProjectModal.jsx` | Project details popup | `item` (null = closed), `onClose` | Work, WorkPage |
| `ProjectCardFooter.jsx` | Status badge + "View Project" button | `item`, `onView`, `className` | Work, WorkPage |
| `StatusBadge.jsx` | Completed / Live / In Development pill | `status` | ProjectCardFooter, ProjectModal, ServicesPage |
| `CategoryIcon.jsx` | SVG icon per work category | `category`, `className` | WorkCover, WorkPage |
| `BrandIcon.jsx` | SVG brand icons (whatsapp, facebook, instagram, linkedin) | `name`, `className` | Footer, ContactPage, ServicesPage, FloatingWhatsApp |
| `EnquiryActions.jsx` | Submit + "Send via WhatsApp" buttons + success/error messages | `status`, `name`, `message` | Contact, ContactPage |
| `FieldError.jsx` | Inline field error text | `id`, `message` | Contact, ContactPage |

Local helpers that aren't separate files: `CounterStat` (Hero), `FooterLink`/`ContactLink`/`SocialButton` (Footer), `MailIcon`/`PhoneIcon`/`LocationIcon`/`ClockIcon` (ContactPage).

### Duplicated or near-duplicate code

| Duplication | Where |
|---|---|
| **About section vs About page hero + values**: same copy (hardcoded twice), same `accentColors` array, same role pills and the same ValueCard grid and GSAP code | `components/About.jsx` ≈ `pages/AboutPage.jsx:12-85` |
| **Project card markup**: carousel card vs grid card (cover + title + description + footer) | `Work.jsx:94-120` ≈ `WorkPage.jsx:135-158` |
| **Two process/timeline implementations** with different content (8 emoji steps vs 4 steps) | `Process.jsx` (home, about) vs `ServicesPage.jsx` "How we work" |
| **Office hours**: footer hardcodes "Mon–Fri, 9AM–6PM", while `officeHours` in content.js (used on /contact) also lists Saturday | `Footer.jsx:149` vs `content.js:761-765` |
| **Grid background and gradient-text styles** repeated inline | `ServicesPage.jsx` (`gridBackground`), `WorkCover.jsx`, and the gradient-wave text in `Hero.jsx`, `ServicesPage.jsx` and `NotFoundPage.jsx` |
| **Two forms with different styling**: same hook, but different markup and input styles | `Contact.jsx` vs `ContactPage.jsx` |
| **Process component internals**: desktop and mobile blocks are near-identical copies with different constants | `Process.jsx:147-203`, `:244-403` |

---

## 7. Content and data

Nearly all data lives in **`src/data/content.js`**. There is no CMS, API, database, JSON or Markdown content.

| Content type | Where | Count / notes |
|---|---|---|
| Company info | `site`, `contact`, `footerAbout`, `officeHours` | Name "Ciigus Software", email `ciigussoftware@gmail.com` (a **Gmail address**, not a domain email), WhatsApp 078 261 2328, Colombo, Sri Lanka |
| Services | `services` | **8**, each with id, title, description, features, proof, work category, image, and featured/highlight flags |
| Portfolio / case studies | `workItems` | **12**: Business Systems 4, E-commerce & Web 4, AI Solutions 4. Status: 9 completed, 1 live, 2 in development. 4 featured. **`tech: []` and `link: ""` on all 12.** `image` set on 7 |
| Projects without screenshots | `workItems` | Plywood Inventory, LogMaster, Payroll, AI Plywood Defect Detection, AI Tea Clone Identification |
| Derived stats | `workStats`, `stats` | delivered 10, AI 4, industries 7, in development 2. They update automatically |
| Process steps | `journeySteps` (8, emoji), `servicesPage.process.steps` (4) | Two different process stories |
| Team | `roles` | **5 role names only.** No team members, names, photos or bios |
| Values | `values` | 4, with emoji icons |
| Pricing | `packages`, `packagesNote`, `packagesFaq` | 3 packages, 5 FAQs |
| Testimonials | n/a | **None** |
| Client logos | n/a | **None** (anonymised clients by design). The only logos are the 25 in `techStack` |
| Blog / news | n/a | **None** |
| Social | `socialLinks` | Facebook, LinkedIn, Instagram |
| Legal | `privacyPolicy`, `termsOfService` | Templates dated 1 Oct 2026 |
| SEO meta | `site`, `pageMeta`, `notFoundMeta` | Title and description for 8 routes |
| Hardcoded copy outside content.js | see §11 | Page heroes and CTAs on Work, About, Packages, Contact; Process, Work and About section headings; footer tagline and hours; Hero headline |

### Assets

| Asset | Location | Size / dimensions | Notes |
|---|---|---|---|
| Hero video | `public/assets/Video/Ciigus_hero.mp4` | 4.3 MB, 720p | Autoplays, muted, loops |
| Video poster | `public/assets/Video/Ciigus_hero_poster.webp` | 52 KB, 1280×720 | |
| Hero fallback background | `public/circuit-bg.jpg` | 178 KB | Mostly hidden behind the poster and video; downloads anyway |
| Service images | `public/assets/Services/*.webp` (8) | 16–45 KB each | Good |
| Project screenshots | `public/assets/work/*.webp` (7) | 30–91 KB each, 1600 px wide… | **except `construction-erp-01-dashboard.webp`: 2.33 MB at 1280×720.** The last commit (`9b10d30`) replaced a 98 KB file with it. It's bigger than its own PNG original (2.13 MB) |
| PNG originals | `public/assets/work/*.png` | 1.4–2.3 MB each | Git-ignored. Locally they **are** copied into `dist/` on build. Vercel builds from git, so they don't reach production there |
| Logos | `src/assets/Ciiguss_withou_text.png` (83 KB, displayed at 40–48 px), `src/assets/logo-mark.png` and `logo-full.png` (imported, **never displayed**), `public/logo-*.png` (**unused**) | | |
| Favicons / OG | `public/favicon.ico`, `favicon.png` (192), `apple-touch-icon.png` (180), `og-image.jpg` (1200×630, 85 KB) | | |
| Tech logos | 24 external (jsDelivr devicon, 1 Wikimedia) + 1 local `public/assets/tech/clickup.svg` | | **AWS URL returns 403** |
| Fonts | Google Fonts (remote) | | No self-hosting |

**Missing assets:** every local path referenced in code exists. The only broken reference is the external AWS logo. (`content.js:201` mentions `/assets/work/logmaster-01-dashboard.webp`, but only in a comment as an example, so it isn't a broken reference.)

---

## 8. Forms and backend

There is **no backend of its own**: no API routes, serverless functions, database or CMS.

### Forms

| | Home form (`components/Contact.jsx`) | Contact page form (`pages/ContactPage.jsx`) |
|---|---|---|
| Fields | name\*, email\*, message\* | name\*, email\*, phone, service (select), message\* |
| Labels | Visually hidden (`sr-only`), placeholders shown | Visible labels |
| Pre-fill | none | `?service=`, `?package=` |
| `form` value sent | "Home page" | "Contact page" |

**Shared logic** (`src/hooks/useEnquiryForm.js` and `src/lib/contact.js`):
- **Validation** (client-side only):
  - required fields must be non-empty
  - email must match `^[^\s@]+@[^\s@]+\.[^\s@]+$`
  - on error, focus moves to the first invalid field and errors are linked with `aria-describedby`
- **Spam protection:** a Web3Forms `botcheck` honeypot checkbox (hidden). There's no CAPTCHA.
- **Submission:** `POST https://api.web3forms.com/submit` (JSON) with:
  - `access_key`
  - `subject: "New enquiry from Ciigus website"`
  - `from_name: "Ciigus Website"`
  - `replyto` set to the sender's email
  - every non-empty field
- **Timeout and states:** a 15 s timeout. States are idle, sending ("Sending…", disabled, `aria-busy`), success (form cleared) and error (values kept, plus a WhatsApp fallback link).
- **Where submissions go:** Web3Forms emails them to the inbox registered with the access key. The Privacy Policy says that's `ciigussoftware@gmail.com`; this isn't configured in code, so it's **(unverified)**.
- **WhatsApp alternative:** "Send via WhatsApp" opens `wa.me/94782612328?text=Hi Ciigus! I'm <name>.\n\n<message>`.

### Environment variables

| Name | Required | Used in | Notes |
|---|---|---|---|
| `VITE_WEB3FORMS_KEY` | **Yes**, for the forms to send | `src/lib/contact.js:32` | Documented in `.env.example`. A value is present in the local `.env`. Because it's a `VITE_` variable, Vite **inlines it into the public JS bundle**, which is expected for Web3Forms. It **must also be set in Vercel's project settings**; without it, the forms always show the error and WhatsApp fallback |

No other environment variables are used.

### Other integrations
- WhatsApp deep links (`wa.me`), all through `whatsappUrl()`.
- Social profile links.
- **No analytics, tag manager, cookie banner, chat widget or error tracking.** The Privacy Policy states there are no analytics cookies, so if you add analytics, update the policy too.

---

## 9. SEO, performance and accessibility

### SEO

| Item | Status | Where |
|---|---|---|
| `<title>` per route | ✅ unique for all 8 routes, plus a 404 title | `content.js` `pageMeta`, `lib/seo.js` |
| Meta description per route | ✅ | same |
| Open Graph + Twitter cards | ✅ per route, 1200×630 `og-image.jpg` | `lib/seo.js` |
| Canonical URLs | ✅ `https://www.ciigus.com/<route>` | `lib/seo.js` |
| Prerendered meta for crawlers | ✅ The build writes `about.html`, `services.html` and so on with the meta baked in; `cleanUrls` serves them | `vite.config.js` |
| `sitemap.xml` / `robots.txt` | ✅ generated at build time (8 URLs, `lastmod` = build date) | `vite.config.js` |
| Favicon / apple-touch-icon / theme colour | ✅ | `index.html` |
| 404 handling | 🟡 `noindex` set client-side, but the HTTP status is 200 | `vercel.json` |
| Body content without JS | ❌ Only the meta tags are prerendered. The page body is an empty `<div id="root">` until JS runs. Google renders JS; other crawlers mostly don't | |
| Structured data (JSON-LD: Organization / LocalBusiness) | ❌ none | |
| Heading hierarchy | 🟡 One h1 per page **except `/contact`, which has two** (`ContactPage.jsx:102`, `:114`) | |

### Performance

| Item | Status |
|---|---|
| Hero video | ✅ 4.3 MB 720p, poster, `preload` set to `none` when autoplay is skipped. 🟡 Still around 4 MB on most mobile loads, and it ignores `prefers-reduced-motion` |
| **Construction ERP screenshot** | 🔴 **2.33 MB**, about 30× its siblings. It's in the home carousel, where every card is rendered stacked, so `loading="lazy"` doesn't help once the carousel is in view. On /work it's in the first row of the grid |
| Other images | ✅ WebP, `loading="lazy"`, `decoding="async"`. No `width`/`height` attributes, but aspect ratios are fixed by containers, so layout shift is low |
| Logo PNG | 🟡 83 KB for a 40 px image; also used in the intro overlay |
| Unused backgrounds | 🟡 `circuit-bg.jpg` (178 KB) loads behind the video |
| Fonts | 🟡 Two families × 5 weights (300–700) from Google Fonts. Preconnect and `display=swap` ✅. Not every weight looks used (guess) |
| JS bundle | One chunk, about 414 KB minified (`dist/assets/index-*.js`). There's no route-level code splitting (`React.lazy`) |
| Intro overlay | 🟡 Hides content for about 1.3 s on every full page load, which hurts perceived load time and LCP |
| Third-party requests | Google Fonts, jsDelivr (23 logos), Wikimedia (1), Web3Forms on submit |

### Accessibility (from reading the code)

| Issue | Where |
|---|---|
| **Project modal** has no `role="dialog"`/`aria-modal`, no **Escape** key, no focus trap, no focus return and no body scroll lock | `ProjectModal.jsx` |
| **Mobile menu** button has no `aria-expanded`/`aria-controls`, and its label is always "Open menu". Collapsed links (hidden only with `max-height: 0; opacity: 0`) **stay keyboard-focusable** | `Navbar.jsx:70-133` |
| **Work carousel**: the 11 off-screen cards are only faded or hidden with opacity, so their "View Project" buttons are still tabbable and read by screen readers. There are no keyboard arrow controls, and the desktop has no dots | `Work.jsx:91-121` |
| **Reduced motion is respected only in some places** (Services strip, /services, /work filter, floating button). It's ignored by the intro overlay, Hero timeline, gradient-wave text, hero video, tech marquee (CSS), Process road map, `FadeUp`, value-card tilt, Footer, About and Packages reveals | various |
| **Contrast**: the `section-label` (#00ba9c on white) is about 2.5:1 site-wide, and the footer copyright (#4a5568 on #0a0f1e) is about 2.5:1. Both fail WCAG AA (figures from the earlier report; the colours are unchanged in code) | `index.css:107`, `Footer.jsx:14` |
| **Emoji as icons** without `aria-hidden`: Process steps, value cards, footer 📍🕐, home contact ✉️💬 | `content.js` `journeySteps`/`values`, `Footer.jsx:146,149`, `Contact.jsx:83,91` |
| **Tech marquee**: each logo has `alt={name}` **and** the visible name text, so it's announced twice. The second (loop) copy isn't `aria-hidden` | `TechMarquee.jsx` |
| **Footer hover via JS `onMouseEnter`/`onMouseLeave`**: no matching keyboard focus style | `Footer.jsx` |
| **Tiny text**: mobile Process cards use 9–10 px text | `Process.jsx:398-399` |
| **Non-heading titles**: package names, FAQ questions, value-card titles and footer column titles are `<div>`s | Packages, ValueCard, Footer |
| ✅ Good | Labelled form fields with error linking; `aria-live` regions; `aria-pressed` filters; social links have `aria-label`s; `lang="en"`; semantic `nav`/`section`/`footer`/`article`; decorative images have `alt=""` |

---

## 10. Responsiveness and design system

**Theme tokens** (`src/index.css:3-30`, Tailwind v4 `@theme`):

| Token | Value | Role |
|---|---|---|
| `--color-bg` | `#ffffff` | Page background (light theme) |
| `--color-surface` / `surface2` / `faint` | `#f8f8f8` / `#f0f0f0` / `#f0f0f0` | Alternating sections, cards |
| `--color-border` | `#e5e5e5` | |
| `--color-accent` | `#0095fc` | Brand blue (the "C") |
| `--color-accent-d` | `#0077c9` | Darker blue for links |
| `--color-accent2` | `#00ba9c` | Teal (labels, links) |
| `--color-green` | `#d5e73c` | Lime (gradient start) |
| `--color-text` / `--color-muted` | `#0d0d0d` / `#444444` | |
| `--font-head` / `--font-body` | Space Grotesk / Plus Jakarta Sans | |
| `--radius-sm/md/lg` | 6 / 10 / 14 px | |

- **Signature style:** a lime → teal → blue gradient (`from-green to-accent`) on buttons and highlighted text, plus dark navy `#0a0f1e` panels (navbar, hero, footer, /services dark sections, pricing cards) on a white page.
- **Untokenised colours used repeatedly:** `#0a0f1e`, `#1e2d45`, `#a8b3cc`, `#c8d1e0`, `#0d1626`, `#2a3a55`, `#03130d`, `#8899bb`, `#4a5568`, `#25D366`. The dark navy palette deserves tokens.
- **Shared utilities** (`@utility`): `section-alt`, `section-label`, `section-title`, `section-sub`, `btn-primary`, `btn-outline`, `btn-outline-light`, `number-outline`, `link-underline`, `no-scrollbar`.
- **Spacing:** Tailwind defaults. Sections typically use `py-20`–`py-28` and `px-6 md:px-10`, with containers at `max-w-5xl` / `6xl` / `7xl`.
- **Breakpoints:** Tailwind defaults (sm 640, md 768, lg 1024, xl 1280). Nothing is customised.
- **Dark mode:** none, and no theme toggle. The site is a fixed light theme with dark sections. Git history ("Change background color into white", "Remove more dark model in mobile view") suggests this is **deliberate**.

**Mobile and tablet support:** this was clearly designed for, through dedicated mobile variants:
- Process (separate mobile SVG)
- Work carousel (mobile header, swipe, dots)
- Hero (different overlay opacity, stats placement)
- navbar hamburger
- vertical "How we work" timeline

Signs of rough edges:
- `Hero.jsx:131` has conflicting padding classes (`pb-6 … pb-24`, `md:pb-8 … md:pb-20`) and `ml-3` plus an inner `ml-3`.
- The mobile Process cards have very small text (9–10 px) in fixed 96 px boxes.
- The desktop Work carousel arrows sit outside the card (`-translate-x-25`); on tablet widths (768–900 px) they may sit very close to the screen edge. That's a **(guess)**, not verified in a browser.
- The /services hero index list is hidden below `lg`.
- Heavy `!important` overrides (`!text-[…]`, `!mb-…`) in `Work.jsx`, used to resize the shared `section-*` utilities.

---

## 11. Issues and gaps

### Bugs and regressions
1. 🔴 **`public/assets/work/construction-erp-01-dashboard.webp` is 2.33 MB** (commit `9b10d30`, "add construction new image"; it was 98 KB). It is likely lossless or unoptimised. It loads on the home page carousel and /work.
2. 🟠 **Broken AWS logo** in the tech marquee (`content.js:73`, jsDelivr returns 403).
3. 🟡 **Two `<h1>`s on /contact** (`ContactPage.jsx:102`, `:114`) and a typo, "project **,** we'll" (`:118`).
4. 🟡 **Footer hours disagree with the Contact page**: the footer says Mon–Fri only, but `officeHours` includes Saturday 10–2.
5. 🟡 **Conflicting Tailwind classes** in `Hero.jsx:131`.
6. 🟡 **Modal, mobile menu and carousel keyboard/screen-reader issues** (§9).
7. 🟡 A leftover **empty `<span aria-hidden="true"></span>`** ×2 in `Navbar.jsx:67,131`, from the "remove trailing arrows" commit. Meanwhile "Visit Live Site **↗**" in `ProjectModal.jsx:83` still has an arrow, which is inconsistent with that commit.
8. 🟡 **Soft 404**: unknown URLs return HTTP 200 (SPA rewrite).

### Console errors predicted from the code
- None obvious. The earlier report recorded 0 warnings on all routes after its fixes. I did not re-run the browser check.
- One possible issue: `sendEnquiry` uses `AbortSignal.timeout`, which needs Safari 16+. Older browsers would throw, and the form would show the error state. That's a **(guess)**, and a low risk.

### TODOs and commented-out code
- No `TODO`/`FIXME` comments. No commented-out code blocks, apart from section-label comments in JSX.

### Unused files, code and dependencies
- `public/logo-full.png`, `public/logo-mark.png`: never referenced.
- `src/assets/logo-mark.png`: imported as `markLogo` in `Logo.jsx:1` but never used. `src/assets/logo-full.png` is only used by `variant="full"`, which nothing uses.
- `public/circuit-bg.jpg`: effectively redundant behind the video poster.
- Unused CSS in `index.css`: the keyframes `scroll`, `pulse-animation`, `marquee-scroll`, `marquee-vertical` and their tokens `--animate-scroll`, `--animate-pulse-slow/fast`, `--animate-marquee-vertical`.
- `servicesPage.spotlight` mirrors `industryFocus` fields. That's harmless, but there are two places to look.
- `vite.config.js.timestamp-1782582224257-a913f631579e6.mjs`: a Vite temp file committed to git (now git-ignored, but still tracked).
- `bun.lockb`: a stale second lockfile.
- All npm dependencies are used.

### Inconsistent patterns and drift from `CLAUDE.md`
- **`CLAUDE.md` is out of date.**
  - It says "App.jsx composes section components in page order; **no routing**". There are actually 8 routes, a layout, `pages/`, `hooks/` and `lib/`.
  - It lists Hero and Marquee as examples, but `Marquee.jsx` was deleted.
- **`README.md` is out of date.** It describes per-component `.css` files, `--accent`/`--brand-grad` CSS variables, a Formspree comment and a `Marquee.jsx` that no longer exists.
- **Copy hardcoded in JSX**, against the "content.js is the single source" rule:
  - `Hero.jsx` headline and CTA labels
  - `Process.jsx` header
  - `Work.jsx` header
  - `About.jsx` and `AboutPage.jsx` header and CTA
  - `Contact.jsx` header
  - `WorkPage.jsx` hero and CTA
  - `PackagesPage.jsx` hero, "Most Popular", "Get Started" and CTA
  - `ContactPage.jsx` banner and headings
  - `Footer.jsx` tagline, column titles, hours and © line
  - `ProjectModal.jsx` "Tech Stack" and "Visit Live Site"
  - `ProjectCardFooter.jsx` "View Project"
- **Inline `style={{}}` instead of Tailwind:** Hero, TechMarquee, Navbar, Footer and the ContactPage banner. Footer and TechMarquee use JS mouse handlers for hover effects.
- **Mixed GSAP idioms**, against the CLAUDE.md rule "pick one, don't mix":
  - `Process.jsx` and `FadeUp.jsx` use `useGSAP` with ScrollTrigger.
  - `ServicesPage.jsx` uses both `useGSAP` and `useEffect` + `gsap.context`.
  - `Hero.jsx` uses an IntersectionObserver for its counters, while ServicesPage uses ScrollTrigger for the same job.
- **Inconsistent quote and semicolon style:** `About.jsx` uses double quotes and semicolons; everything else uses single quotes and no semicolons. There is no formatter to enforce either.
- **The `.ticker-track` CSS lives in `index.html`** instead of `index.css`.

### Started but unfinished
- **Project details:** the `tech`, `link` and `image` fields exist, and the UI is ready for them, but they're empty or partial.
- **Legal pages:** still flagged as templates that need review.
- **Two-platform story:** LogMaster and Payroll are "In Development" with no screenshots, demo dates or landing pages. Only LogMaster has a demo CTA.
- **Logo `variant="full"`:** supported but unused.

---

## 12. How to run

Requirements: **Node.js 18+** (per README; tested locally with Node 24) and npm.

```bash
# 1. Install dependencies (uses package-lock.json)
npm install

# 2. Configure the contact form key
cp .env.example .env          # then set VITE_WEB3FORMS_KEY=<your Web3Forms access key>

# 3. Start the dev server → http://localhost:5173
npm run dev

# 4. Production build → dist/ (also writes services.html etc., sitemap.xml, robots.txt)
npm run build

# 5. Preview the production build locally
npm run preview
```

- The forms only send if `VITE_WEB3FORMS_KEY` is set. Otherwise they show the error message and WhatsApp fallback.
- In dev mode, only the home-page SEO block is injected (`transformIndexHtml`). The per-route HTML files exist only after `npm run build`.
- Note that `npm run preview` doesn't apply `vercel.json`'s `cleanUrls`. **(guess)** `/services` may serve the SPA fallback rather than `services.html` there. That's harmless, because the client renders the same meta.

**Deploy (Vercel)**, based on `vercel.json` and the earlier report:
1. Import `github.com/ciigussoftware-creator/Ciigus-Website` into Vercel, using the **Vite** preset.
2. Build command `npm run build`, output directory `dist`.
3. Add **`VITE_WEB3FORMS_KEY`** under Project → Settings → Environment Variables (Production + Preview), then **redeploy**. Vite inlines it at build time.
4. Every push to `main` deploys; PRs get preview URLs.

Other static hosts work too, but they need an equivalent of `cleanUrls` (serve `services.html` at `/services`) and an SPA fallback to `index.html`.

---

## 13. Recommendations

### Missing pages or sections a company portfolio site usually has
1. **Testimonials / client quotes.** None exist. Even 2–3 anonymised quotes ("Operations Manager, plywood manufacturer") would add a lot of trust.
2. **Case-study detail pages** (`/work/:id`) with problem → solution → result, screenshots, tech and outcomes. They're also far better for SEO than a modal.
3. **A real About page:** founders or team with photos, the company story, year founded, location, and how you work. It currently repeats the home page.
4. **Client or industry logos** (with permission), or at least "trusted by businesses in…" industry badges.
5. **LogMaster product page** (`/logmaster`), since it's the flagship in-house product, with a demo request form.
6. **Blog / insights** (optional): useful for SEO, for example "ERP for plywood factories in Sri Lanka".
7. **Careers** (optional), if hiring.
8. **Map / office address** on /contact, if there's a physical office.
9. **Organization / LocalBusiness JSON-LD** for search.

### Prioritised fixes and improvements

**High**
| # | Item | Where |
|---|---|---|
| H1 | Re-export `construction-erp-01-dashboard.webp` at about 1600 px, lossy quality ~80 (target under 100 KB) | `public/assets/work/` |
| H2 | Confirm `VITE_WEB3FORMS_KEY` is set in Vercel and send a real test enquiry; confirm where Web3Forms delivers | Vercel settings |
| H3 | Fill in project `link`s (at least the **Live** Ella site), `tech` lists and the 5 missing screenshots | `content.js` `workItems` |
| H4 | Fix the modal (Escape, `role="dialog"`, focus trap, scroll lock) and the mobile menu (`aria-expanded`; make collapsed links unfocusable) | `ProjectModal.jsx`, `Navbar.jsx` |
| H5 | Replace or self-host the broken AWS logo (ideally self-host all 25 tech logos) | `content.js:73` |
| H6 | Get the Privacy Policy and Terms reviewed, then remove the template notice | `content.js` `legalReviewNote` |

**Medium**
| # | Item |
|---|---|
| M1 | Fix the /contact double `<h1>` and the typo; make the footer hours read from `officeHours` |
| M2 | Make the hidden carousel cards inert or `aria-hidden`; add keyboard arrow support |
| M3 | Respect `prefers-reduced-motion` everywhere (intro overlay, hero video and timeline, marquee, Process, FadeUp, tilt) |
| M4 | Fix contrast for `section-label` and the footer © line (for example `accent-d`-ish teal, and a lighter grey) |
| M5 | Update `CLAUDE.md` and `README.md` to match the real architecture (router, pages, layout, hooks, lib, SEO plugin, env) |
| M6 | Move the hardcoded copy into `content.js`; add `@theme` tokens for the navy palette; replace the inline styles and JS hover handlers in Footer, TechMarquee and Hero |
| M7 | Shorten or skip the intro overlay (for example once per session) |
| M8 | Add testimonials and strengthen the About page (content from the owner) |
| M9 | Add analytics (Vercel Analytics or Plausible) and update the Privacy Policy to match |
| M10 | Add ESLint + Prettier (and optionally a GitHub Action that runs `npm run build`) |

**Low**
| # | Item |
|---|---|
| L1 | Delete the unused logos, `circuit-bg.jpg`, unused keyframes, the `markLogo` import, `bun.lockb` and the committed `vite.config.js.timestamp-*.mjs` |
| L2 | Optimise the 83 KB logo PNG (SVG or a small WebP) |
| L3 | Merge the duplicated `About.jsx` / `AboutPage.jsx` and the duplicated project-card markup |
| L4 | Route-level code splitting (`React.lazy`) |
| L5 | Organization/LocalBusiness JSON-LD; consider full prerendering (for example `vite-react-ssg`) so content is visible without JS |
| L6 | Apply patch updates (Tailwind 4.3.4, GSAP 3.15.1, react-router 7.18.5); plan the React 19 / Vite 8 upgrades separately |
| L7 | Trim the Google Fonts weights to the ones actually used |
| L8 | Use a domain email (for example hello@ciigus.com) instead of Gmail |

---

## 14. Questions for you

1. **Is the site currently live at www.ciigus.com**, and is that Vercel project connected to this repo's `main` branch? (I couldn't reach the domain from here.)
2. **Was the 2.3 MB construction ERP screenshot intentional** (for example a sharper image), or should it be re-compressed like the others?
3. **Is `VITE_WEB3FORMS_KEY` set in Vercel**, and which inbox does that Web3Forms key deliver to?
4. **Can any clients be named**, or should portfolio entries stay anonymous? Can you provide live URLs (especially the Ella restaurant site, marked "Live") and the tech used per project?
5. Do you have **screenshots** for LogMaster, Payroll, Plywood Inventory, Plywood Defect Detection and Tea Clone ID? Any NDA limits?
6. Are the **package prices** (LKR 35k–60k, 80k–150k) current, and should prices be shown publicly at all?
7. Do you want **real team members** (names, photos, roles) on the About page? Is there a founding year or story to tell?
8. Do you have **testimonials** you're allowed to publish?
9. Is the **LinkedIn link** (a personal-style `/in/` profile) correct, or is there a company page?
10. Should **Saturday office hours** (10 AM–2 PM) be shown in the footer as well, or are they wrong on /contact?
11. Is there a **domain email** you'd prefer over `ciigussoftware@gmail.com`?
12. What's the **next development goal**: content completion, case-study pages, a LogMaster page, a blog, or something else? That decides whether to stay a pure SPA or move to prerendering/SSR.
13. Do you want **analytics**, and which tool? (The Privacy Policy will need updating.)
14. Is the **light theme with dark sections** final, or is dark mode wanted?
15. Should `CLAUDE.md`'s conventions (all copy in `content.js`, one GSAP idiom per component) be **enforced going forward**, or relaxed to match the current code?
16. Who else commits to this repo (history shows 4 authors), and is there a **branch/PR workflow** I should follow?
