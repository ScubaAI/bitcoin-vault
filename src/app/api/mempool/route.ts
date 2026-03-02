import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route - Mempool Data
 * Proxy para API de Mempool.space
 * Proxy for Mempool.space API
 */

const MEMPOOL_API = 'https://mempool.space/api';

/**
 * GET handler - Obtiene datos del mempool
 * Fetches mempool data
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'mempool';
    
    let endpoint = '/mempool';
    
    // Seleccionar endpoint según el tipo de dato
    switch (type) {
      case 'fees':
        endpoint = '/v1/fees/recommended';
        break;
      case 'blocks':
        endpoint = '/v1/blocks';
        break;
      case 'mempool':
      default:
        endpoint = '/mempool';
    }
    
    const response = await fetch(`${MEMPOOL_API}${endpoint}`, {
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 5 }, // Datos más frecuentes para mempool
    });

    if (!response.ok) {
      throw new Error(`Mempool API Error: ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=5, stale-while-revalidate=29',
      },
    });
  } catch (error) {
    console.error('Mempool API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mempool data' },
      { status: 500 }
    );
  }
}
