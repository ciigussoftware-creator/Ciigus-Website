import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { roles, values } from '../data/content'
import FadeUp from '../components/FadeUp'
import ValueCard from '../components/ValueCard'
import Process from '../components/Process'

gsap.registerPlugin(ScrollTrigger)

const accentColors = [
  'var(--color-green)',
  'var(--color-accent)',
  '#f59e0b',
  '#ec4899',
]

export default function AboutPage() {
  const gridRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
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
      <section className="pt-36 pb-16 px-6 md:px-10 text-center">
        <FadeUp>
          <div className="section-label mx-auto">About Ciigus</div>
          <h1 className="section-title mx-auto max-w-3xl">
            A versatile team. Ready for anything.
          </h1>
          <p className="section-sub mx-auto">
            Ciigus brings together developers, QA engineers, business
            analysts, and project managers - who take on challenges head-on
            and deliver exactly what our clients expect, every time.
          </p>
        </FadeUp>

        <FadeUp delay={0.15} className="flex flex-wrap justify-center gap-[0.6rem] mt-8">
          {roles.map((role) => (
            <div
              className="bg-faint border border-border rounded-full py-[0.35rem] px-4 text-[0.82rem] text-muted transition-all duration-200 ease-in-out hover:border-accent2/50 hover:text-text hover:-translate-y-0.5"
              key={role}
            >
              {role}
            </div>
          ))}
        </FadeUp>
      </section>

      <section className="pb-24 px-6 md:px-10">
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 max-w-5xl mx-auto"
        >
          {values.map((val, i) => (
            <ValueCard
              key={val.title}
              icon={val.icon}
              title={val.title}
              desc={val.desc}
              accentColor={accentColors[i % accentColors.length]}
              cardRef={(el) => (cardsRef.current[i] = el)}
            />
          ))}
        </div>
      </section>

      <Process />

      <section className="section-alt py-20 px-6 md:px-10 text-center">
        <h2 className="section-title mx-auto max-w-2xl">
          Ready to work with us?
        </h2>
        <p className="section-sub mx-auto mb-8">
          Tell us about your project and let's figure out the path forward.
        </p>
        <Link to="/contact" className="btn-primary">
          Start a Project
        </Link>
      </section>
    </>
  )
}
