import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

// Simplified Angola border outline (lon, lat) — normalized to fit canvas
const ANGOLA_BORDER_RAW: [number, number][] = [
  [12.0, -5.0], [13.4, -4.4], [13.7, -5.0], [13.0, -5.9], [12.5, -6.0], // Cabinda + coast
  [12.2, -6.5], [12.8, -7.5], [13.0, -8.5], [12.5, -9.5], [13.2, -10.8],
  [13.5, -12.0], [13.0, -13.0], [12.5, -14.0], [12.0, -15.5], [11.7, -17.2], // SW coast
  [12.5, -17.4], [14.0, -17.4], [16.0, -17.4], [18.0, -17.4], [20.0, -17.4],
  [22.0, -17.0], [23.5, -17.5], [23.5, -16.0], [22.0, -13.5], [22.0, -11.0], // E border
  [22.5, -10.0], [22.0, -9.0], [21.0, -7.5], [20.0, -7.0], [19.0, -7.5],
  [17.5, -8.0], [16.5, -7.5], [16.0, -6.0], [15.0, -5.0], [13.5, -5.0],
  [12.5, -5.5], [12.0, -5.0],
];

// Major Angolan cities (lon, lat, name)
const CITIES: { name: string; lon: number; lat: number }[] = [
  { name: 'Luanda', lon: 13.23, lat: -8.84 },
  { name: 'Huambo', lon: 15.74, lat: -12.78 },
  { name: 'Lubango', lon: 13.49, lat: -14.92 },
  { name: 'Benguela', lon: 13.41, lat: -12.58 },
  { name: 'Malanje', lon: 16.34, lat: -9.54 },
  { name: 'Cabinda', lon: 12.20, lat: -5.55 },
  { name: 'Namibe', lon: 12.15, lat: -15.20 },
  { name: 'Menongue', lon: 17.69, lat: -14.66 },
];

// Project lon/lat into scene coords
const SCALE = 0.55;
const CX = 17.5;
const CY = -11.2;
const project = (lon: number, lat: number): [number, number] => [
  (lon - CX) * SCALE,
  (lat - CY) * -SCALE,
];

const BORDER = ANGOLA_BORDER_RAW.map(([lo, la]) => {
  const [x, y] = project(lo, la);
  return new THREE.Vector3(x, y, 0);
});
const CITY_PTS = CITIES.map((c) => {
  const [x, y] = project(c.lon, c.lat);
  return new THREE.Vector3(x, y, 0.05);
});

// Route order between cities (Luanda -> ... -> back)
const ROUTE_ORDER = [0, 4, 1, 3, 6, 2, 7, 5, 0];

function Truck({ path }: { path: THREE.Vector3[] }) {
  const ref = useRef<THREE.Group>(null);
  const t = useRef(0);
  useFrame((_, dt) => {
    if (!ref.current || path.length < 2) return;
    t.current = (t.current + dt * 0.06) % 1;
    const idx = t.current * (path.length - 1);
    const i = Math.floor(idx);
    const f = idx - i;
    const a = path[i];
    const b = path[Math.min(i + 1, path.length - 1)];
    ref.current.position.lerpVectors(a, b, f);
    ref.current.position.z = 0.15;
  });
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#00D4FF" emissiveIntensity={2} />
      </mesh>
      <mesh>
        <ringGeometry args={[0.18, 0.28, 32]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function PulsingPoint({ position, delay = 0 }: { position: THREE.Vector3; delay?: number }) {
  const ring = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ring.current) return;
    const t = (s.clock.elapsedTime + delay) % 2;
    const scale = 1 + t * 1.5;
    ring.current.scale.setScalar(scale);
    (ring.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - t / 2);
  });
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={1.5} />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, 0.14, 32]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function AngolaMap() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(s.clock.elapsedTime * 0.2) * 0.03;
    }
  });

  // Animate route reveal
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => (p >= ROUTE_ORDER.length ? 2 : p + 1));
    }, 700);
    return () => clearInterval(id);
  }, []);

  const routePts = ROUTE_ORDER.slice(0, progress).map((i) => CITY_PTS[i]);
  const fullRoute = ROUTE_ORDER.map((i) => CITY_PTS[i]);

  return (
    <group ref={groupRef}>
      {/* Filled glow under map */}
      <mesh position={[0, 0, -0.3]}>
        <planeGeometry args={[14, 10]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.04} />
      </mesh>

      {/* Border outline */}
      <Line points={BORDER} color="#00D4FF" lineWidth={2.5} transparent opacity={0.95} />
      <Line points={BORDER} color="#7B61FF" lineWidth={6} transparent opacity={0.15} />

      {/* Cities */}
      {CITY_PTS.map((p, i) => (
        <PulsingPoint key={i} position={p} delay={i * 0.25} />
      ))}

      {/* Route */}
      {routePts.length >= 2 && (
        <Line points={routePts} color="#00FF88" lineWidth={3} transparent opacity={1} />
      )}

      {/* Truck on full route once complete */}
      {progress >= ROUTE_ORDER.length && <Truck path={fullRoute} />}

      {/* "ANGOLA" floating label dot */}
      <mesh position={[0, 0.5, 0.05]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );
}

export function RoutesScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.7} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00D4FF" />
      <pointLight position={[-5, -5, 3]} intensity={0.6} color="#7B61FF" />
      {/* subtle grid */}
      <gridHelper args={[24, 24, '#0a2452', '#0a2452']} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.4]} />
      <AngolaMap />
    </Canvas>
  );
}
