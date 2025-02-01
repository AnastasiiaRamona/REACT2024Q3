import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Checkbox from '../components/Checkbox/Checkbox';
import TestWrapper from './TestWrapper';

describe('Checkbox Component', () => {
  it('should render checkbox with correct ID and checked state', () => {
    render(
      <TestWrapper>
        <Checkbox id="test-checkbox" isChecked={true} onClick={() => {}} />
      </TestWrapper>
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('id', 'test-checkbox');
    expect(checkbox).toBeChecked();
  });

  it('should call onClick handler when checkbox is changed', () => {
    const handleClick = vi.fn();
    render(
      <TestWrapper>
        <Checkbox id="test-checkbox" isChecked={false} onClick={handleClick} />
      </TestWrapper>
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('should not trigger click event propagation', () => {
    const handleClick = vi.fn();
    render(
      <TestWrapper>
        <div onClick={handleClick}>
          <Checkbox id="test-checkbox" isChecked={false} onClick={() => {}} />
        </div>
      </TestWrapper>
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
