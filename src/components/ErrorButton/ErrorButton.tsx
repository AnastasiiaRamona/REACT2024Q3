import { useState } from 'react';
import styles from './ErrorButton.module.css';

const ErrorButton = () => {
  const [clicked, setClicked] = useState(false);

  const createTitle = () => {
    if (clicked) {
      throw new Error('Test error to catch it');
    }
    return 'Throw Error';
  };

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <button className={styles['error-button']} onClick={handleClick}>
      {createTitle()}
    </button>
  );
};

export default ErrorButton;
