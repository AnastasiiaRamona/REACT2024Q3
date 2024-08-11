import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { useNavigate, useLocation } from '@remix-run/react';
import DetailsComponent from '../components/DetailsComponent/DetailsComponent';
import TestWrapper from './TestWrapper';
import { Character } from 'src/types';

vi.mock('@remix-run/react', () => ({
  useNavigate: vi.fn(),
  useLocation: vi.fn(),
}));

const mockUseNavigate = useNavigate as Mock;
const mockUseLocation = useLocation as Mock;

describe('DetailsComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should correctly display detailed card data', async () => {
    const mockName = 'Luke Skywalker';
    const mockDetails: Character = {
      name: mockName,
      height: '1.72',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'test',
      films: ['test'],
      species: ['test'],
      vehicles: ['test'],
      starships: ['test'],
      created: 'test',
      edited: 'test',
      url: 'test',
    };

    const mockNavigate = vi.fn();

    mockUseNavigate.mockReturnValue(mockNavigate);

    mockUseLocation.mockReturnValue({ pathname: `` });

    render(
      <TestWrapper>
        <DetailsComponent characterData={mockDetails} />
      </TestWrapper>
    );

    expect(screen.getByText('1.72')).toBeInTheDocument();
    expect(screen.getByText('77')).toBeInTheDocument();
    expect(screen.getByText('blond')).toBeInTheDocument();
    expect(screen.getByText('fair')).toBeInTheDocument();
    expect(screen.getByText('blue')).toBeInTheDocument();
    expect(screen.getByText('19BBY')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
  });

  it('should navigate to a different route when the close button is clicked', async () => {
    const mockName = 'Luke Skywalker';
    const mockDetails: Character = {
      name: mockName,
      height: '1.72',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'test',
      films: ['test'],
      species: ['test'],
      vehicles: ['test'],
      starships: ['test'],
      created: 'test',
      edited: 'test',
      url: 'test',
    };
    const mockNavigate = vi.fn();

    mockUseNavigate.mockReturnValue(mockNavigate);

    mockUseLocation.mockReturnValue({ pathname: `/search/1/details/${mockName}` });

    render(
      <TestWrapper>
        <DetailsComponent characterData={mockDetails} />
      </TestWrapper>
    );

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/search/1');
    });
  });
});
