import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/BSE_Stock_Analyzer/", // Use your repository name here,
  build: {
    outDir: "build" // Ensure Vite builds into dist/
  }
})

// How Does This Help?

// Before:
//     Vite generates asset links like /assets/index.js, but GitHub Pages looks for /Stock_Analyzer/assets/index.js, causing 404 errors.
// After setting base correctly:
//     Vite generates links as /Stock_Analyzer/assets/index.js, so GitHub Pages finds them correctly.