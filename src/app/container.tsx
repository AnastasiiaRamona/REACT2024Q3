'use client';

import Main from './main';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import ModalWindow from '@/components/ModalWindow/ModalWindow';
import ThemeChanging from '@/components/ThemeChanging/ThemeChanging';

const Container = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  // const { theme } = useTheme();
  // className={`container ${theme}`}

  return (
    <Main>
      <section data-testid="start-page">
        <Header />
        <ThemeChanging />
        <main>{children}</main>
        <Footer />
        <ModalWindow />
      </section>
    </Main>
  );
};

export default Container;
