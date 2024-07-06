import { Component } from 'react';
import { SearchButton } from '../SearchButton/SearchButton';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { ErrorButton } from '../ErrorButton/ErrorButton';

export class StartPage extends Component {
  render() {
    return (
      <section>
        <ErrorBoundary>
          <SearchButton searchTerm={''} />
          <ErrorButton />
        </ErrorBoundary>
      </section>
    );
  }
}
