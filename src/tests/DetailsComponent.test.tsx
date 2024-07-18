import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DetailsComponent from '../components/DetailsComponent/DetailsComponent';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useParams: vi.fn(),
}));

vi.mock('axios');

const mockUseParams = useParams as Mock;
const mockUseNavigate = useNavigate as Mock;
const mockAxios = axios as unknown as { get: Mock };

describe('DetailsComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call the additional API to fetch detailed information', async () => {
    const mockName = 'Luke Skywalker';

    mockUseParams.mockReturnValue({ name: mockName });
    mockAxios.get = vi.fn().mockResolvedValue({
      data: {
        results: [
          {
            name: mockName,
            height: '1.72',
            mass: '77',
            hair_color: 'blond',
            skin_color: 'fair',
            eye_color: 'blue',
            birth_year: '19BBY',
            gender: 'male',
          },
        ],
      },
    });

    render(<DetailsComponent />);

    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledWith(`https://swapi.dev/api/people/?search=${mockName}`);
    });
  });

  it('should display error message when API call fails', async () => {
    mockUseParams.mockReturnValue({ name: 'Luke Skywalker' });
    mockAxios.get = vi.fn().mockRejectedValue(new Error('API call failed'));

    render(<DetailsComponent />);

    await waitFor(() => {
      expect(screen.getByText('No such hero was found')).toBeInTheDocument();
    });
  });

  it('should display loading indicator while fetching data', () => {
    const mockName = 'Luke Skywalker';

    mockUseParams.mockReturnValue({ name: mockName });
    mockAxios.get = vi.fn().mockImplementation(() => new Promise(() => {}));

    render(<DetailsComponent />);

    expect(screen.getByTestId('details-loader')).toBeInTheDocument();
  });

  it('should correctly display detailed card data', async () => {
    const mockName = 'Luke Skywalker';
    const mockDetails = {
      name: mockName,
      height: '1.72',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
    };

    mockUseParams.mockReturnValue({ name: mockName });
    mockAxios.get = vi.fn().mockResolvedValue({
      data: {
        results: [mockDetails],
      },
    });

    render(<DetailsComponent />);

    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledWith(`https://swapi.dev/api/people/?search=${mockName}`);
    });

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
    const mockDetails = {
      name: mockName,
      height: '1.72',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
    };
    const mockNavigate = vi.fn();

    mockUseParams.mockReturnValue({ name: mockName });
    mockAxios.get = vi.fn().mockResolvedValue({
      data: {
        results: [mockDetails],
      },
    });
    mockUseNavigate.mockReturnValue(mockNavigate);

    render(<DetailsComponent />);

    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledWith(`https://swapi.dev/api/people/?search=${mockName}`);
    });

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/search/1');
    });
  });
});
