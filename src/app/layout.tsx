import type { Metadata, Viewport } from 'next';
import './globals.css';

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (process.env.GITHUB_ACTIONS === 'true' ? '/zacznijmy-mowic-po-polsku' : '');

export const metadata: Metadata = {
  title: 'Zaczynam mówić po polsku | Курс A0–B2 и подготовка к Rezydent UE',
  description:
    'Интерактивная образовательная игра-приложение для изучения польского языка от A0 до B2 для белорусов в Польше. Подготовка к экзамену Państwowej Komisji.',
  manifest: `${basePath}/manifest.json`,
  icons: {
    icon: [
      { url: `${basePath}/favicon.ico`, sizes: 'any' },
      { url: `${basePath}/icon-192.png`, sizes: '192x192', type: 'image/png' },
      { url: `${basePath}/icon-512.png`, sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: `${basePath}/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Po Polsku',
  },
};

export const viewport: Viewport = {
  themeColor: '#dc2626',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
