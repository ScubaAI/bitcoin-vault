/**
 * Three.js Materials - Materiales personalizados para el vault 3D
 * Custom materials for the 3D vault
 * 
 * Define materiales reutilizables para bloques, transacciones y efectos
 * Defines reusable materials for blocks, transactions and effects
 */

import * as THREE from 'three';

/**
 * Colores del tema Bitcoin / Bitcoin theme colors
 */
export const COLORS = {
  bitcoin: {
    orange: new THREE.Color('#f7931a'),
    dark: new THREE.Color('#4a4a6a'),
    gold: new THREE.Color('#ffd700'),
  },
  transaction: {
    green: new THREE.Color('#00ff88'),
    glow: new THREE.Color('#00ff44'),
  },
  lightning: {
    cyan: new THREE.Color('#00ffff'),
    blue: new THREE.Color('#0088ff'),
  },
  background: {
    dark: new THREE.Color('#0a0a0f'),
    space: new THREE.Color('#000000'),
  },
} as const;

/**
 * Material para bloques seleccionados
 * Material for selected blocks
 */
export function createSelectedBlockMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: COLORS.bitcoin.orange,
    metalness: 0.6,
    roughness: 0.4,
    emissive: COLORS.bitcoin.orange,
    emissiveIntensity: 0.2,
  });
}

/**
 * Material para bloques normales
 * Material for normal blocks
 */
export function createBlockMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: COLORS.bitcoin.dark,
    metalness: 0.6,
    roughness: 0.4,
  });
}

/**
 * Material para partículas de transacción
 * Material for transaction particles
 */
export function createTransactionMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: COLORS.transaction.green,
    emissive: COLORS.transaction.glow,
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.8,
  });
}

/**
 * Material para canales Lightning
 * Material for Lightning channels
 */
export function createLightningChannelMaterial(
  active: boolean = true
): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: active ? COLORS.lightning.cyan : new THREE.Color('#444444'),
    transparent: true,
    opacity: active ? 0.6 : 0.3,
    emissive: active ? COLORS.lightning.cyan : new THREE.Color('#000000'),
    emissiveIntensity: active ? 0.3 : 0,
  });
}

/**
 * Material para nodos Lightning
 * Material for Lightning nodes
 */
export function createLightningNodeMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: COLORS.bitcoin.orange,
    emissive: new THREE.Color('#441100'),
    emissiveIntensity: 0.5,
    metalness: 0.8,
    roughness: 0.2,
  });
}

/**
 * Material para el suelo reflectante
 * Material for reflective floor
 */
export function createFloorMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1a1a2e'),
    metalness: 0.8,
    roughness: 0.2,
  });
}

/**
 * Material de wireframe para bordes
 * Wireframe material for edges
 */
export function createWireframeMaterial(
  color: THREE.Color = new THREE.Color('#666666')
): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({
    color,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  });
}

/**
 * Shader material personalizado para efectos de brillo
 * Custom shader material for glow effects
 */
export function createGlowMaterial(color: THREE.Color): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      color: { value: color },
      coefficient: { value: 0.5 },
      power: { value: 3.0 },
    },
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      uniform float coefficient;
      uniform float power;
      varying vec3 vNormal;
      void main() {
        float intensity = pow(coefficient + dot(vNormal, vec3(0, 0, 1.0)), power);
        gl_FragColor = vec4(color, 1.0) * intensity;
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
}
