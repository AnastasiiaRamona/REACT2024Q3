import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './DetailsComponent.module.css';
import HeroAttribute from '../HeroAttribute/HeroAttribute';
import lodash from 'lodash';
import { Character } from './types';
import peopleImagesSrc from '../../data/images';

const DetailsComponent = () => {
  const { name } = useParams();
  const [details, setDetails] = useState<Character>({} as Character);
  const [isLoading, setIsLoading] = useState(true);
  const [isMissing, setIsMissing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (name) {
      setIsLoading(true);
      axios
        .get(`https://swapi.dev/api/people/?search=${name}`)
        .then((response) => {
          if (response.data.results.length > 0) {
            setDetails(response.data.results[0]);
          } else {
            setIsMissing(true);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching details:', error);
          setIsMissing(true);
          setIsLoading(false);
        });
    }
  }, [name]);

  if (isLoading) {
    return <div className={styles['details-loader']} data-testid="details-loader"></div>;
  }

  const handleCloseClick = () => {
    const match = location.pathname.match(/\/search\/(\d+)/);
    const pageNumber = match ? match[1] : '1';
    navigate(`/search/${pageNumber}`);
  };

  const attributes = [
    { label: 'Height', value: details.height },
    { label: 'Mass', value: details.mass },
    { label: 'Hair Color', value: details.hair_color },
    { label: 'Skin Color', value: details.skin_color },
    { label: 'Eye Color', value: details.eye_color },
    { label: 'Birth Year', value: details.birth_year },
    { label: 'Gender', value: details.gender },
  ];

  if (isMissing) {
    return (
      <div>
        <p>No such hero was found</p>
        <button onClick={handleCloseClick}>Close</button>
      </div>
    );
  }

  return (
    <div className={styles['details-component']}>
      <h3>{details.name}</h3>
      <img src={findImageById(lodash.camelCase(details.name))} alt={name} />
      {attributes.map((attr, index) => (
        <HeroAttribute key={index} label={attr.label} value={attr.value} />
      ))}
      <button onClick={handleCloseClick}>Close</button>
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
