import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import ModalWindow from './components/ModalWindow/ModalWindow';
import { useTheme } from './context/ThemeContext';
import StartPage from './pages/StartPage/StartPage';

const App = () => {
  const { theme } = useTheme();

  return (
    <section data-testid="app-container" className={`container ${theme}`}>
      <ErrorBoundary>
        <Header />
        <StartPage />
        <Footer />
      </ErrorBoundary>
      <ModalWindow />
    </section>
  );
};

export default App;
