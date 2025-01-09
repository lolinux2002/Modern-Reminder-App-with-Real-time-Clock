import { defineConfig, loadEnv } from 'vite';
    import react from '@vitejs/plugin-react';

    export default defineConfig(({ mode }) => {
      const env = loadEnv(mode, process.cwd(), '');
      return {
        plugins: [react()],
        server: {
          port: 5173,
          proxy: {
            '/auth/v1': {
              target: env.VITE_SUPABASE_URL,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/auth\/v1/, '')
            },
            '/rest/v1': {
              target: env.VITE_SUPABASE_URL,
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/rest\/v1/, '')
            }
          }
        }
      };
    });
