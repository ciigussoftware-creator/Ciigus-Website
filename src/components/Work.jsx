import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { workItems } from '../data/content'
import ProjectModal from './ProjectModal'

gsap.registerPlugin(ScrollTrigger)

export const variantGradient = {
  blue: 'from-[#07182a] to-[#103a52]',
  green: 'from-[#0a1f14] to-[#154a31]',
  purple: 'from-[#0a1a28] to-[#1a3a4a]',
}

const MAX_VISIBLE = 3

export default function Work() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const cardsRef = useRef([])
  const navListRef = useRef([])
  const navDotsRef = useRef([])
  const [activeItem, setActiveItem] = useState(null)

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean)
    const n = cards.length
    if (!n) return

    const ctx = gsap.context(() => {
      // targets both the mobile and desktop header instances — only the
      // one actually visible at the current breakpoint renders the motion
      gsap.from('[data-work-header]', {
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
        x: Math.min(offset, MAX_VISIBLE) * 10,
        y: Math.min(offset, MAX_VISIBLE) * 14,
        scale: 1 - Math.min(offset, MAX_VISIBLE) * 0.05,
        opacity: offset > MAX_VISIBLE ? 0 : 1,
        zIndex: (n - offset) * 10,
        rotate: 0,
      })

      // Cards already viewed collapse behind the active card, peeking out
      // from the top by a fixed amount — depth doesn't grow with how many
      // cards have been passed, so the header only needs a small, fixed
      // clearance above the stack instead of scaling with card count.
      const pastPosition = (layer) => ({
        x: 0,
        y: -20,
        scale: 0.95,
        opacity: 1,
        zIndex: n * 10 - layer,
        rotate: 0,
      })

      cards.forEach((card, i) => gsap.set(card, stackPosition(i)))

      const setActiveNav = (idx) => {
        navListRef.current.forEach((el, i) => {
          if (!el) return
          el.classList.toggle('text-text', i === idx)
          el.classList.toggle('font-bold', i === idx)
          el.classList.toggle('opacity-100', i === idx)
          el.classList.toggle('text-muted', i !== idx)
          el.classList.toggle('opacity-50', i !== idx)
        })
        navDotsRef.current.forEach((el, i) => {
          if (!el) return
          el.classList.toggle('w-6', i === idx)
          el.classList.toggle('bg-accent2', i === idx)
          el.classList.toggle('w-2', i !== idx)
          el.classList.toggle('bg-border', i !== idx)
        })
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: () => `+=${(n - 1) * window.innerHeight * 0.5}`,
          scrub: 0.4,
          pin: true,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (n - 1),
            duration: 0.4,
            ease: 'power1.inOut',
          },
          onUpdate: (self) => {
            const idx = Math.min(n - 1, Math.round(self.progress * (n - 1)))
            setActiveNav(idx)
          },
        },
      })

      for (let k = 0; k < n - 1; k++) {
        // the outgoing active card becomes the newest past card
        tl.to(cards[k], { ...pastPosition(1), duration: 0.4, ease: 'power2.inOut' }, k)

        // cards already in the past pile shift one layer further back
        for (let m = 0; m < k; m++) {
          const newLayer = k - m + 1
          tl.to(cards[m], { ...pastPosition(newLayer), duration: 0.4, ease: 'power2.out' }, k)
        }

        // upcoming cards advance toward the front
        for (let j = k + 1; j < n; j++) {
          tl.to(cards[j], { ...stackPosition(j - (k + 1)), duration: 0.4, ease: 'power2.out' }, k)
        }
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="work" className="relative" ref={sectionRef}>
      <div
        ref={pinRef}
        className="relative h-screen w-full flex flex-col px-8 md:px-10 pt-24 md:pt-20 pb-6 md:pb-8 overflow-hidden"
      >
        {/* mobile: compact header, small fixed gap above the card stack */}
        <div className="md:hidden shrink-0 max-w-xl text-left mb-8">
          <div data-work-header className="section-label !text-[0.72rem] !mb-2">Recent Work</div>
          <h2 data-work-header className="section-title !text-[clamp(1.2rem,4vw,1.6rem)] !mb-1.5">
            Products we've built<br />and are building.
          </h2>
          <p data-work-header className="section-sub !max-w-none text-[0.78rem]">
            From live client projects to industry-changing platforms currently in
            development.
          </p>
        </div>

        {/* desktop: header stays inside the pinned view, above the card stack */}
        <div className="hidden md:block shrink-0 max-w-xl text-left mb-10">
          <div data-work-header className="section-label !text-[0.68rem] !mb-2">Recent Work</div>
          <h2 data-work-header className="section-title !text-[clamp(1.1rem,1.8vw,1.5rem)] !mb-2">
            Products we've built<br />and are building.
          </h2>
          <p data-work-header className="section-sub !max-w-none text-[0.78rem]">
            From live client projects to industry-changing platforms currently in
            development.
          </p>
        </div>

        <div className="flex-1 min-h-0 w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-16">
          <div className="relative w-full max-w-[700px] flex-1 min-h-0 max-h-[380px] sm:max-h-[400px] md:h-full md:max-h-[480px]">
            {workItems.map((item, i) => (
              <div
                key={i}
                ref={(el) => (cardsRef.current[i] = el)}
                className="absolute inset-0 bg-surface border border-border rounded-lg overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] flex flex-col [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform-style:preserve-3d]"
              >
                <div
                  className={`h-24 sm:h-32 md:h-44 flex items-center justify-center text-[2.5rem] sm:text-[3.25rem] md:text-[4rem] shrink-0 bg-linear-to-br ${
                    variantGradient[item.variant] || variantGradient.blue
                  }`}
                >
                  {item.emoji}
                </div>
                <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-1 min-h-0">
                  <div className="inline-block self-start text-[0.62rem] sm:text-[0.7rem] md:text-[0.72rem] uppercase tracking-[0.08em] text-accent2 bg-accent2/10 py-[0.2rem] px-[0.6rem] rounded-[4px] mb-2 sm:mb-3 md:mb-4 font-medium shrink-0">
                    {item.tag}
                  </div>
                  <div className="font-head font-bold text-base sm:text-lg md:text-2xl mb-1.5 sm:mb-2 md:mb-3 shrink-0">
                    {item.title}
                  </div>
                  <div className="text-[0.75rem] sm:text-[0.82rem] md:text-[0.92rem] text-muted leading-relaxed flex-1 min-h-0 overflow-hidden line-clamp-2 sm:line-clamp-3 md:line-clamp-4">
                    {item.desc}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-3 sm:mt-4 md:mt-6 pt-3 sm:pt-4 md:pt-6 border-t border-border shrink-0">
                    <div className="flex items-center gap-2 text-[0.68rem] sm:text-[0.75rem] md:text-[0.78rem] text-muted">
                      <div
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          item.status === 'done' ? 'bg-green' : 'bg-[#f59e0b]'
                        }`}
                      />
                      {item.statusLabel}
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveItem(item)}
                      className="text-accent2 font-medium text-[0.78rem] sm:text-[0.85rem] md:text-[0.9rem] hover:translate-x-1 transition-transform duration-200 inline-block cursor-pointer"
                    >
                      View Project →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <nav className="hidden md:flex flex-col gap-4 shrink-0 max-w-[220px]">
            {workItems.map((item, i) => (
              <div
                key={i}
                ref={(el) => (navListRef.current[i] = el)}
                className={`text-[0.95rem] transition-colors duration-300 cursor-default ${
                  i === 0 ? 'text-text font-bold opacity-100' : 'text-muted opacity-50'
                }`}
              >
                {item.title}
              </div>
            ))}
          </nav>

          <div className="flex md:hidden items-center justify-center gap-2 shrink-0">
            {workItems.map((item, i) => (
              <div
                key={i}
                ref={(el) => (navDotsRef.current[i] = el)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === 0 ? 'w-6 bg-accent2' : 'w-2 bg-border'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <ProjectModal item={activeItem} onClose={() => setActiveItem(null)} />
    </section>
  )
}
