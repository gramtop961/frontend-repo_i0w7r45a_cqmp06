import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'

// Lazy-load Spline so it doesn't block initial paint and to avoid crashing when the scene is unavailable
const LazySpline = lazy(() => import('@splinetool/react-spline'))

const DEFAULT_SCENE = 'https://prod.spline.design/WIYQqZ5jGk2v2eG8/scene.splinecode'
const SCENE_URL = import.meta.env.VITE_SPLINE_SCENE_URL || DEFAULT_SCENE

function Hero() {
  const containerRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [canShow3D, setCanShow3D] = useState(false)
  const [failed3D, setFailed3D] = useState(false)

  // Observe when hero enters viewport (for lazy loading)
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) setInView(true)
      },
      { root: null, threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Before mounting the 3D component, verify the scene is accessible to avoid runtime crashes
  useEffect(() => {
    if (!inView || canShow3D || failed3D) return

    let cancelled = false
    const controller = new AbortController()

    async function checkSceneAndEnable() {
      try {
        const res = await fetch(SCENE_URL, { method: 'GET', cache: 'no-store', signal: controller.signal })
        if (!res.ok) throw new Error(`Scene fetch failed: ${res.status}`)
        if (!cancelled) setCanShow3D(true)
      } catch (_err) {
        if (!cancelled) setFailed3D(true)
      }
    }

    checkSceneAndEnable()
    return () => {
      cancelled = true
      controller.abort()
    }
  }, [inView, canShow3D, failed3D])

  const FallbackClouds = useMemo(
    () => (
      <div className="absolute inset-0 -z-0">
        <div className="pointer-events-none absolute inset-0 bg-[url('https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=2940&auto=format&fit=crop')] opacity-5 mix-blend-screen" />
        <div className="absolute -bottom-24 left-0 right-0 h-72 bg-[radial-gradient(circle_at_20%_100%,rgba(255,255,255,0.20),transparent_60%)] blur-2xl" />
        <div className="absolute -bottom-40 left-0 right-0 h-96 bg-[radial-gradient(circle_at_80%_100%,rgba(255,255,255,0.18),transparent_60%)] blur-2xl" />
      </div>
    ),
    []
  )

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(3,105,161,0.25),rgba(8,47,73,0.6)_40%,#020617_80%)]"
    >
      {/* Background cloud layers */}
      {FallbackClouds}

      {/* 3D scene (only if fetch succeeds) */}
      {inView && canShow3D && !failed3D && (
        <div className="absolute inset-0 -z-0">
          <Suspense fallback={null}>
            <LazySpline scene={SCENE_URL} />
          </Suspense>
        </div>
      )}

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

            {failed3D && (
              <div className="mt-6 text-sm text-white/60">
                3D preview is unavailable right now. The experience still looks great without it.
              </div>
            )}
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950" />
      </div>

      {/* Small helper badge to access the current scene URL */}
      <div className="pointer-events-auto absolute right-4 top-4 z-20">
        <a
          href={SCENE_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20 backdrop-blur"
        >
          Open 3D Scene
        </a>
      </div>
    </section>
  )
}

export default Hero
