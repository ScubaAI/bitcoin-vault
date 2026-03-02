'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * ParticleFieldProps - Propiedades del componente ParticleField
 * ParticleField component properties
 */
interface ParticleFieldProps {
  count?: number;
  radius?: number;
}

/**
 * ParticleField - Campo de partículas representando hashes
 * Particle field representing hashes
 * 
 * Crea un campo de partículas flotantes que simulan hashes
 * Creates a field of floating particles simulating hashes
 */
export function ParticleField({ count = 500, radius = 15 }: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generar posiciones de partículas / Generate particle positions
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    const colorPalette = [
      new THREE.Color('#f7931a'), // Bitcoin orange
      new THREE.Color('#00ff88'), // Transaction green
      new THREE.Color('#00ffff'), // Lightning cyan
      new THREE.Color('#ffffff'), // White
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Distribución esférica / Spherical distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.5 + Math.random() * 0.5);

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      // Color aleatorio de la paleta / Random color from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return { positions, colors };
  }, [count, radius]);

  // Animación / Animation
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}
