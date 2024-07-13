import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './DetailsComponent.module.css';
import HeroAttribute from '../HeroAttribute/HeroAttribute';
import lodash from 'lodash';
import { Character } from './types';
import peopleImagesSrc from '../data/images';

const DetailsComponent = () => {
  const { name } = useParams();
  const [details, setDetails] = useState<Character>({} as Character);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (name) {
      setIsLoading(true);
      axios
        .get(`https://swapi.dev/api/people/?search=${name}`)
        .then((response) => {
          if (response.data.results.length > 0) {
            setDetails(response.data.results[0]);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching details:', error);
          setIsLoading(false);
        });
    }
  }, [name]);

  if (isLoading) {
    return <div className={styles['details-loader']}></div>;
  }

  const attributes = [
    { label: 'Height', value: details.height },
    { label: 'Mass', value: details.mass },
    { label: 'Hair Color', value: details.hair_color },
    { label: 'Skin Color', value: details.skin_color },
    { label: 'Eye Color', value: details.eye_color },
    { label: 'Birth Year', value: details.birth_year },
    { label: 'Gender', value: details.gender },
  ];

  return (
    <div className={styles['details-component']}>
      <h3>{details.name}</h3>
      <img src={findImageById(lodash.camelCase(details.name))} alt={name} />
      {attributes.map((attr, index) => (
        <HeroAttribute key={index} label={attr.label} value={attr.value} />
      ))}
      <button>Close</button>
    </div>
  );
};

export default DetailsComponent;

const findImageById = (id: string) => {
  const image = peopleImagesSrc.find((image) => image.id === id);
  if (image) {
    return image.src;
  }
};
