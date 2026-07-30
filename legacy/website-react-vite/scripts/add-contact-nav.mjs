import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const themeDir = 'weebly-theme';
const files = readdirSync(themeDir).filter(f => f.endsWith('.html') && f !== 'get-quote-here-new.html' && f !== 'book-online-meeting-new.html');

const desktopDropdown = `<div class="nav-dropdown"><a href="contact.html" class="nav-link">Contact Us <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></a><div class="nav-dropdown-menu"><a href="get-quote-here-new.html" class="dropdown-item">Get Quote Here <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></a><a href="book-online-meeting-new.html" class="dropdown-item">Book Online Meeting <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></a></div></div>`;

const mobileLinks = `<a href="get-quote-here-new.html" class="mobile-nav-link">Get Quote Here</a>\n<a href="book-online-meeting-new.html" class="mobile-nav-link">Book Online Meeting</a>`;

let count = 0;

for (const file of files) {
  const fp = join(themeDir, file);
  let html = readFileSync(fp, 'utf-8');
  const original = html;

  // 1. Desktop nav: insert Contact Us dropdown after Industries link
  // Pattern: Industries</a> then either </nav> or <a href="pricing..."/<a href="how-it-works..."
  // Safer: replace <a href="industries.html" class="nav-link">Industries</a>
  // with itself + Contact Us dropdown
  html = html.replace(
    /<a href="industries\.html" class="nav-link(?: active-teal)?">Industries<\/a>/,
    (match) => match + desktopDropdown
  );

  // 2. Mobile nav: insert two links after Industries mobile link
  html = html.replace(
    /<a href="industries\.html" class="mobile-nav-link(?: active)?">Industries<\/a>/,
    (match) => match + '\n' + mobileLinks
  );

  // 3. Add contact links to footer Contact column
  // Insert before "Book an Online Meeting" link in footer
  html = html.replace(
    /(<a href="consultation\.html" style="display:block;font-size:14px;color:var\(--teal\).*?<\/a>)/,
    `<a href="get-quote-here-new.html" style="display:block;font-size:14px;color:rgba(232,236,241,0.6);text-decoration:none;padding:4px 0">Get Quote Here</a>\n        <a href="book-online-meeting-new.html" style="display:block;font-size:14px;color:rgba(232,236,241,0.6);text-decoration:none;padding:4px 0">Book Online Meeting</a>\n        $1`
  );

  if (html !== original) {
    writeFileSync(fp, html, 'utf-8');
    console.log(`✓ ${file}`);
    count++;
  } else {
    console.log(`- ${file} (no changes)`);
  }
}
console.log(`\nDone. ${count} files updated.`);
