import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import DetailsComponent from '../components/DetailsComponent/DetailsComponent';
import TestWrapper from './TestWrapper';
import { useRouter, usePathname } from 'next/navigation';

const mockName = 'Luke Skywalker';

const mockCharacterData = {
  name: mockName,
  height: '1.72',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: 'Tatooine',
  films: [],
  species: [],
  vehicles: [],
  starships: [],
  created: '2014-12-09T13:50:51.644000Z',
  edited: '2014-12-20T21:17:56.891000Z',
  url: 'https://swapi.dev/api/people/1/',
};

vi.mock('next/image', () => ({
  default: (props: { src: string; alt: string; width?: number; height?: number }) => <img {...props} />,
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
}));

const mockUseRouter = useRouter as Mock;
const mockUsePathname = usePathname as Mock;

vi.mock('../../helpers/utils', () => ({
  findImageById: vi.fn().mockReturnValue('/path/to/image.jpg'),
}));

describe('DetailsComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render character details correctly', () => {
    mockUseRouter.mockReturnValue({
      asPath: `/details/${mockName}`,
    });
    mockUsePathname.mockReturnValue(`/details/${mockName}`);

    render(
      <TestWrapper>
        <DetailsComponent characterData={mockCharacterData} />
      </TestWrapper>
    );

    expect(screen.getByText(mockName)).toBeInTheDocument();
    expect(screen.getByText('1.72')).toBeInTheDocument();
    expect(screen.getByText('77')).toBeInTheDocument();
    expect(screen.getByText('blond')).toBeInTheDocument();
    expect(screen.getByText('fair')).toBeInTheDocument();
    expect(screen.getByText('blue')).toBeInTheDocument();
    expect(screen.getByText('19BBY')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByAltText(mockName)).toBeInTheDocument();
  });

  it('should call router push with correct URL when close button is clicked', async () => {
    const mockRouter = {
      asPath: `/details/Luke%20Skywalker`,
      push: vi.fn(),
    };

    mockUseRouter.mockReturnValue(mockRouter);
    mockUsePathname.mockReturnValue(`/details/Luke%20Skywalker`);

    render(
      <TestWrapper>
        <DetailsComponent characterData={mockCharacterData} />
      </TestWrapper>
    );

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('');
    });
  });
});
