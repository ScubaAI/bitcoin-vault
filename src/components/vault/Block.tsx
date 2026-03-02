'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/**
 * BlockProps - Propiedades del componente Block
 */
interface BlockProps {
  id: string;
  height: number;
  hash: string;
  position: [number, number, number];
  transactions: number;
  timestamp: number;
  isSelected?: boolean;
  onClick?: () => void;
}

/**
 * 🔐 Block - Componente 3D de un bloque de Bitcoin
 * 
 * Representa visualmente un bloque de la blockchain con
 * efectos holográficos y estilo neon kawaii~!
 */
export function Block({
  height,
  hash,
  position,
  transactions,
  isSelected = false,
  onClick,
}: BlockProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const [hovered, setHovered] = useState(false);

  // Colores del tema kawaii neon
  const colors = useMemo(() => ({
    primary: '#F7931A',      // Bitcoin Orange
    secondary: '#A855F7',    // Cyber Purple
    accent: '#FF6B9D',       // Kawaii Pink
    glow: '#FFB347',         // Glow Orange
    base: '#1a1a2e',         // Base Dark
  }), []);

  // Animación de flotación y glow
  useFrame((state) => {
    if (meshRef.current) {
      // Flotación suave
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + height * 0.1) * 0.15;
      
      // Rotación sutil
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + height * 0.05) * 0.05;
      
      // Escala al hacer hover
      const targetScale = hovered || isSelected ? 1.15 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }

    // Pulso de luz
    if (glowRef.current) {
      const intensity = isSelected ? 2 : hovered ? 1.5 : 0.8;
      glowRef.current.intensity = intensity + Math.sin(state.clock.elapsedTime * 3) * 0.3;
    }
  });

  // Determinar color basado en estado
  const getBlockColor = () => {
    if (isSelected) return colors.primary;
    if (hovered) return colors.glow;
    return '#2a2a4a';
  };

  // Determinar intensidad del emissive
  const getEmissiveIntensity = () => {
    if (isSelected) return 0.5;
    if (hovered) return 0.3;
    return 0.1;
  };

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.1}
      floatIntensity={0.3}
      floatingPosition={position}
    >
      <group position={position}>
        {/* ✨ Luz interior del bloque */}
        <pointLight
          ref={glowRef}
          color={colors.primary}
          intensity={isSelected ? 2 : 0.8}
          distance={4}
          decay={2}
        />

        {/* 🧱 Bloque principal con material cristal */}
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={onClick}
        >
          <boxGeometry args={[2.4, 1.2, 2.4]} />
          <meshPhysicalMaterial
            color={getBlockColor()}
            metalness={0.3}
            roughness={0.1}
            transmission={0.6}
            thickness={0.5}
            emissive={isSelected ? colors.primary : colors.glow}
            emissiveIntensity={getEmissiveIntensity()}
            transparent
            opacity={0.9}
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* 🔲 Marco wireframe neon */}
        <mesh scale={[1.02, 1.02, 1.02]}>
          <boxGeometry args={[2.4, 1.2, 2.4]} />
          <meshBasicMaterial
            color={isSelected ? colors.primary : hovered ? colors.glow : colors.secondary}
            wireframe
            transparent
            opacity={isSelected ? 0.8 : hovered ? 0.6 : 0.3}
          />
        </mesh>

        {/* 🌟 Borde luminoso inferior */}
        <mesh position={[0, -0.65, 0]}>
          <boxGeometry args={[2.5, 0.05, 2.5]} />
          <meshBasicMaterial
            color={colors.primary}
            transparent
            opacity={isSelected ? 0.8 : 0.4}
          />
        </mesh>

        {/* 🌟 Borde luminoso superior */}
        <mesh position={[0, 0.65, 0]}>
          <boxGeometry args={[2.5, 0.05, 2.5]} />
          <meshBasicMaterial
            color={isSelected ? colors.primary : colors.secondary}
            transparent
            opacity={isSelected ? 0.8 : 0.3}
          />
        </mesh>

        {/* 📝 Texto de altura del bloque */}
        <Text
          position={[0, 0.8, 0]}
          fontSize={0.28}
          color={isSelected ? colors.primary : '#ffffff'}
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.json"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          #{height.toLocaleString()}
        </Text>

        {/* 📊 Número de transacciones */}
        <Text
          position={[0, 0.4, 0]}
          fontSize={0.18}
          color={hovered ? colors.glow : '#94a3b8'}
          anchorX="center"
          anchorY="middle"
        >
          {transactions.toLocaleString()} TXs
        </Text>

        {/* 🔗 Hash truncado */}
        <Text
          position={[0, -0.4, 0]}
          fontSize={0.1}
          color="#64748b"
          anchorX="center"
          anchorY="middle"
        >
          {hash.slice(0, 8)}...{hash.slice(-4)}
        </Text>

        {/* ₿ Símbolo Bitcoin */}
        <Text
          position={[0, 0, 1.25]}
          fontSize={0.35}
          color={isSelected ? colors.primary : colors.glow}
          anchorX="center"
          anchorY="middle"
        >
          ₿
        </Text>

        {/* ✨ Sparkles para bloques seleccionados */}
        {(isSelected || hovered) && (
          <Sparkles
            count={20}
            scale={[3, 2, 3]}
            size={2}
            speed={0.5}
            opacity={0.5}
            color={isSelected ? colors.primary : colors.glow}
          />
        )}

        {/* 🔗 Cadena al bloque anterior */}
        {position[1] > 0 && (
          <group position={[0, -1.5, 0]}>
            {/* Anillo superior */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.15, 0.03, 8, 16]} />
              <meshStandardMaterial
                color={colors.secondary}
                emissive={colors.secondary}
                emissiveIntensity={0.3}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            
            {/* Línea de conexión */}
            <mesh position={[0, -0.5, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 1]} />
              <meshStandardMaterial
                color={colors.secondary}
                emissive={colors.secondary}
                emissiveIntensity={0.2}
                transparent
                opacity={0.6}
              />
            </mesh>

            {/* Anillo inferior */}
            <mesh position={[0, -1, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.15, 0.03, 8, 16]} />
              <meshStandardMaterial
                color={colors.secondary}
                emissive={colors.secondary}
                emissiveIntensity={0.3}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          </group>
        )}
      </group>
    </Float>
  );
}
