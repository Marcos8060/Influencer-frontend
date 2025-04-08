// app/tiktok-callback/page.js
'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { getCookie } from 'cookies-next'
import { API_URL } from '@/assets/api-endpoints' // make sure this is imported

function TikTokCallbackInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  useEffect(() => {
    const handleCallback = async () => {
      const token = getCookie('auth_token')

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
        }

        console.log('TIKTOK_PAYLOAD ', payload)

        const TIKTOK_ACCESS_TOKEN = 'http://147.78.141.96:8075/api/auth/tiktok/accessToken/'

        const tokenResponse = await fetch(TIKTOK_ACCESS_TOKEN, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        })

        const result = await tokenResponse.json()

        if (!tokenResponse.ok) {
          throw new Error(result.message || 'Failed to get access token')
        }

        router.push('/dashboard?success=tiktok_connected')
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
