import { workItems } from '../data/content'
import './Work.css'

export default function Work() {
  return (
    <section id="work">
      <div className="section-label">Recent Work</div>
      <h2 className="section-title">
        Products we've built<br />and are building.
      </h2>
      <p className="section-sub">
        From live client projects to industry-changing platforms currently in
        development.
      </p>

      <div className="work-grid">
        {workItems.map((item, i) => (
          <div className="work-card" key={i}>
            <div className={`work-img work-img--${item.variant}`}>
              {item.emoji}
            </div>
            <div className="work-body">
              <div className="work-tag">{item.tag}</div>
              <div className="work-title">{item.title}</div>
              <div className="work-desc">{item.desc}</div>
              <div className="work-status">
                <div className={`status-dot status-dot--${item.status}`} />
                {item.statusLabel}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
