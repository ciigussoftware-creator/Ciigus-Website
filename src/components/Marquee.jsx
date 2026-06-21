import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { marqueeItems } from '../data/content'

gsap.registerPlugin(useGSAP)

export default function Marquee() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)

  // Duplicate the list so the scroll loops seamlessly
  const items = [...marqueeItems, ...marqueeItems]

  useGSAP(() => {
    const track = trackRef.current
    // Measure half the track (one full set of items)
    const halfWidth = track.scrollWidth / 2

    gsap.to(track, {
      x: -halfWidth,
      duration: 30,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % halfWidth),
      },
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
