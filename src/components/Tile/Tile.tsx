import TileProps from './types';
import styles from './Tile.module.css';

const Tile = ({ name, password, age, gender, country, email, file, className }: TileProps) => {
  return (
    <div className={`${styles.tile} ${className ? styles[className] : ''}`}>
      <div className={styles['image-container']}>
        {file && <img src={file as string} alt='Uploaded' className={styles.image} />}
      </div>
      <div className={styles.details}>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.age}>Age: {age}</p>
        <p className={styles.gender}>Gender: {gender}</p>
        <p className={styles.email}>Email: {email}</p>
        <p className={styles.country}>Country: {country}</p>
        <p className={styles.password}>Password: {password}</p>
      </div>
    </div>
  );
};

export default Tile;
