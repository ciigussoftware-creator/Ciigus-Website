import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { variantGradient } from './Work'

export default function ProjectModal({ item, onClose }) {
  const overlayRef = useRef(null)
  const panelRef = useRef(null)

  useGSAP(
    () => {
      if (!item) return
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, scale: 0.92, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' }
      )
    },
    { scope: overlayRef, dependencies: [item] }
  )

  if (!item) return null

  return (
    <div
      ref={overlayRef}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-8"
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-surface border border-border rounded-lg shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
      >
        <button
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-bg/70 border border-border text-muted hover:text-text hover:border-text/40 transition-colors"
        >
          ✕
        </button>

        <div
          className={`h-40 sm:h-48 flex items-center justify-center text-[4rem] sm:text-[5rem] bg-linear-to-br ${
            variantGradient[item.variant] || variantGradient.blue
          }`}
        >
          {item.emoji}
        </div>

        <div className="p-6 sm:p-8">
          <div className="inline-block text-[0.7rem] uppercase tracking-[0.08em] text-accent2 bg-accent2/10 py-[0.2rem] px-[0.6rem] rounded-[4px] mb-3 font-medium">
            {item.tag}
          </div>

          <h3 className="font-head font-bold text-xl sm:text-2xl mb-3">{item.title}</h3>

          <p className="text-[0.9rem] sm:text-[0.95rem] text-muted leading-relaxed mb-6">{item.desc}</p>

          <div className="flex items-center gap-2 text-[0.8rem] text-muted mb-6">
            <div
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.status === 'done' ? 'bg-green' : 'bg-[#f59e0b]'}`}
            />
            {item.statusLabel}
          </div>

          {item.tech && item.tech.length > 0 && (
            <div className="pt-6 border-t border-border">
              <div className="text-[0.72rem] uppercase tracking-[0.08em] text-muted mb-3">Tech Stack</div>
              <div className="flex flex-wrap gap-2">
                {item.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[0.78rem] text-text bg-bg border border-border py-1 px-3 rounded-[4px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
