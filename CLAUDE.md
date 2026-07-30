# CLAUDE.md

## Stack
- React 18 + Vite
- Tailwind CSS v4 (`@tailwindcss/vite` plugin — theme lives in `src/index.css` via `@theme`, not `tailwind.config.js`)
- GSAP + `@gsap/react` for all animation (scroll reveals, marquee, counters). No other animation library — don't add framer-motion or similar; extend GSAP patterns instead.

## Structure
- `src/components/*.jsx` — one component per file, default export, function declaration (`export default function Name() {}`).
- `src/data/content.js` — single source of truth for all copy/content (arrays of objects). Components map over this data; don't hardcode copy strings into JSX.
- `src/assets/` — images, imported directly (`import x from '../assets/x.png'`).
- `App.jsx` composes section components in page order; no routing.

## Styling
- Tailwind utility classes inline in JSX only. No CSS modules, styled-components, or per-component CSS files.
- Shared repeated patterns go in `src/index.css` as `@utility` classes (e.g. `section-label`, `section-title`, `btn-primary`) — add new ones there rather than repeating long class strings across components.
- Design tokens (`--color-*`, `--font-*`, `--radius-*`) are defined in `index.css`'s `@theme` block. Add new tokens there before using arbitrary values repeatedly.

## Animation conventions (GSAP)
Two idioms are used depending on the component; pick the matching one — don't mix:

1. **Simple, always-visible-on-mount elements** (Hero, Marquee): use `useGSAP(() => { ... }, { scope: sectionRef })` from `@gsap/react`, targeting children via `data-*` attributes (e.g. `data-hero="heading"`) rather than refs when animating multiple named parts.
2. **Scroll-triggered sections** (Services, Process, Work): use `gsap.registerPlugin(ScrollTrigger)` at module scope, then inside `useEffect`, wrap animations in `gsap.context(() => { ... }, sectionRef)` and return `() => ctx.revert()` for cleanup. Trigger config: `start: 'top 80%'` (or `70–85%` depending on section), `toggleActions: 'play none none none'` (animate once, no reverse).
3. **Lists of repeated items** (cards, steps): collect DOM nodes into a ref array via `ref={(el) => (arrRef.current[i] = el)}`, animate the array with `stagger`.

## Component conventions
- Props destructured with defaults in the function signature (e.g. `Logo({ variant = 'mark', size = 36, showText = true })`).
- No comments except where a non-obvious workaround or constraint needs explaining (see `Contact.jsx`'s form-submission note as the existing example — short block explaining integration options, not restating what code does).
- No PropTypes/TypeScript — plain JS, informal prop contracts documented via default values and usage.

## What not to do
- Don't introduce a second animation library alongside GSAP.
- Don't move content out of `src/data/content.js` into inline JSX.
- Don't add a CSS-in-JS solution or component-scoped stylesheets.
