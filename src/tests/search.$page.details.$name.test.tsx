import apiAddress from 'src/data/data';
import { Character } from 'src/types';
import { describe, it, expect } from 'vitest';
import { loader } from '~/routes/search.$page.details.$name';

const mockFetch = vi.fn();

const mockName = 'Luke Skywalker';
const mockDetails: Character = {
  name: mockName,
  height: '1.72',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
  birth_year: '19BBY',
  gender: 'male',
  homeworld: 'test',
  films: ['test'],
  species: ['test'],
  vehicles: ['test'],
  starships: ['test'],
  created: 'test',
  edited: 'test',
  url: 'test',
};

vi.stubGlobal('fetch', () => Promise.resolve(mockFetch()));

describe('loader function', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns data with valid params and search term', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({ results: [mockDetails], count: 1 }) });
    const request = new Request(apiAddress);
    const params = { page: '1', name: 'Luke Skywalker' };

    const result = await loader({ request, params, context: {} });

    const data: Response = await (result as Response).json();

    expect(data).toEqual({
      data: expect.any(Object),
      page: 1,
      totalPages: expect.any(Number),
      searchTerm: '',
      characterData: expect.any(Object),
    });
  });
});
