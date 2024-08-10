import styles from './DetailsComponent.module.css';
import HeroAttribute from '../HeroAttribute/HeroAttribute';
import lodash from 'lodash';
import Button from '../Button/Button';
import { useTheme } from '../../context/ThemeContext';
import { findImageById } from '../../helpers/utils';
import { useLocation, useNavigate } from '@remix-run/react';
import { DetailsPageProps } from 'src/types';

const DetailsComponent = ({ characterData }: DetailsPageProps) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleCloseClick = () => {
    const currentUrl = location.pathname;
    const params = new URLSearchParams(window.location.search);

    const newUrl = currentUrl.replace(/\/details\/[^/?]*/, '');

    const searchParams = params.toString() ? `?${params.toString()}` : '';

    navigate(`${newUrl}${searchParams}`);
  };

  const attributes = [
    { label: 'Height', value: characterData.height },
    { label: 'Mass', value: characterData.mass },
    { label: 'Hair Color', value: characterData.hair_color },
    { label: 'Skin Color', value: characterData.skin_color },
    { label: 'Eye Color', value: characterData.eye_color },
    { label: 'Birth Year', value: characterData.birth_year },
    { label: 'Gender', value: characterData.gender },
  ];

  const image = findImageById(lodash.camelCase(characterData.name));

  return (
    <div className={`${styles['details-component']} ${styles[theme]}`}>
      <h3>{characterData.name}</h3>
      <img src={image} alt={characterData.name} />
      {attributes.map((attr, index) => (
        <HeroAttribute key={index} label={attr.label} value={attr.value} />
      ))}
      <Button onClick={handleCloseClick} text={'Close'}></Button>
    </div>
  );
};

export default DetailsComponent;
