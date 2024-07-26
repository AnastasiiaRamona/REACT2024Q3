import styles from './ModalWindow.module.css';
import { useTheme } from '../../context/ThemeContext';
import yodaSrc from '../../assets/mandalorian-baby-yoda.webp';
import sithSrc from '../../assets/cute-chibi-sith.webp';
import Button from '../Button/Button';
import { useModal } from '../../context/ModalContext';
import saveAs from 'file-saver';
import { convertToCSV } from '../../helpers/utils';
import { clearCharacters } from '../../store/reducers/checkedItemsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const ModalWindow = () => {
  const { isModalOpen, selectedItemsCount, closeModal } = useModal();
  const { theme } = useTheme();
  const dispatch = useDispatch();

  const selectedItems = useSelector((state: RootState) => state.checkedItems.items);

  const handleUnselectAll = () => {
    dispatch(clearCharacters());
    closeModal();
  };

  const handleDownload = () => {
    const csvData = convertToCSV(selectedItems);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const fileName = `${selectedItemsCount}_heroes.csv`;
    saveAs(blob, fileName);
  };

  if (!isModalOpen) return null;

  return (
    <div className={`${styles['modal-window']} ${styles[theme]}`}>
      <p>
        {selectedItemsCount} {selectedItemsCount === 1 ? 'Hero is' : 'Heroes are'} selected
      </p>
      <img src={theme === 'light' ? yodaSrc : sithSrc} alt="star wars picture" />
      <div className={styles['buttons']}>
        <Button text="Unselect all" onClick={handleUnselectAll} />
        <Button text="Download" onClick={handleDownload} />
      </div>
    </div>
  );
};

export default ModalWindow;
