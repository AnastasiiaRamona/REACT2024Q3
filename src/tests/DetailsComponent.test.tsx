import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { useNavigate, useParams } from 'react-router-dom';
import DetailsComponent from '../components/DetailsComponent/DetailsComponent';
import { useGetCharacterDetailsQuery } from '../store/reducers/apiReducer';
import TestWrapper from './TestWrapper';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useParams: vi.fn(),
}));

vi.mock('../store/reducers/apiReducer', async (importOriginal) => {
  const actual = (await importOriginal()) as { useGetCharacterDetailsQuery: Mock };
  return {
    ...actual,
    useGetCharacterDetailsQuery: vi.fn(),
  };
});

const mockUseParams = useParams as Mock;
const mockUseNavigate = useNavigate as Mock;
const mockUseGetCharacterDetailsQuery = useGetCharacterDetailsQuery as Mock;

describe('DetailsComponent', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call the additional API to fetch detailed information', async () => {
    const mockName = 'Luke Skywalker';

    mockUseParams.mockReturnValue({ name: mockName });
    mockUseGetCharacterDetailsQuery.mockReturnValue({
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

    render(
      <TestWrapper>
        <DetailsComponent />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(mockUseGetCharacterDetailsQuery).toHaveBeenCalledWith(`${mockName}`);
    });
  });

  it('should display error message when API call fails', async () => {
    mockUseParams.mockReturnValue({ name: 'Luke Skywalker' });
    mockUseGetCharacterDetailsQuery.mockRejectedValue(new Error('API call failed'));

    render(
      <TestWrapper>
        <DetailsComponent />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('No such hero was found')).toBeInTheDocument();
    });
  });

  it('should display loading indicator while fetching data', async () => {
    const mockName = 'Luke Skywalker';

    mockUseParams.mockReturnValue({ name: mockName });
    mockUseGetCharacterDetailsQuery.mockImplementation(() => ({
      isFetching: true,
      data: undefined,
      isError: false,
    }));

    render(
      <TestWrapper>
        <DetailsComponent />
      </TestWrapper>
    );

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
    mockUseGetCharacterDetailsQuery.mockReturnValue({
      data: {
        results: [mockDetails],
      },
    });

    render(
      <TestWrapper>
        <DetailsComponent />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(mockUseGetCharacterDetailsQuery).toHaveBeenCalledWith(`${mockName}`);
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
    mockUseGetCharacterDetailsQuery.mockReturnValue({
      data: {
        results: [mockDetails],
      },
    });
    mockUseNavigate.mockReturnValue(mockNavigate);

    render(
      <TestWrapper>
        <DetailsComponent />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(mockUseGetCharacterDetailsQuery).toHaveBeenCalledWith(`${mockName}`);
    });

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/search/1');
    });
  });
});
