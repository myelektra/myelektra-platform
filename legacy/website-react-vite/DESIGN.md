# DESIGN.md — Myelektra Weebly Theme

## Architecture

### Dual Output Strategy
Single source of truth (React/Vite) generates modern web app.
Weebly theme is independently maintained static HTML — manually synced.

**Why not SSR/SSG:** Weebly requires static HTML upload. React build uses `vite-plugin-singlefile` to inline all CSS/JS into one HTML for the web version.

### Theme Structure (Weebly)
Simple custom theme format (not Developer Theme):
- `index.html` — main template (all sections inline)
- `main_style.css` — all styles (loaded AFTER CMS API CSS to override)
- `manifest.json` — theme metadata (16 layout definitions)
- No subdirectories in zip (Weebly ignores subfolders)
- 16 HTML pages total (including template.html, not counting client_* image files)
- Google Analytics (G-BLF912YLHH) inline di `<head>` semua halaman
- Content-loader inline script fetch config dari CMS dan inject ke `data-content` elements
- CSS loading order: `https://cms.myelektra.com/api/css` (base) → `main_style.css` (override)
- Semua halaman link ke `main_style.css` secara lokal (tidak hanya CMS API)

## Navigation

### Desktop Nav Order
`Home → Solutions (dropdown) → Industries → Pricing → Academy → About → Contact Us (dropdown)`

### Contact Us Dropdown
- **Get Quote Here** → `get-quote-here-new.html` (HubSpot form)
- **Book Online Meeting** → `consultation.html` (HubSpot Meetings)

### How It Works
Hidden from all nav menus (desktop & mobile). Page remains accessible via direct URL.

### Header
- Sticky/fixed top bar
- Background putih dari awal (`background: #fff`), bukan transparan
- Border-bottom selalu ada (`1px solid var(--border)`)
- Box-shadow muncul pas scroll (>20px) via `.site-header.scrolled`
- Logo: PNG dari catbox + text "myelektra.com" (flex baseline)

### Mobile Nav
- Solutions pake accordion toggle (button `#mobile-solutions-toggle` + submenu `#mobile-solutions-menu`)
- 5 sub-items: Revenue Intelligence, Pipeline Builder, Revenue Engine, AI Sales Transformation, Fractional Revenue Office
- Contact Us items sebagai flat link setelah About
- JS toggle handler di inline script

## Color Palette (Actual — from main_style.css)

| Variable | Value | Usage |
|----------|-------|-------|
| `--navy` | `#0F1B2D` | Text headings, dark accents |
| `--navy-dark` | `#0B1120` | Near-black, footer bg |
| `--blue` | `#1A73E8` | Buttons secondary, gradient |
| `--blue-hover` | `#1558B0` | Button hover |
| `--teal` | `#1877F2` | Primary CTA, active links, icons (**actual color: blue, not green**) |
| `--teal-hover` | `#1558B0` | CTA hover |
| `--bg-light` | `#F7F9FC` | Gray section backgrounds |
| `--bg-dark` | `#0B1120` | Footer bg |
| `--bg-hero-lightgray` | `#F0F2F5` | **Hero background (light/bright)** |
| `--text-primary` | `#1A1A2E` | Body text |
| `--text-secondary` | `#4B5563` | Subtitle, muted text |
| `--text-dark` | `#FFFFFF` | Text on dark sections |
| `--text-dark-secondary` | `#E0E8F5` | Muted text on dark |
| `--border` | `#E2E8F0` | Borders, dividers |
| `--border-dark` | `rgba(255,255,255,0.2)` | Borders on dark bg |
| `--gold` | `#FFB800` | Popular badge, featured border |
| **Section dark bg** | `#0052CC` | Royal blue (not navy!) |

### Section Backgrounds

```
Light section  → #FFFFFF
Gray section   → #F7F9FC
Dark section   → #0052CC (royal blue) ← NOT #0B1120
  Pricing CTA  → #0B1120 (navy-dark, override inline)
Footer         → #0B1120 (near-black)
Gradient       → linear-gradient(135deg, #1A73E8, #1877F2) ← blue to blue
Hero (has-video) → #ffffff (white before video loads)
Hero (inner pages) → #ffffff (white)
```

### Key Design Insight
Despite variable names like `--teal` and `section-dark`, the actual colors are:
- "Teal" (`--teal`) = `#1877F2` — a medium blue (Facebook-style)
- "Section dark" uses `#0052CC` — a rich royal blue, not the deep navy `#0B1120`
- Hero backgrounds now white (`#ffffff`) — both homepage (before video) and inner pages

## Typography

- **Headings:** `"Plus Jakarta Sans"`, `"Inter"`, system-ui, sans-serif (700 weight)
- **Body:** `"Inter"`, system-ui, sans-serif (16px, line-height 1.7)
- **Monospace:** `"JetBrains Mono"`, `"Source Code Pro"`, monospace (for prices, stats)
- **Gradient text:** `linear-gradient(135deg, #1877F2, #1A73E8)` — applied via `background-clip: text`

## Hero Section

### Homepage Hero (`has-video`)
```
Background: #ffffff (white) — before video loads
Video: mixkit.co video, object-fit cover, z-index 0
Overlay: gradient rgba(11,17,32,0.75→0.45), z-index 1 (from main_style.css)
Orbs: floating gradient blobs (#1A73E8 tint, very subtle)
  - Orb 1: rgba(26,115,232,0.05), blur(100px), top-left
  - Orb 2: radial-gradient(blue tint → transparent), blur(80px), bottom-right
Badge (has-video): white text on rgba(255,255,255,0.1) bg
Headline (has-video): white (#fff) — 36-60px, 800 weight
Highlight: gradient text (teal→blue)
Subtitle (has-video): rgba(255,255,255,0.8) — 18-20px
Content: left-aligned, max-width 720px (no hero-text-box wrapper)
Buttons:
  - Primary: bg #1877F2, white text, 14-16px, 600 weight, 8px radius
  - Outline (has-video): border rgba(255,255,255,0.6), white text
```

### Page Hero (inner pages)
```
Background: #ffffff (white) — no grid overlay (changed from gray #F0F2F5)
H1: navy #0F1B2D, 36-48px
Subtitle: #4B5563, 18px
```

## Design Decisions

### Logo Text
- "myelektra" (lowercase) + ".com" (blue #1877F2)
- "myelektra" is 2x height of ".com" (28px : 14px)
- Flexbox with `align-items: baseline` keeps text aligned
- **Reason:** Brand emphasis on "myelektra" while keeping ".com" readable

### Logo Format
- React Header/Footer: PNG from catbox CDN
- Weebly Header/Footer: PNG from catbox CDN
- **Reason:** Inline SVG had compatibility issues, PNG is simpler and consistent

### "Our Experience" Marquee
- 40 company logos in continuous scroll
- Grayscale by default → color on hover
- **CSS animation FAILED** because Weebly minifier strips `@keyframes 0% { transform }` regardless of value
- **Solution:** JS `requestAnimationFrame` loop with `cancelAnimationFrame` on hover

### Solution Icons (Medal/Tier System)
- 5 medal icons menggantikan generic SVG icons di solution cards:
  - **Bronze** (#CD7F32 radial gradient) → Revenue Intelligence
  - **Silver** (#C0C0C0 radial gradient) → Pipeline Builder
  - **Gold** (#FFD700 radial gradient) → Revenue Engine
  - **Platinum** (#E5E4E2 radial gradient) → AI Sales Transformation
  - **Diamond** (#7DD3FC→#2563EB radial gradient) → Fractional Revenue Office
- Masing-masing: lingkaran 24x24 dengan star/diamond di tengah, gradient metalik, stroke 1.5px
- React: komponen `TierBronzeIcon`, `TierSilverIcon`, dll di `Icons.tsx`
- Weebly: inline SVG dengan `<defs><radialGradient>` per icon (scoped per SVG element)
- Icon mapping di `solutionIconMap`: `bronze → TierBronzeIcon`, dll

### Pricing Display
- All prices now show `[Book Meeting for Pricing]` with link to `/consultation`
- No more obfuscated "USD x,xxx" placeholders
- Content-config.json: `price` fields updated for pipeline-builder, revenue-engine, fractional-revenue-office
- Weebly: `<a href="consultation.html">[Book Meeting for Pricing]</a> per month`
- Kept: "per project" and "per month" suffixes after the linked text

### Footer
- 4 columns: Brand, Solutions, Company, Contact
- Company: About, Industries, Academy (How It Works removed)
- Contact: PT. Myelektra Solusi Indonesia, +62 21 29636761, Get Quote Here, Book Online Meeting, Book a Consultation
- Consistent across all HTML pages
- Footer injected via `scripts/add-footer.mjs`

### HubSpot Integrations
- **Consultation** → HubSpot Meetings embed (no form)
- **Get Quote Here** → HubSpot Forms embed (portal 3306812)

### Contact Page
- Corporate office: 38th Floor, 88 Office, Kota Kasablanka, South Jakarta, Indonesia
- Contact: PT. Myelektra Solusi Indonesia, +62 21 29636761
- Hours: Weekdays 9:00–18:00
- Google Maps iframe pointing to 88 Office

## Content-Loader System
Semua 16 HTML page punya inline script content-loader:

- Fetch `https://cms.myelektra.com/api/config?cb=<timestamp>` via XHR
- Inject nilai ke elemen dengan `data-content="path.ke.config"`
- Dukungan `data-content-html` (innerHTML), `data-content-src` (src attribute)
- Gradient headline: `data-content-headline` + `data-content-highlight` → split text, wrap highlight di `<span class="gradient-text">`
- Fallback: hardcoded text di HTML (dari content-config.json)

**Cakupan data-content per page:**
| File | data-content count |
|------|-------------------|
| index.html | 23 (hero, journey, achievements, CTA, dll) |
| solution-*.html (5) | 4 (H1, description, features, CTA) |
| about.html, industries.html, dll (9) | 1-2 (H1, subtitle) |
| template.html | 0 (template) |

## Design Patterns

### Cards
- **Light cards:** White bg, 1px solid #E2E8F0 border, 12px radius, 28px padding
  - Hover: translateY(-4px), box-shadow 0 12px 40px rgba(0,0,0,0.1)
- **Dark cards:** rgba(255,255,255,0.08) bg, rgba(255,255,255,0.2) border
  - Hover: bg rgba(255,255,255,0.12), shadow 0 12px 40px rgba(0,0,0,0.15)
- **Solution cards (on dark bg #0052CC):** White bg, white-ish border, subtle blue shadow
  - Price text: #0052CC (royal blue)
  - Feature check: #0052CC
  - Learn more: #0052CC

### Buttons
| Variant | Padding | BG | Text | Radius |
|---------|---------|----|------|--------|
| Primary | 14px 28px | #1877F2 | White | 8px |
| Outline | 14px 28px | Transparent | #1A1A2E (2px border) | 8px |
| Secondary | 12px 24px | #1A73E8 | White | 8px |
| Large | 16px 32px | #1877F2 | White | 8px |
| Ghost | 10px 20px | rgba(26,115,232,0.1) | #1A73E8 | 8px |

### Section Headings
- Label: 14px, 600 weight, uppercase, #1877F2
- Title: 30-40px, 700 weight, navy (or white on dark)
- Subtitle: 18px, #4B5563, max-width 640px

### Dividers
- 80px wide, 4px height
- Gradient: linear-gradient(90deg, #1877F2, #1A73E8)
- 2px border-radius, centered

### Timeline (How It Works)
- Dots: 56px circle, gradient #1877F2 → #1A73E8, white number
- Line: 2px gradient connector
- Output badge: rgba(24,119,242,0.05) bg, #1877F2 label

## SEO Schema
Per-page JSON-LD schemas:
| Page | Schema |
|------|--------|
| Home | Organization |
| About | AboutPage |
| Academy | Course |
| Consultation | Service + Offer |
| How It Works | HowTo |
| Contact | ContactPage |
| Solutions | ItemList |
| Solutions detail | Service |
| Industries, Pricing, Get Quote | WebPage |

## Image Hosting
catbox.moe (free, no signup, direct links).
All 40 client logos + logo-myelektra.png uploaded via `scripts/upload-logos.mjs`.

## Weebly Quirks
1. **CSS minifier strips `0%` keyframe transform** — use JS animation
2. **No subdirectories in zip upload** — flatten all files
3. **Cache-busting via query string** — `?1784471123` appended to CSS/JS
4. **Simple custom theme** — only index.html + main_style.css recognized
5. **CMS API CSS serves older version** — `https://cms.myelektra.com/api/css` bisa ketinggalan dari `main_style.css` lokal. Urutan load: CMS CSS dulu, baru `main_style.css` (override).
6. **main_style.css wajib di zip** — semua halaman link ke `main_style.css` lokal. Pastikan file ini selalu di-sync ke CMS API untuk production.
7. **Missing CSS classes added** — `.card-hover`, `.hide-mobile`, `.chevron-desktop`, `.meetings-iframe-container` ditambahkan ke `main_style.css` untuk match React.
