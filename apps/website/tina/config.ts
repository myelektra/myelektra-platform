/**
 * TinaCMS Configuration for Myelektra Website
 * 
 * This configuration defines all content collections and schemas
 * for editorial content managed through TinaCMS.
 * 
 * Content is stored in Git as Markdown/MDX files.
 * 
 * @see https://tina.io/docs/configuration/
 */

import { defineConfig } from 'tinacms';

// =============================================================================
// Branch Configuration
// =============================================================================

// For Cloudflare Workers, read branch from CF_PAGES_BRANCH
// For local dev, use HEAD or fallback to main
const branch =
  process.env.CF_PAGES_BRANCH ||
  process.env.TINA_BRANCH ||
  process.env.HEAD ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  'main';

// Tina Cloud credentials
// In production, these come from Cloudflare Workers environment secrets
// In local dev, these come from .env file
const clientId = process.env.TINA_CLIENT_ID || null;
const token = process.env.TINA_TOKEN || null;

// =============================================================================
// TinaCMS Configuration
// =============================================================================

export default defineConfig({
  // Git provider configuration
  branch,
  clientId,
  token,

  // Build configuration
  build: {
    publicFolder: 'public',
    outputFolder: 'admin',
  },

  media: {
    tina: {
      publicFolder: 'public',
      mediaRoot: 'uploads',
    },
  },

  ui: {
    previewUrl: () => {
      return {
        url: process.env.PUBLIC_SITE_URL || 'http://localhost:3000',
      };
    },
  },

  // Schema collections
  schema: {
    collections: [
      // =====================================================================
      // PAGES COLLECTION
      // =====================================================================
      {
        name: 'page',
        label: 'Pages',
        path: 'content/pages',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Meta Description',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'string',
            name: 'ogImage',
            label: 'OG Image URL',
          },
          {
            type: 'boolean',
            name: 'draft',
            label: 'Draft',
          },
          // ---- Hero Section ----
          {
            type: 'string',
            name: 'heroHeadline',
            label: 'Hero Headline',
          },
          {
            type: 'string',
            name: 'heroSubtitle',
            label: 'Hero Subtitle',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'heroCtaLabel',
            label: 'Hero CTA Label',
          },
          {
            type: 'string',
            name: 'heroCtaPath',
            label: 'Hero CTA Path',
          },
          // ---- Story Section (About page) ----
          {
            type: 'string',
            name: 'storyLabel',
            label: 'Story Label',
          },
          {
            type: 'string',
            name: 'storyHeadline',
            label: 'Story Headline',
          },
          {
            type: 'string',
            name: 'storyParagraph1',
            label: 'Story Paragraph 1',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'storyParagraph2',
            label: 'Story Paragraph 2',
            ui: { component: 'textarea' },
          },
          // ---- Mission Section ----
          {
            type: 'string',
            name: 'missionHeadline',
            label: 'Mission Headline',
          },
          {
            type: 'string',
            name: 'missionText',
            label: 'Mission Text',
            ui: { component: 'textarea' },
          },
          // ---- Stats Section ----
          {
            type: 'string',
            name: 'statsHeadline',
            label: 'Stats Headline',
          },
          // ---- Solutions Page Fields ----
          {
            type: 'string',
            name: 'includedLabel',
            label: 'Included Label',
          },
          {
            type: 'string',
            name: 'popularBadge',
            label: 'Popular Badge Text',
          },
          // ---- Industries Page Fields ----
          {
            type: 'string',
            name: 'personasHeadline',
            label: 'Personas Headline',
          },
          // ---- CTA Section (common) ----
          {
            type: 'string',
            name: 'ctaHeadline',
            label: 'CTA Headline',
          },
          {
            type: 'string',
            name: 'ctaBody',
            label: 'CTA Body',
            ui: { component: 'textarea' },
          },
          {
            type: 'string',
            name: 'ctaButtonLabel',
            label: 'CTA Button Label',
          },
          {
            type: 'string',
            name: 'ctaButtonPath',
            label: 'CTA Button Path',
          },
          // ---- Body ----
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
      },

      // =====================================================================
      // SOLUTIONS COLLECTION
      // =====================================================================
      {
        name: 'solution',
        label: 'Solutions',
        path: 'content/solutions',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Solution Name',
            required: true,
          },
          {
            type: 'string',
            name: 'price',
            label: 'Price Display',
            description: 'e.g., "[Book Meeting for Pricing] per month"',
          },
          {
            type: 'string',
            name: 'description',
            label: 'Short Description',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'string',
            name: 'icon',
            label: 'Icon',
            options: [
              { value: 'bronze', label: 'Bronze' },
              { value: 'silver', label: 'Silver' },
              { value: 'gold', label: 'Gold' },
              { value: 'platinum', label: 'Platinum' },
              { value: 'diamond', label: 'Diamond' },
            ],
          },
          {
            type: 'boolean',
            name: 'isPopular',
            label: 'Most Popular',
          },
          {
            type: 'string',
            name: 'bestFor',
            label: 'Best For',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'string',
            name: 'cta',
            label: 'CTA Button Text',
          },
          {
            type: 'string',
            name: 'metaTitle',
            label: 'Meta Title',
          },
          {
            type: 'string',
            name: 'metaDescription',
            label: 'Meta Description',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'object',
            name: 'steps',
            label: 'How It Works Steps',
            list: true,
            fields: [
              {
                type: 'string',
                name: 'title',
                label: 'Step Title',
              },
              {
                type: 'string',
                name: 'description',
                label: 'Step Description',
                ui: {
                  component: 'textarea',
                },
              },
            ],
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Detailed Content',
            isBody: true,
          },
        ],
      },

      // =====================================================================
      // INDUSTRIES COLLECTION
      // =====================================================================
      {
        name: 'industry',
        label: 'Industries',
        path: 'content/industries',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Industry Name',
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'string',
            name: 'icon',
            label: 'Icon',
            options: [
              { value: 'manufacturing', label: 'Manufacturing' },
              { value: 'saas', label: 'SaaS & Technology' },
              { value: 'banking', label: 'Banking & Finance' },
              { value: 'bpo', label: 'BPO & Services' },
              { value: 'consulting', label: 'Consulting' },
            ],
          },
          {
            type: 'string',
            name: 'metaTitle',
            label: 'Meta Title',
          },
          {
            type: 'string',
            name: 'metaDescription',
            label: 'Meta Description',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'object',
            name: 'personas',
            label: 'Buyer Personas',
            list: true,
            fields: [
              {
                type: 'string',
                name: 'name',
                label: 'Persona Title',
              },
              {
                type: 'string',
                name: 'description',
                label: 'Persona Description',
                ui: {
                  component: 'textarea',
                },
              },
            ],
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Detailed Content',
            isBody: true,
          },
        ],
      },

      // =====================================================================
      // NAVIGATION COLLECTION
      // =====================================================================
      {
        name: 'navigation',
        label: 'Navigation',
        path: 'content/navigation',
        format: 'json',
        fields: [
          {
            type: 'object',
            name: 'desktop',
            label: 'Desktop Navigation',
            list: true,
            fields: [
              {
                type: 'string',
                name: 'label',
                label: 'Label',
              },
              {
                type: 'string',
                name: 'path',
                label: 'Path',
              },
              {
                type: 'object',
                name: 'submenu',
                label: 'Submenu',
                list: true,
                fields: [
                  {
                    type: 'string',
                    name: 'label',
                    label: 'Label',
                  },
                  {
                    type: 'string',
                    name: 'path',
                    label: 'Path',
                  },
                ],
              },
            ],
          },
          {
            type: 'string',
            name: 'headerCta',
            label: 'Header CTA Text',
          },
          {
            type: 'string',
            name: 'headerCtaPath',
            label: 'Header CTA Path',
          },
          {
            type: 'string',
            name: 'hideFromNav',
            label: 'Hide From Navigation',
            list: true,
          },
        ],
      },

      // =====================================================================
      // BRAND COLLECTION
      // =====================================================================
      {
        name: 'brand',
        label: 'Brand Configuration',
        path: 'content/brand',
        format: 'json',
        fields: [
          {
            type: 'string',
            name: 'company',
            label: 'Company Name',
          },
          {
            type: 'string',
            name: 'domain',
            label: 'Domain',
          },
          {
            type: 'string',
            name: 'tagline',
            label: 'Tagline',
          },
          {
            type: 'string',
            name: 'subTagline',
            label: 'Sub Tagline',
          },
          {
            type: 'string',
            name: 'positioning',
            label: 'Positioning Statement',
          },
          {
            type: 'string',
            name: 'phone',
            label: 'Phone Number',
          },
          {
            type: 'string',
            name: 'email',
            label: 'Email',
          },
          {
            type: 'object',
            name: 'address',
            label: 'Address',
            fields: [
              {
                type: 'string',
                name: 'line1',
                label: 'Address Line 1',
              },
              {
                type: 'string',
                name: 'line2',
                label: 'Address Line 2',
              },
              {
                type: 'string',
                name: 'country',
                label: 'Country',
              },
            ],
          },
          {
            type: 'string',
            name: 'hours',
            label: 'Business Hours',
          },
          {
            type: 'object',
            name: 'social',
            label: 'Social Links',
            fields: [
              {
                type: 'string',
                name: 'linkedin',
                label: 'LinkedIn URL',
              },
              {
                type: 'string',
                name: 'instagram',
                label: 'Instagram URL',
              },
            ],
          },
          {
            type: 'object',
            name: 'founder',
            label: 'Founder',
            fields: [
              {
                type: 'string',
                name: 'name',
                label: 'Name',
              },
              {
                type: 'string',
                name: 'title',
                label: 'Title',
              },
              {
                type: 'image',
                name: 'photo',
                label: 'Photo',
              },
              {
                type: 'string',
                name: 'linkedin',
                label: 'LinkedIn URL',
              },
              {
                type: 'string',
                name: 'instagram',
                label: 'Instagram URL',
              },
            ],
          },
          {
            type: 'object',
            name: 'logo',
            label: 'Logo',
            fields: [
              {
                type: 'image',
                name: 'file',
                label: 'Logo File',
              },
            ],
          },
        ],
      },

      // =====================================================================
      // FOOTER COLLECTION
      // =====================================================================
      {
        name: 'footer',
        label: 'Footer',
        path: 'content/footer',
        format: 'json',
        fields: [
          {
            type: 'object',
            name: 'columns',
            label: 'Footer Columns',
            list: true,
            fields: [
              {
                type: 'string',
                name: 'title',
                label: 'Column Title',
              },
              {
                type: 'string',
                name: 'type',
                label: 'Column Type',
                options: [
                  { value: 'brand', label: 'Brand' },
                  { value: 'solutions', label: 'Solutions' },
                  { value: 'company', label: 'Company' },
                  { value: 'contact', label: 'Contact' },
                ],
              },
              {
                type: 'object',
                name: 'links',
                label: 'Links',
                list: true,
                fields: [
                  {
                    type: 'string',
                    name: 'label',
                    label: 'Label',
                  },
                  {
                    type: 'string',
                    name: 'path',
                    label: 'Path',
                  },
                  {
                    type: 'boolean',
                    name: 'highlight',
                    label: 'Highlight',
                  },
                ],
              },
            ],
          },
          {
            type: 'string',
            name: 'copyright',
            label: 'Copyright Template',
            description: 'Use {year} for current year',
          },
        ],
      },

      // =====================================================================
      // GLOBAL SETTINGS COLLECTION
      // =====================================================================
      {
        name: 'global',
        label: 'Global Settings',
        path: 'content/global',
        format: 'json',
        fields: [
          {
            type: 'object',
            name: 'floatingCta',
            label: 'Floating CTA',
            fields: [
              {
                type: 'string',
                name: 'text',
                label: 'CTA Text',
              },
              {
                type: 'string',
                name: 'buttonLabel',
                label: 'Button Label',
              },
              {
                type: 'string',
                name: 'buttonPath',
                label: 'Button Path',
              },
              {
                type: 'number',
                name: 'showAfterScrollPx',
                label: 'Show After Scroll (px)',
              },
            ],
          },
          {
            type: 'object',
            name: 'backToTop',
            label: 'Back to Top',
            fields: [
              {
                type: 'number',
                name: 'showAfterScrollPx',
                label: 'Show After Scroll (px)',
              },
            ],
          },
          {
            type: 'object',
            name: 'cookieBanner',
            label: 'Cookie Banner',
            fields: [
              {
                type: 'string',
                name: 'text',
                label: 'Banner Text',
                ui: {
                  component: 'textarea',
                },
              },
              {
                type: 'string',
                name: 'acceptLabel',
                label: 'Accept Button',
              },
              {
                type: 'string',
                name: 'learnMoreLabel',
                label: 'Learn More Button',
              },
            ],
          },
          {
            type: 'object',
            name: 'scrollAnimation',
            label: 'Scroll Animation',
            fields: [
              {
                type: 'boolean',
                name: 'enabled',
                label: 'Enabled',
              },
            ],
          },
          {
            type: 'string',
            name: 'disclaimer',
            label: 'Disclaimer Text',
            ui: {
              component: 'textarea',
            },
          },
        ],
      },

      // =====================================================================
      // CLIENT LOGOS COLLECTION
      // =====================================================================
      {
        name: 'clientLogo',
        label: 'Client Logos',
        path: 'content/client-logos',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Company Name',
            required: true,
          },
          {
            type: 'image',
            name: 'logo',
            label: 'Logo Image',
          },
          {
            type: 'string',
            name: 'website',
            label: 'Website URL',
          },
          {
            type: 'number',
            name: 'order',
            label: 'Display Order',
          },
        ],
      },

      // =====================================================================
      // COUNTRIES COLLECTION
      // =====================================================================
      {
        name: 'country',
        label: 'Countries',
        path: 'content/countries',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Country Name',
            required: true,
          },
          {
            type: 'string',
            name: 'flagAccent',
            label: 'Flag Accent Class',
            description: 'CSS class for flag styling',
          },
          {
            type: 'object',
            name: 'personas',
            label: 'Buyer Personas',
            list: true,
            fields: [
              {
                type: 'string',
                name: 'name',
                label: 'Persona Title',
              },
            ],
          },
          {
            type: 'number',
            name: 'order',
            label: 'Display Order',
          },
        ],
      },

      // =====================================================================
      // WHY MYELEKTRA COLLECTION
      // =====================================================================
      {
        name: 'whyMyelektra',
        label: 'Why Myelektra',
        path: 'content/why-myelektra',
        format: 'md',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Feature Title',
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'string',
            name: 'icon',
            label: 'Icon',
            options: [
              { value: 'brain', label: 'Brain (AI)' },
              { value: 'hubspot', label: 'HubSpot' },
              { value: 'quality', label: 'Quality' },
              { value: 'report', label: 'Report' },
              { value: 'globe', label: 'Globe' },
              { value: 'revenue', label: 'Revenue' },
            ],
          },
          {
            type: 'number',
            name: 'order',
            label: 'Display Order',
          },
        ],
      },
    ],
  },
});
