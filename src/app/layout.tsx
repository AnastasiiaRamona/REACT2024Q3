import type { Metadata } from 'next';
import '../globals.css';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';

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
    <html lang="en">
      <ErrorBoundary>
        <body>{children}</body>
      </ErrorBoundary>
    </html>
  );
}
