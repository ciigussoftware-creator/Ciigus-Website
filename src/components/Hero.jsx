import { stats } from '../data/content'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-tag">
        <span className="tag-dot" />
        🇱🇰 Based in Sri Lanka · Building Globally
      </div>

      <h1>
        We build software<br />
        that moves <span className="hl">businesses</span><br />
        forward.
      </h1>

      <p className="hero-sub">
        Ciigus develops modern digital products — from restaurant systems to
        enterprise management platforms — for businesses ready to grow.
      </p>

      <div className="hero-actions">
        <a className="btn-primary" href="#contact">Start a Project</a>
        <a className="btn-outline" href="#work">See Our Work</a>
      </div>

      <div className="hero-stats">
        {stats.map((s) => (
          <div className="stat" key={s.lbl}>
            <div className="stat-val">{s.val}</div>
            <div className="stat-lbl">{s.lbl}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
