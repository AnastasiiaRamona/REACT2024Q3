import { Component } from 'react';
import { HeroCardProps } from './types';
import { HeroAttribute } from '../HeroAttribute/HeroAttribute';

export class HeroCard extends Component<HeroCardProps> {
  render() {
    const { name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender } = this.props;

    const heroAttributes = [
      { label: 'Height', prop: height },
      { label: 'Mass', prop: mass },
      { label: 'Hair Color', prop: hairColor },
      { label: 'Skin Color', prop: skinColor },
      { label: 'Eye Color', prop: eyeColor },
      { label: 'Birth Year', prop: birthYear },
      { label: 'Gender', prop: gender },
    ];

    return (
      <div className="hero-card">
        <h2>{name}</h2>
        {heroAttributes.map(({ label, prop }) => (
          <HeroAttribute key={label} label={label} value={prop} />
        ))}
      </div>
    );
  }
}
