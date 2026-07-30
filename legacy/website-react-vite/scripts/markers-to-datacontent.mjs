/**
 * markers-to-datacontent.mjs
 *
 * Converts <!--@@path@@--> markers into data-content="path" attributes.
 * Keeps original text as fallback inside the element.
 *
 * Before: <h1><!--@@howItWorks.hero.headline@@--></h1>
 * After:  <h1 data-content="howItWorks.hero.headline">How Myelektra Works</h1>
 *
 * Run AFTER inject-markers.mjs, BEFORE build-weebly.mjs.
 * Then content-loader.js handles runtime fetching from CMS.
 */

import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');
const themeDir = path.join(root, 'weebly-theme');
const configPath = path.join(root, 'content-config.json');

function flatten(obj, prefix = '') {
  const result = {};
  for (const key in obj) {
    const p = prefix ? `${prefix}.${key}` : key;
    const val = obj[key];
    if (typeof val === 'string') result[p] = val;
    else if (Array.isArray(val)) {
      val.forEach((item, i) => {
        if (typeof item === 'string') result[`${p}.${i}`] = item;
        else if (typeof item === 'object' && item !== null) Object.assign(result, flatten(item, `${p}.${i}`));
      });
    } else if (typeof val === 'object' && val !== null) Object.assign(result, flatten(val, p));
  }
  return result;
}

function main() {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const flat = flatten(config);

  const files = fs.readdirSync(themeDir).filter(f => f.endsWith('.html'));
  let totalConverted = 0;

  for (const file of files) {
    const fp = path.join(themeDir, file);
    let html = fs.readFileSync(fp, 'utf8');
    let converted = 0;

    // Process each marker
    const markerRe = /<!--@@(.+?)@@-->/g;
    let match;
    while ((match = markerRe.exec(html)) !== null) {
      const pathStr = match[1];
      const fallback = flat[pathStr];
      if (fallback === undefined) {
        console.warn(`  ⚠️  ${file}: path '${pathStr}' not found in config`);
        continue;
      }

      const marker = match[0];
      const markerStart = match.index;
      const markerEnd = markerStart + marker.length;

      // Find the opening tag that contains this marker
      // Go backwards to find the last '<' before the marker
      const beforeMarker = html.substring(0, markerStart);
      const lastLt = beforeMarker.lastIndexOf('<');
      if (lastLt === -1 || beforeMarker.lastIndexOf('>') > lastLt) {
        // Marker is not inside a tag — replace in place
        html = html.substring(0, markerStart) + fallback + html.substring(markerEnd);
        converted++;
        markerRe.lastIndex = markerStart + fallback.length;
        continue;
      }

      // The tag name — check if it's a closing tag </...
      const afterLt = html.substring(lastLt + 1, lastLt + 2);
      if (afterLt === '/') {
        // Marker is inside a closing tag — just replace the marker
        html = html.substring(0, markerStart) + fallback + html.substring(markerEnd);
        converted++;
        markerRe.lastIndex = markerStart + fallback.length;
        continue;
      }

      // Find where the opening tag ends (the '>' character)
      const tagEnd = beforeMarker.lastIndexOf('>');
      // The tag is from lastLt to tagEnd (inclusive)
      const tagContent = html.substring(lastLt, tagEnd + 1);
      const afterTag = html.substring(tagEnd + 1);

      // Check if tag already has data-content
      if (tagContent.includes(' data-content=')) {
        // Already has it — just replace marker with fallback text
        html = html.substring(0, markerStart) + fallback + html.substring(markerEnd);
        converted++;
        markerRe.lastIndex = markerStart + fallback.length;
        continue;
      }

      // Add data-content attribute to the opening tag
      // Insert before the closing '>' of the tag
      const insertion = ` data-content="${pathStr}"`;
      const newTag = tagContent.substring(0, tagContent.length - 1) + insertion + '>';

      // Replace marker with fallback text
      const afterMarker = html.substring(markerEnd);
      html = html.substring(0, markerStart) + fallback + afterMarker;

      // Reconstruct: before tag + modified tag + everything after
      const tagInsertionEnd = tagEnd + insertion.length;
      html = html.substring(0, lastLt) + newTag + html.substring(lastLt + tagContent.length);

      // Since we modified the HTML, reset the regex
      markerRe.lastIndex = lastLt + newTag.length + fallback.length;
      converted++;
    }

    if (converted > 0) {
      fs.writeFileSync(fp, html, 'utf8');
      console.log(`  ${file} — ${converted} markers → data-content`);
      totalConverted += converted;
    }
  }

  console.log(`\n✅ Done: ${totalConverted} markers converted to data-content attributes`);
}

main();
