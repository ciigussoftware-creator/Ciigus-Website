import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const cardsRef = useRef([])
  const iconsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header elements fade + slide in
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

      // Service cards stagger in
      gsap.from(cardsRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // Icon boxes pop in
      gsap.from(iconsRef.current, {
        scale: 0,
        rotation: -90,
        duration: 0.5,
        stagger: 0.12,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services" className="py-24 px-10 md:py-16 md:px-5" ref={sectionRef}>
      <div ref={headerRef}>
        <div className="section-label">What We Do</div>
        <h2 className="section-title">
          Everything your business<br />needs, built right.
        </h2>
        <p className="section-sub">
          From a simple business website to a full-scale industry management
          system - we design, build, and support it all.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[1.5px] bg-border mt-16 border border-border">
        {services.map((svc, i) => (
          <div
            className="bg-bg py-10 px-4 transition-colors duration-200 ease-in-out relative overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-linear-to-br after:from-green after:to-accent after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out hover:bg-surface hover:after:scale-x-100"
            key={svc.title}
            ref={(el) => (cardsRef.current[i] = el)}
          >
            <div
              className="w-11 h-11 rounded-md bg-accent2/10 border border-accent2/20 flex items-center justify-center mb-6 text-[1.2rem]"
              ref={(el) => (iconsRef.current[i] = el)}
            >
              {svc.icon}
            </div>
            <div className="font-head font-bold text-[1.05rem] mb-[0.6rem]">
              {svc.title}
            </div>
            <div className="text-[0.88rem] text-muted leading-[1.7]">
              {svc.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

