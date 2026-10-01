import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services, servicesSection } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

const SPEED = 36 // px per second
const RESUME_AFTER_TOUCH_MS = 2500

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function Services() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const trackRef = useRef(null)
  const loopStartRef = useRef(null)
  const holdRef = useRef({ hover: false, touch: false, focus: false })
  const touchTimerRef = useRef(null)
  const [autoScroll] = useState(() => !prefersReducedMotion())
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(paused)
  pausedRef.current = paused

  useEffect(() => {
    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(headerRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      })
    }, sectionRef)

    return () => {
      mm.revert()
      ctx.revert()
    }
  }, [])

  // Auto-scroll by moving the track's native scroll position on GSAP's ticker,
  // so visitors can still swipe or scroll it themselves. The second copy of the
  // cards lets it loop seamlessly.
  useEffect(() => {
    if (!autoScroll) return
    const track = trackRef.current
    let position = track.scrollLeft

    const tick = (_time, deltaTime) => {
      const hold = holdRef.current
      if (pausedRef.current || hold.hover || hold.touch || hold.focus) {
        position = track.scrollLeft
        return
      }
      const loopWidth = loopStartRef.current.offsetLeft - track.firstElementChild.offsetLeft
      position += (SPEED * deltaTime) / 1000
      if (position >= loopWidth) position -= loopWidth
      track.scrollLeft = position
    }

    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
      clearTimeout(touchTimerRef.current)
    }
  }, [autoScroll])

  const hold = (key, value) => () => {
    holdRef.current[key] = value
  }
  const onTouchStart = () => {
    clearTimeout(touchTimerRef.current)
    holdRef.current.touch = true
  }
  const onTouchEnd = () => {
    clearTimeout(touchTimerRef.current)
    touchTimerRef.current = setTimeout(hold('touch', false), RESUME_AFTER_TOUCH_MS)
  }
  const onBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) holdRef.current.focus = false
  }

  const cards = autoScroll ? [...services, ...services] : services

  return (
    <section id="services" ref={sectionRef} className="py-20 md:py-24">
      <div
        ref={headerRef}
        className="mx-auto mb-10 flex max-w-7xl flex-col gap-6 px-6 md:flex-row md:items-end md:justify-between md:px-10"
      >
        <div className="max-w-2xl">
          <div className="section-label">{servicesSection.label}</div>
          <h2 className="section-title">
            {servicesSection.titleLines[0]}
            <br />
            {servicesSection.titleLines[1]}
          </h2>
          <p className="section-sub">{servicesSection.desc}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/services" className="btn-primary">
            {servicesSection.viewAll}
          </Link>
          {autoScroll && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="inline-flex h-12 items-center gap-2 rounded-sm border border-border px-4 text-[0.85rem] text-muted transition-colors hover:border-accent2 hover:text-text"
            >
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor">
                {paused ? <path d="M4 2.5v11l9-5.5z" /> : <path d="M3.5 2.5h3v11h-3zm6 0h3v11h-3z" />}
              </svg>
              {paused ? servicesSection.play : servicesSection.pause}
            </button>
          )}
        </div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar flex gap-5 overflow-x-auto overscroll-x-contain px-6 pb-4 md:px-[max(2.5rem,calc((100%-80rem)/2+2.5rem))]"
        onPointerEnter={(e) => e.pointerType === 'mouse' && hold('hover', true)()}
        onPointerLeave={(e) => e.pointerType === 'mouse' && hold('hover', false)()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onFocus={hold('focus', true)}
        onBlur={onBlur}
      >
        {cards.map((service, i) => {
          const isCopy = i >= services.length
          const number = String((i % services.length) + 1).padStart(2, '0')
          return (
            <Link
              key={`${service.id}-${isCopy ? 'copy' : 'main'}`}
              ref={i === services.length ? loopStartRef : undefined}
              to={`/services#${service.id}`}
              aria-hidden={isCopy || undefined}
              tabIndex={isCopy ? -1 : undefined}
              className="group flex w-72 shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-bg transition-[border-color,box-shadow] duration-300 hover:border-accent2/60 hover:shadow-[0_18px_40px_-24px_rgba(0,186,156,0.6)] focus-visible:border-accent2"
            >
              <div className="relative h-40 shrink-0 overflow-hidden bg-[#0a0f1e]">
                <img
                  src={service.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover opacity-80 transition-transform duration-700 ease-out motion-safe:group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(180deg, rgba(10,15,30,0.1) 30%, rgba(10,15,30,0.85) 100%)' }}
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 left-4 font-head text-[3rem] font-bold leading-none tracking-[-0.04em] number-outline"
                >
                  {number}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-head text-[1.02rem] font-bold leading-snug">{service.title}</h3>
                <p className="mt-2 flex-1 text-[0.82rem] leading-relaxed text-muted">{service.desc}</p>
                <span className="mt-4 text-[0.82rem] font-semibold text-accent-d">
                  {servicesSection.learnMore}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
