import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { marqueeItems } from '../data/content'

export default function Marquee() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)

  // Duplicate the list so the scroll loops seamlessly
  const items = [...marqueeItems, ...marqueeItems]

  useGSAP(() => {
    // items are duplicated, so -50% of the track's own width is exactly
    // one full set — the loop point lines up seamlessly on repeat.
    gsap.to(trackRef.current, {
      xPercent: -50,
      duration: 30,
      ease: 'none',
      repeat: -1,
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="overflow-hidden bg-surface border-t border-b border-border py-4">
      <div ref={trackRef} className="flex gap-10 whitespace-nowrap w-max">
        {items.map((item, i) => (
          <span
            key={i}
            className="text-[0.8rem] font-medium text-muted tracking-[0.08em] uppercase"
          >
            <em className="text-accent2 not-italic pr-7">·</em>{item} 
          </span>
        ))}
      </div>
    </div>
  )
}
