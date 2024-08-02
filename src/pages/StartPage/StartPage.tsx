import DetailsComponent from '../../components/DetailsComponent/DetailsComponent';
import MissingPage from '../../pages/MissingPage/MissingPage';
import SearchComponent from '../../components/SearchComponent/SearchComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThemeChanging from '../../components/ThemeChanging/ThemeChanging';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { useTheme } from '@/context/ThemeContext';

const StartPage = () => {
  const { theme } = useTheme();

  return (
    <Router>
      <section data-testid="start-page" className={`container ${theme}`}>
        <Header />
        <ThemeChanging />
        <Routes>
          <Route path="/" element={<SearchComponent />}>
            <Route path="details/:name" element={<DetailsComponent />} />
          </Route>
          <Route path="/search/:page" element={<SearchComponent />}>
            <Route path="details/:name" element={<DetailsComponent />} />
          </Route>
          <Route path="*" element={<MissingPage />} />
        </Routes>
        <Footer />
      </section>
    </Router>
  );
};

export default StartPage;
