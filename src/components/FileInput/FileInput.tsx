import { forwardRef } from 'react';
import { InputProps } from '../types';

const FileInput = forwardRef<HTMLInputElement, InputProps>(({ label, name, onChange }, ref) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input id={name} name={name} type='file' ref={ref} onChange={onChange} />
  </div>
));

export default FileInput;
