#!/usr/bin/env node
// SEO / GEO / AIO optimization for weebly-theme HTML files.
// Adds: meta description, OG tags, Twitter Card, canonical, <main> wrapper,
// JSON-LD schema per page type. Does NOT change visible text content.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'weebly-theme');
const SITE = 'https://myelektra.com';

const pages = {
  'index.html': {
    desc: 'Myelektra helps B2B companies identify the right buyers, start meaningful sales conversations, manage opportunities in HubSpot, and build a more predictable revenue pipeline.',
    schema: { '@context': 'https://schema.org', '@type': 'Organization', name: 'Myelektra', url: SITE, description: 'AI-Powered Revenue Growth Partner for B2B companies', address: { '@type': 'PostalAddress', addressLocality: 'Jakarta', addressCountry: 'ID' }, sameAs: ['https://www.linkedin.com/company/3560717'] },
  },
  'about.html': {
    desc: 'Myelektra is an AI-powered revenue growth partner helping B2B companies move from scattered prospecting to structured, measurable revenue systems.',
    schema: { '@context': 'https://schema.org', '@type': 'AboutPage', name: 'About Myelektra', mainEntity: { '@type': 'Organization', name: 'Myelektra', url: SITE } },
  },
  'academy.html': {
    desc: 'Myelektra Academy helps founders, sales leaders, and corporate sales professionals adopt modern B2B selling practices with AI-enabled training.',
    schema: { '@context': 'https://schema.org', '@type': 'Course', name: 'Myelektra Academy', provider: { '@type': 'Organization', name: 'Myelektra', url: SITE } },
  },
  'consultation.html': {
    desc: 'Book a free revenue consultation with Myelektra. Review your target market, sales process, HubSpot setup, and identify the best solution for your growth.',
    schema: { '@context': 'https://schema.org', '@type': 'Service', name: 'Revenue Consultation', provider: { '@type': 'Organization', name: 'Myelektra', url: SITE }, offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
  },
  'how-it-works.html': {
    desc: 'A structured eight-step process that takes you from discovery to a measurable and continuously improving revenue pipeline.',
    schema: { '@context': 'https://schema.org', '@type': 'HowTo', name: 'How Myelektra Works', step: [{ '@type': 'HowToStep', name: 'Discovery' }, { '@type': 'HowToStep', name: 'Strategy' }, { '@type': 'HowToStep', name: 'Build' }, { '@type': 'HowToStep', name: 'Launch' }, { '@type': 'HowToStep', name: 'Optimize' }] },
  },
  'industries.html': {
    desc: 'Myelektra provides targeted revenue growth solutions across key B2B industries including SaaS, manufacturing, professional services, and technology.',
    schema: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Industries We Serve', isPartOf: { '@type': 'WebSite', name: 'Myelektra', url: SITE } },
  },
  'pricing.html': {
    desc: 'Clear, straightforward Myelektra pricing with no hidden fees. Choose the revenue growth solution that matches your growth stage.',
    schema: { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Myelektra Pricing', isPartOf: { '@type': 'WebSite', name: 'Myelektra', url: SITE } },
  },
  'solutions.html': {
    desc: 'From market intelligence to pipeline management — choose the Myelektra revenue growth solution that matches your growth stage.',
    schema: { '@context': 'https://schema.org', '@type': 'ItemList', name: 'Myelektra Revenue Growth Solutions', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Revenue Intelligence' }, { '@type': 'ListItem', position: 2, name: 'Pipeline Builder' }, { '@type': 'ListItem', position: 3, name: 'Revenue Engine' }, { '@type': 'ListItem', position: 4, name: 'AI Sales Transformation' }, { '@type': 'ListItem', position: 5, name: 'Fractional Revenue Office' }] },
  },
  'solution-revenue-intelligence.html': {
    desc: 'Revenue Intelligence builds a focused market-entry and prospecting foundation before launching outreach for B2B companies.',
    schema: { '@context': 'https://schema.org', '@type': 'Service', name: 'Revenue Intelligence', provider: { '@type': 'Organization', name: 'Myelektra', url: SITE } },
  },
  'solution-pipeline-builder.html': {
    desc: 'Pipeline Builder turns approved buyer personas and target accounts into qualified sales conversations for B2B companies.',
    schema: { '@context': 'https://schema.org', '@type': 'Service', name: 'Pipeline Builder', provider: { '@type': 'Organization', name: 'Myelektra', url: SITE } },
  },
  'solution-revenue-engine.html': {
    desc: 'Revenue Engine builds and manages an integrated revenue system with pipeline visibility and forecasting for B2B companies.',
    schema: { '@context': 'https://schema.org', '@type': 'Service', name: 'Revenue Engine', provider: { '@type': 'Organization', name: 'Myelektra', url: SITE } },
  },
  'solution-ai-sales-transformation.html': {
    desc: 'AI Sales Transformation turns manual sales activities into AI-assisted, measurable, and scalable workflows for B2B companies.',
    schema: { '@context': 'https://schema.org', '@type': 'Service', name: 'AI Sales Transformation', provider: { '@type': 'Organization', name: 'Myelektra', url: SITE } },
  },
  'solution-fractional-revenue-office.html': {
    desc: 'Fractional Revenue Office adds experienced revenue leadership, RevOps support, SDR management, and executive reporting for B2B companies.',
    schema: { '@context': 'https://schema.org', '@type': 'Service', name: 'Fractional Revenue Office', provider: { '@type': 'Organization', name: 'Myelektra', url: SITE } },
  },
};

function slugToTitle(file) {
  return file.replace('.html', '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function addMetaTags(html, file, cfg) {
  const url = `${SITE}/${file}`;
  const title = slugToTitle(file);
  let tags = '';

  if (!/meta name="description"/.test(html)) {
    tags += `<meta name="description" content="${cfg.desc}" />\n  `;
  }
  if (!/rel="canonical"/.test(html)) {
    tags += `<link rel="canonical" href="${url}" />\n  `;
  }
  if (!/og:title/.test(html)) {
    tags += `<meta property="og:title" content="${title}" />\n  `;
    tags += `<meta property="og:description" content="${cfg.desc}" />\n  `;
    tags += `<meta property="og:type" content="website" />\n  `;
    tags += `<meta property="og:url" content="${url}" />\n  `;
    tags += `<meta property="og:image" content="${SITE}/logo-myelektra.png" />\n  `;
    tags += `<meta property="og:site_name" content="Myelektra" />\n  `;
    tags += `<meta name="twitter:card" content="summary_large_image" />\n  `;
    tags += `<meta name="twitter:title" content="${title}" />\n  `;
    tags += `<meta name="twitter:description" content="${cfg.desc}" />\n  `;
  }
  if (!/application\/ld\+json/.test(html)) {
    tags += `<script type="application/ld+json">\n${JSON.stringify(cfg.schema, null, 2)}\n</script>\n  `;
  }

  if (tags) html = html.replace('</head>', tags + '</head>');
  return html;
}

function addMainWrapper(html) {
  if (html.includes('<main')) return html;
  const footerIdx = html.indexOf('<footer');
  if (footerIdx === -1) return html;
  const headerEnd = html.lastIndexOf('</header>', footerIdx);
  if (headerEnd === -1) return html;
  const afterHeader = headerEnd + '</header>'.length;
  return html.slice(0, afterHeader) + '\n<main>\n' + html.slice(afterHeader, footerIdx) + '\n</main>\n' + html.slice(footerIdx);
}

let updated = 0;
for (const file of readdirSync(dir).filter((n) => n.endsWith('.html'))) {
  const cfg = pages[file];
  if (!cfg) { console.log(`  ${file}: skip`); continue; }

  let html = readFileSync(join(dir, file), 'utf8');
  const orig = html;
  html = addMetaTags(html, file, cfg);
  html = addMainWrapper(html);

  if (html !== orig) {
    writeFileSync(join(dir, file), html);
    updated++;
    console.log(`  ${file}: optimized`);
  } else {
    console.log(`  ${file}: already good`);
  }
}
console.log(`done — ${updated} files updated`);
