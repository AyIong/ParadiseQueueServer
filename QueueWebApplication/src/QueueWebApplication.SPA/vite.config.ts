import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/hubs/servers': {
        target: 'https://localhost:7000',
        secure: false,
        ws: true,
        changeOrigin: true,
      },
      '/queue/add-client': {
        target: 'https://localhost:7000',
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
