import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { findImageById } from '../helpers/utils';
import peopleImagesSrc from '../data/images';

const TestComponent = ({ id }: { id: string }) => {
  const imageSrc = findImageById(id);
  return <div>{imageSrc ? <img src={imageSrc} alt="test" /> : 'No image found'}</div>;
};

describe('findImageById', () => {
  it('should display the correct image for an existing id', () => {
    const testId = 'lukeSkywalker';
    const expectedSrc = peopleImagesSrc.find((image) => image.id === testId)?.src;

    render(<TestComponent id={testId} />);
    const imageElement = screen.getByRole('img');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', expectedSrc || '');
  });

  it('should display "No image found" for a non-existing id', () => {
    const nonExistingId = 'ReySkywalker';

    render(<TestComponent id={nonExistingId} />);
    expect(screen.getByText('No image found')).toBeInTheDocument();
  });
});
