import styles from './ThemeChanging.module.css';

const ThemeChanging = () => {
  return (
    <div className={styles.checkboxWrapper}>
      <label className={styles.switch}>
        <input type="checkbox" className={styles.checkbox} />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};

export default ThemeChanging;
