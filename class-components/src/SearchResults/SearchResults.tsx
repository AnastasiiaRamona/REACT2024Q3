import { Component } from 'react';
import { SearchResultsProps, SearchResultsState } from './types';
import { HeroCard } from '../HeroCard/HeroCard';
import axios from 'axios';

export class SearchResults extends Component<SearchResultsProps, SearchResultsState> {
  constructor(props: SearchResultsProps) {
    super(props);
    this.state = {
      filteredResults: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.filterResults();
  }

  componentDidUpdate(prevProps: SearchResultsProps) {
    if (prevProps.results !== this.props.results || prevProps.searchTerm !== this.props.searchTerm) {
      this.filterResults();
    }
  }

  async filterResults() {
    const { results, searchTerm } = this.props;

    const filteredResults = results.filter((result) => result.name.toLowerCase().includes(searchTerm.toLowerCase()));

    this.setState({ filteredResults, loading: true });

    try {
      await Promise.all(
        filteredResults.map(async (result) => {
          const response = await axios.get(result.homeworld);
          result.homeworld = response.data.name;
        })
      );
      this.setState({ loading: false, error: null });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ loading: false, error: error.message });
      } else {
        this.setState({ loading: false, error: 'An unknown error occurred.' });
      }
    }
  }

  render() {
    const { filteredResults, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {error && <div>Error: {error}</div>}
        <div>
          {filteredResults.map((result, index) => (
            <HeroCard
              key={index}
              name={result.name}
              height={result.height}
              mass={result.mass}
              hairColor={result.hair_color}
              skinColor={result.skin_color}
              eyeColor={result.eye_color}
              birthYear={result.birth_year}
              gender={result.gender}
              homeWorld={result.homeworld}
            />
          ))}
        </div>
      </div>
    );
  }
}
