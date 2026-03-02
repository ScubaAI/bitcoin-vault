'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * LightningChannelProps - Propiedades del componente LightningChannel
 * LightningChannel component properties
 */
interface LightningChannelProps {
  startPosition: [number, number, number];
  endPosition: [number, number, number];
  capacity?: number; // En satoshis / In satoshis
  isActive?: boolean;
}

/**
 * LightningChannel - Visualización de un canal Lightning Network
 * Lightning Network channel visualization
 * 
 * Representa un canal de pago entre dos nodos con animación
 * de flujo de satoshis
 */
export function LightningChannel({
  startPosition,
  endPosition,
  capacity = 1000000,
  isActive = true,
}: LightningChannelProps) {
  const flowRef = useRef<THREE.Mesh>(null);

  // Calcular punto medio y dirección / Calculate midpoint and direction
  const { midpoint, distance } = useMemo(() => {
    const start = new THREE.Vector3(...startPosition);
    const end = new THREE.Vector3(...endPosition);
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const dist = start.distanceTo(end);
    
    return {
      midpoint: [mid.x, mid.y, mid.z] as [number, number, number],
      distance: dist,
    };
  }, [startPosition, endPosition]);

  // Animación de flujo / Flow animation
  useFrame((state) => {
    if (flowRef.current && isActive) {
      const time = state.clock.elapsedTime;
      const offset = (time * 2) % 1;
      
      const pos = new THREE.Vector3(...startPosition)
        .lerp(new THREE.Vector3(...endPosition), offset);
      
      flowRef.current.position.copy(pos);
    }
  });

  // Grosor basado en capacidad / Thickness based on capacity
  const thickness = Math.min(0.1 + Math.log10(capacity) * 0.02, 0.5);

  // Color basado en estado / Color based on state
  const color = isActive ? '#00ffff' : '#444444';

  return (
    <group>
      {/* Línea del canal / Channel line */}
      <mesh position={midpoint}>
        <cylinderGeometry args={[thickness, thickness, distance, 8]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={isActive ? 0.6 : 0.3}
          emissive={color}
          emissiveIntensity={isActive ? 0.3 : 0}
        />
      </mesh>

      {/* Partícula de flujo / Flow particle */}
      {isActive && (
        <mesh ref={flowRef}>
          <sphereGeometry args={[thickness * 2, 8, 8]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#00ffff"
            emissiveIntensity={1}
          />
        </mesh>
      )}

      {/* Nodos del canal / Channel nodes */}
      <mesh position={startPosition}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#f7931a" emissive="#441100" emissiveIntensity={0.3} />
      </mesh>
      
      <mesh position={endPosition}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#f7931a" emissive="#441100" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}
