import { useEffect, useState } from 'react'
import Logo from './Logo'
import { navItems } from '../data/content'
import './Navbar.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState('home')

  // Scroll-spy: highlight the nav link of the section in view
  useEffect(() => {
    const sections = document.querySelectorAll('section[id], div[id="home"]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav id="navbar">
        <a href="#home" className="logo-link" onClick={closeMenu}>
          <Logo variant="mark" size={34} showText />
        </a>

        <div className="nav-links">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={activeId === item.href.slice(1) ? 'active' : ''}
            >
              {item.label}
            </a>
          ))}
        </div>

        <a className="nav-cta" href="#contact">
          Start a Project
        </a>

        <button
          className="nav-hamburger"
          aria-label="Open menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="mobile-link"
            onClick={closeMenu}
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  )
}
