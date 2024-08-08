'use client';

import { useTheme } from '@/context/ThemeContext';
import { findImageById } from '@/helpers/utils';
import { useRouter, usePathname } from 'next/navigation';
import Button from '../Button/Button';
import HeroAttribute from '../HeroAttribute/HeroAttribute';
import Image from 'next/image';
import styles from './DetailsComponent.module.css';
import { CharacterResponse } from '@/app/search/[page]/details/[name]/types';
import lodash from 'lodash';

const DetailsComponent = ({ characterData }: CharacterResponse) => {
  const router = useRouter();
  const { theme } = useTheme();
  const pathname = usePathname();

  const handleCloseClick = () => {
    const currentUrl = pathname;
    const params = new URLSearchParams(window.location.search);

    const newUrl = currentUrl.replace(/\/details\/[^/?]*/, '');

    const searchParams = params.toString() ? `?${params.toString()}` : '';

    router.push(`${newUrl}${searchParams}`);
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
      {characterData.name && image && (
        <Image className={styles['details-image']} src={image} alt={characterData.name} />
      )}
      {attributes.map((attr, index) => (
        <HeroAttribute key={index} label={attr.label} value={attr.value} />
      ))}
      <Button onClick={handleCloseClick} text={'Close'}></Button>
    </div>
  );
};

export default DetailsComponent;
