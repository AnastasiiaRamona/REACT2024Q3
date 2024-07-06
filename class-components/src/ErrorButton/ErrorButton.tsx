import { Component } from 'react';
import { ErrorButtonState } from './types';

export class ErrorButton extends Component<object, ErrorButtonState> {
  constructor(props: object) {
    super(props);
    this.state = { clicked: false };
  }

  createTitle() {
    if (this.state.clicked) {
      throw new Error('Test error to catch it');
    }
    return 'Throw Error';
  }
  render() {
    const handleClick = () => {
      this.setState({ clicked: !this.state.clicked });
    };
    return <button onClick={handleClick}>{this.createTitle()}</button>;
  }
}
