/**
 * Myelektra Content Migration Script
 * 
 * Purpose: Convert legacy content-config.json to TinaCMS Markdown/MDX files
 * 
 * Usage:
 *   npx tsx scripts/content-migration/migrate-to-tinacms.ts
 * 
 * Output:
 *   content/
 *   ├── pages/           # MDX files for each page
 *   ├── solutions/       # MD files for each solution
 *   ├── industries/      # MD files for each industry
 *   ├── countries/       # MD files for each country
 *   ├── client-logos/    # MD files for each client logo
 *   ├── why-myelektra/   # MD files for each why-myelektra item
 *   ├── navigation/      # JSON files
 *   ├── brand/           # JSON files
 *   ├── footer/          # JSON files
 *   └── global/          # JSON files
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// =============================================================================
// Types
// =============================================================================

interface MigrationResult {
  collection: string;
  created: number;
  errors: string[];
}

interface ContentConfig {
  brand: Record<string, unknown>;
  navigation: Record<string, unknown>;
  global: Record<string, unknown>;
  homepage: Record<string, unknown>;
  solutions: Array<Record<string, unknown>>;
  solutionsPage: Record<string, unknown>;
  solutionDetailPage: Record<string, unknown>;
  industries: Array<Record<string, unknown>>;
  industriesPage: Record<string, unknown>;
  howItWorks: Record<string, unknown>;
  pricingPage: Record<string, unknown>;
  academy: Record<string, unknown>;
  aboutPage: Record<string, unknown>;
  contactPage: Record<string, unknown>;
  consultationPage: Record<string, unknown>;
  getQuotePage: Record<string, unknown>;
  whyMyelektra: Array<Record<string, unknown>>;
  countries: Array<Record<string, unknown>>;
  footer: Record<string, unknown>;
  clientLogos: Array<{ src: string; alt: string }>;
  disclaimer: string;
}

// =============================================================================
// Helper Functions
// =============================================================================

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function ensureDirectory(dirPath: string): void {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
}

function writeFileWithFrontmatter(filePath: string, frontmatter: Record<string, unknown>, body: string): void {
  const yaml = convertToYaml(frontmatter);
  const content = `---\n${yaml}---\n\n${body}`;
  writeFileSync(filePath, content, 'utf-8');
}

function convertToYaml(obj: Record<string, unknown>, indent = 0): string {
  let result = '';
  const spaces = '  '.repeat(indent);
  
  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) {
      result += `${spaces}${key}:\n`;
    } else if (typeof value === 'string') {
      // Escape YAML special characters
      const escaped = value.replace(/"/g, '\\"');
      result += `${spaces}${key}: "${escaped}"\n`;
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      result += `${spaces}${key}: ${value}\n`;
    } else if (Array.isArray(value)) {
      result += `${spaces}${key}:\n`;
      for (const item of value) {
        if (typeof item === 'object' && item !== null) {
          result += `${spaces}  -\n`;
          result += convertToYaml(item as Record<string, unknown>, indent + 2);
        } else {
          result += `${spaces}  - "${String(item)}"\n`;
        }
      }
    } else if (typeof value === 'object') {
      result += `${spaces}${key}:\n`;
      result += convertToYaml(value as Record<string, unknown>, indent + 1);
    }
  }
  
  return result;
}

// =============================================================================
// Migration Functions
// =============================================================================

async function migratePages(config: ContentConfig, outputDir: string): Promise<MigrationResult> {
  const result: MigrationResult = { collection: 'pages', created: 0, errors: [] };
  const pagesDir = resolve(outputDir, 'pages');
  ensureDirectory(pagesDir);
  
  const pages = [
    { slug: 'home', title: 'Home', data: config.homepage, metaTitle: 'Myelektra - Revenue Growth Partner', metaDescription: 'Myelektra helps B2B companies identify the right buyers and build predictable revenue pipelines.' },
    { slug: 'solutions', title: 'Solutions', data: config.solutionsPage, metaTitle: 'Solutions | Myelektra', metaDescription: 'Choose from Myelektra revenue growth solutions.' },
    { slug: 'industries', title: 'Industries', data: config.industriesPage, metaTitle: 'Industries | Myelektra', metaDescription: 'Myelektra serves key B2B industries across Southeast Asia.' },
    { slug: 'how-it-works', title: 'How It Works', data: config.howItWorks, metaTitle: 'How It Works | Myelektra', metaDescription: 'Learn how Myelektra works: an 8-step process.' },
    { slug: 'pricing', title: 'Pricing', data: config.pricingPage, metaTitle: 'Pricing | Myelektra', metaDescription: 'Transparent pricing for Myelektra solutions.' },
    { slug: 'academy', title: 'Academy', data: config.academy, metaTitle: 'Academy | Myelektra', metaDescription: 'Myelektra Academy: B2B sales training programs.' },
    { slug: 'about', title: 'About', data: config.aboutPage, metaTitle: 'About | Myelektra', metaDescription: 'Learn about Myelektra.' },
    { slug: 'contact', title: 'Contact', data: config.contactPage, metaTitle: 'Contact | Myelektra', metaDescription: 'Contact Myelektra.' },
    { slug: 'consultation', title: 'Consultation', data: config.consultationPage, metaTitle: 'Book a Meeting | Myelektra', metaDescription: 'Schedule an online meeting with Myelektra.' },
    { slug: 'get-quote', title: 'Get Quote', data: config.getQuotePage, metaTitle: 'Get a Quote | Myelektra', metaDescription: 'Request a custom quote.' },
  ];
  
  for (const page of pages) {
    try {
      const frontmatter = {
        title: page.title,
        description: page.metaDescription,
        metaTitle: page.metaTitle,
        metaDescription: page.metaDescription,
        draft: false,
      };
      
      // Convert page data to JSON string for storage
      const body = JSON.stringify(page.data, null, 2);
      
      writeFileWithFrontmatter(
        resolve(pagesDir, `${page.slug}.mdx`),
        frontmatter,
        `\n${body}\n`
      );
      
      result.created++;
    } catch (error) {
      result.errors.push(`Failed to create page ${page.slug}: ${error}`);
    }
  }
  
  return result;
}

async function migrateSolutions(config: ContentConfig, outputDir: string): Promise<MigrationResult> {
  const result: MigrationResult = { collection: 'solutions', created: 0, errors: [] };
  const solutionsDir = resolve(outputDir, 'solutions');
  ensureDirectory(solutionsDir);
  
  for (const solution of config.solutions) {
    try {
      const slug = slugify(solution.name as string);
      
      const frontmatter = {
        title: solution.name,
        price: solution.price,
        description: solution.description,
        icon: solution.icon,
        isPopular: solution.isPopular || false,
        bestFor: solution.bestFor,
        cta: solution.cta,
        metaTitle: `${solution.name} | Myelektra`,
        metaDescription: solution.description,
        steps: solution.steps || [],
      };
      
      // Create body content
      const body = `\n${solution.description}\n`;
      
      writeFileWithFrontmatter(
        resolve(solutionsDir, `${slug}.md`),
        frontmatter,
        body
      );
      
      result.created++;
    } catch (error) {
      result.errors.push(`Failed to create solution ${solution.name}: ${error}`);
    }
  }
  
  return result;
}

async function migrateIndustries(config: ContentConfig, outputDir: string): Promise<MigrationResult> {
  const result: MigrationResult = { collection: 'industries', created: 0, errors: [] };
  const industriesDir = resolve(outputDir, 'industries');
  ensureDirectory(industriesDir);
  
  for (const industry of config.industries) {
    try {
      const slug = slugify(industry.name as string);
      
      const frontmatter = {
        title: industry.name,
        description: industry.description,
        icon: industry.icon,
        metaTitle: `${industry.name} | Myelektra`,
        metaDescription: industry.description,
        personas: industry.personas,
      };
      
      const body = `\n${industry.description}\n`;
      
      writeFileWithFrontmatter(
        resolve(industriesDir, `${slug}.md`),
        frontmatter,
        body
      );
      
      result.created++;
    } catch (error) {
      result.errors.push(`Failed to create industry ${industry.name}: ${error}`);
    }
  }
  
  return result;
}

async function migrateCountries(config: ContentConfig, outputDir: string): Promise<MigrationResult> {
  const result: MigrationResult = { collection: 'countries', created: 0, errors: [] };
  const countriesDir = resolve(outputDir, 'countries');
  ensureDirectory(countriesDir);
  
  for (const country of config.countries) {
    try {
      const slug = slugify(country.name as string);
      
      const frontmatter = {
        title: country.name,
        flagAccent: country.flagAccent,
        personas: country.personas,
        order: config.countries.indexOf(country) + 1,
      };
      
      const body = `\n${country.name}\n`;
      
      writeFileWithFrontmatter(
        resolve(countriesDir, `${slug}.md`),
        frontmatter,
        body
      );
      
      result.created++;
    } catch (error) {
      result.errors.push(`Failed to create country ${country.name}: ${error}`);
    }
  }
  
  return result;
}

async function migrateClientLogos(config: ContentConfig, outputDir: string): Promise<MigrationResult> {
  const result: MigrationResult = { collection: 'clientLogos', created: 0, errors: [] };
  const logosDir = resolve(outputDir, 'client-logos');
  ensureDirectory(logosDir);
  
  for (const logo of config.clientLogos) {
    try {
      const slug = slugify(logo.alt);
      
      const frontmatter = {
        title: logo.alt,
        logo: logo.src,
        website: '',
        order: config.clientLogos.indexOf(logo) + 1,
      };
      
      const body = `\n${logo.alt}\n`;
      
      writeFileWithFrontmatter(
        resolve(logosDir, `${slug}.md`),
        frontmatter,
        body
      );
      
      result.created++;
    } catch (error) {
      result.errors.push(`Failed to create client logo ${logo.alt}: ${error}`);
    }
  }
  
  return result;
}

async function migrateWhyMyelektra(config: ContentConfig, outputDir: string): Promise<MigrationResult> {
  const result: MigrationResult = { collection: 'whyMyelektra', created: 0, errors: [] };
  const whyDir = resolve(outputDir, 'why-myelektra');
  ensureDirectory(whyDir);
  
  for (const item of config.whyMyelektra) {
    try {
      const slug = slugify(item.title as string);
      
      const frontmatter = {
        title: item.title,
        description: item.description,
        icon: item.icon,
        order: config.whyMyelektra.indexOf(item) + 1,
      };
      
      const body = `\n${item.description}\n`;
      
      writeFileWithFrontmatter(
        resolve(whyDir, `${slug}.md`),
        frontmatter,
        body
      );
      
      result.created++;
    } catch (error) {
      result.errors.push(`Failed to create why-myelektra item ${item.title}: ${error}`);
    }
  }
  
  return result;
}

async function migrateNavigation(config: ContentConfig, outputDir: string): Promise<MigrationResult> {
  const result: MigrationResult = { collection: 'navigation', created: 0, errors: [] };
  const navDir = resolve(outputDir, 'navigation');
  ensureDirectory(navDir);
  
  try {
    const navData = {
      desktop: config.navigation.desktop,
      headerCta: config.navigation.headerCta,
      headerCtaPath: config.navigation.headerCtaPath,
      hideFromNav: config.navigation.hideFromNav,
    };
    
    writeFileSync(
      resolve(navDir, 'main.json'),
      JSON.stringify(navData, null, 2),
      'utf-8'
    );
    
    result.created++;
  } catch (error) {
    result.errors.push(`Failed to create navigation: ${error}`);
  }
  
  return result;
}

async function migrateBrand(config: ContentConfig, outputDir: string): Promise<MigrationResult> {
  const result: MigrationResult = { collection: 'brand', created: 0, errors: [] };
  const brandDir = resolve(outputDir, 'brand');
  ensureDirectory(brandDir);
  
  try {
    writeFileSync(
      resolve(brandDir, 'index.json'),
      JSON.stringify(config.brand, null, 2),
      'utf-8'
    );
    
    result.created++;
  } catch (error) {
    result.errors.push(`Failed to create brand: ${error}`);
  }
  
  return result;
}

async function migrateFooter(config: ContentConfig, outputDir: string): Promise<MigrationResult> {
  const result: MigrationResult = { collection: 'footer', created: 0, errors: [] };
  const footerDir = resolve(outputDir, 'footer');
  ensureDirectory(footerDir);
  
  try {
    writeFileSync(
      resolve(footerDir, 'index.json'),
      JSON.stringify(config.footer, null, 2),
      'utf-8'
    );
    
    result.created++;
  } catch (error) {
    result.errors.push(`Failed to create footer: ${error}`);
  }
  
  return result;
}

async function migrateGlobalSettings(config: ContentConfig, outputDir: string): Promise<MigrationResult> {
  const result: MigrationResult = { collection: 'global', created: 0, errors: [] };
  const globalDir = resolve(outputDir, 'global');
  ensureDirectory(globalDir);
  
  try {
    const globalData = {
      ...config.global,
      disclaimer: config.disclaimer,
    };
    
    writeFileSync(
      resolve(globalDir, 'settings.json'),
      JSON.stringify(globalData, null, 2),
      'utf-8'
    );
    
    result.created++;
  } catch (error) {
    result.errors.push(`Failed to create global settings: ${error}`);
  }
  
  return result;
}

// =============================================================================
// Main Migration
// =============================================================================

async function runMigration(): Promise<void> {
  console.log('🚀 Starting Myelektra Content Migration to TinaCMS...\n');
  
  // Load legacy content config
  const configPath = resolve(__dirname, '../../legacy/website-react-vite/content-config.json');
  const rawConfig = readFileSync(configPath, 'utf-8');
  const config = JSON.parse(rawConfig) as ContentConfig;
  
  // Output directory
  const outputDir = resolve(__dirname, '../../apps/website/content');
  ensureDirectory(outputDir);
  
  console.log(`📂 Output directory: ${outputDir}\n`);
  
  // Run migrations
  const results: MigrationResult[] = [];
  
  const migrations = [
    () => migratePages(config, outputDir),
    () => migrateSolutions(config, outputDir),
    () => migrateIndustries(config, outputDir),
    () => migrateCountries(config, outputDir),
    () => migrateClientLogos(config, outputDir),
    () => migrateWhyMyelektra(config, outputDir),
    () => migrateNavigation(config, outputDir),
    () => migrateBrand(config, outputDir),
    () => migrateFooter(config, outputDir),
    () => migrateGlobalSettings(config, outputDir),
  ];
  
  for (const migration of migrations) {
    const result = await migration();
    results.push(result);
    
    if (result.errors.length > 0) {
      console.error(`❌ ${result.collection}: ${result.errors.join(', ')}`);
    } else {
      console.log(`✅ ${result.collection}: ${result.created} files created`);
    }
  }
  
  // Summary
  console.log('\n📊 Migration Summary:');
  console.log('─'.repeat(50));
  
  let totalCreated = 0;
  let totalErrors = 0;
  
  for (const result of results) {
    totalCreated += result.created;
    totalErrors += result.errors.length;
  }
  
  console.log(`Total files created: ${totalCreated}`);
  console.log(`Total errors: ${totalErrors}`);
  
  console.log('\n📁 Directory Structure Created:');
  console.log('   content/');
  console.log('   ├── pages/          (MDX files)');
  console.log('   ├── solutions/      (MD files)');
  console.log('   ├── industries/     (MD files)');
  console.log('   ├── countries/      (MD files)');
  console.log('   ├── client-logos/   (MD files)');
  console.log('   ├── why-myelektra/  (MD files)');
  console.log('   ├── navigation/     (JSON files)');
  console.log('   ├── brand/          (JSON files)');
  console.log('   ├── footer/         (JSON files)');
  console.log('   └── global/         (JSON files)');
  
  if (totalErrors === 0) {
    console.log('\n✅ Migration completed successfully!');
    console.log('\n📝 Next steps:');
    console.log('   1. Review generated files in apps/website/content/');
    console.log('   2. Run TinaCMS dev server: npm run dev');
    console.log('   3. Access admin panel at: http://localhost:3000/admin');
  } else {
    console.log('\n⚠️  Migration completed with errors. Please check the logs above.');
    process.exit(1);
  }
}

// =============================================================================
// Entry Point
// =============================================================================

runMigration().catch((error) => {
  console.error('❌ Migration failed:', error);
  process.exit(1);
});
