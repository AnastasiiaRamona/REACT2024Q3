import DetailsComponent from '../DetailsComponent/DetailsComponent';
import ErrorButton from '../ErrorButton/ErrorButton';
import MissingPage from '../MissingPage/MissingPage';
import SearchComponent from '../SearchComponent/SearchComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const StartPage = () => {
  return (
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
  );
};

export default StartPage;
