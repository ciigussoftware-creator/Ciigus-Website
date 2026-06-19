import { services } from '../data/content'
import './Services.css'

export default function Services() {
  return (
    <section id="services">
      <div className="section-label">What We Do</div>
      <h2 className="section-title">
        Everything your business<br />needs, built right.
      </h2>
      <p className="section-sub">
        From a simple business website to a full-scale industry management
        system — we design, build, and support it all.
      </p>

      <div className="services-grid">
        {services.map((svc) => (
          <div className="service-card" key={svc.title}>
            <div className="svc-icon">{svc.icon}</div>
            <div className="svc-title">{svc.title}</div>
            <div className="svc-desc">{svc.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
