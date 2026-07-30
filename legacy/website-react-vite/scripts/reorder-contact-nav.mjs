import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const themeDir = 'weebly-theme';
const files = readdirSync(themeDir).filter(f => f.endsWith('.html') && f !== 'contact-new.html');

// Exact Contact Us dropdown HTML (same across all files)
const contactDropdown = '<div class="nav-dropdown"><a href="contact.html" class="nav-link">Contact Us <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg></a><div class="nav-dropdown-menu"><a href="get-quote-here-new.html" class="dropdown-item">Get Quote Here <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></a><a href="book-online-meeting-new.html" class="dropdown-item">Book Online Meeting <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></a></div></div>';

const contactDropdownNew = contactDropdown.replace('href="contact.html"', 'href="contact-new.html"');

// Mobile links to move
const mobileContactLinks = '\n<a href="get-quote-here-new.html" class="mobile-nav-link">Get Quote Here</a>\n<a href="book-online-meeting-new.html" class="mobile-nav-link">Book Online Meeting</a>';

let count = 0;

for (const file of files) {
  const fp = join(themeDir, file);
  let html = readFileSync(fp, 'utf-8');
  const original = html;

  // 1. Replace contact.html -> contact-new.html in all hrefs
  html = html.replace(/href="contact\.html"/g, 'href="contact-new.html"');

  // 2. Move desktop dropdown: remove from after Industries, insert after About
  const industriesLink = '<a href="industries.html" class="nav-link">Industries</a>';
  const pricingLink = '<a href="pricing.html" class="nav-link">Pricing</a>';

  // Build the old block: Industries + dropdown + Pricing (without any spaces)
  // The actual pattern is: Industries</a><dropdown><any whitespace><Pricing
  // We need to find the dropdown AFTER Industries and BEFORE Pricing
  const indIdx = html.indexOf(industriesLink);
  if (indIdx !== -1) {
    const afterIndustries = indIdx + industriesLink.length;
    const pricingIdx = html.indexOf(pricingLink);
    if (pricingIdx !== -1 && pricingIdx > afterIndustries) {
      // Find the dropdown in between
      const between = html.substring(afterIndustries, pricingIdx);
      const dropdownIdx = between.indexOf(contactDropdownNew);
      if (dropdownIdx !== -1) {
        const beforeDropdown = between.substring(0, dropdownIdx);
        const afterDropdown = between.substring(dropdownIdx + contactDropdownNew.length);
        // Remove dropdown from between Industries and Pricing
        const newBetween = beforeDropdown + afterDropdown;
        html = html.substring(0, afterIndustries) + newBetween + html.substring(pricingIdx);

        // Insert dropdown after About link
        const aboutLink = '<a href="about.html" class="nav-link">About</a>';
        const aboutIdx = html.indexOf(aboutLink);
        if (aboutIdx !== -1) {
          const afterAbout = aboutIdx + aboutLink.length;
          html = html.substring(0, afterAbout) + contactDropdownNew + html.substring(afterAbout);
        }
      }
    }
  }

  // 3. Move mobile links
  if (html.includes(mobileContactLinks)) {
    const removed = html.replace(mobileContactLinks, '');
    const aboutMobile = '<a href="about.html" class="mobile-nav-link">About</a>';
    const aboutMobileIdx = removed.indexOf(aboutMobile);
    if (aboutMobileIdx !== -1) {
      const afterAboutMobile = aboutMobileIdx + aboutMobile.length;
      html = removed.substring(0, afterAboutMobile) + mobileContactLinks + removed.substring(afterAboutMobile);
    }
  }

  if (html !== original) {
    writeFileSync(fp, html, 'utf-8');
    console.log(`✓ ${file}`);
    count++;
  } else {
    console.log(`- ${file} (no changes)`);
  }
}
console.log(`\nDone. ${count} files updated.`);
