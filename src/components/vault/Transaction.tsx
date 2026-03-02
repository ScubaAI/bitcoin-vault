'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Trail } from '@react-three/drei';
import * as THREE from 'three';

/**
 * TransactionProps - Propiedades del componente Transaction
 */
interface TransactionProps {
  blockPosition: [number, number, number];
  blockIndex: number;
  count?: number;
}

/**
 * ⚡ Transaction - Componente de transacciones flotantes
 * 
 * Representa transacciones orbitando alrededor de un bloque
 * con efectos de trail y glow kawaii~!
 */
export function Transaction({ 
  blockPosition, 
  blockIndex,
  count = 12 
}: TransactionProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Colores kawaii para diferentes tipos de TX
  const txColors = useMemo(() => [
    { primary: '#F7931A', emissive: '#FFB347', name: 'orange' },    // Standard
    { primary: '#A855F7', emissive: '#C084FC', name: 'purple' },    // SegWit
    { primary: '#00F5FF', emissive: '#67E8F9', name: 'cyan' },      // Taproot
    { primary: '#FF6B9D', emissive: '#FFB3D9', name: 'pink' },      // Lightning
  ], []);

  // Generar partículas de transacción con variedad
  const transactions = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: `tx-${blockIndex}-${i}`,
      angle: (i / count) * Math.PI * 2,
      radius: 2 + Math.random() * 1.5,
      speed: 0.3 + Math.random() * 0.4,
      size: 0.06 + Math.random() * 0.08,
      colorIndex: Math.floor(Math.random() * txColors.length),
      value: Math.floor(Math.random() * 100000) + 1000, // Sats
      isLightning: Math.random() > 0.8, // 20% chance de ser Lightning
    }));
  }, [blockIndex, count, txColors.length]);

  // Animación de órbita global
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group 
      ref={groupRef}
      position={blockPosition}
    >
      {transactions.map((tx) => (
        <TransactionParticle
          key={tx.id}
          {...tx}
          colors={txColors[tx.colorIndex]}
          timeOffset={blockIndex}
        />
      ))}
      
      {/* Anillo de órbita decorativo */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.5, 0.01, 8, 64]} />
        <meshBasicMaterial
          color="#F7931A"
          transparent
          opacity={0.15}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.5, 0.01, 8, 64]} />
        <meshBasicMaterial
          color="#A855F7"
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
}

/**
 * ✨ TransactionParticle - Partícula individual de transacción
 */
interface TransactionParticleProps {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  colors: { primary: string; emissive: string; name: string };
  timeOffset: number;
  value: number;
  isLightning: boolean;
}

function TransactionParticle({
  angle,
  radius,
  speed,
  size,
  colors,
  timeOffset,
  value,
  isLightning,
}: TransactionParticleProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const trailRef = useRef<THREE.Vector3>(new THREE.Vector3());

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * speed + timeOffset * 0.5;
      
      // Movimiento orbital con variación
      const x = Math.cos(angle + time) * radius;
      const z = Math.sin(angle + time) * radius;
      const y = Math.sin(time * 2 + angle) * 0.8;
      
      meshRef.current.position.set(x, y, z);
      
      // Actualizar posición del trail
      trailRef.current.set(x, y, z);
      
      // Pulso de luz
      if (lightRef.current) {
        lightRef.current.intensity = 0.3 + Math.sin(time * 5) * 0.2;
      }
    }
  });

  // Determinar forma basada en tipo
  const geometry = isLightning ? (
    <octahedronGeometry args={[size * 1.5, 0]} />
  ) : (
    <sphereGeometry args={[size, 12, 12]} />
  );

  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.3}
    >
      <group>
        {/* Trail effect */}
        <Trail
          width={0.3}
          length={6}
          color={colors.emissive}
          attenuation={(t) => t * t}
        >
          <mesh ref={meshRef}>
            {geometry}
            <meshStandardMaterial
              color={colors.primary}
              emissive={colors.emissive}
              emissiveIntensity={0.8}
              metalness={0.5}
              roughness={0.2}
              transparent
              opacity={0.9}
            />
          </mesh>
        </Trail>
        
        {/* Luz de la partícula */}
        <pointLight
          ref={lightRef}
          color={colors.primary}
          intensity={0.3}
          distance={1.5}
          decay={2}
        />
        
        {/* Brillo extra para Lightning TXs */}
        {isLightning && (
          <mesh ref={meshRef} scale={1.5}>
            <octahedronGeometry args={[size * 0.8, 0]} />
            <meshBasicMaterial
              color={colors.primary}
              transparent
              opacity={0.3}
              wireframe
            />
          </mesh>
        )}
      </group>
    </Float>
  );
}

/**
 * 📊 TransactionStats - Componente auxiliar para mostrar stats
 * (Opcional: mostrar valor de TXs en UI)
 */
export function TransactionStats({ 
  transactions 
}: { 
  transactions: Array<{ value: number; isLightning: boolean }> 
}) {
  const totalSats = transactions.reduce((sum, tx) => sum + tx.value, 0);
  const lightningCount = transactions.filter(tx => tx.isLightning).length;
  
  return {
    totalSats,
    lightningCount,
    averageValue: Math.round(totalSats / transactions.length),
  };
}
