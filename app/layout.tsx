import Footer from 'src/components/Footer/Footer';
import Header from 'src/components/Header/Header';
import ModalWindow from 'src/components/ModalWindow/ModalWindow';
import ThemeChanging from 'src/components/ThemeChanging/ThemeChanging';
import { useTheme } from 'src/context/ThemeContext';

function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <section data-testid="layout-container" className={`container ${theme}`}>
      <Header />
      <ThemeChanging />
      {children}
      <Footer />
      <ModalWindow />
    </section>
  );
}

export default Layout;
