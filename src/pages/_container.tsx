import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import ModalWindow from '@/components/ModalWindow/ModalWindow';
import ThemeChanging from '@/components/ThemeChanging/ThemeChanging';
import { useTheme } from '@/context/ThemeContext';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const Container = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { theme } = useTheme();
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <section data-testid="start-page" className={`container ${theme}`}>
        <Header />
        <ThemeChanging />
        {getLayout(<Component {...pageProps} />)}
        <Footer />
        <ModalWindow />
      </section>
    </>
  );
};

export default Container;
