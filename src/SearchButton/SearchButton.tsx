import { ChangeEvent, Component, FormEvent } from 'react';
import { SearchResults } from '../SearchResults/SearchResults';
import { SearchButtonProps, SearchButtonState } from './types';
import axios from 'axios';
import apiAddress from '../data/data';
import bb8Src from '../assets/bb-8.webp';
import styles from './SearchButton.module.css';

export class SearchButton extends Component<SearchButtonProps, SearchButtonState> {
  constructor(props: SearchButtonProps) {
    const searchTerm = localStorage.getItem('searchTermOfStarWarsHeroes') || '';
    super(props);
    this.state = {
      searchTerm: searchTerm,
      isLoading: false,
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
    localStorage.setItem('searchTermOfStarWarsHeroes', input);
  };

  handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.findSearchTerm();
  };

  findSearchTerm() {
    const { searchTerm } = this.state;
    this.getApiData(searchTerm.trim());
  }

  getApiData = (query: string) => {
    this.setState({ isLoading: true });

    axios
      .get(`${apiAddress}?search=${query}&page=1`)
      .then((response) => {
        this.setState({ results: response.data.results, areResultsShows: true, error: null });
      })
      .catch((error) => {
        this.setState({ error: error.message, areResultsShows: false });
      })
      .finally(() => {
        this.setState({ isLoading: false, areResultsShows: true });
      });
  };

  render() {
    const { searchTerm, isLoading, areResultsShows, results, error } = this.state;

    return (
      <div>
        <form onSubmit={this.handleSearch} className={styles['search-form']}>
          <input
            type="text"
            value={searchTerm}
            onChange={this.handleInputChange}
            placeholder="Enter search term"
            className={styles['search-input']}
          />
          <button type="submit" className={styles['search-button']}>
            Search
            <img src={bb8Src} alt="search" />
          </button>
        </form>
        {isLoading && <div className={styles['loader']}></div>}
        {areResultsShows && <SearchResults results={results} error={error} />}
      </div>
    );
  }
}
