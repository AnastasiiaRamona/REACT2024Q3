import { HeroAttributeProps } from './types';

const HeroAttribute = ({ label, value }: HeroAttributeProps) => {
  return (
    <p>
      <strong>{label}:</strong> {value}
    </p>
  );
};

export default HeroAttribute;
