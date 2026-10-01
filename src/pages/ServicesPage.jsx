import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { services, servicesPage, industryFocus, workItems } from '../data/content'
import { whatsappUrl } from '../lib/contact'
import ServiceCard from '../components/ServiceCard'
import StatusBadge from '../components/StatusBadge'
import BrandIcon from '../components/BrandIcon'

gsap.registerPlugin(ScrollTrigger)

const numberFor = (i) => String(i + 1).padStart(2, '0')
// Bento layout: the two featured services span two columns; the last two
// fill a row of two on desktop.
const spanFor = (service, i) =>
  service.featured ? 'md:col-span-2' : i >= services.length - 2 ? 'lg:col-span-2' : ''

const logmaster = workItems.find((p) => p.id === 'logmaster')
const spotlightProjects = industryFocus.items.map((entry) => ({
  ...entry,
  project: workItems.find((p) => p.id === entry.projectId),
}))

const gridBackground = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)',
  backgroundSize: '56px 56px',
  maskImage: 'radial-gradient(ellipse 75% 65% at 50% 40%, black 25%, transparent 75%)',
  WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 40%, black 25%, transparent 75%)',
}

export default function ServicesPage() {
  const pageRef = useRef(null)
  const heroRef = useRef(null)
  const { hero, grid, spotlight, process, why, finalCta } = servicesPage

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-svc-hero]', { y: 32, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' })
    })
    return () => mm.revert()
  }, { scope: heroRef })

  // Every element animated here is a plain wrapper with no CSS transition,
  // so GSAP's recorded end values can't be skewed (see the Hero CTA fix).
  useEffect(() => {
    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const once = (trigger, start = 'top 80%') => ({ trigger, start, toggleActions: 'play none none none' })

        gsap.from('[data-service-card]', {
          y: 48, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: once('[data-service-grid]'),
        })
        gsap.from('[data-spotlight-item]', {
          y: 32, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: once('[data-spotlight]'),
        })
        gsap.from('[data-process-step]', {
          y: 32, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: once('[data-process]'),
        })
        gsap.from('[data-process-line]', {
          scaleX: 0, duration: 1.2, ease: 'power2.inOut', transformOrigin: 'left center',
          scrollTrigger: once('[data-process]'),
        })
        gsap.from('[data-process-line-mobile]', {
          scaleY: 0, duration: 1.2, ease: 'power2.inOut', transformOrigin: 'center top',
          scrollTrigger: once('[data-process]'),
        })
        gsap.from('[data-why-point]', {
          y: 32, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: once('[data-why]'),
        })
        const counters = gsap.utils.toArray('[data-count]')
        counters.forEach((el) => {
          const target = Number(el.dataset.count)
          const counter = { value: 0 }
          el.textContent = '0'
          gsap.to(counter, {
            value: target, duration: 1.4, ease: 'power2.out',
            onUpdate: () => { el.textContent = Math.round(counter.value) },
            scrollTrigger: once('[data-why]'),
          })
        })
        gsap.from('[data-final-cta]', {
          y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: once('[data-final-cta]', 'top 85%'),
        })

        return () => counters.forEach((el) => { el.textContent = el.dataset.count })
      })
    }, pageRef)

    return () => {
      mm.revert()
      ctx.revert()
    }
  }, [])

  return (
    <div ref={pageRef}>
      {/* a) Hero */}
      <section ref={heroRef} className="relative isolate overflow-hidden bg-[#0a0f1e] px-6 pt-36 pb-20 md:px-10 md:pt-44 md:pb-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-[0.16] motion-safe:animate-grid-pan" style={gridBackground} />
        <div
          aria-hidden="true"
          className="absolute -top-48 -left-40 -z-10 h-[36rem] w-[36rem] rounded-full opacity-40 blur-3xl motion-safe:animate-glow-drift"
          style={{ background: 'radial-gradient(circle, #00ba9c 0%, transparent 65%)' }}
        />
        <div
          aria-hidden="true"
          className="absolute -right-32 -bottom-56 -z-10 h-[40rem] w-[40rem] rounded-full opacity-35 blur-3xl motion-safe:animate-glow-drift [animation-delay:-8s]"
          style={{ background: 'radial-gradient(circle, #0095fc 0%, transparent 65%)' }}
        />

        <div className="mx-auto grid max-w-7xl items-end gap-14 lg:grid-cols-[1.45fr_1fr]">
          <div>
            <p data-svc-hero className="mb-5 text-[0.78rem] font-medium uppercase tracking-[0.14em] text-accent2">
              {hero.label}
            </p>
            <h1
              data-svc-hero
              className="font-head text-[clamp(2.6rem,7.5vw,4.25rem)] font-bold leading-[1.02] tracking-[-0.035em] text-white"
            >
              {hero.title}{' '}
              <br className="hidden sm:block" />
              <span
                className="bg-clip-text text-transparent motion-safe:animate-gradient-wave"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #d5e73c, #00ba9c, #0095fc, #00ba9c, #d5e73c)',
                  backgroundSize: '300% 100%',
                }}
              >
                {hero.highlight}
              </span>
            </h1>
            <p data-svc-hero className="mt-7 max-w-xl text-[1.05rem] leading-relaxed text-[#a8b3cc] md:text-lg">
              {hero.desc}
            </p>
            <div data-svc-hero className="mt-10 flex flex-wrap gap-4">
              <Link to={hero.primaryCta.to} className="btn-primary">
                {hero.primaryCta.label}
              </Link>
              <Link to={hero.secondaryCta.to} className="btn-outline-light">
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>

          <nav data-svc-hero aria-label={hero.indexLabel} className="hidden lg:block">
            <p className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-white/60">{hero.indexLabel}</p>
            <ol className="border-t border-white/10">
              {services.map((service, i) => (
                <li key={service.id} className="border-b border-white/10">
                  <a
                    href={`#${service.id}`}
                    className="group flex items-baseline gap-5 py-3 text-[0.95rem] text-[#c8d1e0] transition-colors hover:text-white"
                  >
                    <span className="w-6 font-head text-[0.8rem] font-semibold text-accent2">{numberFor(i)}</span>
                    <span className="transition-transform duration-300 motion-safe:group-hover:translate-x-1.5">{service.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* b) Services bento grid */}
      <section className="bg-surface px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <div className="section-label">{grid.label}</div>
            <h2 className="section-title">{grid.title}</h2>
            <p className="section-sub">{grid.desc}</p>
          </div>

          <div data-service-grid className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, i) => (
              <div key={service.id} id={service.id} data-service-card className={spanFor(service, i)}>
                <ServiceCard service={service} number={numberFor(i)} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* c) Timber & plywood spotlight */}
      <section
        id="timber-spotlight"
        data-spotlight
        className="relative isolate overflow-hidden bg-[#0a0f1e] px-6 py-20 md:px-10 md:py-28"
      >
        <div
          aria-hidden="true"
          className="absolute -top-40 right-0 -z-10 h-[32rem] w-[32rem] rounded-full opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, #d5e73c 0%, transparent 65%)' }}
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-[0.08]" style={gridBackground} />

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.25fr]">
          <div>
            <p className="mb-4 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-green">{spotlight.label}</p>
            <h2 className="font-head text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.02em] text-white">
              {spotlight.title}
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-[#a8b3cc]">{spotlight.desc}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href={whatsappUrl(logmaster.cta.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                {spotlight.demoLabel}
              </a>
              <Link to={spotlight.projectsLink} className="btn-outline-light">
                {spotlight.projectsLabel}
              </Link>
            </div>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2">
            {spotlightProjects.map(({ projectId, title, desc, project }, i) => (
              <li
                key={projectId}
                data-spotlight-item
                className="flex flex-col rounded-xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm"
              >
                <span aria-hidden="true" className="font-head text-[2.25rem] font-bold leading-none number-outline">
                  {numberFor(i)}
                </span>
                <h3 className="mt-4 font-head text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 flex-1 text-[0.88rem] leading-relaxed text-[#a8b3cc]">{desc}</p>
                <div className="mt-4">
                  <StatusBadge status={project.status} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* d) How we work */}
      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <div className="section-label">{process.label}</div>
            <h2 className="section-title">{process.title}</h2>
          </div>

          <div data-process className="relative">
            <div aria-hidden="true" className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px bg-border lg:block">
              <div data-process-line className="h-full w-full bg-linear-to-r from-green via-accent2 to-accent" />
            </div>
            <div aria-hidden="true" className="absolute top-7 bottom-7 left-7 w-px bg-border lg:hidden">
              <div data-process-line-mobile className="h-full w-full bg-linear-to-b from-green via-accent2 to-accent" />
            </div>
            <ol className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">
              {process.steps.map((step, i) => (
                <li key={step.title} data-process-step className="relative pl-20 lg:pl-0 lg:text-center">
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 flex h-14 w-14 items-center justify-center rounded-full border-4 border-bg bg-[#0a0f1e] font-head text-[0.95rem] font-bold text-white shadow-[0_0_0_1px_rgba(0,186,156,0.5)] lg:relative lg:mx-auto"
                  >
                    {numberFor(i)}
                  </span>
                  <h3 className="font-head text-xl font-bold lg:mt-6">{step.title}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-muted lg:mx-auto lg:max-w-[16rem]">{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* e) Why Ciigus */}
      <section data-why className="relative isolate overflow-hidden bg-[#0a0f1e] px-6 py-20 md:px-10 md:py-24">
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-24 -z-10 h-[30rem] w-[30rem] rounded-full opacity-30 blur-3xl"
          style={{ background: 'radial-gradient(circle, #00ba9c 0%, transparent 65%)' }}
        />
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-[0.78rem] font-medium uppercase tracking-[0.14em] text-accent2">{why.label}</p>
            <h2 className="font-head text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-[1.15] tracking-[-0.02em] text-white">
              {why.title}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
            {why.points.map((point) => (
              <div key={point.label} data-why-point className="border-t border-white/15 pt-6">
                <p
                  aria-hidden="true"
                  data-count={point.value}
                  className="inline-block bg-linear-to-r from-green via-accent2 to-accent bg-clip-text font-head text-[clamp(3rem,7vw,4.75rem)] font-bold leading-none tracking-[-0.04em] text-transparent"
                >
                  {point.value}
                </p>
                <h3 className="mt-3 font-head text-[1rem] font-bold text-white">
                  <span className="sr-only">{point.value} </span>
                  {point.label}
                </h3>
                <p className="mt-2 text-[0.85rem] leading-relaxed text-[#a8b3cc]">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* f) Final CTA */}
      <section className="px-6 py-20 md:px-10 md:py-24">
        <div
          data-final-cta
          className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[#0a0f1e] px-6 py-16 text-center md:px-16 md:py-20"
        >
          <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-[0.12]" style={gridBackground} />
          <div
            aria-hidden="true"
            className="absolute -top-32 left-1/2 -z-10 h-[26rem] w-[44rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
            style={{ background: 'radial-gradient(ellipse, #00ba9c 0%, #0095fc 35%, transparent 70%)' }}
          />
          <h2 className="mx-auto max-w-3xl font-head text-[clamp(1.9rem,4.5vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-white">
            {finalCta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.02rem] leading-relaxed text-[#c8d1e0]">{finalCta.desc}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to={finalCta.primary.to} className="btn-primary">
              {finalCta.primary.label}
            </Link>
            <a
              href={whatsappUrl(finalCta.whatsapp.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light"
            >
              <BrandIcon name="whatsapp" className="mr-2 inline-block h-5 w-5 align-[-4px]" />
              {finalCta.whatsapp.label}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
