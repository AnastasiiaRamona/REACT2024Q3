import { describe, it, expect } from 'vitest';
import peopleImagesSrc from '../data/images';

describe('peopleImagesSrc', () => {
  it('should contain the correct number of images', () => {
    expect(peopleImagesSrc).toHaveLength(83);
  });

  it('each object should have an id and src property', () => {
    peopleImagesSrc.forEach((image) => {
      expect(image).toHaveProperty('id');
      expect(image).toHaveProperty('src');
      expect(typeof image.id).toBe('string');
      expect(typeof image.src).toBe('string');
    });
  });
});
