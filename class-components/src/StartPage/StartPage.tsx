import { Component } from 'react';
import { SearchButton } from '../SearchButton/SearchButton';
import { ErrorButton } from '../ErrorButton/ErrorButton';

export class StartPage extends Component {
  render() {
    return (
      <section>
        <SearchButton searchTerm={''} />
        <ErrorButton />
      </section>
    );
  }
}
