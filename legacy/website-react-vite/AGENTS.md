# AGENTS.md — Myelektra Weebly Theme

## Project Overview
Dual-deliverable website for **Myelektra.com** — AI-Powered Revenue Growth Partner for B2B companies.

Two outputs share same design/logo/content:
1. **React SPA** (Vite + Tailwind CSS v4 + TypeScript) — dev preview at port 5173
2. **Weebly Theme** (static HTML/CSS) — zip & upload to Weebly CMS

**Tagline:** "We Build Revenue Systems, Not Just Lead Lists."
**Sub-tagline:** "From Buyer Persona to Revenue Pipeline."
**Company:** PT. Myelektra Solusi Indonesia, Jakarta
**Phone:** +62 21 29636761
**Office:** 38th Floor, 88 Office, Kota Kasablanka, South Jakarta
**Logo (catbox):** `https://files.catbox.moe/ih1ryw.png`
**Logo (local file):** `public/logo-myelektra.png` → copy to `weebly-theme/logo-myelektra.png` for Weebly upload

---

## Content Customization (No Code Needed)

**File:** `content-config.json` (root project)

Semua teks website ada di satu file ini. Edit JSON → perubahan otomatis terlihat di React app (dev server). Untuk Weebly theme, jalanin script build yang baca JSON ini.

**Cara edit:**
1. Buka `content-config.json`
2. Cari section yg mau diubah (e.g. `"solutions"`, `"homepage"`, `"footer"`)
3. Ganti value string-nya
4. Save → React app otomatis reload

**Yang bisa di-customize:**
- Brand name, tagline, alamat, telepon
- Semua teks hero tiap halaman
- Deskripsi dan fitur tiap solution
- Daftar industries dan buyer personas
- 8-step process
- 7 target countries dan personanya
- 6 differentiators
- 10 academy topics dan pricing
- Footer links dan copyright
- Disclaimer text
- 41 client logo URLs

## Quick Start & Build Commands

```bash
npm run dev          # React dev server (port 5173)
npm run build        # sync-logo → Vite build → dist/index.html (singlefile)
npm run sync-logo    # Copy logo PNG to weebly-theme, replace SVG refs
npm run preview      # Vite preview
```

**Weebly Theme Zip:**
```bash
cd weebly-theme
zip -r theme.zip *.html main_style.css manifest.json logo-myelektra.png
```
Upload: Weebly Editor → Theme → Custom Theme → Upload.

---

## Directory Structure

```
/
├── src/                          # React app (Vite + Tailwind + TS)
│   ├── main.tsx                  # Entry, StrictMode
│   ├── App.tsx                   # HashRouter with 11 routes, Layout wrapper
│   ├── index.css                 # @import "tailwindcss" + @theme tokens + main_style.css
│   ├── components/
│   │   ├── Layout.tsx            # Outlet + floating CTA + back-to-top + cookie banner + scroll reveal
│   │   ├── Header.tsx            # Sticky nav, desktop dropdowns, mobile hamburger
│   │   ├── Footer.tsx            # 4-column footer, disclaimer, social icons
│   │   ├── Icons.tsx             # 30 inline SVG icon components + solutionIconMap + industryIconMap
│   │   ├── ScrollAnimations.tsx  # AnimateOnScroll component (IntersectionObserver)
│   │   ├── ScrollReveal.tsx      # useScrollReveal hook for scroll-triggered visibility
│   │   └── PriceDisplay.tsx      # Renders price string
│   ├── pages/                    # 11 page components (see below)
│   └── data/
│       └── content.ts            # All content data (solutions, industries, processSteps, countries, etc.)
├── weebly-theme/                 # Standalone HTML theme for Weebly
│   ├── index.html                # Homepage ~580 lines (all 10 sections inline)
│   ├── main_style.css            # Complete CSS ~1000+ lines with custom properties
│   ├── manifest.json             # Theme metadata (16 layout definitions)
│   ├── *.html                    # All other pages (about, academy, consultation, etc.)
│   ├── catbox-map.txt            # Client logo URL mapping (40 logos on catbox.moe CDN)
│   ├── robots.txt                # AI crawler policy (allows GPTBot, PerplexityBot, ClaudeBot)
│   └── llms.txt                  # LLM-friendly company summary
├── public/                       # Static assets for React build (logo PNG, client logos)
├── scripts/                      # Build automation (8 .mjs files + 1 .sh)
├── vite.config.ts                # React + Tailwind + singlefile plugins
├── package.json                  # React 19, react-router-dom 7, Tailwind 4, Vite 7
└── tsconfig.json                 # TypeScript config with @ alias
```

---

## Technology Stack

| Layer | Tech |
|---|---|
| Framework | React 19.2.6, react-router-dom ^7.18.1 |
| Styling | Tailwind CSS 4.1.17 (@tailwindcss/vite) |
| Build | Vite 7.3.2, TypeScript 5.9.3 |
| Plugins | @vitejs/plugin-react, vite-plugin-singlefile (outputs one HTML file) |
| Utilities | clsx, tailwind-merge (via `cn.ts`) |
| Icons | Custom inline SVG components (no icon library) |
| Routing | HashRouter (for static file compatibility) |

---

## Brand Identity

### Color Palette
```css
--navy:          #0F1B2D    /* dark navy — trust, authority */
--navy-dark:     #0B1120    /* near-black for dark sections */
--blue:          #1A73E8    /* electric blue — technology */
--blue-hover:    #1558B0    /* blue hover state */
--teal:          #00C896    /* teal green — growth, revenue */
--teal-hover:    #00B085    /* teal hover state */
--gold:          #FFB800    /* gold — pricing badges, featured */
--bg-light:      #F7F9FC    /* soft gray-white sections */
--text-primary:  #1A1A2E    /* near-black text */
--text-secondary:#6B7280    /* medium gray */
--text-dark:     #E8ECF1    /* soft white on dark bg */
--border:        #E2E8F0    /* border / divider */
```

### Typography
- **Headings:** "Inter" or "Plus Jakarta Sans", bold/semibold (via Google Fonts)
- **Body:** "Inter", regular 16px, line-height 1.7
- **Monospace (stats/data):** "JetBrains Mono" or "Source Code Pro"
- **Logo treatment:** "myelektra" at 28px, ".com" at 14px, baseline-aligned, blue #1877F2

### Design Principles
- Clean SaaS aesthetic, dark hero + light content sections alternating
- Generous whitespace, subtle scroll animations (fade-in, slide-up)
- Card-based layouts for solutions and features
- Gradient accents (blue to teal) for section dividers, CTAs
- No stock photography — abstract geometric patterns, grid overlays, gradient meshes
- Mobile-first responsive, WCAG AA contrast, semantic HTML5, keyboard accessible

---

## Navigation Structure

### Desktop Nav Order (left to right)
1. **Home** → /
2. **Solutions** ▾ (dropdown) → /solutions
   - Revenue Intelligence → /solutions/revenue-intelligence
   - Pipeline Builder → /solutions/pipeline-builder
   - Revenue Engine → /solutions/revenue-engine
   - AI Sales Transformation → /solutions/ai-sales-transformation
   - Fractional Revenue Office → /solutions/fractional-revenue-office
3. **Industries** → /industries
4. **Pricing** → /pricing
5. **Academy** → /academy
6. **About** → /about
7. **Contact Us** ▾ (dropdown)
   - Get Quote Here → /get-quote-here-new
   - Book Online Meeting → /consultation
8. **CTA Button** → "Book an Online Meeting" (teal green) → /consultation

### Mobile Nav
Same order. Submenus toggle via button click (accordion). Full-screen overlay. Hamburger icon. Close on Escape key. Body scroll lock when open.

### Header Behavior
- Sticky/fixed top bar, white background from start (`background: #fff`)
- Bottom border always visible (`1px solid var(--border)`)
- Subtle box-shadow appears on scroll (>20px) via `.site-header.scrolled`
- Active nav link highlighted with teal underline
- Logo: PNG image (`https://files.catbox.moe/ih1ryw.png`) + text "myelektra.com"

---

## Footer Structure

4-column dark footer (#0B1120):
- **Col 1 (Brand):** Logo + tagline + office address + LinkedIn/Instagram icons
- **Col 2 (Solutions):** Links to all 5 solutions
- **Col 3 (Company):** About, Industries, Academy (no How It Works link)
- **Col 4 (Contact):** PT. Myelektra Solusi Indonesia, +62 21 29636761, Get Quote Here, Book Online Meeting, Book an Online Meeting CTA

**Bottom bar:**
- Disclaimer (see below)
- © 2025 Myelektra.com. All rights reserved.

**Disclaimer text:**
> Meetings and revenue outcomes are not guaranteed. Results depend on market conditions, offer relevance, buyer readiness, domain reputation, and the client's sales process.

---

## Global UI Elements

| Element | Behavior |
|---|---|
| **Floating CTA** | Appears after 600px scroll, dismissible, shows "Book an Online Meeting" |
| **Back to Top** | Appears after 500px scroll, smooth scroll to top |
| **Cookie Banner** | Appears after 2s delay if not dismissed, stored in localStorage. "Accept" + "Learn More" buttons |
| **Scroll Reveal** | IntersectionObserver-based fade-in/slide-up animations on scroll |
| **CTA buttons** | Teal green primary (#00C896 → #00B085), blue secondary (#1A73E8 → #1558B0), outlined variants |

---

## Complete Content Data

### 5 Solutions

| ID | Name | Price | CTA |
|---|---|---|---|
| revenue-intelligence | Revenue Intelligence | `[Book Meeting for Pricing] per project` | Start Revenue Intelligence |
| pipeline-builder | Pipeline Builder | `USD x,xxx per month` | Build My Pipeline |
| revenue-engine | Revenue Engine | `USD x,xxx per month` (Most Popular) | Build My Revenue Engine |
| ai-sales-transformation | AI Sales Transformation | `[Book Meeting for Pricing] per project` | Transform My Sales Team |
| fractional-revenue-office | Fractional Revenue Office | `USD x,xxx–xx,xxx per month` | Talk to a Revenue Advisor |

**Revenue Intelligence:**
> Build a focused market-entry and prospecting foundation before launching outreach.
- ICP development and market-entry analysis
- Buyer persona mapping with decision-making roles
- Up to 300 verified contacts per target country
- Revenue opportunity report with priority recommendations
*Best For:* Companies that need to define their target market, buyer personas, and prospecting strategy before investing in outreach.
*Process:* Discover → Identify → Deliver

**Pipeline Builder:**
> Turn approved buyer personas and target accounts into qualified sales conversations.
- HubSpot CRM setup and configuration
- AI-assisted prospecting and personalization
- Human SDR follow-up via email and phone
- Weekly reporting and activity dashboard
*Best For:* Companies with defined target markets that need consistent, professional outreach and qualified meetings.
*Process:* Setup → Engage → Qualify → Report

**Revenue Engine:**
> Build and manage an integrated system connecting prospecting, HubSpot, SDR activity, pipeline management, and revenue reporting.
- Everything in Pipeline Builder
- Workflow automation and process design
- Pipeline design and management
- Revenue forecasting and performance insights
*Best For:* Companies ready to build a complete, measurable revenue system with pipeline visibility and forecasting.
*Process:* Build → Operate → Optimize → Report

**AI Sales Transformation:**
> Transform manual sales activities into AI-assisted, measurable, and scalable workflows.
- AI readiness assessment and roadmap
- HubSpot AI setup and configuration
- AI sales playbook development
- Sales team training and onboarding
*Best For:* Companies wanting to modernize their sales process with AI tools, automation, and data-driven decision making.
*Process:* Assess → Design → Implement → Train

**Fractional Revenue Office:**
> Add experienced revenue leadership, RevOps support, SDR management, and executive reporting.
- Revenue strategy and planning
- SDR team management and coaching
- Quarterly growth planning and review
- Executive reporting and board-ready insights
*Best For:* Companies that need senior revenue leadership and strategic guidance without a full-time executive hire.
*Process:* Strategize → Lead → Scale → Report

---

### 5 Industries

| Industry | Personas |
|---|---|
| **Manufacturing** — Connect with plant leadership, operations, procurement, supply-chain, and general management. | Plant Director, Operations Manager, Procurement Head, Supply Chain Manager, General Manager |
| **SaaS and Technology** — Reach founders and leaders responsible for growth, sales, operations, technology, and revenue. | CEO/Founder, COO/CTO, Head of Sales, Head of Marketing, RevOps/Head of Growth |
| **Banking and Financial Services** — Identify senior stakeholders in digital transformation, technology, risk, procurement, and partnerships. | IT Director, Digital Banking Head, Risk Director, Procurement Head, Partnership Director |
| **BPO and Business Services** — Reach leadership in operations, HR, shared services, customer experience, and client delivery. | COO, HR Director, Shared Services Head, Customer Experience Head, Client Delivery Head |
| **Professional Services and Consulting** — Connect with partners and commercial leaders in business development, client acquisition, and strategic growth. | Managing Partner, Director, Business Development Head, Engagement Manager, Client Partner |

---

### 8-Step Process (How It Works)

| Step | Description | Output |
|---|---|---|
| 1. Discover | We begin with your business goals, market, product, sales cycle, ideal customer profile, and current revenue challenges. | Revenue discovery brief |
| 2. Identify | We define target industries, company criteria, decision-making roles, buyer pain points, and priority territories. | Approved ICP and buyer persona |
| 3. Research | Our team uses HubSpot-supported prospecting workflows to identify relevant target accounts and contacts. | Proposed prospect list |
| 4. Validate | You review the target list, provide feedback, and approve the accounts and buyer personas before execution. | Approved campaign database |
| 5. Build the System | Contacts are structured in HubSpot with lifecycle stages, lead statuses, properties, tags, scoring criteria, and follow-up workflows. | Campaign-ready CRM |
| 6. Engage | AI-assisted personalization and human SDR outreach are used across the agreed channels. | Active sales conversations |
| 7. Qualify | Prospects are classified according to contact validity, interest, need, timing, and meeting potential. | Qualified leads and meeting opportunities |
| 8. Grow | We monitor meetings, opportunities, pipeline movement, conversion performance, and recommended next actions. | A measurable and continuously improving revenue pipeline |

---

### 7 Target Countries

| Country | Personas | Flag Accent Class |
|---|---|---|
| Indonesia | President Director, Operations Director, IT Director, Procurement Head, Business Development Manager | flag-accent-indonesia |
| Malaysia | Managing Director, Head of Operations, CTO, Supply Chain Director, Sales Director | flag-accent-malaysia |
| Singapore | CEO, VP of Sales, Head of Digital, Procurement Director, Partnership Lead | flag-accent-singapore |
| Australia | General Manager, Head of Growth, COO, IT Manager, Commercial Director | flag-accent-australia |
| Europe | Country Manager, Head of Sales, Procurement Lead, Operations Head, Digital Transformation Lead | flag-accent-europe |
| United States | VP of Sales, Director of Operations, Head of Revenue, CIO, Business Development VP | flag-accent-usa |
| Middle East | Country Director, Operations Head, IT Director, Procurement Manager, Partnership Director | flag-accent-middle-east |

**Threshold note:** Maximum 300 verified contacts per country. Quality > quantity disclaimer on section.

---

### 6 Why Myelektra Differentiators

| Title | Description |
|---|---|
| **AI and Human Expertise** | Technology improves speed and insight. Human judgment protects relevance, communication quality, and professional relationships. |
| **HubSpot-Centered Execution** | Prospecting, qualification, follow-up, lead status, pipeline activities, and reporting are organized around a structured CRM system. |
| **Quality Before Quantity** | We focus on buyer-persona fit and useful business conversations—not mass contact collection. |
| **Transparent Reporting** | Clients receive clear visibility into campaign activity, lead categories, engagement, meetings, and next actions. |
| **Regional Market Understanding** | Based in Jakarta, Myelektra supports B2B growth across Indonesia, Southeast Asia, Australia, and selected global markets. |
| **Revenue-Focused Strategy** | Every service is designed to improve the path from target account to conversation, meeting, opportunity, and revenue. |

---

### Academy Topics (10 Modules)

1. Building an Ideal Customer Profile (ICP)
2. Buyer Persona Development for B2B
3. AI-Assisted Prospecting Workflows
4. HubSpot CRM Setup and Best Practices
5. Email Outreach That Gets Replies
6. SDR Fundamentals: From Call to Qualification
7. Pipeline Management and Forecasting
8. Revenue Operations (RevOps) Essentials
9. Using AI for Sales Enablement
10. Building a Repeatable Revenue System

**Academy Pricing:**
- Public Classes: From USD xx per participant (live instructor-led, workshops, frameworks, certificate)
- Corporate Training: From USD x,xxx per batch (customized, on-site/virtual, post-training support)

---

### Client Logos (41 Companies)

Displayed as marquee carousel. All hosted on catbox.moe CDN. Full list in `weebly-theme/catbox-map.txt`.

| # | Logo URL | Alt |
|---|---|---|
| 1 | `https://files.catbox.moe/t5y3dl.png` | 1Datapipe |
| 2 | `https://files.catbox.moe/4a7p1v.png` | Adins |
| 3 | `https://files.catbox.moe/3a5cc8.png` | Armourzero |
| 4 | `https://files.catbox.moe/o9aqso.png` | Bigbox |
| 5 | `https://files.catbox.moe/hl3ou5.png` | Cacafly |
| 6 | `https://files.catbox.moe/r2vdt4.png` | Codemi |
| 7 | `https://files.catbox.moe/pmthp8.png` | Convergence |
| 8 | `https://files.catbox.moe/gfp8is.jpeg` | Daiko |
| 9 | `https://files.catbox.moe/ovg7oa.png` | DataOn |
| 10 | `https://files.catbox.moe/omzx89.png` | Disprz |
| 11 | `https://files.catbox.moe/iit9rv.png` | Epicor |
| 12 | `https://files.catbox.moe/akbnd5.jpeg` | Evolusi 3D |
| 13 | `https://files.catbox.moe/hfiaab.webp` | Flexofast |
| 14 | `https://files.catbox.moe/g1a90h.png` | Fujifilm |
| 15 | `https://files.catbox.moe/5vqf5u.png` | Funding Societies |
| 16 | `https://files.catbox.moe/s072ef.png` | Geek Hunter |
| 17 | `https://files.catbox.moe/6w5ojl.jpg` | Hexagon |
| 18 | `https://files.catbox.moe/0ebc1m.png` | Honeywell |
| 19 | `https://files.catbox.moe/mtq977.jpg` | Ideoworks |
| 20 | `https://files.catbox.moe/69srar.png` | Integrated Retail |
| 21 | `https://files.catbox.moe/wbatv7.png` | Liberty Society |
| 22 | `https://files.catbox.moe/y5vr2i.png` | Lindungihutan |
| 23 | `https://files.catbox.moe/2kl9g9.webp` | Lion Parcel |
| 24 | `https://files.catbox.moe/0e6mog.png` | Metrodata |
| 25 | `https://files.catbox.moe/9qtku6.jpg` | Mileapp |
| 26 | `https://files.catbox.moe/n2istf.png` | Moodah |
| 27 | `https://files.catbox.moe/3nr01z.png` | Myrobin |
| 28 | `https://files.catbox.moe/hfrhgp.png` | Parker Hannifin |
| 29 | `https://files.catbox.moe/z73gdq.png` | Practo |
| 30 | `https://files.catbox.moe/ioq9fq.png` | PTI Group |
| 31 | `https://files.catbox.moe/ikoa54.jpg` | Qiscus |
| 32 | `https://files.catbox.moe/l4zmq5.png` | Ruangguru |
| 33 | `https://files.catbox.moe/3mvnu8.jpg` | Runchise |
| 34 | `https://files.catbox.moe/202ttd.png` | Shipper |
| 35 | `https://files.catbox.moe/99mbkp.png` | SOS |
| 36 | `https://files.catbox.moe/ngvhnl.png` | Staffinc |
| 37 | `https://files.catbox.moe/be3jyg.png` | The Class Foundation |
| 38 | `https://files.catbox.moe/j8su5l.png` | Tjetak |
| 39 | `https://files.catbox.moe/serbx5.png` | Turnitin |
| 40 | `https://files.catbox.moe/wk1t9e.png` | Zilingo |

---

## Page-by-Page Content Map

### Homepage (`/` — 10 sections)

**Section 1: Hero** (dark #0B1120 + geometric pattern + animated gradient orbs)
- Badge: "AI-Powered Revenue Growth Partner"
- H1: "We Build Revenue Systems, Not Just Lead Lists." (gradient text on "Not Just Lead Lists.")
- Sub: "Myelektra helps B2B companies identify the right buyers, start meaningful sales conversations, manage opportunities in HubSpot, and build a more predictable revenue pipeline."
- CTA 1: "Book an Online Meeting" → /consultation (teal green)
- CTA 2: "Explore Our Solutions" → /solutions (outlined white)

**Section 2: The Journey** (light #fff)
- Label: "From Buyer Persona to Revenue Pipeline"
- H2: "The Revenue Growth Journey"
- Intro: "Finding contact data is only the beginning. Sustainable B2B growth requires the right market, the right decision-makers, consistent engagement, disciplined follow-up, accurate CRM data, and a measurable sales process. Myelektra brings these elements together in one integrated revenue growth system."
- 5 cards: Revenue Intelligence → AI Agent Prospecting → Human SDR Engagement → HubSpot CRM → Revenue Operations

**Section 3: Achievements** (gray #F7F9FC)
- H2: "What We Help You Achieve"
- 5 items: Better-Fit Prospects, More Sales Conversations, A Stronger Pipeline, Clearer Revenue Visibility, Scalable Sales Operations

**Section 4: Solutions** (dark #0B1120)
- H2: "Our Revenue Growth Solutions"
- All 5 solution cards with icon, name, price, description, 4 feature bullets, "Learn More" link
- 3rd card (Revenue Engine) gets "Most Popular" gold badge

**Section 5: Client Logos** (light)
- H2: "Our Experience"
- Marquee carousel with all 41 client logos using requestAnimationFrame (no CSS keyframes — avoids Weebly minifier bug)

**Section 6: Country Targeting** (gray)
- H2: "One Country. One Focused Campaign."
- Intro: "Every campaign targets one selected country to maintain relevance, personalization, and research quality."
- 7 country cards with flag accent border, persona list, "Maximum: 300 verified contacts"
- Disclaimer about quality prioritizing over quota

**Section 7: Industries** (light)
- H2: "Industries We Serve"
- All 5 industry cards with icon, description, persona tag chips

**Section 8: Why Myelektra** (dark)
- H2: "Why Myelektra"
- 6 differentiator cards (AI+Human, HubSpot, Quality, Reporting, Regional, Revenue-Focused)

**Section 9: Academy Teaser** (gradient blue→teal + subtle grid)
- H2: "Myelektra Academy"
- Sub: "Build an AI-Enabled B2B Sales Team"
- Description: "Myelektra Academy helps founders, sales leaders, business development teams, and corporate sales professionals adopt modern B2B selling practices."
- Pricing highlights: Public Classes (From USD xx/participant), Corporate Training (From USD x,xxx/batch)
- CTA: "Explore Myelektra Academy" → /academy

**Section 10: Final CTA** (dark + gradient overlay)
- H2: "Built for Companies That Want More Than Contact Data"
- Body: "You do not need another spreadsheet filled with names. You need a clear target market, relevant decision-makers, professional engagement, disciplined follow-up, reliable CRM data, and visibility into your revenue pipeline. That is the system Myelektra builds."
- Sub: "Ready to Build Your Revenue System?"
- Body: "Start with a discovery session to review your target market, current sales process, HubSpot requirements, and growth priorities."
- CTA: "Book an Online Meeting" → /consultation

---

### Solutions Page (`/solutions`)
- H1: Pulled from `solutionsPage.hero.headline` (content-config.json) — fallback "Book an Online Meeting"
- Sub: "From market intelligence to pipeline management — choose the solution that matches your growth stage."
- All 5 solutions listed with full details: icon, name, price, description, feature list, CTA, "Best For" box
- 3rd solution (Revenue Engine) highlighted with gold ring
- CTA: "Not sure which solution fits? Book an Online Meeting"

### Solution Detail Page (`/solutions/:id`)
- Breadcrumb: Home > Solutions > [Name]
- Hero with icon, name, price, description, CTA
- "What's Included" feature list with checkmarks
- "Best For" sidebar box
- "How It Works" mini-process (3-4 steps per solution)
- CTA: "Ready to Get Started with [Name]?"
- Related Solutions grid (other 4 solutions)

### Industries Page (`/industries`)
- H1: "Industries We Serve"
- Sub: "Myelektra provides targeted revenue growth solutions across key B2B industries..."
- All 5 industries with expanded layout: name, description, 5 buyer personas each
- CTA: "Targeting a Specific Industry? Book an Online Meeting"

### How It Works Page (`/how-it-works`)
- H1: "How Myelektra Works"
- Sub: "A structured, eight-step process from discovery to a measurable revenue pipeline."
- Full 8-step timeline with numbered circles, connecting gradient line, description, output box
- Summary visual: chip flow 01→02→03→04→05→06→07→08
- CTA: "Ready to Start Your Revenue Growth Journey?"

### Pricing Page (`/pricing`)
- H1: "Transparent Pricing for Revenue Growth"
- Sub: "Clear, straightforward pricing with no hidden fees."
- All 5 solutions as pricing cards (price, description, features, CTA)
- 3rd card (Revenue Engine) highlighted "Most Popular" with gold ring
- Comparison table (8 features × 5 solutions)
- Disclaimer box
- CTA: "Need Help Choosing the Right Solution?"

### Academy Page (`/academy`)
- Hero: "Myelektra Academy" + "Build an AI-Enabled B2B Sales Team"
- Description: "Myelektra Academy helps founders, sales leaders, business development teams, and corporate sales professionals adopt modern B2B selling practices through structured training programs."
- 10 training topics as numbered cards
- Pricing: Public Classes card + Corporate Training card (with features lists)
- CTA: "Invest in Your Sales Team's Growth — Book an Online Meeting"

### About Page (`/about`)
- H1: "About Myelektra"
- Sub: "We are an AI-powered revenue growth partner helping B2B companies move from scattered prospecting to structured, measurable revenue systems."
- Company story (3 paragraphs: problem → approach → philosophy)
- Stats sidebar: 7+ countries, 5 solutions, 8-step process, 1 system
- Founder: Dian Satya, S.E. (Founder & CEO) with LinkedIn/Instagram
- Why Myelektra (6 differentiators in 3-column grid)
- Mission section (dark): "From Buyer Persona to Revenue Pipeline"
- CTA: "Let's Build Your Revenue System"

### Contact Page (`/contact`)
- H1: "Contact Us"
- Sub: "Get in touch with our team to discuss how Myelektra can help grow your revenue."
- CTAs: "Get Quote Here" / "Book Online Meeting"
- Corporate Office: 38th Floor, 88 Office, Kota Kasablanka, South Jakarta, Indonesia
- PT. Myelektra Solusi Indonesia, +62 21 29636761
- Hours: Weekdays / 9:00 – 18:00
- Google Maps embed (88 Office, Kota Kasablanka)

### Consultation Page (`/consultation`)
- H1: "Book an Online Meeting"
- Sub: "Start with a discovery session to review your target market, current sales process, HubSpot requirements, and growth priorities."
- HubSpot Meetings embed (`https://app.hubspot.com/meetings/admin110/online-meeting-with-myelektra-?embed=true`)
- Sidebar: "What to Expect" (30-Minute Session, No Commitment) + Quick Links to all 5 solutions

### Get Quote Page (`/get-quote-here-new`)
- H1: "Get a Quote"
- Sub: "Tell us about your revenue growth needs and we'll provide a tailored quote."
- HubSpot Form embed (portal 3306812, form a5276c78-f3c3-4eb1-9434-7d359384f6b0)
- Sidebar: "What You'll Get" (custom pricing, scope of work, timeline, no obligation)
- CTA: "Ready to Grow Your Revenue?"

---

## HubSpot Integrations

| Page | Integration | Details |
|---|---|---|
| Consultation | HubSpot Meetings | Script: `MeetingsEmbedCode.js`, container class: `meetings-iframe-container`, data-src: HubSpot meetings URL |
| Get Quote | HubSpot Forms | Script: `js.hsforms.net/forms/shell.js`, portal: `3306812`, form ID: `a5276c78-f3c3-4eb1-9434-7d359384f6b0` |

---

## SEO / Structured Data

### JSON-LD Schema Types (per page, injected by seo-optimize.mjs)

| Page | @type |
|---|---|
| index.html | Organization |
| about.html | AboutPage (sub: Organization) |
| academy.html | Course (provider: Organization) |
| consultation.html | Service (offers: 0 USD) |
| how-it-works.html | HowTo (5 steps) |
| industries.html | WebPage (isPartOf: WebSite) |
| pricing.html | WebPage (isPartOf: WebSite) |
| solutions.html | ItemList (5 ListItems) |
| Each solution page | Service (provider: Organization) |

### Meta Tags (every page)
- `<meta name="description">` — unique per page
- `<meta property="og:title">`, `og:description`, `og:type`, `og:url`, `og:image`, `og:site_name`
- `<meta name="twitter:card">` (summary_large_image), `twitter:title`, `twitter:description`
- `<link rel="canonical">` — points to `https://myelektra.com/...`

### robots.txt Policy
- Allowed: GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, anthropic-ai, Google-Extended, Bingbot
- Blocked: CCBot (Common Crawl — AI training)
- References: `sitemap.xml` at `https://myelektra.com/sitemap.xml` (not in repo)

### llms.txt
- LLM-friendly markdown summary of company, solutions, industries, pricing, contact

**Note:** React SPA (`src/`) does NOT contain any JSON-LD. SEO schema is applied only to Weebly static HTML files via `scripts/seo-optimize.mjs`.

## Content Source of Truth

**`content-config.json`** (root project) adalah satu-satunya sumber teks. React app (`src/data/content.ts`) import dari JSON ini. Weebly theme bisa update konten via dua cara:
- **runtime** — content-loader inline script di setiap halaman fetch `https://cms.myelektra.com/api/config` dan inject ke elemen dengan `data-content` attribute
- **build-time** — `node scripts/build-weebly.mjs --local` replace `<!--@@path@@-->` markers dari local config

### Cara edit teks (no-code)
1. Buka `content-config.json`
2. Cari section yang mau diubah
3. Ganti value string
4. `npm run dev` — auto reload React
5. Untuk Weebly: jalankan `npm run build-theme` → `node scripts/build-weebly.mjs` — replace `<!--@@path@@-->` markers di HTML dari content-config.json
6. Content juga bisa di-update runtime via content-loader (fetch dari CMS API)

---

## Scripts Pipeline (automation)

| Script | Purpose |
|---|---|
| `build-weebly.mjs` | Replace `<!--@@path@@-->` markers + update `data-content` fallback text in HTML files from content-config.json. Run via `npm run build-theme`. |
| `sync-logo.mjs` | Copy `public/logo-myelektra.png` → `weebly-theme/`, replace inline SVG logos with `<img>` across all HTML files. Run during `npm run build`. |
| `seo-optimize.mjs` | Inject meta description, OG tags, Twitter Cards, canonical URL, `<main>` wrapper, and per-page JSON-LD schema into every weebly-theme HTML file. |
| `add-contact-nav.mjs` | Insert "Contact Us" dropdown with sub-links into desktop nav (after Industries) and mobile nav. Add footer links. |
| `reorder-contact-nav.mjs` | Move "Contact Us" dropdown from after Industries to after About. Replace `contact.html` → `contact-new.html` references. |
| `hide-how-it-works.mjs` | Remove "How It Works" links from desktop and mobile nav across all HTML files. |
| `add-footer.mjs` | Inject full footer HTML into HTML files lacking it (inserts before first `<script>` tag). |
| `upload-logos.mjs` | Upload all `client_*.png` from `weebly-theme/` → catbox.moe, save mapping to `catbox-map.txt`, update index.html references. |
| `upload-imgur.sh` | Shell script for uploading images to Imgur (alternative to catbox). |

### Global Scripts (injected inline in every page)
- **Google Analytics** — `G-BLF912YLHH` (gtag.js) di `<head>` semua 16 HTML files
- **Content-loader** — inline IIFE fetch config dari `https://cms.myelektra.com/api/config` dan inject ke elemen dengan `data-content` attribute
- **Hamburger menu** — toggle class `open` di `#mobile-menu`, lock body scroll
- **Scroll header** — toggle class `scrolled` di `#site-header` saat scrollY > 20
- **Scroll reveal** — IntersectionObserver trigger class `visible` di `.anim`, `.anim-slide`
- **Mobile Solutions submenu** — click handler untuk `#mobile-solutions-toggle` show/hide `#mobile-solutions-menu`

---

## CSS Architecture

Two parallel CSS sources:

### React App (`src/index.css`)
- `@import "tailwindcss"` (Tailwind v4)
- `@import "weebly-theme/main_style.css"` as `base` layer
- Custom `@theme` tokens matching CSS custom properties
- Additional styles: hero patterns, orb animations, stagger delays, card hover, button transitions, timeline connector, floating CTA, mobile menu overlay, focus styles, back-to-top, flag accent borders

### Weebly Theme (`weebly-theme/main_style.css`)
- Complete standalone CSS ~1000+ lines
- CSS custom properties for all colors, fonts, spacing
- Navigation styles (sticky, white bg from start)
- Hero section (white bg before video, gradient overlay), cards, buttons, timeline, grid layouts, footer, forms
- Responsive breakpoints: 1200px, 992px, 768px, 576px
- Animations (scroll-triggered fade-in/slide-up, hover transitions)
- Mobile hamburger, full-screen overlay
- WCAG AA focus styles, ARIA support
- Extra classes: `.card-hover`, `.hide-mobile`, `.chevron-desktop`, `.meetings-iframe-container`

### CSS Loading Order (Weebly)
```
1. https://cms.myelektra.com/api/css   — base styles (server version)
2. main_style.css                       — local override (latest changes)
```
CMS API CSS bisa ketinggalan versi. `main_style.css` di-load setelahnya untuk override. Semua 16 file HTML punya kedua link.

---

## Known Issues & Constraints

1. **Weebly CSS Minifier Bug:** Strips `0% { transform: translateX(N) }` from `@keyframes` (treats as identity). **Fix:** Use JS `requestAnimationFrame` for marquee animations instead of CSS keyframes. See inline `<script>` in `index.html` and `scripts/upload-logos.mjs`.

2. **Client Logos:** `public/clients/` folder not used by React build (uses catbox URLs directly from content array in Home.tsx).

3. **SEO Gap:** React SPA has no JSON-LD schema. All SEO is on Weebly static files only.

4. **Pricing Placeholders:** All prices use "x" as obfuscation (e.g., "USD x,xxx", "From USD xx"). Keep this pattern until actual prices are confirmed.

5. **No Tailwind Config File:** Tailwind v4 uses `@import "tailwindcss"` with `@theme` directive — no `tailwind.config.*` needed.

6. **HashRouter:** React app uses `HashRouter` (for static file compatibility in singlefile output). All internal links use hash-based routing.

7. **Singlefile Build:** `vite-plugin-singlefile` bundles entire React app into one `dist/index.html`. No separate JS/CSS assets in output.

8. **Catbox CDN:** All images (logo, client logos) reference `files.catbox.moe` URLs. Logo mapping in `weebly-theme/catbox-map.txt`.

9. **Content-loader fallback:** `<script>` inline di setiap halaman fetch config dari CMS API (`cms.myelektra.com`). Jika API down, fallback ke hardcoded text di HTML (dari `content-config.json`). Tidak ada retry logic — satu kali fetch saat page load.

10. **Content staging:** `content-config.json` di root project adalah staging. Production config di-cache di CMS server. Update CMS tidak otomatis sync ke repo lokal. `build-weebly.mjs` prefer fetch dari CMS, fallback ke local file.

11. **No `content-loader.js` file locally:** Script di-inline langsung di HTML. Tidak ada file `content-loader.js` di repo — hanya referensi CDN di `<script>`.

12. **CMS API CSS vs main_style.css:** `https://cms.myelektra.com/api/css` serve versi lama CSS. Urutan load: CMS API CSS dulu, baru `main_style.css` (override). Perubahan di `main_style.css` lokal harus di-sync ke CMS API untuk effect production.

13. **Hero background white:** `.hero { background: #ffffff }` — putih sebelum video load. Sebelumnya `var(--navy-dark)` (#0B1120). Overlay gradient tetap ada untuk kontras teks.

14. **Build-weebly.mjs dual function:** Script sekarang replace `<!--@@path@@-->` markers DAN update `data-content` fallback text dari config. Jalan: `npm run build-theme`.

---

## Weebly Theme Architecture Notes

- All content hardcoded in HTML — no Weebly drag-and-drop blocks used
- `{menu}` and `{footer}` tags NOT used — navigation and footer are fully hardcoded
- `{content}` tag used ONLY on resources/blog page if dynamic content needed
- `{logo}` tag not used — logo is hardcoded `<img>` tag
- Theme must validate with Weebly's theme uploader
- Total theme size < 500KB (excluding images)
- No external dependencies except Google Fonts

---

## Master Regeneration Prompt

Use the following prompt structure when instructing a web generator agent to recreate this website from scratch:

```
You are building a complete website for Myelektra.com — an AI-Powered Revenue Growth Partner for B2B companies. You will produce TWO deliverables:

1. A React SPA (Vite, Tailwind CSS v4, TypeScript) with react-router-dom for routing
2. A standalone Weebly theme (static HTML/CSS) for CMS upload

Both outputs must share identical design, content, and branding. All content is hardcoded — no CMS content blocks.

BRAND IDENTITY:
- Company: Myelektra.com (PT. Myelektra Solusi Indonesia)
- Tagline: "We Build Revenue Systems, Not Just Lead Lists."
- Sub-tagline: "From Buyer Persona to Revenue Pipeline."
- Positioning: AI-Powered Revenue Growth Partner
- Location: Jakarta, Indonesia (38th Floor, 88 Office, Kota Kasablanka)
- Phone: +62 21 29636761
- Markets: Indonesia, Malaysia, Singapore, Australia, Europe, United States, Middle East

COLORS:
Primary #0F1B2D, Secondary #1A73E8, Accent #00C896, Gold #FFB800, 
Bg Light #F7F9FC, Bg Dark #0B1120, Text Primary #1A1A2E, Text Secondary #6B7280, Text Dark #E8ECF1, Border #E2E8F0

FONTS:
Headings: Inter/Plus Jakarta Sans, Body: Inter, Mono: JetBrains Mono/Source Code Pro

DESIGN:
- Dark hero + alternating light/dark sections
- Generous whitespace, card-based layouts, subtle scroll animations
- Gradient accents (blue→teal) for dividers
- No stock photos — geometric patterns + gradient meshes
- Mobile-first responsive, WCAG AA, semantic HTML5, keyboard accessible

NAVIGATION (Desktop):
Home → Solutions ▾ (5 sub-items) → Industries → Pricing → Academy → About → Contact Us ▾ (Get Quote Here, Book Online Meeting)
Right CTA: "Book an Online Meeting" (teal green)
Sticky header, transparent→solid on scroll, dropdown on hover.

CONTENT — 11 PAGES:
[Include all content from the "Complete Content Data" and "Page-by-Page Content Map" sections above]

LOGO ASSETS:
- Myelektra logo (catbox): `https://files.catbox.moe/ih1ryw.png`
- Kalau `public/logo-myelektra.png` tidak ada, download dari catbox URL dan simpan ke `public/logo-myelektra.png`, lalu copy ke `weebly-theme/logo-myelektra.png`
- Semua client logo URLs ada di tabel Client Logos section di AGENTS.md

TECH STACK:
- React 19 + react-router-dom v7 + TypeScript
- Tailwind CSS 4 (@theme tokens, no config file)
- Vite 7 + vite-plugin-singlefile (builds to single HTML)
- Custom inline SVG icons (no icon library)
- HashRouter for static file compatibility
- HubSpot Meetings embed (consultation page) + HubSpot Forms (get quote page)
- JSON-LD schema per page type
- requestAnimationFrame for marquee (not CSS keyframes — Weebly bug)
```
