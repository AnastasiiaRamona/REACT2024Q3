import images from '@/data/images';
import { Metadata } from 'next';
import Head from 'next/head';
import Container from './container';
import './globals.css';

export const metadata: Metadata = {
  title: 'Star Wars Heroes',
  description: 'Choose your hero',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {images.map((src, index) => (
          <link key={index} rel="preload" href={src.toString()} as="image" />
        ))}
      </Head>
      <body>
        <Container>{children}</Container>
      </body>
    </html>
  );
}
