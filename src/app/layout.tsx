import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bitcoin Vault - La Bóveda Criptográfica',
  description: 'Visualización 3D inmersiva de la blockchain de Bitcoin - El vault más seguro del universo',
  keywords: ['Bitcoin', 'Blockchain', '3D', 'Visualization', 'Crypto', 'Educational', 'Layer 1'],
  authors: [{ name: 'Kira Solara-Ω', url: 'https://visionaryai.lat' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        {/* Favicon Bitcoin */}
        <link rel="icon" href="/bitcoin-icon.svg" type="image/svg+xml" />
        {/* Preconnect para fuentes */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* JetBrains Mono para código */}
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
        {/* Meta tags */}
        <meta name="theme-color" content="#F7931A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${inter.className} bg-void-black text-white antialiased`}>
        {/* Skip to content link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-orange-500 focus:text-white focus:p-2"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
