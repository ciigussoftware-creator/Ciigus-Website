import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { workItems } from '../data/content'
import ProjectModal from './ProjectModal'

export const variantGradient = {
  blue: 'from-[#07182a] to-[#103a52]',
  green: 'from-[#0a1f14] to-[#154a31]',
  purple: 'from-[#0a1a28] to-[#1a3a4a]',
}

export default function Work() {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const directionRef = useRef('next')
  const touchStartXRef = useRef(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeItem, setActiveItem] = useState(null)

  useEffect(() => {
    if (!cardRef.current) return
    gsap.killTweensOf(cardRef.current)
    gsap.fromTo(
      cardRef.current,
      { x: directionRef.current === 'next' ? '100%' : '-100%' },
      { x: 0, duration: 0.35, ease: 'power2.out' }
    )
  }, [currentIndex])

  const goTo = (index, direction) => {
    if (index < 0 || index >= workItems.length || index === currentIndex) return
    directionRef.current = direction
    setCurrentIndex(index)
  }

  const handlePrev = () => goTo(currentIndex - 1, 'prev')
  const handleNext = () => goTo(currentIndex + 1, 'next')
  const handleNavClick = (i) => goTo(i, i > currentIndex ? 'next' : 'prev')

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e) => {
    const delta = e.changedTouches[0].clientX - touchStartXRef.current
    if (delta < -40) handleNext()
    else if (delta > 40) handlePrev()
  }

  const getCardStyle = (offset) => {
    if (offset === 0) return { transform: 'translateX(0) scale(1)', zIndex: 10, opacity: 1 }
    if (offset === 1) return { transform: 'translateX(8%) scale(0.96)', zIndex: 9, opacity: 0.7, pointerEvents: 'none' }
    if (offset === 2) return { transform: 'translateX(14%) scale(0.92)', zIndex: 8, opacity: 0.5, pointerEvents: 'none' }
    if (offset === -1) return { transform: 'translateX(-8%) scale(0.96)', zIndex: 9, opacity: 0.7, pointerEvents: 'none' }
    return { transform: 'translateX(0) scale(0.9)', zIndex: 0, opacity: 0, pointerEvents: 'none' }
  }

  return (
    <section id="work" className="relative overflow-hidden min-h-screen md:h-screen" ref={sectionRef}>
      <div className="relative min-h-screen md:h-screen w-full flex flex-col px-4 md:px-10 pt-6 md:pt-10 pb-6 md:pb-8 overflow-hidden">
        {/* mobile: compact header, small fixed gap above the card */}
        <div className="md:hidden shrink-0 max-w-xl text-left mb-3">
          <div data-work-header className="section-label !text-[0.72rem] !mb-2">Recent Work</div>
          <h2 data-work-header className="section-title !text-[clamp(1.5rem,5vw,2rem)] !mb-1.5">
            Products we've built<br />and are building.
          </h2>
          <p data-work-header className="section-sub !max-w-none text-[0.78rem]">
            From live client projects to industry-changing platforms currently in
            development.
          </p>
        </div>

        {/* desktop: header stays above the card */}
        <div className="hidden md:block shrink-0 max-w-xl text-left mb-3">
          <div data-work-header className="section-label !text-[0.68rem] !mb-2">Recent Work</div>
          <h2 data-work-header className="section-title !text-[clamp(1.6rem,2.8vw,2.4rem)] !mb-2">
            Products we've built<br />and are building.
          </h2>
          <p data-work-header className="section-sub !max-w-none text-[0.78rem]">
            From live client projects to industry-changing platforms currently in
            development.
          </p>
        </div>

        <div className="flex-1 min-h-0 w-full flex flex-col items-center justify-center gap-4">
          <div className="w-full max-w-[900px] flex flex-col items-center gap-6 px-4 md:px-0">
            <div className="flex items-center justify-center w-full mt-6">
              <div
                className="relative w-[calc(100%-2rem)] md:w-full max-w-[860px] mx-4 md:mx-0 h-[360px] sm:h-[400px] md:h-[440px]"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {workItems.map((cardItem, i) => {
                const offset = i - currentIndex
                return (
                  <div
                    key={i}
                    ref={(el) => {
                      if (i === currentIndex) cardRef.current = el
                    }}
                    style={getCardStyle(offset)}
                    className={`absolute inset-0 bg-surface border border-border rounded-lg overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] flex flex-col ${
                      offset === 0 ? '' : 'transition-[transform,opacity] duration-300'
                    }`}
                  >
                    <div
                      className={`h-44 sm:h-48 md:h-52 flex items-center justify-center text-[4rem] sm:text-[5rem] md:text-[6rem] shrink-0 bg-linear-to-br ${
                        variantGradient[cardItem.variant] || variantGradient.blue
                      }`}
                    >
                      {cardItem.emoji}
                    </div>
                    <div className="p-3 sm:p-3 md:p-5 flex flex-col h-full">
                      <div className="font-head font-bold text-base sm:text-lg md:text-2xl mb-1.5 sm:mb-2 md:mb-3 shrink-0">
                        {cardItem.title}
                      </div>
                      <div className="text-[0.75rem] sm:text-[0.82rem] md:text-[0.92rem] text-muted leading-relaxed overflow-hidden line-clamp-2 md:line-clamp-3">
                        {cardItem.desc}
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mt-auto pt-3 sm:pt-4 md:pt-6 border-t border-border shrink-0">
                        <div className="flex items-center gap-2 text-[0.68rem] sm:text-[0.75rem] md:text-[0.78rem] text-muted">
                          <div
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                              cardItem.status === 'done' ? 'bg-green' : 'bg-[#f59e0b]'
                            }`}
                          />
                          {cardItem.statusLabel}
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveItem(cardItem)}
                          className="text-accent2 font-medium text-[0.78rem] sm:text-[0.85rem] md:text-[0.9rem] hover:translate-x-1 transition-transform duration-200 inline-block cursor-pointer"
                        >
                          View Project 
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}

                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-25 z-20 text-4xl text-muted hover:text-accent2 transition-colors duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
                  aria-label="Previous project"
                >
                  ‹
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentIndex === workItems.length - 1}
                  className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-25 z-20 text-4xl text-muted hover:text-accent2 transition-colors duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
                  aria-label="Next project"
                >
                  ›
                </button>
              </div>
            </div>

            <div className="text-muted text-sm">
              {String(currentIndex + 1).padStart(2, '0')} / {String(workItems.length).padStart(2, '0')}
            </div>
          </div>

          <div className="flex md:hidden items-center justify-center gap-2 shrink-0">
            {workItems.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleNavClick(i)}
                aria-label={`Go to project ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'w-6 bg-accent2' : 'w-2 bg-border'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <ProjectModal item={activeItem} onClose={() => setActiveItem(null)} />
    </section>
  )
}
