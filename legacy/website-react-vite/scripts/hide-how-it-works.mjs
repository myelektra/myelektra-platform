import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const themeDir = 'weebly-theme';
const files = readdirSync(themeDir).filter(f => f.endsWith('.html'));

for (const file of files) {
  const fp = join(themeDir, file);
  let html = readFileSync(fp, 'utf-8');
  const original = html;

  // remove desktop nav link (with optional active-teal)
  html = html.replace(
    /<a href="how-it-works\.html" class="nav-link(?: active-teal)?">How It Works<\/a>/g,
    ''
  );

  // remove mobile nav link (with optional active)
  html = html.replace(
    /<a href="how-it-works\.html" class="mobile-nav-link(?: active)?">How It Works<\/a>/g,
    ''
  );

  // collapse triple newlines (from removed lines) to double
  html = html.replace(/\n{3,}/g, '\n\n');

  if (html !== original) {
    writeFileSync(fp, html, 'utf-8');
    console.log(`✓ ${file}`);
  } else {
    console.log(`- ${file} (no changes)`);
  }
}
console.log('Done.');
