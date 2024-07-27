import { render, screen } from '@testing-library/react';
import { expect, it, describe } from 'vitest';
import NotFoundResults from '../components/NotFoundResults/NotFoundResults';
import chewbaccaSrc from '../assets/chewbacca.webp';

describe('NotFoundResults', () => {
  it('should render the "No Results Found" message and Chewbacca image', () => {
    render(<NotFoundResults />);

    const image = screen.getByAltText('chewbacca');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', chewbaccaSrc);

    const message = screen.getByText('No Results Found. Please try again');
    expect(message).toBeInTheDocument();
  });
});
