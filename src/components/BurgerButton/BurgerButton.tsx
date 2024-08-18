import styles from './BurgerButton.module.css';
import BurgerButtonProps from './types';

const BurgerButton = ({ isOpen, toggleMenu }: BurgerButtonProps) => {
  return (
    <button onClick={toggleMenu} className={`${styles.burgerButton} ${isOpen ? styles.active : ''}`}>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
    </button>
  );
};

export default BurgerButton;
