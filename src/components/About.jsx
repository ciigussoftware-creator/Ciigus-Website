import { roles, values } from '../data/content'
import FadeUp from './FadeUp'

export default function About() {
  return (
    <section className="section-alt py-24 px-10 md:py-16 md:px-5" id="about">
      <FadeUp>
        <div className="section-label">About Ciigus</div>
        <h2 className="section-title">
          Small team.<br />Big ambitions.
        </h2>
        <p className="section-sub">
          We're a team of developers, QA engineers, business analysts, and project
          managers - many of us fresh graduates - building professional-grade
          software and growing together toward a shared vision.
        </p>
      </FadeUp>

      <FadeUp delay={0.15} className="flex flex-wrap gap-[0.6rem] mt-8 mb-12">
        {roles.map((role) => (
          <div
            className="bg-faint border border-border rounded-full py-[0.35rem] px-4 text-[0.82rem] text-muted transition-all duration-200 ease-in-out hover:border-accent2/50 hover:text-text hover:-translate-y-0.5"
            key={role}
          >
            {role}
          </div>
        ))}
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
        {values.map((val, i) => (
          <FadeUp
            key={val.title}
            delay={i * 0.1}
            className="group bg-bg border border-border rounded-md p-6 transition-all duration-200 ease-in-out hover:border-accent/35 hover:-translate-y-1"
          >
            <div className="text-[1.4rem] mb-4 transition-transform duration-200 ease-in-out group-hover:scale-110">
              {val.icon}
            </div>
            <div className="font-head font-bold text-[0.95rem] mb-[0.4rem]">
              {val.title}
            </div>
            <div className="text-[0.83rem] text-muted leading-relaxed">
              {val.desc}
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}

