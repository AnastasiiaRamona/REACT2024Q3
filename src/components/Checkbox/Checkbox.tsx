import { useTheme } from '../../context/ThemeContext';
import styles from './Checkbox.module.css';
import CheckboxProps from './types';

const Checkbox = ({ id, onClick, isChecked }: CheckboxProps) => {
  const { theme } = useTheme();

  return (
    <div className={styles['checkbox-wrapper-12']}>
      <div className={styles['cbx']}>
        <input
          id={id}
          type="checkbox"
          className={styles[theme]}
          onChange={onClick}
          onClick={(event) => event.stopPropagation()}
          checked={isChecked}
        />
        <label htmlFor={id} className={styles[theme]}></label>
        <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
          <path d="M2 8.36364L6.23077 12L13 2" className={styles[theme]}></path>
        </svg>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id={`goo`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"></feGaussianBlur>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7"
              result="goo"
            ></feColorMatrix>
            <feBlend in="SourceGraphic" in2="goo"></feBlend>
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Checkbox;
