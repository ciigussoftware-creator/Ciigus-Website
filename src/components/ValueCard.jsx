import { useRef } from 'react'
import gsap from 'gsap'

export default function ValueCard({ icon, title, desc, accentColor, cardRef }) {
  const tiltRef = useRef(null)
  const iconRef = useRef(null)
  const glowRef = useRef(null)

  const handleMouseMove = (e) => {
    const el = tiltRef.current
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height

    gsap.to(el, {
      rotateY: (px - 0.5) * 12,
      rotateX: -(py - 0.5) * 12,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: true,
    })
  }

  const handleMouseEnter = () => {
    gsap.to(iconRef.current, {
      scale: 1.2,
      duration: 0.5,
      ease: 'back.out(1.7)',
      overwrite: true,
    })
    gsap.to(glowRef.current, {
      opacity: 0.4,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: true,
    })
  }

  const handleMouseLeave = () => {
    gsap.to(tiltRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: true,
    })
    gsap.to(iconRef.current, {
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: true,
    })
    gsap.to(glowRef.current, {
      opacity: 0.15,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: true,
    })
  }

  return (
    <div ref={cardRef} className="group relative rounded-md p-px bg-border h-full" style={{ perspective: '800px' }}>
      <div
        className="absolute inset-0 rounded-md opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, var(--color-green), var(--color-accent))' }}
      />

      <div
        ref={tiltRef}
        className="relative bg-bg rounded-md p-6 h-full overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-md"
          style={{ background: accentColor }}
        />

        <div className="relative w-fit mb-4">
          <div
            ref={glowRef}
            className="absolute -inset-2.5 rounded-full blur-md pointer-events-none"
            style={{ background: `radial-gradient(circle, ${accentColor}, transparent 70%)`, opacity: 0.15 }}
          />
          <div ref={iconRef} className="relative text-[1.4rem]">
            {icon}
          </div>
        </div>

        <div className="font-head font-bold text-[0.95rem] mb-[0.4rem]">
          {title}
        </div>
        <div className="text-[0.83rem] text-muted leading-relaxed">
          {desc}
        </div>
      </div>
    </div>
  )
}
