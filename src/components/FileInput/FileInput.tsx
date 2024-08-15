import { InputProps } from '../types';

const FileInput = ({ label, name, inputRef, onChange }: InputProps) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input id={name} name={name} type='file' ref={inputRef} onChange={onChange} />
  </div>
);

export default FileInput;
