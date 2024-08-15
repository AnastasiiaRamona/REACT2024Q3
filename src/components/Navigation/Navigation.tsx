import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <Link to='/home'>Home</Link>
      <Link to='/uncontrolled-form'>Uncontrolled Form</Link>
      <Link to='/react-hook-form'>React Hook Form</Link>
    </nav>
  );
};

export default Navigation;
