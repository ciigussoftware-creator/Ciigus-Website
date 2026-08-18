import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechMarquee from './components/TechMarquee'
import Services from './components/Services'
import Process from './components/Process'
import Work from './components/Work'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Logo from './components/Logo'

export default function App() {
  const rootRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } })

    tl.to('[data-reveal="mark"]', {
      scale: 1.08,
      opacity: 0,
      duration: 0.5,
      delay: 0.3,
    })
    .to('[data-reveal="overlay"]', {
      yPercent: -100,
      duration: 0.8,
    }, '-=0.2')
    .set('[data-reveal="overlay"]', { display: 'none' })
  }, { scope: rootRef })

  return (
    <div ref={rootRef}>
      <div
        data-reveal="overlay"
        className="fixed inset-0 z-200 bg-bg flex items-center justify-center"
      >
        <span data-reveal="mark">
          <Logo variant="mark" size={48} showText={false} />
        </span>
      </div>

      <Navbar />
      <Hero />
      <TechMarquee />
      <Services />
      <Process />
      <Work />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}
