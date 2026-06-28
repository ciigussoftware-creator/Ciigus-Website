import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { workItems } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Work() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef([])
  const emojisRef = useRef([])
  const tagsRef = useRef([])
  const dotsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Header elements
      tl.fromTo(
        headerRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out' }
      )

      // Cards stagger in
      tl.fromTo(
        cardsRef.current.filter(Boolean),
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out' },
        '-=0.3'
      )

      // Emoji icons bounce in
      tl.fromTo(
        emojisRef.current.filter(Boolean),
        { scale: 0 },
        { scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)' },
        '-=0.5'
      )

      // Tags slide in
      tl.fromTo(
        tagsRef.current.filter(Boolean),
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
        '-=0.4'
      )

      // Status dots pop in
      tl.fromTo(
        dotsRef.current.filter(Boolean),
        { scale: 0 },
        { scale: 1, duration: 0.3, stagger: 0.1, ease: 'back.out(2)' },
        '-=0.3'
      )

      // GSAP pulse for active (non-done) status dots
      dotsRef.current.forEach((dot) => {
        if (dot && dot.dataset.active === 'true') {
          gsap.to(dot, {
            opacity: 0.3,
            duration: 0.75,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 1.5,
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="work" className="py-24 px-10 md:py-16 md:px-5" ref={sectionRef}>
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

      <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 mt-16">
        {workItems.map((item, i) => (
          <div
            className="bg-surface border border-border rounded-lg overflow-hidden transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-accent2/40"
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
          >
            <div
              className={`h-45 flex items-center justify-center text-[3rem] ${
                item.variant === 'blue'
                  ? 'bg-linear-to-br from-[#07182a] to-[#103a52]'
                  : item.variant === 'green'
                  ? 'bg-linear-to-br from-[#0a1f14] to-[#154a31]'
                  : 'bg-linear-to-br from-[#0a1a28] to-[#1a3a4a]'
              }`}
            >
              <span ref={(el) => (emojisRef.current[i] = el)}>{item.emoji}</span>
            </div>
            <div className="p-6">
              <div
                className="inline-block text-[0.72rem] uppercase tracking-[0.08em] text-accent2 bg-accent2/10 py-[0.2rem] px-[0.7rem] rounded-[4px] mb-[0.8rem] font-medium"
                ref={(el) => (tagsRef.current[i] = el)}
              >
                {item.tag}
              </div>
              <div className="font-head font-bold text-base mb-[0.4rem]">
                {item.title}
              </div>
              <div className="text-[0.85rem] text-muted leading-relaxed">
                {item.desc}
              </div>
              <div className="flex items-center gap-2 mt-4 text-[0.78rem] text-muted">
                <div
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    item.status === 'done' ? 'bg-green' : 'bg-[#f59e0b]'
                  }`}
                  ref={(el) => (dotsRef.current[i] = el)}
                  data-active={item.status !== 'done' ? 'true' : 'false'}
                />
                {item.statusLabel}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}


