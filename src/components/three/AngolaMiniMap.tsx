import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Html } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { ANGOLA_RINGS } from '../../lib/angola-geo';

const CITIES = [
  { name: 'Luanda', lon: 13.23, lat: -8.84, big: true },
  { name: 'Huambo', lon: 15.74, lat: -12.78 },
  { name: 'Lubango', lon: 13.49, lat: -14.92 },
  { name: 'Benguela', lon: 13.41, lat: -12.58 },
  { name: 'Malanje', lon: 16.34, lat: -9.54 },
  { name: 'Cabinda', lon: 12.20, lat: -5.0 },
  { name: 'Namibe', lon: 12.15, lat: -15.20 },
  { name: 'Menongue', lon: 17.69, lat: -14.66 },
];

// compute bounds and projection to fit ~12 wide
const allPts = ANGOLA_RINGS.flat();
const lons = allPts.map(([lo]) => lo);
const lats = allPts.map(([, la]) => la);
const minLon = Math.min(...lons), maxLon = Math.max(...lons);
const minLat = Math.min(...lats), maxLat = Math.max(...lats);
const cxLon = (minLon + maxLon) / 2;
const cyLat = (minLat + maxLat) / 2;
const SCALE = 10 / Math.max(maxLon - minLon, maxLat - minLat);
const project = (lon: number, lat: number): [number, number] => [
  (lon - cxLon) * SCALE,
  (lat - cyLat) * -SCALE,
];

const RINGS_3D = ANGOLA_RINGS.map((ring) =>
  ring.map(([lo, la]) => {
    const [x, y] = project(lo, la);
    return new THREE.Vector3(x, y, 0);
  })
);

// largest ring = mainland; build shape for fill
const mainland = [...RINGS_3D].sort((a, b) => b.length - a.length)[0];
const SHAPE = new THREE.Shape(mainland.map((v) => new THREE.Vector2(v.x, v.y)));

const CITY_DATA = CITIES.map((c) => {
  const [x, y] = project(c.lon, c.lat);
  return { ...c, pos: new THREE.Vector3(x, y, 0.15) };
});

function ArcLine({ a, b, delay = 0 }: { a: THREE.Vector3; b: THREE.Vector3; delay?: number }) {
  const points = useMemo(() => {
    const mid = a.clone().add(b).multiplyScalar(0.5);
    mid.z = a.distanceTo(b) * 0.4;
    return new THREE.QuadraticBezierCurve3(a, mid, b).getPoints(40);
  }, [a, b]);
  const ref = useRef<any>(null);
  useFrame((s) => {
    if (ref.current?.material) {
      const t = (Math.sin(s.clock.elapsedTime * 0.8 + delay) + 1) / 2;
      ref.current.material.opacity = 0.2 + t * 0.5;
    }
  });
  return <Line ref={ref} points={points} color="#A855F7" lineWidth={1.2} transparent opacity={0.5} />;
}

function CityMarker({ city, delay }: { city: typeof CITY_DATA[0]; delay: number }) {
  const ring = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    const t = s.clock.elapsedTime;
    const r1 = ((t + delay) % 2.5) / 2.5;
    const r2 = ((t + delay + 1.2) % 2.5) / 2.5;
    if (ring.current) {
      ring.current.scale.setScalar(1 + r1 * 3);
      (ring.current.material as THREE.MeshBasicMaterial).opacity = (1 - r1) * 0.7;
    }
    if (ring2.current) {
      ring2.current.scale.setScalar(1 + r2 * 3);
      (ring2.current.material as THREE.MeshBasicMaterial).opacity = (1 - r2) * 0.5;
    }
    if (core.current) core.current.scale.setScalar(1 + Math.sin(t * 2.5 + delay) * 0.25);
  });
  const size = city.big ? 0.13 : 0.09;
  return (
    <group position={city.pos}>
      <mesh ref={core}>
        <sphereGeometry args={[size, 24, 24]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#00D4FF" emissiveIntensity={3} toneMapped={false} />
      </mesh>
      <mesh ref={ring} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[size * 1.1, size * 1.4, 48]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.7} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[size * 1.1, size * 1.3, 48]} />
        <meshBasicMaterial color="#A855F7" transparent opacity={0.5} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, 0.4]}>
        <cylinderGeometry args={[size * 0.3, size * 0.05, 0.8, 12, 1, true]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.25} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      <Html position={[0, -0.3, 0]} center
        style={{
          color: '#7FE8FF', fontSize: city.big ? '11px' : '9px', fontWeight: 700,
          letterSpacing: '0.08em', textShadow: '0 0 8px #00D4FF, 0 0 2px #000',
          fontFamily: 'Inter, sans-serif', whiteSpace: 'nowrap', pointerEvents: 'none', opacity: 0.9,
        }}>
        {city.name.toUpperCase()}
      </Html>
    </group>
  );
}

function Particles() {
  const pts = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(120 * 3);
    for (let i = 0; i < 120; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = Math.random() * 2 - 0.5;
    }
    return arr;
  }, []);
  useFrame((s) => { if (pts.current) pts.current.rotation.z = s.clock.elapsedTime * 0.02; });
  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#00D4FF" size={0.04} transparent opacity={0.6} toneMapped={false} />
    </points>
  );
}

function Map({ rotate = true, showLabels = true, showArcs = true }: { rotate?: boolean; showLabels?: boolean; showArcs?: boolean }) {
  const g = useRef<THREE.Group>(null);
  const scan = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (rotate && g.current) {
      g.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.2) * 0.22;
      g.current.rotation.x = -0.25 + Math.sin(s.clock.elapsedTime * 0.15) * 0.05;
    }
    if (scan.current) scan.current.position.y = ((s.clock.elapsedTime * 0.6) % 10) - 5;
  });
  const luanda = CITY_DATA[0].pos;

  return (
    <group ref={g}>
      <mesh position={[0, 0, -0.2]}>
        <circleGeometry args={[6, 64]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.04} toneMapped={false} />
      </mesh>

      {/* Filled real shape */}
      <mesh position={[0, 0, -0.04]}>
        <shapeGeometry args={[SHAPE]} />
        <meshBasicMaterial color="#0A2452" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, -0.02]}>
        <shapeGeometry args={[SHAPE]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.1} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>

      {/* Real borders — all rings (mainland + Cabinda etc.) */}
      {RINGS_3D.map((ring, i) => (
        <group key={i}>
          <Line points={ring} color="#A855F7" lineWidth={9} transparent opacity={0.18} />
          <Line points={ring} color="#00D4FF" lineWidth={3.5} transparent opacity={0.6} />
          <Line points={ring} color="#FFFFFF" lineWidth={1.2} transparent opacity={0.95} />
        </group>
      ))}

      {/* Scan line */}
      <mesh ref={scan} position={[0, 0, 0.01]}>
        <planeGeometry args={[14, 0.06]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.55} toneMapped={false} />
      </mesh>

      {showArcs && CITY_DATA.slice(1).map((c, i) => (
        <ArcLine key={c.name} a={luanda} b={c.pos} delay={i * 0.7} />
      ))}

      {CITY_DATA.map((c, i) => (
        showLabels
          ? <CityMarker key={c.name} city={c} delay={i * 0.35} />
          : <CityMarker key={c.name} city={{ ...c, name: '' }} delay={i * 0.35} />
      ))}

      <Particles />
    </group>
  );
}

export function AngolaMiniMap() {
  return (
    <Canvas camera={{ position: [0, 0, 9], fov: 42 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 4, 5]} intensity={1.4} color="#00D4FF" />
      <pointLight position={[-4, -3, 3]} intensity={1} color="#A855F7" />
      <Map />
    </Canvas>
  );
}

export function AngolaRealMap() {
  return (
    <Canvas camera={{ position: [0, 0, 8.5], fov: 42 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 5]} intensity={1.5} color="#00D4FF" />
      <pointLight position={[-4, -3, 3]} intensity={1} color="#A855F7" />
      <Map rotate={false} />
    </Canvas>
  );
}
