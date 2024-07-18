import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { expect, it, describe } from 'vitest';
import StartPage from '../pages/StartPage/StartPage';
import DetailsComponent from '../components/DetailsComponent/DetailsComponent';
import MissingPage from '../pages/MissingPage/MissingPage';

describe('StartPage', () => {
  it('should render MissingPage for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route']}>
        <Routes>
          <Route path="/" element={<StartPage />}>
            <Route path="details/:name" element={<DetailsComponent />} />
          </Route>
          <Route path="/search/:page" element={<StartPage />}>
            <Route path="details/:name" element={<DetailsComponent />} />
          </Route>
          <Route path="*" element={<MissingPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });
});
