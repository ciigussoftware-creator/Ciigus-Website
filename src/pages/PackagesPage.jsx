import { useRef, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { industryPackages, packageSystems, packagesPage, workItems } from '../data/content'
import { whatsappUrl } from '../lib/contact'
import FadeUp from '../components/FadeUp'
import PackageIcon from '../components/PackageIcon'
import BrandIcon from '../components/BrandIcon'
import WorkCover from '../components/WorkCover'
import ProjectModal from '../components/ProjectModal'

gsap.registerPlugin(ScrollTrigger)

const numberFor = (i) => String(i + 1).padStart(2, '0')
const isIndustry = (id) => industryPackages.some((p) => p.id === id)
const tabIdFor = (id) => `package-tab-${id}`
const projectFor = (pkg) => workItems.find((p) => p.id === pkg.projectId) ?? null
const systemEntries = Object.entries(packageSystems)
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function PackagesPage() {
  const pageRef = useRef(null)
  const panelRef = useRef(null)
  const tablistRef = useRef(null)
  const highlightRef = useRef(null)
  const tabsRef = useRef([])
  const [searchParams, setSearchParams] = useSearchParams()
  const requested = searchParams.get('industry')
  const [activeId, setActiveId] = useState(isIndustry(requested) ? requested : industryPackages[0].id)
  const [activeProject, setActiveProject] = useState(null)
  const [selected, setSelected] = useState([])
  const shownIdRef = useRef(activeId)
  const highlightPlacedRef = useRef(false)
  const activeIndex = industryPackages.findIndex((p) => p.id === activeId)
  const activeIndexRef = useRef(activeIndex)
  activeIndexRef.current = activeIndex
  const active = industryPackages[activeIndex]
  const project = projectFor(active)
  const { hero, noShowcase, buildOwn, process, faq, finalCta } = packagesPage

  const selectedNames = systemEntries.filter(([id]) => selected.includes(id)).map(([, system]) => system.name)
  const buildMessage = selectedNames.length ? buildOwn.selectionMessage(selectedNames) : buildOwn.ctaMessage

  const selectTab = (i) => {
    const { id } = industryPackages[i]
    setActiveId(id)
    setSearchParams({ industry: id }, { replace: true })
  }

  const handleTabKeyDown = (e) => {
    const last = industryPackages.length - 1
    const next = {
      ArrowRight: activeIndex === last ? 0 : activeIndex + 1,
      ArrowLeft: activeIndex === 0 ? last : activeIndex - 1,
      Home: 0,
      End: last,
    }[e.key]
    if (next === undefined) return
    e.preventDefault()
    selectTab(next)
    tabsRef.current[next].focus()
  }

  const toggleSystem = (id) =>
    setSelected((current) => (current.includes(id) ? current.filter((s) => s !== id) : [...current, id]))

  // The highlight has to reach the selected tab even under reduced motion, so
  // it moves instantly there (duration 0) instead of being skipped by matchMedia.
  const placeHighlight = (animate) => {
    const tab = tabsRef.current[activeIndexRef.current]
    if (!tab || !highlightRef.current) return
    gsap.to(highlightRef.current, {
      x: tab.offsetLeft,
      y: tab.offsetTop,
      width: tab.offsetWidth,
      height: tab.offsetHeight,
      duration: animate && !prefersReducedMotion() ? 0.45 : 0,
      ease: 'power3.out',
      overwrite: true,
    })
  }

  useGSAP(() => {
    placeHighlight(highlightPlacedRef.current)
    highlightPlacedRef.current = true
  }, { scope: tablistRef, dependencies: [activeId] })

  // Tab sizes change with the viewport (3 + 2 grid on phones, one row on desktop)
  useEffect(() => {
    const observer = new ResizeObserver(() => placeHighlight(false))
    observer.observe(tablistRef.current)
    return () => observer.disconnect()
  }, [])

  // Compare with the last shown industry rather than skipping the first run:
  // StrictMode runs this twice on mount, which would animate the initial panel.
  useGSAP(() => {
    if (shownIdRef.current === activeId) return
    shownIdRef.current = activeId
    // Panels differ in height, so the scroll reveals below need new positions
    ScrollTrigger.refresh()

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({ defaults: { ease: 'power2.out' } })
        .from('[data-pkg-intro]', { y: 12, opacity: 0, duration: 0.4 })
        .from('[data-pkg-chain-item]', { x: -12, opacity: 0, duration: 0.35, stagger: 0.12 }, 0.05)
        .from('[data-pkg-chain-segment]', {
          scaleY: 0, transformOrigin: 'center top', duration: 0.3, stagger: 0.12, ease: 'power1.inOut',
        }, 0.25)
    })
    return () => mm.revert()
  }, { scope: panelRef, dependencies: [activeId], revertOnUpdate: true })

  // Every element animated here is a plain wrapper with no CSS transition.
  useEffect(() => {
    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const once = (trigger, start = 'top 80%') => ({ trigger, start, toggleActions: 'play none none none' })

        gsap.from('[data-pkg-build-item]', {
          y: 32, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: once('[data-pkg-build]'),
        })
        gsap.from('[data-pkg-step]', {
          y: 32, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: once('[data-pkg-process]'),
        })
        gsap.from('[data-pkg-line]', {
          scaleX: 0, duration: 1.2, ease: 'power2.inOut', transformOrigin: 'left center',
          scrollTrigger: once('[data-pkg-process]'),
        })
        gsap.from('[data-pkg-line-mobile]', {
          scaleY: 0, duration: 1.2, ease: 'power2.inOut', transformOrigin: 'center top',
          scrollTrigger: once('[data-pkg-process]'),
        })
        gsap.from('[data-pkg-faq-item]', {
          y: 25, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: once('[data-pkg-faq]'),
        })
        gsap.from('[data-pkg-cta]', {
          y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: once('[data-pkg-cta]', 'top 85%'),
        })
      })
    }, pageRef)

    return () => {
      mm.revert()
      ctx.revert()
    }
  }, [])

  const seeButtonClasses =
    'inline-flex shrink-0 items-center gap-2 rounded-sm bg-white py-2 px-4 text-[0.85rem] font-semibold text-[#0a0f1e] transition-colors duration-200 hover:bg-green cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0f1e]'

  return (
    <div ref={pageRef}>
      {/* a) Hero */}
      <section className="pt-36 pb-10 px-6 md:px-10 text-center">
        <FadeUp>
          <div className="section-label mx-auto">{hero.label}</div>
          <h1 className="section-title mx-auto max-w-3xl">{hero.title}</h1>
          <p className="section-sub mx-auto">{hero.sub}</p>
        </FadeUp>
      </section>

      {/* b) Industry tabs + c) package panel */}
      <section className="pb-20 px-4 sm:px-6 md:px-10 md:pb-24">
        <FadeUp className="mx-auto max-w-6xl">
          {/* Phones: 3 tiles, then 2 centred (each spans 2 of 6 columns) */}
          <div
            ref={tablistRef}
            role="tablist"
            aria-label={packagesPage.tabsLabel}
            onKeyDown={handleTabKeyDown}
            className="relative grid grid-cols-6 gap-1.5 rounded-2xl border border-border bg-surface p-1.5 md:grid-cols-5"
          >
            <div
              ref={highlightRef}
              aria-hidden="true"
              className="absolute top-0 left-0 rounded-xl bg-[#0a0f1e] shadow-[0_10px_30px_-12px_rgba(10,15,30,0.6)]"
            />
            {industryPackages.map((pkg, i) => {
              const isSelected = pkg.id === activeId
              return (
                <button
                  key={pkg.id}
                  ref={(el) => (tabsRef.current[i] = el)}
                  type="button"
                  role="tab"
                  id={tabIdFor(pkg.id)}
                  aria-selected={isSelected}
                  aria-controls="package-panel"
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => selectTab(i)}
                  className={`relative z-10 col-span-2 flex min-w-0 flex-col items-center gap-2 rounded-xl px-1 py-3 text-center font-head text-[0.78rem] font-semibold leading-tight transition-colors duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 md:col-span-1 md:gap-3 md:px-3 md:py-5 md:text-[0.9rem] ${
                    i === 3 ? 'col-start-2 md:col-start-auto' : ''
                  } ${isSelected ? 'text-white' : 'text-muted hover:bg-bg hover:text-text'}`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 md:h-10 md:w-10 ${
                      isSelected ? 'bg-linear-to-br from-green to-accent text-[#03130d]' : 'bg-accent2/10 text-accent2-d'
                    }`}
                  >
                    <PackageIcon name={pkg.icon} />
                  </span>
                  <span className="md:hidden">{pkg.shortName}</span>
                  <span className="hidden md:inline">{pkg.name}</span>
                </button>
              )
            })}
          </div>

          <div
            ref={panelRef}
            id="package-panel"
            role="tabpanel"
            aria-labelledby={tabIdFor(active.id)}
            className="relative isolate mt-4 overflow-hidden rounded-3xl bg-[#0a0f1e] px-5 py-8 sm:px-8 sm:py-10 md:mt-6 md:px-12 md:py-14"
          >
            <div
              aria-hidden="true"
              className="absolute -top-40 -right-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,#00ba9c_0%,transparent_65%)] opacity-25 blur-3xl"
            />
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
              <div data-pkg-intro className="flex flex-col">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-green to-accent text-[#03130d]">
                  <PackageIcon name={active.icon} className="h-7 w-7" />
                </span>
                <h2 className="mt-6 font-head text-[clamp(1.5rem,3vw,2.2rem)] font-bold leading-[1.15] tracking-[-0.02em] text-white">
                  {active.name} package
                </h2>
                <p className="mt-4 text-[0.98rem] leading-relaxed text-[#c8d1e0]">{active.pitch}</p>
                <div className="mt-7">
                  <a
                    href={whatsappUrl(packagesPage.quoteMessage(active.name))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <BrandIcon name="whatsapp" className="mr-2 inline-block h-5 w-5 align-[-4px]" />
                    {packagesPage.quoteLabel}
                  </a>
                </div>

                {project ? (
                  <div className="relative mt-8 overflow-hidden rounded-2xl border border-white/10">
                    <div className="aspect-[4/3] sm:aspect-[16/10]">
                      <WorkCover item={project} />
                    </div>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0a0f1e] via-[#0a0f1e]/50 to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 p-4 sm:flex-row sm:items-end sm:justify-between">
                      <div className="w-full min-w-0 sm:w-auto sm:flex-1">
                        <p className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-accent2">
                          {packagesPage.showcaseLabel}
                        </p>
                        <p className="mt-0.5 truncate font-head text-[0.9rem] font-bold text-white">{project.title}</p>
                      </div>
                      {active.workLink ? (
                        <Link to={active.workLink} className={seeButtonClasses}>
                          {packagesPage.seeLabel}
                        </Link>
                      ) : (
                        <button type="button" onClick={() => setActiveProject(project)} className={seeButtonClasses}>
                          {packagesPage.seeLabel}
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="mt-8 flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent2/15 text-accent2">
                      <PackageIcon name="demo" />
                    </span>
                    <div>
                      <p className="font-head text-[0.95rem] font-bold text-white">{noShowcase.title}</p>
                      <p className="mt-1 text-[0.85rem] leading-relaxed text-[#a8b3cc]">{noShowcase.desc}</p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[0.78rem] font-medium uppercase tracking-[0.14em] text-accent2">
                    {packagesPage.includedLabel}
                  </p>
                  <p className="rounded-full border border-white/15 py-1 px-3 text-[0.75rem] font-medium text-[#c8d1e0]">
                    {packagesPage.includedCount(active.systems.length)}
                  </p>
                </div>
                <ol className="flex flex-col gap-3">
                  {active.systems.map((item, i) => {
                    const system = packageSystems[item.id]
                    return (
                      <li key={item.id} data-pkg-chain-item className="relative flex gap-3 sm:gap-4">
                        {i < active.systems.length - 1 && (
                          // Joins this node's centre (mt-3 + half of h-10) to the next one's
                          <span
                            aria-hidden="true"
                            data-pkg-chain-segment
                            className="absolute top-8 -bottom-11 left-5 w-px bg-accent2/50"
                          />
                        )}
                        <span className="relative mt-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent2/40 bg-[#0a0f1e] text-accent2">
                          <PackageIcon name={system.icon} />
                        </span>
                        <div className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-[translate,border-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-accent2/50 hover:shadow-[0_10px_30px_-12px_rgba(0,186,156,0.55)] sm:p-5">
                          <h3 className="font-head text-[0.98rem] font-bold text-white">{item.name ?? system.name}</h3>
                          <p className="mt-1 text-[0.85rem] leading-relaxed text-[#a8b3cc]">{item.benefit}</p>
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* d) Build your own package */}
      <section data-pkg-build className="section-alt px-4 py-20 sm:px-6 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div data-pkg-build-item className="max-w-2xl">
            <div className="section-label">{buildOwn.label}</div>
            <h2 className="section-title">{buildOwn.title}</h2>
            <p className="section-sub">{buildOwn.desc}</p>
          </div>

          <div data-pkg-build-item className="mt-10 rounded-3xl border border-border bg-bg p-4 sm:p-8">
            <p className="mb-5 text-[0.85rem] text-muted">{buildOwn.hint}</p>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {systemEntries.map(([id, system]) => {
                const isOn = selected.includes(id)
                return (
                  <li key={id}>
                    <button
                      type="button"
                      aria-pressed={isOn}
                      onClick={() => toggleSystem(id)}
                      className={`flex h-full w-full items-center gap-3 rounded-xl border p-3 text-left text-[0.88rem] font-medium transition-[translate,background-color,border-color,color,box-shadow] duration-200 cursor-pointer outline-none hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                        isOn
                          ? 'border-[#0a0f1e] bg-[#0a0f1e] text-white shadow-[0_10px_30px_-14px_rgba(10,15,30,0.7)]'
                          : 'border-border bg-surface text-text hover:border-accent2/50 hover:shadow-[0_10px_30px_-14px_rgba(0,186,156,0.45)]'
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
                          isOn ? 'bg-linear-to-br from-green to-accent text-[#03130d]' : 'bg-accent2/10 text-accent2-d'
                        }`}
                      >
                        <PackageIcon name={system.icon} />
                      </span>
                      <span className="min-w-0 flex-1">{system.name}</span>
                      <span
                        aria-hidden="true"
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                          isOn ? 'border-transparent bg-accent2 text-[#03130d]' : 'border-border text-muted'
                        }`}
                      >
                        <PackageIcon name={isOn ? 'check' : 'plus'} className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="mt-6 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <p aria-live="polite" className="text-[0.9rem] font-semibold">
                  {buildOwn.selectedCount(selected.length)}
                </p>
                {/* aria-disabled rather than disabled, so focus isn't lost after clearing */}
                <button
                  type="button"
                  aria-disabled={selected.length === 0}
                  onClick={() => selected.length && setSelected([])}
                  className="text-[0.85rem] text-muted underline underline-offset-4 cursor-pointer outline-none hover:text-text focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm aria-disabled:cursor-default aria-disabled:opacity-40 aria-disabled:hover:text-muted"
                >
                  {buildOwn.clearLabel}
                </button>
              </div>
              <a
                href={whatsappUrl(buildMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <BrandIcon name="whatsapp" className="mr-2 inline-block h-5 w-5 align-[-4px]" />
                {buildOwn.ctaLabel}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* e) How it works */}
      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <div className="section-label">{process.label}</div>
            <h2 className="section-title">{process.title}</h2>
          </div>

          <div data-pkg-process className="relative">
            <div aria-hidden="true" className="absolute top-7 right-[10%] left-[10%] hidden h-px bg-border lg:block">
              <div data-pkg-line className="h-full w-full bg-linear-to-r from-green via-accent2 to-accent" />
            </div>
            <div aria-hidden="true" className="absolute top-7 bottom-7 left-7 w-px bg-border lg:hidden">
              <div data-pkg-line-mobile className="h-full w-full bg-linear-to-b from-green via-accent2 to-accent" />
            </div>
            <ol className="relative grid gap-12 lg:grid-cols-5 lg:gap-6">
              {process.steps.map((step, i) => (
                <li key={step.title} data-pkg-step className="relative pl-20 lg:pl-0 lg:text-center">
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 flex h-14 w-14 items-center justify-center rounded-full border-4 border-bg bg-[#0a0f1e] font-head text-[0.95rem] font-bold text-white shadow-[0_0_0_1px_rgba(0,186,156,0.5)] lg:relative lg:mx-auto"
                  >
                    {numberFor(i)}
                  </span>
                  <h3 className="font-head text-xl font-bold lg:mt-6">{step.title}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-muted lg:mx-auto lg:max-w-[14rem]">{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* f) FAQ */}
      <section data-pkg-faq className="section-alt py-20 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label mx-auto">{faq.label}</div>
            <h2 className="section-title mx-auto max-w-xl">{faq.title}</h2>
          </div>

          <div className="flex flex-col gap-4">
            {faq.items.map((item) => (
              <div key={item.q} data-pkg-faq-item className="bg-bg border border-border rounded-lg p-5">
                <h3 className="font-head font-bold text-[0.95rem] mb-2">{item.q}</h3>
                <p className="text-[0.85rem] text-muted leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* g) Final CTA */}
      <section className="px-4 py-20 sm:px-6 md:px-10 md:py-24">
        <div
          data-pkg-cta
          className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[#0a0f1e] px-6 py-16 text-center md:px-16 md:py-20"
        >
          <div
            aria-hidden="true"
            className="absolute -top-32 left-1/2 -z-10 h-[26rem] w-[44rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,#00ba9c_0%,#0095fc_35%,transparent_70%)] opacity-40 blur-3xl"
          />
          <h2 className="mx-auto max-w-3xl font-head text-[clamp(1.9rem,4.5vw,3.25rem)] font-bold leading-[1.1] tracking-[-0.02em] text-white">
            {finalCta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.02rem] leading-relaxed text-[#c8d1e0]">{finalCta.desc}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={whatsappUrl(finalCta.whatsapp.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <BrandIcon name="whatsapp" className="mr-2 inline-block h-5 w-5 align-[-4px]" />
              {finalCta.whatsapp.label}
            </a>
            <Link to={finalCta.contact.to} className="btn-outline-light">
              {finalCta.contact.label}
            </Link>
          </div>
        </div>
      </section>

      <ProjectModal item={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  )
}
