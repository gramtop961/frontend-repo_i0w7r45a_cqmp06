import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(3,105,161,0.25),rgba(8,47,73,0.6)_40%,#020617_80%)]">
      {/* Stars */}
      <div className="pointer-events-none absolute inset-0 bg-[url('https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2940&auto=format&fit=crop')] opacity-5 mix-blend-screen" />

      {/* Cloud layer */}
      <div className="absolute inset-0">
        <div className="absolute -bottom-24 left-0 right-0 h-72 bg-[radial-gradient(circle_at_20%_100%,rgba(255,255,255,0.20),transparent_60%)] blur-2xl" />
        <div className="absolute -bottom-40 left-0 right-0 h-96 bg-[radial-gradient(circle_at_80%_100%,rgba(255,255,255,0.18),transparent_60%)] blur-2xl" />
      </div>

      {/* 3D scene */}
      <div className="absolute inset-0 -z-0">
        {/* Replace with your Spline scene URL of Bell 206 above clouds */}
        <Spline scene="https://prod.spline.design/WIYQqZ5jGk2v2eG8/scene.splinecode" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 pt-40 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-wider text-white/80 backdrop-blur">
              Private Charter
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              Luxury • Safety • Precision
            </span>
            <h1 className="mt-6 text-5xl md:text-6xl font-semibold leading-tight text-white">
              Bell 206 flights above the clouds
            </h1>
            <p className="mt-5 text-lg text-white/70">
              Experience the serenity of cruising just above a sea of clouds. Impeccable service,
              panoramic views, and the timeless reliability of the Bell 206.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#contact" className="inline-flex items-center rounded-full bg-white text-slate-900 px-6 py-3 font-semibold shadow-lg shadow-black/20 hover:-translate-y-0.5 transition-transform">
                Book your flight
              </a>
              <a href="#experience" className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20 transition-colors">
                Explore the experience
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 text-white/70">
              <div>
                <div className="text-2xl font-semibold text-white">15 min</div>
                <div className="text-sm">City scenic</div>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div>
                <div className="text-2xl font-semibold text-white">45 min</div>
                <div className="text-sm">Coastal ridge</div>
              </div>
              <div className="h-8 w-px bg-white/20" />
              <div>
                <div className="text-2xl font-semibold text-white">90 min</div>
                <div className="text-sm">Sunset above clouds</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950" />
      </div>
    </section>
  )
}

export default Hero
