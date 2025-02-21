import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx'], // Ensure this path is correct
            refresh: true,
        }),
        react(),
    ],
    build: {
        manifest: true, // 🚨 This ensures manifest.json is generated
        outDir: 'public/build', // 🚨 Laravel expects it here
        emptyOutDir: true, // Clears old files to avoid conflicts
        rollupOptions: {
            input: 'resources/js/app.jsx', // Ensure the entry file is correct
        },
    }
});
