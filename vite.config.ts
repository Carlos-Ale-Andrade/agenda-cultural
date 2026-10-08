import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',
  // caminhos relativos: o dist/ funciona em qualquer pasta e no Capacitor
  base: './',
  build: {
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
  },
});
