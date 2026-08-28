import { useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import RootLayout from './layouts/RootLayout'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import WorkPage from './pages/WorkPage'
import AboutPage from './pages/AboutPage'
import PackagesPage from './pages/PackagesPage'
import ContactPage from './pages/ContactPage'
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

      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </div>
  )
}
