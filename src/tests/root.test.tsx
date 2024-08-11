import { links } from '../../app/root';

describe('Document (root.tsx)', () => {
  it('should render link tags correctly', () => {
    const linkTags = links();
    expect(linkTags).toEqual([
      { rel: 'stylesheet', href: 'https://fonts.cdnfonts.com/css/star-wars' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap' },
    ]);
  });
});
