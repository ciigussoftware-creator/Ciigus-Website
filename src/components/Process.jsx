import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { processSteps } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Process() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const timelineRef = useRef(null)
  const stepsRef = useRef([])
  const numsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header fade-in
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

      // Timeline line draws downward
      gsap.from(timelineRef.current, {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      })

      // Each step slides up with stagger
      gsap.from(stepsRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
      })

      // Number circles scale + rotate in
      gsap.from(numsRef.current, {
        scale: 0,
        rotation: -180,
        duration: 0.5,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section-alt py-24 px-10 md:py-16 md:px-5" id="process" ref={sectionRef}>
      <div ref={headerRef}>
        <div className="section-label">How We Work</div>
        <h2 className="section-title">
          A clear process.<br />No surprises.
        </h2>
      </div>

      <div className="mt-16 relative">
        <div
          className="absolute left-5.25 top-0 bottom-8 w-px bg-border"
          ref={timelineRef}
        />
        {processSteps.map((step, i) => (
          <div
            className="flex gap-8 mb-12 relative"
            key={step.num}
            ref={(el) => (stepsRef.current[i] = el)}
          >
            <div
              className="w-11 h-11 rounded-full border border-border bg-surface2 flex items-center justify-center font-head text-[0.82rem] font-bold text-accent2 shrink-0 relative z-1"
              ref={(el) => (numsRef.current[i] = el)}
            >
              {step.num}
            </div>
            <div className="pt-[0.55rem]">
              <div className="font-head font-bold text-base mb-[0.4rem]">
                {step.title}
              </div>
              <div className="text-[0.88rem] text-muted leading-[1.7] max-w-120">
                {step.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

