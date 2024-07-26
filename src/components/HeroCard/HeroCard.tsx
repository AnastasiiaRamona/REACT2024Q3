import { HeroCardProps } from './types';
import styles from './HeroCard.module.css';
import Checkbox from '../Checkbox/Checkbox';
import { useTheme } from '../../context/ThemeContext';
import ModalWindow from '../ModalWindow/ModalWindow';
import { useEffect, useState } from 'react';
import { addCharacter, removeCharacter } from '../../store/reducers/checkedItemsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCharacterDetailsQuery } from '../../store/reducers/apiReducer';
import { RootState } from '../../store/store';
import { saveAs } from 'file-saver';
import { convertToCSV, findImageById } from '../../helpers/utils';

const HeroCard = ({ id, name, onClick }: HeroCardProps) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loadData, setLoadData] = useState(false);

  const { data } = useGetCharacterDetailsQuery(name || '', {
    skip: !loadData,
  });

  const selectedItems = useSelector((state: RootState) => state.checkedItems.items);

  const handleCheckboxClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    if (newCheckedState) {
      setLoadData(true);
    } else {
      dispatch(removeCharacter(name));
      setLoadData(false);
    }

    if (isModalOpen) {
      setIsExiting(true);
    } else {
      if (newCheckedState) {
        setIsModalOpen(true);
      } else {
        setIsModalOpen(false);
      }
    }
  };

  useEffect(() => {
    if (loadData && data) {
      dispatch(addCharacter(data.results[0]));
    }
  }, [loadData, data, dispatch]);

  const handleUnselectAll = () => {
    setIsExiting(true);
    setIsChecked(false);
  };

  const handleDownload = () => {
    const csvData = convertToCSV(selectedItems);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const fileName = `${selectedItems.length}_heroes.csv`;
    saveAs(blob, fileName);
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

export default HeroCard;
