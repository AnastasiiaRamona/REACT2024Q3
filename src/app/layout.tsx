import type { Metadata } from 'next';
import '../globals.css';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';
import { Orbitron } from 'next/font/google';

const orbitron = Orbitron({ weight: '500', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Star Wars Heroes',
  description: 'All the heroes of the famous trilogies',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.className}`}>
      <ErrorBoundary>
        <body>{children}</body>
      </ErrorBoundary>
    </html>
  );
}
