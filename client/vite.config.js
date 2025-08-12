import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react(), ],
  server: {
    // 🔥 This is the key fix
    historyApiFallback: true,
  },
})
