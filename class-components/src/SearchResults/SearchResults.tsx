import { Component } from 'react';
import { SearchResultsProps, SearchResultsState } from './types';
import { HeroCard } from '../HeroCard/HeroCard';

export class SearchResults extends Component<SearchResultsProps, SearchResultsState> {
  constructor(props: SearchResultsProps) {
    super(props);
    this.state = {
      loading: false,
      filteredResults: [],
    };
  }

  componentDidUpdate(prevProps: SearchResultsProps) {
    if (prevProps.results !== this.props.results) {
      this.filterResults();
    }
  }

  filterResults() {
    const { results } = this.props;
    this.setState({ filteredResults: results });
  }

  render() {
    const { filteredResults } = this.state;
    const { error } = this.props;

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
            />
          ))}
        </div>
      </div>
    );
  }
}
