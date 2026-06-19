import { marqueeItems } from '../data/content'

export default function Marquee() {
  // Duplicate the list so the scroll loops seamlessly
  const items = [...marqueeItems, ...marqueeItems]

  return (
    <div className="overflow-hidden bg-surface border-t border-b border-border py-4">
      <div className="flex gap-10 animate-scroll whitespace-nowrap w-max">
        {items.map((item, i) => (
          <span
            key={i}
            className="text-[0.8rem] font-medium text-muted tracking-[0.08em] uppercase"
          >
            {item} <em className="text-accent2 not-italic">·</em>
          </span>
        ))}
      </div>
    </div>
  )
}

