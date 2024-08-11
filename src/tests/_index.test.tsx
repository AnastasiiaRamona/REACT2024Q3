import { describe, it, expect } from 'vitest';
import { loader } from '../../app/routes/_index';

describe('loader function', () => {
  it('redirects to /search/1', async () => {
    const result = await loader();
    const newStatus = result.status;
    expect(newStatus).toEqual(302);
  });
});
