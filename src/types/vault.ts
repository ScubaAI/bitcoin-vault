/**
 * Type Definitions - Definiciones de tipos para Bitcoin Vault
 * Type definitions for Bitcoin Vault
 * 
 * Tipos principales del proyecto / Main project types
 */

// ============================================
// Blockchain Types / Tipos de Blockchain
// ============================================

/**
 * Bloque de Bitcoin / Bitcoin Block
 */
export interface Block {
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
  previousBlockHash?: string;
  nextBlockHash?: string;
}

/**
 * Transacción de Bitcoin / Bitcoin Transaction
 */
export interface Transaction {
  txid: string;
  hash: string;
  version: number;
  size: number;
  vsize: number;
  weight: number;
  locktime: number;
  vin: TransactionInput[];
  vout: TransactionOutput[];
  blockhash?: string;
  confirmations?: number;
  time?: number;
  blocktime?: number;
  fee?: number;
}

/**
 * Entrada de transacción / Transaction input
 */
export interface TransactionInput {
  txid: string;
  vout: number;
  scriptSig: {
    asm: string;
    hex: string;
  };
  sequence: number;
  witness?: string[];
}

/**
 * Salida de transacción / Transaction output
 */
export interface TransactionOutput {
  value: number;
  n: number;
  scriptPubKey: {
    asm: string;
    hex: string;
    reqSigs?: number;
    type: string;
    addresses?: string[];
    address?: string;
  };
}

// ============================================
// Lightning Network Types / Tipos de Lightning Network
// ============================================

/**
 * Canal de Lightning Network / Lightning Network Channel
 */
export interface LightningChannel {
  channelId: string;
  chanPoint: string;
  lastUpdate: number;
  node1Pub: string;
  node2Pub: string;
  capacity: number;
  node1Policy?: RoutingPolicy;
  node2Policy?: RoutingPolicy;
}

/**
 * Política de enrutamiento / Routing policy
 */
export interface RoutingPolicy {
  timeLockDelta: number;
  minHtlc: number;
  feeBaseMsat: number;
  feeRateMilliMsat: number;
  disabled: boolean;
  maxHtlcMsat: number;
  lastUpdate: number;
}

/**
 * Nodo de Lightning Network / Lightning Network Node
 */
export interface LightningNode {
  publicKey: string;
  alias: string;
  color: string;
  addresses: NodeAddress[];
  lastUpdate: number;
  capacity: number;
  channelCount: number;
}

/**
 * Dirección de nodo / Node address
 */
export interface NodeAddress {
  network: string;
  addr: string;
}

// ============================================
// Mempool Types / Tipos de Mempool
// ============================================

/**
 * Estadísticas del mempool / Mempool statistics
 */
export interface MempoolStats {
  count: number;
  vsize: number;
  totalFee: number;
  feeHistogram: FeeHistogramEntry[];
}

/**
 * Entrada del histograma de fees / Fee histogram entry
 */
export interface FeeHistogramEntry {
  feeRange: [number, number];
  vsize: number;
  count: number;
}

/**
 * Recomendación de fee / Fee recommendation
 */
export interface FeeRecommendation {
  fastestFee: number;
  halfHourFee: number;
  hourFee: number;
  economyFee: number;
  minimumFee: number;
}

// ============================================
// UI Types / Tipos de UI
// ============================================

/**
 * Tema de colores / Color theme
 */
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
}

/**
 * Configuración de visualización / View configuration
 */
export interface ViewConfig {
  showBlocks: boolean;
  showTransactions: boolean;
  showLightning: boolean;
  showMempool: boolean;
  autoRotate: boolean;
  rotationSpeed: number;
}

// ============================================
// Educational Types / Tipos Educativos
// ============================================

/**
 * Paso del tour / Tour step
 */
export interface TourStep {
  id: string;
  title: string;
  titleES: string;
  content: string;
  contentES: string;
  icon: string;
  targetElement?: string;
}

/**
 * Pregunta del quiz / Quiz question
 */
export interface QuizQuestion {
  id: string;
  question: string;
  questionES: string;
  options: string[];
  optionsES: string[];
  correctAnswer: number;
  explanation: string;
  explanationES: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

/**
 * Logro del usuario / User achievement
 */
export interface Achievement {
  id: string;
  title: string;
  titleES: string;
  description: string;
  descriptionES: string;
  icon: string;
  unlockedAt?: Date;
  category: 'exploration' | 'learning' | 'social';
}

/**
 * Progreso del usuario / User progress
 */
export interface UserProgress {
  completedTours: string[];
  quizScores: Record<string, number>;
  achievements: string[];
  totalTimeSpent: number;
  lastVisit: Date;
}

// ============================================
// 3D Types / Tipos 3D
// ============================================

/**
 * Posición 3D / 3D position
 */
export interface Position3D {
  x: number;
  y: number;
  z: number;
}

/**
 * Configuración de bloque 3D / 3D block configuration
 */
export interface Block3DConfig {
  position: Position3D;
  scale: number;
  rotation: Position3D;
  color: string;
  isSelected: boolean;
  isHovered: boolean;
}

/**
 * Configuración de partícula / Particle configuration
 */
export interface ParticleConfig {
  count: number;
  size: number;
  color: string;
  opacity: number;
  speed: number;
}

// ============================================
// API Response Types / Tipos de Respuesta de API
// ============================================

/**
 * Respuesta de API genérica / Generic API response
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: number;
}

/**
 * Error de API / API error
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

/**
 * Paginación / Pagination
 */
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Resultado paginado / Paginated result
 */
export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
