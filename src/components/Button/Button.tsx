import ButtonProps from './types';

const Button = ({ onClick, text, className, disabled, img, alt }: ButtonProps) => {
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {text}
      {img && <img src={img} alt={alt} />}
    </button>
  );
};

export default Button;
