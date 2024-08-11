import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import HeroCard from '../components/HeroCard/HeroCard';
import { HeroCardProps } from '../components/HeroCard/types';
import peopleImagesSrc from '../data/images';
import TestWrapper from './TestWrapper';
import { useGetCharacterDetailsQuery } from 'src/store/reducers/apiReducer';

vi.mock('../helpers/utils', () => {
  const actual = vi.importActual('../helpers/utils');
  return {
    ...actual,
    findImageById: (id: string) => {
      const image = peopleImagesSrc.find((image) => image.id === id);
      return image ? image.src : '';
    },
  };
});

vi.mock('../store/reducers/apiReducer', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useGetCharacterDetailsQuery: vi.fn(() => ({
      data: null,
      refetch: vi.fn(),
      isFetching: false,
      isSuccess: false,
    })),
  };
});

describe('HeroCard', () => {
  const mockOnClick = vi.fn();

  it('should display the correct name and image', () => {
    const props: Omit<HeroCardProps, 'key'> = {
      id: 'lukeSkywalker',
      name: 'Card 1',
      onClick: mockOnClick,
    };

    render(
      <TestWrapper>
        <HeroCard key="uniqueKey1" {...props} />
      </TestWrapper>
    );

    expect(screen.getByText('Card 1')).toBeInTheDocument();

    const imageElement = screen.getByAltText('Card 1');
    expect(imageElement).toBeInTheDocument();

    const expectedSrc = peopleImagesSrc.find((image) => image.id === props.id)?.src;
    expect(expectedSrc).toBeDefined();
    expect(imageElement.getAttribute('src')).toBe(expectedSrc || '');
  });

  it('should call onClick when clicked', () => {
    const props: Omit<HeroCardProps, 'key'> = {
      id: '1',
      name: 'Card 1',
      onClick: mockOnClick,
    };

    render(
      <TestWrapper>
        <HeroCard key="uniqueKey2" {...props} />
      </TestWrapper>
    );

    fireEvent.click(screen.getByText('Card 1'));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should fetch character details when checkbox is checked', async () => {
    const props: Omit<HeroCardProps, 'key'> = {
      id: 'lukeSkywalker',
      name: 'Card 1',
      onClick: mockOnClick,
    };

    render(
      <TestWrapper>
        <HeroCard key="uniqueKey7" {...props} />
      </TestWrapper>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(useGetCharacterDetailsQuery).toHaveBeenCalledWith('Card 1', expect.any(Object));
    });
  });
});
