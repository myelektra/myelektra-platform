/**
 * inject-data-content.mjs
 *
 * Adds data-content="config.path" attributes to elements in all HTML files.
 * The content-loader.js script reads these at runtime and injects text from
 * https://cms.myelektra.com/api/config.
 *
 * Usage:  node scripts/inject-data-content.mjs
 *
 * Run ONCE on the built HTML files (after npm run build-theme).
 * After that, edit content in CMS → refresh page → content updates.
 */

import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');
const themeDir = path.join(root, 'weebly-theme');
const configPath = path.join(root, 'content-config.json');

// ─── Page → Config Path Mapping (same as inject-markers.mjs) ──────────
const PAGE_MAP = {
  'index.html': [
    'homepage.hero.badge', 'homepage.hero.headline', 'homepage.hero.headlineHighlight',
    'homepage.hero.subtitle', 'homepage.hero.ctaPrimary.label',
    'homepage.hero.ctaSecondary.label',
    'homepage.journey.sectionLabel', 'homepage.journey.headline', 'homepage.journey.intro',
    'homepage.journey.cards.0.title', 'homepage.journey.cards.0.description',
    'homepage.journey.cards.1.title', 'homepage.journey.cards.1.description',
    'homepage.journey.cards.2.title', 'homepage.journey.cards.2.description',
    'homepage.journey.cards.3.title', 'homepage.journey.cards.3.description',
    'homepage.journey.cards.4.title', 'homepage.journey.cards.4.description',
    'homepage.achievements.headline',
    'homepage.achievements.items.0.title', 'homepage.achievements.items.0.description',
    'homepage.achievements.items.1.title', 'homepage.achievements.items.1.description',
    'homepage.achievements.items.2.title', 'homepage.achievements.items.2.description',
    'homepage.achievements.items.3.title', 'homepage.achievements.items.3.description',
    'homepage.achievements.items.4.title', 'homepage.achievements.items.4.description',
    'homepage.solutionsOverview.headline',
    'solutions.0.name', 'solutions.0.price', 'solutions.0.description',
    'solutions.0.features.0', 'solutions.0.features.1', 'solutions.0.features.2', 'solutions.0.features.3',
    'solutions.0.cta',
    'solutions.1.name', 'solutions.1.price', 'solutions.1.description',
    'solutions.1.features.0', 'solutions.1.features.1', 'solutions.1.features.2', 'solutions.1.features.3',
    'solutions.1.cta',
    'solutions.2.name', 'solutions.2.price', 'solutions.2.description',
    'solutions.2.features.0', 'solutions.2.features.1', 'solutions.2.features.2', 'solutions.2.features.3',
    'solutions.2.cta',
    'solutions.3.name', 'solutions.3.price', 'solutions.3.description',
    'solutions.3.features.0', 'solutions.3.features.1', 'solutions.3.features.2', 'solutions.3.features.3',
    'solutions.3.cta',
    'solutions.4.name', 'solutions.4.price', 'solutions.4.description',
    'solutions.4.features.0', 'solutions.4.features.1', 'solutions.4.features.2', 'solutions.4.features.3',
    'solutions.4.cta',
    'homepage.countryTargeting.headline', 'homepage.countryTargeting.intro',
    'homepage.countryTargeting.maxContactsNote', 'homepage.countryTargeting.personasLabel',
    'homepage.countryTargeting.disclaimer',
    'countries.0.name', 'countries.1.name', 'countries.2.name', 'countries.3.name',
    'countries.4.name', 'countries.5.name', 'countries.6.name',
    'homepage.industriesSection.headline', 'homepage.experience.headline', 'homepage.whyMyelektraSection.headline',
    'whyMyelektra.0.title', 'whyMyelektra.0.description',
    'whyMyelektra.1.title', 'whyMyelektra.1.description',
    'whyMyelektra.2.title', 'whyMyelektra.2.description',
    'whyMyelektra.3.title', 'whyMyelektra.3.description',
    'whyMyelektra.4.title', 'whyMyelektra.4.description',
    'whyMyelektra.5.title', 'whyMyelektra.5.description',
    'homepage.academyTeaser.headline', 'homepage.academyTeaser.subheadline',
    'homepage.academyTeaser.description', 'homepage.academyTeaser.ctaLabel',
    'homepage.academyTeaser.pricing.publicClasses.badgeLabel',
    'homepage.academyTeaser.pricing.publicClasses.price',
    'homepage.academyTeaser.pricing.publicClasses.per',
    'homepage.academyTeaser.pricing.corporateTraining.badgeLabel',
    'homepage.academyTeaser.pricing.corporateTraining.price',
    'homepage.academyTeaser.pricing.corporateTraining.per',
    'homepage.finalCta.headline', 'homepage.finalCta.body',
    'homepage.finalCta.subheadline', 'homepage.finalCta.subbody',
    'homepage.finalCta.ctaLabel',
    'brand.tagline', 'brand.subTagline', 'brand.positioning',
    'navigation.headerCta',
    'global.floatingCta.text', 'global.floatingCta.buttonLabel',
    'global.cookieBanner.text', 'global.cookieBanner.acceptLabel', 'global.cookieBanner.learnMoreLabel',
    'disclaimer', 'footer.copyright',
  ],
  'solutions.html': [
    'solutionsPage.hero.headline', 'solutionsPage.hero.subtitle',
    'solutions.0.name', 'solutions.0.price', 'solutions.0.description', 'solutions.0.bestFor', 'solutions.0.cta',
    'solutions.0.features.0', 'solutions.0.features.1', 'solutions.0.features.2', 'solutions.0.features.3',
    'solutions.1.name', 'solutions.1.price', 'solutions.1.description', 'solutions.1.bestFor', 'solutions.1.cta',
    'solutions.1.features.0', 'solutions.1.features.1', 'solutions.1.features.2', 'solutions.1.features.3',
    'solutions.2.name', 'solutions.2.price', 'solutions.2.description', 'solutions.2.bestFor', 'solutions.2.cta',
    'solutions.2.features.0', 'solutions.2.features.1', 'solutions.2.features.2', 'solutions.2.features.3',
    'solutions.3.name', 'solutions.3.price', 'solutions.3.description', 'solutions.3.bestFor', 'solutions.3.cta',
    'solutions.3.features.0', 'solutions.3.features.1', 'solutions.3.features.2', 'solutions.3.features.3',
    'solutions.4.name', 'solutions.4.price', 'solutions.4.description', 'solutions.4.bestFor', 'solutions.4.cta',
    'solutions.4.features.0', 'solutions.4.features.1', 'solutions.4.features.2', 'solutions.4.features.3',
    'solutionsPage.includedLabel', 'solutionsPage.popularBadge',
    'solutionsPage.cta.headline', 'solutionsPage.cta.body', 'solutionsPage.cta.buttonLabel',
  ],
  'pricing.html': [
    'pricingPage.hero.headline', 'pricingPage.hero.subtitle',
    'solutions.0.name', 'solutions.0.price', 'solutions.0.description', 'solutions.0.cta',
    'solutions.0.features.0', 'solutions.0.features.1', 'solutions.0.features.2', 'solutions.0.features.3',
    'solutions.1.name', 'solutions.1.price', 'solutions.1.description', 'solutions.1.cta',
    'solutions.1.features.0', 'solutions.1.features.1', 'solutions.1.features.2', 'solutions.1.features.3',
    'solutions.2.name', 'solutions.2.price', 'solutions.2.description', 'solutions.2.cta',
    'solutions.2.features.0', 'solutions.2.features.1', 'solutions.2.features.2', 'solutions.2.features.3',
    'solutions.3.name', 'solutions.3.price', 'solutions.3.description', 'solutions.3.cta',
    'solutions.3.features.0', 'solutions.3.features.1', 'solutions.3.features.2', 'solutions.3.features.3',
    'solutions.4.name', 'solutions.4.price', 'solutions.4.description', 'solutions.4.cta',
    'solutions.4.features.0', 'solutions.4.features.1', 'solutions.4.features.2', 'solutions.4.features.3',
    'pricingPage.popularBadge', 'pricingPage.comparisonHeadline',
    'pricingPage.cta.headline', 'pricingPage.cta.body', 'pricingPage.cta.buttonLabel',
  ],
  'about.html': [
    'aboutPage.hero.headline', 'aboutPage.hero.subtitle',
    'aboutPage.story.label', 'aboutPage.story.headline',
    'aboutPage.story.paragraph1', 'aboutPage.story.paragraph2', 'aboutPage.story.paragraph3',
    'aboutPage.stats.0.value', 'aboutPage.stats.0.label',
    'aboutPage.stats.1.value', 'aboutPage.stats.1.label',
    'aboutPage.stats.2.value', 'aboutPage.stats.2.label',
    'aboutPage.stats.3.value', 'aboutPage.stats.3.label',
    'aboutPage.mission.label', 'aboutPage.mission.headline', 'aboutPage.mission.body',
    'aboutPage.cta.headline', 'aboutPage.cta.body', 'aboutPage.cta.buttonLabel',
    'brand.founder.name', 'brand.founder.title',
    'whyMyelektra.0.title', 'whyMyelektra.0.description',
    'whyMyelektra.1.title', 'whyMyelektra.1.description',
    'whyMyelektra.2.title', 'whyMyelektra.2.description',
    'whyMyelektra.3.title', 'whyMyelektra.3.description',
    'whyMyelektra.4.title', 'whyMyelektra.4.description',
    'whyMyelektra.5.title', 'whyMyelektra.5.description',
  ],
  'academy.html': [
    'academy.hero.headline', 'academy.hero.subheadline', 'academy.hero.description',
    'academy.topicsHeadline', 'academy.topicsSubtitle',
    'academy.topics.0', 'academy.topics.1', 'academy.topics.2', 'academy.topics.3', 'academy.topics.4',
    'academy.topics.5', 'academy.topics.6', 'academy.topics.7', 'academy.topics.8', 'academy.topics.9',
    'academy.pricingHeadline',
    'academy.publicClasses.name', 'academy.publicClasses.price', 'academy.publicClasses.priceDetail',
    'academy.publicClasses.features.0', 'academy.publicClasses.features.1', 'academy.publicClasses.features.2', 'academy.publicClasses.features.3',
    'academy.publicClasses.cta',
    'academy.corporateTraining.name', 'academy.corporateTraining.price', 'academy.corporateTraining.priceDetail',
    'academy.corporateTraining.features.0', 'academy.corporateTraining.features.1', 'academy.corporateTraining.features.2', 'academy.corporateTraining.features.3',
    'academy.corporateTraining.cta', 'academy.corporateTraining.badge',
    'academy.cta.headline', 'academy.cta.body', 'academy.cta.buttonLabel',
  ],
  'industries.html': [
    'industriesPage.hero.headline', 'industriesPage.hero.subtitle',
    'industries.0.name', 'industries.0.description',
    'industries.0.personas.0', 'industries.0.personas.1', 'industries.0.personas.2', 'industries.0.personas.3', 'industries.0.personas.4',
    'industries.1.name', 'industries.1.description',
    'industries.1.personas.0', 'industries.1.personas.1', 'industries.1.personas.2', 'industries.1.personas.3', 'industries.1.personas.4',
    'industries.2.name', 'industries.2.description',
    'industries.2.personas.0', 'industries.2.personas.1', 'industries.2.personas.2', 'industries.2.personas.3', 'industries.2.personas.4',
    'industries.3.name', 'industries.3.description',
    'industries.3.personas.0', 'industries.3.personas.1', 'industries.3.personas.2', 'industries.3.personas.3', 'industries.3.personas.4',
    'industries.4.name', 'industries.4.description',
    'industries.4.personas.0', 'industries.4.personas.1', 'industries.4.personas.2', 'industries.4.personas.3', 'industries.4.personas.4',
    'industriesPage.personasHeadline',
    'industriesPage.cta.headline', 'industriesPage.cta.body', 'industriesPage.cta.buttonLabel',
  ],
  'how-it-works.html': [
    'howItWorks.hero.headline', 'howItWorks.hero.subtitle',
    'howItWorks.summaryHeadline', 'howItWorks.outputLabel',
    'howItWorks.steps.0.title', 'howItWorks.steps.0.description', 'howItWorks.steps.0.output',
    'howItWorks.steps.1.title', 'howItWorks.steps.1.description', 'howItWorks.steps.1.output',
    'howItWorks.steps.2.title', 'howItWorks.steps.2.description', 'howItWorks.steps.2.output',
    'howItWorks.steps.3.title', 'howItWorks.steps.3.description', 'howItWorks.steps.3.output',
    'howItWorks.steps.4.title', 'howItWorks.steps.4.description', 'howItWorks.steps.4.output',
    'howItWorks.steps.5.title', 'howItWorks.steps.5.description', 'howItWorks.steps.5.output',
    'howItWorks.steps.6.title', 'howItWorks.steps.6.description', 'howItWorks.steps.6.output',
    'howItWorks.steps.7.title', 'howItWorks.steps.7.description', 'howItWorks.steps.7.output',
    'howItWorks.cta.headline', 'howItWorks.cta.body', 'howItWorks.cta.buttonLabel',
  ],
  'consultation.html': [
    'consultationPage.hero.headline', 'consultationPage.hero.subtitle',
    'consultationPage.scheduleHeadline', 'consultationPage.scheduleSubtitle',
    'consultationPage.sidebarWhatToExpect.headline',
    'consultationPage.sidebarWhatToExpect.items.0.title', 'consultationPage.sidebarWhatToExpect.items.0.description',
    'consultationPage.sidebarWhatToExpect.items.1.title', 'consultationPage.sidebarWhatToExpect.items.1.description',
    'consultationPage.sidebarQuickLinks.headline',
  ],
  'contact-new.html': [
    'contactPage.hero.headline', 'contactPage.hero.subtitle',
    'contactPage.officeHeadline', 'contactPage.contactInfoHeadline', 'contactPage.hoursHeadline',
    'contactPage.ctaButtons.0.label', 'contactPage.ctaButtons.1.label',
    'brand.address.line1', 'brand.address.line2', 'brand.address.country',
    'brand.company', 'brand.phone', 'brand.hours',
  ],
  'get-quote-here-new.html': [
    'getQuotePage.hero.headline', 'getQuotePage.hero.subtitle',
    'getQuotePage.formHeadline', 'getQuotePage.formSubtitle',
    'getQuotePage.sidebar.headline',
    'getQuotePage.sidebar.items.0', 'getQuotePage.sidebar.items.1', 'getQuotePage.sidebar.items.2', 'getQuotePage.sidebar.items.3',
    'getQuotePage.cta.headline', 'getQuotePage.cta.body', 'getQuotePage.cta.buttonLabel',
  ],
  'solution-revenue-intelligence.html': [
    'solutionDetailPage.includedHeadline', 'solutionDetailPage.bestForHeadline',
    'solutionDetailPage.howItWorksHeadline', 'solutionDetailPage.ctaPrefix', 'solutionDetailPage.ctaSuffix',
    'solutionDetailPage.ctaBody', 'solutionDetailPage.relatedSolutionsHeadline',
    'solutions.0.name', 'solutions.0.price', 'solutions.0.description',
    'solutions.0.features.0', 'solutions.0.features.1', 'solutions.0.features.2', 'solutions.0.features.3',
    'solutions.0.bestFor', 'solutions.0.cta',
    'solutions.0.steps.0.title', 'solutions.0.steps.0.description',
    'solutions.0.steps.1.title', 'solutions.0.steps.1.description',
    'solutions.0.steps.2.title', 'solutions.0.steps.2.description',
  ],
  'solution-pipeline-builder.html': [
    'solutionDetailPage.includedHeadline', 'solutionDetailPage.bestForHeadline',
    'solutionDetailPage.howItWorksHeadline', 'solutionDetailPage.ctaPrefix', 'solutionDetailPage.ctaSuffix',
    'solutionDetailPage.ctaBody', 'solutionDetailPage.relatedSolutionsHeadline',
    'solutions.1.name', 'solutions.1.price', 'solutions.1.description',
    'solutions.1.features.0', 'solutions.1.features.1', 'solutions.1.features.2', 'solutions.1.features.3',
    'solutions.1.bestFor', 'solutions.1.cta',
    'solutions.1.steps.0.title', 'solutions.1.steps.0.description',
    'solutions.1.steps.1.title', 'solutions.1.steps.1.description',
    'solutions.1.steps.2.title', 'solutions.1.steps.2.description',
    'solutions.1.steps.3.title', 'solutions.1.steps.3.description',
  ],
  'solution-revenue-engine.html': [
    'solutionDetailPage.includedHeadline', 'solutionDetailPage.bestForHeadline',
    'solutionDetailPage.howItWorksHeadline', 'solutionDetailPage.ctaPrefix', 'solutionDetailPage.ctaSuffix',
    'solutionDetailPage.ctaBody', 'solutionDetailPage.relatedSolutionsHeadline',
    'solutions.2.name', 'solutions.2.price', 'solutions.2.description',
    'solutions.2.features.0', 'solutions.2.features.1', 'solutions.2.features.2', 'solutions.2.features.3',
    'solutions.2.bestFor', 'solutions.2.cta',
    'solutions.2.steps.0.title', 'solutions.2.steps.0.description',
    'solutions.2.steps.1.title', 'solutions.2.steps.1.description',
    'solutions.2.steps.2.title', 'solutions.2.steps.2.description',
    'solutions.2.steps.3.title', 'solutions.2.steps.3.description',
  ],
  'solution-ai-sales-transformation.html': [
    'solutionDetailPage.includedHeadline', 'solutionDetailPage.bestForHeadline',
    'solutionDetailPage.howItWorksHeadline', 'solutionDetailPage.ctaPrefix', 'solutionDetailPage.ctaSuffix',
    'solutionDetailPage.ctaBody', 'solutionDetailPage.relatedSolutionsHeadline',
    'solutions.3.name', 'solutions.3.price', 'solutions.3.description',
    'solutions.3.features.0', 'solutions.3.features.1', 'solutions.3.features.2', 'solutions.3.features.3',
    'solutions.3.bestFor', 'solutions.3.cta',
    'solutions.3.steps.0.title', 'solutions.3.steps.0.description',
    'solutions.3.steps.1.title', 'solutions.3.steps.1.description',
    'solutions.3.steps.2.title', 'solutions.3.steps.2.description',
    'solutions.3.steps.3.title', 'solutions.3.steps.3.description',
  ],
  'solution-fractional-revenue-office.html': [
    'solutionDetailPage.includedHeadline', 'solutionDetailPage.bestForHeadline',
    'solutionDetailPage.howItWorksHeadline', 'solutionDetailPage.ctaPrefix', 'solutionDetailPage.ctaSuffix',
    'solutionDetailPage.ctaBody', 'solutionDetailPage.relatedSolutionsHeadline',
    'solutions.4.name', 'solutions.4.price', 'solutions.4.description',
    'solutions.4.features.0', 'solutions.4.features.1', 'solutions.4.features.2', 'solutions.4.features.3',
    'solutions.4.bestFor', 'solutions.4.cta',
    'solutions.4.steps.0.title', 'solutions.4.steps.0.description',
    'solutions.4.steps.1.title', 'solutions.4.steps.1.description',
    'solutions.4.steps.2.title', 'solutions.4.steps.2.description',
    'solutions.4.steps.3.title', 'solutions.4.steps.3.description',
  ],
  'template.html': [],
};

// ─── Helpers ───────────────────────────────────────────────────────────

function flatten(obj, prefix = '') {
  const result = {};
  for (const key in obj) {
    const path = prefix ? `${prefix}.${key}` : key;
    const val = obj[key];
    if (typeof val === 'string') result[path] = val;
    else if (Array.isArray(val)) {
      val.forEach((item, i) => {
        if (typeof item === 'string') result[`${path}.${i}`] = item;
        else if (typeof item === 'object' && item !== null) Object.assign(result, flatten(item, `${path}.${i}`));
      });
    } else if (typeof val === 'object' && val !== null) Object.assign(result, flatten(val, path));
  }
  return result;
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Add data-content attribute to the element containing the given text.
 * Uses >text< pattern matching — only touches text node content, not attributes.
 *
 * For headline: also handles data-content-headline + data-content-highlight
 */
function addDataContent(html, value, attrName, attrValue) {
  if (!value || value.length < 2) return html;
  const escaped = escapeRegex(value);

  // Split into script/style blocks and everything else
  const blocks = html.split(/(<script[\s>][\s\S]*?<\/script>|<style[\s>][\s\S]*?<\/style>)/i);
  return blocks.map((block, i) => {
    if (i % 2 === 1) return block; // skip script/style

    // For each text node between > and <, find the one containing our value
    // Then locate its opening tag and add the attribute
    return block.replace(/>([^<]*?)<\//g, (match, text) => {
      if (!text.includes(value)) return match;

      // Check if this element already has the attribute
      // We need to look backwards from this match to find the opening tag
      return match; // We'll handle this differently below
    });
  }).join('');
}

// Better approach: walk through text nodes and modify the preceding opening tag
function addDataContentAttribute(html, value, attrStr) {
  if (!value || value.length < 2) return html;
  const escaped = escapeRegex(value);

  // Working with >text< patterns
  // Find each occurrence of >text</ in non-script/style blocks
  const scriptRe = /<script[\s>][\s\S]*?<\/script>|<style[\s>][\s\S]*?<\/style>/gi;

  // Collect script/style positions to skip
  const skipRanges = [];
  let m;
  scriptRe.lastIndex = 0;
  while ((m = scriptRe.exec(html)) !== null) {
    skipRanges.push({ start: m.index, end: m.index + m[0].length });
  }

  function isInRange(pos) {
    return skipRanges.some(r => pos >= r.start && pos < r.end);
  }

  let result = '';
  let lastPos = 0;
  const re = new RegExp(`>([^<]*?)<`, 'g');

  while ((m = re.exec(html)) !== null) {
    const text = m[1];
    const matchPos = m.index;

    if (isInRange(matchPos)) {
      continue;
    }

    if (text.includes(value)) {
      // Find the opening tag for this element
      // Go backwards from m.index to find the preceding <...> tag
      const openTagEnd = m.index; // position of '>'
      const textBefore = html.substring(0, openTagEnd);
      const lastLt = textBefore.lastIndexOf('<');
      if (lastLt === -1) continue;

      const openTag = textBefore.substring(lastLt);
      // openTag is like '<div class="foo"' or '<span' (without the closing >)

      // Check if already has the attribute
      if (openTag.includes(` ${attrStr}`) || openTag.includes(` ${attrStr}="`)) {
        continue;
      }

      // Check if already has any data-content attribute
      if (openTag.includes(' data-content')) {
        continue;
      }

      // Add the attribute before the tag's closing '>'
      // We need to handle self-closing tags differently
      // The opening tag is everything from lastLt to openTagEnd
      // We insert the attribute before the end of the opening tag
      const tagContent = openTag; // includes the leading '<' but not the '>'
      // Find attributes end — it's the end of the tag content (before '>')
      // Insert data-content="path" before the '>'
      const insertion = ` ${attrStr}`;
      const beforeTag = html.substring(0, openTagEnd);
      const afterTag = html.substring(openTagEnd);

      // We need to insert the attribute into the opening tag
      // The opening tag starts at lastLt and ends at openTagEnd (which is '>')
      // We insert right before that '>'

      result += html.substring(lastPos, openTagEnd);
      result += insertion;
      lastPos = openTagEnd;
    }
  }

  if (lastPos > 0) {
    result += html.substring(lastPos);
    return result;
  }

  return html;
}

// Simpler approach: line-by-line
function processFile(filePath, fileConfigPaths, flat) {
  let html = fs.readFileSync(filePath, 'utf8');
  const lines = html.split('\n');
  const outLines = [];
  const addedAttrs = new Set();

  // Build a map from unique values to their config path
  // Handles duplicate values: prefer the first matching path for each text occurrence
  const valueToPath = {};
  for (const cp of fileConfigPaths) {
    const val = flat[cp];
    if (val && val.length >= 2) {
      if (!valueToPath[val]) valueToPath[val] = cp;
    }
  }

  for (const line of lines) {
    let modified = line;

    // Find all value matches in this line (text between > and <)
    for (const [val, cp] of Object.entries(valueToPath)) {
      if (addedAttrs.has(cp)) continue; // already added this path

      // Skip if already has data-content
      if (modified.includes(` data-content="${cp}"`)) {
        addedAttrs.add(cp);
        continue;
      }

      // Find text node occurrences: >text</tag
      // Only match when value appears as text content, not in attributes
      const escapedVal = escapeRegex(val);
      const textNodeRe = new RegExp(`>([^<]*?)(${escapedVal})([^<]*?)<`, 'g');
      const match = textNodeRe.exec(modified);

      if (match) {
        // Found the value in a text node
        // Find the opening tag preceding this match
        const matchStart = match.index;
        // Go backwards from matchStart to find the opening <
        const before = modified.substring(0, matchStart);
        const lastGt = before.lastIndexOf('>');
        const tagStart = before.lastIndexOf('<', lastGt);

        if (tagStart !== -1 && lastGt !== -1 && tagStart < lastGt) {
          const tagContent = before.substring(tagStart + 1, lastGt); // tag name + attrs (without < >)
          // Check no data-content attr already
          if (!tagContent.includes(' data-content')) {
            // Insert data-content before the closing >
            modified = modified.substring(0, lastGt) + ` data-content="${cp}"` + modified.substring(lastGt);
            addedAttrs.add(cp);
          }
        }
      }
    }

    outLines.push(modified);
  }

  if (outLines.join('\n') !== html) {
    fs.writeFileSync(filePath, outLines.join('\n'), 'utf8');
  }
  return addedAttrs.size;
}

// ─── Main ──────────────────────────────────────────────────────────────

function main() {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const flat = flatten(config);

  let totalAdded = 0;

  for (const [file, pagePaths] of Object.entries(PAGE_MAP)) {
    const fp = path.join(themeDir, file);
    if (!fs.existsSync(fp)) {
      console.warn(`  ${file} not found`);
      continue;
    }

    const count = processFile(fp, pagePaths, flat);
    console.log(`  ${file} — ${count} data-content added`);
    totalAdded += count;
  }

  console.log(`\n✅ Done: ${totalAdded} data-content attributes added`);
}

main();
