import { processSteps } from '../data/content'

export default function Process() {
  return (
    <section className="section-alt py-24 px-10 md:py-16 md:px-5" id="process">
      <div className="section-label">How We Work</div>
      <h2 className="section-title">
        A clear process.<br />No surprises.
      </h2>

      <div className="mt-16 relative">
        <div className="absolute left-5.25 top-0 bottom-8 w-px bg-border" />
        {processSteps.map((step) => (
          <div className="flex gap-8 mb-12 relative" key={step.num}>
            <div className="w-11 h-11 rounded-full border border-border bg-surface2 flex items-center justify-center font-head text-[0.82rem] font-bold text-accent2 shrink-0 relative z-1">
              {step.num}
            </div>
            <div className="pt-[0.55rem]">
              <div className="font-head font-bold text-base mb-[0.4rem]">
                {step.title}
              </div>
              <div className="text-[0.88rem] text-muted leading-[1.7] max-w-120">
                {step.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

