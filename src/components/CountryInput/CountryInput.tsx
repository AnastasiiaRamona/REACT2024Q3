import { useSelector } from 'react-redux';
import { InputProps } from '../types';
import { RootState } from '../../store/store';
import { forwardRef } from 'react';

const CountryInput = forwardRef<HTMLInputElement, InputProps>(({ label, name, onChange }, ref) => {
  const suggestions = useSelector((state: RootState) => state.countries.countries);

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type='text' ref={ref} onChange={onChange} list='country-options' />
      <datalist id='country-options'>
        {suggestions && suggestions.map((country) => <option key={country} value={country} />)}
      </datalist>
    </div>
  );
});

export default CountryInput;
