'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * CountdownWidget - Widget de cuenta regresiva al Halving
 * Halving countdown widget
 * 
 * Muestra el tiempo restante hasta el próximo halving de Bitcoin
 * Displays time remaining until next Bitcoin halving
 */
export function CountdownWidget() {
  const [timeLeft, setTimeLeft] = useState({
    days: 120,
    hours: 14,
    minutes: 35,
    seconds: 42,
  });

  // Calcular tiempo restante / Calculate time remaining
  useEffect(() => {
    const nextHalvingDate = new Date('2024-04-15T00:00:00');
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = nextHalvingDate.getTime() - now.getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="absolute left-4 top-24 z-10"
    >
      <div className="bg-black/60 backdrop-blur-md rounded-xl border border-orange-500/30 p-4 w-64">
        {/* Header / Encabezado */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">⏱️</span>
          <div>
            <h3 className="font-bold text-orange-500">Halving Countdown</h3>
            <p className="text-xs text-gray-400">Block Reward: 3.125 BTC</p>
          </div>
        </div>

        {/* Contador / Counter */}
        <div className="grid grid-cols-4 gap-2 text-center">
          <TimeUnit value={timeLeft.days} label="Days" />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <TimeUnit value={timeLeft.minutes} label="Mins" />
          <TimeUnit value={timeLeft.seconds} label="Secs" />
        </div>

        {/* Info adicional / Additional info */}
        <div className="mt-3 pt-3 border-t border-white/10 text-xs text-gray-400">
          <p>Current subsidy: 6.25 BTC</p>
          <p>Next subsidy: 3.125 BTC</p>
          <p>Blocks remaining: ~18,000</p>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * TimeUnit - Unidad de tiempo
 * Time unit component
 */
interface TimeUnitProps {
  value: number;
  label: string;
}

function TimeUnit({ value, label }: TimeUnitProps) {
  return (
    <div className="bg-white/5 rounded-lg p-2">
      <p className="text-xl font-bold text-white">
        {value.toString().padStart(2, '0')}
      </p>
      <p className="text-[10px] text-gray-400 uppercase">{label}</p>
    </div>
  );
}
