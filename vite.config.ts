import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import path from 'node:path';

const single = process.env.SINGLE_FILE === '1';

export default defineConfig({
  base: './',
  plugins: [react(), ...(single ? [viteSingleFile()] : [])],
  resolve: {
    alias: {
      '@siteui': path.resolve(__dirname, 'src/siteui'),
      'onepage-kit': path.resolve(__dirname, 'src/lib/onepage-kit.ts'),
    },
  },
  build: { target: 'es2020' },
});
