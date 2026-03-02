'use client';

import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/**
 * MerkleTreeProps - Propiedades del componente MerkleTree
 */
interface MerkleTreeProps {
  position: [number, number, number];
  scale?: number;
  data?: string[]; // Hashes de las transacciones
  showLabels?: boolean;
  animate?: boolean;
}

/**
 * 🌳 MerkleTree - Visualización 3D de un árbol Merkle
 * 
 * Muestra la estructura jerárquica de hashes que permite
 * verificar transacciones de forma eficiente (SPV)~!
 */
export function MerkleTree({ 
  position, 
  scale = 1,
  data,
  showLabels = true,
  animate = true
}: MerkleTreeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Colores kawaii para diferentes niveles
  const levelColors = useMemo(() => [
    { primary: '#00F5FF', emissive: '#67E8F9', name: 'Leaves (TXs)' },    // Cyan - Hojas
    { primary: '#A855F7', emissive: '#C084FC', name: 'Level 1' },         // Purple
    { primary: '#FF6B9D', emissive: '#FFB3D9', name: 'Level 2' },         // Pink
    { primary: '#F7931A', emissive: '#FFB347', name: 'Root' },            // Orange - Raíz
  ], []);

  // Generar estructura del árbol
  const treeData = useMemo(() => {
    const leaves = data || [
      'tx_001', 'tx_002', 'tx_003', 'tx_004',
      'tx_005', 'tx_006', 'tx_007', 'tx_008'
    ];
    
    const levels: MerkleNode[][] = [];
    let currentLevel = leaves.map((leaf, i) => ({
      id: `leaf-${i}`,
      hash: leaf,
      level: 0,
      position: [0, 0, 0] as [number, number, number],
    }));
    
    levels.push(currentLevel);
    
    // Construir árbol hacia arriba
    while (currentLevel.length > 1) {
      const nextLevel: MerkleNode[] = [];
      
      for (let i = 0; i < currentLevel.length; i += 2) {
        const left = currentLevel[i];
        const right = currentLevel[i + 1] || currentLevel[i]; // Duplicar si es impar
        
        const combinedHash = `hash_${left.hash}_${right.hash}`.slice(0, 8);
        
        nextLevel.push({
          id: `node-l${levels.length}-${Math.floor(i / 2)}`,
          hash: combinedHash,
          level: levels.length,
          position: [0, 0, 0],
        });
      }
      
      levels.push(nextLevel);
      currentLevel = nextLevel;
    }
    
    return { levels, leaves };
  }, [data]);

  // Calcular posiciones de nodos
  const nodesWithPositions = useMemo(() => {
    const allNodes: MerkleNode[] = [];
    const { levels } = treeData;
    const totalLevels = levels.length;
    
    levels.forEach((level, levelIndex) => {
      const y = (totalLevels - levelIndex - 1) * 2.5 - (totalLevels - 1) * 1.25;
      const levelWidth = level.length * 1.2;
      
      level.forEach((node, nodeIndex) => {
        const x = (nodeIndex - (level.length - 1) / 2) * 1.2;
        const z = Math.sin(nodeIndex * 0.5) * 0.3; // Ligera curvatura 3D
        
        allNodes.push({
          ...node,
          position: [x, y, z] as [number, number, number],
        });
      });
    });
    
    return allNodes;
  }, [treeData]);

  // Generar conexiones entre nodos
  const connections = useMemo(() => {
    const lines: Array<{
      id: string;
      start: [number, number, number];
      end: [number, number, number];
      level: number;
    }> = [];
    
    const { levels } = treeData;
    
    for (let levelIndex = 0; levelIndex < levels.length - 1; levelIndex++) {
      const currentLevel = levels[levelIndex];
      const parentLevel = levels[levelIndex + 1];
      
      currentLevel.forEach((node, nodeIndex) => {
        const parentIndex = Math.floor(nodeIndex / 2);
        const parent = nodesWithPositions.find(
          n => n.id === parentLevel[parentIndex]?.id
        );
        
        if (parent) {
          const nodeWithPos = nodesWithPositions.find(n => n.id === node.id);
          if (nodeWithPos) {
            lines.push({
              id: `conn-${node.id}-${parent.id}`,
              start: nodeWithPos.position,
              end: parent.position,
              level: levelIndex,
            });
          }
        }
      });
    }
    
    return lines;
  }, [treeData, nodesWithPositions]);

  // Animación suave
  useFrame((state) => {
    if (groupRef.current && animate) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.15;
    }
  });

  // Encontrar la raíz (Merkle Root)
  const merkleRoot = nodesWithPositions.find(n => n.level === treeData.levels.length - 1);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* ✨ Sparkles para la raíz */}
      {merkleRoot && (
        <Sparkles
          count={30}
          position={merkleRoot.position}
          scale={[2, 2, 2]}
          size={3}
          speed={0.3}
          opacity={0.6}
          color="#F7931A"
        />
      )}
      
      {/* 🔗 Líneas de conexión */}
      {connections.map((conn) => (
        <ConnectionLine
          key={conn.id}
          start={conn.start}
          end={conn.end}
          color={levelColors[Math.min(conn.level, levelColors.length - 1)].primary}
          hovered={hoveredNode === conn.id}
        />
      ))}

      {/* 🧊 Nodos del árbol */}
      {nodesWithPositions.map((node) => {
        const colorSet = levelColors[Math.min(node.level, levelColors.length - 1)];
        const isLeaf = node.level === 0;
        const isRoot = node.level === treeData.levels.length - 1;
        
        return (
          <MerkleNodeMesh
            key={node.id}
            node={node}
            colors={colorSet}
            isLeaf={isLeaf}
            isRoot={isRoot}
            showLabel={showLabels}
            onHover={(isHovered) => setHoveredNode(isHovered ? node.id : null)}
          />
        );
      })}

      {/* 📝 Etiqueta del árbol */}
      {showLabels && (
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <Text
            position={[0, treeData.levels.length * 1.5, 0]}
            fontSize={0.3}
            color="#F7931A"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-bold.json"
          >
            MERKLE TREE
          </Text>
          <Text
            position={[0, treeData.levels.length * 1.5 - 0.4, 0]}
            fontSize={0.12}
            color="#94A3B8"
            anchorX="center"
            anchorY="middle"
          >
            {`${treeData.leaves.length} TXs → 1 Root`}
          </Text>
        </Float>
      )}
    </group>
  );
}

/**
 * 🧊 MerkleNodeMesh - Nodo individual del árbol
 */
interface MerkleNode {
  id: string;
  hash: string;
  level: number;
  position: [number, number, number];
}

interface MerkleNodeMeshProps {
  node: MerkleNode;
  colors: { primary: string; emissive: string; name: string };
  isLeaf: boolean;
  isRoot: boolean;
  showLabel: boolean;
  onHover: (hovered: boolean) => void;
}

function MerkleNodeMesh({ 
  node, 
  colors, 
  isLeaf, 
  isRoot,
  showLabel,
  onHover 
}: MerkleNodeMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Pulso suave
      const pulse = isRoot 
        ? 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1 
        : 1;
      meshRef.current.scale.setScalar(pulse);
    }
  });

  const size = isRoot ? 0.35 : isLeaf ? 0.25 : 0.2;

  return (
    <Float
      speed={isRoot ? 2 : 1}
      rotationIntensity={0.05}
      floatIntensity={isRoot ? 0.3 : 0.1}
      floatingPosition={node.position}
    >
      <group position={node.position}>
        {/* Luz para nodos importantes */}
        {(isRoot || isLeaf) && (
          <pointLight
            color={colors.primary}
            intensity={isRoot ? 1.5 : 0.5}
            distance={2}
            decay={2}
          />
        )}
        
        {/* Nodo principal */}
        <mesh
          ref={meshRef}
          onPointerOver={() => onHover(true)}
          onPointerOut={() => onHover(false)}
        >
          {isLeaf ? (
            <octahedronGeometry args={[size, 0]} />
          ) : (
            <icosahedronGeometry args={[size, 0]} />
          )}
          <meshStandardMaterial
            color={colors.primary}
            emissive={colors.emissive}
            emissiveIntensity={isRoot ? 0.8 : 0.4}
            metalness={0.6}
            roughness={0.2}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Borde luminoso */}
        <mesh scale={[1.1, 1.1, 1.1]}>
          {isLeaf ? (
            <octahedronGeometry args={[size, 0]} />
          ) : (
            <icosahedronGeometry args={[size, 0]} />
          )}
          <meshBasicMaterial
            color={colors.primary}
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>

        {/* Etiqueta del hash */}
        {showLabel && (
          <Text
            position={[0, -size - 0.15, 0]}
            fontSize={0.08}
            color="#94A3B8"
            anchorX="center"
            anchorY="top"
          >
            {node.hash.slice(0, 6)}...
          </Text>
        )}

        {/* Badge especial para la raíz */}
        {isRoot && showLabel && (
          <Text
            position={[0, size + 0.25, 0]}
            fontSize={0.1}
            color="#F7931A"
            anchorX="center"
            anchorY="bottom"
          >
            ROOT
          </Text>
        )}
      </group>
    </Float>
  );
}

/**
 * 🔗 ConnectionLine - Línea entre nodos
 */
interface ConnectionLineProps {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  hovered: boolean;
}

function ConnectionLine({ start, end, color, hovered }: ConnectionLineProps) {
  const points = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...start),
      new THREE.Vector3(
        (start[0] + end[0]) / 2,
        (start[1] + end[1]) / 2,
        (start[2] + end[2]) / 2 + 0.2
      ),
      new THREE.Vector3(...end)
    );
    return curve.getPoints(20);
  }, [start, end]);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={hovered ? 0.8 : 0.3}
        linewidth={1}
      />
    </line>
  );
}

export default MerkleTree;
