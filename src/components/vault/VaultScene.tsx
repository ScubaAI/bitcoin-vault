'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Block } from './Block';
import { Transaction } from './Transaction';
import { MerkleTree } from './MerkleTree';
import { ParticleField } from './ParticleField';

/**
 * VaultScene - Escena 3D principal del vault
 * Main 3D vault scene component
 * 
 * Renderiza la escena completa con bloques, transacciones,
 * árbol Merkle y efectos visuales
 */
export function VaultScene() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Datos simulados de bloques / Mock block data
  const blocks = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      id: `block-${i}`,
      height: 800000 + i,
      hash: `0000000000000000000${i}abc123`,
      position: [0, i * 2.5, 0] as [number, number, number],
      transactions: Math.floor(Math.random() * 3000) + 1000,
      timestamp: Date.now() - i * 600000,
    }));
  }, []);

  // Animación de rotación suave / Smooth rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Campo de partículas de fondo / Background particle field */}
      <ParticleField count={1000} radius={20} />
      
      {/* Estructura de bloques / Block structure */}
      {blocks.map((block, index) => (
        <Block
          key={block.id}
          {...block}
          isSelected={index === 0}
        />
      ))}
      
      {/* Transacciones flotantes / Floating transactions */}
      {blocks.map((block, blockIndex) => (
        <Transaction
          key={`tx-${block.id}`}
          blockPosition={block.position}
          blockIndex={blockIndex}
        />
      ))}
      
      {/* Árbol Merkle visual / Visual Merkle tree */}
      <MerkleTree
        position={[5, 5, 0]}
        scale={0.5}
      />
      
      {/* Suelo reflectante / Reflective floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Grid helper para referencia / Grid helper for reference */}
      <gridHelper args={[50, 50, '#333333', '#222222']} position={[0, -1.9, 0]} />
    </group>
  );
}
