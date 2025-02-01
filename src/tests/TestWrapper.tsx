import { Provider } from 'react-redux';
import store from '../store/store';
import { ThemeProvider } from '../context/ThemeContext';
import { ModalProvider } from '../context/ModalContext';

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <ThemeProvider>
      <ModalProvider>{children}</ModalProvider>
    </ThemeProvider>
  </Provider>
);

export default TestWrapper;
