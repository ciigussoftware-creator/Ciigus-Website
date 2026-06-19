import Logo from './Logo'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer>
      <Logo variant="full" size={38} />
      <div className="footer-copy">
        © {year} Ciigus · Modern Digital Solutions · Sri Lanka
      </div>
    </footer>
  )
}
