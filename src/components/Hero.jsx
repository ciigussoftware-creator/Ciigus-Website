import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
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

// navigator.connection is Chromium-only; other browsers always autoplay.
// Don't treat '3g' as slow: Chrome derives it mostly from round-trip time, so
// ordinary broadband with ~300ms international RTT (common in Sri Lanka)
// reports '3g' and the video would never play.
function shouldAutoplayVideo() {
  const conn = navigator.connection
  if (!conn) return true
  return !conn.saveData && !['slow-2g', '2g'].includes(conn.effectiveType)
}

export default function Hero() {
  const sectionRef = useRef(null)
  const [autoplayVideo] = useState(shouldAutoplayVideo)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } })

    tl.from('[data-hero="heading"]', {
      y: 40,
      opacity: 0,
      duration: 0.9,
    })
    .from('[data-hero="desc"]', {
      y: 30,
      opacity: 0,
      duration: 0.7,
    }, '-=0.45')
    // Animate the wrapper, not the buttons: btn-primary/btn-outline carry a
    // CSS `transition-all` that makes GSAP record opacity ~0 as the end value.
    .from('[data-hero="cta"]', {
      y: 25,
      opacity: 0,
      duration: 0.6,
    }, '-=0.4')
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
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: "url('/circuit-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <video
        autoPlay={autoplayVideo}
        preload={autoplayVideo ? 'auto' : 'none'}
        poster="/assets/Video/Ciigus_hero_poster.webp"
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/assets/Video/Ciigus_hero.mp4" type="video/mp4" />
      </video>

      <div
        className="hidden md:block"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'rgba(10,15,30,0.92)',
        }}
      />
      <div
        className="md:hidden"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'rgba(10,15,30,0.60)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, width: '100%', paddingTop: '200px', paddingBottom: '80px' }} className="flex items-center">
        <div className="relative z-10 flex flex-col justify-center pb-6 px-6 md:pb-8 md:px-[1.2rem] pb-24 md:pb-20 ml-3 md:w-[55%] min-w-0">
          <h1 data-hero="heading" className="font-head text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-[-2px] md:tracking-[-1px] max-w-205 mb-4 -mt-2 ml-3">
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

          <p data-hero="desc" className="text-[1rem] md:text-[0.95rem] text-[#a8b3cc] max-w-130 mb-0 font-light leading-[1.7]">
            Ciigus develops modern digital products - from restaurant systems to
            enterprise management platforms - for businesses ready to grow.
          </p>

          <div data-hero="cta" className="flex flex-wrap gap-4 mt-6">
            <Link to="/services" className="btn-primary">
              Explore Services
            </Link>
            <Link to="/contact" className="btn-outline !border-[#e2e8f0]/30 !text-[#e2e8f0] hover:!text-white hover:!border-white/60">
              Start a Project
            </Link>
          </div>

          <div data-hero="stats" className="flex md:hidden gap-8 mt-6">
            {stats.map((s) => (
              <div key={s.lbl} className="text-center">
                <CounterStat value={s.val} />
                <div className="text-[0.7rem] sm:text-[0.82rem] text-[#a8b3cc] mt-0.5">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        <div data-hero="stats" className="hidden md:flex self-center relative z-10 md:w-[40%] min-w-0 h-[300px] mr-8 lg:mr-16 ml-auto">
          <div className="flex h-full w-full flex-col items-center justify-center gap-8">
            {stats.map((s) => (
              <div key={s.lbl} className="text-center">
                <CounterStat value={s.val} />
                <div className="text-[0.7rem] sm:text-[0.82rem] text-[#a8b3cc] mt-0.5">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
