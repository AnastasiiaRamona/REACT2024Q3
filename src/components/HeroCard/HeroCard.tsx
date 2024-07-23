import { HeroCardProps } from './types';
import styles from './HeroCard.module.css';
import peopleImagesSrc from '../../data/images';
import Checkbox from '../Checkbox/Checkbox';
import { useTheme } from '../../context/ThemeContext';
import { useModal } from '../../context/ModalContext';
import ModalWindow from '../ModalWindow/ModalWindow';

const HeroCard = ({ id, name, onClick }: HeroCardProps) => {
  const { theme } = useTheme();
  const { showModal } = useModal();

  const handleCheckboxClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    showModal();
  };

  function hideModal(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <section
        className={`${styles['hero-card-container']} ${styles[theme]}`}
        onClick={onClick}
        data-testid="hero-card"
      >
        <Checkbox onClick={handleCheckboxClick} />
        <div className={styles['hero-card']}>
          <h2>{name}</h2>
          <div className={styles['image-container']}>
            <img src={findImageById(id)} alt={name} />
          </div>
        </div>
      </section>
      <ModalWindow
        selectedItemsCount={1}
        onUnselectAll={hideModal}
        onDownload={() => console.log('Downloading items...')}
      />
    </>
  );
};

const findImageById = (id: string) => {
  const image = peopleImagesSrc.find((image) => image.id === id);
  if (image) {
    return image.src;
  }
};

export default HeroCard;
