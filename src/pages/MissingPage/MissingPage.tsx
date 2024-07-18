import c3poSrc from '../../assets/c3po.gif';
import styles from './MissingPage.module.css';
import { useNavigate } from 'react-router-dom';

const MissingPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <section className={styles['missing-page-section']}>
      <h2>404 - Page Not Found</h2>
      <img src={c3poSrc} alt="c3po" />
      <div className={styles['text-and-button']}>
        <p>This is not the page you are looking for</p>
        <button onClick={handleBackClick}>Back</button>
      </div>
    </section>
  );
};

export default MissingPage;
