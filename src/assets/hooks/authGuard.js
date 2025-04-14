'use client'
import React, { useState,useEffect } from 'react';
import { useRouter } from "next/navigation";
export function useProtectedRoute() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const influencerToken = localStorage.getItem('influencer_token');
    const brandToken = localStorage.getItem('brand_token');

    if (!influencerToken && !brandToken) {
      router.push('/');
    }
    setIsAuthorized(!!influencerToken || !!brandToken); // Explicitly set true/false
  }, [router]);

  return isAuthorized;
}