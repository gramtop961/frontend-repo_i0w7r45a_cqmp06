import { Menu, Phone } from "lucide-react"

function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-sky-300 to-indigo-400 ring-1 ring-white/30 shadow-inner" />
            <span className="text-white/90 text-lg tracking-wide font-medium">Nimbus Helicopters</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#fleet" className="text-white/70 hover:text-white transition-colors">Fleet</a>
            <a href="#experience" className="text-white/70 hover:text-white transition-colors">Experience</a>
            <a href="#safety" className="text-white/70 hover:text-white transition-colors">Safety</a>
            <a href="#contact" className="text-white/70 hover:text-white transition-colors">Contact</a>
          </nav>

          <a href="#contact" className="hidden md:inline-flex items-center gap-2 rounded-full bg-white/90 hover:bg-white text-slate-900 px-4 py-2 text-sm font-semibold transition-colors">
            <Phone className="h-4 w-4" /> Book now
          </a>

          <button className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
