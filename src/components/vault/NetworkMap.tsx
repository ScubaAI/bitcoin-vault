'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { LightningChannel } from './LightningChannel';

/**
 * NetworkMapProps - Propiedades del componente NetworkMap
 * NetworkMap component properties
 */
interface NetworkMapProps {
  nodeCount?: number;
  radius?: number;
}

/**
 * NetworkMap - Mapa de nodos de la red Lightning
 * Lightning Network node map
 * 
 * Visualiza la topología de la red Lightning con nodos y canales
 * Visualizes Lightning Network topology with nodes and channels
 */
export function NetworkMap({ nodeCount = 20, radius = 10 }: NetworkMapProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Generar nodos / Generate nodes
  const nodes = useMemo(() => {
    return Array.from({ length: nodeCount }, (_, i) => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.5 + Math.random() * 0.5);

      return {
        id: `node-${i}`,
        position: [
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        ] as [number, number, number],
        alias: `Node ${i + 1}`,
        capacity: Math.floor(Math.random() * 1000000000),
      };
    });
  }, [nodeCount, radius]);

  // Generar conexiones (canales) / Generate connections (channels)
  const channels = useMemo(() => {
    const conns: Array<{
      id: string;
      start: [number, number, number];
      end: [number, number, number];
      capacity: number;
    }> = [];

    nodes.forEach((node, i) => {
      // Conectar con 2-3 nodos cercanos / Connect to 2-3 nearby nodes
      const connections = 2 + Math.floor(Math.random() * 2);
      for (let j = 0; j < connections; j++) {
        const targetIndex = (i + j + 1) % nodes.length;
        conns.push({
          id: `channel-${i}-${targetIndex}`,
          start: node.position,
          end: nodes[targetIndex].position,
          capacity: Math.floor(Math.random() * 10000000),
        });
      }
    });

    return conns;
  }, [nodes]);

  // Animación de rotación / Rotation animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Nodos / Nodes */}
      {nodes.map((node) => (
        <NetworkNode
          key={node.id}
          position={node.position}
          alias={node.alias}
          capacity={node.capacity}
        />
      ))}

      {/* Canales / Channels */}
      {channels.map((channel) => (
        <LightningChannel
          key={channel.id}
          startPosition={channel.start}
          endPosition={channel.end}
          capacity={channel.capacity}
          isActive={true}
        />
      ))}
    </group>
  );
}

/**
 * NetworkNode - Nodo individual de la red
 * Individual network node
 */
interface NetworkNodeProps {
  position: [number, number, number];
  alias: string;
  capacity: number;
}

function NetworkNode({ position, capacity }: NetworkNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  // Tamaño basado en capacidad / Size based on capacity
  const size = 0.2 + Math.log10(capacity + 1) * 0.05;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color="#f7931a"
        emissive="#441100"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}
