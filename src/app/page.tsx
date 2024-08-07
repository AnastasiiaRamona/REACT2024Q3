'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const HomePage = () => {
  const router = useRouter();
  useEffect(() => {
    const searchTerm = localStorage.getItem('searchTermOfStarWarsHeroes');
    if (searchTerm) {
      router.push(`/search/1?searchTerm=${encodeURIComponent(searchTerm)}`);
      return;
    } else {
      router.push('/search/1');
    }
  }, []);

  return null;
};

export default HomePage;
