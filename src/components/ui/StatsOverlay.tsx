'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Box, Globe, Clock, TrendingUp, Hash, 
  Activity, Cpu, Layers, Bitcoin 
} from 'lucide-react';

interface NetworkStats {
  blockHeight: number;
  hashrate: string;
  mempoolSize: number;
  nodes: number;
  difficulty: string;
  nextHalving: string;
  btcPrice: number;
  priceChange: number;
}

/**
 * 📊 StatsOverlay - Panel de estadísticas en tiempo real
 * 
 * Muestra las estadísticas de la red Bitcoin de forma
 * visual y kawaii~!
 */
export function StatsOverlay() {
  const [stats, setStats] = useState<NetworkStats>({
    blockHeight: 840000,
    hashrate: '650 EH/s',
    mempoolSize: 150,
    nodes: 18500,
    difficulty: '83.1T',
    nextHalving: '2028',
    btcPrice: 67500,
    priceChange: 2.5,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    const timer = setTimeout(() => setIsLoading(false), 1000);
    
    // En producción, aquí conectaríamos las APIs reales
    // fetchNetworkStats().then(setStats);
    
    return () => clearTimeout(timer);
  }, []);

  const statItems = [
    {
      label: 'Block Height',
      value: stats.blockHeight.toLocaleString(),
      icon: Box,
      color: 'orange' as const,
    },
    {
      label: 'Hashrate',
      value: stats.hashrate,
      icon: Cpu,
      color: 'purple' as const,
    },
    {
      label: 'Mempool',
      value: `${stats.mempoolSize} MB`,
      icon: Layers,
      color: 'cyan' as const,
    },
    {
      label: 'Nodes',
      value: stats.nodes.toLocaleString(),
      icon: Globe,
      color: 'green' as const,
    },
    {
      label: 'Difficulty',
      value: stats.difficulty,
      icon: Hash,
      color: 'pink' as const,
    },
    {
      label: 'BTC Price',
      value: `$${stats.btcPrice.toLocaleString()}`,
      icon: Bitcoin,
      color: 'orange' as const,
      subtext: `${stats.priceChange >= 0 ? '+' : ''}${stats.priceChange}%`,
    },
  ];

  return (
    <>
      {/* 🏷 Header con título */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute top-0 left-0 right-0 z-10 p-6 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/30"
            >
              <span className="text-2xl">₿</span>
            </motion.div>
            
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-mono gradient-text">
                Bitcoin Vault
              </h1>
              <p className="text-xs md:text-sm text-slate-400 font-mono">
                The most secure vault in the universe ✨
              </p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* 📊 Panel de stats */}
      <motion.aside
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="absolute top-24 right-4 z-10 w-64 md:w-72 pointer-events-none"
      >
        <div className="bg-cosmic-gray/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-700/50">
            <Activity className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-mono text-slate-300">Network Stats</span>
            {isLoading && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="ml-auto w-4 h-4 border-2 border-orange-400 border-t-transparent rounded-full"
              />
            )}
          </div>
          
          <div className="space-y-3">
            {statItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <item.icon className={`w-4 h-4 ${
                    item.color === 'orange' ? 'text-orange-400' :
                    item.color === 'purple' ? 'text-purple-400' :
                    item.color === 'cyan' ? 'text-cyan-400' :
                    item.color === 'green' ? 'text-green-400' :
                    'text-pink-400'
                  }`} />
                  <span className="text-xs text-slate-400 font-mono">{item.label}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-mono text-white">{item.value}</span>
                  {item.subtext && (
                    <span className={`ml-1 text-xs ${
                      stats.priceChange >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {item.subtext}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.aside>

      {/* 🎮 Controles hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
      >
        <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
          <span className="flex items-center gap-1">
            <span className="w-5 h-5 rounded border border-slate-600 flex items-center justify-center text-[10px]">🖱️</span>
            Drag
          </span>
          <span className="flex items-center gap-1">
            <span className="w-5 h-5 rounded border border-slate-600 flex items-center justify-center text-[10px]">⚙️</span>
            Scroll
          </span>
          <span className="text-orange-400">Auto-rotating~</span>
        </div>
      </motion.div>
    </>
  );
}
