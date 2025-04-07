import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { API_URL } from '@/assets/api-endpoints';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  
  if (error) {
    return redirect(`/dashboard?error=tiktok_auth_failed&message=${encodeURIComponent(error)}`);
  }

  if (!code) {
    return redirect('/dashboard?error=no_auth_code');
  }

  try {
    // Send the code to your backend to exchange for access token
    const tokenResponse = await fetch(API_URL.TIKTOK_ACCESS_TOKEN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    const result = await tokenResponse.json();

    if (!tokenResponse.ok) {
      throw new Error(result.message || 'Failed to get access token');
    }

    return redirect('/dashboard?success=tiktok_connected');
    
  } catch (err) {
    return redirect(`/dashboard?error=tiktok_token_exchange&message=${encodeURIComponent(err.message)}`);
  }
}