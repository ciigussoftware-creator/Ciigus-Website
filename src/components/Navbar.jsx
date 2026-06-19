import { useEffect, useState } from 'react'
import Logo from './Logo'
import { navItems } from '../data/content'

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
      <nav
        id="navbar"
        className="fixed top-0 left-0 right-0 z-100 flex items-center justify-between py-[0.85rem] px-10 md:px-[1.2rem] bg-bg/85 backdrop-blur-md border-b border-border transition-all duration-200 ease-in-out"
      >
        <a href="#home" className="inline-flex items-center" onClick={closeMenu}>
          <Logo variant="mark" size={34} showText />
        </a>

        <div className="hidden md:flex gap-8 text-[0.9rem] text-muted">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`transition-colors duration-200 ease-in-out hover:text-text ${
                activeId === item.href.slice(1) ? 'text-text' : ''
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          className="hidden md:inline-block bg-linear-to-br from-green to-accent text-[#03130d] py-[0.55rem] px-[1.3rem] rounded-sm text-[0.9rem] font-semibold transition-all duration-200 ease-in-out hover:brightness-108 hover:-translate-y-px"
          href="#contact"
        >
          Start a Project
        </a>

        <button
          className="flex md:hidden flex-col gap-1.25 bg-transparent border-none cursor-pointer p-1"
          aria-label="Open menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="block w-5.5 h-0.5 bg-text rounded-xs transition-all duration-200 ease-in-out" />
          <span className="block w-5.5 h-0.5 bg-text rounded-xs transition-all duration-200 ease-in-out" />
          <span className="block w-5.5 h-0.5 bg-text rounded-xs transition-all duration-200 ease-in-out" />
        </button>
      </nav>

      <div
        className={`fixed top-15.5 left-0 right-0 z-99 flex-col bg-surface border-b border-border py-4 ${
          menuOpen ? 'flex' : 'hidden'
        } md:hidden`}
      >
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="py-3 px-8 text-muted text-[0.95rem] transition-all duration-200 ease-in-out hover:text-text hover:bg-faint"
            onClick={closeMenu}
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  )
}

