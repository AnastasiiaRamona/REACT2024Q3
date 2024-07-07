import { Component } from 'react';
import { HeroAttributeProps } from './types';

export class HeroAttribute extends Component<HeroAttributeProps> {
  render() {
    const { label, value } = this.props;

    return (
      <p>
        <strong>{label}:</strong> {value}
      </p>
    );
  }
}
