import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // This is important for client-side routing to work correctly in production.
  build: {
    outDir: 'dist',
  },
  server: {
    historyApiFallback: true, // Enables history API fallback (dev mode)
  },
})
