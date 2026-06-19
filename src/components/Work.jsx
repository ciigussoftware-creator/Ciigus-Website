import { workItems } from '../data/content'

export default function Work() {
  return (
    <section id="work" className="py-24 px-10 md:py-16 md:px-5">
      <div className="section-label">Recent Work</div>
      <h2 className="section-title">
        Products we've built<br />and are building.
      </h2>
      <p className="section-sub">
        From live client projects to industry-changing platforms currently in
        development.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 mt-16">
        {workItems.map((item, i) => (
          <div
            className="bg-surface border border-border rounded-lg overflow-hidden transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-accent2/40"
            key={i}
          >
            <div
              className={`h-45 flex items-center justify-center text-[3rem] ${
                item.variant === 'blue'
                  ? 'bg-linear-to-br from-[#07182a] to-[#103a52]'
                  : item.variant === 'green'
                  ? 'bg-linear-to-br from-[#0a1f14] to-[#154a31]'
                  : 'bg-linear-to-br from-[#0a1a28] to-[#1a3a4a]'
              }`}
            >
              {item.emoji}
            </div>
            <div className="p-6">
              <div className="inline-block text-[0.72rem] uppercase tracking-[0.08em] text-accent2 bg-accent2/10 py-[0.2rem] px-[0.7rem] rounded-[4px] mb-[0.8rem] font-medium">
                {item.tag}
              </div>
              <div className="font-head font-bold text-base mb-[0.4rem]">
                {item.title}
              </div>
              <div className="text-[0.85rem] text-muted leading-relaxed">
                {item.desc}
              </div>
              <div className="flex items-center gap-2 mt-4 text-[0.78rem] text-muted">
                <div
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    item.status === 'done'
                      ? 'bg-green'
                      : 'bg-[#f59e0b] animate-pulse-fast'
                  }`}
                />
                {item.statusLabel}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

