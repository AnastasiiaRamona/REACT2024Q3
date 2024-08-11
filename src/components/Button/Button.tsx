'use client';

import { useTheme } from '../../context/ThemeContext';
import styles from './Button.module.css';
import ButtonProps from './types';
import Image from 'next/image';

const Button = ({ onClick, text, className, disabled, img, alt }: ButtonProps) => {
  const { theme } = useTheme();

  return (
    <button
      onClick={onClick}
      className={`${styles['star-wars-button']} ${styles[theme]} ${className}`}
      disabled={disabled}
    >
      {text}
      {img && alt && <Image src={img} alt={alt} />}
    </button>
  );
};

export default Button;
