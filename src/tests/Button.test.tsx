import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '../components/Button/Button';
import TestWrapper from './TestWrapper';

describe('Button Component', () => {
  it('should render button with text', () => {
    render(
      <TestWrapper>
        <Button text="Click Me" />
      </TestWrapper>
    );
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('should call onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(
      <TestWrapper>
        <Button text="Click Me" onClick={handleClick} />
      </TestWrapper>
    );
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('should apply disabled attribute correctly', () => {
    render(
      <TestWrapper>
        <Button text="Click Me" disabled />
      </TestWrapper>
    );
    expect(screen.getByText('Click Me')).toBeDisabled();
  });

  it('should combine custom className with default classes', () => {
    render(
      <TestWrapper>
        <Button text="Click Me" className="custom-class" />
      </TestWrapper>
    );
    expect(screen.getByText('Click Me')).toHaveClass('custom-class');
  });
});
