import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, describe, vi } from 'vitest';
import HeroCard from '../HeroCard/HeroCard';
import { HeroCardProps } from '../HeroCard/types';
import peopleImagesSrc from '../data/images';

vi.mock('../HeroCard', () => {
  const actual = vi.importActual('../HeroCard');
  return {
    ...actual,
    findImageById: (id: string) => {
      const image = peopleImagesSrc.find((image) => image.id === id);
      return image ? image.src : '';
    },
  };
});

describe('HeroCard', () => {
  const mockOnClick = vi.fn();

  it('should display the correct name and image', () => {
    const props: HeroCardProps = {
      id: 'lukeSkywalker',
      name: 'Card 1',
      onClick: mockOnClick,
      key: '',
    };

    render(<HeroCard {...props} />);

    expect(screen.getByText('Card 1')).toBeInTheDocument();

    const imageElement = screen.getByAltText('Card 1');
    expect(imageElement).toBeInTheDocument();

    const expectedSrc = peopleImagesSrc.find((image) => image.id === props.id)?.src;
    expect(expectedSrc).toBeDefined();
    expect(imageElement.getAttribute('src')).toBe(expectedSrc || '');
  });

  it('should call onClick when clicked', () => {
    const props: HeroCardProps = {
      id: '1',
      name: 'Card 1',
      onClick: mockOnClick,
      key: '',
    };

    render(<HeroCard {...props} />);

    fireEvent.click(screen.getByText('Card 1'));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
