import { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { navItems, notFound } from '../data/content'

export default function NotFoundPage() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    gsap.from('[data-notfound]', {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center pt-36 pb-24 px-6 md:px-10 text-center"
    >
      <div
        data-notfound
        className="font-head font-extrabold leading-none tracking-[-4px] text-[clamp(6rem,22vw,11rem)] mb-2 bg-clip-text text-transparent animate-gradient-wave"
        style={{
          backgroundImage: 'linear-gradient(90deg, #d5e73c, #00ba9c, #0095fc, #00ba9c, #d5e73c)',
          backgroundSize: '300% 100%',
        }}
        aria-hidden="true"
      >
        404
      </div>

      <div data-notfound className="section-label mx-auto">{notFound.label}</div>
      <h1 data-notfound className="section-title mx-auto max-w-3xl">
        {notFound.title}
      </h1>
      <p data-notfound className="section-sub mx-auto">
        {notFound.desc}
      </p>

      <div data-notfound className="flex flex-wrap justify-center gap-[0.6rem] mt-8">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="bg-faint border border-border rounded-full py-[0.35rem] px-4 text-[0.82rem] text-muted transition-all duration-200 ease-in-out hover:border-accent2/50 hover:text-text hover:-translate-y-0.5"
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div data-notfound className="flex flex-wrap items-center justify-center gap-4 mt-10">
        <Link to={notFound.primaryCta.to} className="btn-primary">
          {notFound.primaryCta.label}
        </Link>
        <Link to={notFound.secondaryCta.to} className="btn-outline">
          {notFound.secondaryCta.label}
        </Link>
      </div>
    </section>
  )
}
