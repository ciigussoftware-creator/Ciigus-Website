import markLogo from '../assets/logo-mark.png'
import fullLogo from '../assets/logo-full.png'
import withoutTextLogo from '../assets/Ciiguss_withou_text.png'
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
        className="w-auto block object-contain"
        style={{ height: size }}
      />
    )
  }

  return (
    <span className="inline-flex items-center gap-1">
      <img
        src={withoutTextLogo}
        alt="Ciigus Software"
        className="w-auto block object-contain"
        style={{ height: size }}
      />
      {showText && (
       <span className="font-head font-bold text-[1.7rem] tracking-[-0.5px] text-white leading-none pb-[2px]">
          Cii<span className="text-accent">gus</span>
      </span>
      )}
    </span>
  )
}

