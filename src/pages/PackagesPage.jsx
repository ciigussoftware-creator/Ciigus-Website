import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { packages, packagesFaq, packagesNote } from '../data/content'
import FadeUp from '../components/FadeUp'

gsap.registerPlugin(ScrollTrigger)

export default function PackagesPage() {
  const gridRef = useRef(null)
  const cardsRef = useRef([])
  const faqRef = useRef(null)
  const faqItemsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(faqItemsRef.current, {
        y: 25,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: faqRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, faqRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section className="pt-36 pb-16 px-6 md:px-10 text-center">
        <FadeUp>
          <div className="section-label mx-auto">Pricing</div>
          <h1 className="section-title mx-auto max-w-3xl">
            Packages built for where you're at.
          </h1>
          <p className="section-sub mx-auto">
            Simple pricing for simple sites, and scalable packages for
            businesses ready to build something bigger.
          </p>
        </FadeUp>
      </section>

      <section className="pb-24 px-6 md:px-10">
        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch"
        >
          {packages.map((pkg, i) => (
            <div
              key={pkg.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`relative rounded-xl p-px h-full ${
                pkg.popular
                  ? 'bg-linear-to-br from-green to-accent'
                  : 'bg-border'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-linear-to-br from-green to-accent text-[#03130d] text-[0.68rem] uppercase tracking-[0.08em] font-bold py-1 px-3 rounded-full z-10">
                  Most Popular
                </div>
              )}
              <div className="relative bg-[#0d1626] rounded-xl p-8 h-full flex flex-col">
                <div className="font-head font-bold text-xl text-white mb-1">
                  {pkg.name}
                </div>
                <div className="font-head font-bold text-2xl mb-1 bg-clip-text text-transparent bg-linear-to-br from-green to-accent">
                  {pkg.price}
                </div>
                <div className="text-[0.78rem] text-[#8899bb] mb-2">
                  Best for: {pkg.bestFor}
                </div>
                <div className="text-[0.78rem] text-[#c8d1e0] mb-6">
                  <span className="text-white font-medium">Covers: </span>
                  {pkg.covers.join(' · ')}
                </div>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-[0.85rem] text-[#c8d1e0] leading-relaxed"
                    >
                      <span className="text-accent2 mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/contact?package=${encodeURIComponent(pkg.name)}`}
                  className={
                    pkg.popular
                      ? 'btn-primary w-full text-center'
                      : 'inline-block border border-[#2a3a55] text-white py-3 px-8 rounded-sm font-medium text-[0.95rem] transition-all duration-200 ease-in-out text-center hover:border-accent2 hover:-translate-y-px hover:scale-[1.02] active:scale-[0.98]'
                  }
                >
                  Get Started →
                </Link>
              </div>
            </div>
          ))}
        </div>
        <p className="max-w-3xl mx-auto mt-10 text-center text-[0.88rem] text-muted leading-relaxed">
          {packagesNote}
        </p>
      </section>

      <section ref={faqRef} className="section-alt py-20 px-6 md:px-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-label mx-auto">FAQ</div>
            <h2 className="section-title mx-auto max-w-xl">
              Common questions about pricing.
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {packagesFaq.map((item, i) => (
              <div
                key={item.q}
                ref={(el) => (faqItemsRef.current[i] = el)}
                className="bg-bg border border-border rounded-lg p-5"
              >
                <div className="font-head font-bold text-[0.95rem] mb-2">
                  {item.q}
                </div>
                <div className="text-[0.85rem] text-muted leading-relaxed">
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-10 text-center">
        <h2 className="section-title mx-auto max-w-2xl">
          Still not sure which package fits?
        </h2>
        <p className="section-sub mx-auto mb-8">
          Tell us about your project and we'll recommend the right fit.
        </p>
        <Link to="/contact" className="btn-primary">
          Talk to Us
        </Link>
      </section>
    </>
  )
}
