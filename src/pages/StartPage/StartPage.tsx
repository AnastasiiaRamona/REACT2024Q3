import DetailsComponent from '../../components/DetailsComponent/DetailsComponent';
import MissingPage from '../../pages/MissingPage/MissingPage';
import SearchComponent from '../../components/SearchComponent/SearchComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store/store';
import ThemeChanging from '../../components/ThemeChanging/ThemeChanging';

const StartPage = () => {
  return (
    <Provider store={store}>
      <Router>
        <section data-testid="start-page">
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
        </section>
      </Router>
    </Provider>
  );
};

export default StartPage;
