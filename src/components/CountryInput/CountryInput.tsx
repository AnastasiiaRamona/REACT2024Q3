import { InputProps } from '../types';

const CountryInput = ({ label, name, inputRef, suggestions, onChange }: InputProps) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input id={name} name={name} type='text' ref={inputRef} onChange={onChange} list='country-options' />
    <datalist id='country-options'>
      {suggestions && suggestions.map((country) => <option key={country} value={country} />)}
    </datalist>
  </div>
);

export default CountryInput;
