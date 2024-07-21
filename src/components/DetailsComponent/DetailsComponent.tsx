import { useNavigate, useParams } from 'react-router-dom';
import styles from './DetailsComponent.module.css';
import HeroAttribute from '../HeroAttribute/HeroAttribute';
import lodash from 'lodash';
import peopleImagesSrc from '../../data/images';
import { useGetCharacterDetailsQuery } from '../../store/reducers/apiReducer';
import { useAppDispatch, useAppSelector } from '../SearchComponent/hooks';
import { useEffect } from 'react';
import { showLoader, hideLoader } from '../../store/reducers/loaderSlice';

const DetailsComponent = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.loader);

  const { data, isFetching, isError } = useGetCharacterDetailsQuery(name || '');

  useEffect(() => {
    if (isFetching) {
      dispatch(showLoader());
    } else {
      dispatch(hideLoader());
    }
  }, [isFetching, dispatch]);

  const handleCloseClick = () => {
    const match = location.pathname.match(/\/search\/(\d+)/);
    const pageNumber = match ? match[1] : '1';
    navigate(`/search/${pageNumber}`);
  };

  if (isLoading) {
    return <div className={styles['details-loader']} data-testid="details-loader"></div>;
  }

  if (isError || !data) {
    return (
      <div>
        <p>No such hero was found</p>
        <button onClick={handleCloseClick}>Close</button>
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
    <div className={styles['details-component']}>
      <h3>{character.name}</h3>
      <img src={findImageById(lodash.camelCase(character.name))} alt={name} />
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
