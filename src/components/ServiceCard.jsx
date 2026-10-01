import { Link } from 'react-router-dom'
import { servicesPage, workCategorySlugs } from '../data/content'

// The photo only fills the top of the card and fades to solid navy before
// the text can start (number + spacer), so text contrast never depends on the image.
const sizes = {
  featured: {
    minH: 'min-h-[36rem]',
    imageH: 'h-[26rem]',
    spacer: 'min-h-[9rem]',
    fade: 'linear-gradient(180deg, rgba(10,15,30,0.15) 0px, rgba(10,15,30,0.55) 150px, rgba(10,15,30,0.94) 250px, #0a0f1e 100%)',
    number: 'text-[5.5rem] md:text-[7.5rem]',
    title: 'text-2xl md:text-[2rem]',
    desc: 'text-[0.95rem] md:text-base max-w-xl',
  },
  regular: {
    minH: 'min-h-[28rem]',
    imageH: 'h-[19rem]',
    spacer: 'min-h-[6rem]',
    fade: 'linear-gradient(180deg, rgba(10,15,30,0.15) 0px, rgba(10,15,30,0.6) 110px, rgba(10,15,30,0.94) 180px, #0a0f1e 100%)',
    number: 'text-[4.5rem]',
    title: 'text-xl',
    desc: 'text-[0.9rem]',
  },
}

// Services without delivered projects (no workCategory/projectsLink) only get "Ask about this".
function projectsLinkFor(service) {
  if (service.projectsLink) return service.projectsLink
  if (service.workCategory) return `/work?category=${workCategorySlugs[service.workCategory]}`
  return null
}

const askLinkFor = (service) => `/contact?service=${encodeURIComponent(service.title)}`

export default function ServiceCard({ service, number }) {
  const size = sizes[service.featured ? 'featured' : 'regular']
  const projectsLink = projectsLinkFor(service)
  const { builtFor, seeProjects, askAbout, highlightLabel } = servicesPage.card

  return (
    <div
      className={`group h-full rounded-2xl transition-[transform,box-shadow] duration-500 ease-out motion-safe:hover:-translate-y-1.5 motion-safe:focus-within:-translate-y-1.5 hover:shadow-[0_28px_60px_-28px_rgba(0,186,156,0.7)] focus-within:shadow-[0_28px_60px_-28px_rgba(0,186,156,0.7)] ${
        service.highlight ? 'p-[1.5px] bg-linear-to-br from-green via-accent2 to-accent' : ''
      }`}
    >
      <article
        className={`relative isolate flex h-full flex-col overflow-hidden bg-[#0a0f1e] ${size.minH} ${
          service.highlight
            ? 'rounded-[calc(1rem-1.5px)]'
            : 'rounded-2xl border border-white/10 transition-colors duration-500 group-hover:border-accent2/70 group-focus-within:border-accent2/70'
        }`}
      >
        {service.image && (
          <div aria-hidden="true" className={`absolute inset-x-0 top-0 -z-10 overflow-hidden ${size.imageH}`}>
            <img
              src={service.image}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-80 transition-transform duration-[1200ms] ease-out motion-safe:group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0" style={{ background: size.fade }} />
          </div>
        )}
        {service.highlight && (
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 -z-10 h-72 w-72 rounded-full opacity-40 blur-3xl"
            style={{ background: 'radial-gradient(circle, #d5e73c 0%, transparent 65%)' }}
          />
        )}

        <span
          aria-hidden="true"
          className={`block px-6 pt-5 font-head font-bold leading-none tracking-[-0.04em] number-outline select-none md:px-8 ${size.number}`}
        >
          {number}
        </span>
        <div className={`flex-1 ${size.spacer}`} />

        <div className="relative px-6 pb-6 md:px-8 md:pb-8">
          {service.highlight && (
            <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-green">
              {highlightLabel}
            </p>
          )}
          <h3 className={`font-head font-bold leading-tight tracking-[-0.01em] text-white ${size.title}`}>
            {service.title}
          </h3>
          <p className={`mt-3 leading-relaxed text-[#c8d1e0] ${size.desc}`}>{service.desc}</p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${service.title} includes`}>
            {service.features.map((feature) => (
              <li
                key={feature}
                className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[0.75rem] text-white/90 backdrop-blur-sm"
              >
                {feature}
              </li>
            ))}
          </ul>

          {service.proof && (
            <p className="mt-5 text-[0.8rem] leading-relaxed text-[#a8b3cc]">
              <span className="font-semibold text-white">{builtFor}: </span>
              {service.proof}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-5 text-[0.85rem] font-semibold">
            {projectsLink && (
              <Link
                to={projectsLink}
                aria-label={`${seeProjects}: ${service.title}`}
                className="text-accent2 transition-colors hover:text-green"
              >
                {seeProjects} →
              </Link>
            )}
            <Link
              to={askLinkFor(service)}
              aria-label={`${askAbout}: ${service.title}`}
              className="text-white/90 transition-colors hover:text-white"
            >
              {askAbout} →
            </Link>
          </div>
        </div>
      </article>
    </div>
  )
}
