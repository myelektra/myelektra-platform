# PAGE COMPONENT SPECIFICATIONS
# Detailed Component Interfaces for All 11 Pages

---

**Version:** 1.1
**Date:** July 30, 2026
**Status:** Draft
**Updated:** Added TinaCMS content loading examples and error states

---

## 1. TINACMS CONTENT LOADING PATTERNS

### 1.1 General Content Loading Pattern

```typescript
// apps/website/src/lib/content.ts
import { client } from '../tina/__generated__/client';

/**
 * Load page content from TinaCMS
 * @param slug - Page slug (e.g., 'home', 'solutions')
 * @returns Page content or null if not found
 */
export async function getPageContent(slug: string) {
  try {
    const result = await client.request({
      query: `query PageQuery($relativePath: String!) {
        page(relativePath: $relativePath) {
          id
          title
          description
          ogImage
          body
        }
      }`,
      variables: { relativePath: `${slug}.mdx` },
    });
    return result.data.page;
  } catch (error) {
    console.error(`Failed to load page content for ${slug}:`, error);
    return null;
  }
}

/**
 * Load solution content from TinaCMS
 * @param slug - Solution slug (e.g., 'revenue-intelligence')
 * @returns Solution content or null if not found
 */
export async function getSolutionContent(slug: string) {
  try {
    const result = await client.request({
      query: `query SolutionQuery($relativePath: String!) {
        solution(relativePath: $relativePath) {
          id
          title
          price
          description
          icon
          isPopular
          bestFor
          cta
          metaTitle
          metaDescription
          steps {
            title
            description
          }
          body
        }
      }`,
      variables: { relativePath: `${slug}.md` },
    });
    return result.data.solution;
  } catch (error) {
    console.error(`Failed to load solution for ${slug}:`, error);
    return null;
  }
}

/**
 * Load all solutions from TinaCMS
 * @returns Array of solutions or empty array
 */
export async function getAllSolutions() {
  try {
    const result = await client.request({
      query: `query AllSolutionsQuery {
        solutionList {
          edges {
            node {
              id
              title
              price
              description
              icon
              isPopular
            }
          }
        }
      }`,
    });
    return result.data.solutionList.edges.map((edge: any) => edge.node);
  } catch (error) {
    console.error('Failed to load solutions:', error);
    return [];
  }
}

/**
 * Load industry content from TinaCMS
 * @param slug - Industry slug (e.g., 'manufacturing')
 * @returns Industry content or null if not found
 */
export async function getIndustryContent(slug: string) {
  try {
    const result = await client.request({
      query: `query IndustryQuery($relativePath: String!) {
        industry(relativePath: $relativePath) {
          id
          title
          description
          icon
          metaTitle
          metaDescription
          personas {
            name
            description
          }
          body
        }
      }`,
      variables: { relativePath: `${slug}.md` },
    });
    return result.data.industry;
  } catch (error) {
    console.error(`Failed to load industry for ${slug}:`, error);
    return null;
  }
}

/**
 * Load navigation from TinaCMS
 * @returns Navigation data or default navigation
 */
export async function getNavigation() {
  try {
    const result = await client.request({
      query: `query NavigationQuery {
        navigation(relativePath: "main.json") {
          desktop {
            label
            path
            submenu {
              label
              path
            }
          }
          headerCta
          headerCtaPath
          hideFromNav
        }
      }`,
    });
    return result.data.navigation;
  } catch (error) {
    console.error('Failed to load navigation:', error);
    return getDefaultNavigation();
  }
}

/**
 * Load brand configuration from TinaCMS
 * @returns Brand data or default brand
 */
export async function getBrand() {
  try {
    const result = await client.request({
      query: `query BrandQuery {
        brand(relativePath: "index.json") {
          company
          domain
          tagline
          subTagline
          positioning
          phone
          email
          address {
            line1
            line2
            country
          }
          hours
          social {
            linkedin
            instagram
          }
          founder {
            name
            title
            photo
            linkedin
            instagram
          }
          logo {
            file
          }
        }
      }`,
    });
    return result.data.brand;
  } catch (error) {
    console.error('Failed to load brand:', error);
    return getDefaultBrand();
  }
}

/**
 * Load global settings from TinaCMS
 * @returns Global settings or defaults
 */
export async function getGlobalSettings() {
  try {
    const result = await client.request({
      query: `query GlobalQuery {
        global(relativePath: "settings.json") {
          floatingCta {
            text
            buttonLabel
            buttonPath
            showAfterScrollPx
          }
          backToTop {
            showAfterScrollPx
          }
          cookieBanner {
            text
            acceptLabel
            learnMoreLabel
          }
          scrollAnimation {
            enabled
          }
          disclaimer
        }
      }`,
    });
    return result.data.global;
  } catch (error) {
    console.error('Failed to load global settings:', error);
    return getDefaultGlobalSettings();
  }
}
```

### 1.2 Default Content Fallbacks

```typescript
// apps/website/src/lib/defaults.ts

/**
 * Default navigation when TinaCMS content is unavailable
 */
export function getDefaultNavigation() {
  return {
    desktop: [
      { label: 'Home', path: '/' },
      {
        label: 'Solutions',
        path: '/solutions',
        submenu: [
          { label: 'Revenue Intelligence', path: '/solutions/revenue-intelligence' },
          { label: 'Pipeline Builder', path: '/solutions/pipeline-builder' },
          { label: 'Revenue Engine', path: '/solutions/revenue-engine' },
          { label: 'AI Sales Transformation', path: '/solutions/ai-sales-transformation' },
          { label: 'Fractional Revenue Office', path: '/solutions/fractional-revenue-office' },
        ],
      },
      { label: 'Industries', path: '/industries' },
      { label: 'Pricing', path: '/pricing' },
      { label: 'Academy', path: '/academy' },
      { label: 'About', path: '/about' },
      {
        label: 'Contact Us',
        path: '/contact',
        submenu: [
          { label: 'Get Quote Here', path: '/get-quote-here-new' },
          { label: 'Book Online Meeting', path: '/consultation' },
        ],
      },
    ],
    headerCta: 'Book an Online Meeting',
    headerCtaPath: '/consultation',
    hideFromNav: ['How It Works'],
  };
}

/**
 * Default brand configuration when TinaCMS content is unavailable
 */
export function getDefaultBrand() {
  return {
    company: 'PT. Myelektra Solusi Indonesia',
    domain: 'myelektra.com',
    tagline: 'We Build Revenue Systems, Not Just Lead Lists.',
    subTagline: 'From Buyer Persona to Revenue Pipeline.',
    positioning: 'Your Revenue Growth Partner',
    phone: '+62 21 29636761',
    email: '',
    address: {
      line1: '38th Floor, 88 Office',
      line2: 'Kota Kasablanka, South Jakarta',
      country: 'Indonesia',
    },
    hours: 'Weekdays / 9:00 – 18:00',
    social: {
      linkedin: 'https://www.linkedin.com/company/3560717',
      instagram: 'https://www.instagram.com/myelektra/',
    },
    founder: {
      name: 'Dian Satya, S.E.',
      title: 'Founder & CEO Myelektra.com',
      photo: '',
      linkedin: 'https://www.linkedin.com/in/diansatya/',
      instagram: 'https://www.instagram.com/dian_satyaa/',
    },
    logo: {
      file: '/logo-myelektra.png',
    },
  };
}

/**
 * Default global settings when TinaCMS content is unavailable
 */
export function getDefaultGlobalSettings() {
  return {
    floatingCta: {
      text: 'Ready to build your revenue system?',
      buttonLabel: 'Book an Online Meeting',
      buttonPath: '/consultation',
      showAfterScrollPx: 600,
    },
    backToTop: {
      showAfterScrollPx: 500,
    },
    cookieBanner: {
      text: 'We use cookies to improve your experience. By continuing to use this site, you agree to our privacy policy.',
      acceptLabel: 'Accept',
      learnMoreLabel: 'Learn More',
    },
    scrollAnimation: {
      enabled: true,
    },
    disclaimer: 'Meetings and revenue outcomes are not guaranteed. Results depend on market conditions, offer relevance, buyer readiness, domain reputation, and the client\'s sales process.',
  };
}
```

### 1.3 Error and Loading States

```typescript
// apps/website/src/lib/types.ts

/**
 * Content loading state
 */
export type ContentState<T> =
  | { status: 'loading'; data: null }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string; data: null };

/**
 * Page content with metadata
 */
export interface PageContent {
  id: string;
  title: string;
  description?: string;
  ogImage?: string;
  body: any; // TinaCMS rich-text body
}

/**
 * Solution content
 */
export interface SolutionContent {
  id: string;
  title: string;
  price: string;
  description: string;
  icon: string;
  isPopular?: boolean;
  bestFor: string;
  cta: string;
  metaTitle?: string;
  metaDescription?: string;
  steps?: Array<{
    title: string;
    description: string;
  }>;
  body: any;
}

/**
 * Industry content
 */
export interface IndustryContent {
  id: string;
  title: string;
  description: string;
  icon: string;
  metaTitle?: string;
  metaDescription?: string;
  personas: Array<{
    name: string;
    description?: string;
  }>;
  body: any;
}

/**
 * Navigation content
 */
export interface NavigationContent {
  desktop: Array<{
    label: string;
    path: string;
    submenu?: Array<{
      label: string;
      path: string;
    }>;
  }>;
  headerCta: string;
  headerCtaPath: string;
  hideFromNav?: string[];
}

/**
 * Brand content
 */
export interface BrandContent {
  company: string;
  domain: string;
  tagline: string;
  subTagline: string;
  positioning: string;
  phone: string;
  email: string;
  address: {
    line1: string;
    line2: string;
    country: string;
  };
  hours: string;
  social: {
    linkedin: string;
    instagram: string;
  };
  founder: {
    name: string;
    title: string;
    photo: string;
    linkedin: string;
    instagram: string;
  };
  logo: {
    file: string;
  };
}

/**
 * Global settings content
 */
export interface GlobalSettingsContent {
  floatingCta: {
    text: string;
    buttonLabel: string;
    buttonPath: string;
    showAfterScrollPx: number;
  };
  backToTop: {
    showAfterScrollPx: number;
  };
  cookieBanner: {
    text: string;
    acceptLabel: string;
    learnMoreLabel: string;
  };
  scrollAnimation: {
    enabled: boolean;
  };
  disclaimer: string;
}
```

---

## 2. HOME PAGE (`/`)

### 2.1 Page Props Interface

```typescript
// apps/website/src/pages/home/index.astro
interface HomePageProps {
  hero: HeroSectionProps;
  clientLogos: ClientLogosSectionProps;
  journey: JourneySectionProps;
  achievements: AchievementsSectionProps;
  solutionsOverview: SolutionsOverviewSectionProps;
  countryTargeting: CountryTargetingSectionProps;
  industries: IndustriesSectionProps;
  whyMyelektra: WhyMyelektraSectionProps;
  academyTeaser: AcademyTeaserSectionProps;
  finalCta: FinalCtaSectionProps;
}
```

### 2.2 Content Loading Example

```astro
---
// apps/website/src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import Home from '../components/home/Home.astro';
import { getPageContent, getAllSolutions, getAllIndustries, getCountries } from '../lib/content';

// Load content from TinaCMS
const pageContent = await getPageContent('home');
const solutions = await getAllSolutions();
const industries = await getAllIndustries();
const countries = await getCountries();

// Handle missing content
if (!pageContent) {
  return Astro.redirect('/404');
}
---

<BaseLayout
  title={pageContent.title || 'Myelektra - Revenue Growth Partner'}
  description={pageContent.description}
  ogImage={pageContent.ogImage}
>
  <Home
    content={pageContent}
    solutions={solutions}
    industries={industries}
    countries={countries}
  />
</BaseLayout>
```

### 2.3 Error State Handling

```astro
---
// apps/website/src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import Home from '../components/home/Home.astro';
import ErrorFallback from '../components/shared/ErrorFallback.astro';
import { getPageContent, getAllSolutions, getAllIndustries, getCountries } from '../lib/content';

// Load content with error handling
let pageContent, solutions, industries, countries;
let error = null;

try {
  [pageContent, solutions, industries, countries] = await Promise.all([
    getPageContent('home'),
    getAllSolutions(),
    getAllIndustries(),
    getCountries(),
  ]);
} catch (e) {
  error = e.message;
  console.error('Failed to load home page content:', e);
}

// Redirect to 404 if critical content is missing
if (!pageContent) {
  return Astro.redirect('/404');
}
---

<BaseLayout
  title={pageContent?.title || 'Myelektra - Revenue Growth Partner'}
  description={pageContent?.description}
>
  {error ? (
    <ErrorFallback
      message="We're having trouble loading the page content. Please try again later."
      retryUrl="/"
    />
  ) : (
    <Home
      content={pageContent!}
      solutions={solutions || []}
      industries={industries || []}
      countries={countries || []}
    />
  )}
</BaseLayout>
```

---

## 3. SOLUTIONS PAGE (`/solutions`)

### 3.1 Content Loading Example

```astro
---
// apps/website/src/pages/solutions/index.astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import SolutionsPage from '../../components/solutions/SolutionsPage.astro';
import { getPageContent, getAllSolutions } from '../../lib/content';

// Load content from TinaCMS
const pageContent = await getPageContent('solutions');
const solutions = await getAllSolutions();

if (!pageContent) {
  return Astro.redirect('/404');
}
---

<BaseLayout
  title={pageContent.title || 'Solutions | Myelektra'}
  description={pageContent.description}
>
  <SolutionsPage
    hero={pageContent.hero}
    solutions={solutions}
    cta={pageContent.cta}
  />
</BaseLayout>
```

---

## 4. SOLUTION DETAIL PAGE (`/solutions/:id`)

### 4.1 Content Loading Example

```astro
---
// apps/website/src/pages/solutions/[id].astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import SolutionDetail from '../../components/solutions/SolutionDetail.astro';
import { getSolutionContent, getAllSolutions } from '../../lib/content';

// Get solution slug from URL
const { id } = Astro.params;

// Load solution content from TinaCMS
const solution = await getSolutionContent(id as string);
const allSolutions = await getAllSolutions();

// Handle missing solution
if (!solution) {
  return Astro.redirect('/404');
}

// Get related solutions (exclude current)
const relatedSolutions = allSolutions
  .filter((s) => s.id !== id)
  .slice(0, 3);
---

<BaseLayout
  title={solution.metaTitle || `${solution.title} | Myelektra`}
  description={solution.metaDescription}
>
  <SolutionDetail
    solution={solution}
    relatedSolutions={relatedSolutions}
  />
</BaseLayout>
```

---

## 5. INDUSTRIES PAGE (`/industries`)

### 5.1 Content Loading Example

```astro
---
// apps/website/src/pages/industries/index.astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import IndustriesPage from '../../components/industries/IndustriesPage.astro';
import { getPageContent, getAllIndustries } from '../../lib/content';

// Load content from TinaCMS
const pageContent = await getPageContent('industries');
const industries = await getAllIndustries();

if (!pageContent) {
  return Astro.redirect('/404');
}
---

<BaseLayout
  title={pageContent.title || 'Industries | Myelektra'}
  description={pageContent.description}
>
  <IndustriesPage
    hero={pageContent.hero}
    industries={industries}
    cta={pageContent.cta}
  />
</BaseLayout>
```

---

## 6. PRICING PAGE (`/pricing`)

### 6.1 Content Loading Example

```astro
---
// apps/website/src/pages/pricing/index.astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import PricingPage from '../../components/pricing/PricingPage.astro';
import { getPageContent, getAllSolutions, getGlobalSettings } from '../../lib/content';

// Load content from TinaCMS
const pageContent = await getPageContent('pricing');
const solutions = await getAllSolutions();
const globalSettings = await getGlobalSettings();

if (!pageContent) {
  return Astro.redirect('/404');
}
---

<BaseLayout
  title={pageContent.title || 'Pricing | Myelektra'}
  description={pageContent.description}
>
  <PricingPage
    hero={pageContent.hero}
    solutions={solutions}
    comparison={pageContent.comparison}
    disclaimer={globalSettings.disclaimer}
    cta={pageContent.cta}
  />
</BaseLayout>
```

---

## 7. HOW IT WORKS PAGE (`/how-it-works`)

### 7.1 Content Loading Example

```astro
---
// apps/website/src/pages/how-it-works/index.astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import HowItWorksPage from '../../components/how-it-works/HowItWorksPage.astro';
import { getPageContent } from '../../lib/content';

// Load content from TinaCMS
const pageContent = await getPageContent('how-it-works');

if (!pageContent) {
  return Astro.redirect('/404');
}
---

<BaseLayout
  title={pageContent.title || 'How It Works | Myelektra'}
  description={pageContent.description}
>
  <HowItWorksPage
    hero={pageContent.hero}
    steps={pageContent.steps}
    summary={pageContent.summary}
    cta={pageContent.cta}
  />
</BaseLayout>
```

---

## 8. ACADEMY PAGE (`/academy`)

### 8.1 Content Loading Example

```astro
---
// apps/website/src/pages/academy/index.astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import AcademyPage from '../../components/academy/AcademyPage.astro';
import { getPageContent } from '../../lib/content';

// Load content from TinaCMS
const pageContent = await getPageContent('academy');

if (!pageContent) {
  return Astro.redirect('/404');
}
---

<BaseLayout
  title={pageContent.title || 'Academy | Myelektra'}
  description={pageContent.description}
>
  <AcademyPage
    hero={pageContent.hero}
    topics={pageContent.topics}
    pricing={pageContent.pricing}
    cta={pageContent.cta}
  />
</BaseLayout>
```

---

## 9. ABOUT PAGE (`/about`)

### 9.1 Content Loading Example

```astro
---
// apps/website/src/pages/about/index.astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import AboutPage from '../../components/about/AboutPage.astro';
import { getPageContent } from '../../lib/content';

// Load content from TinaCMS
const pageContent = await getPageContent('about');

if (!pageContent) {
  return Astro.redirect('/404');
}
---

<BaseLayout
  title={pageContent.title || 'About | Myelektra'}
  description={pageContent.description}
>
  <AboutPage
    hero={pageContent.hero}
    story={pageContent.story}
    stats={pageContent.stats}
    mission={pageContent.mission}
    cta={pageContent.cta}
  />
</BaseLayout>
```

---

## 10. CONTACT PAGE (`/contact`)

### 10.1 Content Loading Example

```astro
---
// apps/website/src/pages/contact/index.astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import ContactPage from '../../components/contact/ContactPage.astro';
import { getPageContent, getBrand } from '../../lib/content';

// Load content from TinaCMS
const pageContent = await getPageContent('contact');
const brand = await getBrand();

if (!pageContent) {
  return Astro.redirect('/404');
}
---

<BaseLayout
  title={pageContent.title || 'Contact | Myelektra'}
  description={pageContent.description}
>
  <ContactPage
    hero={pageContent.hero}
    office={brand.address}
    contactInfo={{
      headline: pageContent.contactInfoHeadline,
      phone: brand.phone,
      email: brand.email,
    }}
    hours={{
      headline: pageContent.hoursHeadline,
      hours: brand.hours,
    }}
    ctaButtons={pageContent.ctaButtons}
  />
</BaseLayout>
```

---

## 11. GET QUOTE PAGE (`/get-quote-here-new`)

### 11.1 Content Loading Example

```astro
---
// apps/website/src/pages/get-quote-here-new/index.astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import GetQuotePage from '../../components/get-quote/GetQuotePage.astro';
import { getPageContent } from '../../lib/content';

// Load content from TinaCMS
const pageContent = await getPageContent('get-quote');

if (!pageContent) {
  return Astro.redirect('/404');
}
---

<BaseLayout
  title={pageContent.title || 'Get a Quote | Myelektra'}
  description={pageContent.description}
>
  <GetQuotePage
    hero={pageContent.hero}
    form={pageContent.form}
    sidebar={pageContent.sidebar}
    cta={pageContent.cta}
  />
</BaseLayout>
```

---

## 12. CONSULTATION PAGE (`/consultation`)

### 12.1 Content Loading Example

```astro
---
// apps/website/src/pages/consultation/index.astro
import BaseLayout from '../../layouts/BaseLayout.astro';
import ConsultationPage from '../../components/consultation/ConsultationPage.astro';
import { getPageContent } from '../../lib/content';

// Load content from TinaCMS
const pageContent = await getPageContent('consultation');

if (!pageContent) {
  return Astro.redirect('/404');
}
---

<BaseLayout
  title={pageContent.title || 'Book a Meeting | Myelektra'}
  description={pageContent.description}
>
  <ConsultationPage
    hero={pageContent.hero}
    schedule={pageContent.schedule}
    hubspot={pageContent.hubspot}
    sidebar={pageContent.sidebar}
  />
</BaseLayout>
```

---

## 13. ERROR STATES AND FALLBACKS

### 13.1 Error Fallback Component

```astro
---
// apps/website/src/components/shared/ErrorFallback.astro
interface Props {
  message?: string;
  retryUrl?: string;
}

const {
  message = 'Something went wrong. Please try again later.',
  retryUrl = '/',
} = Astro.props;
---

<div class="min-h-[400px] flex items-center justify-center">
  <div class="text-center max-w-md mx-auto px-4">
    <div class="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
      <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    </div>
    <h2 class="text-xl font-semibold text-gray-900 mb-2">Content Unavailable</h2>
    <p class="text-gray-600 mb-6">{message}</p>
    <a
      href={retryUrl}
      class="inline-flex items-center px-4 py-2 bg-teal text-white font-medium rounded-lg hover:bg-teal-hover transition-colors"
    >
      Try Again
    </a>
  </div>
</div>
```

### 13.2 Loading State Component

```astro
---
// apps/website/src/components/shared/LoadingState.astro
interface Props {
  message?: string;
}

const { message = 'Loading content...' } = Astro.props;
---

<div class="min-h-[400px] flex items-center justify-center">
  <div class="text-center">
    <div class="w-12 h-12 mx-auto mb-4 border-4 border-teal/30 border-t-teal rounded-full animate-spin"></div>
    <p class="text-gray-600">{message}</p>
  </div>
</div>
```

### 13.3 404 Page

```astro
---
// apps/website/src/pages/404.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Page Not Found | Myelektra">
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center max-w-md mx-auto px-4">
      <h1 class="text-6xl font-bold text-teal mb-4">404</h1>
      <h2 class="text-2xl font-semibold text-gray-900 mb-4">Page Not Found</h2>
      <p class="text-gray-600 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        class="inline-flex items-center px-6 py-3 bg-teal text-white font-semibold rounded-lg hover:bg-teal-hover transition-colors"
      >
        Go Home
      </a>
    </div>
  </div>
</BaseLayout>
```

---

## 14. CONTENT LOADING BEST PRACTICES

### 14.1 Parallel Loading

```typescript
// Load multiple content items in parallel
const [solutions, industries, countries] = await Promise.all([
  getAllSolutions(),
  getAllIndustries(),
  getCountries(),
]);
```

### 14.2 Error Boundaries

```typescript
// Wrap content loading in try-catch
try {
  const content = await getPageContent('home');
  if (!content) {
    return Astro.redirect('/404');
  }
} catch (error) {
  console.error('Content loading failed:', error);
  // Show error fallback or redirect
}
```

### 14.3 Caching Strategy

```typescript
// Cache content in development
if (import.meta.env.DEV) {
  // Disable caching in development
} else {
  // Enable caching in production via Cloudflare KV
}
```

---

## END OF SPECIFICATION
