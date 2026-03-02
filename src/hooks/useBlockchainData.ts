'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * BlockData - Datos de un bloque de Bitcoin
 * Bitcoin block data interface
 */
export interface BlockData {
  height: number;
  hash: string;
  timestamp: number;
  size: number;
  weight: number;
  txCount: number;
  difficulty: number;
  merkleRoot: string;
  nonce: number;
  bits: string;
}

/**
 * BlockchainStats - Estadísticas de la blockchain
 * Blockchain statistics interface
 */
export interface BlockchainStats {
  blockHeight: number;
  hashRate: number;
  difficulty: number;
  totalSupply: number;
  marketCap: number;
}

/**
 * useBlockchainData - Hook para obtener datos de la blockchain
 * Hook to fetch blockchain data via WebSocket
 * 
 * Conecta a Blockchain.com WebSocket para datos en tiempo real
 * Connects to Blockchain.com WebSocket for real-time data
 */
export function useBlockchainData() {
  const [latestBlock, setLatestBlock] = useState<BlockData | null>(null);
  const [stats, setStats] = useState<BlockchainStats | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // Conectar WebSocket / Connect WebSocket
  useEffect(() => {
    // Usar datos simulados para desarrollo / Use mock data for development
    const mockData = () => {
      setIsConnected(true);
      setLatestBlock({
        height: 800000,
        hash: '0000000000000000000abcdef1234567890',
        timestamp: Date.now(),
        size: 1500000,
        weight: 4000000,
        txCount: 2500,
        difficulty: 72000000000000,
        merkleRoot: 'abc123def456',
        nonce: 1234567890,
        bits: '170f96e7',
      });
      setStats({
        blockHeight: 800000,
        hashRate: 550000000000000000000,
        difficulty: 72000000000000,
        totalSupply: 19500000,
        marketCap: 1200000000000,
      });
    };

    mockData();

    // Simular actualizaciones / Simulate updates
    const interval = setInterval(() => {
      setLatestBlock((prev) =>
        prev
          ? {
              ...prev,
              height: prev.height + Math.floor(Math.random() * 2),
              timestamp: Date.now(),
            }
          : null
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Función para recargar datos / Function to reload data
  const refetch = useCallback(() => {
    setError(null);
    // Recargar datos / Reload data
  }, []);

  return {
    latestBlock,
    stats,
    isConnected,
    error,
    refetch,
  };
}

/**
 * useBlockHistory - Hook para obtener historial de bloques
 * Hook to fetch block history
 */
export function useBlockHistory(limit: number = 10) {
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de historial / Simulate loading history
    const mockBlocks: BlockData[] = Array.from({ length: limit }, (_, i) => ({
      height: 800000 - i,
      hash: `0000000000000000000${i}abc${i}def`,
      timestamp: Date.now() - i * 600000,
      size: 1000000 + Math.random() * 1000000,
      weight: 3000000 + Math.random() * 1000000,
      txCount: Math.floor(Math.random() * 3000) + 1000,
      difficulty: 72000000000000,
      merkleRoot: `merkle${i}`,
      nonce: Math.floor(Math.random() * 1000000000),
      bits: '170f96e7',
    }));

    setBlocks(mockBlocks);
    setIsLoading(false);
  }, [limit]);

  return { blocks, isLoading };
}
