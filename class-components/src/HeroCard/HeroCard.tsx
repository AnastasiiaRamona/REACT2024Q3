import { Component } from 'react';
import { HeroCardProps } from './types';

export class HeroCard extends Component<HeroCardProps> {
  render() {
    const { name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender, homeWorld } = this.props;

    return (
      <div className="hero-card">
        <h2>{name}</h2>
        <p>
          <strong>Height:</strong> {height}
        </p>
        <p>
          <strong>Mass:</strong> {mass}
        </p>
        <p>
          <strong>Hair Color:</strong> {hairColor}
        </p>
        <p>
          <strong>Skin Color:</strong> {skinColor}
        </p>
        <p>
          <strong>Eye Color:</strong> {eyeColor}
        </p>
        <p>
          <strong>Birth Year:</strong> {birthYear}
        </p>
        <p>
          <strong>Gender:</strong> {gender}
        </p>
        <p>
          <strong>Home world:</strong> {homeWorld}
        </p>
      </div>
    );
  }
}
