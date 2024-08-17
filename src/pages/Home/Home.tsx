import { useSelector } from 'react-redux';
import Navigation from '../../components/Navigation/Navigation';
import { RootState } from '../../store/store';
import Tile from '../../components/Tile/Tile';
import styles from './Home.module.css';
import imgSrc from '../../assets/img.webp';
import { useEffect, useState } from 'react';

const Home = () => {
  const formData = useSelector((state: RootState) => state.form);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (formData.length > 0) {
      const lastIndex = formData.length - 1;
      setHighlightedIndex(lastIndex);

      const timer = setTimeout(() => {
        setHighlightedIndex(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [formData]);

  if (formData.length === 0) {
    return (
      <main>
        <Navigation />
        <div className={styles['tiles-container']}>
          <div className={styles['home-img-container']}>
            <img src={imgSrc} alt='img' className={styles['home-img']} />
            <p className={styles['empty-form']}>Add your first form</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Navigation />
      <div className={styles['tiles-container']}>
        {formData.map((data, index) => (
          <Tile
            key={index}
            name={data.name}
            age={data.age}
            gender={data.gender}
            password={data.password}
            country={data.country}
            email={data.email}
            file={data.file || ''}
            className={index === highlightedIndex ? 'highlighted' : ''}
          />
        ))}
      </div>
    </main>
  );
};

export default Home;
