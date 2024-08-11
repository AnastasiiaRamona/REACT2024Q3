'use client';

import Button from '../components/Button/Button';
import c3poSrc from '../assets/c3po.gif';
import styles from './not-found.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const MissingPage = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <section className={styles['missing-page-section']}>
      <h2>404 - Page Not Found</h2>
      <Image src={c3poSrc} alt="c3po" unoptimized={true} />
      <div className={styles['text-and-button']}>
        <p>This is not the page you are looking for</p>
        <Button onClick={handleBackClick} text={'Back'}></Button>
      </div>
    </section>
  );
};

export default MissingPage;
