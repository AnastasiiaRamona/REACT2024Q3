'use client';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import ModalWindow from '@/components/ModalWindow/ModalWindow';
import ThemeChanging from '@/components/ThemeChanging/ThemeChanging';
import { useTheme } from '@/context/ThemeContext';

const Container = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { theme } = useTheme();

  return (
    <section data-testid="start-page" className={`container ${theme}`}>
      <Header />
      <ThemeChanging />
      <main>{children}</main>
      <Footer />
      <ModalWindow />
    </section>
  );
};

export default Container;
