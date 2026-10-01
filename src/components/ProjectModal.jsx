import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { whatsappUrl } from '../lib/contact'
import WorkCover from './WorkCover'
import StatusBadge from './StatusBadge'

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
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-8"
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface border border-border rounded-lg shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
      >
        <button
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-bg/70 border border-border text-muted hover:text-text hover:border-text/40 transition-colors"
        >
          ✕
        </button>

        <div className={item.image ? '' : 'aspect-video overflow-hidden'}>
          <WorkCover item={item} size="md" natural />
        </div>

        <div className="p-6 sm:p-8">
          <div className={`inline-block text-[0.7rem] uppercase tracking-[0.08em] text-accent2 bg-accent2/10 py-[0.2rem] px-[0.6rem] rounded-[4px] mb-3 font-medium ${item.image ? '' : 'sr-only'}`}>
            {item.category}
          </div>

          <h3 className={`font-head font-bold text-xl sm:text-2xl mb-3 ${item.image ? '' : 'sr-only'}`}>{item.title}</h3>

          <p className="text-[0.9rem] sm:text-[0.95rem] text-muted leading-relaxed mb-5">{item.desc}</p>

          <div className="mb-6">
            <StatusBadge status={item.status} />
          </div>

          {item.tech?.length > 0 && (
            <div className="pt-6 mb-6 border-t border-border">
              <div className="text-[0.72rem] uppercase tracking-[0.08em] text-muted mb-3">Tech Stack</div>
              <ul className="flex flex-wrap gap-2">
                {item.tech.map((t) => (
                  <li
                    key={t}
                    className="text-[0.78rem] text-text bg-bg border border-border py-1 px-3 rounded-[4px]"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(item.link || item.cta) && (
            <div className="flex flex-col sm:flex-row gap-3">
              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1">
                  Visit Live Site ↗
                </a>
              )}
              {item.cta && (
                <a
                  href={whatsappUrl(item.cta.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${item.link ? 'btn-outline' : 'btn-primary'} flex-1`}
                >
                  {item.cta.label}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
