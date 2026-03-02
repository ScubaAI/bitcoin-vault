'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * TourGuideProps - Propiedades del componente TourGuide
 * TourGuide component properties
 */
interface TourGuideProps {
  lang?: string;
}

/**
 * TourStep - Paso del tour
 * Tour step interface
 */
interface TourStep {
  id: string;
  title: string;
  titleES: string;
  content: string;
  contentES: string;
  icon: string;
}

/**
 * TourGuide - Guía de tour educativo
 * Educational tour guide component
 * 
 * Guía interactiva para aprender sobre Bitcoin y blockchain
 * Interactive guide to learn about Bitcoin and blockchain
 */
export function TourGuide({ lang = 'es' }: TourGuideProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps: TourStep[] = [
    {
      id: 'intro',
      title: 'Welcome to Bitcoin Vault',
      titleES: 'Bienvenido a Bitcoin Vault',
      content: 'Explore the Bitcoin blockchain in 3D. Learn how blocks, transactions, and the Lightning Network work.',
      contentES: 'Explora la blockchain de Bitcoin en 3D. Aprende cómo funcionan los bloques, transacciones y Lightning Network.',
      icon: '🏛️',
    },
    {
      id: 'blocks',
      title: 'Understanding Blocks',
      titleES: 'Entendiendo los Bloques',
      content: 'Each block contains transactions and is linked to the previous block through cryptographic hashes.',
      contentES: 'Cada bloque contiene transacciones y está vinculado al bloque anterior mediante hashes criptográficos.',
      icon: '🔗',
    },
    {
      id: 'mining',
      title: 'Proof of Work Mining',
      titleES: 'Minería Proof of Work',
      content: 'Miners compete to solve complex mathematical puzzles. The winner adds the next block and earns bitcoins.',
      contentES: 'Los mineros compiten por resolver complejos puzzles matemáticos. El ganador añade el siguiente bloque y gana bitcoins.',
      icon: '⛏️',
    },
    {
      id: 'lightning',
      title: 'Lightning Network',
      titleES: 'Lightning Network',
      content: 'A second layer solution that enables instant, low-cost Bitcoin transactions through payment channels.',
      contentES: 'Una solución de segunda capa que permite transacciones instantáneas y de bajo costo mediante canales de pago.',
      icon: '⚡',
    },
  ];

  const currentStepData = steps[currentStep];
  const isSpanish = lang === 'es';

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsOpen(false);
      setCurrentStep(0);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <>
      {/* Botón para abrir el tour / Button to open tour */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-lg"
      >
        {isSpanish ? '🎓 Iniciar Tour Educativo' : '🎓 Start Educational Tour'}
      </motion.button>

      {/* Modal del tour / Tour modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl border border-orange-500/30 p-8 max-w-lg w-full"
            >
              {/* Icono del paso / Step icon */}
              <div className="text-6xl text-center mb-4">{currentStepData.icon}</div>

              {/* Título / Title */}
              <h2 className="text-2xl font-bold text-orange-500 text-center mb-4">
                {isSpanish ? currentStepData.titleES : currentStepData.title}
              </h2>

              {/* Contenido / Content */}
              <p className="text-gray-300 text-center mb-8 text-lg">
                {isSpanish ? currentStepData.contentES : currentStepData.content}
              </p>

              {/* Indicador de progreso / Progress indicator */}
              <div className="flex justify-center gap-2 mb-8">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentStep ? 'bg-orange-500' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>

              {/* Botones de navegación / Navigation buttons */}
              <div className="flex justify-between">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="px-6 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {isSpanish ? 'Anterior' : 'Previous'}
                </button>
                <button
                  onClick={handleNext}
                  className="px-6 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 transition"
                >
                  {currentStep === steps.length - 1
                    ? isSpanish
                      ? 'Finalizar'
                      : 'Finish'
                    : isSpanish
                    ? 'Siguiente'
                    : 'Next'}
                </button>
              </div>

              {/* Botón cerrar / Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
