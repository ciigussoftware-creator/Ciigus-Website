import { useState } from 'react'
import { contact } from '../data/content'
import './Contact.css'

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

  return (
    <section className="cta-section" id="contact">
      <div className="cta-inner">
        <div className="section-label" style={{ textAlign: 'center' }}>
          Get In Touch
        </div>
        <h2 className="section-title" style={{ textAlign: 'center' }}>
          Let's build something<br />great together.
        </h2>
        <p
          className="section-sub"
          style={{ textAlign: 'center', margin: '0 auto' }}
        >
          Tell us about your project. Whether you have a clear brief or just an
          idea — we'll help you figure out the path forward.
        </p>

        <form className="cta-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="contact"
            placeholder="Email or phone number"
            value={form.contact}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Tell us about your project..."
            value={form.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn-primary btn-submit">
            Send Message →
          </button>
          {sent && (
            <p className="form-success">
              Thanks! We'll get back to you soon. ✅
            </p>
          )}
        </form>

        <div className="contact-links">
          <a className="contact-link" href={`mailto:${contact.email}`}>
            ✉️ {contact.email}
          </a>
          <a
            className="contact-link"
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
