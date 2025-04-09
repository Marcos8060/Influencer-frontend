// hooks/useProtectedRoute.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useProtectedRoute() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    // Retrieve the auth token from localStorage (adjust key name as needed)
    const influencerToken = localStorage.getItem('influencer_token');
    const brandToken = localStorage.getItem('brand_token');

    if (!influencerToken || brandToken) {
      // If no token is found, redirect to login page immediately
      router.push('/');
      setIsAuthorized(false);
    } else {
      // Optionally, add further validation (e.g., token expiration)
      setIsAuthorized(true);
    }
  }, [router]);

  return isAuthorized;
}
