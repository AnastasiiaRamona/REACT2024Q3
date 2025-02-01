import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { convertToCSV } from '../helpers/utils';
import { Character } from '../components/DetailsComponent/types';

const CSVComponent = ({ items }: { items: Character[] }) => {
  const csvData = convertToCSV(items);
  return <pre>{csvData}</pre>;
};

describe('convertToCSV', () => {
  it('should convert an array of characters to CSV format', () => {
    const items: Character[] = [
      {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male',
      },
      {
        name: 'Darth Vader',
        height: '202',
        mass: '136',
        hair_color: 'none',
        skin_color: 'white',
        eye_color: 'yellow',
        birth_year: '41.9BBY',
        gender: 'male',
      },
    ];

    const expectedCSV =
      `Name,Height,Mass,Hair Color,Skin Color,Eye Color,Birth Year,Gender\n` +
      `Luke Skywalker,172,77,blond,fair,blue,19BBY,male\n` +
      `Darth Vader,202,136,none,white,yellow,41.9BBY,male\n`;

    const { container } = render(<CSVComponent items={items} />);
    const preElement = container.querySelector('pre');

    expect(preElement).toBeInTheDocument();
    expect(preElement?.textContent?.trim()).toBe(expectedCSV.trim());
  });
});
