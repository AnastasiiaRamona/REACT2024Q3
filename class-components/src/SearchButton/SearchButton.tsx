import { ChangeEvent, Component, FormEvent } from 'react';
import { SearchResults } from '../SearchResults/SearchResults';
import { SearchButtonProps, SearchButtonState } from './types';
import axios from 'axios';

export class SearchButton extends Component<SearchButtonProps, SearchButtonState> {
  constructor(props: SearchButtonProps) {
    super(props);
    this.state = {
      searchTerm: '',
      showResults: false,
      results: [],
      error: null,
    };
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.getApiData(this.state.searchTerm);
  };

  getApiData = (query: string) => {
    axios
      .get(`https://swapi.dev/api/people?search=${query}`)
      .then((response) => {
        this.setState({ results: response.data.results, showResults: true, error: null });
      })
      .catch((error) => {
        this.setState({ error: error.message, showResults: false });
      });
  };

  render() {
    const { searchTerm, showResults, results, error } = this.state;

    return (
      <section>
        <form onSubmit={this.handleSearch}>
          <input type="text" value={searchTerm} onChange={this.handleInputChange} placeholder="Enter search term" />
          <button type="submit">Search</button>
        </form>
        {showResults && <SearchResults searchTerm={searchTerm} results={results} error={error} />}
      </section>
    );
  }
}
