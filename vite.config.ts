import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import manifest from './public/manifest.json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const firefoxCompatPlugin = {
  name: 'firefox-compat',
  writeBundle() {
    const manifestPath = path.resolve(__dirname, 'dist/manifest.json');
    if (fs.existsSync(manifestPath)) {
      const manifestData = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      if (manifestData.background) {
        manifestData.background.scripts = ['service-worker-loader.js'];
      }
      fs.writeFileSync(manifestPath, JSON.stringify(manifestData, null, 2));
    }
  }
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
    firefoxCompatPlugin
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    rollupOptions: {
      output: {
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
});
