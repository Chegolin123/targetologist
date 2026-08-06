"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import type * as THREE from "three";
import { AMBER_HEX, AMBER_DARK_HEX } from "@/lib/theme";
import { useReducedMotion } from "motion/react";

/**
 * Abstract 3D geometric forms — "data / traffic flow" visualisation.
 * Lazy-loaded, never blocks page render.
 */
export function HeroScene() {
  const reducedMotion = useReducedMotion();

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color={AMBER_HEX} />
      <pointLight position={[-3, -2, 4]} intensity={0.5} color={AMBER_DARK_HEX} />
      <GeometricShapes reducedMotion={reducedMotion ?? false} />
    </Canvas>
  );
}

function GeometricShapes({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current && !reducedMotion) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x += delta * 0.03;
    }
  });

  const shapes = useMemo(
    () => [
      { pos: [1.8, 0.5, 0] as const, scale: 0.6, color: AMBER_HEX, distort: 0.15 },
      { pos: [-1.5, -0.8, -0.5] as const, scale: 0.5, color: AMBER_DARK_HEX, distort: 0.2 },
      { pos: [-0.8, 1.2, -1] as const, scale: 0.4, color: "#E09C3E", distort: 0.12 },
      { pos: [0.5, -1.0, 0.5] as const, scale: 0.35, color: AMBER_HEX, distort: 0.18 },
    ],
    []
  );

  return (
    <group ref={groupRef}>
      {shapes.map((s, i) => (
        <Float
          key={i}
          speed={1.5 + i * 0.3}
          rotationIntensity={0.3}
          floatIntensity={0.4}
          enabled={!reducedMotion}
        >
          <mesh position={s.pos} scale={s.scale}>
            {i % 2 === 0 ? (
              <torusGeometry args={[0.7, 0.15, 16, 32]} />
            ) : (
              <octahedronGeometry args={[0.65, 0]} />
            )}
            <MeshDistortMaterial
              color={s.color}
              distort={s.distort}
              speed={1 + i * 0.5}
              roughness={0.3}
              metalness={0.1}
              transparent
              opacity={0.75}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}
