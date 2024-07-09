import { Component, ErrorInfo } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from './types';
import c3poSrc from '../assets/c3po.gif';
import styles from './ErrorBoundary.module.css';

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className={styles['error-section']}>
          <img src={c3poSrc} alt="s3po" />
          <h2>Something went wrong!</h2>
        </section>
      );
    }

    return this.props.children;
  }
}
