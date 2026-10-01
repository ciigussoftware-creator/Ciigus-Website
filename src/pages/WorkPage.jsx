import { useRef, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { workItems, workCategories, workCategorySlugs, workFilterAll, industryFocus } from '../data/content'
import { whatsappUrl } from '../lib/contact'
import ProjectModal from '../components/ProjectModal'
import WorkCover from '../components/WorkCover'
import ProjectCardFooter from '../components/ProjectCardFooter'
import CategoryIcon from '../components/CategoryIcon'

gsap.registerPlugin(ScrollTrigger)

const filters = [workFilterAll, ...workCategories]
const countFor = (filter) =>
  filter === workFilterAll ? workItems.length : workItems.filter((p) => p.category === filter).length
const logmaster = workItems.find((p) => p.id === 'logmaster')
const categoryBySlug = Object.fromEntries(Object.entries(workCategorySlugs).map(([label, slug]) => [slug, label]))

export default function WorkPage() {
  const heroRef = useRef(null)
  const gridRef = useRef(null)
  const cardsRef = useRef([])
  const introTweenRef = useRef(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const initialFilter = categoryBySlug[searchParams.get('category')] ?? workFilterAll
  const shownFilterRef = useRef(initialFilter)
  const [filter, setFilter] = useState(initialFilter)
  const [activeItem, setActiveItem] = useState(null)

  const chooseFilter = (f) => {
    setFilter(f)
    setSearchParams(f === workFilterAll ? {} : { category: workCategorySlugs[f] }, { replace: true })
  }

  const visible = filter === workFilterAll ? workItems : workItems.filter((p) => p.category === filter)

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
      introTweenRef.current = gsap.from(cardsRef.current.filter(Boolean), {
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

  // On a filter change, finish the scroll-in intro (so no card is left hidden)
  // and fade the newly visible cards in, unless the visitor prefers reduced motion.
  useEffect(() => {
    if (shownFilterRef.current === filter) return
    shownFilterRef.current = filter
    introTweenRef.current?.progress(1)
    ScrollTrigger.refresh()

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, stagger: 0.04, ease: 'power2.out' }
      )
    })
    return () => mm.revert()
  }, [filter])

  return (
    <>
      <section ref={heroRef} className="pt-36 pb-12 px-6 md:px-10 text-center">
        <div data-work-hero className="section-label mx-auto">Portfolio</div>
        <h1 data-work-hero className="section-title mx-auto max-w-3xl">
          Our work.
        </h1>
        <p data-work-hero className="section-sub mx-auto">
          Business systems, e-commerce websites and AI solutions: projects
          we've delivered, and platforms we're building now.
        </p>
      </section>

      <section className="pb-24 px-6 md:px-10">
        <div
          role="group"
          aria-label="Filter projects by category"
          className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto mb-10"
        >
          {filters.map((f) => {
            const active = f === filter
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                onClick={() => chooseFilter(f)}
                className={`rounded-full border py-2 px-4 text-[0.85rem] transition-colors duration-200 cursor-pointer ${
                  active
                    ? 'bg-linear-to-br from-green to-accent border-transparent text-[#03130d] font-semibold'
                    : 'bg-faint border-border text-muted hover:border-accent2/50 hover:text-text'
                }`}
              >
                {f} <span className={active ? 'opacity-70' : 'opacity-60'}>({countFor(f)})</span>
              </button>
            )
          })}
        </div>
        <p aria-live="polite" className="sr-only">
          Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
          {filter === workFilterAll ? '' : ` in ${filter}`}
        </p>

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {visible.map((item, i) => (
            <article
              key={item.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="bg-surface border border-border rounded-lg overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.3)] flex flex-col"
            >
              <div className="h-44 shrink-0">
                <WorkCover item={item} />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h2 className={`font-head font-bold text-lg mb-2 ${item.image ? '' : 'sr-only'}`}>{item.title}</h2>
                <p className="text-[0.85rem] text-muted leading-relaxed flex-1">{item.desc}</p>
                {item.cta && (
                  <a
                    href={whatsappUrl(item.cta.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline self-start mt-4 py-2 px-5 text-[0.85rem]"
                  >
                    {item.cta.label}
                  </a>
                )}
                <ProjectCardFooter item={item} onView={() => setActiveItem(item)} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="timber-plywood" className="section-alt py-20 px-6 md:px-10 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="section-label mx-auto">{industryFocus.label}</div>
            <h2 className="section-title mx-auto max-w-2xl">{industryFocus.title}</h2>
            <p className="section-sub mx-auto">{industryFocus.desc}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {industryFocus.items.map((entry) => {
              const project = workItems.find((p) => p.id === entry.projectId)
              return (
                <button
                  key={entry.projectId}
                  type="button"
                  onClick={() => setActiveItem(project)}
                  className="group text-left bg-bg border border-border rounded-lg p-5 flex flex-col transition-colors duration-200 hover:border-accent2 cursor-pointer"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent2/10 text-accent2 mb-4">
                    <CategoryIcon category={project.category} className="w-5 h-5" />
                  </span>
                  <span className="font-head font-bold text-[0.95rem] mb-1.5">{entry.title}</span>
                  <span className="text-[0.83rem] text-muted leading-relaxed flex-1">{entry.desc}</span>
                  <span className="mt-4 text-[0.82rem] font-medium text-accent2 group-hover:translate-x-1 transition-transform duration-200">
                    {industryFocus.viewLabel}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <a
              href={whatsappUrl(logmaster.cta.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {industryFocus.demoLabel}
            </a>
            <Link to="/contact" className="btn-outline">
              {industryFocus.contactLabel}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-10 text-center">
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
