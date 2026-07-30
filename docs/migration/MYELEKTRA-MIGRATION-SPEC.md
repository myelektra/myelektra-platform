# MYELEKTRA MIGRATION SPEC
# Full Website Migration Specification
## React + Vite → Astro + TinaCMS + Cloudflare

---

**Version:** 2.0
**Date:** July 30, 2026
**Status:** Draft
**Owner:** Myelektra Platform Team

---

## 1. EXECUTIVE SUMMARY

This specification defines the complete migration plan for the Myelektra website from the legacy React + Vite application to a modern Astro platform with TinaCMS for editorial content and Cloudflare for business data.

The migration preserves all existing business functionality, branding, URLs, SEO, and conversion flows while establishing a scalable foundation for future platform expansion (MIC, AI Workspace, Revenue Intelligence).

### Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                    │
│                                                         │
│  Astro + React Islands → Static HTML + Interactive UI   │
│                                                         │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                     CONTENT LAYER                        │
│                                                         │
│  TinaCMS + Git + Markdown/MDX → Editorial Content       │
│                                                         │
│  • Pages (Home, Solutions, Industries, etc.)            │
│  • Navigation                                          │
│  • SEO metadata                                        │
│  • Media assets                                        │
│  • Draft/publish workflow                               │
│                                                         │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    BUSINESS LAYER                        │
│                                                         │
│  Cloudflare D1 → Operational Data                       │
│                                                         │
│  • MIC modules                                         │
│  • Sales Workspace                                     │
│  • Analytics                                           │
│  • User management                                     │
│  • HubSpot sync                                        │
│  • Feature flags                                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 2. PROJECT CONTEXT

### 2.1 Current State

| Component | Status |
|-----------|--------|
| Monorepo scaffolding | Empty (apps/, packages/, infrastructure/, scripts/) |
| Legacy application | Complete React + Vite app at `legacy/website-react-vite` |
| Content source | `content-config.json` (~1500 lines) with typed TS exports |
| Pages | 11 total (8 public + 3 additional) |
| Components | Header, Footer, Layout, ScrollAnimations, ScrollReveal, Icons, PriceDisplay |
| Styling | Tailwind CSS v4 |
| Dependencies | React 19, React Router DOM 7, clsx, tailwind-merge |

### 2.2 Legacy Route Map

| Route | Page Component | Complexity |
|-------|----------------|------------|
| `/` | Home | High (multiple sections, animations) |
| `/solutions` | Solutions | Medium (card grid, pricing display) |
| `/solutions/:id` | SolutionDetail | Medium (dynamic routing, related items) |
| `/industries` | Industries | Medium (card grid, personas) |
| `/pricing` | Pricing | Medium (comparison table, feature matrix) |
| `/how-it-works` | HowItWorks | Low (process steps, timeline) |
| `/academy` | Academy | Medium (topics grid, pricing cards) |
| `/about` | About | Low (static content, stats) |
| `/contact` | ContactPage | Medium (office info, CTA buttons) |
| `/get-quote-here-new` | GetQuoteHere | High (HubSpot form embed) |
| `/consultation` | Consultation | High (HubSpot meetings embed) |

### 2.3 Content Architecture

**TinaCMS** manages all editorial content:

- **Pages**: Hero sections, CTAs, page-specific content for all 11 pages
- **Solutions**: 5 tiers (Bronze → Diamond) with features, steps, pricing
- **Industries**: 5 industries with personas
- **Countries**: 7 target markets with personas
- **Navigation**: Desktop nav with submenus, header CTA, footer columns
- **Brand**: Company info, tagline, contact, social, founder, logo
- **Global**: Floating CTA, back-to-top, cookie banner, scroll animation config

**Cloudflare D1** manages business data only:

- **MIC**: Companies, contacts, deals, activities, revenue metrics
- **Workspace**: Presentations, proposals, calculators, playbooks
- **Analytics**: Page views, events, conversions
- **Users**: User management, sessions
- **Feature Flags**: Feature toggles and evaluations
- **Integrations**: HubSpot sync, API logs

---

## 3. ARCHITECTURE DECISIONS

### 3.1 Target Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Framework | Astro 5.x | Static-first, minimal JS, SEO-optimized |
| Interactive Components | React 19 (islands) | Only where client-side interaction required |
| Styling | Tailwind CSS v4 | Consistent with legacy, utility-first |
| Content Management | TinaCMS | Visual editing, Git-based, no custom CMS |
| Business Data | Cloudflare D1 | MIC, workspace, analytics, users |
| Storage | Cloudflare R2 | Media assets, future presentation files |
| Deployment | Cloudflare Workers | Required for TinaCMS visual editing |
| Build | Turborepo | Monorepo task orchestration |
| Package Manager | pnpm | Fast, disk-efficient |

### 3.2 TinaCMS Content Strategy

**Approach: Git-based Editorial Content**

TinaCMS manages all editorial website content:

| Content Type | TinaCMS Collection | Storage |
|--------------|-------------------|---------|
| Pages | `page` | `content/pages/*.mdx` |
| Solutions | `solution` | `content/solutions/*.md` |
| Industries | `industry` | `content/industries/*.md` |
| Navigation | `navigation` | `content/navigation/*.json` |
| Brand | `brand` | `content/brand/*.json` |
| Footer | `footer` | `content/footer/*.json` |
| Global Settings | `global` | `content/global/*.json` |
| Client Logos | `clientLogo` | `content/client-logos/*.md` |
| Countries | `country` | `content/countries/*.md` |
| Why Myelektra | `whyMyelektra` | `content/why-myelektra/*.md` |

**Benefits:**

- Visual editing for non-technical users
- Git-based version control (free)
- Draft/publish workflow
- Rich text editing with custom components
- Block-based page composition
- No custom CMS to maintain

### 3.3 D1 Business Data Strategy

**Approach: Operational Data Only**

D1 stores only business-critical operational data:

| Category | Tables | Purpose |
|----------|--------|---------|
| MIC | mic_companies, mic_contacts, mic_deals, mic_activities, mic_revenue_metrics | Customer intelligence |
| Workspace | workspace_presentations, workspace_proposals, workspace_calculators, workspace_playbooks | Sales tools |
| Analytics | analytics_page_views, analytics_events, analytics_conversions | Performance tracking |
| Users | users, user_sessions | Authentication |
| Feature Flags | feature_flags, feature_flag_evaluations | Feature management |
| Integrations | integration_hubspot_sync, integration_api_logs | Third-party sync |

### 3.4 React Islands Strategy

**Approach: Aggressive Astro (Minimal React)**

Maximize Astro components. Use React islands only for:

| Feature | React Required? | Reason |
|---------|-----------------|--------|
| Static page content | No | Astro component |
| Navigation menus | No | Astro + minimal JS for mobile toggle |
| Hero sections | No | Astro component |
| Card grids | No | Astro component |
| Pricing tables | No | Astro component |
| Process steps | No | Astro component |
| Scroll animations | No | Intersection Observer API |
| Floating CTA | Minimal | Scroll position detection |
| Back to top | Minimal | Scroll position detection |
| Cookie banner | Yes (island) | State management, localStorage |
| HubSpot form embed | Yes (island) | External script loading |
| HubSpot meetings embed | Yes (island) | iframe handling |
| Search/filter | Yes (island) | Client-side filtering |

### 3.5 Animation Strategy

**Approach: Lightweight JavaScript (No Libraries)**

- Use native Intersection Observer API for scroll-triggered animations
- CSS transitions and keyframes for all motion
- No GSAP, Framer Motion, or animation libraries
- `data-animate` attributes on elements for scroll reveal
- CSS classes toggled by Intersection Observer callback

---

## 4. MONOREPO STRUCTURE

### 4.1 Directory Layout

```
myelektra-platform/
├── apps/
│   └── website/                    # Production Astro application
│       ├── src/
│       │   ├── components/         # Page-specific components
│       │   ├── layouts/            # Astro layouts
│       │   ├── pages/              # Route pages
│       │   ├── islands/            # React interactive components
│       │   ├── lib/                # App-specific utilities
│       │   └── styles/
│       ├── content/                # TinaCMS content (Git)
│       │   ├── pages/
│       │   ├── solutions/
│       │   ├── industries/
│       │   ├── navigation/
│       │   ├── brand/
│       │   ├── footer/
│       │   ├── global/
│       │   ├── client-logos/
│       │   ├── countries/
│       │   └── why-myelektra/
│       ├── tina/                   # TinaCMS configuration
│       │   ├── config.ts
│       │   └── __generated__/      # Auto-generated types
│       ├── public/
│       ├── astro.config.mjs
│       └── package.json
│
├── packages/
│   ├── ui/                         # Shared UI components
│   ├── types/                      # Shared TypeScript interfaces
│   ├── utils/                      # Shared utilities
│   ├── config/                     # Shared configuration
│   └── assets/                     # Shared static assets
│
├── legacy/
│   └── website-react-vite/         # Read-only migration source
│
├── docs/
│   ├── prd/
│   ├── architecture/
│   ├── prompts/
│   └── migration/
│
├── scripts/
│   ├── content-migration/          # Content migration scripts
│   └── deployment/                 # Deployment automation
│
├── infrastructure/
│   ├── cloudflare/
│   │   ├── wrangler.toml
│   │   ├── d1-schema.sql           # Business data only
│   │   └── workers/
│   └── github-actions/
│       ├── ci.yml
│       └── deploy.yml
│
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
├── tsconfig.base.json
└── README.md
```

---

## 5. LAYOUT ARCHITECTURE

### 5.1 Layout Hierarchy

```
BaseLayout.astro
├── <head> (meta, fonts, analytics)
├── <Header> (navigation, CTA)
├── <slot> (page content)
├── <Footer>
├── <FloatingCTA> (scroll-triggered)
├── <BackToTop>
└── <CookieBanner> (React island)
```

### 5.2 Layout Types

| Layout | Usage | Components |
|--------|-------|------------|
| `BaseLayout` | All pages | Header, Footer, global elements |
| `PageLayout` | Standard pages | Hero section + content area |
| `ContentLayout` | Article/detail pages | Breadcrumbs + sidebar + content |
| `WorkspaceLayout` | Internal tools | Auth check + sidebar + content |

---

## 6. CONTENT STRATEGY

### 6.1 TinaCMS Integration

**Editorial Content Flow:**

```
Editor (TinaCMS Dashboard)
    ↓
Visual Editing
    ↓
Save to Git (Markdown/MDX)
    ↓
Build (Astro + Tina)
    ↓
Deploy (Cloudflare Workers)
```

**Content Loading Pattern:**

```typescript
// apps/website/src/lib/content.ts
import { client } from '../tina/__generated__/client';

export async function getPageContent(slug: string) {
  const result = await client.request({
    query: `query { page(relativePath: "${slug}.mdx") { ... } }`,
    variables: {},
  });
  return result.data.page;
}

export async function getSolutions() {
  const result = await client.request({
    query: `query { solutionList { edges { node { ... } } } }`,
    variables: {},
  });
  return result.data.solutionList.edges;
}
```

### 6.2 Business Data Strategy

**D1 Content Flow:**

```
MIC / Workspace / Analytics
    ↓
D1 Database
    ↓
API Endpoints (Cloudflare Workers)
    ↓
Astro Pages / React Islands
```

**Business Data Loading:**

```typescript
// apps/website/src/lib/business.ts
import { D1 } from '@cloudflare/workers-types';

export async function getCompanies(db: D1Database) {
  const results = await db.prepare('SELECT * FROM mic_companies ORDER BY name').all();
  return results.results;
}

export async function getFeatureFlag(db: D1Database, flagId: string) {
  const result = await db.prepare('SELECT * FROM feature_flags WHERE id = ?').bind(flagId).first();
  return result;
}
```

---

## 7. MIGRATION PHASES

### 7.1 Phase Overview

| Phase | Description | Duration | Deliverables |
|-------|-------------|----------|--------------|
| Phase 0 | Monorepo Scaffolding | 1 week | Empty monorepo with tooling |
| Phase 1 | Core Infrastructure | 2 weeks | Layouts, shared packages, TinaCMS setup |
| Phase 2 | Static Pages Migration | 4 weeks | All 11 pages migrated with TinaCMS |
| Phase 3 | Interactive Features | 2 weeks | Forms, embeds, animations |
| Phase 4 | TinaCMS Integration | 2 weeks | Visual editing, content workflows |
| Phase 5 | Testing & QA | 2 weeks | Full test coverage |
| Phase 6 | Deployment & Launch | 1 week | Production deployment |
| **Total** | | **14 weeks** | |

### 7.2 Phase 0: Monorepo Scaffolding (Week 1)

**Objective:** Establish the foundational monorepo structure.

**Tasks:**
1. Initialize pnpm workspace
2. Configure Turborepo
3. Create base `package.json` files for all packages
4. Set up TypeScript base configuration
5. Configure ESLint and Prettier
6. Create README with development instructions

**Deliverables:**
- `pnpm-workspace.yaml`
- `turbo.json`
- `package.json` (root)
- `tsconfig.base.json`
- Empty package directories with `package.json`

### 7.3 Phase 1: Core Infrastructure (Weeks 2-3)

**Objective:** Build the shared foundation for all pages.

**Tasks:**

**Week 2: Shared Packages**
1. Create `packages/ui` with base components
2. Create `packages/types` with TypeScript interfaces
3. Create `packages/utils` with utility functions
4. Create `packages/config` with route configuration
5. Create `packages/assets` with shared assets

**Week 3: Astro Application + TinaCMS**
1. Initialize `apps/website` with Astro
2. Configure Tailwind CSS v4
3. Set up TinaCMS configuration
4. Create content schemas
5. Create `BaseLayout.astro`
6. Create Header component (Astro)
7. Create Footer component (Astro)
8. Create global styles
9. Set up Cloudflare Workers deployment

**Deliverables:**
- All shared packages with initial implementations
- Astro application with layouts
- TinaCMS configuration and schemas
- Working header and footer

### 7.4 Phase 2: Static Pages Migration (Weeks 4-7)

**Objective:** Migrate all 11 pages with TinaCMS content.

**Migration Order (PRD-001):**

| Week | Pages | Components to Migrate |
|------|-------|----------------------|
| Week 4 | Home, About | Hero sections, journey cards, achievements, stats, mission |
| Week 5 | Solutions, SolutionDetail | Solution cards, pricing display, breadcrumbs, related items |
| Week 6 | Industries, Pricing | Industry cards, pricing comparison table, feature matrix |
| Week 7 | HowItWorks, Academy, Contact, GetQuote, Consultation | Process steps, topics grid, office info, forms, embeds |

**Per-Page Migration Checklist:**

```
For each page:
□ Audit legacy component structure
□ Identify reusable vs page-specific components
□ Create Astro component(s)
□ Create TinaCMS schema for page content
□ Migrate content to TinaCMS collections
□ Preserve all URLs
□ Preserve all metadata (title, description, OG tags)
□ Preserve all internal links
□ Preserve all images with alt text
□ Verify responsive design
□ Verify accessibility (keyboard nav, focus states, ARIA)
□ Verify animations work
□ Add to sitemap
```

### 7.5 Phase 3: Interactive Features (Weeks 8-9)

**Objective:** Implement all interactive functionality.

**Tasks:**

**Week 8: Global Interactive Elements**
1. Cookie banner (React island)
2. Floating CTA (scroll-triggered)
3. Back to top button
4. Mobile navigation toggle
5. Scroll animations (Intersection Observer)

**Week 9: Page-Specific Interactivity**
1. HubSpot form integration (GetQuoteHere)
2. HubSpot meetings embed (Consultation)
3. Solution detail dynamic routing
4. Any filtering/search if needed

### 7.6 Phase 4: TinaCMS Integration (Weeks 10-11)

**Objective:** Complete TinaCMS setup and visual editing.

**Tasks:**

**Week 10: TinaCMS Setup**
1. Configure TinaCMS admin panel
2. Set up Git-based content storage
3. Create visual editing workflows
4. Configure media storage
5. Test content creation flow

**Week 11: Content Workflows**
1. Set up draft/publish workflow
2. Configure preview deployments
3. Create content migration scripts
4. Migrate all legacy content to TinaCMS
5. Verify content integrity

**Deliverables:**
- TinaCMS admin panel functional
- Visual editing working
- All content migrated to TinaCMS
- Draft/publish workflow operational

### 7.7 Phase 5: Testing & QA (Weeks 12-13)

**Objective:** Comprehensive testing and quality assurance.

**Testing Checklist:**

```
□ All routes render correctly
□ All forms submit successfully
□ All links work (no 404s)
□ All images load with alt text
□ All pages pass Lighthouse 90+ (mobile)
□ All pages pass Lighthouse 95+ (desktop)
□ All pages pass accessibility audit
□ All pages pass visual regression
□ All interactive features work
□ All embeds load correctly
□ Cookie banner works
□ Mobile responsive on all breakpoints
□ SEO metadata preserved
□ Sitemap generates correctly
□ Robots.txt correct
□ Canonical URLs correct
□ TinaCMS visual editing works
□ Content draft/publish workflow works
□ D1 business data accessible
```

### 7.8 Phase 6: Deployment & Launch (Week 14)

**Objective:** Deploy to production and validate.

**Deployment Strategy:**

```
1. Build production Astro site
2. Deploy to Cloudflare Workers (staging)
3. Run full test suite on staging
4. Verify TinaCMS admin panel
5. Verify all pages render correctly
6. Verify all forms work
7. Verify all embeds load
8. Update DNS to point to new deployment
9. Monitor for 72 hours
10. Verify Google Search Console
11. Decommission legacy application
```

---

## 8. CI/CD PIPELINE

### 8.1 GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  NODE_VERSION: '20'
  PNPM_VERSION: '9'

jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm run lint

  typecheck:
    name: Type Check
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm run typecheck

  test:
    name: Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm run test

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: [lint, typecheck, test]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm run build

  deploy-staging:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    needs: [build]
    if: github.ref == 'refs/heads/develop'
    environment: staging
    steps:
      - uses: actions/checkout@v4
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy apps/website/dist/ --project-name=myelektra-staging

  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: [build]
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - uses: actions/checkout@v4
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy apps/website/dist/ --project-name=myelektra
```

---

## 9. DEPLOYMENT ARCHITECTURE

### 9.1 Cloudflare Services

| Service | Purpose | Configuration |
|---------|---------|---------------|
| Workers | Website hosting + TinaCMS | Required for visual editing |
| D1 | Business data | MIC, workspace, analytics, users |
| R2 | Media storage | Images, documents, presentations |
| KV | Caching layer | Content caching |
| WAF | Security | Bot protection |
| Analytics | Monitoring | Traffic, performance |

### 9.2 Environment Configuration

```toml
# wrangler.toml
name = "myelektra"
compatibility_date = "2024-01-01"
main = "dist/_worker.js"

[site]
bucket = "./dist"

[[d1_databases]]
binding = "DB"
database_name = "myelektra-business"
database_id = "<D1_DATABASE_ID>"

[[r2_buckets]]
binding = "MEDIA"
bucket_name = "myelektra-media"

[[kv_namespaces]]
binding = "CACHE"
id = "<KV_NAMESPACE_ID>"

[vars]
TINA_CLIENT_ID = "<TINA_CLIENT_ID>"
TINA_TOKEN = "<TINA_TOKEN>"
PUBLIC_GA_ID = "G-BLF912YLHH"
PUBLIC_HUBSPOT_PORTAL_ID = "3306812"

# --- GitHub Secrets (set via GitHub UI) ---
# CLOUDFLARE_API_TOKEN = <CLOUDFLARE_API_TOKEN>
# CLOUDFLARE_ACCOUNT_ID = <CLOUDFLARE_ACCOUNT_ID>
```

---

## 10. RISK MITIGATION

### 10.1 Risk Register

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| SEO degradation | Medium | High | Baseline comparison, canonical URL preservation, sitemap validation |
| Performance regression | Low | High | Lighthouse CI, Core Web Vitals monitoring, performance budgets |
| Form submission failure | Low | High | HubSpot integration testing, fallback mechanisms |
| TinaCMS integration issues | Medium | Medium | Test visual editing early, fallback to direct Git edits |
| URL changes | Low | High | URL mapping verification, 301 redirects if needed |
| Accessibility regression | Medium | Medium | axe-core testing, manual accessibility audits |
| Deployment failure | Low | High | Staging environment, rollback procedures, canary deployment |

---

## 11. TIMELINE & MILESTONES

### 11.1 Project Timeline

```
Week 1:  ████████████ Phase 0 - Monorepo Scaffolding
Week 2:  ████████████ Phase 1 - Core Infrastructure (Packages)
Week 3:  ████████████ Phase 1 - Core Infrastructure (Astro + TinaCMS)
Week 4:  ████████████ Phase 2 - Home + About Pages
Week 5:  ████████████ Phase 2 - Solutions + SolutionDetail Pages
Week 6:  ████████████ Phase 2 - Industries + Pricing Pages
Week 7:  ████████████ Phase 2 - Remaining Pages
Week 8:  ████████████ Phase 3 - Global Interactive Elements
Week 9:  ████████████ Phase 3 - Page-Specific Interactivity
Week 10: ████████████ Phase 4 - TinaCMS Setup
Week 11: ████████████ Phase 4 - Content Workflows
Week 12: ████████████ Phase 5 - Testing (Unit, Integration)
Week 13: ████████████ Phase 5 - Testing (E2E, Visual, Performance)
Week 14: ████████████ Phase 6 - Deployment + Launch
```

### 11.2 Key Milestones

| Milestone | Target Date | Deliverable |
|-----------|-------------|-------------|
| M1: Monorepo Ready | End of Week 1 | Working monorepo with tooling |
| M2: Infrastructure Complete | End of Week 3 | Layouts, shared packages, TinaCMS config |
| M3: Core Pages Live | End of Week 7 | All 11 pages migrated with TinaCMS |
| M4: Interactive Features | End of Week 9 | All interactive elements working |
| M5: TinaCMS Integration | End of Week 11 | Visual editing, content workflows |
| M6: Testing Complete | End of Week 13 | All tests passing |
| M7: Production Launch | End of Week 14 | Live on Cloudflare Workers |

---

## 12. SUCCESS CRITERIA

### 12.1 Technical Success

- [ ] All 11 pages migrated and functional
- [ ] All URLs preserved (no 404s)
- [ ] All forms submit correctly
- [ ] All embeds load properly
- [ ] Lighthouse score 90+ (mobile), 95+ (desktop)
- [ ] Core Web Vitals within targets
- [ ] All tests passing
- [ ] Zero accessibility regressions
- [ ] Zero SEO regressions

### 12.2 Content Management Success

- [ ] TinaCMS visual editing working
- [ ] Content creators can edit without code
- [ ] Draft/publish workflow functional
- [ ] Media management working
- [ ] Content versioning via Git

### 12.3 Business Success

- [ ] Customer experience unchanged
- [ ] Conversion rate maintained or improved
- [ ] Lead generation functional
- [ ] Platform ready for MIC integration
- [ ] D1 business data accessible

### 12.4 Operational Success

- [ ] CI/CD pipeline functional
- [ ] Staging environment operational
- [ ] Monitoring and alerting configured
- [ ] Rollback procedure tested
- [ ] Documentation complete

---

## 13. APPENDICES

### 13.1 TinaCMS Content Collections

| Collection | Path | Format | Purpose |
|------------|------|--------|---------|
| page | content/pages | mdx | Website pages |
| solution | content/solutions | md | Solution tiers |
| industry | content/industries | md | Industry pages |
| navigation | content/navigation | json | Navigation config |
| brand | content/brand | json | Brand configuration |
| footer | content/footer | json | Footer config |
| global | content/global | json | Global settings |
| clientLogo | content/client-logos | md | Client logos |
| country | content/countries | md | Target countries |
| whyMyelektra | content/why-myelektra | md | Why Myelektra items |

### 13.2 D1 Business Data Tables

| Category | Tables | Purpose |
|----------|--------|---------|
| MIC | mic_companies, mic_contacts, mic_deals, mic_activities, mic_revenue_metrics | Customer intelligence |
| Workspace | workspace_presentations, workspace_proposals, workspace_calculators, workspace_playbooks | Sales tools |
| Analytics | analytics_page_views, analytics_events, analytics_conversions | Performance tracking |
| Users | users, user_sessions | Authentication |
| Feature Flags | feature_flags, feature_flag_evaluations | Feature management |
| Integrations | integration_hubspot_sync, integration_api_logs | Third-party sync |

### 13.3 URL Preservation Map

| Legacy URL | New URL | Notes |
|------------|---------|-------|
| `/#/` | `/` | Hash routing removed |
| `/#/solutions` | `/solutions` | |
| `/#/solutions/:id` | `/solutions/:id` | Dynamic route preserved |
| `/#/industries` | `/industries` | |
| `/#/pricing` | `/pricing` | |
| `/#/how-it-works` | `/how-it-works` | |
| `/#/academy` | `/academy` | |
| `/#/about` | `/about` | |
| `/#/contact` | `/contact` | |
| `/#/get-quote-here-new` | `/get-quote-here-new` | |
| `/#/consultation` | `/consultation` | |

---

## END OF SPECIFICATION
