import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { workItems } from '../data/content'
import { variantGradient } from '../components/Work'
import ProjectModal from '../components/ProjectModal'

gsap.registerPlugin(ScrollTrigger)

export default function WorkPage() {
  const heroRef = useRef(null)
  const gridRef = useRef(null)
  const cardsRef = useRef([])
  const [activeItem, setActiveItem] = useState(null)

  useGSAP(() => {
    gsap.from('[data-work-hero]', {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
    })
  }, { scope: heroRef })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, gridRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section ref={heroRef} className="pt-36 pb-16 px-6 md:px-10 text-center">
        <div data-work-hero className="section-label mx-auto">Portfolio</div>
        <h1 data-work-hero className="section-title mx-auto max-w-3xl">
          Our work.
        </h1>
        <p data-work-hero className="section-sub mx-auto">
          From live client projects to industry-changing platforms currently
          in development — here's what we've built and what we're building.
        </p>
      </section>

      <section className="pb-24 px-6 md:px-10">
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {workItems.map((item, i) => (
            <div
              key={item.title}
              ref={(el) => (cardsRef.current[i] = el)}
              className="bg-surface border border-border rounded-lg overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.3)] flex flex-col"
            >
              <div
                className={`h-40 flex items-center justify-center text-[3rem] shrink-0 bg-linear-to-br ${
                  variantGradient[item.variant] || variantGradient.blue
                }`}
              >
                {item.emoji}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="inline-block self-start text-[0.7rem] uppercase tracking-[0.08em] text-accent2 bg-accent2/10 py-[0.2rem] px-[0.6rem] rounded-[4px] mb-3 font-medium">
                  {item.tag}
                </div>
                <div className="font-head font-bold text-lg mb-2">
                  {item.title}
                </div>
                <div className="text-[0.85rem] text-muted leading-relaxed flex-1">
                  {item.desc}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 mt-5 pt-5 border-t border-border">
                  <div className="flex items-center gap-2 text-[0.78rem] text-muted">
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
                    className="text-accent2 font-medium text-[0.85rem] hover:translate-x-1 transition-transform duration-200 inline-block cursor-pointer"
                  >
                    View Project →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-alt py-20 px-6 md:px-10 text-center">
        <h2 className="section-title mx-auto max-w-2xl">
          Got a project in mind?
        </h2>
        <p className="section-sub mx-auto mb-8">
          Let's talk about what you're trying to build.
        </p>
        <Link to="/contact" className="btn-primary">
          Start a Project
        </Link>
      </section>

      <ProjectModal item={activeItem} onClose={() => setActiveItem(null)} />
    </>
  )
}
