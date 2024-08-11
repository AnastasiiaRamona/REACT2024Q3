import { Provider } from 'react-redux';
import { ErrorBoundary } from 'src/components/ErrorBoundary/ErrorBoundary';
import { ModalProvider } from 'src/context/ModalContext';
import { ThemeProvider } from 'src/context/ThemeContext';
import store from 'src/store/store';

function App({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <ModalProvider>{children}</ModalProvider>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
