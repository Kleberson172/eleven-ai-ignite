import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, Line } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function Globe() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.1; });

  // African cities (lat, lon) approx
  const cities = [
    [-8.84, 13.23],   // Luanda
    [30.04, 31.23],   // Cairo
    [-1.29, 36.82],   // Nairobi
    [-26.20, 28.04],  // Joburg
    [6.52, 3.38],     // Lagos
    [14.69, -17.44],  // Dakar
    [9.03, 38.74],    // Addis
    [-4.44, 15.27],   // Kinshasa
  ];
  const r = 2;
  const toVec = (lat: number, lon: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta),
    );
  };
  const points = cities.map(([la, lo]) => toVec(la, lo));
  const lines = useMemo(() => {
    const arr: [THREE.Vector3, THREE.Vector3][] = [];
    for (let i = 0; i < points.length; i++) {
      arr.push([points[0], points[i]]);
      if (i > 0) arr.push([points[i], points[(i + 2) % points.length]]);
    }
    return arr;
  }, []);

  return (
    <group ref={ref}>
      <Sphere args={[r, 48, 48]}>
        <meshStandardMaterial color="#0A0F2E" wireframe transparent opacity={0.4} emissive="#00D4FF" emissiveIntensity={0.2} />
      </Sphere>
      <Sphere args={[r * 0.99, 48, 48]}>
        <meshBasicMaterial color="#001a2e" transparent opacity={0.6} />
      </Sphere>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshBasicMaterial color="#00D4FF" />
        </mesh>
      ))}
      {lines.map(([a, b], i) => {
        const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(r * 1.4);
        const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
        const pts = curve.getPoints(30);
        return <Line key={i} points={pts} color="#00D4FF" lineWidth={1} transparent opacity={0.5} />;
      })}
    </group>
  );
}

function ParticleRain() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = Math.random() * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return arr;
  }, []);
  useFrame(() => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      let y = pos.getY(i) - 0.02;
      if (y < -5) y = 8;
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });
  return (
    <Points ref={ref} positions={positions}>
      <PointMaterial transparent color="#00D4FF" size={0.03} sizeAttenuation depthWrite={false} opacity={0.8} />
    </Points>
  );
}

function Parallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });
  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += (target.current.x * 0.3 - ref.current.rotation.y) * 0.05;
    ref.current.rotation.x += (target.current.y * 0.2 - ref.current.rotation.x) * 0.05;
  });
  return (
    <group
      ref={ref}
      onPointerMove={(e) => {
        target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        target.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
      }}
    >
      {children}
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 55 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00D4FF" />
      <pointLight position={[-5, -3, 4]} intensity={0.6} color="#7B61FF" />
      <Parallax>
        <Globe />
        <ParticleRain />
      </Parallax>
    </Canvas>
  );
}
