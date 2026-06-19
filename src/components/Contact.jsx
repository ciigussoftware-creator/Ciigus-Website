import { useState } from 'react'
import { contact } from '../data/content'

export default function Contact() {
  const [form, setForm] = useState({ name: '', contact: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setSent(false)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, contact: c, message } = form
    if (!name.trim() || !c.trim() || !message.trim()) {
      alert('Please fill in all fields.')
      return
    }

    /*
      Form submission. Currently shows a confirmation message.
      To actually send messages, pick one:

      A) Formspree (easiest): create a form at https://formspree.io,
         then POST `form` to your endpoint with fetch().
      B) EmailJS: https://www.emailjs.com
      C) Your own backend / API.

      Example (Formspree):
      await fetch('https://formspree.io/f/XXXX', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    */
    setSent(true)
    setForm({ name: '', contact: '', message: '' })
  }

  const inputClasses =
    'bg-bg border border-border rounded-lg py-3 px-4 text-text font-body text-[0.9rem] transition-colors duration-200 ease-in-out outline-none w-full placeholder:text-muted focus:border-accent2'

  return (
    <section
      className="bg-surface border-t border-b border-border py-24 px-10 md:py-16 md:px-5"
      id="contact"
    >
      <div className="max-w-170 mx-auto text-center">
        <div className="section-label">Get In Touch</div>
        <h2 className="section-title">
          Let's build something<br />great together.
        </h2>
        <p className="section-sub mx-auto">
          Tell us about your project. Whether you have a clear brief or just an
          idea — we'll help you figure out the path forward.
        </p>

        <form
          className="flex flex-col gap-4 mt-10 text-left max-w-120 mx-auto"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className={inputClasses}
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="contact"
            placeholder="Email or phone number"
            className={inputClasses}
            value={form.contact}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Tell us about your project..."
            className={`${inputClasses} resize-y min-h-30`}
            value={form.message}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="btn-primary w-full border-none cursor-pointer font-body text-[0.95rem]"
          >
            Send Message →
          </button>
          {sent && (
            <p className="text-green text-[0.88rem] text-center mt-1">
              Thanks! We'll get back to you soon. ✅
            </p>
          )}
        </form>

        <div className="flex justify-center gap-8 mt-10 flex-wrap">
          <a
            className="flex items-center gap-2 text-[0.9rem] text-muted transition-colors duration-200 ease-in-out hover:text-accent2"
            href={`mailto:${contact.email}`}
          >
            ✉️ {contact.email}
          </a>
          <a
            className="flex items-center gap-2 text-[0.9rem] text-muted transition-colors duration-200 ease-in-out hover:text-accent2"
            href={`https://wa.me/${contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            💬 WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

