import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { stats } from '../data/content'

function CounterStat({ value }) {
  const ref = useRef(null)
  const num = parseInt(value, 10)
  const suffix = value.replace(/[0-9]/g, '')

  useGSAP(() => {
    const steps = 10
    const delay = 1.6
    const maxRandom = num * 3
    const el = ref.current

    const tl = gsap.timeline({ delay })
    let time = 0

    for (let i = 0; i < steps; i++) {
      const rand = Math.floor(Math.random() * maxRandom)
      // Decelerate: each step gets progressively longer
      const stepDur = 0.08 + (i / steps) * 0.16

      tl.call(() => { el.textContent = rand + suffix }, [], time)
      time += stepDur
    }

    // Final: show the real value
    tl.call(() => { el.textContent = num + suffix }, [], time)

    return () => tl.kill()
  })

  return (
    <div ref={ref} className="font-head text-3xl font-bold text-text">
      {value}
    </div>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)

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
    .from('[data-hero="cta"] > *', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
    }, '-=0.35')
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
      className="min-h-screen flex flex-col justify-center pt-32 pb-16 px-10 md:pt-28 md:pb-12 md:px-[1.2rem] relative overflow-hidden"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 60% 50% at 70% 30%, rgba(30, 155, 215, 0.10) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 25% 60%, rgba(54, 201, 138, 0.08) 0%, transparent 70%)',
      }}
      id="home"
    >
      <div data-hero="badge" className="inline-flex items-center gap-2 bg-accent2/10 border border-accent2/25 rounded-full py-[0.35rem] px-4 text-[0.8rem] text-green mb-[1.8rem] w-fit">
        <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse-slow" />
        🇱🇰 Based in Sri Lanka · Building Globally
      </div>

      <h1 data-hero="heading" className="font-head text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.08] tracking-[-2px] md:tracking-[-1px] max-w-205 mb-6">
        We build software<br />
        that moves <span className="bg-linear-to-br from-green to-accent bg-clip-text text-transparent">businesses</span><br />
        forward.
      </h1>

      <p data-hero="desc" className="text-[1.1rem] text-muted max-w-130 mb-10 font-light leading-[1.7]">
        Ciigus develops modern digital products - from restaurant systems to
        enterprise management platforms - for businesses ready to grow.
      </p>

      <div data-hero="cta" className="flex gap-4 flex-wrap max-[480px]:flex-col">
        <a className="btn-primary" href="#contact">Start a Project</a>
        <a className="btn-outline" href="#work">See Our Work</a>
      </div>

      <div data-hero="stats" className="flex gap-12 md:gap-8 max-[480px]:flex-wrap max-[480px]:gap-6 mt-16 pt-8 border-t border-border">
        {stats.map((s) => (
          <div key={s.lbl}>
            <CounterStat value={s.val} />
            <div className="text-[0.82rem] text-muted mt-0.5">{s.lbl}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
