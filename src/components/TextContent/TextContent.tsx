import { forwardRef } from 'react';
import { InputProps } from '../types';

const TextContent = forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, type = 'text', min, className, onChange }, ref) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} min={min} ref={ref} className={className} onChange={onChange} />
    </div>
  )
);

export default TextContent;
