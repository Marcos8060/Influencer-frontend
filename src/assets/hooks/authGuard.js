'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function AuthGuard({ children, redirectTo = "/auth/login/brand" }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const influencerToken = localStorage.getItem('influencer_token');
    const brandToken = localStorage.getItem('brand_token');
    if (!influencerToken && !brandToken) {
      router.replace(redirectTo);
    } else {
      setChecked(true);
    }
  }, [router, redirectTo]);

  if (!checked) {
    // Optionally, return a loader here
    return null;
  }

  return children;
}