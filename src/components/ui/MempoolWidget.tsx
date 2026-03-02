'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * MempoolData - Datos del mempool
 * Mempool data interface
 */
interface MempoolData {
  count: number;
  vsize: number;
  totalFee: number;
  feeHistogram: Array<[number, number]>;
}

/**
 * MempoolWidget - Widget de estado del mempool
 * Mempool status widget
 * 
 * Muestra información sobre las transacciones pendientes
 * Displays information about pending transactions
 */
export function MempoolWidget() {
  const [data, setData] = useState<MempoolData>({
    count: 50000,
    vsize: 85000000,
    totalFee: 12.5,
    feeHistogram: [
      [1, 5000],
      [5, 15000],
      [10, 25000],
      [20, 10000],
      [50, 5000],
    ],
  });

  // Simular actualizaciones / Simulate updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        count: prev.count + Math.floor(Math.random() * 200 - 100),
        totalFee: Math.max(0, prev.totalFee + Math.random() * 0.1 - 0.05),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute bottom-4 left-4 z-10"
    >
      <div className="bg-black/60 backdrop-blur-md rounded-xl border border-white/10 p-4 w-80">
        {/* Header / Encabezado */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl">📦</span>
          <h3 className="font-bold text-white">Mempool Status</h3>
        </div>

        {/* Estadísticas principales / Main stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-400">Pending TXs</p>
            <p className="text-xl font-bold text-blue-400">
              {data.count.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Total Fees</p>
            <p className="text-xl font-bold text-green-400">
              {data.totalFee.toFixed(2)} BTC
            </p>
          </div>
        </div>

        {/* Histograma de fees / Fee histogram */}
        <div className="space-y-2">
          <p className="text-xs text-gray-400">Fee Distribution</p>
          <div className="h-20 flex items-end gap-1">
            {data.feeHistogram.map(([fee, count], i) => {
              const height = Math.min((count / 25000) * 100, 100);
              return (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    className="w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t"
                  />
                  <span className="text-[10px] text-gray-500">{fee}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
