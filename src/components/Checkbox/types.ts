interface CheckboxProps {
  id: string;
  onClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
}

export default CheckboxProps;
