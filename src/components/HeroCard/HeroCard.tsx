import { HeroCardProps } from './types';
import styles from './HeroCard.module.css';
import peopleImagesSrc from '../../data/images';
import Checkbox from '../Checkbox/Checkbox';
import { useTheme } from '../../context/ThemeContext';
import ModalWindow from '../ModalWindow/ModalWindow';
import { useEffect, useState } from 'react';

const HeroCard = ({ id, name, onClick }: HeroCardProps) => {
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (isChecked) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }

    if (isModalOpen) {
      setIsExiting(true);
    } else {
      if (isChecked) {
        setIsModalOpen(false);
      } else {
        setIsModalOpen(true);
      }
    }
  };

  const handleUnselectAll = () => {
    console.log('Unselecting items...');
    setIsExiting(true);
    setIsChecked(false);
  };

  const handleDownload = () => {
    console.log('Downloading items...');
  };

  const handleClose = () => {
    setIsExiting(true);
  };

  useEffect(() => {
    if (isExiting) {
      const timeout = setTimeout(() => {
        setIsModalOpen(false);
        setIsExiting(false);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [isExiting]);

  return (
    <>
      <section
        className={`${styles['hero-card-container']} ${styles[theme]}`}
        onClick={onClick}
        data-testid="hero-card"
      >
        <Checkbox isChecked={isChecked} onClick={handleCheckboxClick} />
        <div className={styles['hero-card']}>
          <h2>{name}</h2>
          <div className={styles['image-container']}>
            <img src={findImageById(id)} alt={name} />
          </div>
        </div>
      </section>
      {isModalOpen && (
        <ModalWindow
          selectedItemsCount={1}
          onUnselectAll={handleUnselectAll}
          onDownload={handleDownload}
          onClose={handleClose}
          className={isExiting ? 'exit' : ''}
        />
      )}
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
