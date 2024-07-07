import { Component } from 'react';
import { ErrorButtonState } from './types';
import styles from './ErrorButton.module.css';

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
    return (
      <button className={styles['error-button']} onClick={handleClick}>
        {this.createTitle()}
      </button>
    );
  }
}
