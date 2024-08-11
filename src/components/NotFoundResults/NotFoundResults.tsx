import chewbaccaSrc from '../../assets/chewbacca.webp';
import styles from './NotFoundResults.module.css';
import Image from 'next/image';

const NotFoundResults = () => {
  return (
    <section className={styles['not-found-results-section']}>
      <Image src={chewbaccaSrc} alt="chewbacca" />
      <h2>No Results Found. Please try again</h2>
    </section>
  );
};

export default NotFoundResults;
