import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { services } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function ServicesPage() {
  const heroRef = useRef(null)
  const gridRef = useRef(null)
  const cardsRef = useRef([])

  useGSAP(() => {
    gsap.from('[data-services-hero]', {
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
        stagger: 0.08,
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
        <div data-services-hero className="section-label mx-auto">What We Do</div>
        <h1 data-services-hero className="section-title mx-auto max-w-3xl">
          What we build.
        </h1>
        <p data-services-hero className="section-sub mx-auto">
          Custom software built around your business — from a simple website
          to a full-scale industry management platform. Pick a service below
          or tell us your idea and we'll map out the right build.
        </p>
      </section>

      <section className="pb-24 px-6 md:px-10">
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {services.map((svc, i) => (
            <div
              key={svc.title}
              ref={(el) => (cardsRef.current[i] = el)}
              className="bg-bg border border-border rounded-xl overflow-hidden transition-[background-color,transform] duration-200 ease-in-out hover:bg-surface hover:-translate-y-1"
            >
              <div className="relative w-full h-40">
                <img
                  src={svc.image}
                  alt={svc.title}
                  className="w-full h-40 object-cover"
                  onError={(e) => (e.target.style.display = 'none')}
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
              <div className="pt-5 pb-6 px-5">
                <div className="text-2xl mb-2">{svc.icon}</div>
                <div className="font-head font-bold text-base mb-2">
                  {svc.title}
                </div>
                <div className="text-[0.85rem] text-muted leading-[1.7]">
                  {svc.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-alt py-20 px-6 md:px-10 text-center">
        <h2 className="section-title mx-auto max-w-2xl">
          Not sure which service fits?
        </h2>
        <p className="section-sub mx-auto mb-8">
          Check our packages for ready-made bundles, or reach out and we'll
          scope your project together.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/packages" className="btn-primary">
            View Packages
          </Link>
          <Link to="/contact" className="btn-outline">
            Start a Project
          </Link>
        </div>
      </section>
    </>
  )
}
