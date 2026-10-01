import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { floatingWhatsApp } from '../data/content'
import { whatsappUrl } from '../lib/contact'
import BrandIcon from './BrandIcon'

export default function FloatingWhatsApp() {
  const wrapperRef = useRef(null)

  // GSAP animates the wrapper only: the link's CSS hover transition would
  // otherwise corrupt the tween's recorded end values (see Hero CTA fix).
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(wrapperRef.current, {
        scale: 0.4,
        opacity: 0,
        duration: 0.5,
        delay: 1.6,
        ease: 'back.out(1.7)',
      })
    })
    return () => mm.revert()
  }, { scope: wrapperRef })

  return (
    <div
      ref={wrapperRef}
      className="fixed z-40 right-4 bottom-4 md:right-6 md:bottom-6"
      style={{ marginRight: 'env(safe-area-inset-right)', marginBottom: 'env(safe-area-inset-bottom)' }}
    >
      <a
        href={whatsappUrl(floatingWhatsApp.message)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={floatingWhatsApp.label}
        title={floatingWhatsApp.tooltip}
        className="flex items-center justify-center w-13 h-13 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_-6px_rgba(0,0,0,0.4)] transition-[transform,box-shadow] duration-200 ease-out hover:shadow-[0_10px_28px_-6px_rgba(37,211,102,0.6)] motion-safe:hover:scale-110 motion-safe:active:scale-95 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#25D366]"
      >
        <BrandIcon name="whatsapp" className="w-7 h-7 md:w-8 md:h-8" />
      </a>
    </div>
  )
}
