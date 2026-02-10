
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // base를 '/'로 설정하여 대부분의 도메인 환경에 대응합니다.
  // 만약 GitHub Pages의 서브폴더에 배포한다면 '/repo-name/'으로 변경이 필요할 수 있습니다.
  base: '/', 
  define: {
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          utils: ['lucide-react', '@google/genai']
        }
      }
    }
  },
  server: {
    historyApiFallback: true,
  }
});
