/**
 * Content data sourced from content-config.json (root).
 * Edit that file to customize all text — no need to touch this file.
 *
 * This file maps the JSON structure to typed exports used by page components.
 * If you add new fields to the JSON, add the corresponding type here.
 */
import config from '../../content-config.json' with { type: 'json' };

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Solution {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  bestFor: string;
  cta: string;
  icon: string;
  isPopular?: boolean;
  steps?: { title: string; desc: string }[];
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  personas: string[];
  icon: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  output: string;
}

export interface Country {
  name: string;
  flagAccent: string;
  personas: string[];
}

// ---------------------------------------------------------------------------
// Solutions
// ---------------------------------------------------------------------------

export const solutions: Solution[] = config.solutions.map((s) => ({
  id: s.id,
  name: s.name,
  price: s.price,
  description: s.description,
  features: s.features,
  bestFor: s.bestFor,
  cta: s.cta,
  icon: s.icon,
  isPopular: s.isPopular,
  // JSON uses "description" per step, TS interface uses "desc"
  steps: s.steps?.map((st) => ({ title: st.title, desc: st.description })),
}));

// ---------------------------------------------------------------------------
// Industries
// ---------------------------------------------------------------------------

export const industries: Industry[] = config.industries.map((ind) => ({
  id: ind.id,
  name: ind.name,
  description: ind.description,
  personas: ind.personas,
  icon: ind.icon,
}));

// ---------------------------------------------------------------------------
// Process Steps (How It Works)
// ---------------------------------------------------------------------------

export const processSteps: ProcessStep[] = config.howItWorks.steps;

// ---------------------------------------------------------------------------
// Countries
// ---------------------------------------------------------------------------

export const countries: Country[] = config.countries.map((c) => ({
  name: c.name,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  flagAccent: (c as any).flagAccent,
  personas: c.personas,
}));

// ---------------------------------------------------------------------------
// Why Myelektra
// ---------------------------------------------------------------------------

export const whyMyelektra: { title: string; description: string; icon: string }[] =
  config.whyMyelektra;

// ---------------------------------------------------------------------------
// Academy Topics
// ---------------------------------------------------------------------------

export const academyTopics: string[] = config.academy.topics;

// ---------------------------------------------------------------------------
// Disclaimer
// ---------------------------------------------------------------------------

export const disclaimer: string = config.disclaimer;

// ---------------------------------------------------------------------------
// Client Logos
// ---------------------------------------------------------------------------

export const clientLogos: { src: string; alt: string }[] = config.clientLogos;

// ---------------------------------------------------------------------------
// Config sections — for page components to read text directly from content-config.json
// ---------------------------------------------------------------------------

export const homepageConfig = config.homepage;
export const solutionsPageConfig = config.solutionsPage;
export const solutionDetailPageConfig = config.solutionDetailPage;
export const industriesPageConfig = config.industriesPage;
export const howItWorksConfig = config.howItWorks;
export const pricingPageConfig = config.pricingPage;
export const academyConfig = config.academy;
export const aboutPageConfig = config.aboutPage;
export const contactPageConfig = config.contactPage;
export const consultationPageConfig = config.consultationPage;
export const getQuotePageConfig = config.getQuotePage;
export const navigationConfig = config.navigation;
export const footerConfig = config.footer;
export const globalConfig = config.global;
export const brandConfig = config.brand;
