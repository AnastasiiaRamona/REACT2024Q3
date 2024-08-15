import { InputProps } from '../types';
import styles from './Checkbox.module.css';

const Checkbox = ({ label, name, inputRef, onChange }: InputProps) => (
  <div className={styles['checkbox-wrapper-41']}>
    <input id={name} name={name} type='checkbox' ref={inputRef} onChange={onChange} />
    <label htmlFor={name}>{label}</label>
  </div>
);

export default Checkbox;
