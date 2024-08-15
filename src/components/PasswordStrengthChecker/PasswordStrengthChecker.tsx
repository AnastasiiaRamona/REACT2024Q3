import { useEffect, useState } from 'react';
import getStrength from '../../helpers/checkerOfStrength';
import PasswordStrengthCheckerProps from './types';
import styles from './PasswordStrengthChecker.module.css';

const PasswordStrengthChecker = ({ password }: PasswordStrengthCheckerProps) => {
  const [strength, setStrength] = useState<number>(0);

  useEffect(() => {
    setStrength(getStrength(password));
  }, [password]);

  return (
    <div className={styles.passwordStrengthMeter}>
      <div className={`${styles.strengthBar} ${strength >= 1 ? styles.weak : ''}`}></div>
      <div className={`${styles.strengthBar} ${strength >= 2 ? styles.fair : ''}`}></div>
      <div className={`${styles.strengthBar} ${strength >= 3 ? styles.good : ''}`}></div>
      <div className={`${styles.strengthBar} ${strength >= 4 ? styles.strong : ''}`}></div>
    </div>
  );
};

export default PasswordStrengthChecker;
