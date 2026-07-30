#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const root = dirname(fileURLToPath(import.meta.url));
const dir = join(root, '..', 'weebly-theme');

const files = readdirSync(dir).filter((f) => f.startsWith('client_')).sort();
const map = {};

for (const f of files) {
  const path = join(dir, f);
  process.stdout.write(`  ${f} ... `);
  const url = execSync(
    `curl -s -F "reqtype=fileupload" -F "fileToUpload=@${path}" https://catbox.moe/user/api.php`,
    { encoding: 'utf8', timeout: 30000 }
  ).trim();
  if (!url.startsWith('https://')) {
    console.error(`FAIL: ${url}`);
    process.exit(1);
  }
  map[f] = url;
  console.log(url);
  execSync('sleep 0.3');
}

// Save mapping
const mapPath = join(dir, 'catbox-map.txt');
writeFileSync(mapPath, Object.entries(map).map(([k, v]) => `${k}|${v}`).join('\n') + '\n');
console.log(`\nMap saved: ${mapPath}`);

// Update index.html
const htmlPath = join(dir, 'index.html');
let html = readFileSync(htmlPath, 'utf8');
let replaced = 0;
for (const [file, url] of Object.entries(map)) {
  const re = new RegExp(`src="${file}"`, 'g');
  const before = html;
  html = html.replace(re, `src="${url}"`);
  replaced += (before.length - html.length) / file.length;
}
writeFileSync(htmlPath, html);
console.log(`index.html: ${replaced} references replaced`);
