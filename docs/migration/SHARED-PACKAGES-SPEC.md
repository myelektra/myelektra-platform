# SHARED PACKAGES SPECIFICATION
# packages/ui, packages/types, packages/utils

---

**Version:** 1.0
**Date:** July 30, 2026
**Status:** Draft

---

## 1. PACKAGES/TYPES — SHARED TYPE DEFINITIONS

### 1.1 Core Domain Types

```typescript
// packages/types/src/solution.ts

/**
 * Solution tier offered by Myelektra
 * Maps to: content-config.json → solutions[]
 */
export interface Solution {
  /** Unique identifier (e.g., "revenue-intelligence") */
  id: string;
  
  /** Display name (e.g., "Bronze (Revenue Intelligence)") */
  name: string;
  
  /** Price display text (e.g., "[Book Meeting for Pricing] per project") */
  price: string;
  
  /** Short description of the solution */
  description: string;
  
  /** List of included features */
  features: string[];
  
  /** Target audience description */
  bestFor: string;
  
  /** CTA button text */
  cta: string;
  
  /** Icon identifier (maps to solutionIconMap) */
  icon: SolutionIcon;
  
  /** Whether this is the most popular solution */
  isPopular?: boolean;
  
  /** Implementation steps (optional) */
  steps?: SolutionStep[];
}

/**
 * Implementation step within a solution
 */
export interface SolutionStep {
  /** Step title (e.g., "Discover") */
  title: string;
  
  /** Step description */
  description: string;
}

/**
 * Available solution tier icons
 */
export type SolutionIcon = 
  | 'bronze' 
  | 'silver' 
  | 'gold' 
  | 'platinum' 
  | 'diamond';
```

```typescript
// packages/types/src/industry.ts

/**
 * Industry served by Myelektra
 * Maps to: content-config.json → industries[]
 */
export interface Industry {
  /** Unique identifier (e.g., "manufacturing") */
  id: string;
  
  /** Display name (e.g., "Manufacturing") */
  name: string;
  
  /** Industry description */
  description: string;
  
  /** List of buyer personas in this industry */
  personas: string[];
  
  /** Icon identifier (maps to industryIconMap) */
  icon: IndustryIcon;
}

/**
 * Available industry icons
 */
export type IndustryIcon = 
  | 'manufacturing' 
  | 'saas' 
  | 'banking' 
  | 'bpo' 
  | 'consulting';
```

```typescript
// packages/types/src/country.ts

/**
 * Target country/region for campaigns
 * Maps to: content-config.json → countries[]
 */
export interface Country {
  /** Country name (e.g., "Indonesia") */
  name: string;
  
  /** CSS class for flag accent styling */
  flagAccent: string;
  
  /** Recommended buyer personas for this country */
  personas: string[];
}
```

```typescript
// packages/types/src/process.ts

/**
 * Process step for "How It Works" section
 * Maps to: content-config.json → howItWorks.steps[]
 */
export interface ProcessStep {
  /** Step number (1-8) */
  number: number;
  
  /** Step title (e.g., "Discover") */
  title: string;
  
  /** Step description */
  description: string;
  
  /** Expected output from this step */
  output: string;
}
```

### 1.2 Navigation Types

```typescript
// packages/types/src/navigation.ts

/**
 * Navigation link with optional submenu
 */
export interface NavLink {
  /** Display label */
  label: string;
  
  /** Route path */
  path: string;
  
  /** Optional submenu items */
  submenu?: NavLink[];
  
  /** Whether to highlight this link */
  highlight?: boolean;
}

/**
 * Desktop navigation configuration
 */
export interface NavigationConfig {
  /** Main navigation links */
  desktop: NavLink[];
  
  /** Header CTA button text */
  headerCta: string;
  
  /** Header CTA button path */
  headerCtaPath: string;
  
  /** Routes to hide from navigation */
  hideFromNav?: string[];
}

/**
 * Footer column configuration
 */
export interface FooterColumn {
  /** Column title */
  title: string;
  
  /** Column type identifier */
  type: 'brand' | 'solutions' | 'company' | 'contact';
  
  /** Column links */
  links: NavLink[];
}

/**
 * Footer configuration
 */
export interface FooterConfig {
  /** Footer columns */
  columns: FooterColumn[];
  
  /** Copyright text template (use {year} for current year) */
  copyright: string;
}
```

### 1.3 Page Content Types

```typescript
// packages/types/src/page.ts

/**
 * CTA (Call to Action) configuration
 */
export interface CTAConfig {
  /** Button label text */
  label: string;
  
  /** Button path/URL */
  path: string;
}

/**
 * Hero section configuration
 */
export interface HeroConfig {
  /** Hero headline */
  headline: string;
  
  /** Hero subtitle */
  subtitle: string;
  
  /** Optional badge text */
  badge?: string;
  
  /** Optional highlighted text within headline */
  headlineHighlight?: string;
  
  /** Primary CTA */
  ctaPrimary?: CTAConfig;
  
  /** Secondary CTA */
  ctaSecondary?: CTAConfig;
}

/**
 * Page section with headline and content
 */
export interface PageSection {
  /** Section headline */
  headline: string;
  
  /** Section subheadline (optional) */
  subheadline?: string;
  
  /** Section body text (optional) */
  body?: string;
  
  /** CTA configuration (optional) */
  cta?: CTAConfig;
}

/**
 * Home page configuration
 */
export interface HomePageConfig {
  hero: HeroConfig;
  journey: {
    sectionLabel: string;
    headline: string;
    intro: string;
    cards: JourneyCard[];
  };
  achievements: {
    headline: string;
    items: AchievementItem[];
  };
  solutionsOverview: PageSection;
  countryTargeting: {
    headline: string;
    intro: string;
    maxContactsNote: string;
    personasLabel: string;
    disclaimer: string;
  };
  industriesSection: PageSection;
  experience: PageSection;
  whyMyelektraSection: PageSection;
  academyTeaser: AcademyTeaserConfig;
  finalCta: FinalCtaConfig;
}

/**
 * Journey card on homepage
 */
export interface JourneyCard {
  /** Icon identifier */
  icon: string;
  
  /** Card title */
  title: string;
  
  /** Card description */
  description: string;
}

/**
 * Achievement item on homepage
 */
export interface AchievementItem {
  /** Icon identifier */
  icon: string;
  
  /** Item title */
  title: string;
  
  /** Item description */
  description: string;
}

/**
 * Academy teaser section on homepage
 */
export interface AcademyTeaserConfig {
  headline: string;
  subheadline: string;
  description: string;
  ctaLabel: string;
  ctaPath: string;
  pricing: {
    publicClasses: PricingTier;
    corporateTraining: PricingTier;
  };
}

/**
 * Pricing tier display
 */
export interface PricingTier {
  price: string;
  per: string;
  badgeLabel: string;
}

/**
 * Final CTA section on homepage
 */
export interface FinalCtaConfig {
  headline: string;
  body: string;
  subheadline: string;
  subbody: string;
  ctaLabel: string;
  ctaPath: string;
}

/**
 * Solutions page configuration
 */
export interface SolutionsPageConfig {
  hero: HeroConfig;
  includedLabel: string;
  popularBadge: string;
  cta: PageSection;
}

/**
 * Solution detail page configuration
 */
export interface SolutionDetailPageConfig {
  breadcrumb: {
    home: string;
    solutions: string;
  };
  includedHeadline: string;
  bestForHeadline: string;
  howItWorksHeadline: string;
  ctaPrefix: string;
  ctaSuffix: string;
  ctaBody: string;
  relatedSolutionsHeadline: string;
  notFoundMessage: string;
  notFoundBackLink: string;
}

/**
 * Industries page configuration
 */
export interface IndustriesPageConfig {
  hero: HeroConfig;
  personasHeadline: string;
  cta: PageSection;
}

/**
 * Pricing page configuration
 */
export interface PricingPageConfig {
  hero: HeroConfig;
  popularBadge: string;
  comparisonHeadline: string;
  cta: PageSection;
  comparisonFeatures: ComparisonFeature[];
}

/**
 * Comparison feature in pricing table
 */
export interface ComparisonFeature {
  feature: string;
  mapping: string[]; // Array of solution IDs that include this feature
}

/**
 * How It Works page configuration
 */
export interface HowItWorksPageConfig {
  hero: HeroConfig;
  summaryHeadline: string;
  outputLabel: string;
  cta: PageSection;
  steps: ProcessStep[];
}

/**
 * Academy page configuration
 */
export interface AcademyPageConfig {
  hero: HeroConfig;
  topicsHeadline: string;
  topicsSubtitle: string;
  pricingHeadline: string;
  topics: string[];
  publicClasses: AcademyPricingTier;
  corporateTraining: AcademyPricingTier;
  cta: PageSection;
}

/**
 * Academy pricing tier
 */
export interface AcademyPricingTier {
  name: string;
  price: string;
  priceDetail: string;
  features: string[];
  cta: string;
  ctaPath: string;
  badge?: string;
}

/**
 * About page configuration
 */
export interface AboutPageConfig {
  hero: HeroConfig;
  story: {
    label: string;
    headline: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
  };
  stats: StatItem[];
  mission: {
    label: string;
    headline: string;
    body: string;
  };
  cta: PageSection;
}

/**
 * Stat item for about page
 */
export interface StatItem {
  value: string;
  label: string;
}

/**
 * Contact page configuration
 */
export interface ContactPageConfig {
  hero: HeroConfig;
  officeHeadline: string;
  contactInfoHeadline: string;
  hoursHeadline: string;
  ctaButtons: CTAConfig[];
}

/**
 * Consultation page configuration
 */
export interface ConsultationPageConfig {
  hero: HeroConfig;
  scheduleHeadline: string;
  scheduleSubtitle: string;
  hubspot: {
    meetingsUrl: string;
  };
  sidebarWhatToExpect: {
    headline: string;
    items: SidebarItem[];
  };
  sidebarQuickLinks: {
    headline: string;
  };
}

/**
 * Sidebar item with icon
 */
export interface SidebarItem {
  icon: string;
  title: string;
  description: string;
}

/**
 * Get Quote page configuration
 */
export interface GetQuotePageConfig {
  hero: HeroConfig;
  formHeadline: string;
  formSubtitle: string;
  hubspot: {
    portalId: number;
    formId: string;
  };
  sidebar: {
    headline: string;
    items: string[];
  };
  cta: PageSection;
}
```

### 1.4 Brand & Global Types

```typescript
// packages/types/src/brand.ts

/**
 * Company address
 */
export interface Address {
  line1: string;
  line2: string;
  country: string;
}

/**
 * Social media links
 */
export interface SocialLinks {
  linkedin: string;
  instagram: string;
}

/**
 * Founder information
 */
export interface Founder {
  name: string;
  title: string;
  photo: string;
  linkedin: string;
  instagram: string;
}

/**
 * Logo configuration
 */
export interface LogoConfig {
  catboxUrl: string;
  localFile: string;
  localFileWeebly: string;
}

/**
 * Brand configuration
 * Maps to: content-config.json → brand
 */
export interface BrandConfig {
  company: string;
  domain: string;
  tagline: string;
  subTagline: string;
  positioning: string;
  phone: string;
  email: string;
  address: Address;
  hours: string;
  social: SocialLinks;
  founder: Founder;
  logo: LogoConfig;
}

/**
 * Floating CTA configuration
 */
export interface FloatingCtaConfig {
  text: string;
  buttonLabel: string;
  buttonPath: string;
  showAfterScrollPx: number;
}

/**
 * Back to top configuration
 */
export interface BackToTopConfig {
  showAfterScrollPx: number;
}

/**
 * Cookie banner configuration
 */
export interface CookieBannerConfig {
  text: string;
  acceptLabel: string;
  learnMoreLabel: string;
}

/**
 * Scroll animation configuration
 */
export interface ScrollAnimationConfig {
  enabled: boolean;
}

/**
 * Global configuration
 * Maps to: content-config.json → global
 */
export interface GlobalConfig {
  floatingCta: FloatingCtaConfig;
  backToTop: BackToTopConfig;
  cookieBanner: CookieBannerConfig;
  scrollAnimation: ScrollAnimationConfig;
}

/**
 * Client logo
 */
export interface ClientLogo {
  src: string;
  alt: string;
}

/**
 * Why Myelektra item
 */
export interface WhyMyelektraItem {
  icon: string;
  title: string;
  description: string;
}
```

### 1.5 Component Props Types

```typescript
// packages/types/src/components.ts

/**
 * Base props for all UI components
 */
export interface BaseComponentProps {
  /** Additional CSS classes */
  className?: string;
  
  /** Unique identifier */
  id?: string;
  
  /** Test identifier for testing */
  testId?: string;
}

/**
 * Icon component props
 */
export interface IconProps extends BaseComponentProps {
  /** Icon size in pixels */
  size?: number;
}

/**
 * Button variants
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';

/**
 * Button sizes
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button component props
 */
export interface ButtonProps extends BaseComponentProps {
  /** Button variant */
  variant?: ButtonVariant;
  
  /** Button size */
  size?: ButtonSize;
  
  /** Button label text */
  children: string;
  
  /** Click handler */
  onClick?: () => void;
  
  /** Link URL (renders as anchor) */
  href?: string;
  
  /** Whether button is disabled */
  disabled?: boolean;
  
  /** Whether button is loading */
  loading?: boolean;
  
  /** Icon to show before label */
  icon?: React.ReactNode;
  
  /** Icon to show after label */
  iconRight?: React.ReactNode;
}

/**
 * Card component props
 */
export interface CardProps extends BaseComponentProps {
  /** Card content */
  children: React.ReactNode;
  
  /** Card variant */
  variant?: 'default' | 'dark' | 'gradient';
  
  /** Whether card has hover effect */
  hover?: boolean;
  
  /** Whether card is featured */
  featured?: boolean;
}

/**
 * Badge component props
 */
export interface BadgeProps extends BaseComponentProps {
  /** Badge label */
  children: string;
  
  /** Badge variant */
  variant?: 'default' | 'popular' | 'success' | 'warning';
}

/**
 * Section component props
 */
export interface SectionProps extends BaseComponentProps {
  /** Section content */
  children: React.ReactNode;
  
  /** Section background variant */
  variant?: 'white' | 'light' | 'dark' | 'gradient';
  
  /** Whether section has padding */
  padded?: boolean;
  
  /** Whether section is contained */
  contained?: boolean;
}

/**
 * Container component props
 */
export interface ContainerProps extends BaseComponentProps {
  /** Container content */
  children: React.ReactNode;
  
  /** Maximum width */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

/**
 * Heading levels
 */
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/**
 * Heading component props
 */
export interface HeadingProps extends BaseComponentProps {
  /** Heading level */
  as?: HeadingLevel;
  
  /** Heading text */
  children: string;
  
  /** Heading size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  
  /** Text color */
  color?: 'primary' | 'secondary' | 'white' | 'teal';
}

/**
 * Text component props
 */
export interface TextProps extends BaseComponentProps {
  /** Text content */
  children: string | React.ReactNode;
  
  /** Text size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /** Text color */
  color?: 'primary' | 'secondary' | 'white' | 'muted';
  
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
}

/**
 * Link component props
 */
export interface LinkProps extends BaseComponentProps {
  /** Link text */
  children: string | React.ReactNode;
  
  /** Link URL */
  href: string;
  
  /** Whether link opens in new tab */
  external?: boolean;
  
  /** Link variant */
  variant?: 'default' | 'nav' | 'footer' | 'cta';
}

/**
 * Grid columns
 */
export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * Grid component props
 */
export interface GridProps extends BaseComponentProps {
  /** Grid content */
  children: React.ReactNode;
  
  /** Number of columns */
  columns?: GridColumns;
  
  /** Gap size */
  gap?: 'sm' | 'md' | 'lg';
  
  /** Responsive breakpoint behavior */
  responsive?: {
    sm?: GridColumns;
    md?: GridColumns;
    lg?: GridColumns;
  };
}

/**
 * Price display component props
 */
export interface PriceDisplayProps extends BaseComponentProps {
  /** Price text to display */
  price: string;
  
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
}

/**
 * Icon mapper type
 */
export type IconMap = Record<string, React.FC<IconProps>>;
```

### 1.6 Content Configuration Type

```typescript
// packages/types/src/content-config.ts

import type { BrandConfig } from './brand';
import type { NavigationConfig, FooterConfig } from './navigation';
import type { GlobalConfig } from './brand';
import type { 
  HomePageConfig,
  SolutionsPageConfig,
  SolutionDetailPageConfig,
  IndustriesPageConfig,
  HowItWorksPageConfig,
  PricingPageConfig,
  AcademyPageConfig,
  AboutPageConfig,
  ContactPageConfig,
  ConsultationPageConfig,
  GetQuotePageConfig 
} from './page';
import type { Solution } from './solution';
import type { Industry } from './industry';
import type { Country } from './country';
import type { WhyMyelektraItem, ClientLogo } from './brand';

/**
 * Root content configuration matching content-config.json structure
 * This is the master type for all website content
 */
export interface ContentConfig {
  /** Brand information */
  brand: BrandConfig;
  
  /** Navigation configuration */
  navigation: NavigationConfig;
  
  /** Global settings */
  global: GlobalConfig;
  
  /** Home page content */
  homepage: HomePageConfig;
  
  /** Solutions data */
  solutions: Solution[];
  
  /** Solutions page content */
  solutionsPage: SolutionsPageConfig;
  
  /** Solution detail page content */
  solutionDetailPage: SolutionDetailPageConfig;
  
  /** Industries data */
  industries: Industry[];
  
  /** Industries page content */
  industriesPage: IndustriesPageConfig;
  
  /** How It Works page content */
  howItWorks: HowItWorksPageConfig;
  
  /** Pricing page content */
  pricingPage: PricingPageConfig;
  
  /** Academy page content */
  academy: AcademyPageConfig;
  
  /** About page content */
  aboutPage: AboutPageConfig;
  
  /** Contact page content */
  contactPage: ContactPageConfig;
  
  /** Consultation page content */
  consultationPage: ConsultationPageConfig;
  
  /** Get Quote page content */
  getQuotePage: GetQuotePageConfig;
  
  /** Why Myelektra items */
  whyMyelektra: WhyMyelektraItem[];
  
  /** Target countries */
  countries: Country[];
  
  /** Footer configuration */
  footer: FooterConfig;
  
  /** Client logos */
  clientLogos: ClientLogo[];
  
  /** Legal disclaimer text */
  disclaimer: string;
}
```

### 1.7 Index Exports

```typescript
// packages/types/src/index.ts

// Core domain types
export type { Solution, SolutionStep, SolutionIcon } from './solution';
export type { Industry, IndustryIcon } from './industry';
export type { Country } from './country';
export type { ProcessStep } from './process';

// Content config type
export type { ContentConfig } from './content-config';

// Navigation types
export type { NavLink, NavigationConfig, FooterColumn, FooterConfig } from './navigation';

// Page content types
export type {
  CTAConfig,
  HeroConfig,
  PageSection,
  HomePageConfig,
  JourneyCard,
  AchievementItem,
  AcademyTeaserConfig,
  PricingTier,
  FinalCtaConfig,
  SolutionsPageConfig,
  SolutionDetailPageConfig,
  IndustriesPageConfig,
  PricingPageConfig,
  ComparisonFeature,
  HowItWorksPageConfig,
  AcademyPageConfig,
  AcademyPricingTier,
  AboutPageConfig,
  StatItem,
  ContactPageConfig,
  ConsultationPageConfig,
  SidebarItem,
  GetQuotePageConfig
} from './page';

// Brand & global types
export type {
  Address,
  SocialLinks,
  Founder,
  LogoConfig,
  BrandConfig,
  FloatingCtaConfig,
  BackToTopConfig,
  CookieBannerConfig,
  ScrollAnimationConfig,
  GlobalConfig,
  ClientLogo,
  WhyMyelektraItem
} from './brand';

// Component props types
export type {
  BaseComponentProps,
  IconProps,
  ButtonVariant,
  ButtonSize,
  ButtonProps,
  CardProps,
  BadgeProps,
  SectionProps,
  ContainerProps,
  HeadingLevel,
  HeadingProps,
  TextProps,
  LinkProps,
  GridColumns,
  GridProps,
  PriceDisplayProps,
  IconMap
} from './components';
```

---

## 2. PACKAGES/UI — SHARED ASTRO COMPONENTS

### 2.1 Component Inventory

| Component | Type | Description |
|-----------|------|-------------|
| `Button.astro` | Astro | Reusable button with variants |
| `Card.astro` | Astro | Content card with variants |
| `Badge.astro` | Astro | Status/label badge |
| `Section.astro` | Astro | Page section wrapper |
| `Container.astro` | Astro | Content container |
| `Heading.astro` | Astro | Typed heading element |
| `Text.astro` | Astro | Styled text element |
| `Link.astro` | Astro | Navigation link |
| `Grid.astro` | Astro | Responsive grid layout |
| `Icon.astro` | Astro | SVG icon component |
| `PriceDisplay.astro` | Astro | Price text with link handling |
| `HeroSection.astro` | Astro | Page hero section |
| `FeatureList.astro` | Astro | List with check icons |
| `PersonaTag.astro` | Astro | Buyer persona tag |
| `CTASection.astro` | Astro | Call-to-action section |

### 2.2 Component Specifications

#### Button.astro

```astro
---
// packages/ui/src/Button.astro
import type { ButtonProps, ButtonVariant, ButtonSize } from '@myelektra/types';

interface Props extends ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const {
  variant = 'primary',
  size = 'md',
  children,
  href,
  disabled = false,
  loading = false,
  className = '',
  icon,
  iconRight,
  ...rest
} = Astro.props;

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-teal text-white hover:bg-teal-hover shadow-lg shadow-teal/25',
  secondary: 'bg-blue text-white hover:bg-blue-hover',
  outline: 'border-2 border-teal text-teal hover:bg-teal hover:text-white',
  ghost: 'text-teal hover:bg-teal/10',
  link: 'text-teal hover:text-teal-hover underline-offset-4 hover:underline'
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
};

const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 btn-transition';
const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
const loadingClasses = loading ? 'relative pointer-events-none' : '';
---

{href ? (
  <a
    href={href}
    class:list={[baseClasses, variantClasses[variant], sizeClasses[size], disabledClasses, className]}
    aria-disabled={disabled}
    aria-busy={loading}
    {...rest}
  >
    {loading && (
      <span class="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </span>
    )}
    <span class:list={[loading && 'invisible']}>
      {icon && <span class="mr-2">{icon}</span>}
      {children}
      {iconRight && <span class="ml-2">{iconRight}</span>}
    </span>
  </a>
) : (
  <button
    type="button"
    class:list={[baseClasses, variantClasses[variant], sizeClasses[size], disabledClasses, loadingClasses, className]}
    disabled={disabled || loading}
    aria-busy={loading}
    {...rest}
  >
    {loading && (
      <span class="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </span>
    )}
    <span class:list={[loading && 'invisible']}>
      {icon && <span class="mr-2">{icon}</span>}
      {children}
      {iconRight && <span class="ml-2">{iconRight}</span>}
    </span>
  </button>
)}
```

#### Card.astro

```astro
---
// packages/ui/src/Card.astro
import type { CardProps } from '@myelektra/types';

interface Props extends CardProps {
  variant?: 'default' | 'dark' | 'gradient';
  hover?: boolean;
  featured?: boolean;
  featuredLabel?: string;
}

const {
  variant = 'default',
  hover = true,
  featured = false,
  featuredLabel = 'Most Popular',
  children,
  className = '',
  ...rest
} = Astro.props;

const variantClasses = {
  default: 'bg-white border border-border shadow-sm',
  dark: 'bg-navy-dark/50 border border-white/10',
  gradient: 'bg-gradient-to-br from-teal/5 to-blue/5 border border-border'
};

const hoverClass = hover ? 'card-hover' : '';
const featuredClass = featured ? 'relative ring-2 ring-gold shadow-xl' : '';
---

<div
  class:list={[
    'rounded-2xl p-8',
    variantClasses[variant],
    hoverClass,
    featuredClass,
    className
  ]}
  {...rest}
>
  {featured && (
    <span class="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-navy-dark text-xs font-bold rounded-full uppercase tracking-wider whitespace-nowrap">
      {featuredLabel}
    </span>
  )}
  {children}
</div>
```

#### Section.astro

```astro
---
// packages/ui/src/Section.astro
import type { SectionProps } from '@myelektra/types';

interface Props extends SectionProps {
  variant?: 'white' | 'light' | 'dark' | 'gradient';
  padded?: boolean;
  contained?: boolean;
}

const {
  variant = 'white',
  padded = true,
  contained = true,
  children,
  className = '',
  ...rest
} = Astro.props;

const variantClasses = {
  white: 'bg-white',
  light: 'bg-bg-light',
  dark: 'bg-navy-dark text-white',
  gradient: 'bg-gradient-to-br from-navy-dark via-navy-dark to-blue/20 text-white'
};

const paddingClass = padded ? 'py-16 lg:py-20' : '';
const containerClass = contained ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' : '';
---

<section
  class:list={[variantClasses[variant], paddingClass, className]}
  {...rest}
>
  <div class={containerClass}>
    {children}
  </div>
</section>
```

#### Container.astro

```astro
---
// packages/ui/src/Container.astro
import type { ContainerProps } from '@myelektra/types';

interface Props extends ContainerProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const {
  maxWidth = 'xl',
  children,
  className = '',
  ...rest
} = Astro.props;

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-7xl',
  '2xl': 'max-w-screen-2xl'
};
---

<div
  class:list={[maxWidthClasses[maxWidth], 'mx-auto px-4 sm:px-6 lg:px-8', className]}
  {...rest}
>
  {children}
</div>
```

#### Heading.astro

```astro
---
// packages/ui/src/Heading.astro
import type { HeadingProps, HeadingLevel } from '@myelektra/types';

interface Props extends HeadingProps {
  as?: HeadingLevel;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  color?: 'primary' | 'secondary' | 'white' | 'teal';
}

const {
  as: Tag = 'h2',
  size = 'lg',
  color = 'primary',
  children,
  className = '',
  ...rest
} = Astro.props;

const sizeClasses = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl lg:text-3xl',
  xl: 'text-3xl lg:text-4xl',
  '2xl': 'text-4xl lg:text-5xl'
};

const colorClasses = {
  primary: 'text-text-primary',
  secondary: 'text-text-secondary',
  white: 'text-white',
  teal: 'text-teal'
};

const baseClasses = 'font-bold font-heading';
---

<Tag
  class:list={[baseClasses, sizeClasses[size], colorClasses[color], className]}
  {...rest}
>
  {children}
</Tag>
```

#### PriceDisplay.astro

```astro
---
// packages/ui/src/PriceDisplay.astro
import type { PriceDisplayProps } from '@myelektra/types';

interface Props extends PriceDisplayProps {
  price: string;
  align?: 'left' | 'center' | 'right';
}

const {
  price,
  align = 'left',
  className = '',
  ...rest
} = Astro.props;

const isBookMeeting = price.startsWith('[Book Meeting for Pricing]');
const suffix = isBookMeeting ? price.replace('[Book Meeting for Pricing]', '').trim() : '';

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
};
---

<p class:list={[alignClasses[align], className]} {...rest}>
  {isBookMeeting ? (
    <a
      href="/consultation"
      class="text-teal hover:text-teal-hover underline underline-offset-2 decoration-teal/40 hover:decoration-teal transition-colors"
    >
      [Book Meeting for Pricing]
    </a>
  ) : (
    price
  )}
  {suffix && ` ${suffix}`}
</p>
```

#### FeatureList.astro

```astro
---
// packages/ui/src/FeatureList.astro
import { CheckIcon } from './icons';

interface Props {
  features: string[];
  className?: string;
  checkColor?: string;
}

const {
  features,
  className = '',
  checkColor = 'text-teal'
} = Astro.props;
---

<ul class:list={['space-y-3', className]}>
  {features.map((feature) => (
    <li class="flex items-start gap-2.5 text-text-secondary text-sm">
      <CheckIcon size={16} className:list={[checkColor, 'shrink-0 mt-0.5']} />
      <span>{feature}</span>
    </li>
  ))}
</ul>
```

#### PersonaTag.astro

```astro
---
// packages/ui/src/PersonaTag.astro

interface Props {
  name: string;
  className?: string;
}

const { name, className = '' } = Astro.props;
---

<span
  class:list={[
    'inline-flex items-center px-3 py-1 bg-blue/10 text-blue text-xs font-medium rounded-full',
    className
  ]}
>
  {name}
</span>
```

#### HeroSection.astro

```astro
---
// packages/ui/src/HeroSection.astro
import type { HeroConfig } from '@myelektra/types';
import { ArrowRightIcon } from './icons';

interface VideoConfig {
  src: string;
  type?: string;
  poster?: string;
}

interface Props {
  hero: HeroConfig;
  video?: VideoConfig;
  variant?: 'default' | 'dark' | 'gradient';
  className?: string;
}

const { 
  hero, 
  video,
  variant = 'default',
  className = '' 
} = Astro.props;

const variantClasses = {
  default: 'bg-white',
  dark: 'bg-navy-dark text-white',
  gradient: 'bg-gradient-to-br from-navy-dark via-navy-dark to-blue/20 text-white'
};

const textColorClasses = {
  default: {
    title: 'text-text-primary',
    subtitle: 'text-text-secondary',
    badge: 'bg-teal/10 text-teal'
  },
  dark: {
    title: 'text-white',
    subtitle: 'text-white/80',
    badge: 'bg-white/10 text-white'
  },
  gradient: {
    title: 'text-white',
    subtitle: 'text-white/80',
    badge: 'bg-white/10 text-white'
  }
};

const colors = textColorClasses[variant];
---

<section class:list={['relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden', variantClasses[variant], className]}>
  {/* Video Background */}
  {video && (
    <div class="absolute inset-0 z-0">
      <video
        class="w-full h-full object-cover"
        autoplay
        muted
        loop
        playsinline
        poster={video.poster}
        aria-hidden="true"
      >
        <source src={video.src} type={video.type || 'video/mp4'} />
      </video>
      {/* Overlay for dark variants */}
      {variant !== 'default' && (
        <div class="absolute inset-0 bg-navy-dark/70" />
      )}
      {/* Default overlay for readability */}
      {variant === 'default' && (
        <div class="absolute inset-0 bg-white/80" />
      )}
    </div>
  )}
  
  <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {hero.badge && (
      <span class:list={["inline-block px-4 py-2 text-sm font-semibold rounded-full mb-6 animate-on-scroll", colors.badge]}>
        {hero.badge}
      </span>
    )}
    
    <h1
      class:list={["text-4xl lg:text-5xl font-bold mb-4 animate-on-scroll font-heading", colors.title]}
    >
      {hero.headlineHighlight ? (
        <>
          {hero.headline.split(hero.headlineHighlight)[0]}
          <span class="gradient-text">{hero.headlineHighlight}</span>
        </>
      ) : (
        hero.headline
      )}
    </h1>
    
    <p class:list={["text-lg max-w-2xl mb-8 animate-on-scroll", colors.subtitle]}>
      {hero.subtitle}
    </p>
    
    {(hero.ctaPrimary || hero.ctaSecondary) && (
      <div class="flex flex-wrap gap-4 animate-on-scroll">
        {hero.ctaPrimary && (
          <a
            href={hero.ctaPrimary.path}
            class="inline-flex items-center px-7 py-3.5 bg-teal text-white font-semibold rounded-lg hover:bg-teal-hover transition-colors btn-transition"
          >
            {hero.ctaPrimary.label}
            <ArrowRightIcon size={18} className="ml-2" />
          </a>
        )}
        {hero.ctaSecondary && (
          <a
            href={hero.ctaSecondary.path}
            class:list={[
              'inline-flex items-center px-7 py-3.5 font-semibold rounded-lg transition-colors btn-transition',
              variant === 'default'
                ? 'border-2 border-teal text-teal hover:bg-teal hover:text-white'
                : 'border-2 border-white/30 text-white hover:bg-white/10'
            ]}
          >
            {hero.ctaSecondary.label}
          </a>
        )}
      </div>
    )}
  </div>
</section>
```

#### CTASection.astro

```astro
---
// packages/ui/src/CTASection.astro
import type { PageSection } from '@myelektra/types';
import { ArrowRightIcon } from './icons';

interface Props {
  cta: PageSection;
  variant?: 'light' | 'dark';
  className?: string;
}

const { cta, variant = 'light', className = '' } = Astro.props;

const bgClass = variant === 'dark' ? 'bg-navy-dark' : 'bg-bg-light';
const textClass = variant === 'dark' ? 'text-white' : 'text-text-primary';
const subtextClass = variant === 'dark' ? 'text-white/60' : 'text-text-secondary';
---

<section class:list={[bgClass, 'py-16 lg:py-20', className]}>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2
      class:list={['text-2xl lg:text-3xl font-bold mb-4', textClass]}
      style="font-family: var(--font-heading)"
    >
      {cta.headline}
    </h2>
    {cta.body && (
      <p class:list={['mb-6 max-w-xl mx-auto', subtextClass]}>
        {cta.body}
      </p>
    )}
    {cta.cta && (
      <a
        href={cta.cta.path}
        class:list={[
          'inline-flex items-center px-8 py-4 font-bold rounded-lg transition-colors btn-transition',
          variant === 'dark' 
            ? 'bg-teal text-white hover:bg-teal-hover shadow-lg shadow-teal/25'
            : 'bg-teal text-white hover:bg-teal-hover'
        ]}
      >
        {cta.cta.label}
        <ArrowRightIcon size={20} className="ml-2" />
      </a>
    )}
  </div>
</section>
```

### 2.3 Icon Components

#### Icon Migration Strategy

The legacy `Icons.tsx` exports 40+ React icon components with icon mappers. For Astro, icons should be converted to standalone Astro components or inline SVGs.

**Migration Approach:**
1. Convert React icon components to Astro components (removing React hooks)
2. Create icon mapper objects for dynamic icon rendering
3. Export all icons from a central `icons.ts` file

#### Icon Component Files

```typescript
// packages/ui/src/icons/index.ts

// Solution tier icons
export { default as TierBronzeIcon } from './TierBronzeIcon.astro';
export { default as TierSilverIcon } from './TierSilverIcon.astro';
export { default as TierGoldIcon } from './TierGoldIcon.astro';
export { default as TierPlatinumIcon } from './TierPlatinumIcon.astro';
export { default as TierDiamondIcon } from './TierDiamondIcon.astro';

// Industry icons
export { default as ManufacturingIcon } from './ManufacturingIcon.astro';
export { default as SaaSIcon } from './SaaSIcon.astro';
export { default as BankingIcon } from './BankingIcon.astro';
export { default as BPOIcon } from './BPOIcon.astro';
export { default as ConsultingIcon } from './ConsultingIcon.astro';

// Why Myelektra icons
export { default as BrainIcon } from './BrainIcon.astro';
export { default as HubSpotIcon } from './HubSpotIcon.astro';
export { default as QualityIcon } from './QualityIcon.astro';
export { default as ReportIcon } from './ReportIcon.astro';
export { default as GlobeIcon } from './GlobeIcon.astro';
export { default as RevenueIcon } from './RevenueIcon.astro';

// Journey icons
export { default as TargetIcon } from './TargetIcon.astro';
export { default as RobotIcon } from './RobotIcon.astro';
export { default as HeadsetIcon } from './HeadsetIcon.astro';
export { default as DatabaseIcon } from './DatabaseIcon.astro';
export { default as ChartIcon } from './ChartIcon.astro';

// Achievement icons
export { default as BullseyeIcon } from './BullseyeIcon.astro';
export { default as ChatIcon } from './ChatIcon.astro';
export { default as FunnelIcon } from './FunnelIcon.astro';
export { default as EyeIcon } from './EyeIcon.astro';
export { default as LayersIcon } from './LayersIcon.astro';

// UI icons
export { default as ArrowRightIcon } from './ArrowRightIcon.astro';
export { default as ArrowUpIcon } from './ArrowUpIcon.astro';
export { default as CheckIcon } from './CheckIcon.astro';
export { default as MenuIcon } from './MenuIcon.astro';
export { default as CloseIcon } from './CloseIcon.astro';
export { default as ChevronDownIcon } from './ChevronDownIcon.astro';
export { default as ChevronRightIcon } from './ChevronRightIcon.astro';
export { default as LinkedInIcon } from './LinkedInIcon.astro';
export { default as InstagramIcon } from './InstagramIcon.astro';
export { default as MailIcon } from './MailIcon.astro';

// Icon mapper types and objects
import type { IconProps } from '@myelektra/types';
import type { AstroComponentFactory } from 'astro';

export type AstroIconComponent = AstroComponentFactory<{ size?: number; className?: string }>; 

export const solutionIconMap: Record<string, AstroIconComponent> = {
  bronze: TierBronzeIcon,
  silver: TierSilverIcon,
  gold: TierGoldIcon,
  platinum: TierPlatinumIcon,
  diamond: TierDiamondIcon,
};

export const industryIconMap: Record<string, AstroIconComponent> = {
  manufacturing: ManufacturingIcon,
  saas: SaaSIcon,
  banking: BankingIcon,
  bpo: BPOIcon,
  consulting: ConsultingIcon,
};

export const whyIconMap: Record<string, AstroIconComponent> = {
  brain: BrainIcon,
  hubspot: HubSpotIcon,
  quality: QualityIcon,
  report: ReportIcon,
  globe: GlobeIcon,
  revenue: RevenueIcon,
};

export const journeyIconMap: Record<string, AstroIconComponent> = {
  target: TargetIcon,
  robot: RobotIcon,
  headset: HeadsetIcon,
  database: DatabaseIcon,
  chart: ChartIcon,
};

export const achievementIconMap: Record<string, AstroIconComponent> = {
  bullseye: BullseyeIcon,
  chat: ChatIcon,
  funnel: FunnelIcon,
  eye: EyeIcon,
  layers: LayersIcon,
};
```

#### Example Icon Component (TargetIcon.astro)

```astro
---
// packages/ui/src/icons/TargetIcon.astro
import type { IconProps } from '@myelektra/types';

interface Props extends IconProps {
  size?: number;
}

const { size = 24, className = '', ...rest } = Astro.props;
---

<svg
  class={className}
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="1.5"
  strokeLinecap="round"
  strokeLinejoin="round"
  aria-hidden="true"
  {...rest}
>
  <circle cx="12" cy="12" r="10" />
  <circle cx="12" cy="12" r="6" />
  <circle cx="12" cy="12" r="2" />
</svg>
```

#### Dynamic Icon Usage

```astro
---
// Example: Rendering icons dynamically from content data
import { solutionIconMap } from '@myelektra/ui/icons';

interface Props {
  iconName: string;
  size?: number;
  className?: string;
}

const { iconName, size = 24, className = '' } = Astro.props;
const IconComponent = solutionIconMap[iconName];
---

{IconComponent && <IconComponent size={size} className={className} />}
```

### 2.4 Index Exports

```typescript
// packages/ui/src/index.ts

// Components
export { default as Button } from './Button.astro';
export { default as Card } from './Card.astro';
export { default as Badge } from './Badge.astro';
export { default as Section } from './Section.astro';
export { default as Container } from './Container.astro';
export { default as Heading } from './Heading.astro';
export { default as Text } from './Text.astro';
export { default as Link } from './Link.astro';
export { default as Grid } from './Grid.astro';
export { default as PriceDisplay } from './PriceDisplay.astro';
export { default as HeroSection } from './HeroSection.astro';
export { default as FeatureList } from './FeatureList.astro';
export { default as PersonaTag } from './PersonaTag.astro';
export { default as CTASection } from './CTASection.astro';

// Re-export types
export type * from '@myelektra/types';
```

---

## 3. PACKAGES/UTILS — SHARED UTILITY FUNCTIONS

### 3.1 Class Name Utilities

```typescript
// packages/utils/src/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names with Tailwind CSS conflict resolution
 * 
 * @example
 * cn('px-4 py-2', 'px-6') // 'py-2 px-6'
 * cn('text-red-500', isActive && 'text-blue-500')
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

### 3.2 SEO Utilities

```typescript
// packages/utils/src/seo.ts

/**
 * Site configuration constants
 */
const SITE_CONFIG = {
  baseUrl: 'https://myelektra.com',
  siteName: 'Myelektra',
  tagline: 'Revenue Growth Partner',
  maxMetaDescriptionLength: 155,
} as const;

/**
 * Normalize path to ensure it starts with / and has no trailing slash (except root)
 * 
 * @example
 * normalizePath('solutions') // '/solutions'
 * normalizePath('/solutions/') // '/solutions'
 * normalizePath('/') // '/'
 */
export function normalizePath(path: string): string {
  // Add leading slash if missing
  let normalized = path.startsWith('/') ? path : `/${path}`;
  // Remove trailing slash (except for root)
  if (normalized !== '/' && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }
  return normalized;
}

/**
 * Generate meta title with site name
 * 
 * @example
 * generateMetaTitle('Solutions') // 'Solutions | Myelektra'
 * generateMetaTitle('Home', true) // 'Myelektra - Revenue Growth Partner'
 */
export function generateMetaTitle(pageTitle: string, isHome?: boolean): string {
  if (isHome) {
    return `${SITE_CONFIG.siteName} - ${SITE_CONFIG.tagline}`;
  }
  return `${pageTitle} | ${SITE_CONFIG.siteName}`;
}

/**
 * Generate meta description
 * 
 * @example
 * generateMetaDescription('Explore our revenue growth solutions')
 */
export function generateMetaDescription(description: string): string {
  // Ensure description is within 155 characters
  if (description.length <= SITE_CONFIG.maxMetaDescriptionLength) {
    return description;
  }
  return description.slice(0, SITE_CONFIG.maxMetaDescriptionLength - 3) + '...';
}

/**
 * Generate canonical URL
 * 
 * @example
 * generateCanonicalUrl('/solutions') // 'https://myelektra.com/solutions'
 * generateCanonicalUrl('solutions') // 'https://myelektra.com/solutions'
 * generateCanonicalUrl('solutions/') // 'https://myelektra.com/solutions'
 */
export function generateCanonicalUrl(path: string): string {
  const normalizedPath = normalizePath(path);
  return `${SITE_CONFIG.baseUrl}${normalizedPath}`;
}

/**
 * Generate Open Graph image URL
 * 
 * @example
 * ogImageUrl('/solutions') // 'https://myelektra.com/og/solutions.png'
 * ogImageUrl('/') // 'https://myelektra.com/og/home.png'
 */
export function ogImageUrl(path: string): string {
  const normalizedPath = normalizePath(path);
  const slug = normalizedPath === '/' ? 'home' : normalizedPath.replace(/^\//, '').replace(/\//g, '-');
  return `${SITE_CONFIG.baseUrl}/og/${slug}.png`;
}

/**
 * Generate structured data for organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'PT. Myelektra Solusi Indonesia',
    url: 'https://myelektra.com',
    logo: 'https://myelektra.com/logo-myelektra.png',
    sameAs: [
      'https://www.linkedin.com/company/3560717',
      'https://www.instagram.com/myelektra/'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+62 21 29636761',
      contactType: 'customer service'
    }
  };
}

/**
 * Generate structured data for a web page
 */
export function generateWebPageSchema({
  title,
  description,
  url,
  datePublished,
  dateModified
}: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    datePublished: datePublished || new Date().toISOString(),
    dateModified: dateModified || new Date().toISOString()
  };
}

/**
 * Generate FAQ structured data
 */
export function generateFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}
```

### 3.3 String Utilities

```typescript
// packages/utils/src/slugify.ts

/**
 * Convert string to URL-friendly slug
 * 
 * @example
 * slugify('Revenue Intelligence') // 'revenue-intelligence'
 * slugify('Bronze (Revenue Intelligence)') // 'bronze-revenue-intelligence'
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Convert slug back to display name
 * 
 * @example
 * deslugify('revenue-intelligence') // 'Revenue Intelligence'
 */
export function deslugify(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Truncate text to specified length
 * 
 * @example
 * truncate('Long text here', 10) // 'Long te...'
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Extract first sentence from text
 */
export function extractFirstSentence(text: string): string {
  const match = text.match(/^.*?[.!?]\s/);
  return match ? match[0].trim() : text;
}
```

### 3.4 Date Utilities

```typescript
// packages/utils/src/formatDate.ts

/**
 * Format date to readable string
 * 
 * @example
 * formatDate('2024-01-15') // 'January 15, 2024'
 * formatDate(new Date()) // 'July 30, 2026'
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Format date to short string
 * 
 * @example
 * formatShortDate('2024-01-15') // 'Jan 15, 2024'
 */
export function formatShortDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Get current year
 * 
 * @example
 * getCurrentYear() // 2026
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

/**
 * Format copyright text with current year
 * 
 * @example
 * formatCopyright('© {year} Myelektra.com') // '© 2026 Myelektra.com'
 */
export function formatCopyright(template: string): string {
  return template.replace('{year}', String(getCurrentYear()));
}
```

### 3.5 URL Utilities

```typescript
// packages/utils/src/url.ts

/**
 * Check if URL is external
 * 
 * @example
 * isExternalUrl('https://google.com') // true
 * isExternalUrl('/solutions') // false
 */
export function isExternalUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://');
}

/**
 * Check if current path matches link path
 * 
 * @example
 * isActiveLink('/solutions', '/solutions/revenue-intelligence') // true
 * isActiveLink('/', '/about') // false
 */
export function isActiveLink(currentPath: string, linkPath: string): boolean {
  if (linkPath === '/') {
    return currentPath === '/';
  }
  return currentPath.startsWith(linkPath);
}

/**
 * Add UTM parameters to URL
 * 
 * @example
 * addUtmParams('/solutions', { source: 'google', medium: 'cpc' })
 * // '/solutions?utm_source=google&utm_medium=cpc'
 */
export function addUtmParams(
  url: string,
  params: { source?: string; medium?: string; campaign?: string; content?: string }
): string {
  const urlObj = new URL(url, 'https://myelektra.com');
  
  if (params.source) urlObj.searchParams.set('utm_source', params.source);
  if (params.medium) urlObj.searchParams.set('utm_medium', params.medium);
  if (params.campaign) urlObj.searchParams.set('utm_campaign', params.campaign);
  if (params.content) urlObj.searchParams.set('utm_content', params.content);
  
  return urlObj.pathname + urlObj.search;
}
```

### 3.6 Validation Utilities

```typescript
// packages/utils/src/validation.ts

/**
 * Validate email address
 * 
 * @example
 * isValidEmail('test@example.com') // true
 * isValidEmail('invalid') // false
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (Indonesian format)
 * 
 * @example
 * isValidPhone('+62 21 29636761') // true
 * isValidPhone('02129636761') // true
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+62|62|0)2[1-9]\d{7,10}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Sanitize HTML to prevent XSS
 */
export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
```

### 3.7 Analytics Utilities

```typescript
// packages/utils/src/analytics.ts

/**
 * Google Analytics gtag function type
 * @see https://developers.google.com/tag-platform/gtagjs/reference
 */
interface GtagFunction {
  (command: 'event', eventName: string, params?: Record<string, string | number | boolean>): void;
  (command: 'config', measurementId: string, config?: Record<string, unknown>): void;
  (command: 'set', config: Record<string, unknown>): void;
}

/**
 * Safely call Google Analytics gtag
 */
function callGtag(...args: Parameters<GtagFunction>): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args);
  }
}

/**
 * Track custom event
 * 
 * @example
 * trackEvent('cta_click', { button: 'primary', page: 'home' })
 */
export function trackEvent(eventName: string, params?: Record<string, string | number>): void {
  if (typeof window === 'undefined') return;
  
  // Google Analytics 4
  callGtag('event', eventName, params);
  
  // Console log in development
  if (import.meta.env.DEV) {
    console.log('[Analytics]', eventName, params);
  }
}

/**
 * Track page view
 * 
 * @example
 * trackPageView('/solutions', 'Solutions | Myelektra')
 */
export function trackPageView(path: string, title: string): void {
  trackEvent('page_view', { page_path: path, page_title: title });
}

/**
 * Track CTA click
 * 
 * @example
 * trackCtaClick('primary', 'home', '/consultation')
 */
export function trackCtaClick(variant: string, page: string, destination: string): void {
  trackEvent('cta_click', {
    cta_variant: variant,
    page,
    destination
  });
}

/**
 * Track form submission
 * 
 * @example
 * trackFormSubmission('contact', 'success')
 */
export function trackFormSubmission(formName: string, status: 'success' | 'error'): void {
  trackEvent('form_submission', {
    form_name: formName,
    status
  });
}

/**
 * Declare gtag function for TypeScript
 * @see https://developers.google.com/tag-platform/gtagjs/reference
 */
declare global {
  interface Window {
    gtag: GtagFunction;
  }
}
```

### 3.8 Index Exports

```typescript
// packages/utils/src/index.ts

// Class utilities
export { cn } from './cn';

// SEO utilities
export {
  generateMetaTitle,
  generateMetaDescription,
  generateCanonicalUrl,
  ogImageUrl,
  generateOrganizationSchema,
  generateWebPageSchema,
  generateFaqSchema
} from './seo';

// String utilities
export { slugify, deslugify, truncate, extractFirstSentence } from './slugify';

// Date utilities
export { formatDate, formatShortDate, getCurrentYear, formatCopyright } from './formatDate';

// URL utilities
export { isExternalUrl, isActiveLink, addUtmParams } from './url';

// Validation utilities
export { isValidEmail, isValidPhone, sanitizeHtml } from './validation';

// Analytics utilities
export { trackEvent, trackPageView, trackCtaClick, trackFormSubmission } from './analytics';
```

---

## 4. PACKAGE CONFIGURATION

### 4.1 packages/types/package.json

```json
{
  "name": "@myelektra/types",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  },
  "scripts": {
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "typescript": "^5.9.0"
  }
}
```

### 4.2 packages/ui/package.json

```json
{
  "name": "@myelektra/ui",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./*.astro": "./src/*.astro"
  },
  "scripts": {
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@myelektra/types": "workspace:*"
  },
  "devDependencies": {
    "astro": "^5.0.0",
    "typescript": "^5.9.0"
  }
}
```

### 4.3 packages/utils/package.json

```json
{
  "name": "@myelektra/utils",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  },
  "scripts": {
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  },
  "dependencies": {
    "clsx": "^2.1.0",
    "tailwind-merge": "^3.0.0"
  },
  "devDependencies": {
    "typescript": "^5.9.0",
    "vitest": "^3.0.0"
  }
}
```

### 4.4 tsconfig.base.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "exclude": ["node_modules", "dist"]
}
```

---

## 5. MIGRATION CHECKLIST

### 5.1 Types Migration

- [ ] Create `packages/types/src/solution.ts`
- [ ] Create `packages/types/src/industry.ts`
- [ ] Create `packages/types/src/country.ts`
- [ ] Create `packages/types/src/process.ts`
- [ ] Create `packages/types/src/navigation.ts`
- [ ] Create `packages/types/src/page.ts`
- [ ] Create `packages/types/src/brand.ts`
- [ ] Create `packages/types/src/components.ts`
- [ ] Create `packages/types/src/index.ts`
- [ ] Verify all types match legacy content structure

### 5.2 UI Components Migration

- [ ] Create `packages/ui/src/Button.astro`
- [ ] Create `packages/ui/src/Card.astro`
- [ ] Create `packages/ui/src/Badge.astro`
- [ ] Create `packages/ui/src/Section.astro`
- [ ] Create `packages/ui/src/Container.astro`
- [ ] Create `packages/ui/src/Heading.astro`
- [ ] Create `packages/ui/src/Text.astro`
- [ ] Create `packages/ui/src/Link.astro`
- [ ] Create `packages/ui/src/Grid.astro`
- [ ] Create `packages/ui/src/PriceDisplay.astro`
- [ ] Create `packages/ui/src/HeroSection.astro`
- [ ] Create `packages/ui/src/FeatureList.astro`
- [ ] Create `packages/ui/src/PersonaTag.astro`
- [ ] Create `packages/ui/src/CTASection.astro`
- [ ] Create `packages/ui/src/index.ts`

### 5.3 Utils Migration

- [ ] Create `packages/utils/src/cn.ts`
- [ ] Create `packages/utils/src/seo.ts`
- [ ] Create `packages/utils/src/slugify.ts`
- [ ] Create `packages/utils/src/formatDate.ts`
- [ ] Create `packages/utils/src/url.ts`
- [ ] Create `packages/utils/src/validation.ts`
- [ ] Create `packages/utils/src/analytics.ts`
- [ ] Create `packages/utils/src/index.ts`

### 5.4 Validation

- [ ] All types compile without errors
- [ ] All UI components render correctly
- [ ] All utils functions work as expected
- [ ] Package dependencies resolve correctly
- [ ] Import paths work across packages

---

## END OF SPECIFICATION
