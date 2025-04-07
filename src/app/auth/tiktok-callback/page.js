// app/auth/tiktok-callback/page.js
'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/assets/hooks/use-auth';
import { API_URL } from '@/assets/api-endpoints';

export default function TikTokCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const auth = useAuth();
  const code = searchParams.get('code');

  useEffect(() => {
    if (!code || !auth) return;

    const exchangeToken = async () => {
      try {
        const payload = {
          authorizationCode: code,
          deviceType: "web"
        };

        const response = await fetch(API_URL.TIKTOK_ACCESS_TOKEN, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`
          },
          body: JSON.stringify(payload),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Token exchange failed');
        }

        router.push('/dashboard?success=tiktok_connected');
      } catch (error) {
        console.error('Token exchange error:', error);
        router.push(`/dashboard?error=${encodeURIComponent(error.message)}`);
      }
    };

    exchangeToken();
  }, [code, auth, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Connecting TikTok account...</p>
    </div>
  );
}