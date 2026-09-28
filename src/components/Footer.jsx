import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Logo from './Logo'
import { contact, social, footerServiceLinks, footerCompanyLinks } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

const MUTED = '#a8b3cc'
const WHITE = '#ffffff'
const FAINT = '#4a5568'

function formatPhone(raw) {
  const match = raw.match(/^(\+\d{2})(\d{2})(\d{3})(\d{4})$/)
  return match ? match.slice(1).join(' ') : raw
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      style={{ color: MUTED, display: 'block', padding: '4px 0', fontSize: '0.875rem' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = WHITE)}
      onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
    >
      {children}
    </Link>
  )
}

function ContactLink({ href, target, children }) {
  return (
    <a
      href={href}
      target={target}
      rel={target ? 'noopener noreferrer' : undefined}
      style={{ color: MUTED, fontSize: '0.875rem' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = WHITE)}
      onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
    >
      {children}
    </a>
  )
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5">
      <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.391.524A2.994 2.994 0 0 0 .502 6.186 31.09 31.09 0 0 0 0 12a31.09 31.09 0 0 0 .502 5.814 2.994 2.994 0 0 0 2.107 2.117c1.886.524 9.391.524 9.391.524s7.505 0 9.391-.524a2.994 2.994 0 0 0 2.107-2.117A31.09 31.09 0 0 0 24 12a31.09 31.09 0 0 0-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5">
      <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.183 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.91h-2.33V22c4.78-.757 8.437-4.92 8.437-9.94z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 9.837a3.837 3.837 0 1 1 0-7.674 3.837 3.837 0 0 1 0 7.674zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5">
      <path d="M16.6 5.82c-.9-.94-1.4-2.16-1.4-3.42h-3.14v13.5c0 1.53-1.24 2.77-2.77 2.77-1.53 0-2.77-1.24-2.77-2.77 0-1.53 1.24-2.76 2.77-2.76.29 0 .56.04.82.13v-3.2c-.27-.03-.55-.05-.82-.05-3.22 0-5.84 2.62-5.84 5.88 0 3.22 2.62 5.85 5.84 5.85 3.23 0 5.85-2.63 5.85-5.85V9.4a8.8 8.8 0 0 0 5.16 1.65V7.9a5.4 5.4 0 0 1-3.7-2.08z" />
    </svg>
  )
}

const socialLinks = [
  { key: 'youtube', href: social.youtube, label: 'YouTube', brand: '#FF0000', Icon: YoutubeIcon },
  { key: 'facebook', href: social.facebook, label: 'Facebook', brand: '#1877F2', Icon: FacebookIcon },
  { key: 'instagram', href: social.instagram, label: 'Instagram', brand: '#bc1888', Icon: InstagramIcon },
  { key: 'tiktok', href: social.tiktok, label: 'TikTok', brand: '#ffffff', brandText: '#000000', Icon: TikTokIcon },
]

function SocialButton({ href, label, brand, brandText, Icon }) {
  const handleEnter = (e) => {
    e.currentTarget.style.backgroundColor = brand
    e.currentTarget.style.borderColor = brand
    e.currentTarget.style.color = brandText || WHITE
  }
  const handleLeave = (e) => {
    e.currentTarget.style.backgroundColor = 'transparent'
    e.currentTarget.style.borderColor = '#2a3a55'
    e.currentTarget.style.color = MUTED
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ease-in-out hover:scale-110 hover:-translate-y-0.5"
      style={{ border: '1px solid #2a3a55', color: MUTED }}
    >
      <Icon />
    </a>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  const footerRef = useRef(null)
  const columnsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(columnsRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="bg-[#0a0f1e] border-t border-[#1e2d45] py-16 px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10">
        <div ref={(el) => (columnsRef.current[0] = el)}>
          <Logo variant="mark" size={40} showText />
          <p style={{ color: WHITE, fontWeight: 500, fontSize: '0.95rem', marginTop: '1rem', marginBottom: '0.75rem', maxWidth: '20rem' }}>
            We build software that moves businesses forward.
          </p>
          <p style={{ color: MUTED, fontSize: '0.85rem', lineHeight: 1.7, maxWidth: '20rem', marginBottom: '1.5rem' }}>
            A Sri Lanka-based software agency delivering custom web apps,
            mobile solutions, and business systems for clients worldwide.
          </p>
          <div className="flex gap-3">
            {socialLinks.map(({ key, ...item }) => (
              <SocialButton key={key} {...item} />
            ))}
          </div>
        </div>

        <div ref={(el) => (columnsRef.current[1] = el)}>
          <div style={{ color: WHITE, fontWeight: 600, marginBottom: '1rem' }}>Services</div>
          <div className="flex flex-col">
            {footerServiceLinks.map((item) => (
              <FooterLink key={item.label} to={item.to}>
                {item.label}
              </FooterLink>
            ))}
          </div>
        </div>

        <div ref={(el) => (columnsRef.current[2] = el)}>
          <div style={{ color: WHITE, fontWeight: 600, marginBottom: '1rem' }}>Company</div>
          <div className="flex flex-col">
            {footerCompanyLinks.map((item) => (
              <FooterLink key={item.label} to={item.to}>
                {item.label}
              </FooterLink>
            ))}
          </div>
        </div>

        <div ref={(el) => (columnsRef.current[3] = el)}>
          <div style={{ color: WHITE, fontWeight: 600, marginBottom: '1rem' }}>Get in Touch</div>
          <div className="flex flex-col gap-3">
            <ContactLink href={`mailto:${contact.email}`}>
              Email: {contact.email}
            </ContactLink>
            <ContactLink href={`https://wa.me/${contact.whatsapp}`} target="_blank">
              WhatsApp: {formatPhone(contact.whatsapp)}
            </ContactLink>
            <div className="flex items-start gap-2" style={{ color: MUTED, fontSize: '0.875rem' }}>
              <span>📍</span> {contact.location}
            </div>
            <div className="flex items-start gap-2" style={{ color: MUTED, fontSize: '0.875rem' }}>
              <span>🕐</span> Mon–Fri, 9AM–6PM (Sri Lanka Time)
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex justify-between items-center flex-wrap gap-4 border-t border-[#1e2d45] mt-12 pt-6 max-md:flex-col max-md:text-center">
        <div style={{ color: FAINT, fontSize: '0.875rem' }}>
          © {year} Ciigus · Modern Digital Solutions · Sri Lanka
        </div>
        <div style={{ color: FAINT, fontSize: '0.875rem' }}>
          Privacy Policy&nbsp;&nbsp;·&nbsp;&nbsp;Terms of Service
        </div>
      </div>
    </footer>
  )
}
