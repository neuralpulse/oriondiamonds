import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Html, useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import diamondImg from "./assets/new.png";

function DiamondImage({ scrollY }) {
  const ref = useRef();
  const texture = new THREE.TextureLoader().load(diamondImg);

  // Current values for smooth interpolation
  const rotationY = useRef(0);
  const posX = useRef(0);
  const posY = useRef(-0.5);
  const scale = useRef(3);

  // Track mouse position normalized to [-1, 1]
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMouseMove = (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mouse.current.x = (e.clientX / w - 0.5) * 2; // -1 to 1
      mouse.current.y = (e.clientY / h - 0.5) * 2; // -1 to 1
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useFrame(() => {
    if (!ref.current) return;

    // ----- ROTATION -----
    const targetRotY = mouse.current.x * Math.PI * 0.25; // left-right rotation
    rotationY.current = THREE.MathUtils.lerp(
      rotationY.current,
      targetRotY,
      0.05
    );
    ref.current.rotation.y = rotationY.current;

    // ----- POSITION -----
    const targetY = -0.5 + (scrollY.current || 0) * 1 + mouse.current.y * 0.3;
    posY.current = THREE.MathUtils.lerp(posY.current, targetY, 0.05);

    const targetX = mouse.current.x * 0.5; // slight horizontal movement
    posX.current = THREE.MathUtils.lerp(posX.current, targetX, 0.05);

    ref.current.position.set(posX.current, posY.current, 0);

    // ----- SCALE -----
    const targetScale = 3 + (scrollY.current || 0) * 0.5; // slightly grows on scroll
    scale.current = THREE.MathUtils.lerp(scale.current, targetScale, 0.05);
    ref.current.scale.set(scale.current, scale.current, scale.current);

    // Reset other rotations
    ref.current.rotation.x = 0;
    ref.current.rotation.z = 0;
  });

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1.5, 1.5]} />
      <meshBasicMaterial map={texture} transparent opacity={0.95} />
    </mesh>
  );
}

function OrionConstellation({ scrollY }) {
  const stars = [
    [-0.9, 0.6, -1],
    [-0.3, 0.1, -0.8],
    [0.1, -0.1, -0.6],
    [0.4, 0.55, -0.9],
    [0.9, 0.9, -1.1],
    [0.25, -0.9, -0.5],
  ];

  return (
    <group>
      {stars.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.03 + (i === 2 ? 0.04 : 0.0), 12, 12]} />
          <meshStandardMaterial
            emissive={[1, 1, 1]}
            metalness={0.6}
            roughness={0.1}
          />
        </mesh>
      ))}
      {/* subtle line between main stars */}
      <line>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attachObject={["attributes", "position"]}
            array={new Float32Array(stars.flat())}
            count={stars.length}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial toneMapped={false} transparent opacity={0.25} />
      </line>
    </group>
  );
}

// -----------------------------
// Main component
// -----------------------------
export default function OrionLanding() {
  const scrollY = useRef(0);
  const [showConstellation, setShowConstellation] = useState(false);

  useEffect(() => {
    // Register GSAP plugin
    gsap.registerPlugin(ScrollTrigger);

    // Basic GSAP scroll animations.
    // Animate elements' entrance and keep a small reactive scroll value for 3D usage.
    const sections = document.querySelectorAll("[data-animate]");

    sections.forEach((el, i) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 40 },
        {
          duration: 1,
          autoAlpha: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });

    // Enhanced scroll tracking for smoother diamond rotation
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = Math.min(1, Math.max(0, window.scrollY / (total || 1)));
      scrollY.current = pct;

      // switch between diamond and constellation when scrolled a lot
      setShowConstellation(pct > 0.25);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white antialiased">
      {/* NAV */}
      <nav className="fixed w-full z-40 top-0 left-0 p-6 flex flex-col md:flex-row md:justify-between items-center gap-4 md:gap-0 bg-black/50 backdrop-blur-sm">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center font-semibold">
            O
          </div>
          <div className="font-medium tracking-wide text-white">
            Orion Diamonds
          </div>
        </div>

        {/* Links & button */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-6 items-center justify-center md:justify-end w-full md:w-auto">
          <a href="#why" className="text-sm hover:underline">
            Why Orion
          </a>
          <a href="#compare" className="text-sm hover:underline">
            Compare
          </a>
          <a href="#certs" className="text-sm hover:underline">
            Certifications
          </a>
          <button className="px-4 py-2 rounded-md bg-white text-black text-sm">
            Explore
          </button>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {/* starfield provided by drei's Stars (three) */}
          <Canvas
            camera={{ position: [0, 0, 3] }}
            style={{ height: "100%", width: "100%" }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={0.6} />
            <Suspense fallback={null}>
              {/* Orion constellation in background */}
              <OrionConstellation scrollY={scrollY} />

              {/* Diamond always in front */}
              <DiamondImage scrollY={scrollY} />

              {/* Starfield background */}
              <Stars
                radius={50}
                depth={50}
                count={4000}
                factor={4}
                saturation={0}
                fade
              />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>

        <div className="relative z-10 max-w-4xl text-center px-6" data-animate>
          <h1 className="text-5xl md:text-7xl font-serif font-semibold leading-tight">
            Orion Diamonds
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto opacity-90">
            Lab-grown diamonds inspired by the celestial brilliance of the Orion
            constellation — the same composition as mined diamonds, sustainably
            made, and designed for the modern world.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <a
              href="#catalog"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-sky-400 to-indigo-600 shadow-lg"
            >
              Explore Collection
            </a>
            <a
              href="#certs"
              className="px-6 py-3 rounded-full border border-white/20"
            >
              View Certification
            </a>
          </div>
        </div>

        {/* subtle overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
      </header>

      {/* WHY ORION */}
      <section id="why" className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div data-animate>
            <h2 className="text-3xl font-serif">Why Orion?</h2>
            <p className="mt-4 text-lg opacity-90">
              We craft diamonds in controlled lab environments. Orion Diamonds
              are chemically and optically identical to natural diamonds — but
              produced with a fraction of the environmental impact and at an
              accessible price point.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white/5">
                Sustainable & Eco-Friendly
              </div>
              <div className="p-6 rounded-2xl bg-white/5">
                Same Brilliance as Natural
              </div>
              <div className="p-6 rounded-2xl bg-white/5">
                Affordable Luxury
              </div>
              <div className="p-6 rounded-2xl bg-white/5">
                Backed by Science
              </div>
            </div>
          </div>

          <div
            className="relative h-80 rounded-2xl bg-gradient-to-br from-slate-800 to-black p-6"
            data-animate
          >
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              {/* small canvas preview to echo hero */}
              <Canvas camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={0.6} />
                <mesh position={[0, 0, 0]} rotation={[0, 0.5, 0]}>
                  <torusKnotGeometry args={[0.6, 0.18, 128, 32]} />
                  <meshStandardMaterial metalness={1} roughness={0.05} />
                </mesh>
              </Canvas>
            </div>
            <div className="relative z-10 p-6">
              <h3 className="font-medium">Sustainability Meets Science</h3>
              <p className="mt-2 text-sm opacity-80">
                Orion Diamonds are produced using low-impact processes and
                strict quality control — every stone is graded and hallmarked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARE */}
      <section
        id="compare"
        className="py-20 px-6 bg-gradient-to-b from-transparent to-black/50"
      >
        <div className="max-w-6xl mx-auto text-center mb-12" data-animate>
          <h2 className="text-3xl font-serif">
            Natural vs Artificial vs Orion
          </h2>
          <p className="mt-3 opacity-80">
            A clear comparison so customers can choose with confidence.
          </p>
        </div>

        <div
          className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6"
          data-animate
        >
          <div className="bg-white/5 p-6 rounded-2xl">
            <h4 className="font-medium">Natural</h4>
            <ul className="mt-3 text-sm opacity-90 space-y-2">
              <li>• Mined from earth</li>
              <li>• Highest price / environmental cost</li>
              <li>• Authentic geological origin</li>
            </ul>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl">
            <h4 className="font-medium">Artificial (CZ / Moissanite)</h4>
            <ul className="mt-3 text-sm opacity-90 space-y-2">
              <li>• Lab-made simulants</li>
              <li>• Lower price, different composition</li>
              <li>• Good sparkle, but not diamond chemistry</li>
            </ul>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl">
            <h4 className="font-medium">Orion Lab Diamonds</h4>
            <ul className="mt-3 text-sm opacity-90 space-y-2">
              <li>• Same chemical composition as natural diamonds</li>
              <li>• Lower ecological footprint</li>
              <li>• Price between simulants and mined stones — great value</li>
            </ul>
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center mt-10" data-animate>
          <p className="opacity-80">
            Orion Diamonds sit in the sweet spot — chemically identical to mined
            diamonds but made responsibly and offered at a more accessible price
            point.
          </p>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certs" className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div data-animate>
            <h2 className="text-3xl font-serif">Hallmarking & Certification</h2>
            <p className="mt-4 opacity-90">
              Every Orion diamond is independently graded and hallmarked. Upload
              or view certificates to verify cut, color, clarity and carat. We
              display trusted lab logos and provide a unique certificate ID for
              each stone.
            </p>

            <div className="mt-6 flex gap-4 items-center">
              {/* Placeholder logos */}
              <div className="w-24 h-12 bg-white/10 rounded-md flex items-center justify-center">
                IGI
              </div>
              <div className="w-24 h-12 bg-white/10 rounded-md flex items-center justify-center">
                EGL
              </div>
              <div className="w-24 h-12 bg-white/10 rounded-md flex items-center justify-center">
                LabMark
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm opacity-80">
                Verify certificate ID
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  className="flex-1 rounded-md bg-white/5 px-4 py-2"
                  placeholder="Enter certificate ID"
                />
                <button className="px-4 py-2 rounded-md bg-gradient-to-r from-sky-400 to-indigo-600">
                  Verify
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 p-6" data-animate>
            <h3 className="font-medium">Sample Certificate</h3>
            <div className="mt-4 border border-white/10 rounded-lg p-4">
              <div className="text-sm opacity-90">
                Certificate ID:{" "}
                <span className="font-mono">OR-2025-000123</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm opacity-80">
                <div>Carat</div>
                <div>1.02</div>
                <div>Cut</div>
                <div>Excellent</div>
                <div>Color</div>
                <div>G</div>
                <div>Clarity</div>
                <div>VS2</div>
              </div>
              <div className="mt-4 text-xs opacity-80">
                Download signed certificate (PDF)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="catalog"
        className="py-24 px-6 bg-gradient-to-t from-black/70 to-transparent"
      >
        <div className="max-w-4xl mx-auto text-center" data-animate>
          <h2 className="text-3xl font-serif">Ready to explore Orion?</h2>
          <p className="mt-3 opacity-80">
            Shop responsibly — find the stone that's right for you and comes
            with full certification.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <a className="px-8 py-4 rounded-full bg-gradient-to-r from-sky-400 to-indigo-600 shadow-xl">
              Shop Collection
            </a>
            <a className="px-8 py-4 rounded-full border border-white/10">
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6">
        <div className="max-w-6xl mx-auto text-center opacity-70 text-sm">
          © {new Date().getFullYear()} Orion Diamonds — All rights reserved
        </div>
      </footer>
    </div>
  );
}
