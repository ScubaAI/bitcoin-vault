'use client';

import { useParams } from 'next/navigation';
import { TourGuide } from '@/components/educational/TourGuide';
import { QuizOverlay } from '@/components/educational/QuizOverlay';

/**
 * Tour Educativo Page - Educational Tour Page
 * Página de tours educativos sobre Bitcoin y blockchain
 * Educational tours page about Bitcoin and blockchain
 * 
 * Soporta internacionalización / Supports internationalization:
 * - /es/tour - Español
 * - /en/tour - English
 */
export default function TourPage() {
  const params = useParams();
  const lang = (params.lang as string) || 'es';
  
  // Contenido por idioma / Content by language
  const content = {
    es: {
      title: 'Tour Educativo de Bitcoin',
      subtitle: 'Aprende sobre blockchain, minería y Lightning Network',
      startButton: 'Comenzar Tour',
    },
    en: {
      title: 'Bitcoin Educational Tour',
      subtitle: 'Learn about blockchain, mining and Lightning Network',
      startButton: 'Start Tour',
    },
  };
  
  const t = content[lang as keyof typeof content] || content.es;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header del tour / Tour header */}
      <header className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-orange-500">
          {t.title}
        </h1>
        <p className="text-xl text-gray-300">
          {t.subtitle}
        </p>
      </header>

      {/* Secciones del tour / Tour sections */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tarjeta: Blockchain / Card: Blockchain */}
          <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-xl font-semibold mb-2">
              {lang === 'es' ? 'Blockchain' : 'Blockchain'}
            </h3>
            <p className="text-gray-400">
              {lang === 'es' 
                ? 'Entiende cómo funciona la cadena de bloques' 
                : 'Understand how the block chain works'}
            </p>
          </div>

          {/* Tarjeta: Minería / Card: Mining */}
          <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition">
            <div className="text-4xl mb-4">⛏️</div>
            <h3 className="text-xl font-semibold mb-2">
              {lang === 'es' ? 'Minería' : 'Mining'}
            </h3>
            <p className="text-gray-400">
              {lang === 'es' 
                ? 'Descubre el proceso de proof-of-work' 
                : 'Discover the proof-of-work process'}
            </p>
          </div>

          {/* Tarjeta: Lightning / Card: Lightning */}
          <div className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">
              {lang === 'es' ? 'Lightning Network' : 'Lightning Network'}
            </h3>
            <p className="text-gray-400">
              {lang === 'es' 
                ? 'Explora la capa 2 de Bitcoin' 
                : 'Explore Bitcoin\'s layer 2'}
            </p>
          </div>
        </div>
      </section>

      {/* Componentes educativos / Educational components */}
      <TourGuide lang={lang} />
      <QuizOverlay lang={lang} />
    </main>
  );
}
