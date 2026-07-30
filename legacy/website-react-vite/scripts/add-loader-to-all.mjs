import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve('weebly-theme');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of files) {
  const fp = path.join(dir, file);
  let html = fs.readFileSync(fp, 'utf8');

  // If content-loader.js already present, skip
  if (html.includes('content-loader.js')) {
    console.log(`Already has loader: ${file}`);
    continue;
  }

  // Fix broken HTML structure: </body></html><script>...</script> -> move script inside
  html = html.replace(
    /<\/body>\s*<\/html>\s*<script>([\s\S]*?)<\/script>\s*$/,
    '<script>$1</script>\n</body>\n</html>'
  );

  // Add content-loader.js before </body>
  html = html.replace('</body>', '<script src="content-loader.js"></script>\n</body>');

  fs.writeFileSync(fp, html, 'utf8');
  console.log(`Updated: ${file}`);
}

console.log('Done');
