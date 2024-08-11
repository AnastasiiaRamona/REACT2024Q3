import { describe, it, expect, vi } from 'vitest';
import { getServerSideProps } from '../pages/search/[page]';
import apiAddress from '../data/data';
import { GetServerSidePropsContext } from 'next';
import { SearchPageProps } from '@/types';

vi.mock('../components/SearchComponent/SearchComponent', () => ({
  default: ({ data, page, totalPages, searchTerm }: SearchPageProps) => (
    <div>
      <span>Data: {JSON.stringify(data)}</span>
      <span>Page: {page}</span>
      <span>TotalPages: {totalPages}</span>
      <span>SearchTerm: {searchTerm}</span>
    </div>
  ),
}));

describe('getServerSideProps', () => {
  it('fetches data and returns correct props', async () => {
    const mockData = {
      count: 50,
      results: [],
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    ) as unknown as typeof fetch;

    const context: Partial<GetServerSidePropsContext> = {
      params: { page: '2' },
      query: { searchTerm: 'test' },
    };

    const result = await getServerSideProps(context as GetServerSidePropsContext);

    expect(result).toEqual({
      props: {
        data: mockData,
        page: 2,
        totalPages: Math.ceil(mockData.count / 10),
        searchTerm: 'test',
      },
    });

    expect(global.fetch).toHaveBeenCalledWith(`${apiAddress}?search=test&page=2`);
  });
});
