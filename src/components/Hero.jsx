import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Float, Cloud, Stars } from '@react-three/drei'

// Keep Spline as optional lazy chunk, but we'll prefer a Three.js scene by default
const LazySpline = lazy(() => import('@splinetool/react-spline'))

const DEFAULT_SPLINE = 'https://prod.spline.design/WIYQqZ5jGk2v2eG8/scene.splinecode'
const PRIMARY_SCENE = import.meta.env.VITE_SPLINE_SCENE_URL || DEFAULT_SPLINE
const SECONDARY_SCENE = import.meta.env.VITE_SPLINE_SCENE_FALLBACK || ''

function Helicopter(props) {
  // Simple stylized helicopter using basic geometry to avoid external assets
  // Body
  return (
    <group {...props}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.6}>
        <group>
          <mesh castShadow position={[0, 0, 0]}>
            <capsuleGeometry args={[0.45, 1.6, 12, 24]} />
            <meshStandardMaterial color="#8fb7ff" metalness={0.4} roughness={0.35} />
          </mesh>

          {/* Skids */}
          <mesh position={[0.5, -0.6, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 1.4, 12]} />
            <meshStandardMaterial color="#dbeafe" metalness={0.1} roughness={0.8} />
          </mesh>
          <mesh position={[-0.5, -0.6, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 1.4, 12]} />
            <meshStandardMaterial color="#dbeafe" metalness={0.1} roughness={0.8} />
          </mesh>

          {/* Tail boom */}
          <mesh position={[0, 0.05, -1.15]} rotation={[0.05, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.05, 1.4, 16]} />
            <meshStandardMaterial color="#93c5fd" metalness={0.3} roughness={0.5} />
          </mesh>

          {/* Main rotor mast */}
          <mesh position={[0, 0.65, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.4, 12]} />
            <meshStandardMaterial color="#64748b" />
          </mesh>

          {/* Main rotor blades */}
          <SpinningRotor />

          {/* Tail rotor */}
          <group position={[0, 0.1, -1.85]}>
            <SpinningTailRotor />
          </group>
        </group>
      </Float>
    </group>
  )
}

function SpinningRotor() {
  const [t, setT] = useState(0)
  useEffect(() => {
    let raf
    const loop = (time) => {
      setT(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])
  const rot = (t / 1000) * 12.0
  return (
    <group rotation={[0, rot, 0]} position={[0, 0.85, 0]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.06, 2.6, 0.02]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.2} roughness={0.4} />
      </mesh>
      <mesh rotation={[0, 0, -Math.PI / 2]}>
        <boxGeometry args={[0.06, 2.6, 0.02]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.2} roughness={0.4} />
      </mesh>
    </group>
  )
}

function SpinningTailRotor() {
  const [t, setT] = useState(0)
  useEffect(() => {
    let raf
    const loop = (time) => {
      setT(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])
  const rot = (t / 1000) * 16.0
  return (
    <group rotation={[0, 0, rot]}>
      <mesh>
        <boxGeometry args={[0.02, 0.55, 0.02]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.02, 0.55, 0.02]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
    </group>
  )
}

function CloudField() {
  return (
    <group>
      <Stars radius={80} depth={50} count={2000} factor={3} saturation={0} fade speed={0.8} />
      <Cloud position={[-6, -2, -6]} speed={0.2} opacity={0.4} scale={7} />
      <Cloud position={[6, -3, -4]} speed={0.15} opacity={0.35} scale={6} />
      <Cloud position={[0, -4, -10]} speed={0.18} opacity={0.45} scale={9} />
    </group>
  )
}

function ThreeScene() {
  return (
    <Canvas camera={{ position: [4, 2.2, 4.5], fov: 50 }} shadows>
      <color attach="background" args={["#07121f"]} />
      <fog attach="fog" args={["#07121f", 10, 45]} />

      <hemisphereLight intensity={0.6} groundColor={"#0b1220"} color={"#a0c4ff"} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />

      <Environment preset="sunset" />
      <CloudField />

      {/* Soft ground plane for subtle contact shadows */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.9, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <shadowMaterial opacity={0.25} />
      </mesh>

      <Helicopter position={[0, 0, 0]} />

      <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 3.5} maxPolarAngle={Math.PI / 2.1} />
    </Canvas>
  )
}

function Hero() {
  const containerRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [canShow3D, setCanShow3D] = useState(false)
  const [failed3D, setFailed3D] = useState(false)
  const [activeScene, setActiveScene] = useState(PRIMARY_SCENE)

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

  // Try Spline first only if user provided a public URL; otherwise fall back to Three.js immediately
  useEffect(() => {
    if (!inView || canShow3D || failed3D) return

    let cancelled = false
    const controller = new AbortController()

    async function tryFetch(url) {
      const res = await fetch(url, { method: 'GET', cache: 'no-store', signal: controller.signal })
      if (!res.ok) throw new Error(`Scene fetch failed: ${res.status}`)
      return true
    }

    async function checkSceneAndEnable() {
      // If env not set or default (likely blocked), skip to Three.js scene
      const userProvided = import.meta.env.VITE_SPLINE_SCENE_URL || import.meta.env.VITE_SPLINE_SCENE_FALLBACK
      if (!userProvided) {
        if (!cancelled) setFailed3D(true) // mark Spline as failed to show the info block
        return
      }
      try {
        await tryFetch(PRIMARY_SCENE)
        if (!cancelled) {
          setActiveScene(PRIMARY_SCENE)
          setCanShow3D(true)
        }
      } catch (_e1) {
        if (SECONDARY_SCENE) {
          try {
            await tryFetch(SECONDARY_SCENE)
            if (!cancelled) {
              setActiveScene(SECONDARY_SCENE)
              setCanShow3D(true)
            }
            return
          } catch (_e2) {}
        }
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

  const shouldShowSpline = inView && canShow3D && !failed3D

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(3,105,161,0.25),rgba(8,47,73,0.6)_40%,#020617_80%)]"
    >
      {/* Background cloud layers */}
      {FallbackClouds}

      {/* Prefer Three.js scene; show Spline only if an allowed public URL passes checks */}
      <div className="absolute inset-0 -z-0">
        {shouldShowSpline ? (
          <Suspense fallback={null}>
            <LazySpline scene={activeScene} />
          </Suspense>
        ) : (
          <ThreeScene />
        )}
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

            {failed3D && (
              <div className="mt-6 text-sm text-white/70 space-y-2">
                <div>Public Spline scene was unavailable. Showing in-app 3D instead.</div>
                {PRIMARY_SCENE && (
                  <div>
                    Current scene URL: {' '}
                    <a className="underline text-white" href={PRIMARY_SCENE} target="_blank" rel="noreferrer">
                      {PRIMARY_SCENE}
                    </a>
                  </div>
                )}
                {SECONDARY_SCENE && (
                  <div>
                    Fallback scene URL: {' '}
                    <a className="underline text-white" href={SECONDARY_SCENE} target="_blank" rel="noreferrer">
                      {SECONDARY_SCENE}
                    </a>
                  </div>
                )}
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
          href={activeScene}
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
