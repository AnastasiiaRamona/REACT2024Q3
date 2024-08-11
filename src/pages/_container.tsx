import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import ModalWindow from '@/components/ModalWindow/ModalWindow';
import ThemeChanging from '@/components/ThemeChanging/ThemeChanging';
import { useTheme } from '@/context/ThemeContext';
import { AppPropsWithLayout } from '../types';

const Container = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { theme } = useTheme();
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <section data-testid="start-page" className={`container ${theme}`}>
        <Header />
        <ThemeChanging />
        {getLayout(<Component {...pageProps} />, pageProps)}
        <Footer />
        <ModalWindow />
      </section>
    </>
  );
};

export default Container;
