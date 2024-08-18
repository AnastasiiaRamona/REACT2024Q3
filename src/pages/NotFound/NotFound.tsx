import imageSrc from '../../assets/404.webp';
import Button from '../../components/Button/Button';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>404 - Page Not Found</h1>
      <img src={imageSrc} alt='404' className={styles.image} />
      <div className={styles.textContainer}>
        <p className={styles.text}>This is not the page you are looking for</p>
        <Button text='Go Back' onClick={() => window.history.back()} />
      </div>
    </div>
  );
};

export default NotFound;
