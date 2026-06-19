import { stats } from '../data/content'

export default function Hero() {
  return (
    <section
      className="min-h-screen flex flex-col justify-center pt-32 pb-16 px-10 md:pt-28 md:pb-12 md:px-[1.2rem] relative overflow-hidden"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 60% 50% at 70% 30%, rgba(30, 155, 215, 0.10) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 25% 60%, rgba(54, 201, 138, 0.08) 0%, transparent 70%)',
      }}
      id="home"
    >
      <div className="inline-flex items-center gap-2 bg-accent2/10 border border-accent2/25 rounded-full py-[0.35rem] px-4 text-[0.8rem] text-green mb-[1.8rem] w-fit">
        <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse-slow" />
        🇱🇰 Based in Sri Lanka · Building Globally
      </div>

      <h1 className="font-head text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.08] tracking-[-2px] md:tracking-[-1px] max-w-205 mb-6">
        We build software<br />
        that moves <span className="bg-linear-to-br from-green to-accent bg-clip-text text-transparent">businesses</span><br />
        forward.
      </h1>

      <p className="text-[1.1rem] text-muted max-w-130 mb-10 font-light leading-[1.7]">
        Ciigus develops modern digital products - from restaurant systems to
        enterprise management platforms - for businesses ready to grow.
      </p>

      <div className="flex gap-4 flex-wrap max-[480px]:flex-col">
        <a className="btn-primary" href="#contact">Start a Project</a>
        <a className="btn-outline" href="#work">See Our Work</a>
      </div>

      <div className="flex gap-12 md:gap-8 max-[480px]:flex-wrap max-[480px]:gap-6 mt-16 pt-8 border-t border-border">
        {stats.map((s) => (
          <div key={s.lbl}>
            <div className="font-head text-3xl font-bold text-text">{s.val}</div>
            <div className="text-[0.82rem] text-muted mt-0.5">{s.lbl}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

