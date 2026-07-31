import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { workItems } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

const variantGradient = {
  blue: 'from-[#07182a] to-[#103a52]',
  green: 'from-[#0a1f14] to-[#154a31]',
  purple: 'from-[#0a1a28] to-[#1a3a4a]',
}

const MAX_VISIBLE = 3

export default function Work() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef([])
  const navRefs = useRef([])

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean)
    const n = cards.length
    if (!n) return

    const ctx = gsap.context(() => {
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

      const stackPosition = (offset) => ({
        x: Math.min(offset, MAX_VISIBLE) * 12,
        y: Math.min(offset, MAX_VISIBLE) * 18,
        scale: 1 - Math.min(offset, MAX_VISIBLE) * 0.05,
        opacity: offset > MAX_VISIBLE ? 0 : 1,
        zIndex: n - offset,
        rotate: 0,
      })

      cards.forEach((card, i) => gsap.set(card, stackPosition(i)))

      const setActiveNav = (idx) => {
        navRefs.current.forEach((el, i) => {
          if (!el) return
          el.classList.toggle('text-text', i === idx)
          el.classList.toggle('font-bold', i === idx)
          el.classList.toggle('opacity-100', i === idx)
          el.classList.toggle('text-muted', i !== idx)
          el.classList.toggle('opacity-50', i !== idx)
        })
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${(n - 1) * window.innerHeight * 0.9}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(n - 1, Math.round(self.progress * (n - 1)))
            setActiveNav(idx)
          },
        },
      })

      for (let k = 0; k < n - 1; k++) {
        tl.to(
          cards[k],
          { y: '-=560', x: '+=40', rotate: -6, scale: 0.92, opacity: 0, duration: 1, ease: 'power2.inOut' },
          k
        )
        for (let j = k + 1; j < n; j++) {
          tl.to(cards[j], { ...stackPosition(j - (k + 1)), duration: 1, ease: 'power2.out' }, k)
        }
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="work" className="relative py-24 px-10 md:py-16 md:px-5" ref={sectionRef}>
      <div ref={headerRef}>
        <div className="section-label">Recent Work</div>
        <h2 className="section-title">
          Products we've built<br />and are building.
        </h2>
        <p className="section-sub">
          From live client projects to industry-changing platforms currently in
          development.
        </p>
      </div>

      <div className="flex items-center justify-center gap-20 mt-20 lg:gap-10 md:flex-col md:gap-12">
        <div className="relative w-full max-w-[700px] h-[540px] md:h-[480px] shrink-0">
          {workItems.map((item, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="absolute inset-0 bg-surface border border-border rounded-lg overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] flex flex-col"
            >
              <div
                className={`h-44 flex items-center justify-center text-[4rem] bg-linear-to-br ${
                  variantGradient[item.variant] || variantGradient.blue
                }`}
              >
                {item.emoji}
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="inline-block self-start text-[0.72rem] uppercase tracking-[0.08em] text-accent2 bg-accent2/10 py-[0.2rem] px-[0.7rem] rounded-[4px] mb-4 font-medium">
                  {item.tag}
                </div>
                <div className="font-head font-bold text-2xl mb-3">{item.title}</div>
                <div className="text-[0.92rem] text-muted leading-relaxed flex-1">
                  {item.desc}
                </div>
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-2 text-[0.78rem] text-muted">
                    <div
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        item.status === 'done' ? 'bg-green' : 'bg-[#f59e0b]'
                      }`}
                    />
                    {item.statusLabel}
                  </div>
                  <a
                    href="#"
                    className="text-accent2 font-medium text-[0.9rem] hover:translate-x-1 transition-transform duration-200 inline-block"
                  >
                    View Project →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <nav className="flex flex-col gap-4 md:flex-row md:flex-wrap md:justify-center">
          {workItems.map((item, i) => (
            <div
              key={i}
              ref={(el) => (navRefs.current[i] = el)}
              className={`text-[0.95rem] transition-colors duration-300 cursor-default ${
                i === 0 ? 'text-text font-bold opacity-100' : 'text-muted opacity-50'
              }`}
            >
              {item.title}
            </div>
          ))}
        </nav>
      </div>
    </section>
  )
}
