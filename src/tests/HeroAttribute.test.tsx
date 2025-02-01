import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroAttribute from '../components/HeroAttribute/HeroAttribute';

describe('HeroAttribute', () => {
  it('should render label and value correctly', () => {
    const label = 'Name';
    const value = 'Hero';

    render(<HeroAttribute label={label} value={value} />);

    expect(screen.getByText(`${label}:`)).toBeInTheDocument();
    expect(screen.getByText(value)).toBeInTheDocument();
  });

  it('should render with bold label', () => {
    const label = 'Power';
    const value = 'Flight';

    render(<HeroAttribute label={label} value={value} />);

    expect(screen.getByText(`${label}:`)).toHaveStyle('font-weight: bold');
  });
});
