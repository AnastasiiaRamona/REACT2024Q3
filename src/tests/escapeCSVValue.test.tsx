import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { escapeCSVValue } from '../helpers/utils';

describe('escapeCSVValue', () => {
  const TestComponent = ({ value }: { value: string }) => {
    return <div>{escapeCSVValue(value)}</div>;
  };

  it('should wrap the value in quotes if it contains a comma', () => {
    render(<TestComponent value="Luke, Skywalker" />);
    expect(screen.getByText('"Luke, Skywalker"')).toBeInTheDocument();
  });

  it('should not modify a value that does not contain special characters', () => {
    render(<TestComponent value="LukeSkywalker" />);
    expect(screen.getByText('LukeSkywalker')).toBeInTheDocument();
  });
});
