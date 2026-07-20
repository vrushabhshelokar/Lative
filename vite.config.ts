import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import { fileURLToPath } from 'url';
import path from 'path';
import manifest from './manifests/manifest.chrome.json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isFirefox = mode === 'firefox';

  return {
    plugins: [
      react(),
      !isFirefox && crx({ manifest })
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    build: {
      outDir: isFirefox ? 'dist-firefox' : 'dist',
      rollupOptions: {
        input: isFirefox 
          ? {
              popup: path.resolve(__dirname, './src/popup/index.html'),
              background: path.resolve(__dirname, './src/background/index.ts'),
              content: path.resolve(__dirname, './src/content/index.ts')
            }
          : undefined,
        output: {
          entryFileNames: (chunkInfo) => {
            if (isFirefox && (chunkInfo.name === 'background' || chunkInfo.name === 'content')) {
              return '[name].js';
            }
            return 'assets/[name]-[hash].js';
          },
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('scheduler') || id.includes('react-dom')) {
                return 'vendor-react';
              }
              if (id.includes('dexie')) {
                return 'vendor-dexie';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-lucide';
              }
              return 'vendor-libs';
            }
          }
        }
      }
    },
    esbuild: {
      drop: ['console', 'debugger']
    }
  };
});
