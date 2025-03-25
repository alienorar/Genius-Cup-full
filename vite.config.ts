import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), 
    tailwindcss(),
  ],
  resolve: {
    alias: [
      { find: "@", replacement: "/src/*" },
      { find: "@modules", replacement: "/src/modules" },
      { find: "@components", replacement: "/src/components" },
    ]
  },

  server: {
    port: 5175, 
    strictPort: false,
    allowedHosts: ['0fca-213-230-97-96.ngrok-free.app']

  }
})


