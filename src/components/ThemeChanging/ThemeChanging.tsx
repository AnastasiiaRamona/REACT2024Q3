import styles from './ThemeChanging.module.css';
import { useTheme } from '../../context/ThemeContext';
const ThemeChanging = () => {
  const { theme, setTheme } = useTheme();
  const isChecked = theme === 'dark';

  const handleCheckboxChange = () => {
    setTheme(isChecked ? 'light' : 'dark');
  };

  return (
    <div className={styles.checkboxWrapper}>
      <label className={styles.switch}>
        <input type="checkbox" className={styles.checkbox} checked={isChecked} onChange={handleCheckboxChange} />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};

export default ThemeChanging;
