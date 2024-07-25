import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import { useTheme } from './context/ThemeContext';
import StartPage from './pages/StartPage/StartPage';

const App = () => {
  const { theme } = useTheme();

  return (
    <section className={`container ${theme}`}>
      <ErrorBoundary>
        <Header />
        <StartPage />
        <Footer />
      </ErrorBoundary>
    </section>
  );
};

export default App;
