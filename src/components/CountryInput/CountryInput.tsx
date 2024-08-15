import { useSelector } from 'react-redux';
import { InputProps } from '../types';
import { RootState } from '../../store/store';

const CountryInput = ({ label, name, inputRef, onChange }: InputProps) => {
  const suggestions = useSelector((state: RootState) => state.countries.countries);

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type='text' ref={inputRef} onChange={onChange} list='country-options' />
      <datalist id='country-options'>
        {suggestions && suggestions.map((country) => <option key={country} value={country} />)}
      </datalist>
    </div>
  );
};

export default CountryInput;
