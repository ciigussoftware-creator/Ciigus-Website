import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { navItems } from '../data/content'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href) =>
    location.pathname === href || location.pathname.startsWith(`${href}/`)

  return (
    <>
      <nav
        id="navbar"
        className="fixed top-4 z-100 flex items-center justify-between py-[0.6rem] px-6 backdrop-blur-md border border-[#1e2d45] rounded-full transition-all duration-300 ease-in-out"
        style={{
          left: '50%',
          transform: 'translateX(-50%)',
          width: '95%',
          maxWidth: '1400px',
          backgroundColor: scrolled ? 'rgba(10,15,30,0.97)' : 'rgba(10,15,30,0.85)',
          boxShadow: scrolled
            ? '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,149,255,0.1)'
            : '0 4px 24px rgba(0,0,0,0.3)',
        }}
      >
        <div className="flex items-center md:border-r md:border-[#1e2d45] md:pr-8 md:mr-4">
          <Link to="/" className="inline-flex items-center" onClick={closeMenu}>
            <Logo variant="mark" size={40} showText />
          </Link>
        </div>

        <div className="hidden md:flex gap-2 text-[0.9rem] text-[#a8b3cc]">
          {navItems.map((item) => {
            const active = isActive(item.href)
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={`relative overflow-hidden rounded-md px-3 py-1.5 transition-colors duration-200 ease-in-out hover:bg-white/5 hover:text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-accent after:transition-all after:duration-300 ${
                  active ? 'text-white after:w-full' : 'after:w-0 hover:after:w-full'
                }`}
              >
                {item.label}
              </NavLink>
            )
          })}
        </div>

        <Link
          className="hidden md:inline-flex items-center gap-1.5 bg-linear-to-br from-green to-accent text-[#03130d] py-1.5 px-5 rounded-sm text-[0.9rem] font-semibold transition-all duration-200 ease-in-out hover:brightness-108 hover:-translate-y-px hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(0,149,255,0.35)] active:scale-[0.98]"
          to="/contact"
        >
          Start a Project
          <span aria-hidden="true"></span>
        </Link>

        <button
          className="flex md:hidden flex-col gap-1.25 bg-transparent border-none cursor-pointer p-1"
          aria-label="Open menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span
            className={`block w-5.5 h-0.5 bg-white rounded-xs transition-all duration-200 ease-in-out ${
              menuOpen ? 'translate-y-1.75 rotate-45' : ''
            }`}
          />
          <span
            className={`block w-5.5 h-0.5 bg-white rounded-xs transition-all duration-200 ease-in-out ${
              menuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block w-5.5 h-0.5 bg-white rounded-xs transition-all duration-200 ease-in-out ${
              menuOpen ? '-translate-y-1.75 -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      <div
        style={{
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '1100px',
          backgroundColor: 'rgba(10,15,30,0.97)',
          backdropFilter: 'blur(12px)',
          maxHeight: menuOpen ? '400px' : '0px',
          opacity: menuOpen ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.3s ease, opacity 0.3s ease',
        }}
        className="fixed top-20 z-99 rounded-2xl border border-[#1e2d45] py-4 flex flex-col md:hidden"
      >
        {navItems.map((item) => {
          const active = isActive(item.href)
          return (
            <NavLink
              key={item.href}
              to={item.href}
              style={{ color: '#ffffff' }}
              className={`py-3 pl-4 pr-8 text-[0.95rem] font-medium transition-all duration-200 ease-in-out hover:bg-white/10 block border-l-2 ${
                active ? 'border-accent' : 'border-transparent'
              }`}
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          )
        })}

        <Link
          className="inline-flex items-center justify-center gap-1.5 bg-linear-to-br from-green to-accent text-[#03130d] py-2.5 px-5 mx-8 mt-2 mb-3 rounded-sm text-[0.9rem] font-semibold transition-all duration-200 ease-in-out hover:brightness-108 active:scale-[0.98]"
          to="/contact"
          onClick={closeMenu}
        >
          Start a Project
          <span aria-hidden="true"></span>
        </Link>
      </div>
    </>
  )
}
