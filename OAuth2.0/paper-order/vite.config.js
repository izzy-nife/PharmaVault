import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    headers: {
      // Allows the Google login popup to communicate with your app window
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    },
  },
})
