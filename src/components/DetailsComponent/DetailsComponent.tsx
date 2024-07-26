import { useNavigate, useParams } from 'react-router-dom';
import styles from './DetailsComponent.module.css';
import HeroAttribute from '../HeroAttribute/HeroAttribute';
import lodash from 'lodash';
import { useGetCharacterDetailsQuery } from '../../store/reducers/apiReducer';
import Button from '../Button/Button';
import { useTheme } from '../../context/ThemeContext';
import { findImageById } from '../../helpers/utils';

const DetailsComponent = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const { theme } = useTheme();

  const { data, isFetching, isError } = useGetCharacterDetailsQuery(name || '');

  const handleCloseClick = () => {
    const match = location.pathname.match(/\/search\/(\d+)/);
    const pageNumber = match ? match[1] : '1';
    navigate(`/search/${pageNumber}`);
  };

  if (isFetching) {
    return <div className={`${styles['details-loader']} ${styles[theme]}`} data-testid="details-loader"></div>;
  }

  if (isError || !data) {
    return (
      <div>
        <p>No such hero was found</p>
        <Button onClick={handleCloseClick} text={'Close'}></Button>
      </div>
    );
  }

  const character = data.results[0];
  const attributes = [
    { label: 'Height', value: character.height },
    { label: 'Mass', value: character.mass },
    { label: 'Hair Color', value: character.hair_color },
    { label: 'Skin Color', value: character.skin_color },
    { label: 'Eye Color', value: character.eye_color },
    { label: 'Birth Year', value: character.birth_year },
    { label: 'Gender', value: character.gender },
  ];

  return (
    <div className={`${styles['details-component']} ${styles[theme]}`}>
      <h3>{character.name}</h3>
      <img src={findImageById(lodash.camelCase(character.name))} alt={name} />
      {attributes.map((attr, index) => (
        <HeroAttribute key={index} label={attr.label} value={attr.value} />
      ))}
      <Button onClick={handleCloseClick} text={'Close'}></Button>
    </div>
  );
};

export default DetailsComponent;
