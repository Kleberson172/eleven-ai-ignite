import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const ANGOLA_BORDER_RAW: [number, number][] = [
  [12.0, -5.0], [13.4, -4.4], [13.7, -5.0], [13.0, -5.9], [12.5, -6.0],
  [12.2, -6.5], [12.8, -7.5], [13.0, -8.5], [12.5, -9.5], [13.2, -10.8],
  [13.5, -12.0], [13.0, -13.0], [12.5, -14.0], [12.0, -15.5], [11.7, -17.2],
  [12.5, -17.4], [14.0, -17.4], [16.0, -17.4], [18.0, -17.4], [20.0, -17.4],
  [22.0, -17.0], [23.5, -17.5], [23.5, -16.0], [22.0, -13.5], [22.0, -11.0],
  [22.5, -10.0], [22.0, -9.0], [21.0, -7.5], [20.0, -7.0], [19.0, -7.5],
  [17.5, -8.0], [16.5, -7.5], [16.0, -6.0], [15.0, -5.0], [13.5, -5.0],
  [12.5, -5.5], [12.0, -5.0],
];

const CITIES: [number, number][] = [
  [13.23, -8.84], [15.74, -12.78], [13.49, -14.92], [13.41, -12.58],
  [16.34, -9.54], [12.20, -5.55], [12.15, -15.20], [17.69, -14.66],
];

const SCALE = 0.55, CX = 17.5, CY = -11.2;
const project = (lon: number, lat: number): [number, number] => [(lon - CX) * SCALE, (lat - CY) * -SCALE];
const BORDER = ANGOLA_BORDER_RAW.map(([lo, la]) => { const [x, y] = project(lo, la); return new THREE.Vector3(x, y, 0); });
const CITY_PTS = CITIES.map(([lo, la]) => { const [x, y] = project(lo, la); return new THREE.Vector3(x, y, 0.1); });

function CityDot({ pos, delay }: { pos: THREE.Vector3; delay: number }) {
  const ring = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    const t = (s.clock.elapsedTime + delay) % 2.5;
    if (ring.current) {
      const sc = 1 + t * 2;
      ring.current.scale.setScalar(sc);
      (ring.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.8 - t / 2.5);
    }
    if (core.current) {
      const p = 1 + Math.sin(s.clock.elapsedTime * 2 + delay) * 0.2;
      core.current.scale.setScalar(p);
    }
  });
  return (
    <group position={pos}>
      <mesh ref={core}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={2.5} />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.12, 32]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Map() {
  const g = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (!g.current) return;
    g.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.25) * 0.35;
    g.current.rotation.x = -0.35 + Math.sin(s.clock.elapsedTime * 0.18) * 0.08;
    g.current.rotation.z = Math.sin(s.clock.elapsedTime * 0.15) * 0.05;
  });
  return (
    <group ref={g}>
      <Line points={BORDER} color="#00D4FF" lineWidth={2} transparent opacity={0.7} />
      <Line points={BORDER} color="#A855F7" lineWidth={5} transparent opacity={0.18} />
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[14, 10]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.025} />
      </mesh>
      {CITY_PTS.map((p, i) => <CityDot key={i} pos={p} delay={i * 0.3} />)}
    </group>
  );
}

export function AngolaMiniMap() {
  return (
    <Canvas camera={{ position: [0, 0, 9], fov: 40 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 5]} intensity={1.2} color="#00D4FF" />
      <pointLight position={[-4, -3, 3]} intensity={0.8} color="#A855F7" />
      <Map />
    </Canvas>
  );
}
