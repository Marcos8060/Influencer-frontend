// app/tiktok-callback/page.js
'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { APP_API_URL } from '@/assets/api-endpoints' // make sure this is imported
import { useAuth } from '@/assets/hooks/use-auth'
import toast from 'react-hot-toast'

function TikTokCallbackInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const error = searchParams.get('error')
  const token = useAuth();

  useEffect(() => {
    const handleCallback = async () => {

      if (!token) {
        router.push('/dashboard?error=missing_auth_token')
        return
      }

      if (error) {
        router.push(`/dashboard?error=tiktok_auth_failed&message=${encodeURIComponent(error)}`)
        return
      }

      if (!code) {
        router.push('/dashboard?error=no_auth_code')
        return
      }

      try {
        const payload = {
          authorizationCode: code,
          deviceType: 'web',
          page: 'influencer-profile'
        }

        const tokenResponse = await fetch(APP_API_URL.TIKTOK_ACCESS_TOKEN, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        })

        const result = await tokenResponse.json()
        toast.success('Tiktok Connected Successfully')
        if (!tokenResponse.ok) {
          throw new Error(result.message || 'Failed to get access token')
        }

        router.push('/onboarding/influencer/profile')
      } catch (err) {
        console.error('Token exchange error:', err)
        router.push(`/dashboard?error=tiktok_token_exchange&message=${encodeURIComponent(err.message)}`)
      }
    }

    handleCallback()
  }, [code, error, router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-gray-600">Connecting your TikTok account...</p>
    </div>
  )
}

export default function TikTokCallbackPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading TikTok callback...</div>}>
      <TikTokCallbackInner />
    </Suspense>
  )
}
