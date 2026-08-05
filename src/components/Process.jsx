import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { journeySteps } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

const SVG_WIDTH = 440
const SVG_HEIGHT = 1180
const NODE_RADIUS = 10
const CARD_GAP = 20
const CARD_WIDTH = 130
const MIN_X = 10
const MAX_X = 420

// Given 6 curves (7 waypoints) extended with one more segment so all 8
// journeySteps get a node — the map pin moves to the new final waypoint.
const PATH_D =
  'M 280,40 ' +
  'C 320,100 360,140 200,200 ' +
  'C 80,240 60,300 160,360 ' +
  'C 260,420 380,440 360,520 ' +
  'C 340,580 140,620 120,680 ' +
  'C 100,740 260,800 280,860 ' +
  'C 300,900 320,940 280,980 ' +
  'C 260,1020 220,1080 180,1140'

const PIN_PATH =
  'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z'

const RAW_POSITIONS = [
  { x: 280, y: 40 },
  { x: 200, y: 200 },
  { x: 160, y: 360 },
  { x: 360, y: 520 },
  { x: 120, y: 680 },
  { x: 280, y: 860 },
  { x: 280, y: 980 },
  { x: 180, y: 1140 },
]

const NODE_POSITIONS = RAW_POSITIONS.map((pt, i) => ({
  ...pt,
  isLeft: pt.x < 250,
  isPin: i === RAW_POSITIONS.length - 1,
}))

// Narrow winding road for mobile screens, confined to x: 40–260.
const MOBILE_SVG_WIDTH = 280
const MOBILE_SVG_HEIGHT = 700
const MOBILE_NODE_RADIUS = 7
const MOBILE_CARD_GAP = 10
const MOBILE_CARD_WIDTH = 96
const MOBILE_MIN_X = 10
const MOBILE_MAX_X = 270

const MOBILE_PATH_D =
  'M 140,36 ' +
  'C 205,61 224,99 187,136 ' +
  'C 149,174 56,186 56,236 ' +
  'C 56,286 205,298 205,348 ' +
  'C 205,398 56,410 56,460 ' +
  'C 56,524 168,556 168,620 ' +
  'C 168,660 140,680 140,700'

// 7 waypoints from the path above, plus one extra node (midpoint of the
// longest segment) so all 8 journeySteps get a node — the pin stays on
// the path's final waypoint. Gaps kept at a minimum of 80 svg-units.
const MOBILE_RAW_POSITIONS = [
  { x: 140, y: 36 },
  { x: 187, y: 136 },
  { x: 56, y: 236 },
  { x: 205, y: 348 },
  { x: 56, y: 460 },
  { x: 112, y: 540 },
  { x: 168, y: 620 },
  { x: 140, y: 700 },
]

const MOBILE_NODE_POSITIONS = MOBILE_RAW_POSITIONS.map((pt, i) => ({
  ...pt,
  isLeft: i % 2 === 0,
  isPin: i === MOBILE_RAW_POSITIONS.length - 1,
}))

export default function Process() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const roadRef = useRef(null)
  const progressPathRef = useRef(null)
  const nodesRef = useRef([])
  const cardsRef = useRef([])
  const mobileRoadRef = useRef(null)
  const mobileProgressPathRef = useRef(null)
  const mobileNodesRef = useRef([])
  const mobileCardsRef = useRef([])

  useGSAP(() => {
    gsap.from(headerRef.current.children, {
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    const length = progressPathRef.current.getTotalLength()
    gsap.set(progressPathRef.current, {
      strokeDasharray: length,
      strokeDashoffset: length,
    })

    gsap.to(progressPathRef.current, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: roadRef.current,
        start: 'top 80%',
        end: 'bottom bottom',
        scrub: 1,
      },
    })

    const mobileLength = mobileProgressPathRef.current.getTotalLength()
    gsap.set(mobileProgressPathRef.current, {
      strokeDasharray: mobileLength,
      strokeDashoffset: mobileLength,
    })

    gsap.to(mobileProgressPathRef.current, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: mobileRoadRef.current,
        start: 'top 80%',
        end: 'bottom bottom',
        scrub: 1,
      },
    })

    NODE_POSITIONS.forEach((pt, i) => {
      const node = nodesRef.current[i]
      const card = cardsRef.current[i]

      gsap.set(card, { opacity: 0, x: pt.isLeft ? -40 : 40 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: node,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      })

      tl.to(node, {
        scale: 1.3,
        filter: 'drop-shadow(0 0 8px var(--color-green))',
        transformOrigin: '50% 50%',
        duration: 0.4,
        ease: 'power2.out',
      }, 0)
      tl.to(card, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: 'power3.out',
      }, 0)
    })

    MOBILE_NODE_POSITIONS.forEach((pt, i) => {
      const node = mobileNodesRef.current[i]
      const card = mobileCardsRef.current[i]

      gsap.set(card, { opacity: 0, x: pt.isLeft ? -40 : 40 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: node,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      })

      tl.to(node, {
        scale: 1.3,
        filter: 'drop-shadow(0 0 8px var(--color-green))',
        transformOrigin: '50% 50%',
        duration: 0.4,
        ease: 'power2.out',
      }, 0)
      tl.to(card, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: 'power3.out',
      }, 0)
    })
  }, { scope: sectionRef })

  return (
    <section
      className="section-alt py-8 md:py-24 px-6"
      id="process"
      ref={sectionRef}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
        {/* Left: hand-drawn road map */}
        <div className="relative z-0">
          {/* Desktop SVG */}
          <div
            ref={roadRef}
            className="hidden md:block relative"
            style={{ minHeight: SVG_HEIGHT }}
          >
            <svg
              width="100%"
              viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
              className="block"
            >
              <path
                d={PATH_D}
                fill="none"
                stroke="#1a2a1a"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                ref={progressPathRef}
                d={PATH_D}
                fill="none"
                stroke="var(--color-green)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {NODE_POSITIONS.map((pt, i) => (
                <g key={journeySteps[i].id} ref={(el) => (nodesRef.current[i] = el)}>
                  {pt.isPin ? (
                    <g transform={`translate(${pt.x - 12}, ${pt.y - 22})`}>
                      <path d={PIN_PATH} fill="var(--color-green)" />
                      <circle cx={12} cy={9} r={2.5} fill="var(--color-surface)" />
                    </g>
                  ) : (
                    <>
                      <circle cx={pt.x} cy={pt.y} r={NODE_RADIUS} fill="var(--color-green)" />
                      <circle cx={pt.x} cy={pt.y} r={4} fill="#fff" />
                    </>
                  )}
                </g>
              ))}
            </svg>

            {NODE_POSITIONS.map((pt, i) => {
              const step = journeySteps[i]
              const topPct = (pt.y / SVG_HEIGHT) * 100
              const widthPct = (CARD_WIDTH / SVG_WIDTH) * 100

              // Anchor the card next to its node, then clamp so the box
              // (offset + width) never crosses the 10–420 svg-unit bounds.
              const cardStyle = pt.isLeft
                ? {
                    right: `${((SVG_WIDTH - Math.max(pt.x - CARD_GAP, MIN_X + CARD_WIDTH)) / SVG_WIDTH) * 100}%`,
                    top: `${topPct}%`,
                    width: `${widthPct}%`,
                  }
                : {
                    left: `${(Math.min(pt.x + CARD_GAP, MAX_X - CARD_WIDTH) / SVG_WIDTH) * 100}%`,
                    top: `${topPct}%`,
                    width: `${widthPct}%`,
                  }

              return (
                <div key={step.id}>
                  <div
                    ref={(el) => (cardsRef.current[i] = el)}
                    className="absolute -translate-y-1/2 text-sm bg-surface border border-green/30 rounded-xl p-3"
                    style={cardStyle}
                  >
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-0 h-0"
                      style={
                        pt.isLeft
                          ? {
                              right: '-8px',
                              borderTop: '6px solid transparent',
                              borderBottom: '6px solid transparent',
                              borderLeft: '8px solid var(--color-surface)',
                            }
                          : {
                              left: '-8px',
                              borderTop: '6px solid transparent',
                              borderBottom: '6px solid transparent',
                              borderRight: '8px solid var(--color-surface)',
                            }
                      }
                    />
                    <div className="text-xl mb-1">{step.emoji}</div>
                    <div className="font-head font-bold mb-0.5">{step.title}</div>
                    <div className="text-muted text-xs leading-relaxed">{step.desc}</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Mobile SVG */}
          <div
            ref={mobileRoadRef}
            className="block md:hidden relative"
          >
            <svg
              width="100%"
              viewBox={`0 0 ${MOBILE_SVG_WIDTH} ${MOBILE_SVG_HEIGHT}`}
              className="block"
            >
              <path
                d={MOBILE_PATH_D}
                fill="none"
                stroke="#1a2a1a"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                ref={mobileProgressPathRef}
                d={MOBILE_PATH_D}
                fill="none"
                stroke="var(--color-green)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {MOBILE_NODE_POSITIONS.map((pt, i) => (
                <g key={journeySteps[i].id} ref={(el) => (mobileNodesRef.current[i] = el)}>
                  {pt.isPin ? (
                    <g transform={`translate(${pt.x - 12}, ${pt.y - 22})`}>
                      <path d={PIN_PATH} fill="var(--color-green)" />
                      <circle cx={12} cy={9} r={2.5} fill="var(--color-surface)" />
                    </g>
                  ) : (
                    <>
                      <circle cx={pt.x} cy={pt.y} r={MOBILE_NODE_RADIUS} fill="var(--color-green)" />
                      <circle cx={pt.x} cy={pt.y} r={4} fill="#fff" />
                    </>
                  )}
                </g>
              ))}
            </svg>

            {MOBILE_NODE_POSITIONS.map((pt, i) => {
              const step = journeySteps[i]
              const topPct = (pt.y / MOBILE_SVG_HEIGHT) * 100

              const cardStyle = pt.isLeft
                ? {
                    right: `${((MOBILE_SVG_WIDTH - Math.max(pt.x - MOBILE_CARD_GAP, MOBILE_MIN_X + MOBILE_CARD_WIDTH)) / MOBILE_SVG_WIDTH) * 100}%`,
                    top: `${topPct}%`,
                  }
                : {
                    left: `${(Math.min(pt.x + MOBILE_CARD_GAP, MOBILE_MAX_X - MOBILE_CARD_WIDTH) / MOBILE_SVG_WIDTH) * 100}%`,
                    top: `${topPct}%`,
                  }

              return (
                <div key={step.id}>
                  <div
                    ref={(el) => (mobileCardsRef.current[i] = el)}
                    className="absolute -translate-y-1/2 w-24 h-auto bg-surface border border-green/30 rounded-xl px-2 py-2"
                    style={cardStyle}
                  >
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-0 h-0"
                      style={
                        pt.isLeft
                          ? {
                              right: '-8px',
                              borderTop: '6px solid transparent',
                              borderBottom: '6px solid transparent',
                              borderLeft: '8px solid var(--color-surface)',
                            }
                          : {
                              left: '-8px',
                              borderTop: '6px solid transparent',
                              borderBottom: '6px solid transparent',
                              borderRight: '8px solid var(--color-surface)',
                            }
                      }
                    />
                    <div className="font-head font-bold text-[10px] text-white">{step.title}</div>
                    <div className="text-[9px] text-muted leading-tight mt-0.5">{step.desc}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: section text */}
        <div ref={headerRef} className="md:sticky md:top-40 self-start z-10">
          <div className="section-label">The Journey</div>
          <h2 className="section-title">
            From idea<br />to product.
          </h2>
          <p className="section-sub">
            Every project at Ciigus follows a proven path — from the first
            conversation to a live, supported product. No guesswork, no
            surprises.
          </p>
        </div>
      </div>
    </section>
  )
}
