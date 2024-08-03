import ThemeChanging from '../../components/ThemeChanging/ThemeChanging';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { useTheme } from '@/context/ThemeContext';
import ModalWindow from '../ModalWindow/ModalWindow';

export default function StartPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useTheme();

  return (
    <>
      <section data-testid="start-page" className={`container ${theme}`}>
        <Header />
        <ThemeChanging />
        {children}
        <Footer />
        <ModalWindow />
      </section>
    </>
  );
}
