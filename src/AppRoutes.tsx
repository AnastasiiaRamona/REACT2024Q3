import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import UncontrolledForm from './pages/UncontrolledForm/UncontrolledForm';
import ReactHookForm from './pages/ReactHookForm/ReactHookForm';
import { Provider } from 'react-redux';
import store from './store/store';

function AppRoutes() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/uncontrolled-form' element={<UncontrolledForm />} />
          <Route path='/react-hook-form' element={<ReactHookForm />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default AppRoutes;
