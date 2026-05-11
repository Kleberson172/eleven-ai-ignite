import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function Dashboard() {
  const ref = useRef<THREE.Group>(null);
  const bars = useRef<THREE.Mesh[]>([]);
  useFrame((s, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.15;
    bars.current.forEach((m, i) => {
      if (!m) return;
      const h = 0.6 + Math.abs(Math.sin(s.clock.elapsedTime + i)) * 1.2;
      m.scale.y = h;
      m.position.y = h / 2 - 0.5;
    });
  });
  return (
    <group ref={ref}>
      {/* main panel */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 2.4, 0.05]} />
        <meshStandardMaterial color="#0A0F2E" emissive="#00D4FF" emissiveIntensity={0.15} transparent opacity={0.9} />
      </mesh>
      {/* bars */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) bars.current[i] = el; }}
          position={[-1.5 + i * 0.75, 0, 0.05]}
        >
          <boxGeometry args={[0.4, 1, 0.1]} />
          <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.8} />
        </mesh>
      ))}
      {/* orbiting elements */}
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 3, Math.sin(a) * 1.6, 0.4]}>
            <boxGeometry args={[0.5, 0.3, 0.05]} />
            <meshStandardMaterial color="#7B61FF" emissive="#7B61FF" emissiveIntensity={0.6} transparent opacity={0.85} />
          </mesh>
        );
      })}
    </group>
  );
}

export function DashboardScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.5} />
      <pointLight position={[3, 3, 5]} intensity={1.2} color="#00D4FF" />
      <pointLight position={[-3, -3, 4]} intensity={0.8} color="#7B61FF" />
      <Dashboard />
    </Canvas>
  );
}
