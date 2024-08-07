import { useTheme } from '@/context/ThemeContext';
import styles from './Header.module.css';

const Header = () => {
  const { theme } = useTheme();

  return (
    <header>
      <h1>
        <span className={`${styles.title} ${styles[theme]}`}>Star Wars</span> Heroes
      </h1>
    </header>
  );
};

export default Header;
