import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';
import BurgerButton from '../BurgerButton/BurgerButton';
import { useState } from 'react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`${styles['navigation']} ${isOpen ? styles.active : ''}`}>
      <BurgerButton isOpen={isOpen} toggleMenu={toggleMenu} />
      <p>M E N U</p>
      <Link to='/home'>Home</Link>
      <Link to='/uncontrolled-form'>Uncontrolled Form</Link>
      <Link to='/react-hook-form'>React Hook Form</Link>
    </nav>
  );
};

export default Navigation;
