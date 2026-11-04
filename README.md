# Ciigus Software — React Website

The Ciigus marketing site, rebuilt with **React + Vite**. Component-based,
content-driven, and styled with the brand colors pulled directly from the
Ciigus logo (green gear + cyan/blue "C").

## Quick Start

You need [Node.js](https://nodejs.org) 18+ installed.

```bash
npm install      # install dependencies
npm run dev      # start dev server → http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

## Project Structure

```
ciigus-website/
├── index.html                 ← HTML shell (fonts, favicons, SEO placeholder)
├── package.json
├── vite.config.js             ← Vite + SEO plugin (per-route HTML, sitemap, robots.txt)
├── vercel.json                ← clean URLs + SPA rewrite
├── .env.example               ← copy to .env and set VITE_WEB3FORMS_KEY
├── public/
│   ├── favicon.ico / favicon.png / apple-touch-icon.png / og-image.jpg
│   └── assets/                ← service images, work screenshots, hero video, tech logos
└── src/
    ├── main.jsx               ← React entry point (BrowserRouter)
    ├── App.jsx                ← route table
    ├── index.css              ← Tailwind import, @theme tokens, shared @utility classes
    ├── layouts/RootLayout.jsx ← Navbar, Footer, floating WhatsApp button
    ├── pages/                 ← one file per route (Home, Services, Work, About,
    │                            Packages, Contact, Legal, NotFound)
    ├── components/            ← page sections and shared UI
    ├── hooks/                 ← useEnquiryForm, usePageMeta
    ├── lib/                   ← contact.js (Web3Forms, WhatsApp), seo.js
    ├── assets/                ← logo images used by Logo.jsx
    └── data/
        └── content.js         ← ALL editable text/content lives here
```

## Editing Content

Almost everything you'll want to change — services, portfolio items, process
steps, team roles, stats, contact email/WhatsApp — lives in one file:

**`src/data/content.js`**

For example, to add a new service, add an object to the `services` array.
To update contact info, edit the `contact` object at the bottom.

## Changing Colors

All colors are Tailwind theme tokens in the `@theme` block at the top of
**`src/index.css`** (used as classes like `text-accent`, `bg-green`).
The brand colors are derived from the logo:

- `--color-accent`  → cyan/blue (the "C")
- `--color-accent2` → teal
- `--color-green`   → bright lime highlight

The green→blue gradient on buttons and highlights is the `btn-primary`
utility (`bg-linear-to-br from-green to-accent`).

## Logo

The `<Logo />` component (`src/components/Logo.jsx`) shows the gear + C symbol
(`src/assets/Ciiguss_withou_text.png`) with an optional "Ciigus" wordmark.
It's used in the navbar, the footer and the intro overlay.

## Contact Forms

Both forms (the home page `src/components/Contact.jsx` and
`src/pages/ContactPage.jsx`) send enquiries by email through
[Web3Forms](https://web3forms.com):

1. Create an access key at https://web3forms.com.
2. Copy `.env.example` to `.env` and set `VITE_WEB3FORMS_KEY`.
3. On Vercel, add the same variable under Settings → Environment Variables,
   then redeploy (Vite bakes it in at build time).

Without the key, the forms show an error with a "message us on WhatsApp" link.

## Deployment

**Vercel / Netlify (recommended):**
Push to a GitHub repo and import it — both auto-detect Vite.
Build command: `npm run build` · Output directory: `dist`

**Manual / cPanel:**
Run `npm run build`, then upload the contents of the `dist/` folder
to your `public_html`.
