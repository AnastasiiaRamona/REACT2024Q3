import jediSrc from '../../assets/jedi.webp';
import darthVaderSrc from '../../assets/darth-vader.webp';
import { useTheme } from '../../context/ThemeContext';
import styles from './Footer.module.css';
const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`${styles.footer} ${styles[theme]}`}>
      <img src={theme === 'light' ? jediSrc : darthVaderSrc} alt="star wars picture" />
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
