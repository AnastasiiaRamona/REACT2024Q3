import styles from './Button.module.css';
import ButtonProps from './types';

const Button = ({ onClick, text, className, disabled, img, alt }: ButtonProps) => {
  return (
    <button onClick={onClick} className={`${styles['star-wars-button']} ${className}`} disabled={disabled}>
      {text}
      {img && <img src={img} alt={alt} />}
    </button>
  );
};

export default Button;
