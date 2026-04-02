import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const frontendRoot = dirname(fileURLToPath(import.meta.url));
  const envDir = resolve(frontendRoot, '..');
  const env = loadEnv(mode, envDir, '');
  const apiTarget = env.VITE_API_PROXY_TARGET || env.VITE_API_URL || env.VITE_API_BASE_URL || 'http://localhost:5000';

  return {
    plugins: [react()],
    envDir,
    server: {
      host: true,
      port: 5173,
      fs: {
        allow: ['..'],
      },
      proxy: {
        '/api': {
          target: apiTarget,
          changeOrigin: true,
        },
      },
    },
    preview: {
      host: true,
      port: 4173,
    },
  };
});
