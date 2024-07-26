import ModalWindowProps from './types';
import styles from './ModalWindow.module.css';
import { useTheme } from '../../context/ThemeContext';
import yodaSrc from '../../assets/mandalorian-baby-yoda.webp';
import sithSrc from '../../assets/cute-chibi-sith.webp';
import Button from '../Button/Button';

const ModalWindow = ({ selectedItemsCount, onUnselectAll, onDownload, className }: ModalWindowProps) => {
  const { theme } = useTheme();

  return (
    <div className={`${styles['modal-window']} ${styles[theme]} ${className ? styles[className] : ''}`}>
      <p>
        {selectedItemsCount} {selectedItemsCount === 1 ? 'Hero is' : 'Heroes are'} selected
      </p>
      <img src={theme === 'light' ? yodaSrc : sithSrc} alt="star wars picture" />
      <div className={styles['buttons']}>
        <Button text="Unselect all" onClick={onUnselectAll} />
        <Button text="Download" onClick={onDownload} />
      </div>
    </div>
  );
};

export default ModalWindow;
