function Features() {
  const items = [
    {
      title: 'Ultra-smooth ride',
      desc: 'Meticulous maintenance and expert pilots for a whisper-quiet, vibration-minimized journey.',
    },
    {
      title: 'Cabin luxury',
      desc: 'Leather seating, noise-cancelling headsets, and climate perfection in a serene cabin.',
    },
    {
      title: 'Safety first',
      desc: 'Exceeding international standards with redundant systems and real-time monitoring.',
    },
  ]

  return (
    <section id="experience" className="relative bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-10 md:grid-cols-3">
          {items.map((f, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-8 text-white/90 backdrop-blur-xl">
              <div className="text-2xl font-semibold text-white mb-2">{f.title}</div>
              <p className="text-white/60">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
