import { roles, values } from '../data/content'

export default function About() {
  return (
    <section className="section-alt py-24 px-10 md:py-16 md:px-5" id="about">
      <div className="section-label">About Ciigus</div>
      <h2 className="section-title">
        Small team.<br />Big ambitions.
      </h2>
      <p className="section-sub">
        We're a team of developers, QA engineers, business analysts, and project
        managers - many of us fresh graduates - building professional-grade
        software and growing together toward a shared vision.
      </p>

      <div className="flex flex-wrap gap-[0.6rem] mt-8 mb-12">
        {roles.map((role) => (
          <div
            className="bg-faint border border-border rounded-full py-[0.35rem] px-4 text-[0.82rem] text-muted"
            key={role}
          >
            {role}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
        {values.map((val) => (
          <div
            className="bg-bg border border-border rounded-md p-6 transition-colors duration-200 ease-in-out hover:border-accent/35"
            key={val.title}
          >
            <div className="text-[1.4rem] mb-4">{val.icon}</div>
            <div className="font-head font-bold text-[0.95rem] mb-[0.4rem]">
              {val.title}
            </div>
            <div className="text-[0.83rem] text-muted leading-relaxed">
              {val.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

