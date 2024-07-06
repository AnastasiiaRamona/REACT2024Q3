import { ChangeEvent, Component, FormEvent } from 'react';
import { SearchResults } from '../SearchResults/SearchResults';
import { SearchButtonProps, SearchButtonState } from './types';
import axios from 'axios';
import apiAddress from '../data/data';

export class SearchButton extends Component<SearchButtonProps, SearchButtonState> {
  constructor(props: SearchButtonProps) {
    const searchTerm = localStorage.getItem('searchTermOfStarWarsHeroes') || '';
    super(props);
    this.state = {
      searchTerm: searchTerm,
      areResultsShows: true,
      results: [],
      error: null,
    };
  }

  componentDidMount() {
    this.findSearchTerm();
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    this.setState({ searchTerm: input });
  };

  handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.findSearchTerm();
  };

  findSearchTerm() {
    const { searchTerm } = this.state;
    this.getApiData(searchTerm.trim());
    localStorage.setItem('searchTermOfStarWarsHeroes', searchTerm);
  }

  getApiData = (query?: string) => {
    axios
      .get(`${apiAddress}?search=${query}&page=1`)
      .then((response) => {
        this.setState({ results: response.data.results, areResultsShows: true, error: null });
      })
      .catch((error) => {
        this.setState({ error: error.message, areResultsShows: false });
      });
  };

  render() {
    const { searchTerm, areResultsShows, results, error } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSearch}>
          <input type="text" value={searchTerm} onChange={this.handleInputChange} placeholder="Enter search term" />
          <button type="submit">Search</button>
        </form>
        {areResultsShows && <SearchResults results={results} error={error} />}
      </div>
    );
  }
}
