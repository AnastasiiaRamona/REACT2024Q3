import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <ErrorBoundary>
        <body>
          <Main />
          <NextScript />
        </body>
      </ErrorBoundary>
    </Html>
  );
}
