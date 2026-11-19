import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' makes the build work on GitHub Pages sub-paths, Vercel and Netlify alike.
export default defineConfig({
  plugins: [react()],
  base: './',
});
