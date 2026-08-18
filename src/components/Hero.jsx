import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { stats } from '../data/content'

function CounterStat({ value }) {
  const ref = useRef(null)
  const num = parseInt(value, 10)
  const suffix = value.replace(/[0-9]/g, '')

  useEffect(() => {
    const el = ref.current
    const counter = { val: 0 }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        gsap.to(counter, {
          val: num,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(counter.val) + suffix },
        })
        observer.disconnect()
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [num, suffix])

  return (
    <div ref={ref} className="font-head text-2xl sm:text-3xl font-bold text-white">
      {`0${suffix}`}
    </div>
  )
}

const GLOW_IDLE =
  'radial-gradient(circle 0px at 50% 50%, rgba(0,170,255,0.35), transparent 60%), radial-gradient(circle 0px at 50% 50%, transparent 0%, rgba(0,0,0,0.94) 0%)'

function glowAt(x, y) {
  return `radial-gradient(circle 60px at ${x}px ${y}px, rgba(0,170,255,0.35), transparent 65%), radial-gradient(circle 80px at ${x}px ${y}px, transparent 0%, rgba(0,0,0,0.94) 70%)`
}

export default function Hero() {
  const sectionRef = useRef(null)
  const glowRef = useRef(null)

  // Direct DOM style writes (skipping React state) so the spotlight tracks
  // the cursor every frame without a re-render per mousemove.
  const handleMouseMove = (e) => {
    const statsBoxes = sectionRef.current.querySelectorAll('[data-hero="stats"]')
    for (const box of statsBoxes) {
      const statsRect = box.getBoundingClientRect()
      if (
        e.clientX >= statsRect.left &&
        e.clientX <= statsRect.right &&
        e.clientY >= statsRect.top &&
        e.clientY <= statsRect.bottom
      ) {
        glowRef.current.style.backgroundImage = GLOW_IDLE
        return
      }
    }

    const rect = sectionRef.current.getBoundingClientRect()
    glowRef.current.style.backgroundImage = glowAt(
      e.clientX - rect.left,
      e.clientY - rect.top
    )
  }

  const handleMouseLeave = () => {
    glowRef.current.style.backgroundImage = GLOW_IDLE
  }

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } })

    tl.from('[data-hero="badge"]', {
      y: 20,
      opacity: 0,
      duration: 0.7,
    })
    .from('[data-hero="heading"]', {
      y: 40,
      opacity: 0,
      duration: 0.9,
    }, '-=0.35')
    .from('[data-hero="desc"]', {
      y: 30,
      opacity: 0,
      duration: 0.7,
    }, '-=0.45')
    .from('[data-hero="stats"] > *', {
      y: 25,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
    }, '-=0.3')
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen relative overflow-hidden flex items-center"
      id="home"
    >
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/circuit-bg.jpg)' }}
      />
      <div
        ref={glowRef}
        className="hidden md:block absolute inset-0 z-1 pointer-events-none transition-[background-image] duration-150 ease-out"
        style={{ backgroundImage: GLOW_IDLE }}
      />
      <div
        className="md:hidden absolute inset-0 z-1 pointer-events-none"
        style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
      />

      <div className="relative z-10 flex flex-col justify-center min-h-screen pt-4 pb-6 px-6 md:pt-24 md:pb-8 md:px-[1.2rem] pb-24 md:pb-20 ml-3 md:w-[55%] min-w-0">
        <h1 data-hero="heading" className="font-head text-white text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-[1.08] tracking-[-2px] md:tracking-[-1px] max-w-205 mb-4 -mt-2 ml-3">
          We build software<br />
          that moves <span
            className="bg-clip-text text-transparent animate-gradient-wave"
            style={{
              backgroundImage: 'linear-gradient(90deg, #d5e73c, #00ba9c, #0095fc, #00ba9c, #d5e73c)',
              backgroundSize: '300% 100%',
            }}
          >businesses</span><br />
          forward.
        </h1>

        <p data-hero="desc" className="text-[1rem] md:text-[0.95rem] text-[#e2e8f0] opacity-100 max-w-130 mb-0 font-light leading-[1.7]">
          Ciigus develops modern digital products - from restaurant systems to
          enterprise management platforms - for businesses ready to grow.
        </p>

        <div data-hero="stats" className="flex md:hidden justify-center gap-6 mt-6">
          {stats.map((s) => (
            <div key={s.lbl} className="text-center">
              <CounterStat value={s.val} />
              <div className="text-[0.7rem] sm:text-[0.82rem] text-[#cccccc] mt-0.5">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      <div data-hero="stats" className="hidden md:flex self-center relative z-10 md:w-[40%] min-w-0 h-[300px] mr-8 lg:mr-16 ml-auto">
        <div className="flex h-full w-full flex-col items-center justify-center gap-8">
          {stats.map((s) => (
            <div key={s.lbl} className="text-center">
              <CounterStat value={s.val} />
              <div className="text-[0.7rem] sm:text-[0.82rem] text-[#cccccc] mt-0.5">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
