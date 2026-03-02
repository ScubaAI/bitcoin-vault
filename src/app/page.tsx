'use client';

import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';
import { StatsOverlay } from '@/components/ui/StatsOverlay';
import { motion } from 'framer-motion';

// Dynamic import with SSR disabled for 3D scene
const VaultScene = dynamic(
  () => import('@/components/vault/VaultScene').then((mod) => mod.VaultScene),
  { ssr: false }
);

/**
 * 🏦 Bitcoin Vault - Home Page
 *
 * La visualización 3D más épica de la blockchain de Bitcoin
 * "The most secure vault in the universe, nya~!"
 */
export default function HomePage() {
  return (
    <main id="main-content" className="relative w-full h-screen overflow-hidden">
      {/* 🎮 Escena 3D Principal */}
      <Canvas camera={{ position: [10, 10, 15], fov: 45 }}>
        <VaultScene />
      </Canvas>
      
      {/* 📊 Overlay de Stats */}
      <StatsOverlay />
      
      {/* 🎨 Branding sutil en esquina */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-4 left-4 z-10 pointer-events-none"
      >
        <p className="text-xs font-mono text-slate-600">
          Built with ⚡ by{' '}
          <a 
            href="https://visionaryai.lat" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-orange-400 hover:text-orange-300 transition-colors pointer-events-auto"
          >
            VisionaryAI.lat
          </a>
        </p>
      </motion.div>
    </main>
  );
}
