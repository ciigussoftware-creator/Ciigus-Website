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
├── index.html                 ← HTML shell (fonts, root div)
├── package.json
├── vite.config.js
├── public/
│   ├── favicon.png            ← browser tab icon (logo mark)
│   ├── logo-mark.png          ← gear + C symbol only
│   └── logo-full.png          ← full logo (symbol + wordmark)
└── src/
    ├── main.jsx               ← React entry point
    ├── App.jsx                ← assembles all sections
    ├── index.css              ← global styles + CSS color variables
    ├── assets/
    │   ├── logo-mark.png
    │   └── logo-full.png
    ├── data/
    │   └── content.js         ← ALL editable text/content lives here
    └── components/
        ├── Navbar.jsx / .css
        ├── Logo.jsx  / .css
        ├── Hero.jsx  / .css
        ├── Marquee.jsx / .css
        ├── Services.jsx / .css
        ├── Process.jsx / .css
        ├── Work.jsx / .css
        ├── About.jsx / .css
        ├── Contact.jsx / .css
        └── Footer.jsx / .css
```

## Editing Content

Almost everything you'll want to change — services, portfolio items, process
steps, team roles, stats, contact email/WhatsApp — lives in one file:

**`src/data/content.js`**

For example, to add a new service, add an object to the `services` array.
To update contact info, edit the `contact` object at the bottom.

## Changing Colors

All colors are CSS variables at the top of **`src/index.css`** inside `:root`.
The brand colors are derived from the logo:

- `--accent`  → cyan/blue (the "C")
- `--accent2` → green (the gear)
- `--green`   → bright leaf-green highlight
- `--brand-grad` → the green→cyan gradient used on buttons & highlights

## Logo

Two cropped, transparent-background versions of the logo are included:

- **Mark** (`logo-mark.png`) — gear + C symbol, used in the navbar.
- **Full** (`logo-full.png`) — symbol + "Ciigus Software" wordmark, used in the footer.

The `<Logo />` component (`src/components/Logo.jsx`) renders either via the
`variant="mark"` or `variant="full"` prop.

## Wiring Up the Contact Form

The form in `src/components/Contact.jsx` currently shows a success message
on submit. To actually send messages, the easiest option is **Formspree**:

1. Create a form at https://formspree.io and copy the endpoint URL.
2. In `Contact.jsx`'s `handleSubmit`, POST the `form` state to that URL
   (an example `fetch` call is included as a comment).

## Deployment

**Vercel / Netlify (recommended):**
Push to a GitHub repo and import it — both auto-detect Vite.
Build command: `npm run build` · Output directory: `dist`

**Manual / cPanel:**
Run `npm run build`, then upload the contents of the `dist/` folder
to your `public_html`.
