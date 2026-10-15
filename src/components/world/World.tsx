"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { DEPTH, GATES, START } from "./config";

const scroll = { progress: 0, velocity: 0 };
const pointer = { x: 0, y: 0 };

// Deterministic random so the world looks the same on every visit
function rng(seed: number) {
  return () => (seed = (seed * 16807) % 2147483647) / 2147483647;
}

function useScrollTracking() {
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll.progress = max > 0 ? window.scrollY / max : 0;
      scroll.velocity = window.scrollY - last;
      last = window.scrollY;
    };
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);
}

const look = new THREE.Vector3();

function CameraRig() {
  useFrame((state, delta) => {
    const { camera } = state;
    const z = START - scroll.progress * DEPTH;
    const t = state.clock.elapsedTime;
    // gentle snake path so the flight never feels like a straight rail
    const pathX = Math.sin(z * 0.035) * 1.6;
    const pathY = Math.cos(z * 0.028) * 0.8;
    camera.position.z = THREE.MathUtils.damp(camera.position.z, z, 3.2, delta);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pathX + pointer.x * 0.9, 2.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pathY + pointer.y * 0.6 + Math.sin(t * 0.6) * 0.08, 2.5, delta);
    look.set(pathX * 0.6, pathY * 0.6, camera.position.z - 20);
    camera.lookAt(look);
    camera.rotation.z = THREE.MathUtils.damp(camera.rotation.z, -pointer.x * 0.06 - scroll.velocity * 0.0015, 3, delta);
    scroll.velocity *= 0.9;
  });
  return null;
}

function Stars({ count }: { count: number }) {
  const { positions, colors } = useMemo(() => {
    const r = rng(11);
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [new THREE.Color("#22d3ee"), new THREE.Color("#a855f7"), new THREE.Color("#e9edf9"), new THREE.Color("#5eead4")];
    for (let i = 0; i < count; i++) {
      const angle = r() * Math.PI * 2;
      const radius = 7 + r() * 70;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius * 0.7;
      pos[i * 3 + 2] = START + 30 - r() * (DEPTH + 90);
      const c = palette[Math.floor(r() * palette.length)];
      col.set([c.r, c.g, c.b], i * 3);
    }
    return { positions: pos, colors: col };
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.14} vertexColors sizeAttenuation transparent opacity={0.9} depthWrite={false} toneMapped={false} />
    </points>
  );
}

// Light streaks rushing past the camera; they speed up while you scroll.
function Warp({ count, reduced }: { count: number; reduced: boolean }) {
  const ref = useRef<THREE.LineSegments>(null);
  const data = useMemo(() => {
    const r = rng(23);
    const pos = new Float32Array(count * 6);
    const seeds = Array.from({ length: count }, () => {
      const a = r() * Math.PI * 2;
      const rad = 3.5 + r() * 14;
      return { x: Math.cos(a) * rad, y: Math.sin(a) * rad * 0.75, z: -r() * 120, len: 1 + r() * 3.5 };
    });
    return { pos, seeds };
  }, [count]);

  useFrame((state, delta) => {
    const lines = ref.current;
    if (!lines) return;
    const speed = reduced ? 0 : (6 + Math.min(Math.abs(scroll.velocity) * 4, 120)) * delta;
    const camZ = state.camera.position.z;
    const attr = lines.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    data.seeds.forEach((s, i) => {
      s.z += speed;
      if (s.z > 4) s.z -= 124;
      const z = camZ + s.z - 4;
      arr.set([s.x, s.y, z, s.x, s.y, z - s.len], i * 6);
    });
    attr.needsUpdate = true;
  });

  return (
    <lineSegments ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.pos, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#7dd3fc" transparent opacity={0.45} toneMapped={false} />
    </lineSegments>
  );
}

// A glowing portal ring you fly through between sections.
function Gate({ z, index }: { z: number; index: number }) {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const color = index % 2 ? "#a855f7" : "#22d3ee";
  const x = Math.sin(z * 0.035) * 1.6 * 0.6;
  const y = Math.cos(z * 0.028) * 0.8 * 0.6;
  useFrame((_, delta) => {
    if (outer.current) outer.current.rotation.z += delta * 0.15;
    if (inner.current) inner.current.rotation.z -= delta * 0.35;
  });
  return (
    <group position={[x, y, z]}>
      <mesh ref={outer}>
        <torusGeometry args={[7.5, 0.035, 8, 220]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh ref={inner}>
        <ringGeometry args={[6.6, 6.75, 64, 1, 0, Math.PI * 1.4]} />
        <meshBasicMaterial color="#e9edf9" transparent opacity={0.35} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      {/* tick marks */}
      {Array.from({ length: 24 }, (_, i) => {
        const a = (i / 24) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 8.1, Math.sin(a) * 8.1, 0]} rotation={[0, 0, a]}>
            <boxGeometry args={[i % 6 === 0 ? 0.6 : 0.25, 0.04, 0.04]} />
            <meshBasicMaterial color={color} transparent opacity={0.8} toneMapped={false} />
          </mesh>
        );
      })}
    </group>
  );
}

// Clusters of connected nodes floating beside the flight path.
function NeuralClusters() {
  const { points, lines } = useMemo(() => {
    const r = rng(41);
    const pts: number[] = [];
    const seg: number[] = [];
    for (let c = 0; c < 14; c++) {
      const side = c % 2 ? 1 : -1;
      const cx = side * (15 + r() * 10);
      const cy = (r() - 0.5) * 10;
      const cz = START - 30 - c * (DEPTH / 14);
      const nodes: THREE.Vector3[] = [];
      for (let i = 0; i < 26; i++) {
        nodes.push(new THREE.Vector3(cx + (r() - 0.5) * 9, cy + (r() - 0.5) * 7, cz + (r() - 0.5) * 9));
      }
      nodes.forEach((a, i) => {
        pts.push(a.x, a.y, a.z);
        let links = 0;
        for (let j = i + 1; j < nodes.length && links < 3; j++) {
          if (a.distanceTo(nodes[j]) < 4.2) {
            seg.push(a.x, a.y, a.z, nodes[j].x, nodes[j].y, nodes[j].z);
            links++;
          }
        }
      });
    }
    return { points: new Float32Array(pts), lines: new Float32Array(seg) };
  }, []);

  return (
    <group>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[points, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#5eead4" size={0.22} sizeAttenuation toneMapped={false} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#a855f7" transparent opacity={0.35} toneMapped={false} />
      </lineSegments>
    </group>
  );
}

// Neon grid floor and ceiling stretching to the horizon.
function Grids() {
  const length = DEPTH + 120;
  const centerZ = START - DEPTH / 2;
  return (
    <>
      <gridHelper args={[length, 110, "#0e5566", "#10223a"]} position={[0, -9, centerZ]} />
      <gridHelper args={[length, 55, "#3b1d5e", "#150f28"]} position={[0, 14, centerZ]} />
    </>
  );
}

// A large glowing planet / core far ahead: the destination.
function Core() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.05;
  });
  return (
    <group position={[0, 2, START - DEPTH - 40]}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[16, 3]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.35} toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[12, 48, 48]} />
        <meshBasicMaterial color="#1b0f3a" />
      </mesh>
    </group>
  );
}

export default function World() {
  useScrollTracking();
  const small = typeof window !== "undefined" && window.innerWidth < 768;
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const gates = useMemo(() => Array.from({ length: GATES }, (_, i) => START - 22 - i * (DEPTH / GATES)), []);

  return (
    <Canvas
      dpr={[1, small ? 1.25 : 1.75]}
      camera={{ position: [0, 0, START], fov: small ? 70 : 60, near: 0.1, far: 220 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#03040a"]} />
      <fog attach="fog" args={["#03040a", 20, 120]} />
      <CameraRig />
      <Stars count={small ? 2200 : 5000} />
      <Warp count={small ? 120 : 260} reduced={reduced} />
      <NeuralClusters />
      <Grids />
      {gates.map((z, i) => (
        <Gate key={z} z={z} index={i} />
      ))}
      <Core />
      {!small && (
        <EffectComposer multisampling={0}>
          <Bloom intensity={1.1} luminanceThreshold={0.15} luminanceSmoothing={0.3} mipmapBlur />
          <Vignette offset={0.25} darkness={0.75} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
