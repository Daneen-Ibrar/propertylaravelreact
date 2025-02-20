import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/js/app.jsx'], // Ensure this is correct
      refresh: true,
    }),
    react({
      include: '**/*.jsx',
    }),
  ],
  build: {
    outDir: 'dist', // Force build output to `dist/` for GitHub Pages
  },
  base: './', // Fix asset paths for GitHub Pages
});
