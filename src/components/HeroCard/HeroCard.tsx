import { HeroCardProps } from './types';
import styles from './HeroCard.module.css';
import peopleImagesSrc from '../../data/images';

const HeroCard = ({ id, name, onClick }: HeroCardProps) => {
  return (
    <div className={styles['hero-card']} onClick={onClick} data-testid="hero-card">
      <h2>{name}</h2>
      <div className={styles['image-container']}>
        <img src={findImageById(id)} alt={name} />
      </div>
    </div>
  );
};

const findImageById = (id: string) => {
  const image = peopleImagesSrc.find((image) => image.id === id);
  if (image) {
    return image.src;
  }
};

export default HeroCard;
