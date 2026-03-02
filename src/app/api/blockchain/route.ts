import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route - Blockchain Proxy
 * Proxy para APIs de blockchain (Blockchain.com, Blockchair, etc.)
 * Proxy for blockchain APIs
 */

const BLOCKCHAIN_API = 'https://blockchain.info';

/**
 * GET handler - Obtiene datos de la blockchain
 * Fetches blockchain data
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint') || 'latestblock';
    
    // Fetch desde Blockchain.com API
    const response = await fetch(`${BLOCKCHAIN_API}/${endpoint}`, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 10 }, // Revalidar cada 10 segundos
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59',
      },
    });
  } catch (error) {
    console.error('Blockchain API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blockchain data' },
      { status: 500 }
    );
  }
}

/**
 * WebSocket upgrade handler para datos en tiempo real
 * WebSocket upgrade handler for real-time data
 */
export const dynamic = 'force-dynamic';
