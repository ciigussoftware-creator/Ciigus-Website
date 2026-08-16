import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

const marqueeServices = [...services, ...services]

export default function Services() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const trackRef = useRef(null)
  const tweenRef = useRef(null)

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

      // Marquee loop — track scrolls from 0 to -50% (duplicate set continues seamlessly)
      tweenRef.current = gsap.to(trackRef.current, {
        xPercent: -50,
        ease: 'none',
        duration: 50,
        repeat: -1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="services"
      className="min-h-screen flex flex-col justify-center py-12 px-0 md:px-10"
      ref={sectionRef}
    >
      <div ref={headerRef} className="mb-6 px-6">
        <div className="section-label">What We Do</div>
        <h2 className="section-title">
          Everything your business<br />needs, built right.
        </h2>
        <p className="section-sub">
          From a simple business website to a full-scale industry management
          system - we design, build, and support it all.
        </p>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex gap-5 w-max"
          ref={trackRef}
          onMouseEnter={() => tweenRef.current?.pause()}
          onMouseLeave={() => tweenRef.current?.play()}
        >
          {marqueeServices.map((svc, i) => (
            <div
              className="group  w-56 h-75 flex-shrink-0 bg-bg border border-border rounded-xl transition-[background-color,transform] duration-200 ease-in-out relative overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-linear-to-br after:from-green after:to-accent after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out hover:bg-surface hover:-translate-y-1 hover:after:scale-x-100"
              key={`${svc.title}-${i}`}
            >
              <div className="relative w-full h-32">
                <img
                  src={svc.image}
                  alt={svc.title}
                  className="w-full h-32 object-cover"
                  onError={(e) => (e.target.style.display = 'none')}
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-surface to-transparent" />
              </div>
              <div className="pt-4 pb-5 px-4">
                <div className="font-head font-bold text-[0.9rem] mb-[0.6rem]">
                  {svc.title}
                </div>
                <div className="mt-3 text-[0.78rem] text-muted leading-[1.7]">
                  {svc.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
