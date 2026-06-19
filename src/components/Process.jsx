import { processSteps } from '../data/content'
import './Process.css'

export default function Process() {
  return (
    <section className="section-alt" id="process">
      <div className="section-label">How We Work</div>
      <h2 className="section-title">
        A clear process.<br />No surprises.
      </h2>

      <div className="process-wrap">
        <div className="process-line" />
        {processSteps.map((step) => (
          <div className="process-step" key={step.num}>
            <div className="step-num">{step.num}</div>
            <div className="step-body">
              <div className="step-title">{step.title}</div>
              <div className="step-desc">{step.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
