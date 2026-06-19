import { marqueeItems } from '../data/content'
import './Marquee.css'

export default function Marquee() {
  // Duplicate the list so the scroll loops seamlessly
  const items = [...marqueeItems, ...marqueeItems]

  return (
    <div className="marquee-wrap">
      <div className="marquee">
        {items.map((item, i) => (
          <span key={i}>
            {item} <em className="dot">·</em>
          </span>
        ))}
      </div>
    </div>
  )
}
