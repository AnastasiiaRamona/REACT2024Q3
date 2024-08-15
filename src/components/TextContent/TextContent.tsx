import { InputProps } from '../types';

const TextContent = ({ label, name, type = 'text', min, inputRef, onBlur, className, onChange }: InputProps) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      name={name}
      type={type}
      min={min}
      ref={inputRef}
      onBlur={onBlur}
      className={className}
      onChange={onChange}
    />
  </div>
);

export default TextContent;
