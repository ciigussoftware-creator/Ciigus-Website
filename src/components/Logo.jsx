import markLogo from '../assets/logo-mark.png'
import fullLogo from '../assets/logo-full.png'
import './Logo.css'

/*
  Logo component.
  - variant="mark"  → just the gear + C symbol (default), optional wordmark text
  - variant="full"  → the complete logo image (symbol + "Ciigus Software")
  - size            → height of the image in px
  - showText        → (mark variant only) show the "Ciigus" wordmark beside the symbol
*/
export default function Logo({ variant = 'mark', size = 36, showText = true }) {
  if (variant === 'full') {
    return (
      <img
        src={fullLogo}
        alt="Ciigus Software"
        className="logo-img logo-full"
        style={{ height: size }}
      />
    )
  }

  return (
    <span className="logo-wrap">
      <img
        src={markLogo}
        alt="Ciigus Software"
        className="logo-img"
        style={{ height: size }}
      />
      {showText && (
        <span className="logo-text">
          Cii<span className="logo-text-accent">gus</span>
        </span>
      )}
    </span>
  )
}
