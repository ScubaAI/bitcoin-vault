'use client';

import { motion, AnimatePresence } from 'framer-motion';

/**
 * BlockDetailsProps - Propiedades del componente BlockDetails
 * BlockDetails component properties
 */
interface BlockDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  block?: {
    height: number;
    hash: string;
    timestamp: number;
    transactions: number;
    size: number;
    weight: number;
    difficulty: number;
    merkleRoot: string;
  };
}

/**
 * BlockDetails - Panel de detalles de un bloque
 * Block details panel component
 * 
 * Muestra información detallada de un bloque seleccionado
 * Displays detailed information of a selected block
 */
export function BlockDetails({ isOpen, onClose, block }: BlockDetailsProps) {
  if (!block) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="absolute right-4 top-20 bottom-4 w-96 z-20"
        >
          <div className="bg-black/80 backdrop-blur-md rounded-xl border border-white/10 p-6 h-full overflow-y-auto">
            {/* Header / Encabezado */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-orange-500">
                Block #{block.height.toLocaleString()}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            {/* Información del bloque / Block information */}
            <div className="space-y-4">
              <DetailRow label="Hash" value={formatHash(block.hash)} />
              <DetailRow 
                label="Timestamp" 
                value={new Date(block.timestamp).toLocaleString()} 
              />
              <DetailRow 
                label="Transactions" 
                value={block.transactions.toLocaleString()} 
              />
              <DetailRow 
                label="Size" 
                value={`${(block.size / 1024).toFixed(2)} KB`} 
              />
              <DetailRow 
                label="Weight" 
                value={`${block.weight.toLocaleString()} WU`} 
              />
              <DetailRow 
                label="Difficulty" 
                value={block.difficulty.toExponential(2)} 
              />
              <DetailRow 
                label="Merkle Root" 
                value={formatHash(block.merkleRoot)} 
              />
            </div>

            {/* Botones de acción / Action buttons */}
            <div className="mt-6 space-y-2">
              <button className="w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 rounded-lg transition">
                View on Explorer
              </button>
              <button className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                Copy Hash
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * DetailRow - Fila de detalle
 * Detail row component
 */
interface DetailRowProps {
  label: string;
  value: string;
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="border-b border-white/10 pb-2">
      <p className="text-xs text-gray-400 uppercase">{label}</p>
      <p className="text-sm font-mono text-white break-all">{value}</p>
    </div>
  );
}

/**
 * Formatear hash para mostrar
 * Format hash for display
 */
function formatHash(hash: string): string {
  if (hash.length <= 20) return hash;
  return `${hash.slice(0, 10)}...${hash.slice(-10)}`;
}
