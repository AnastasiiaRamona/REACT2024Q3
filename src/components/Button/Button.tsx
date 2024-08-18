import ButtonProps from './types';

const Button = ({ onClick, text, className, disabled }: ButtonProps) => {
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
