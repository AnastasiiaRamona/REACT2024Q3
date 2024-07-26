import { HeroCardProps } from './types';
import styles from './HeroCard.module.css';
import Checkbox from '../Checkbox/Checkbox';
import { useTheme } from '../../context/ThemeContext';
import ModalWindow from '../ModalWindow/ModalWindow';
import { useEffect, useState } from 'react';
import {
  addCharacter,
  clearCharacters,
  removeCharacter,
  setCheckedStatus,
} from '../../store/reducers/checkedItemsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCharacterDetailsQuery } from '../../store/reducers/apiReducer';
import { RootState } from '../../store/store';
import { saveAs } from 'file-saver';
import { convertToCSV, findImageById } from '../../helpers/utils';
import { showLoader, hideLoader } from '../../store/reducers/loaderSlice';

const HeroCard = ({ id, name, onClick }: HeroCardProps) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [loadData, setLoadData] = useState(false);

  const { data, refetch, isFetching, isSuccess } = useGetCharacterDetailsQuery(name || '', {
    skip: !loadData,
  });

  const isChecked = useSelector((state: RootState) => state.checkedItems.checkedStatus[name] || false);
  const selectedItems = useSelector((state: RootState) => state.checkedItems.items);
  const quantityOfSelectedItems = selectedItems.length;

  useEffect(() => {
    if (loadData && !isFetching) {
      if (isSuccess) {
        dispatch(hideLoader());
      } else if (!data) {
        dispatch(hideLoader());
      }
    } else if (loadData && isFetching) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [loadData, isFetching, isSuccess, data, dispatch]);

  useEffect(() => {
    if (isChecked && data && !isFetching && isSuccess) {
      dispatch(addCharacter(data.results[0]));
    }
  }, [isChecked, data, dispatch, isFetching, isSuccess]);

  useEffect(() => {
    if (quantityOfSelectedItems > 0) {
      setIsModalOpen(true);
    } else if (!isExiting) {
      setIsModalOpen(false);
    }
  }, [quantityOfSelectedItems, isExiting]);

  const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const newCheckedState = event.target.checked;
    dispatch(setCheckedStatus({ name, isChecked: newCheckedState }));

    if (newCheckedState) {
      setLoadData(true);
    } else {
      dispatch(removeCharacter(name));
      setLoadData(false);
    }
  };

  useEffect(() => {
    if (loadData && !isFetching && !isSuccess) {
      refetch();
    }
  }, [loadData, refetch, isFetching, isSuccess]);

  const handleUnselectAll = () => {
    setIsExiting(true);
    dispatch(clearCharacters());
  };

  const handleDownload = () => {
    const csvData = convertToCSV(selectedItems);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const fileName = `${quantityOfSelectedItems}_heroes.csv`;
    saveAs(blob, fileName);
  };

  useEffect(() => {
    if (isExiting) {
      const timeout = setTimeout(() => {
        setIsExiting(false);
        setIsModalOpen(false);
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
        <Checkbox id={name} isChecked={isChecked} onClick={handleCheckboxClick} />
        <div className={styles['hero-card']}>
          <h2>{name}</h2>
          <div className={styles['image-container']}>
            <img src={findImageById(id)} alt={name} />
          </div>
        </div>
      </section>
      {isModalOpen && (
        <ModalWindow
          selectedItemsCount={quantityOfSelectedItems}
          onUnselectAll={handleUnselectAll}
          onDownload={handleDownload}
          className={isExiting ? 'exit' : ''}
        />
      )}
    </>
  );
};

export default HeroCard;
