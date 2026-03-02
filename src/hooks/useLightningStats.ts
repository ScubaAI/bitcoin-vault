'use client';

import { useState, useEffect } from 'react';

/**
 * LightningStats - Estadísticas de Lightning Network
 * Lightning Network statistics interface
 */
export interface LightningStats {
  nodeCount: number;
  channelCount: number;
  totalCapacity: number; // En satoshis / In satoshis
  avgChannelSize: number;
  medCapacity: number;
  torNodes: number;
  clearnetNodes: number;
}

/**
 * LightningNode - Nodo de Lightning Network
 * Lightning Network node interface
 */
export interface LightningNode {
  publicKey: string;
  alias: string;
  capacity: number;
  channels: number;
  firstSeen: number;
  updatedAt: number;
  city?: string;
  country?: string;
}

/**
 * useLightningStats - Hook para obtener estadísticas de Lightning
 * Hook to fetch Lightning Network statistics
 * 
 * Obtiene datos de 1ML API
 * Fetches data from 1ML API
 */
export function useLightningStats() {
  const [stats, setStats] = useState<LightningStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Datos simulados / Mock data
    const mockStats: LightningStats = {
      nodeCount: 15000,
      channelCount: 75000,
      totalCapacity: 500000000000,
      avgChannelSize: 6666666,
      medCapacity: 2000000,
      torNodes: 8000,
      clearnetNodes: 7000,
    };

    setStats(mockStats);
    setIsLoading(false);

    // Simular pequeñas variaciones / Simulate small variations
    const interval = setInterval(() => {
      setStats((prev) =>
        prev
          ? {
              ...prev,
              nodeCount: prev.nodeCount + Math.floor(Math.random() * 10 - 5),
              channelCount: prev.channelCount + Math.floor(Math.random() * 50 - 25),
              totalCapacity: prev.totalCapacity + Math.floor(Math.random() * 1000000000 - 500000000),
            }
          : null
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return {
    stats,
    isLoading,
    error,
  };
}

/**
 * useLightningTopNodes - Hook para obtener top nodos
 * Hook to fetch top Lightning nodes
 */
export function useLightningTopNodes(limit: number = 10) {
  const [nodes, setNodes] = useState<LightningNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular nodos / Mock nodes
    const mockNodes: LightningNode[] = Array.from({ length: limit }, (_, i) => ({
      publicKey: `pubkey${i}_${Math.random().toString(36).substr(2, 16)}`,
      alias: `Node ${i + 1}`,
      capacity: Math.floor(Math.random() * 10000000000),
      channels: Math.floor(Math.random() * 500) + 10,
      firstSeen: Date.now() - Math.random() * 31536000000,
      updatedAt: Date.now(),
      city: ['New York', 'London', 'Tokyo', 'Berlin'][Math.floor(Math.random() * 4)],
      country: ['US', 'UK', 'JP', 'DE'][Math.floor(Math.random() * 4)],
    }));

    // Ordenar por capacidad / Sort by capacity
    mockNodes.sort((a, b) => b.capacity - a.capacity);

    setNodes(mockNodes);
    setIsLoading(false);
  }, [limit]);

  return { nodes, isLoading };
}
