/**
 * Three.js Animations - Animaciones para el vault 3D
 * Animations for the 3D vault
 * 
 * Funciones de animación reutilizables para componentes 3D
 * Reusable animation functions for 3D components
 */

import * as THREE from 'three';

/**
 * Configuración de animación / Animation configuration
 */
export interface AnimationConfig {
  duration: number;
  easing: (t: number) => number;
}

/**
 * Funciones de easing / Easing functions
 */
export const EASING = {
  linear: (t: number) => t,
  easeInOut: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeOut: (t: number) => t * (2 - t),
  easeIn: (t: number) => t * t,
  elastic: (t: number) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
  },
};

/**
 * Animar posición de un objeto
 * Animate object position
 */
export function animatePosition(
  object: THREE.Object3D,
  targetPosition: THREE.Vector3,
  config: AnimationConfig = { duration: 1000, easing: EASING.easeInOut }
): Promise<void> {
  return new Promise((resolve) => {
    const startPosition = object.position.clone();
    const startTime = Date.now();

    function update() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / config.duration, 1);
      const eased = config.easing(progress);

      object.position.lerpVectors(startPosition, targetPosition, eased);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        resolve();
      }
    }

    update();
  });
}

/**
 * Animar rotación de un objeto
 * Animate object rotation
 */
export function animateRotation(
  object: THREE.Object3D,
  targetRotation: THREE.Euler,
  config: AnimationConfig = { duration: 1000, easing: EASING.easeInOut }
): Promise<void> {
  return new Promise((resolve) => {
    const startRotation = object.rotation.clone();
    const startTime = Date.now();

    function update() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / config.duration, 1);
      const eased = config.easing(progress);

      object.rotation.x = startRotation.x + (targetRotation.x - startRotation.x) * eased;
      object.rotation.y = startRotation.y + (targetRotation.y - startRotation.y) * eased;
      object.rotation.z = startRotation.z + (targetRotation.z - startRotation.z) * eased;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        resolve();
      }
    }

    update();
  });
}

/**
 * Animar escala de un objeto
 * Animate object scale
 */
export function animateScale(
  object: THREE.Object3D,
  targetScale: THREE.Vector3,
  config: AnimationConfig = { duration: 500, easing: EASING.easeOut }
): Promise<void> {
  return new Promise((resolve) => {
    const startScale = object.scale.clone();
    const startTime = Date.now();

    function update() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / config.duration, 1);
      const eased = config.easing(progress);

      object.scale.lerpVectors(startScale, targetScale, eased);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        resolve();
      }
    }

    update();
  });
}

/**
 * Animar flotación continua
 * Continuous floating animation
 */
export function createFloatingAnimation(
  object: THREE.Object3D,
  amplitude: number = 0.1,
  speed: number = 1
): () => void {
  const initialY = object.position.y;
  let isActive = true;

  function animate(time: number) {
    if (!isActive) return;
    
    object.position.y = initialY + Math.sin(time * speed) * amplitude;
    requestAnimationFrame((t) => animate(t * 0.001));
  }

  requestAnimationFrame((t) => animate(t * 0.001));

  return () => {
    isActive = false;
  };
}

/**
 * Animar pulso de escala
 * Scale pulse animation
 */
export function createPulseAnimation(
  object: THREE.Object3D,
  minScale: number = 0.9,
  maxScale: number = 1.1,
  speed: number = 2
): () => void {
  const baseScale = object.scale.clone();
  let isActive = true;

  function animate(time: number) {
    if (!isActive) return;

    const scale = minScale + (Math.sin(time * speed) + 1) / 2 * (maxScale - minScale);
    object.scale.copy(baseScale).multiplyScalar(scale);
    
    requestAnimationFrame((t) => animate(t * 0.001));
  }

  requestAnimationFrame((t) => animate(t * 0.001));

  return () => {
    isActive = false;
  };
}

/**
 * Animar órbita alrededor de un punto
 * Orbit animation around a point
 */
export function createOrbitAnimation(
  object: THREE.Object3D,
  center: THREE.Vector3,
  radius: number,
  speed: number = 0.5,
  axis: THREE.Vector3 = new THREE.Vector3(0, 1, 0)
): () => void {
  let isActive = true;
  let angle = 0;

  function animate() {
    if (!isActive) return;

    angle += speed * 0.01;
    
    const offset = new THREE.Vector3(
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius
    );
    
    object.position.copy(center).add(offset);
    
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  return () => {
    isActive = false;
  };
}
