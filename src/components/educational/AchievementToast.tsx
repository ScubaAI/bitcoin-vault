'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Achievement - Logro desbloqueado
 * Achievement interface
 */
export interface Achievement {
  id: string;
  title: string;
  titleES: string;
  description: string;
  descriptionES: string;
  icon: string;
  unlockedAt: Date;
}

/**
 * AchievementToastProps - Propiedades del componente AchievementToast
 * AchievementToast component properties
 */
interface AchievementToastProps {
  achievement: Achievement | null;
  onClose: () => void;
  lang?: string;
}

/**
 * AchievementToast - Notificación de logro desbloqueado
 * Achievement unlock notification component
 * 
 * Muestra una notificación cuando el usuario desbloquea un logro
 * Shows a notification when user unlocks an achievement
 */
export function AchievementToast({
  achievement,
  onClose,
  lang = 'es',
}: AchievementToastProps) {
  const isSpanish = lang === 'es';

  useEffect(() => {
    if (achievement) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.8 }}
          className="fixed top-20 right-4 z-50"
        >
          <div className="bg-gradient-to-r from-yellow-600 to-orange-500 rounded-xl p-1 shadow-2xl">
            <div className="bg-gray-900 rounded-xl p-4 flex items-center gap-4 min-w-[300px]">
              {/* Icono del logro / Achievement icon */}
              <div className="text-4xl">{achievement.icon}</div>

              {/* Contenido / Content */}
              <div className="flex-1">
                <p className="text-xs text-yellow-400 font-bold uppercase tracking-wider">
                  {isSpanish ? '¡Logro Desbloqueado!' : 'Achievement Unlocked!'}
                </p>
                <h3 className="text-lg font-bold text-white">
                  {isSpanish ? achievement.titleES : achievement.title}
                </h3>
                <p className="text-sm text-gray-300">
                  {isSpanish ? achievement.descriptionES : achievement.description}
                </p>
              </div>

              {/* Botón cerrar / Close button */}
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition"
              >
                ✕
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * AchievementList - Lista de logros disponibles
 * List of available achievements
 */
export const ACHIEVEMENTS = {
  FIRST_BLOCK: {
    id: 'first_block',
    title: 'First Block',
    titleES: 'Primer Bloque',
    description: 'You viewed your first block in 3D',
    descriptionES: 'Viste tu primer bloque en 3D',
    icon: '🔗',
  },
  LIGHTNING_EXPLORER: {
    id: 'lightning_explorer',
    title: 'Lightning Explorer',
    titleES: 'Explorador Lightning',
    description: 'Explored the Lightning Network topology',
    descriptionES: 'Exploraste la topología de Lightning Network',
    icon: '⚡',
  },
  QUIZ_MASTER: {
    id: 'quiz_master',
    title: 'Quiz Master',
    titleES: 'Maestro del Quiz',
    description: 'Completed all quiz questions correctly',
    descriptionES: 'Completaste todas las preguntas correctamente',
    icon: '🏆',
  },
  TOUR_COMPLETE: {
    id: 'tour_complete',
    title: 'Tour Graduate',
    titleES: 'Graduado del Tour',
    description: 'Completed the educational tour',
    descriptionES: 'Completaste el tour educativo',
    icon: '🎓',
  },
  MEMPOOL_WATCHER: {
    id: 'mempool_watcher',
    title: 'Mempool Watcher',
    titleES: 'Observador del Mempool',
    description: 'Spent 5 minutes watching mempool activity',
    descriptionES: 'Pasaste 5 minutos observando el mempool',
    icon: '👁️',
  },
} as const;

/**
 * useAchievements - Hook para manejar logros
 * Hook for managing achievements
 */
export function useAchievements() {
  const unlockAchievement = (achievementId: keyof typeof ACHIEVEMENTS): Achievement => {
    const achievementData = ACHIEVEMENTS[achievementId];
    return {
      ...achievementData,
      unlockedAt: new Date(),
    };
  };

  return { unlockAchievement, ACHIEVEMENTS };
}
