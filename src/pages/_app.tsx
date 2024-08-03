import type { AppProps } from 'next/app';
import '../globals.css';
import ClientProviders from '@/components/ClientProviders/ClientProviders';
import Container from './_container';

export default function MyApp(appProps: AppProps) {
  return (
    <ClientProviders>
      <Container {...appProps} />
    </ClientProviders>
  );
}
