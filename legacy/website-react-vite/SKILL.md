# SKILL.md — Membuat Weebly Theme dari React Web

## Pola Dasar

Weebly theme adalah **static HTML murni**. Tidak ada framework, tidak ada bundler, tidak ada JSX.
React app (Vite + Tailwind) adalah source of truth untuk desain/konten. Weebly theme di-porting manual.

**Aturan besi:**
1. Semua file HTML + CSS + assets dalam **satu folder datar** — Weebly ignore subdirektori
2. Setiap halaman adalah file `.html` terpisah dengan **header + nav + footer di-inline langsung**
3. Tidak ada template partial — setiap file HTML mandiri (copy-paste header/footer)
4. CSS class dan struktur HTML harus **identik** dengan React (pakai class Tailwind yang sama, di-copy ke `main_style.css`)
5. ZIP upload: `zip -r theme.zip *.html main_style.css manifest.json logo-myelektra.png`

## Struktur Nav

### Urutan Menu (Desktop & Mobile)
```
Home → Solutions (dropdown) → Industries → Pricing → Academy → About → Contact Us (dropdown)
```

### Contact Us Dropdown
```
├── Get Quote Here  → get-quote-here-new.html
└── Book Online Meeting → consultation.html
```

### How It Works
Halaman **ada** (`how-it-works.html`) tapi **link nav dihapus** dari semua menu.
Tetap bisa dibuka via URL langsung. Footer link juga dihapus.

### Implementasi Nav Desktop
```html
<nav class="desktop-nav">
  <a href="index.html" class="nav-link">Home</a>
  <div class="nav-dropdown">
    <a href="solutions.html" class="nav-link">Solutions <svg>...</svg></a>
    <div class="nav-dropdown-menu">
      <a href="solution-revenue-intelligence.html" class="dropdown-item">Revenue Intelligence <svg>...</svg></a>
      <!-- ... items ... -->
    </div>
  </div>
  <a href="industries.html" class="nav-link">Industries</a>
  <a href="pricing.html" class="nav-link">Pricing</a>
  <a href="academy.html" class="nav-link">Academy</a>
  <a href="about.html" class="nav-link">About</a>
  <div class="nav-dropdown">
    <a href="contact-new.html" class="nav-link">Contact Us <svg>...</svg></a>
    <div class="nav-dropdown-menu">
      <a href="get-quote-here-new.html" class="dropdown-item">Get Quote Here <svg>...</svg></a>
      <a href="consultation.html" class="dropdown-item">Book Online Meeting <svg>...</svg></a>
    </div>
  </div>
</nav>
```

### Mobile Nav
```html
<div class="mobile-overlay" id="mobile-menu">
  <nav class="mobile-nav-inner">
    <a href="index.html" class="mobile-nav-link">Home</a>
    <button class="mobile-submenu-toggle" id="mobile-solutions-toggle">Solutions <svg>...</svg></button>
    <div class="mobile-submenu" id="mobile-solutions-menu" style="display:none">
      <a href="solution-revenue-intelligence.html">Revenue Intelligence</a>
      <a href="solution-pipeline-builder.html">Pipeline Builder</a>
      <a href="solution-revenue-engine.html">Revenue Engine</a>
      <a href="solution-ai-sales-transformation.html">AI Sales Transformation</a>
      <a href="solution-fractional-revenue-office.html">Fractional Revenue Office</a>
    </div>
    <a href="industries.html" class="mobile-nav-link">Industries</a>
    <a href="pricing.html" class="mobile-nav-link">Pricing</a>
    <a href="academy.html" class="mobile-nav-link">Academy</a>
    <a href="about.html" class="mobile-nav-link">About</a>
    <a href="get-quote-here-new.html" class="mobile-nav-link">Get Quote Here</a>
    <a href="consultation.html" class="mobile-nav-link">Book Online Meeting</a>
    <div class="mobile-divider">
      <a href="consultation.html" class="mobile-cta">Book an Online Meeting</a>
    </div>
  </nav>
</div>
```

**Aturan mobile nav:**
- Solutions pake accordion toggle (button + submenu), bukan flat link
- Submenu items: Revenue Intelligence, Pipeline Builder, Revenue Engine, AI Sales Transformation, Fractional Revenue Office
- Contact Us submenu items jadi link biasa setelah About
- CTA button terakhir dengan class `mobile-divider`
- JS: click handler `#mobile-solutions-toggle` toggle display `#mobile-solutions-menu`

### Active Page
- Desktop: tambah class `active-teal` ke nav-link halaman aktif
- Mobile: tambah class `active` ke mobile-nav-link

## Struktur Halaman (Template)

```html
<!DOCTYPE html><html lang="en"><head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>Page Title — Myelektra</title>
  <!-- Google Fonts preconnect -->
  <link href="...fonts..." rel="stylesheet"/>
  <link rel="stylesheet" href="main_style.css"/>
  <!-- Meta: description, canonical, OG, Twitter -->
  <!-- JSON-LD schema -->
</head><body>
<header>...nav...</header>
<main>
  <!-- Mobile overlay nav (salinan) -->
  <div class="mobile-overlay">...</div>
  <!-- HERO SECTION -->
  <section class="page-hero">...</section>
  <!-- CONTENT SECTIONS -->
  <section class="section-light section-padding">...</section>
  <section class="section-dark section-padding">...</section>
</main>
<footer>...footer...</footer>
<script>/* scroll header, hamburger toggle, scroll animation */</script>
</body></html>
```

## Section Pattern

| Tujuan | Class |
|--------|-------|
| Hero putih | `page-hero` + `.page-hero-grid` + `h1.anim` + `p.page-hero-subtitle.anim.delay-1` |
| Konten light | `section-light section-padding` |
| Konten dark (CTA) | `section-dark section-padding` + `section-title-white` |
| Animasi | `.anim` + `.delay-1` s/d `.delay-7` |

CSS class tersedia di `main_style.css`. Jangan tambah Tailwind — Weebly tidak pakai Tailwind.

## Footer

```html
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <!-- Brand: logo + desc + address + social -->
      <!-- Solutions: 5 solution links -->
      <!-- Company: About, Industries, Academy (NO How It Works) -->
      <!-- Contact: PT. Myelektra Solusi Indonesia, +62 21 29636761, Get Quote Here, Book Online Meeting, Book a Consultation -->
    </div>
    <div class="footer-divider">
      <p class="footer-disclaimer">...</p>
      <p class="footer-copy">© 2025 Myelektra.com...</p>
    </div>
  </div>
</footer>
```

## HubSpot Embed

### Consultation Page (Meetings)
```html
<div class="meetings-iframe-container" data-src="https://app.hubspot.com/meetings/admin110/online-meeting-with-myelektra-?embed=true"></div>
<script type="text/javascript" src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"></script>
```

### Get Quote Page (Forms)
```html
<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/shell.js"></script>
<script>
  hbspt.forms.create({
    portalId: "3306812",
    formId: "a5276c78-f3c3-4eb1-9434-7d359384f6b0",
    target: "#hs-get-quote-form"
  });
</script>
<div id="hs-get-quote-form"></div>
```

## Contact Page (`contact-new.html`)
Corporate office, contact info, hours, Google Maps embed:
```html
<iframe src="https://maps.google.com/maps?q=88+Office+Kota+Kasablanka+South+Jakarta&t=&z=15&ie=UTF8&iwloc=&output=embed" width="100%" height="400" style="border:0" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
```

## Aturan CSS

### Nav Dropdown
```css
.nav-dropdown { position: relative; }
.nav-dropdown-menu { display: none; position: absolute; top: 100%; left: 0; z-index: 50; }
.nav-dropdown:hover .nav-dropdown-menu { display: block; }
```

### Mobile Menu
```css
.mobile-overlay { display: none; }
.mobile-overlay.open { display: flex; }
```
Toggle via JS: tambah/hapus class `open` pada `#mobile-menu`, set `document.body.style.overflow`.

### Animasi Scroll
Gunakan IntersectionObserver JS (inline script di footer):
```js
var ae = document.querySelectorAll('.anim,.anim-slide');
var ob = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      ob.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
ae.forEach(function(el) { ob.observe(el); });
```

## Content-Loader System (Content Dynamic)
Semua halaman punya inline script yg fetch config dari CMS:
```html
<script>(function(){function r(o,p){...} // content-loader inline
try{var x=new XMLHttpRequest;x.open("GET","https://cms.myelektra.com/api/config?cb="+Date.now(),true);x.onreadystatechange=function(){...a(c)};x.send()}catch(e){}
</script>
```

**Cara kerja:**
1. Setiap halaman punya elemen dengan `data-content="path.ke.config"` attribute
2. Content-loader fetch `https://cms.myelektra.com/api/config` → JSON
3. Cari value di path → update `textContent` (atau `innerHTML` kalo `data-content-html`) 
4. Support gradient headline: `data-content-headline` + `data-content-highlight`
5. Kalo API down, fallback ke hardcoded text di HTML

**Pages tanpa data-content:** `template.html` (template doang). Sisanya minimal punya H1 + subtitle.

## Google Analytics
Script gtag.js (`G-BLF912YLHH`) di-inline di `<head>` semua 16 file HTML. Inject sebelum `</head>`.

Header behavior:
- Sticky, background putih dari awal (`background: #fff`)
- Bottom border selalu ada
- Shadow muncul pas scroll (>20px) via `.scrolled` class

## Weebly Quirks (Wajib Tahu)

1. **CSS minifier hapus `0%` keyframe** — jangan pakai CSS `@keyframes` untuk transform. Gunakan JS `requestAnimationFrame` untuk marquee/animasi continuous.
2. **Cache-busting** — tambah query string `?timestamp` ke CSS/JS di production.
3. **Tidak ada subfolder** — semua file dalam satu folder. ZIP harus flat.
4. **Simple custom theme** — Weebly cuma baca `index.html` + `main_style.css`. Halaman lain dilayani sebagai static file biasa.
5. **Form submit standar HTML** — Weebly tidak support React state. Gunakan form HTML biasa.

## Daftar Halaman

| File | Route React | Keterangan |
|------|-------------|------------|
| `index.html` | `/` | Homepage |
| `solutions.html` | `/solutions` | Listing solusi |
| `solution-*-.html` (5) | `/solutions/:id` | Detail solusi |
| `industries.html` | `/industries` | Industri |
| `how-it-works.html` | `/how-it-works` | Halaman ada, nav di-hidden |
| `pricing.html` | `/pricing` | Harga |
| `academy.html` | `/academy` | Academy |
| `about.html` | `/about` | About |
| `consultation.html` | `/consultation` | HubSpot Meetings |
| `get-quote-here-new.html` | `/get-quote-here-new` | HubSpot Forms |
| `contact-new.html` | `/contact` | Contact info + Google Maps |

## Script Utilities

| Script | Fungsi |
|--------|--------|
| `scripts/build-weebly.mjs` | Replace `<!--@@path@@-->` marker dari content-config.json ke HTML |
| `scripts/sync-logo.mjs` | Copy logo PNG ke weebly-theme, replace SVG ref |
| `scripts/add-footer.mjs` | Inject footer ke semua file HTML |
| `scripts/seo-optimize.mjs` | Tambah meta/OG/schema/main tags |
| `scripts/upload-logos.mjs` | Upload client logos ke catbox.moe |
| `scripts/hide-how-it-works.mjs` | Hapus How It Works dari nav |
| `scripts/add-contact-nav.mjs` | Tambah Contact Us dropdown |
| `scripts/reorder-contact-nav.mjs` | Pindah Contact Us setelah About |

### Global Inline Scripts (semua halaman)
| Script | Trigger | Fungsi |
|--------|---------|--------|
| Google Analytics (gtag) | Page load | Track pageviews, event GA4 |
| Content-loader | Page load | Fetch CMS config, inject ke data-content elements |
| Hamburger toggle | Click `#hamburger-btn` | Toggle `.open` di `#mobile-menu`, lock body scroll |
| Scroll header | scroll > 20px | Toggle `.scrolled` di `#site-header` |
| Scroll reveal | IntersectionObserver | Toggle `.visible` di `.anim`, `.anim-slide` |
| Solutions submenu | Click `#mobile-solutions-toggle` | Toggle display `#mobile-solutions-menu` |

## Build React (untuk Referensi)
```bash
npm run dev    # dev server port 5173
npm run build  # → dist/index.html (singlefile via vite-plugin-singlefile)
```

Weebly theme tidak perlu build. Cukup edit HTML langsung dan zip.
