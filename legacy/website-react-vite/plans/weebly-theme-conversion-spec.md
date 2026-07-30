# Weebly Theme Conversion Spec — MyElektra 2026 Theme

> **File:** `plans/weebly-theme-conversion-spec.md`
> **Status:** Draft
> **Created:** 2026-07-28
> **Source:** React SPA → Weebly CMS-compatible theme

---

## 1. Executive Summary

Convert the Myelektra.com React SPA (Vite + Tailwind CSS v4 + TypeScript) into a fully standards-compliant **Weebly Theme** that passes Weebly's theme upload validator, supports Weebly Editor content editing via `{tag}` system, and preserves all visual design, interactivity, and responsive behavior of the original site.

**Output folder:** `weebly-theme/` (replaces existing deleted folder)

---

## 2. Theme Identity

| Field | Value |
|---|---|
| **Theme Name** | MyElektra 2026 Theme |
| **Version** | 1.0.0 |
| **Author** | Myelektra |
| **Description** | AI-Powered Revenue Growth Partner — A complete custom theme for Myelektra.com with all sections editable via Weebly Editor. |
| **Design Style** | Clean SaaS aesthetic, dark hero + alternating light/dark sections, gradient accents, card-based layouts |
| **Target Pages** | 11 pages + 1 template page |
| **Responsive** | Yes (mobile-first) |

---

## 3. Architecture Overview

### 3.1 Weebly Template Layout

All pages use the **no-header** template type (no banner area). The structure follows the Weebly Mustache-based template system:

```
no-header.html  (layout template)
  ├── {logo}          ← Weebly logo tag
  ├── {menu}          ← Weebly navigation tag (multi-level)
  ├── {search}        ← Optional (included for completeness)
  ├── {minicart}      ← Optional (included for completeness)
  ├── {{#sections}}   ← Weebly sections loop
  │   └── {content}   ← Each section content
  └── {footer}        ← Weebly footer tag
```

### 3.2 File Structure

```
weebly-theme/
├── theme.xml                    ← Theme manifest (required by Weebly)
├── no-header.html               ← Layout template (all pages use this)
├── main_style.css               ← All CSS (plain CSS, no Less)
├── assets/
│   ├── custom.js                ← Weebly custom JS (scroll, marquee, CTA, cookie)
│   └── plugins.js               ← Third-party JS (minimal, if needed)
├── images/
│   └── default_header.jpg       ← Fallback hero background
├── partials/
│   ├── navigation/
│   │   ├── list.tpl             ← Weebly nav structure
│   │   └── item.tpl             ← Individual nav item
│   └── search/
│       └── header.tpl           ← Search form template (minimal)
├── *.html                       ← 12 page files (see Section 4)
└── manifest.json                ← Layout definitions for Weebly Editor
```

### 3.3 No Less/Preprocessor

Plain CSS only. No Less, SCSS, or other preprocessors. All theming via CSS custom properties (same as current `main_style.css`). No color palette variations in manifest.json since Myelektra has a fixed brand identity.

---

## 4. Pages & Layout Mapping

All pages use `no-header.html` as their template. The `manifest.json` defines each page as a separate layout for the Weebly Editor.

| # | Layout Key | Page Name | File | Notes |
|---|---|---|---|---|
| 1 | `default` | Homepage | `index.html` | Default page layout |
| 2 | `solutions` | Solutions | `solutions.html` | All 5 solutions listed |
| 3 | `solution-revenue-intelligence` | Revenue Intelligence | `solution-revenue-intelligence.html` | Detail page |
| 4 | `solution-pipeline-builder` | Pipeline Builder | `solution-pipeline-builder.html` | Detail page |
| 5 | `solution-revenue-engine` | Revenue Engine | `solution-revenue-engine.html` | Detail page |
| 6 | `solution-ai-sales-transformation` | AI Sales Transformation | `solution-ai-sales-transformation.html` | Detail page |
| 7 | `solution-fractional-revenue-office` | Fractional Revenue Office | `solution-fractional-revenue-office.html` | Detail page |
| 8 | `industries` | Industries | `industries.html` | 5 industries |
| 9 | `how-it-works` | How It Works | `how-it-works.html` | 8-step process |
| 10 | `pricing` | Pricing | `pricing.html` | 5 pricing cards + comparison |
| 11 | `academy` | Academy | `academy.html` | 10 training topics |
| 12 | `about` | About | `about.html` | Company story |
| 13 | `consultation` | Book Consultation | `consultation.html` | HubSpot Meetings embed |
| 14 | `get-quote` | Get Quote | `get-quote-here-new.html` | HubSpot Form embed |
| 15 | `contact` | Contact Us | `contact-new.html` | Office info, map |
| 16 | `template` | Template (Editor) | `template.html` | Empty page for Weebly Editor |

---

## 5. Weebly Tag Usage

### 5.1 Required Tags in Layout Template

| Tag | Location | Purpose |
|---|---|---|
| `{logo}` | `<div id="sitename">` in header | Weebly handles logo upload |
| `{menu}` | `<div id="navigation">` | Multi-level navigation (uses partials) |
| `{menu}` | `<div id="navmobile" class="nav">` | Mobile navigation |
| `{search}` | Optional in header | Weebly search (can be hidden via CSS) |
| `{minicart}` | Optional in header | Weebly cart (can be hidden via CSS) |
| `{{#sections}}...{{/sections}}` | Main content area | Each visual section wrapped |
| `{content}` | Within sections loop | Editable content per section |
| `{footer}` | Footer area | Editable footer content |

### 5.2 Navigation Partials

Since we chose **Weebly Built-in Menu**, we include navigation partials:

- `partials/navigation/list.tpl` — Main `<ul>` structure with `.wsite-menu-default` class
- `partials/navigation/item.tpl` — Individual `<li>` item with dropdown/flyout support
- `partials/navigation/flyout/list.tpl` — Flyout submenu structure
- `partials/navigation/flyout/item.tpl` — Flyout submenu items

The navigation structure supports the full 2-level depth:
```
Level 1: Home | Solutions ▾ | Industries | Pricing | Academy | About | Contact Us ▾
Level 2: Revenue Intelligence, Pipeline Builder, Revenue Engine, AI Sales Transformation, Fractional Revenue Office
Level 2 (Contact): Get Quote Here, Book Online Meeting
```

### 5.3 Partial Files to Include

| Partial | Included? | Reason |
|---|---|---|
| `partials/navigation/` files | ✅ Yes | Required for `{menu}` to work |
| `partials/search/header.tpl` | ✅ Yes | Required for `{search}` to work |
| `partials/blog/` | ❌ No | No blog features |
| `partials/commerce/` | ❌ No | No store features |
| `partials/membership/` | ❌ No | No membership features |

---

## 6. Section Structure (per page)

Each page is divided into multiple Weebly sections using `{{#sections}}`. Each section contains its content in `{content}` tags. This allows Weebly Editor users to see each section as a separate editable block.

### 6.1 Homepage Sections (10 sections)

| # | Section Name | Background | Content Type |
|---|---|---|---|
| 1 | Hero | Dark (#fff bg + video overlay) | Video bg, badge, h1, subtitle, 2 CTAs |
| 2 | Client Logos | Light (var--bg-light) | Marquee carousel with 41 logos |
| 3 | The Journey | White | Label, h2, intro, 5 cards |
| 4 | Achievements | Gray (#F7F9FC) | h2, divider, 5 cards |
| 5 | Solutions Overview | Dark (Royal Blue #0052CC) | h2, divider, 5 solution cards |
| 6 | Country Targeting | Gray | h2, intro, 7 country cards |
| 7 | Industries | White | h2, divider, 5 industry cards |
| 8 | Why Myelektra | Dark (Royal Blue) | h2, divider, 6 differentiator cards |
| 9 | Academy Teaser | Gradient (blue→teal) | Icon, h2, sub, description, pricing badges, CTA |
| 10 | Final CTA | Dark (#0B1120) | h2, body, subheadline, subbody, CTA |

### 6.2 Other Pages

Each page follows a similar pattern: **Page Hero** (light gray bg) → **Content Sections** → **CTA Section**.

---

## 7. Global UI Elements

### 7.1 Header (in layout template)

- Sticky/fixed top bar, always white bg
- Bottom border always visible
- Subtle box-shadow on scroll via `.scrolled` class
- Weebly `{logo}` for logo
- Weebly `{menu}` for desktop nav
- Custom hamburger button for mobile (vanilla JS toggle)
- CTA "Book an Online Meeting" button (custom HTML next to Weebly menu)

### 7.2 Footer (in layout template)

- Fixed HTML (not Weebly `{footer}` tag for this theme since we have custom 4-column layout)
- 4-column grid: Brand, Solutions, Company, Contact
- Includes disclaimer and copyright
- Social icons (LinkedIn, Instagram)

### 7.3 Floating CTA (HTML in footer)

- Fixed bottom bar, appears after 600px scroll
- Dismissible via close button
- Vanilla JS controls visibility

### 7.4 Back-to-Top Button (HTML in footer)

- Fixed bottom-right, appears after 500px scroll
- Smooth scroll to top on click

### 7.5 Cookie Banner (HTML in footer)

- Appears after 2s delay if not previously dismissed
- Stored in localStorage
- Accept + Learn More buttons

### 7.6 Scroll Animations (inline in layout template)

- IIFE using IntersectionObserver
- Observes `.anim` and `.anim-slide` elements
- Adds `.visible` class when in viewport
- Stagger delays via `.delay-1` through `.delay-8` classes

---

## 8. Content Management (Dual System)

### 8.1 Weebly Editor Sections

Each page's sections are wrapped in `{{#sections}}...{{/sections}}` with `{content}` inside, making text and images editable via the Weebly Editor. Weebly Editor users can:
- Click any section content to edit text
- Add/remove sections using Weebly's section manager
- Reorder sections by dragging

### 8.2 Runtime Content Loader (Preserved)

The existing inline content-loader script is preserved. It:
1. Fetches `https://cms.myelektra.com/api/config?cb=` + timestamp
2. Parses the JSON response
3. Injects text into elements with `data-content` attributes
4. Falls back gracefully if API is unavailable

This means:
- **Weebly Editor** can override text directly
- **CMS API** can push text updates at runtime
- If both are set, Weebly Editor text takes priority (since it's rendered server-side)

### 8.3 Data Attributes

All text elements carry `data-content="path.to.key"` attributes for content-loader injection:
```html
<h1 data-content="homepage.hero.headline">We Build Revenue Systems, Not Just Lead Lists.</h1>
```

The headline split for gradient text uses `data-content-headline` and `data-content-highlight` attributes on separate elements.

---

## 9. CSS Architecture

### 9.1 File: `main_style.css`

Single CSS file with all styles. Structure:

```
1. CSS Custom Properties (:root)
2. Reset & Base
3. Utility classes
4. Header / Navigation (sticky, dropdown, mobile)
5. Hero Section (video bg, overlay, orbs, content)
6. Buttons (.btn, .btn-primary, .btn-outline, etc.)
7. Cards (.card, .card-dark, .solution-card, .country-card)
8. Grid layouts (.grid-2, .grid-3, .grid-4, .grid-5)
9. Section headings
10. Timeline / Process Steps
11. Page Hero
12. Footer
13. Marquee
14. Floating CTA
15. Back to Top
16. Cookie Banner
17. Forms
18. Filter bar, Comparison table, Persona tags
19. Sidebar (consultation page)
20. Academy cards
21. Scroll animations (.anim, .anim-slide, delays)
22. Responsive breakpoints
```

### 9.2 CSS Loading Order

```html
<link rel="stylesheet" href="https://cms.myelektra.com/api/css" />
<link rel="stylesheet" href="main_style.css" />
```

CMS API CSS loads first (base styles), `main_style.css` overrides (latest changes).

### 9.3 Color System

CSS custom properties only:
```css
:root {
  --navy: #0F1B2D;
  --navy-dark: #0B1120;
  --blue: #1A73E8;
  --blue-hover: #1558B0;
  --teal: #1877F2;
  --teal-hover: #1558B0;
  --gold: #FFB800;
  --bg-light: #F7F9FC;
  --text-primary: #1A1A2E;
  --text-secondary: #6B7280;
  --text-dark: #E8ECF1;
  --border: #E2E8F0;
}
```

---

## 10. JavaScript Architecture

### 10.1 File: `assets/custom.js`

Contains all custom vanilla JS. No React, no jQuery. Structure:

```javascript
// ===== MyElektra Theme JS =====

// 1. Scroll header — toggle .scrolled class on #site-header
// 2. Hamburger menu — toggle .open on #mobile-menu, lock body scroll, Escape key
// 3. Mobile solutions submenu — toggle display of #mobile-solutions-menu
// 4. Scroll reveal — IntersectionObserver for .anim, .anim-slide → .visible
// 5. Floating CTA — show/hide after 600px, dismiss button
// 6. Back-to-top — show/hide after 500px, smooth scroll
// 7. Cookie banner — show after 2s, localStorage dismissal
// 8. Marquee — requestAnimationFrame marquee for client logos
// 9. Hero video — ensure autoplay on mobile
```

### 10.2 Marquee Animation

Uses `requestAnimationFrame` (not CSS `@keyframes`) to avoid Weebly CSS minifier bug (strips `0%` from keyframes). Implementation:

```javascript
function initMarquee() {
  const el = document.querySelector('.marquee-track');
  if (!el) return;
  const half = el.scrollWidth / 2;
  let offset = 0, frame;
  function tick() {
    offset -= 0.6;
    if (offset <= -half) offset += half;
    el.style.transform = 'translateX(' + offset + 'px)';
    frame = requestAnimationFrame(tick);
  }
  function stop() { cancelAnimationFrame(frame); }
  function start() { stop(); tick(); }
  el.addEventListener('mouseenter', stop);
  el.addEventListener('mouseleave', start);
  start();
}
```

### 10.3 HubSpot Integrations (Per-Page)

- **Consultation page:** Include HubSpot Meetings script inline:
  ```html
  <script type="text/javascript" src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"></script>
  ```
  Container: `class="meetings-iframe-container"` with `data-src` attribute.

- **Get Quote page:** Include HubSpot Forms script inline:
  ```html
  <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/shell.js"></script>
  ```
  Container: `<div id="hubspot-form"></div>` with `hbspt.forms.create({...})`.

---

## 11. SEO & Metadata

### 11.1 Per-Page Meta Tags (in each page's `<head>`)

```html
<meta name="description" content="..." />
<link rel="canonical" href="https://myelektra.com/..." />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://myelektra.com/..." />
<meta property="og:image" content="https://myelektra.com/logo-myelektra.png" />
<meta property="og:site_name" content="Myelektra" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
```

### 11.2 JSON-LD Schema (per page type)

Maintain existing schema from current theme:

| Page | Schema Type |
|---|---|
| index.html | Organization |
| about.html | AboutPage (sub: Organization) |
| academy.html | Course (provider: Organization) |
| consultation.html | Service |
| how-it-works.html | HowTo |
| industries.html | WebPage |
| pricing.html | WebPage |
| solutions.html | ItemList (5 ListItems) |
| Each solution page | Service (provider: Organization) |

### 11.3 Google Analytics

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-BLF912YLHH"></script>
<script>window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-BLF912YLHH');</script>
```

Injected in `<head>` of every page.

---

## 12. Font Loading

Google Fonts loaded in all pages:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
```

---

## 13. Key Design Differences from React → Weebly

| Aspect | React SPA | Weebly Theme |
|---|---|---|
| Routing | HashRouter (React Router) | Static HTML files per page |
| Data | content-config.json → content.ts | Inline HTML + data-content attributes |
| Animations | React intersection hooks | Vanilla JS IntersectionObserver |
| Marquee | React ref + requestAnimationFrame | Vanilla JS + requestAnimationFrame |
| Header dropdowns | React useState hover/toggle | CSS :hover + JS toggle for mobile |
| Icons | React SVG components | Inline SVG in HTML |
| Price links | React PriceDisplay component | Direct `<a>` tags in HTML |
| Build | Vite + TypeScript + Tailwind | No build step |
| Forms | React controlled components | HubSpot iframe/embed (static) |

---

## 14. Page-by-Page Section Breakdown

### 14.1 Homepage (`index.html`)
**10 sections** (see 6.1)

### 14.2 Solutions (`solutions.html`)
**3 sections:**
1. Page Hero (light gray) — h1 + subtitle
2. Solutions Detail — 5 expanded cards with icon, name, price, description, features, "Best For" box, CTA
3. CTA Section — h2 + body + button

### 14.3 Solution Detail Pages (5 files)
**5 sections:**
1. Breadcrumb + Hero — icon, name, price, description, CTA
2. What's Included — feature list with checkmarks + "Best For" sidebar
3. How It Works — 3-4 process step cards
4. CTA Section — dark bg
5. Related Solutions — 4 other solutions grid

### 14.4 Industries (`industries.html`)
**3 sections:**
1. Page Hero
2. Industries Detail — 5 industry blocks with personas
3. CTA Section

### 14.5 How It Works (`how-it-works.html`)
**4 sections:**
1. Page Hero
2. Timeline — 8-step vertical timeline with gradient dots
3. Summary Visual — chip flow 01→02→...→08
4. CTA Section

### 14.6 Pricing (`pricing.html`)
**5 sections:**
1. Page Hero
2. Pricing Cards — 5 cards with price, features, CTA
3. Comparison Table — 8 features × 5 solutions
4. Disclaimer Box
5. CTA Section

### 14.7 Academy (`academy.html`)
**4 sections:**
1. Page Hero — with GradCap icon + subheadline
2. Training Topics — 10 numbered cards
3. Academy Pricing — Public Classes + Corporate Training cards
4. CTA Section

### 14.8 About (`about.html`)
**5 sections:**
1. Page Hero
2. Our Story — 2-column (text + stats sidebar)
3. Founder — photo + name + social links
4. Why Myelektra — 6 differentiator cards
5. Our Mission — dark bg with quote + CTA

### 14.9 Consultation (`consultation.html`)
**2 sections:**
1. Page Hero
2. Schedule — sidebar (What to Expect + Quick Links) + HubSpot Meetings embed

### 14.10 Get Quote (`get-quote-here-new.html`)
**2 sections:**
1. Page Hero
2. Form — sidebar (What You'll Get) + HubSpot Form embed

### 14.11 Contact (`contact-new.html`)
**2 sections:**
1. Page Hero
2. Contact Info — office address, phone, hours, CTAs, Google Maps embed

---

## 15. Implementation Notes & Constraints

### 15.1 Weebly Validation Requirements
- `theme.xml` must include `<title>`, `<author>`, `<description>`, `<thumbnail>` elements
- All partial files must have valid syntax
- No external dependencies except Google Fonts
- Total theme size < 500KB (excluding images)

### 15.2 Weebly CSS Minifier Bug
- Do NOT use CSS `@keyframes` for marquee animation
- Use `requestAnimationFrame` (vanilla JS) instead
- Document this issue in comments

### 15.3 React Components Not Converted
- `ScrollAnimations.tsx` → Converted to vanilla JS
- `ScrollReveal.tsx` → Converted to inline IIFE
- `PriceDisplay.tsx` → Converted to inline `<a>` links
- `Icons.tsx` → Converted to inline SVG in HTML
- All page components → Converted to static HTML sections

### 15.4 HubSpot Embed Notes
- Consultation: Meetings embed via `MeetingsEmbedCode.js`
- Get Quote: Form embed via `js.hsforms.net/forms/shell.js`
- Both scripts loaded per-page (not globally)

### 15.5 Image Assets
- Logo: `https://files.catbox.moe/ih1ryw.png` (catbox CDN)
- Hero video: `https://assets.mixkit.co/videos/46446/46446-720.mp4` (Mixkit)
- Founder photo: LinkedIn CDN URL
- Client logos: All via catbox.moe CDN

---

## 16. `theme.xml` Structure

```xml
<?xml version="1.0"?>
<theme>
  <title>MyElektra 2026 Theme</title>
  <version>1.0</version>
  <author>Myelektra</author>
  <description>AI-Powered Revenue Growth Partner — Complete custom theme for Myelektra.com.</description>
  <thumbnail>images/default_header.jpg</thumbnail>
  <supported-pages>
    <page>no-header</page>
  </supported-pages>
  <files>
    <file>no-header.html</file>
    <file>main_style.css</file>
    <file>assets/custom.js</file>
    <file>assets/plugins.js</file>
    <file>images/default_header.jpg</file>
    <file>manifest.json</file>
  </files>
  <features>
    <feature>responsive</feature>
    <feature>css-buttons</feature>
    <feature>social-icons</feature>
    <feature>navigation-top</feature>
  </features>
</theme>
```

---

## 17. `manifest.json` Structure

```json
{
  "responsive": true,
  "glyph-icons": true,
  "enableEditorJS": true,
  "description": "AI-Powered Revenue Growth Partner — Complete custom theme for Myelektra.com.",
  "features": [
    "responsive",
    "css-buttons",
    "social-icons",
    "navigation-top"
  ],
  "layouts": {
    "default": {
      "name": "Homepage",
      "default": true,
      "file": "index.html"
    },
    "solutions": {
      "name": "Solutions",
      "file": "solutions.html"
    },
    "solution-revenue-intelligence": {
      "name": "Revenue Intelligence",
      "file": "solution-revenue-intelligence.html"
    },
    "solution-pipeline-builder": {
      "name": "Pipeline Builder",
      "file": "solution-pipeline-builder.html"
    },
    "solution-revenue-engine": {
      "name": "Revenue Engine",
      "file": "solution-revenue-engine.html"
    },
    "solution-ai-sales-transformation": {
      "name": "AI Sales Transformation",
      "file": "solution-ai-sales-transformation.html"
    },
    "solution-fractional-revenue-office": {
      "name": "Fractional Revenue Office",
      "file": "solution-fractional-revenue-office.html"
    },
    "industries": {
      "name": "Industries",
      "file": "industries.html"
    },
    "how-it-works": {
      "name": "How It Works",
      "file": "how-it-works.html"
    },
    "pricing": {
      "name": "Pricing",
      "file": "pricing.html"
    },
    "academy": {
      "name": "Myelektra Academy",
      "file": "academy.html"
    },
    "about": {
      "name": "About",
      "file": "about.html"
    },
    "consultation": {
      "name": "Book Consultation",
      "file": "consultation.html"
    },
    "get-quote": {
      "name": "Get Quote",
      "file": "get-quote-here-new.html"
    },
    "contact": {
      "name": "Contact Us",
      "file": "contact-new.html"
    },
    "template": {
      "name": "Template (Editor)",
      "file": "template.html"
    }
  }
}
```

---

## 18. Implementation Steps (for execution phase)

1. **Create `theme.xml`** — theme declaration with file references
2. **Create `no-header.html`** — layout template with Weebly tags
3. **Create navigation partials** — `list.tpl`, `item.tpl`, `flyout/list.tpl`, `flyout/item.tpl`
4. **Create `main_style.css`** — full CSS (migrated from existing)
5. **Create `assets/custom.js`** — all vanilla JS functionality
6. **Create `index.html`** — homepage with 10 sections
7. **Create `solutions.html`** — solutions listing page
8. **Create 5 solution detail pages** — one per solution
9. **Create `industries.html`** — industries page
10. **Create `how-it-works.html`** — process timeline page
11. **Create `pricing.html`** — pricing with comparison table
12. **Create `academy.html`** — academy page
13. **Create `about.html`** — about page
14. **Create `consultation.html`** — HubSpot Meetings embed
15. **Create `get-quote-here-new.html`** — HubSpot Form embed
16. **Create `contact-new.html`** — contact page
17. **Create `template.html`** — empty editor template
18. **Create `manifest.json`** — layout definitions
19. **Create `images/`** — placeholder hero background
20. **Validate** — check Weebly upload compatibility

---

## 19. Open Questions / Future Considerations

- [ ] Should we auto-generate pages from content-config.json using a build script?
- [ ] Should the `template.html` have a specific layout (e.g., minimal structure for new pages)?
- [ ] How to handle the hero video in Weebly (autoplay behavior on iOS Safari)?
- [ ] Should we add `prefers-reduced-motion` support for scroll animations?
- [ ] Accessibility audit needed before final release?
