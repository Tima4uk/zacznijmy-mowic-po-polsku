import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Zaczynam mówić po polsku | Курс A0–B2 и подготовка к Rezydent UE',
  description:
    'Интерактивная образовательная игра-приложение для изучения польского языка от A0 до B2 для белорусов в Польше. Подготовка к экзамену Państwowej Komisji.',
  manifest: '/manifest.json',
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
