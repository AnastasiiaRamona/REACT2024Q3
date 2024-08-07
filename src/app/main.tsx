'use client';

import ClientProviders from '@/components/ClientProviders/ClientProviders';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';

const Main = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ErrorBoundary>
      <ClientProviders>{children}</ClientProviders>
    </ErrorBoundary>
  );
};

export default Main;
