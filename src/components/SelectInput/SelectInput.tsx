import { forwardRef } from 'react';
import { InputProps } from '../types';

const SelectInput = forwardRef<HTMLSelectElement, InputProps>(({ label, name, options, className, onChange }, ref) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <select id={name} name={name} ref={ref} className={className} onChange={onChange}>
      {' '}
      autoComplete={name}
      {options &&
        options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  </div>
));

export default SelectInput;
