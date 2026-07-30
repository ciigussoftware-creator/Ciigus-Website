import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

export default function FadeUp({
  children,
  as: Tag = 'div',
  y = 40,
  duration = 0.7,
  delay = 0,
  start = 'top 85%',
  className = '',
  ...rest
}) {
  const ref = useRef(null)

  useGSAP(() => {
    gsap.from(ref.current, {
      y,
      opacity: 0,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start,
        toggleActions: 'play none none none',
      },
    })
  }, { scope: ref })

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
