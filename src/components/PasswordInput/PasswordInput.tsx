import { InputProps } from '../types';
import eyesSrc from '../../assets/eyes.webp';
import { forwardRef, useState } from 'react';
import PasswordStrengthChecker from '../PasswordStrengthChecker/PasswordStrengthChecker';

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(({ label, name, onChange }, ref) => {
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
        <img src={eyesSrc} alt='Toggle visibility' onClick={handleToggleVisibility} style={{ cursor: 'pointer' }} />
        <input id={name} name={name} ref={ref} onChange={handleChange} type={isVisible ? 'text' : 'password'} />
      </div>
      <PasswordStrengthChecker password={password} />
    </div>
  );
});

export default PasswordInput;
