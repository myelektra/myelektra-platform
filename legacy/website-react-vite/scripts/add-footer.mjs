#!/usr/bin/env node
// Inject footer into weebly-theme HTML files that lack one.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'weebly-theme');

const footer = `\n<!-- ========== FOOTER ========== -->\n<footer class="site-footer">\n  <div class="container">\n    <div class="footer-grid">\n      <!-- Brand -->\n      <div>\n        <a href="index.html" style="display:flex;align-items:center;gap:8px;margin-bottom:16px">\n          <img src="logo-myelektra.png" alt="Myelektra" class="logo-img" />\n          <span class="footer-logo-text"><span style="color:#fff">myelektra</span><span style="color:#1877F2">.com</span></span>\n        </a>\n        <p style="color:var(--teal);font-size:14px;font-weight:600;margin-bottom:4px">AI-Powered Revenue Growth Partner</p>\n        <p style="color:rgba(232,236,241,0.6);font-size:14px;margin-bottom:16px">We Build Revenue Systems, Not Just Lead Lists.</p>\n        <div style="color:rgba(232,236,241,0.6);font-size:12px;line-height:1.6;margin-bottom:16px">\n          <p style="font-weight:600;color:rgba(232,236,241,0.7)">Corporate Office</p>\n          <p>38th Floor, 88 Office</p>\n          <p>Kota Kasablanka, South Jakarta</p>\n          <p>Indonesia</p>\n        </div>\n        <div style="display:flex;gap:12px">\n          <a href="https://www.linkedin.com/company/3560717" target="_blank" rel="noopener noreferrer" style="color:rgba(232,236,241,0.6);transition:color 0.2s" aria-label="LinkedIn"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>\n          <a href="https://www.instagram.com/myelektra/" target="_blank" rel="noopener noreferrer" style="color:rgba(232,236,241,0.6);transition:color 0.2s" aria-label="Instagram"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>\n        </div>\n      </div>\n      <!-- Solutions -->\n      <div>\n        <h4 class="footer-heading">Solutions</h4>\n        <a href="solution-revenue-intelligence.html" class="footer-link">Revenue Intelligence</a>\n        <a href="solution-pipeline-builder.html" class="footer-link">Pipeline Builder</a>\n        <a href="solution-revenue-engine.html" class="footer-link">Revenue Engine</a>\n        <a href="solution-ai-sales-transformation.html" class="footer-link">AI Sales Transformation</a>\n        <a href="solution-fractional-revenue-office.html" class="footer-link">Fractional Revenue Office</a>\n      </div>\n      <!-- Company -->\n      <div>\n        <h4 class="footer-heading">Company</h4>\n        <a href="about.html" class="footer-link">About</a>\n        <a href="industries.html" class="footer-link">Industries</a>\n        <a href="how-it-works.html" class="footer-link">How It Works</a>\n        <a href="academy.html" class="footer-link">Academy</a>\n      </div>\n      <!-- Contact -->\n      <div>\n        <h4 class="footer-heading">Contact</h4>\n        <a href="consultation.html" style="display:block;font-size:14px;color:var(--teal);font-weight:500;padding:4px 0">Book an Online Meeting →</a>\n      </div>\n    </div>\n    <div class="footer-divider">\n      <p class="footer-disclaimer">Meetings and revenue outcomes are not guaranteed. Results depend on market conditions, offer relevance, buyer readiness, domain reputation, and the client's sales process.</p>\n      <p class="footer-copy">© 2025 Myelektra.com. All rights reserved.</p>\n    </div>\n  </div>\n</footer>\n`;

let added = 0;
for (const f of readdirSync(dir).filter((n) => n.endsWith('.html'))) {
  const p = join(dir, f);
  const html = readFileSync(p, 'utf8');
  if (html.includes('site-footer')) {
    console.log(`  ${f}: already has footer, skip`);
    continue;
  }
  // Insert before first <script> or before </body>
  const idx = html.indexOf('<script>');
  if (idx === -1) {
    console.log(`  ${f}: no <script> found, skip`);
    continue;
  }
  const next = html.slice(0, idx) + footer + '\n' + html.slice(idx);
  writeFileSync(p, next);
  added++;
  console.log(`  ${f}: footer injected`);
}
console.log(`done — ${added} files updated`);
