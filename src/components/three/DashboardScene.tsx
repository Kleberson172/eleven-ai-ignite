import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function DataTower() {
  const tower = useRef<THREE.Group>(null);
  const bars = useRef<THREE.Mesh[]>([]);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame((s, dt) => {
    if (tower.current) tower.current.rotation.y += dt * 0.25;
    if (ring1.current) ring1.current.rotation.z += dt * 0.6;
    if (ring2.current) ring2.current.rotation.z -= dt * 0.4;
    if (core.current) {
      const sc = 1 + Math.sin(s.clock.elapsedTime * 2) * 0.08;
      core.current.scale.setScalar(sc);
    }
    bars.current.forEach((m, i) => {
      if (!m) return;
      const h = 0.4 + (Math.sin(s.clock.elapsedTime * 1.4 + i * 0.7) * 0.5 + 0.5) * 1.6;
      m.scale.y = h;
      m.position.y = h / 2;
    });
  });

  // Circular bar chart positions
  const barCount = 18;
  const barPositions = useMemo(
    () =>
      Array.from({ length: barCount }, (_, i) => {
        const a = (i / barCount) * Math.PI * 2;
        return [Math.cos(a) * 1.6, Math.sin(a) * 1.6, a] as [number, number, number];
      }),
    [],
  );

  return (
    <group ref={tower}>
      {/* Base disc */}
      <mesh position={[0, -0.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 2.0, 64]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -0.78, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.8, 64]} />
        <meshBasicMaterial color="#00D4FF" transparent opacity={0.05} />
      </mesh>

      {/* Circular bars (radial chart) */}
      {barPositions.map(([x, z, a], i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) bars.current[i] = el; }}
          position={[x, 0, z]}
          rotation={[0, -a, 0]}
        >
          <boxGeometry args={[0.18, 1, 0.18]} />
          <meshStandardMaterial
            color="#00D4FF"
            emissive="#00D4FF"
            emissiveIntensity={1.2}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}

      {/* Pulsing core */}
      <mesh ref={core} position={[0, 0.2, 0]}>
        <icosahedronGeometry args={[0.45, 1]} />
        <meshStandardMaterial
          color="#7B61FF"
          emissive="#00D4FF"
          emissiveIntensity={1.5}
          wireframe
        />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[0.25, 24, 24]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#00D4FF" emissiveIntensity={2} />
      </mesh>

      {/* Orbital rings */}
      <mesh ref={ring1} position={[0, 0.2, 0]} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.1, 0.025, 8, 64]} />
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={1.2} />
      </mesh>
      <mesh ref={ring2} position={[0, 0.2, 0]} rotation={[Math.PI / 5, Math.PI / 4, 0]}>
        <torusGeometry args={[1.35, 0.02, 8, 64]} />
        <meshStandardMaterial color="#7B61FF" emissive="#7B61FF" emissiveIntensity={1} />
      </mesh>

      {/* Floating UI cards */}
      {[0, 1, 2].map((i) => {
        const a = (i / 3) * Math.PI * 2;
        return (
          <Float key={i} speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
            <group position={[Math.cos(a) * 2.4, 0.9 + i * 0.2, Math.sin(a) * 2.4]} rotation={[0, -a, 0]}>
              <mesh>
                <planeGeometry args={[0.9, 0.55]} />
                <meshStandardMaterial
                  color="#0A0F2E"
                  emissive="#00D4FF"
                  emissiveIntensity={0.3}
                  transparent
                  opacity={0.85}
                  side={THREE.DoubleSide}
                />
              </mesh>
              {/* card "lines" */}
              {[0.12, -0.02, -0.16].map((y, k) => (
                <mesh key={k} position={[0, y, 0.01]}>
                  <planeGeometry args={[0.7, 0.04]} />
                  <meshBasicMaterial color={k === 0 ? '#00FF88' : '#00D4FF'} transparent opacity={0.9} />
                </mesh>
              ))}
            </group>
          </Float>
        );
      })}
    </group>
  );
}

function DataParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 120;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.5 + Math.random() * 2;
      const t = Math.random() * Math.PI * 2;
      const p = (Math.random() - 0.5) * 2;
      arr[i * 3] = Math.cos(t) * r;
      arr[i * 3 + 1] = p;
      arr[i * 3 + 2] = Math.sin(t) * r;
    }
    return arr;
  }, []);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.05; });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#00D4FF" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

export function DashboardScene() {
  return (
    <Canvas camera={{ position: [3.5, 2.5, 5], fov: 45 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={1.4} color="#00D4FF" />
      <pointLight position={[-4, -2, 3]} intensity={0.8} color="#7B61FF" />
      <DataParticles />
      <DataTower />
    </Canvas>
  );
}
