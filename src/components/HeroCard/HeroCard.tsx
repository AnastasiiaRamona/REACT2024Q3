'use client';

import { HeroCardProps } from './types';
import styles from './HeroCard.module.css';
import Checkbox from '../Checkbox/Checkbox';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Image from 'next/image';
import { useModal } from '@/context/ModalContext';
import { useTheme } from '@/context/ThemeContext';
import { findImageById } from '@/helpers/utils';
import { useGetCharacterDetailsQuery } from '@/store/reducers/apiReducer';
import { addCharacter, setCheckedStatus, removeCharacter } from '@/store/reducers/checkedItemsSlice';
import { hideLoader, showLoader } from '@/store/reducers/loaderSlice';

const HeroCard = ({ id, name, onClick }: HeroCardProps) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const [loadData, setLoadData] = useState(false);
  const { isModalOpen, openModal, closeModal } = useModal();

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
      openModal(quantityOfSelectedItems);
    } else if (quantityOfSelectedItems === 0 && isModalOpen) {
      closeModal();
    }
  }, [quantityOfSelectedItems, isModalOpen, openModal, closeModal]);

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

  const image = findImageById(id);

  return (
    <section className={`${styles['hero-card-container']} ${styles[theme]}`} onClick={onClick} data-testid="hero-card">
      <Checkbox id={name} isChecked={isChecked} onClick={handleCheckboxClick} />
      <div className={styles['hero-card']}>
        <h2>{name}</h2>
        <div className={styles['image-container']}>
          {image && <Image className={styles['image-container-image']} src={image} alt={name} priority={true} />}
        </div>
      </div>
    </section>
  );
};

export default HeroCard;
