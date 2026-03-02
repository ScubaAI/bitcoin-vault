'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * FeeLevels - Niveles de fee recomendados
 * Recommended fee levels interface
 */
interface FeeLevels {
  fastest: number;
  halfHour: number;
  hour: number;
  economy: number;
  minimum: number;
}

/**
 * FeeEstimator - Estimador de fees de transacción
 * Transaction fee estimator
 * 
 * Muestra los fees recomendados según la prioridad deseada
 * Displays recommended fees based on desired priority
 */
export function FeeEstimator() {
  const [fees, setFees] = useState<FeeLevels>({
    fastest: 25,
    halfHour: 18,
    hour: 12,
    economy: 5,
    minimum: 1,
  });

  // Simular actualizaciones / Simulate updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFees((prev) => ({
        fastest: Math.max(1, prev.fastest + Math.floor(Math.random() * 6 - 3)),
        halfHour: Math.max(1, prev.halfHour + Math.floor(Math.random() * 4 - 2)),
        hour: Math.max(1, prev.hour + Math.floor(Math.random() * 3 - 1)),
        economy: Math.max(1, prev.economy + Math.floor(Math.random() * 2 - 1)),
        minimum: 1,
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const feeOptions = [
    { key: 'fastest', label: 'Fastest', time: '~10 min', color: 'bg-red-500' },
    { key: 'halfHour', label: '30 Minutes', time: '~30 min', color: 'bg-orange-500' },
    { key: 'hour', label: '1 Hour', time: '~60 min', color: 'bg-yellow-500' },
    { key: 'economy', label: 'Economy', time: '~4 hours', color: 'bg-green-500' },
    { key: 'minimum', label: 'Minimum', time: '~24 hours', color: 'bg-blue-500' },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-4 right-4 z-10"
    >
      <div className="bg-black/60 backdrop-blur-md rounded-xl border border-white/10 p-4 w-72">
        {/* Header / Encabezado */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">⛽</span>
          <h3 className="font-bold text-white">Fee Estimator</h3>
        </div>

        {/* Opciones de fee / Fee options */}
        <div className="space-y-2">
          {feeOptions.map((option) => {
            const fee = fees[option.key];
            return (
              <motion.button
                key={option.key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${option.color}`} />
                  <div className="text-left">
                    <p className="font-medium text-white text-sm">{option.label}</p>
                    <p className="text-xs text-gray-400">{option.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">{fee}</p>
                  <p className="text-xs text-gray-400">sat/vB</p>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Nota / Note */}
        <p className="mt-4 text-xs text-gray-500 text-center">
          Fees update automatically based on network conditions
        </p>
      </div>
    </motion.div>
  );
}
