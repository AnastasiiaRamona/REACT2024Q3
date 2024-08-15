import { InputProps } from '../types';
import eyesSrc from '../../assets/eyes.webp';
import { useState } from 'react';
import PasswordStrengthChecker from '../PasswordStrengthChecker/PasswordStrengthChecker';

const PasswordInput = ({ label, name, inputRef, onBlur, onChange }: InputProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState('');

  const handleToggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    if (onChange) {
      onChange(event);
    }
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
          onChange={handleChange}
          type={isVisible ? 'text' : 'password'}
        />
      </div>
      <PasswordStrengthChecker password={password} />
    </div>
  );
};

export default PasswordInput;
