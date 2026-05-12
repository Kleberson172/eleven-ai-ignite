import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Html } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

// More detailed Angola border (lon, lat)
const ANGOLA_BORDER_RAW: [number, number][] = [
  // Cabinda exclave
  [12.0, -4.4], [12.5, -4.4], [12.9, -4.6], [13.1, -4.6], [13.1, -5.0], [12.9, -5.2], [12.5, -5.2],
  // gap then mainland north
  [12.4, -5.7], [12.8, -5.9], [13.2, -5.9], [13.4, -6.0], [13.7, -6.4], [14.5, -6.0], [15.5, -6.0],
  [16.2, -5.9], [16.8, -7.2], [17.6, -8.1], [18.5, -8.0], [19.5, -7.3], [20.5, -7.2], [21.8, -7.3],
  // East border
  [22.5, -8.0], [22.0, -9.0], [22.3, -10.0], [22.0, -11.2], [22.5, -12.5], [22.0, -13.5],
  [22.5, -14.5], [23.4, -15.0], [23.5, -16.5], [22.5, -16.8], [21.0, -16.5],
  // South border
  [20.0, -17.4], [18.5, -17.4], [17.0, -17.4], [15.5, -17.4], [14.0, -17.4], [12.5, -17.2],
  // West coast (south to north)
  [12.0, -16.5], [11.8, -15.5], [12.2, -14.5], [12.7, -13.5], [13.0, -12.5], [13.3, -12.0],
  [13.5, -11.0], [13.0, -10.0], [12.8, -9.2], [13.3, -8.5], [13.0, -7.5], [12.5, -6.7], [12.4, -5.9],
];

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

const SCALE = 0.55, CX = 17.5, CY = -11.2;
const project = (lon: number, lat: number): [number, number] => [(lon - CX) * SCALE, (lat - CY) * -SCALE];
const BORDER = ANGOLA_BORDER_RAW.map(([lo, la]) => { const [x, y] = project(lo, la); return new THREE.Vector3(x, y, 0); });

// build a 2D shape for filled interior
const SHAPE = new THREE.Shape(BORDER.map((v) => new THREE.Vector2(v.x, v.y)));

const CITY_DATA = CITIES.map((c) => {
  const [x, y] = project(c.lon, c.lat);
  return { ...c, pos: new THREE.Vector3(x, y, 0.15) };
});

function ArcLine({ a, b, color = '#A855F7', delay = 0 }: { a: THREE.Vector3; b: THREE.Vector3; color?: string; delay?: number }) {
  const points = useMemo(() => {
    const mid = a.clone().add(b).multiplyScalar(0.5);
    const dist = a.distanceTo(b);
    mid.z = dist * 0.4;
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
    return curve.getPoints(40);
  }, [a, b]);
  const ref = useRef<any>(null);
  useFrame((s) => {
    if (ref.current?.material) {
      const t = (Math.sin(s.clock.elapsedTime * 0.8 + delay) + 1) / 2;
      ref.current.material.opacity = 0.2 + t * 0.5;
    }
  });
  return <Line ref={ref} points={points} color={color} lineWidth={1.2} transparent opacity={0.5} />;
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
    if (core.current) {
      const p = 1 + Math.sin(t * 2.5 + delay) * 0.25;
      core.current.scale.setScalar(p);
    }
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
      {/* light beam upward */}
      <mesh position={[0, 0, 0.4]}>
        <cylinderGeometry args={[size * 0.3, size * 0.05, 0.8, 12, 1, true]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.25} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      <Html
        position={[0, -0.3, 0]}
        center
        style={{
          color: '#7FE8FF',
          fontSize: city.big ? '11px' : '9px',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textShadow: '0 0 8px #00D4FF, 0 0 2px #000',
          fontFamily: 'Inter, sans-serif',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          opacity: 0.9,
        }}
      >
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
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = Math.random() * 2 - 0.5;
    }
    return arr;
  }, []);
  useFrame((s) => {
    if (!pts.current) return;
    pts.current.rotation.z = s.clock.elapsedTime * 0.02;
  });
  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#00D4FF" size={0.04} transparent opacity={0.6} toneMapped={false} />
    </points>
  );
}

function Map() {
  const g = useRef<THREE.Group>(null);
  const scan = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (g.current) {
      g.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.2) * 0.25;
      g.current.rotation.x = -0.3 + Math.sin(s.clock.elapsedTime * 0.15) * 0.06;
    }
    if (scan.current) {
      scan.current.position.y = ((s.clock.elapsedTime * 0.6) % 8) - 4;
    }
  });

  // arcs between Luanda and others
  const luanda = CITY_DATA[0].pos;

  return (
    <group ref={g}>
      {/* outer glow halo */}
      <mesh position={[0, 0, -0.2]}>
        <circleGeometry args={[5, 64]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.04} toneMapped={false} />
      </mesh>

      {/* Filled interior (gradient via two layers) */}
      <mesh position={[0, 0, -0.04]}>
        <shapeGeometry args={[SHAPE]} />
        <meshBasicMaterial color="#0A2452" transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, -0.02]}>
        <shapeGeometry args={[SHAPE]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.08} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>

      {/* Border with double stroke for neon feel */}
      <Line points={BORDER} color="#A855F7" lineWidth={9} transparent opacity={0.18} />
      <Line points={BORDER} color="#00D4FF" lineWidth={4} transparent opacity={0.55} />
      <Line points={BORDER} color="#FFFFFF" lineWidth={1.5} transparent opacity={0.95} />

      {/* Scan line sweeping across */}
      <mesh ref={scan} position={[0, 0, 0.01]}>
        <planeGeometry args={[14, 0.06]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.6} toneMapped={false} />
      </mesh>

      {/* Connection arcs from Luanda */}
      {CITY_DATA.slice(1).map((c, i) => (
        <ArcLine key={c.name} a={luanda} b={c.pos} delay={i * 0.7} />
      ))}

      {/* Cities */}
      {CITY_DATA.map((c, i) => (
        <CityMarker key={c.name} city={c} delay={i * 0.35} />
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
      <pointLight position={[0, 0, 4]} intensity={0.6} color="#FFFFFF" />
      <Map />
    </Canvas>
  );
}
