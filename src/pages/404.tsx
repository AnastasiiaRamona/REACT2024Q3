import c3poSrc from '../assets/c3po.gif';
import Button from '../components/Button/Button';
import styles from './404.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

const MissingPage = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <section className={styles['missing-page-section']}>
      <h2>404 - Page Not Found</h2>
      <Image src={c3poSrc} alt="c3po" />
      <div className={styles['text-and-button']}>
        <p>This is not the page you are looking for</p>
        <Button onClick={handleBackClick} text={'Back'}></Button>
      </div>
    </section>
  );
};

export default MissingPage;
