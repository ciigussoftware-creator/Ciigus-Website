import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { whatsappUrl } from '../lib/contact'
import WorkCover from './WorkCover'
import StatusBadge from './StatusBadge'

export default function ProjectModal({ item, onClose }) {
  const overlayRef = useRef(null)
  const panelRef = useRef(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  const isOpen = Boolean(item)

  // Callers pass an inline onClose, so read it from a ref; otherwise this would
  // re-run on every parent render and lose the element that opened the modal.
  useEffect(() => {
    if (!isOpen) return
    const opener = document.activeElement
    const panel = panelRef.current
    panel.focus({ preventScroll: true })

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCloseRef.current()
        return
      }
      if (e.key !== 'Tab') return
      const focusable = panel.querySelectorAll('a[href], button:not([disabled])')
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement
      if (e.shiftKey && (active === first || active === panel || !panel.contains(active))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (active === last || !panel.contains(active))) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      opener?.focus?.()
    }
  }, [isOpen])

  useGSAP(
    () => {
      if (!item) return
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
        gsap.fromTo(
          panelRef.current,
          { opacity: 0, scale: 0.92, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power3.out' }
        )
      })
      return () => mm.revert()
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
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="outline-none relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-surface border border-border rounded-lg shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
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
