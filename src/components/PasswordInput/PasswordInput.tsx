import { InputProps } from '../types';
import eyesSrc from '../../assets/eyes.webp';
import { useState } from 'react';

const PasswordInput = ({ label, name, inputRef, onBlur, strength, onChange }: InputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <div className='form-row'>
        <img src={eyesSrc} alt='eyes' onClick={handleToggleVisibility} />
        <input
          id={name}
          name={name}
          ref={inputRef}
          onBlur={onBlur}
          onChange={onChange}
          type={isVisible ? 'text' : 'password'}
        />
      </div>
      {strength && <p>Password strength: {strength}</p>}
    </div>
  );
};

export default PasswordInput;
