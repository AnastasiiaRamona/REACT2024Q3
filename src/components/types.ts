import { RefObject } from 'react';

export interface InputProps {
  label: string;
  name?: string;
  type?: string;
  min?: number | string;
  inputRef?: RefObject<HTMLInputElement>;
  selectRef?: RefObject<HTMLSelectElement>;
  options?: Option[];
  suggestions?: string[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export interface Option {
  value: string | number;
  label: string;
}
