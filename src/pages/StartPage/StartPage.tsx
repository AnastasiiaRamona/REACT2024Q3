import DetailsComponent from '../../components/DetailsComponent/DetailsComponent';
import ErrorButton from '../../components/ErrorButton/ErrorButton';
import MissingPage from '../../pages/MissingPage/MissingPage';
import SearchComponent from '../../components/SearchComponent/SearchComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store/store';

const StartPage = () => {
  return (
    <Provider store={store}>
      <section data-testid="start-page">
        <Router>
          <Routes>
            <Route path="/" element={<SearchComponent />}>
              <Route path="details/:name" element={<DetailsComponent />} />
            </Route>
            <Route path="/search/:page" element={<SearchComponent />}>
              <Route path="details/:name" element={<DetailsComponent />} />
            </Route>
            <Route path="*" element={<MissingPage />} />
          </Routes>
        </Router>
        <ErrorButton />
      </section>
    </Provider>
  );
};

export default StartPage;
