import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  build: {
    target: 'es2015',
    sourcemap: true,
  },
  external: ['jquery', 'spin'],
  output: {
    format: 'iife',
    globals: {
      jquery: 'jQuery',
      jquery: '$',
      spin: 'Spinner'
    }
  }
})