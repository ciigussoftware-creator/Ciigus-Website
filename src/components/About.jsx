import { roles, values } from '../data/content'
import './About.css'

export default function About() {
  return (
    <section className="section-alt" id="about">
      <div className="section-label">About Ciigus</div>
      <h2 className="section-title">
        Small team.<br />Big ambitions.
      </h2>
      <p className="section-sub">
        We're a team of developers, QA engineers, business analysts, and project
        managers — many of us fresh graduates — building professional-grade
        software and growing together toward a shared vision.
      </p>

      <div className="roles-wrap">
        {roles.map((role) => (
          <div className="role-pill" key={role}>{role}</div>
        ))}
      </div>

      <div className="values-grid">
        {values.map((val) => (
          <div className="val-card" key={val.title}>
            <div className="val-icon">{val.icon}</div>
            <div className="val-title">{val.title}</div>
            <div className="val-desc">{val.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
