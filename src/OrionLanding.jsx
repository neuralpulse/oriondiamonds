import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, useGLTF, Environment } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

function DiamondModel({ scrollY }) {
  const ref = useRef();
  const { scene } = useGLTF("./assets/diamond/scene.gltf");

  useEffect(() => {
    if (scene) {
      console.log("Diamond scene loaded:", scene);
      console.log("Children count:", scene.children.length);
      scene.traverse((child) => {
        if (child.isMesh) {
          console.log("Mesh found:", child.name, {
            position: child.position,
            scale: child.scale,
            material: child.material,
            geometry: child.geometry,
          });
        }
      });
    }
  }, [scene]);

  const rotationY = useRef(0);
  const posX = useRef(0);
  const posY = useRef(0);
  const scale = useRef(1);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      mouse.current.x = (e.clientX / w - 0.5) * 2;
      mouse.current.y = (e.clientY / h - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const targetRotY = mouse.current.x * Math.PI * 0.25;
    rotationY.current = THREE.MathUtils.lerp(
      rotationY.current,
      targetRotY,
      0.05
    );
    ref.current.rotation.y = rotationY.current;

    const targetY = (scrollY.current || 0) * 0.5 + mouse.current.y * 0.2;
    posY.current = THREE.MathUtils.lerp(posY.current, targetY, 0.05);
    const targetX = mouse.current.x * 0.3;
    posX.current = THREE.MathUtils.lerp(posX.current, targetX, 0.05);
    ref.current.position.set(posX.current, posY.current, 0);

    const targetScale = 1 + (scrollY.current || 0) * 0.5;
    scale.current = THREE.MathUtils.lerp(scale.current, targetScale, 0.05);
    ref.current.scale.setScalar(scale.current);

    ref.current.rotation.x = 0;
    ref.current.rotation.z = 0;
  });

  useEffect(() => {
    if (scene && ref.current) {
      scene.position.set(0, 0, 0);
      scene.scale.set(1.5, 1.5, 1.5);
      scene.rotation.set(0, 0, 0);

      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.transparent = false;
          child.material.opacity = 1;
          child.material.needsUpdate = true;
          if (child.material.type === "MeshBasicMaterial") {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xffffff,
              metalness: 1,
              roughness: 0,
              envMapIntensity: 2,
              emissive: 0x222222,
            });
          } else if (child.material.isMeshStandardMaterial) {
            child.material.color.setHex(0xffffff);
            child.material.metalness = 1;
            child.material.roughness = 0;
            child.material.envMapIntensity = 2;
            child.material.emissive.setHex(0x111111);
          }

          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  return (
    <group ref={ref}>
      <primitive object={scene.clone()} dispose={null} />
    </group>
  );
}

function DiamondLoader() {
  return (
    <group>
      <mesh rotation={[0, Math.PI * 0.1, 0]}>
        <dodecahedronGeometry args={[0.2]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={1}
          roughness={0.01}
          emissive="#444"
        />
      </mesh>
      <mesh position={[0, -0.1, 0]} rotation={[0.5, 0, 0]}>
        <coneGeometry args={[0.15, 0.3, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.9}
          roughness={0.05}
        />
      </mesh>
    </group>
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
            emissiveIntensity={0.8}
            metalness={0.8}
            roughness={0.05}
          />
        </mesh>
      ))}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array(stars.flat())}
            count={stars.length}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial toneMapped={false} transparent opacity={0.35} />
      </line>
    </group>
  );
}

export default function OrionLanding() {
  const scrollY = useRef(0);
  const [showConstellation, setShowConstellation] = useState(false);

  useEffect(() => {
    useGLTF.preload("./assets/diamond/scene.gltf");
    gsap.registerPlugin(ScrollTrigger);

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

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = Math.min(1, Math.max(0, window.scrollY / (total || 1)));
      scrollY.current = pct;
      setShowConstellation(pct > 0.25);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-100 to-white text-gray-900 antialiased">
      <nav className="fixed w-full z-40 top-0 left-0 p-6 flex flex-col md:flex-row md:justify-between items-center gap-4 md:gap-0 bg-white/80 backdrop-blur-sm shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center font-semibold text-white">
            O
          </div>
          <div className="font-medium tracking-wide text-gray-900">
            Orion Diamonds
          </div>
        </div>
        <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-6 items-center justify-center md:justify-end w-full md:w-auto">
          <a href="#why" className="text-sm hover:text-indigo-600">
            Why Orion
          </a>
          <a href="#compare" className="text-sm hover:text-indigo-600">
            Compare
          </a>
          <a href="#certs" className="text-sm hover:text-indigo-600">
            Certifications
          </a>
          <button className="px-4 py-2 rounded-md bg-gradient-to-r from-sky-400 to-indigo-600 text-white text-sm">
            Explore
          </button>
        </div>
      </nav>
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#000014] via-[#0a0f2d] to-[#000014]">
        <div className="absolute inset-0 pointer-events-none">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 40 }}
            style={{ height: "100%", width: "100%" }}
          >
            {/* lights + diamond as before */}
            <Suspense fallback={<DiamondLoader />}>
              {!showConstellation ? (
                <DiamondModel scrollY={scrollY} />
              ) : (
                <OrionConstellation scrollY={scrollY} />
              )}
              <Stars
                radius={100}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
              />
              <Environment preset="studio" background={false} />
            </Suspense>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.3}
            />
          </Canvas>
        </div>

        {/* Text overlay */}
        <div className="relative z-10 max-w-4xl text-center px-6" data-animate>
          <h1 className="text-5xl md:text-7xl font-serif font-semibold leading-tight text-white">
            Orion Diamonds
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
            Lab-grown diamonds inspired by the celestial brilliance of the Orion
            constellation — the same composition as mined diamonds, sustainably
            made, and designed for the modern world.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="#catalog"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-sky-400 to-indigo-600 text-white shadow-lg"
            >
              Explore Collection
            </a>
            <a
              href="#certs"
              className="px-6 py-3 rounded-full border border-indigo-200 text-indigo-100 hover:bg-indigo-50/10"
            >
              View Certification
            </a>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      </header>

      <section id="why" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div data-animate>
            <h2 className="text-3xl font-serif text-gray-900">Why Orion?</h2>
            <p className="mt-4 text-lg text-gray-700">
              We craft diamonds in controlled lab environments. Orion Diamonds
              are chemically and optically identical to natural diamonds — but
              produced with a fraction of the environmental impact and at an
              accessible price point.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-indigo-50 text-gray-900">
                Sustainable & Eco-Friendly
              </div>
              <div className="p-6 rounded-2xl bg-indigo-50 text-gray-900">
                Same Brilliance as Natural
              </div>
              <div className="p-6 rounded-2xl bg-indigo-50 text-gray-900">
                Affordable Luxury
              </div>
              <div className="p-6 rounded-2xl bg-indigo-50 text-gray-900">
                Backed by Science
              </div>
            </div>
          </div>
          <div
            className="relative h-80 rounded-2xl bg-gradient-to-br from-gray-100 to-white p-6 shadow-lg"
            data-animate
          >
            <div className="relative z-10 p-6">
              <h3 className="font-medium text-5xl text-gray-900">
                Sustainability Meets Science
              </h3>
              <p className="mt-6  text-gray-700">
                Orion Diamonds are produced using low-impact processes and
                strict quality control — every stone is graded and hallmarked.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        id="compare"
        className="py-20 px-6 bg-gradient-to-b from-transparent to-gray-50"
      >
        <div className="max-w-6xl mx-auto text-center mb-12" data-animate>
          <h2 className="text-3xl font-serif text-gray-900">
            Natural vs Artificial vs Orion
          </h2>
          <p className="mt-3 text-gray-700">
            A clear comparison so customers can choose with confidence.
          </p>
        </div>
        <div
          className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6"
          data-animate
        >
          <div className="bg-indigo-50 p-6 rounded-2xl">
            <h4 className="font-medium text-gray-900">Natural</h4>
            <ul className="mt-3 text-sm text-gray-700 space-y-2">
              <li>• Mined from earth</li>
              <li>• Highest price / environmental cost</li>
              <li>• Authentic geological origin</li>
            </ul>
          </div>
          <div className="bg-indigo-50 p-6 rounded-2xl">
            <h4 className="font-medium text-gray-900">
              Artificial (CZ / Moissanite)
            </h4>
            <ul className="mt-3 text-sm text-gray-700 space-y-2">
              <li>• Lab-made simulants</li>
              <li>• Lower price, different composition</li>
              <li>• Good sparkle, but not diamond chemistry</li>
            </ul>
          </div>
          <div className="bg-indigo-50 p-6 rounded-2xl">
            <h4 className="font-medium text-gray-900">Orion Lab Diamonds</h4>
            <ul className="mt-3 text-sm text-gray-700 space-y-2">
              <li>• Same chemical composition as natural diamonds</li>
              <li>• Lower ecological footprint</li>
              <li>• Price between simulants and mined stones — great value</li>
            </ul>
          </div>
        </div>
        <div className="max-w-4xl mx-auto text-center mt-10" data-animate>
          <p className="text-gray-700">
            Orion Diamonds sit in the sweet spot — chemically identical to mined
            diamonds but made responsibly and offered at a more accessible price
            point.
          </p>
        </div>
      </section>
      <section id="certs" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div data-animate>
            <h2 className="text-3xl font-serif text-gray-900">
              Hallmarking & Certification
            </h2>
            <p className="mt-4 text-gray-700">
              Every Orion diamond is independently graded and hallmarked. Upload
              or view certificates to verify cut, color, clarity and carat. We
              display trusted lab logos and provide a unique certificate ID for
              each stone.
            </p>
            <div className="mt-6 flex gap-4 items-center">
              <div className="w-24 h-12 bg-indigo-100 rounded-md flex items-center justify-center text-gray-900">
                IGI
              </div>
              <div className="w-24 h-12 bg-indigo-100 rounded-md flex items-center justify-center text-gray-900">
                EGL
              </div>
              <div className="w-24 h-12 bg-indigo-100 rounded-md flex items-center justify-center text-gray-900">
                LabMark
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm text-gray-700">
                Verify certificate ID
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  className="flex-1 rounded-md bg-indigo-50 px-4 py-2 text-gray-900 placeholder-gray-500"
                  placeholder="Enter certificate ID"
                />
                <button className="px-4 py-2 rounded-md bg-gradient-to-r from-sky-400 to-indigo-600 text-white">
                  Verify
                </button>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-indigo-50 p-6" data-animate>
            <h3 className="font-medium text-gray-900">Sample Certificate</h3>
            <div className="mt-4 border border-indigo-200 rounded-lg p-4">
              <div className="text-sm text-gray-700">
                Certificate ID:
                <span className="font-mono">OR-2025-000123</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-700">
                <div>Carat</div> <div>1.02</div> <div>Cut</div>
                <div>Excellent</div> <div>Color</div> <div>G</div>
                <div>Clarity</div> <div>VS2</div>
              </div>
              <div className="mt-4 text-xs text-gray-700">
                Download signed certificate (PDF)
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="catalog"
        className="py-24 px-6 bg-gradient-to-t from-gray-50 to-transparent"
      >
        <div className="max-w-4xl mx-auto text-center" data-animate>
          <h2 className="text-3xl font-serif text-gray-900">
            Ready to explore Orion?
          </h2>
          <p className="mt-3 text-gray-700">
            Shop responsibly — find the stone that's right for you and comes
            with full certification.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a className="px-8 py-4 rounded-full bg-gradient-to-r from-sky-400 to-indigo-600 text-white shadow-xl">
              Shop Collection
            </a>
            <a className="px-8 py-4 rounded-full border border-indigo-200 text-indigo-600 hover:bg-indigo-50">
              Contact Sales
            </a>
          </div>
        </div>
      </section>
      <footer className="py-12 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} Orion Diamonds — All rights reserved
        </div>
      </footer>
    </div>
  );
}
