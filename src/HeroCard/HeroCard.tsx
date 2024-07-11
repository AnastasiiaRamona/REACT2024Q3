import { HeroCardProps } from './types';
import HeroAttribute from '../HeroAttribute/HeroAttribute';
import styles from './HeroCard.module.css';
import peopleImagesSrc from '../data/images';

const HeroCard = ({ id, name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender }: HeroCardProps) => {
  const heroAttributes = [
    { label: 'Height', prop: height },
    { label: 'Mass', prop: mass },
    { label: 'Hair Color', prop: hairColor },
    { label: 'Skin Color', prop: skinColor },
    { label: 'Eye Color', prop: eyeColor },
    { label: 'Birth Year', prop: birthYear },
    { label: 'Gender', prop: gender },
  ];

  console.log(id);

  return (
    <div className={styles['hero-card']}>
      <h2>{name}</h2>
      <div className={styles['image-container']}>
        <img src={findImageById(id)} alt={name} />
      </div>
      {heroAttributes.map(({ label, prop }) => (
        <HeroAttribute key={label} label={label} value={prop} />
      ))}
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
