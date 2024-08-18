import { forwardRef } from 'react';
import { InputProps } from '../types';
import styles from './Checkbox.module.css';

const Checkbox = forwardRef<HTMLInputElement, InputProps>(({ label, name, onChange }, ref) => (
  <div className={styles['checkbox-wrapper-41']}>
    <input id={name} name={name} type='checkbox' ref={ref} onChange={onChange} autoComplete={name} />
    <label htmlFor={name}>{label}</label>
  </div>
));

export default Checkbox;
