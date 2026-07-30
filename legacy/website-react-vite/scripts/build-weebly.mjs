/**
 * build-weebly.mjs
 *
 * Replaces <!--@@path@@--> markers in weebly-theme HTML files with
 * content from content-config.json.
 *
 * Sources (priority order):
 *   1. https://cms.myelektra.com/api/config (live CMS content)
 *   2. ./content-config.json (local fallback)
 *
 * Usage:  node scripts/build-weebly.mjs
 *         node scripts/build-weebly.mjs --local   (force local only)
 */

import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');
const themeDir = path.join(root, 'weebly-theme');
const localPath = path.join(root, 'content-config.json');
const USE_LOCAL = process.argv.includes('--local');

function getJsonValue(obj, pathStr) {
  const parts = pathStr.split('.');
  let current = obj;
  for (const p of parts) {
    if (current && typeof current === 'object' && p in current) {
      current = current[p];
    } else {
      return undefined;
    }
  }
  return typeof current === 'string' ? current : JSON.stringify(current);
}

async function fetchConfig() {
  // Try CMS API first
  if (!USE_LOCAL) {
    try {
      const res = await fetch('https://cms.myelektra.com/api/config?cb=' + Date.now());
      if (res.ok) {
        const json = await res.json();
        console.log('📡 Fetched config from CMS API (cms.myelektra.com)');
        return json;
      }
      console.warn(`⚠️  CMS API returned ${res.status}, falling back to local`);
    } catch (e) {
      console.warn('⚠️  CMS API unreachable, falling back to local —', e.message);
    }
  }

  // Fallback: local file
  if (fs.existsSync(localPath)) {
    const raw = fs.readFileSync(localPath, 'utf8');
    console.log('📄 Using local content-config.json');
    return JSON.parse(raw);
  }

  throw new Error('No config source available (CMS API failed + local file missing)');
}

function replaceMarkers(filePath, config) {
  let content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const updated = [];

  for (const line of lines) {
    const m = line.match(/<!--@@(.+?)@@-->/);
    if (!m) {
      updated.push(line);
      continue;
    }
    const marker = m[1];
    const value = getJsonValue(config, marker);
    if (value !== undefined) {
      updated.push(line.replace(/<!--@@.+?@@-->/g, value));
    } else {
      console.warn(`⚠️  Marker '${marker}' not found in config — keeping marker in ${filePath}`);
      updated.push(line);
    }
  }

  fs.writeFileSync(filePath, updated.join('\n'), 'utf8');
}

async function main() {
  console.log('🔧 Weebly Theme Builder');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━');

  const config = await fetchConfig();
  console.log(`✅ Config loaded (${Object.keys(config).length} top keys)`);

  const htmlFiles = fs.readdirSync(themeDir).filter(f => f.endsWith('.html'));
  let markerCount = 0;
  let fileCount = 0;

  for (const file of htmlFiles) {
    const fp = path.join(themeDir, file);
    const content = fs.readFileSync(fp, 'utf8');
    const markers = content.match(/<!--@@.+?@@-->/g);
    if (markers && markers.length > 0) {
      replaceMarkers(fp, config);
      markerCount += markers.length;
      fileCount++;
      console.log(`  📝 ${file} — ${markers.length} markers replaced`);
    }
  }

  // Copy logo if needed
  const logoSrc = path.join(root, 'public', 'logo-myelektra.png');
  const logoDest = path.join(themeDir, 'logo-myelektra.png');
  if (fs.existsSync(logoSrc) && !fs.existsSync(logoDest)) {
    fs.copyFileSync(logoSrc, logoDest);
    console.log('  🖼️  Logo copied');
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ Build complete — ${fileCount} files updated, ${markerCount} markers processed`);
}

main().catch(err => {
  console.error('❌ Build failed:', err.message);
  process.exit(1);
});
