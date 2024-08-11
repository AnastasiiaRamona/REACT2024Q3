import { StaticImageData } from 'next/image';

interface ButtonProps {
  onClick?: () => void;
  text: string;
  className?: string;
  disabled?: boolean;
  type?: string;
  img?: StaticImageData;
  alt?: string;
}

export default ButtonProps;
