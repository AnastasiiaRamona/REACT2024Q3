import { HeroCardProps } from './types';
import styles from './HeroCard.module.css';
import peopleImagesSrc from '../../data/images';
import Checkbox from '../Checkbox/Checkbox';
import { useTheme } from '../../context/ThemeContext';

const HeroCard = ({ id, name, onClick }: HeroCardProps) => {
  const { theme } = useTheme();

  return (
    <section className={`${styles['hero-card-container']} ${styles[theme]}`} onClick={onClick} data-testid="hero-card">
      <Checkbox />
      <div className={styles['hero-card']}>
        <h2>{name}</h2>
        <div className={styles['image-container']}>
          <img src={findImageById(id)} alt={name} />
        </div>
      </div>
    </section>
  );
};

const findImageById = (id: string) => {
  const image = peopleImagesSrc.find((image) => image.id === id);
  if (image) {
    return image.src;
  }
};

export default HeroCard;
