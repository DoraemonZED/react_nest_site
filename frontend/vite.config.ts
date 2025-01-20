import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8910',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''), // 如果后端不需要 /api 前缀，可以取消注释
      }
    }
  }
})
