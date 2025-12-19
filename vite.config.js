import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  
  //this is additionally add due to appwrite host issue
  // server: {
  //   port: 80,
  //   host: "localhost"
  // }

})
