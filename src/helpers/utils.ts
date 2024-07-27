import { Character } from '../components/DetailsComponent/types';
import peopleImagesSrc from '../data/images';

const findImageById = (id: string) => {
  const image = peopleImagesSrc.find((image) => image.id === id);
  if (image) {
    return image.src;
  }
};

const escapeCSVValue = (value: string) => {
  const escapedValue = value.replace(/"/g, '""');

  return /[",\n]/.test(escapedValue) ? `"${escapedValue}"` : escapedValue;
};

const convertToCSV = (items: Character[]) => {
  const header = 'Name,Height,Mass,Hair Color,Skin Color,Eye Color,Birth Year,Gender\n';

  const rows = items
    .map(
      (item) =>
        `${escapeCSVValue(item.name)},${escapeCSVValue(item.height)},${escapeCSVValue(item.mass)},${escapeCSVValue(item.hair_color)},${escapeCSVValue(item.skin_color)},${escapeCSVValue(item.eye_color)},${escapeCSVValue(item.birth_year)},${escapeCSVValue(item.gender)}`
    )
    .join('\n');

  return header + rows;
};

export { findImageById, convertToCSV, escapeCSVValue };
