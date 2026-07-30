// =============================================================================
// Myelektra Website - Astro Configuration
// =============================================================================
// Purpose: Configure Astro with TinaCMS and Cloudflare Workers deployment
// =============================================================================

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import { tinaIntegration } from 'tinacms/dist/vite';

// =============================================================================
// Astro Configuration
// =============================================================================

export default defineConfig({
  // Output: Server-side rendering for TinaCMS visual editing
  output: 'server',

  // Adapter: Cloudflare Workers (required for TinaCMS)
  adapter: cloudflare(),

  // Vite plugins
  vite: {
    plugins: [
      // Tailwind CSS
      tailwindcss(),

      // TinaCMS integration
      tinaIntegration({
        // Path to TinaCMS config
        configPath: './tina/config.ts',

        // Media directory
        publicMediaDir: './public/uploads',

        // Content directory
        contentDir: './content',

        // Generate types
        generateCodegen: true,
      }),
    ],

    // Optimize for production
    build: {
      cssCodeSplit: true,
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: {
            'react': ['react', 'react-dom'],
          },
        },
      },
    },
  },

  // Image optimization
  image: {
    // Remote image patterns
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.catbox.moe',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
      },
    ],
  },

  // Markdown configuration
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
    },
  },

  // Integrations
  integrations: [
    // React support for islands
    react(),
  ],

  // Server configuration for TinaCMS
  server: {
    port: 3000,
    host: true,
  },

  // Environment variables
  env: {
    // TinaCMS
    TINA_CLIENT_ID: process.env.TINA_CLIENT_ID,
    TINA_TOKEN: process.env.TINA_TOKEN,
  },
});
