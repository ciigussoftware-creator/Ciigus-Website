import { Outlet, useLocation } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import FloatingWhatsApp from '../components/FloatingWhatsApp'

export default function RootLayout() {
  usePageMeta(useLocation().pathname)

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
