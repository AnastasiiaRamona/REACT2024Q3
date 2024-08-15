import { InputProps } from '../types';

const SelectInput = ({ label, name, options, selectRef, className, onChange }: InputProps) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <select id={name} name={name} ref={selectRef} className={className} onChange={onChange}>
      {options &&
        options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  </div>
);

export default SelectInput;
