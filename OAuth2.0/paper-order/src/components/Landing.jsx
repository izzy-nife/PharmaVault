import React, { useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'

const Landing = () => {
  const [status, setStatus] = useState('Idle')
  const [loading, setLoading] = useState(false)

  // 1. This function runs after the user logs in and approves permissions
  const handleAuthSuccess = async (tokenResponse) => {
    setLoading(true)
    setStatus('Sending token to backend server...')
    console.log('Access Token acquired:', tokenResponse.access_token)

    try {
      // 2. HTTP POST request sending the access token over the network
      const response = await fetch(
        'http://localhost:3000/api/download-attachments',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: tokenResponse.access_token }),
        },
      )

      const data = await response.json()

      if (response.ok) {
        setStatus('Success! Attachments have been safely downloaded.')
      } else {
        setStatus(`Backend Error: ${data.error || 'Something went wrong'}`)
      }
    } catch (error) {
      console.error('Network communication failed:', error)
      setStatus('Network error: Could not reach the backend server.')
    } finally {
      setLoading(false)
    }
  }

  // 3. Configure the custom Google Token client with required Gmail scopes
  const loginWithGmail = useGoogleLogin({
    scope: ['https://mail.google.com/'],
    callback: handleAuthSuccess,
    onError: (err) => {
      console.error('Google login failed:', err)
      setStatus('Google Authentication Failed.')
    },
  })

  return (
    <div>
      <h1>Gmail Attachment Downloader</h1>
      <p >
        Click below to authenticate and extract email attachments directly to
        your server.
      </p>

      <button
        onClick={() => loginWithGmail()}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Connect Google & Sync'}
      </button>

      <div >
        <strong>Status:</strong> {status}
      </div>
    </div>
  )
}

export default Landing
