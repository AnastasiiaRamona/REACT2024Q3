import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { findImageById } from '../helpers/utils';
import peopleImagesSrc from '../data/images';
import TestWrapper from './TestWrapper';
import Image from 'next/image';

const TestComponent = ({ id }: { id: string }) => {
  const imageSrc = findImageById(id);
  const src = typeof imageSrc === 'string' ? imageSrc : imageSrc?.src;

  return <div>{src ? <Image src={src} alt="test" width={100} height={100} /> : 'No image found'}</div>;
};

describe('findImageById', () => {
  it('should display the correct image for an existing id', () => {
    const testId = 'lukeSkywalker';
    const expectedSrc = peopleImagesSrc.find((image) => image.id === testId)?.src;

    render(
      <TestWrapper>
        <TestComponent id={testId} />
      </TestWrapper>
    );

    const imageElement = screen.getByRole('img');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', expectedSrc || '');
  });

  it('should display "No image found" for a non-existing id', () => {
    const nonExistingId = 'ReySkywalker';

    render(
      <TestWrapper>
        <TestComponent id={nonExistingId} />
      </TestWrapper>
    );

    expect(screen.getByText('No image found')).toBeInTheDocument();
  });
});
