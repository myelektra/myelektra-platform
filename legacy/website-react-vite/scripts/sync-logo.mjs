#!/usr/bin/env node
// Sync web logo PNG into weebly-theme and replace inline SVG logos.
// ponytail: single-source logo. Upgrade to hashed filename + manifest when cache-busting needed.
import { readFileSync, writeFileSync, copyFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'public', 'logo-myelektra.png');
const destDir = join(root, 'weebly-theme');
const dest = join(destDir, 'logo-myelektra.png');

copyFileSync(src, dest);

const logoRe = /<svg\s[^>]*viewBox="181\.7987[^>]*>[\s\S]*?<\/svg>/g;
const replacement = '<img src="logo-myelektra.png" alt="Myelektra" class="logo-img" />';

let swapped = 0;
for (const f of readdirSync(destDir).filter((n) => n.endsWith('.html'))) {
  const p = join(destDir, f);
  const html = readFileSync(p, 'utf8');
  const next = html.replace(logoRe, replacement);
  const n = (html.match(logoRe) || []).length;
  if (n) {
    writeFileSync(p, next);
    swapped += n;
    console.log(`  ${f}: ${n} logo(s) -> PNG`);
  }
}
console.log(`synced logo-myelektra.png -> weebly-theme/ (${swapped} inline SVG replaced)`);
