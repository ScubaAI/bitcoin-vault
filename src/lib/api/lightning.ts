/**
 * Lightning API Client - Cliente API para 1ML (Lightning Network)
 * 
 * Funciones para obtener datos de la Lightning Network
 * Functions to fetch Lightning Network data
 */

const LIGHTNING_API_BASE = 'https://1ml.com';

/**
 * Obtener estadísticas de la red
 * Get network statistics
 */
export async function getNetworkStats() {
  try {
    const response = await fetch(`${LIGHTNING_API_BASE}/statistics`, {
      headers: { 
        Accept: 'application/json',
        'User-Agent': 'Bitcoin-Vault/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching network stats:', error);
    // Devolver datos simulados en caso de error
    return getMockLightningStats();
  }
}

/**
 * Obtener top nodos por capacidad
 * Get top nodes by capacity
 */
export async function getTopNodes(limit: number = 10) {
  try {
    const response = await fetch(`${LIGHTNING_API_BASE}/node`, {
      headers: { 
        Accept: 'application/json',
        'User-Agent': 'Bitcoin-Vault/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.slice(0, limit);
  } catch (error) {
    console.error('Error fetching top nodes:', error);
    return getMockTopNodes(limit);
  }
}

/**
 * Obtener información de un nodo
 * Get node information
 */
export async function getNodeInfo(publicKey: string) {
  try {
    const response = await fetch(`${LIGHTNING_API_BASE}/node/${publicKey}`, {
      headers: { 
        Accept: 'application/json',
        'User-Agent': 'Bitcoin-Vault/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching node info:', error);
    throw error;
  }
}

/**
 * Obtener estadísticas de canales
 * Get channel statistics
 */
export async function getChannelStats() {
  try {
    const response = await fetch(`${LIGHTNING_API_BASE}/channel`, {
      headers: { 
        Accept: 'application/json',
        'User-Agent': 'Bitcoin-Vault/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching channel stats:', error);
    return getMockChannelStats();
  }
}

// Datos simulados para desarrollo / Mock data for development

function getMockLightningStats() {
  return {
    node_count: 15000,
    channel_count: 75000,
    total_network_capacity: 500000000000,
    average_channel_size: 6666666,
    median_channel_size: 2000000,
    timestamp: new Date().toISOString(),
  };
}

function getMockTopNodes(limit: number) {
  return Array.from({ length: limit }, (_, i) => ({
    publicKey: `pubkey${i}_${Math.random().toString(36).substr(2, 16)}`,
    alias: `Node ${i + 1}`,
    capacity: Math.floor(Math.random() * 10000000000),
    channels: Math.floor(Math.random() * 500) + 10,
    firstSeen: Date.now() - Math.random() * 31536000000,
    updatedAt: Date.now(),
    city: ['New York', 'London', 'Tokyo', 'Berlin'][Math.floor(Math.random() * 4)],
    country: ['US', 'UK', 'JP', 'DE'][Math.floor(Math.random() * 4)],
  }));
}

function getMockChannelStats() {
  return {
    channel_count: 75000,
    avg_capacity: 6666666,
    med_capacity: 2000000,
    avg_channel_age: 180,
  };
}
