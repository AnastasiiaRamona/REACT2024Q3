'use client';

import jediSrc from '../../assets/jedi.webp';
import darthVaderSrc from '../../assets/darth-vader.webp';
import styles from './Footer.module.css';
import Image from 'next/image';
import { useTheme } from '../../context/ThemeContext';
const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`${styles.footer} ${styles[theme]}`}>
      <Image src={theme === 'light' ? jediSrc : darthVaderSrc} alt="star wars picture" />
      <a
        href="https://github.com/AnastasiiaRamona"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles[theme]}`}
      >
        Anastasiia Ramona
      </a>
      <p>2024</p>
    </footer>
  );
};

export default Footer;
