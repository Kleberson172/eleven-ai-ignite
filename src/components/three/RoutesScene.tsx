import { Canvas, useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

const POINTS: [number, number][] = [
  [-3.5, -1.5], [-2, 1.5], [0, -1], [1.5, 2], [3, 0.5], [2.5, -2], [-1, 2.2],
];

function Truck({ path }: { path: THREE.Vector3[] }) {
  const ref = useRef<THREE.Mesh>(null);
  const t = useRef(0);
  useFrame((_, dt) => {
    if (!ref.current || path.length < 2) return;
    t.current = (t.current + dt * 0.08) % 1;
    const idx = t.current * (path.length - 1);
    const i = Math.floor(idx);
    const f = idx - i;
    const a = path[i];
    const b = path[Math.min(i + 1, path.length - 1)];
    ref.current.position.lerpVectors(a, b, f);
  });
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.3, 0.15, 0.2]} />
      <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={1} />
    </mesh>
  );
}

export function RoutesScene() {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setVisible((v) => (v >= POINTS.length ? 1 : v + 1)), 600);
    return () => clearInterval(id);
  }, []);

  const pts = useMemo(() => POINTS.map(([x, y]) => new THREE.Vector3(x, y, 0)), []);

  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 50 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.6} />
      {/* grid */}
      <gridHelper args={[20, 20, '#00D4FF', '#1a2452']} rotation={[Math.PI / 2, 0, 0]} />
      {pts.slice(0, visible).map((p, i) => (
        <group key={i} position={p}>
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={1.2} />
          </mesh>
          <mesh>
            <ringGeometry args={[0.2, 0.28, 32]} />
            <meshBasicMaterial color="#00D4FF" transparent opacity={0.4} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
      {visible >= 2 && (
        <Line points={pts.slice(0, visible)} color="#00D4FF" lineWidth={3} transparent opacity={0.9} />
      )}
      {visible === POINTS.length && <Truck path={pts} />}
    </Canvas>
  );
}
