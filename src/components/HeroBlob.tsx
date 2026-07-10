"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial, Sphere } from "@react-three/drei";
import type { Mesh } from "three";

function Blob() {
  const meshRef = useRef<Mesh>(null);
  // Slow Y-axis rotation — the brief's only motion on this object.
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.15;
  });

  return (
    <Sphere ref={meshRef} args={[1.4, 128, 128]}>
      <MeshTransmissionMaterial
        distortion={0.4}
        distortionScale={0.5}
        temporalDistortion={0.2}
        iridescence={1}
        iridescenceIOR={1.3}
        iridescenceThicknessRange={[0, 1400]}
        chromaticAberration={0.06}
        roughness={0.15}
        thickness={1.2}
        anisotropy={0.3}
        color="#b84dff"
        backside
      />
    </Sphere>
  );
}

// prefers-reduced-motion fallback — a static gradient orb, no WebGL/rotation
// at all, per the brief's explicit motion rule.
function StaticOrb() {
  return (
    <div
      className="size-full rounded-full"
      style={{
        background:
          "radial-gradient(circle at 35% 30%, #ff4da6, #b84dff 45%, #4dc4ff 75%, transparent 100%)",
      }}
    />
  );
}

export function HeroBlob() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  if (reducedMotion) return <StaticOrb />;

  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 40 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.3} />
      {/* Purple point light behind/around the blob, per the brief. */}
      <pointLight position={[2, 2, 2]} intensity={30} color="#b84dff" />
      <pointLight position={[-2, -1, -2]} intensity={15} color="#ff4da6" />
      <Suspense fallback={null}>
        <Blob />
        {/* Environment reflections make MeshTransmissionMaterial read as
            actual glass instead of flat plastic — this fetches a small HDR
            file from drei's asset CDN at runtime, the standard way to do
            this in r3f (not a hidden paid dependency, just a network asset). */}
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}
