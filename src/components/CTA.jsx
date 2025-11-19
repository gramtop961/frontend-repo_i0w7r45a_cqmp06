function CTA() {
  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="absolute inset-0 -z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(56,189,248,0.25),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 text-white backdrop-blur-xl">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold leading-tight">Ready to rise above the clouds?</h2>
              <p className="mt-4 text-white/70">Share your preferred date, route, and passenger count. Our concierge will confirm availability and pricing within minutes.</p>
            </div>

            <form className="grid gap-4">
              <input className="rounded-xl bg-white/10 border border-white/20 px-4 py-3 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-sky-300" placeholder="Name" />
              <input className="rounded-xl bg-white/10 border border-white/20 px-4 py-3 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-sky-300" placeholder="Email" type="email" />
              <div className="grid grid-cols-2 gap-4">
                <input className="rounded-xl bg-white/10 border border-white/20 px-4 py-3 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-sky-300" placeholder="Date" type="date" />
                <input className="rounded-xl bg-white/10 border border-white/20 px-4 py-3 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-sky-300" placeholder="Passengers" type="number" min="1" />
              </div>
              <textarea className="rounded-xl bg-white/10 border border-white/20 px-4 py-3 h-28 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-sky-300" placeholder="Route or notes" />
              <button className="inline-flex items-center justify-center rounded-xl bg-white text-slate-900 px-6 py-3 font-semibold hover:-translate-y-0.5 transition-transform">Request itinerary</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTA
