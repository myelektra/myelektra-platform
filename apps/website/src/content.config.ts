// =============================================================================
// Astro Content Collections Configuration
// =============================================================================
// Defines schemas for all TinaCMS-managed content
// Used for type-safe content loading in Astro pages
// =============================================================================

import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// =============================================================================
// Pages Collection (MDX)
// =============================================================================

const pages = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
    draft: z.boolean().optional(),
    body: z.any().optional(), // TinaCMS rich-text body
  }),
});

// =============================================================================
// Solutions Collection (MD)
// =============================================================================

const solutions = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './content/solutions' }),
  schema: z.object({
    title: z.string(),
    price: z.string().optional(),
    description: z.string().optional(),
    icon: z.enum(['bronze', 'silver', 'gold', 'platinum', 'diamond']).optional(),
    isPopular: z.boolean().optional(),
    bestFor: z.string().optional(),
    cta: z.string().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    steps: z.array(z.object({
      title: z.string(),
      description: z.string(),
    })).optional(),
  }),
});

// =============================================================================
// Industries Collection (MD)
// =============================================================================

const industries = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './content/industries' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    icon: z.enum(['manufacturing', 'saas', 'banking', 'bpo', 'consulting']).optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    personas: z.array(z.object({
      name: z.string(),
      description: z.string().optional(),
    })).optional(),
  }),
});

// =============================================================================
// Why Myelektra Collection (MD)
// =============================================================================

const whyMyelektra = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './content/why-myelektra' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    icon: z.enum(['brain', 'hubspot', 'quality', 'report', 'globe', 'revenue']).optional(),
    order: z.number().optional(),
  }),
});

// =============================================================================
// Client Logos Collection (MD)
// =============================================================================

const clientLogos = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './content/client-logos' }),
  schema: z.object({
    title: z.string(),
    logo: z.string().optional(),
    website: z.string().optional(),
    order: z.number().optional(),
  }),
});

// =============================================================================
// Countries Collection (MD)
// =============================================================================

const countries = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './content/countries' }),
  schema: z.object({
    title: z.string(),
    flagAccent: z.string().optional(),
    personas: z.array(z.object({
      name: z.string(),
    })).optional(),
    order: z.number().optional(),
  }),
});

// =============================================================================
// Export Collections
// =============================================================================

export const collections = {
  pages,
  solutions,
  industries,
  whyMyelektra,
  clientLogos,
  countries,
};
