# ARCHITECTURE-DECISIONS.md
# Myelektra Platform
# Architecture Decision Records (ADR)

Version: 2.0

---

# Purpose

This document records the major architectural decisions made during the design
and migration of the Myelektra Platform.

Every significant technical decision should be documented here.

Architecture decisions explain **why** something was chosen, not only **what**
was implemented.

Future engineers and AI coding agents should consult this document before
introducing architectural changes.

---

# Decision Status

Possible status values

Accepted
Proposed
Deprecated
Superseded
Rejected

---

# ADR-001

## Title
Repository Architecture
Status
Accepted

---

### Context

The existing website was developed as a standalone React + Vite application.

The platform will expand beyond a marketing website into multiple applications.

Future applications include

- Website
- MIC
- AI Workspace
- Revenue Intelligence

Multiple applications require shared code.

---

### Decision

Adopt a monorepo.

Repository structure

```
apps/

packages/

legacy/

docs/

scripts/

infrastructure/
```

---

### Consequences

Positive

- Shared code
- Easier maintenance
- Consistent architecture
- Better AI understanding

Negative

- Slightly more complex setup

---

# ADR-002

## Title
Legacy Preservation
Status
Accepted

---

### Context

The existing React application contains business knowledge that should not be
discarded.

---

### Decision

Move the existing application into

```
legacy/website-react-vite
```

Treat it as read-only.

New development occurs only inside

```
apps/website
```

---

### Consequences

Positive

- Complete migration reference.
- Lower migration risk.
- Rollback possible.

Negative

- Repository becomes larger.

---

# ADR-003

## Title
Primary Framework
Status
Accepted

---

### Context

The website is mostly content-driven.

SEO and performance are primary business requirements.

---

### Decision

Astro becomes the primary framework.

React is used only when interactivity is required.

---

### Rationale

Astro delivers

- Static HTML
- Better Core Web Vitals
- Smaller JavaScript bundles
- Better crawlability

---

### Consequences

Static pages become simpler.

React usage decreases significantly.

---

# ADR-004

## Title
React Islands
Status
Accepted

---

### Context

Some features require client-side interaction.

Examples

- Search
- Calculators
- Workspace
- Forms

---

### Decision

Interactive features remain React components.

Static UI becomes Astro.

---

### Consequences

Minimal hydration.

Better performance.

Maintainable architecture.

---

# ADR-005

## Title
Content Ownership - TinaCMS
Status
Accepted

---

### Context

Business content should not be tightly coupled to page components.

Content management needs:

- Visual editing
- Draft/publish workflow
- Version control
- Rich text editing
- Block-based page building

Previously decided to use D1 for content, but TinaCMS provides superior
editorial capabilities without building a custom CMS.

---

### Decision

**Editorial Content**: TinaCMS with Git-based storage

- Content lives in repository as Markdown/MDX files
- TinaCMS provides visual editing interface
- Version control through Git history
- Draft/publish workflow built-in
- No custom CMS implementation needed

**Business Data**: Cloudflare D1

- MIC data
- Analytics
- Workspace data
- User management
- HubSpot sync
- Operational data

---

### Rationale

TinaCMS provides:

- Visual editor with live preview
- Git-based content (no vendor lock-in)
- Draft/publish workflow
- Rich text editing with custom components
- Block-based page composition
- Media management
- Webhooks for CI/CD

D1 reserved for:

- Application data (not editorial content)
- Business intelligence
- MIC modules
- Sales workspace
- Analytics and logging

---

### Consequences

Positive

- No custom CMS to maintain
- Git-based versioning (free)
- Visual editing for non-technical users
- Clean separation of concerns

Negative

- Requires Git-based workflow for content
- Content updates require deployment (unless using Cloudflare Workers)

---

# ADR-006

## Title
Shared Packages
Status
Accepted

---

### Decision

Reusable functionality belongs inside packages.

Examples

- packages/ui
- packages/utils
- packages/types
- packages/config
- packages/assets
- packages/content (TinaCMS schemas)

---

### Consequences

- Reduced duplication.
- Improved consistency.

---

# ADR-007

## Title
Documentation Driven Development
Status
Accepted

---

### Context

AI coding agents require explicit guidance.

---

### Decision

Implementation must follow

PRD

↓

Architecture

↓

Repository Rules

↓

Coding Standards

↓

Task Instructions

---

### Consequences

- Architecture remains consistent.
- AI agents produce predictable code.

---

# ADR-008

## Title
Sales Workspace
Status
Accepted

---

### Context

Internal sales tools should not appear as public website pages.

---

### Decision

Internal tools belong under

```
/workspace/
```

Examples

- /workspace/presentation
- /workspace/proposal
- /workspace/demo
- /workspace/calculator

---

### Consequences

- Cleaner public website.
- Expandable workspace.

---

# ADR-009

## Title
Feature Flags
Status
Accepted

---

### Context

Future functionality should be introduced safely.

---

### Decision

New modules must support feature flags.

Visibility is configuration-driven.

Not hardcoded.

---

### Consequences

- Safer releases.
- Controlled rollout.

---

# ADR-010

## Title
Cloudflare Platform
Status
Accepted

---

### Context

Deployment should be globally distributed and scalable.

---

### Decision

Adopt Cloudflare as the primary deployment platform.

**Website**: Cloudflare Workers (required for TinaCMS dynamic islands)

**Business Data**: Cloudflare D1

**Media Storage**: Cloudflare R2 or TinaCMS media

**Caching**: Cloudflare KV

Future services

- Workers
- R2
- D1
- KV
- Queues

Only introduce services when justified.

---

### Consequences

- Excellent edge performance.
- Vendor dependency increases.
- TinaCMS visual editing requires Workers runtime.

---

# ADR-011

## Title
SEO Preservation
Status
Accepted

---

### Decision

Migration must preserve

- URLs
- Metadata
- Canonical URLs
- Structured data
- Internal links
- Backlinks

---

### Consequences

- Lower SEO migration risk.

---

# ADR-012

## Title
Invisible Migration
Status
Accepted

---

### Context

Business operations should continue uninterrupted.

---

### Decision

Users should not perceive migration.

Business behavior remains unchanged.

Technology changes underneath.

---

### Consequences

- Lower operational risk.
- Higher implementation effort.

---

# ADR-013

## Title
Security by Design
Status
Accepted

---

### Decision

Security is implemented as part of architecture.

Hidden routes are not security.

Authentication protects private functionality.

---

### Consequences

- Better long-term security.

---

# ADR-014

## Title
Repository Simplicity
Status
Accepted

---

### Decision

Prefer

- Simple
- Readable
- Reusable
- Maintainable

Avoid unnecessary abstraction.

Avoid unnecessary frameworks.

Avoid unnecessary dependencies.

---

### Consequences

- Repository remains understandable.

---

# ADR-015

## Title
AI First Maintainability
Status
Accepted

---

### Context

The repository will frequently be maintained using AI coding agents.

---

### Decision

Optimize repository organization for both humans and AI.

Requirements

- Small files.
- Clear ownership.
- Predictable folders.
- Typed interfaces.
- Minimal duplication.
- Comprehensive documentation.

---

### Consequences

- Lower onboarding time.
- More reliable AI-generated code.

---

# ADR-016

## Title
Three-Layer Architecture
Status
Accepted

---

### Context

The platform needs clear separation between:

1. Presentation (what users see)
2. Content Management (editorial content)
3. Business Logic (operational data)

---

### Decision

Implement a three-layer architecture:

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
│  Cloudflare D1 + MIC → Operational Data                 │
│                                                         │
│  • MIC modules                                         │
│  • Sales Workspace                                     │
│  • Analytics                                           │
│  • User management                                     │
│  • HubSpot sync                                        │
│  • Market signals                                      │
│  • Company intelligence                                │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

### Rationale

**Presentation Layer (Astro)**

- Server-rendered HTML for SEO
- React Islands for interactivity
- Minimal JavaScript payload
- Cloudflare Workers for TinaCMS

**Content Layer (TinaCMS)**

- Visual editing interface
- Git-based version control
- No custom CMS to maintain
- Markdown/MDX for portable content
- Block-based page composition

**Business Layer (D1)**

- Structured application data
- MIC integration
- Sales workspace data
- Analytics and logging
- HubSpot synchronization

---

### Consequences

Positive

- Clear separation of concerns
- No custom CMS implementation
- TinaCMS handles editorial features
- D1 reserved for business-critical data
- Each layer can evolve independently

Negative

- Two content systems to understand
- TinaCMS requires Git workflow for content
- D1 only used for non-editorial data

---

# ADR-017

## Title
TinaCMS Content Architecture
Status
Accepted

---

### Context

The website needs a content management system for editorial content.

Building a custom CMS is expensive and error-prone.

TinaCMS provides mature editorial features out of the box.

---

### Decision

Use TinaCMS for all editorial website content.

**Content stored in Git:**

```
content/
├── pages/
│   ├── home.mdx
│   ├── solutions.mdx
│   ├── industries.mdx
│   ├── pricing.mdx
│   ├── how-it-works.mdx
│   ├── academy.mdx
│   ├── about.mdx
│   ├── contact.mdx
│   ├── consultation.mdx
│   └── get-quote.mdx
├── solutions/
│   ├── revenue-intelligence.mdx
│   ├── pipeline-builder.mdx
│   ├── revenue-engine.mdx
│   ├── ai-sales-transformation.mdx
│   └── fractional-revenue-office.mdx
├── industries/
│   ├── manufacturing.mdx
│   ├── saas-technology.mdx
│   ├── banking-finance.mdx
│   ├── bpo-services.mdx
│   └── professional-services.mdx
├── navigation/
│   └── main.json
├── brand/
│   └── index.json
└── global/
    └── settings.json
```

**TinaCMS Schema:**

```
tina/
├── config.ts          # Main TinaCMS configuration
├── schemas/
│   ├── page.ts        # Generic page schema
│   ├── solution.ts    # Solution schema
│   ├── industry.ts    # Industry schema
│   ├── navigation.ts  # Navigation schema
│   └── brand.ts       # Brand configuration schema
└── components/        # Custom rich-text components
```

---

### Consequences

Positive

- Visual editing for non-technical users
- Git-based versioning (free)
- No database for editorial content
- Portable content (Markdown)
- Block-based page composition

Negative

- Content updates require Git commit
- Deployment needed for content changes (unless using Workers)

---

# ADR-018

## Title
D1 for Business Data Only
Status
Accepted

---

### Context

D1 was originally planned for all content.

With TinaCMS handling editorial content, D1 should only store business data.

---

### Decision

Reserve Cloudflare D1 for business and operational data only.

**D1 Tables (Business Data):**

```
MIC Tables:
- companies
- contacts
- deal_pipeline
- activities
- revenue_metrics

Workspace Tables:
- presentations
- proposals
- demos
- playbooks
- calculator_configs

Analytics Tables:
- page_views
- events
- conversions
- performance_metrics

User Tables:
- users
- roles
- permissions
- sessions

Integration Tables:
- hubspot_sync
- crm_data
- api_logs

Feature Flags:
- feature_flags
- flag_evaluations
```

**NOT in D1:**

- Editorial content (TinaCMS)
- Navigation (TinaCMS)
- Brand configuration (TinaCMS)
- Page content (TinaCMS)
- Solution descriptions (TinaCMS)
- Industry descriptions (TinaCMS)

---

### Consequences

Positive

- Clear data ownership
- D1 not burdened with editorial content
- TinaCMS handles content versioning
- D1 focused on business-critical data

Negative

- Two data systems to manage
- Different query patterns for different data types

---

# ADR-019

## Title
Content Loading Pattern
Status
Accepted

---

### Context

Astro pages need to load content from TinaCMS.

TinaCMS provides a local GraphQL API and data layer.

---

### Decision

Use TinaCMS data layer for content loading.

**Development Mode:**

```
Astro Dev Server
    ↓
TinaCMS Middleware
    ↓
TinaCMS Local API
    ↓
Git Files (content/*.mdx)
    ↓
Rendered HTML
```

**Production Mode:**

```
Cloudflare Workers
    ↓
TinaCMS Build Output (static)
    ↓
Git Files (content/*.mdx)
    ↓
Pre-rendered HTML
```

**Content Loading in Astro:**

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

---

### Consequences

Positive

- Content loads from Git (no database queries)
- Visual editing works in development
- Static output for production
- Type-safe content queries

Negative

- Requires TinaCMS client setup
- Content changes require rebuild for production

---

# ADR-020

## Title
Deployment Architecture
Status
Accepted

---

### Context

TinaCMS requires a server runtime for visual editing.

Cloudflare Pages (static only) does not support this.

Cloudflare Workers provides the required runtime.

---

### Decision

Deploy website to Cloudflare Workers (not static Pages).

**Deployment Flow:**

```
Git Push (content/*.mdx)
    ↓
GitHub Actions
    ↓
TinaCMS Build (generates types + content)
    ↓
Astro Build (pre-renders pages)
    ↓
Wrangler Deploy (Cloudflare Workers)
    ↓
Live Website
```

**Environment Variables:**

```
TINA_CLIENT_ID=<tina-cms-client-id>
TINA_TOKEN=<tina-cms-token>
CONTENT_REPO=<github-repo-for-content>
```

---

### Consequences

Positive

- TinaCMS visual editing works
- Dynamic content rendering possible
- Edge performance via Cloudflare

Negative

- Not purely static (Workers runtime required)
- Slightly more complex deployment than static Pages

---

# Future Decisions

Future architecture changes should be added as new ADR entries.

Examples

- ADR-021: Authentication
- ADR-022: MIC Database
- ADR-023: AI Agent Framework
- ADR-024: Billing
- ADR-025: Event Bus

---

# Decision Lifecycle

New decision

↓

Review

↓

Accepted

↓

Implemented

↓

Validated

↓

Maintained

If a decision changes

Do not overwrite history.

Create a new ADR.

Mark the previous decision as

Superseded.

---

# Final Principle

Architecture is a long-term business asset.

Every architectural decision should

- Reduce future complexity.
- Increase consistency.
- Improve maintainability.
- Protect business continuity.
- Support future platform growth.

When uncertain, prefer architectural stability over short-term convenience.
