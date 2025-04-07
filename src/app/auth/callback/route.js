import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const state = searchParams.get('state');

  if (error) {
    return redirect(`/dashboard/integrations?error=${encodeURIComponent(error)}`);
  }

  if (!code) {
    return redirect('/dashboard/integrations?error=no_code');
  }

  try {
    // Exchange code for token
    const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tiktok/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      throw new Error(tokenData.error_description);
    }

    // Store the token securely (adjust based on your auth strategy)
    cookies().set('tiktok_access_token', tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: tokenData.expires_in,
    });

    return redirect('/dashboard/integrations?success=true');
  } catch (err) {
    return redirect(`/dashboard/integrations?error=${encodeURIComponent(err.message)}`);
  }
}