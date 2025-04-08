import { redirect } from 'next/navigation';
import { API_URL } from '@/assets/api-endpoints';
import { cookies } from 'next/headers';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const token = cookies().get('auth_token')?.value;


  if (!token) {
    return redirect('/dashboard?error=missing_auth_token');
  }

  if (error) {
    return redirect(`/dashboard?error=tiktok_auth_failed&message=${encodeURIComponent(error)}`);
  }

  if (!code) {
    return redirect('/dashboard?error=no_auth_code');
  }

  try {
    const payload = {
      authorizationCode: code, 
      deviceType: "web"        
    };
    console.log("TIKTOK_PAYLOAD ",payload)
    const tokenResponse = await fetch(API_URL.TIKTOK_ACCESS_TOKEN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload), // ✅ send full payload
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
