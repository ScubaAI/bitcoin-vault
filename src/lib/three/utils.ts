/**
 * Three.js Utils - Utilidades para Three.js
 * Three.js utilities
 * 
 * Funciones helper para trabajar con Three.js
 * Helper functions for working with Three.js
 */

import * as THREE from 'three';

/**
 * Generar posición aleatoria en una esfera
 * Generate random position on a sphere
 */
export function randomSpherePosition(
  radius: number,
  center: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
): THREE.Vector3 {
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  const r = radius * (0.5 + Math.random() * 0.5);

  return new THREE.Vector3(
    center.x + r * Math.sin(phi) * Math.cos(theta),
    center.y + r * Math.sin(phi) * Math.sin(theta),
    center.z + r * Math.cos(phi)
  );
}

/**
 * Generar posición aleatoria en un círculo
 * Generate random position on a circle
 */
export function randomCirclePosition(
  radius: number,
  center: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
): THREE.Vector3 {
  const angle = Math.random() * Math.PI * 2;
  const r = radius * Math.sqrt(Math.random());

  return new THREE.Vector3(
    center.x + r * Math.cos(angle),
    center.y,
    center.z + r * Math.sin(angle)
  );
}

/**
 * Calcular punto en una curva de Bezier cúbica
 * Calculate point on cubic Bezier curve
 */
export function bezierPoint(
  t: number,
  p0: THREE.Vector3,
  p1: THREE.Vector3,
  p2: THREE.Vector3,
  p3: THREE.Vector3
): THREE.Vector3 {
  const oneMinusT = 1 - t;
  const oneMinusT2 = oneMinusT * oneMinusT;
  const oneMinusT3 = oneMinusT2 * oneMinusT;
  const t2 = t * t;
  const t3 = t2 * t;

  return new THREE.Vector3()
    .addScaledVector(p0, oneMinusT3)
    .addScaledVector(p1, 3 * oneMinusT2 * t)
    .addScaledVector(p2, 3 * oneMinusT * t2)
    .addScaledVector(p3, t3);
}

/**
 * Crear geometría de línea desde puntos
 * Create line geometry from points
 */
export function createLineGeometry(points: THREE.Vector3[]): THREE.BufferGeometry {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(points.length * 3);

  points.forEach((point, i) => {
    positions[i * 3] = point.x;
    positions[i * 3 + 1] = point.y;
    positions[i * 3 + 2] = point.z;
  });

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  return geometry;
}

/**
 * Formatear número grande (satoshis a BTC)
 * Format large number (satoshis to BTC)
 */
export function formatBTC(satoshis: number): string {
  const btc = satoshis / 100000000;
  return btc.toFixed(8) + ' BTC';
}

/**
 * Formatear hash para mostrar
 * Format hash for display
 */
export function formatHash(hash: string, startChars: number = 6, endChars: number = 6): string {
  if (hash.length <= startChars + endChars) return hash;
  return `${hash.slice(0, startChars)}...${hash.slice(-endChars)}`;
}

/**
 * Convertir grados a radianes
 * Convert degrees to radians
 */
export function degToRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Crear matriz de rotación que mire hacia un objetivo
 * Create rotation matrix looking at a target
 */
export function lookAtMatrix(
  position: THREE.Vector3,
  target: THREE.Vector3,
  up: THREE.Vector3 = new THREE.Vector3(0, 1, 0)
): THREE.Matrix4 {
  const matrix = new THREE.Matrix4();
  matrix.lookAt(position, target, up);
  return matrix;
}

/**
 * Generar color aleatorio de la paleta Bitcoin
 * Generate random color from Bitcoin palette
 */
export function randomBitcoinColor(): THREE.Color {
  const colors = [
    new THREE.Color('#f7931a'), // Bitcoin orange
    new THREE.Color('#00ff88'), // Transaction green
    new THREE.Color('#00ffff'), // Lightning cyan
    new THREE.Color('#ffffff'), // White
    new THREE.Color('#ffd700'), // Gold
  ];

  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Calcular distancia entre dos puntos 3D
 * Calculate distance between two 3D points
 */
export function distance3D(a: THREE.Vector3, b: THREE.Vector3): number {
  return a.distanceTo(b);
}

/**
 * Interpolar suave entre dos valores
 * Smooth interpolation between two values
 */
export function smoothStep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

/**
 * Crear textura procedural simple
 * Create simple procedural texture
 */
export function createNoiseTexture(width: number = 256, height: number = 256): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const imageData = ctx.createImageData(width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const value = Math.random() * 255;
    data[i] = value;     // R
    data[i + 1] = value; // G
    data[i + 2] = value; // B
    data[i + 3] = 255;   // A
  }

  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  return texture;
}
