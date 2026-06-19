import { services } from '../data/content'

export default function Services() {
  return (
    <section id="services" className="py-24 px-10 md:py-16 md:px-5">
      <div className="section-label">What We Do</div>
      <h2 className="section-title">
        Everything your business<br />needs, built right.
      </h2>
      <p className="section-sub">
        From a simple business website to a full-scale industry management
        system — we design, build, and support it all.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[1.5px] bg-border mt-16 border border-border">
        {services.map((svc) => (
          <div
            className="bg-bg py-10 px-8 transition-colors duration-200 ease-in-out relative overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-linear-to-br after:from-green after:to-accent after:scale-x-0 after:origin-left after:transition-transform after:duration-300 after:ease-out hover:bg-surface hover:after:scale-x-100"
            key={svc.title}
          >
            <div className="w-11 h-11 rounded-md bg-accent2/10 border border-accent2/20 flex items-center justify-center mb-6 text-[1.2rem]">
              {svc.icon}
            </div>
            <div className="font-head font-bold text-[1.05rem] mb-[0.6rem]">
              {svc.title}
            </div>
            <div className="text-[0.88rem] text-muted leading-[1.7]">
              {svc.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

