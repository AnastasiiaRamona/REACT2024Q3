import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './pages/Main/Main';
import NotFound from './pages/NotFound/NotFound';
import ReactHookForm from './pages/ReactHookForm/ReactHookForm';
import UncontrolledComponentsForm from './pages/UncontrolledComponentsForm/UncontrolledComponentsForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/main" element={<Main />} />
        <Route path="/uncontrolled-form" element={<UncontrolledComponentsForm />} />
        <Route path="/react-hook-form" element={<ReactHookForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
