// =============================================================================
// Myelektra Website - Astro Configuration
// =============================================================================
// Purpose: Configure Astro with TinaCMS and Cloudflare Workers deployment
// =============================================================================

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';

// =============================================================================
// Astro Configuration
// =============================================================================

export default defineConfig({
  // Output: Server-side rendering for TinaCMS visual editing
  output: 'server',

  // Adapter: Cloudflare Workers
  adapter: cloudflare(),

  // Vite plugins
  vite: {
    plugins: [
      // Tailwind CSS
      tailwindcss(),
    ],

    // Optimize for production
    build: {
      cssCodeSplit: true,
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

  // Note: TINA_CLIENT_ID and TINA_TOKEN are read by TinaCMS directly from process.env
  // Do NOT add them to env block — Astro strict mode will reject unrecognized keys
});
