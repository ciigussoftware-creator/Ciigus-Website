# Ciigus Website

Plain HTML/CSS/JS — no build tools, no dependencies. Open `index.html` in a browser and it works.

## File Structure

```
ciigus-website/
├── index.html     ← All page content and sections
├── style.css      ← All styles and responsive rules
├── main.js        ← Navigation, form handling
└── images/        ← Create this folder for project screenshots
```

## How to Edit

### Change Colors
Open `style.css` and edit the variables at the top inside `:root { }`:
- `--accent` → main blue highlight (default: #3b82f6)
- `--bg` → page background (default: #04070f)
- `--text` → primary text color (default: #f0f4ff)

### Update Contact Info
In `index.html`, search for `hello@ciigus.com` and `94000000000` and replace with your real email and WhatsApp number.

### Add a Project to the Portfolio
Copy one of the `.work-card` blocks in `index.html` and paste it inside `.work-grid`. Update:
- `.work-img` class → `work-img--blue`, `work-img--green`, or `work-img--purple`
- Emoji or replace with a real screenshot (see below)
- `.work-tag` → category label
- `.work-title` → project name
- `.work-desc` → description
- `.status-dot` class → `status-dot--done` or `status-dot--active`

### Add a Real Screenshot to a Work Card
1. Put your image in an `images/` folder
2. Replace the emoji inside `.work-img` with:
   ```html
   <img src="images/your-project.jpg" alt="Project Name" style="width:100%;height:100%;object-fit:cover;"/>
   ```
3. Remove `font-size: 3rem` from that `.work-img` element or add `font-size:0` inline.

### Update Stats in the Hero
Search for `.stat-val` in `index.html` and update the numbers and labels.

### Wire Up the Contact Form
The form currently shows a browser alert. To make it actually send emails:

**Easiest (Formspree):**
1. Sign up at https://formspree.io
2. Create a new form and copy the endpoint URL
3. Replace `action="#"` on the `<form>` tag in `index.html` with your Formspree URL
4. Remove the `contactForm.addEventListener` block from `main.js`

## Deployment

**Netlify (recommended — free):**
1. Go to https://netlify.com
2. Drag and drop this entire folder onto their deploy page
3. Done — live in seconds. Custom domain available in settings.

**Vercel:**
1. Push this folder to a GitHub repo
2. Connect the repo to https://vercel.com
3. It auto-deploys on every push.

**cPanel / local Sri Lanka hosting:**
Upload all three files via File Manager or FTP to your `public_html` folder.
