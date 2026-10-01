import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Logo from './Logo'
import BrandIcon from './BrandIcon'
import { contact, socialLinks, footerServiceLinks, footerCompanyLinks, footerLegalLinks, footerAbout } from '../data/content'
import { whatsappUrl } from '../lib/contact'

gsap.registerPlugin(ScrollTrigger)

const MUTED = '#a8b3cc'
const WHITE = '#ffffff'
const FAINT = '#4a5568'

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

function SocialButton({ platform, href, label, brand }) {
  const handleEnter = (e) => {
    e.currentTarget.style.backgroundColor = brand
    e.currentTarget.style.borderColor = brand
    e.currentTarget.style.color = WHITE
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
      aria-label={`${label} (opens in a new tab)`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ease-in-out hover:scale-110 hover:-translate-y-0.5"
      style={{ border: '1px solid #2a3a55', color: MUTED }}
    >
      <BrandIcon name={platform} />
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
    <footer ref={footerRef} className="bg-[#0a0f1e] border-t border-[#1e2d45] pt-16 pb-28 px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10">
        <div ref={(el) => (columnsRef.current[0] = el)}>
          <Logo variant="mark" size={40} showText />
          <p style={{ color: WHITE, fontWeight: 500, fontSize: '0.95rem', marginTop: '1rem', marginBottom: '0.75rem', maxWidth: '20rem' }}>
            We build software that moves businesses forward.
          </p>
          <p style={{ color: MUTED, fontSize: '0.85rem', lineHeight: 1.7, maxWidth: '20rem', marginBottom: '1.5rem' }}>
            {footerAbout}
          </p>
          <div className="flex gap-3">
            {socialLinks.map(({ key, ...item }) => (
              <SocialButton key={key} platform={key} {...item} />
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
            <ContactLink href={whatsappUrl()} target="_blank">
              WhatsApp: {contact.whatsappDisplay}
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
        <nav aria-label="Legal" className="flex items-center gap-3" style={{ fontSize: '0.875rem' }}>
          {footerLegalLinks.map((item, i) => (
            <span key={item.to} className="flex items-center gap-3">
              {i > 0 && <span aria-hidden="true" style={{ color: FAINT }}>·</span>}
              <Link
                to={item.to}
                style={{ color: MUTED }}
                onMouseEnter={(e) => (e.currentTarget.style.color = WHITE)}
                onMouseLeave={(e) => (e.currentTarget.style.color = MUTED)}
              >
                {item.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>
    </footer>
  )
}
