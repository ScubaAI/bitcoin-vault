import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route - Lightning Network Stats
 * Proxy para API de 1ML (Lightning Network statistics)
 * Proxy for 1ML API (Lightning Network statistics)
 */

const LIGHTNING_API = 'https://1ml.com';

/**
 * GET handler - Obtiene estadísticas de Lightning Network
 * Fetches Lightning Network statistics
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'stats';
    
    // 1ML API endpoints
    let endpoint = '/statistics';
    
    switch (type) {
      case 'nodes':
        endpoint = '/node';
        break;
      case 'channels':
        endpoint = '/channel';
        break;
      case 'stats':
      default:
        endpoint = '/statistics';
    }
    
    // Nota: 1ML requiere API key en producción
    const response = await fetch(`${LIGHTNING_API}${endpoint}`, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Bitcoin-Vault/1.0',
      },
      next: { revalidate: 60 }, // Lightning data cambia menos frecuentemente
    });

    if (!response.ok) {
      // Fallback a datos simulados si la API falla
      return NextResponse.json(getMockLightningData());
    }

    const data = await response.json();
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Lightning API Error:', error);
    // Devolver datos simulados en caso de error
    return NextResponse.json(getMockLightningData());
  }
}

/**
 * Datos simulados para desarrollo
 * Mock data for development
 */
function getMockLightningData() {
  return {
    node_count: 15000,
    channel_count: 75000,
    total_capacity: 500000000000, // sats
    avg_channel_size: 6666666,
    timestamp: new Date().toISOString(),
    mock: true,
  };
}
