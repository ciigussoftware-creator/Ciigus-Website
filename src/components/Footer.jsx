import Logo from './Logo'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="py-8 px-10 border-t border-[#1e2d45] bg-[#0d0d0d] flex justify-between items-center flex-wrap gap-4 max-md:flex-col max-md:text-center">
      <Logo variant="full" size={38} />
      <div className="text-[0.8rem] text-[#8899bb]">
        © {year} Ciigus · Modern Digital Solutions · Sri Lanka
      </div>
    </footer>
  )
}

