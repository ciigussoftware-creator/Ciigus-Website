/* ═══════════════════════════════════════════════
   CIIGUS WEBSITE — main.js
   ═══════════════════════════════════════════════ */

/* ─── Mobile Navigation ──────────────────────── */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a link is clicked
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

/* ─── Smooth Active Nav Highlighting ─────────── */
const sections  = document.querySelectorAll('section[id], div[id="home"]');
const navLinks  = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${entry.target.id}`
          ? 'var(--text)'
          : 'var(--muted)';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => observer.observe(section));

/* ─── Contact Form Handler ───────────────────── */
// Currently shows an alert. Replace this with your
// preferred form handling method:
//
// Option A — Formspree (easiest, free tier available):
//   1. Go to https://formspree.io and create a form
//   2. Replace the action="#" in index.html with your Formspree URL
//   3. Remove the JS below (Formspree handles submission)
//
// Option B — EmailJS (client-side email, no server needed):
//   https://www.emailjs.com
//
// Option C — Custom backend / API endpoint

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = contactForm.querySelector('input[name="name"]').value.trim();
  const contact = contactForm.querySelector('input[name="contact"]').value.trim();
  const message = contactForm.querySelector('textarea[name="message"]').value.trim();

  if (!name || !contact || !message) {
    alert('Please fill in all fields.');
    return;
  }

  // TODO: Replace this alert with actual form submission logic
  alert(`Thanks ${name}! We'll get back to you soon.`);
  contactForm.reset();
});
