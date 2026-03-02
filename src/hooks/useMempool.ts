'use client';

import { useState, useEffect } from 'react';

/**
 * MempoolStats - Estadísticas del mempool
 * Mempool statistics interface
 */
export interface MempoolStats {
  count: number;
  vsize: number;
  totalFee: number;
  feeHistogram: Array<[number, number]>;
}

/**
 * FeeRecommendation - Recomendación de fee
 * Fee recommendation interface
 */
export interface FeeRecommendation {
  fastestFee: number;
  halfHourFee: number;
  hourFee: number;
  economyFee: number;
  minimumFee: number;
}

/**
 * useMempool - Hook para obtener datos del mempool
 * Hook to fetch mempool data
 * 
 * Obtiene datos del mempool de Mempool.space API
 * Fetches mempool data from Mempool.space API
 */
export function useMempool() {
  const [stats, setStats] = useState<MempoolStats | null>(null);
  const [fees, setFees] = useState<FeeRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Datos simulados / Mock data
    const mockStats: MempoolStats = {
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
    };

    const mockFees: FeeRecommendation = {
      fastestFee: 25,
      halfHourFee: 18,
      hourFee: 12,
      economyFee: 5,
      minimumFee: 1,
    };

    setStats(mockStats);
    setFees(mockFees);
    setIsLoading(false);

    // Simular actualizaciones / Simulate updates
    const interval = setInterval(() => {
      setStats((prev) =>
        prev
          ? {
              ...prev,
              count: prev.count + Math.floor(Math.random() * 200 - 100),
              totalFee: Math.max(0, prev.totalFee + Math.random() * 0.1 - 0.05),
            }
          : null
      );

      setFees((prev) =>
        prev
          ? {
              fastestFee: Math.max(1, prev.fastestFee + Math.floor(Math.random() * 6 - 3)),
              halfHourFee: Math.max(1, prev.halfHourFee + Math.floor(Math.random() * 4 - 2)),
              hourFee: Math.max(1, prev.hourFee + Math.floor(Math.random() * 3 - 1)),
              economyFee: Math.max(1, prev.economyFee + Math.floor(Math.random() * 2 - 1)),
              minimumFee: 1,
            }
          : null
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    stats,
    fees,
    isLoading,
    error,
  };
}

/**
 * useMempoolTransactions - Hook para obtener transacciones del mempool
 * Hook to fetch mempool transactions
 */
export function useMempoolTransactions(limit: number = 10) {
  const [transactions, setTransactions] = useState<Array<{
    txid: string;
    fee: number;
    vsize: number;
    value: number;
  }>>([]);

  useEffect(() => {
    // Simular transacciones / Mock transactions
    const mockTxs = Array.from({ length: limit }, (_, i) => ({
      txid: `tx${i}_${Math.random().toString(36).substr(2, 9)}`,
      fee: Math.floor(Math.random() * 10000),
      vsize: Math.floor(Math.random() * 500) + 100,
      value: Math.floor(Math.random() * 100000000),
    }));

    setTransactions(mockTxs);
  }, [limit]);

  return { transactions };
}
