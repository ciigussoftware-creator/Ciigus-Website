import CategoryIcon from './CategoryIcon'

const palettes = {
  'Business Systems': { from: '#07182a', to: '#0b3a3a', accent: '#00ba9c' },
  'E-commerce & Web': { from: '#07182a', to: '#0c2d55', accent: '#0095fc' },
  'AI Solutions': { from: '#0a1426', to: '#25300f', accent: '#d5e73c' },
}

const titleSizes = {
  sm: 'text-lg',
  md: 'text-lg sm:text-xl md:text-2xl',
}

// Designed placeholder cover. Setting `image` on the project swaps in a real
// screenshot with no other changes. Screenshots are never cropped: they use
// object-contain over a blurred copy of themselves (same file, one download).
// `natural` lets the image keep its own aspect ratio (used in the popup).
export default function WorkCover({ item, size = 'sm', natural = false }) {
  if (item.image) {
    return (
      <div className={`relative isolate overflow-hidden bg-[#0a0f1e] ${natural ? '' : 'h-full w-full'}`}>
        <img
          src={item.image}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full scale-125 object-cover opacity-70 blur-2xl"
        />
        <img
          src={item.image}
          alt={`Screenshot of ${item.title}`}
          loading="lazy"
          decoding="async"
          className={natural ? 'mx-auto block h-auto max-h-[60vh] w-auto max-w-full object-contain' : 'h-full w-full object-contain'}
        />
      </div>
    )
  }

  const palette = palettes[item.category] ?? palettes['Business Systems']

  return (
    <div
      aria-hidden="true"
      className="relative w-full h-full overflow-hidden"
      style={{
        background: `radial-gradient(circle at 85% 10%, ${palette.accent}40 0%, transparent 55%), linear-gradient(135deg, ${palette.from}, ${palette.to})`,
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'linear-gradient(135deg, transparent 15%, black 100%)',
          WebkitMaskImage: 'linear-gradient(135deg, transparent 15%, black 100%)',
        }}
      />
      <CategoryIcon
        category={item.category}
        className="absolute -right-5 -bottom-6 w-36 h-36 opacity-[0.12] text-white"
      />

      <div className="absolute top-4 left-4 flex items-center gap-2">
        <span
          className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/15 bg-white/10"
          style={{ color: palette.accent }}
        >
          <CategoryIcon category={item.category} className="w-5 h-5" />
        </span>
        <span className="text-[0.68rem] uppercase tracking-[0.1em] text-white/75 font-medium">
          {item.category}
        </span>
      </div>

      <div className={`absolute left-4 right-4 bottom-4 font-head font-bold leading-tight text-white ${titleSizes[size]}`}>
        {item.title}
      </div>
      <div
        className="absolute inset-x-0 bottom-0 h-1"
        style={{ background: `linear-gradient(90deg, ${palette.accent}, transparent)` }}
      />
    </div>
  )
}
