"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial, Sphere } from "@react-three/drei";
import type { Mesh } from "three";

export type BlobState = "idle" | "thinking" | "speaking";

// Distortion/rotation-speed targets per interaction state — the blob is the
// visual embodiment of the AI guide, so it needs to visibly react: idle
// (slow, brief's baseline motion), thinking (faster spin, more turbulent
// distortion while the request is in flight), speaking (a gentle pulse
// while the reply is on screen).
const STATE_PARAMS: Record<BlobState, { spin: number; distortion: number }> = {
  idle: { spin: 0.15, distortion: 0.4 },
  thinking: { spin: 0.9, distortion: 0.75 },
  speaking: { spin: 0.35, distortion: 0.55 },
};

function Blob({ state }: { state: BlobState }) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<{ distortion: number } | null>(null);
  const current = useRef(STATE_PARAMS.idle.distortion);

  useFrame((frameState, delta) => {
    const target = STATE_PARAMS[state];
    if (meshRef.current) meshRef.current.rotation.y += delta * target.spin;
    // Ease distortion toward the target instead of snapping — a state
    // change should feel like the blob reacting, not a hard cut.
    current.current += (target.distortion - current.current) * Math.min(1, delta * 3);
    if (materialRef.current) materialRef.current.distortion = current.current;
    // Speaking gets a slow breathing scale pulse.
    if (meshRef.current) {
      const pulse = state === "speaking" ? 1 + Math.sin(frameState.clock.elapsedTime * 2.5) * 0.03 : 1;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.4, 128, 128]}>
      <MeshTransmissionMaterial
        ref={materialRef as never}
        distortion={STATE_PARAMS.idle.distortion}
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

export function HeroBlob({ state = "idle" }: { state?: BlobState }) {
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
        <Blob state={state} />
        {/* Environment reflections make MeshTransmissionMaterial read as
            actual glass instead of flat plastic — this fetches a small HDR
            file from drei's asset CDN at runtime, the standard way to do
            this in r3f (not a hidden paid dependency, just a network asset). */}
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}
