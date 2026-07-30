# Myelektra Content Admin Editor — Specification Document

> **Date:** July 21, 2026
> **Project:** Myelektra.com — AI-Powered Revenue Growth Partner
> **Author:** Buffy (AI Agent)
> **Status:** Draft — based on interview with product owner

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Current Architecture](#2-current-architecture)
3. [Pain Points](#3-pain-points)
4. [Target Users & Personas](#4-target-users--personas)
5. [Desired Features](#5-desired-features)
6. [Detailed Feature Requirements](#6-detailed-feature-requirements)
7. [User Flow](#7-user-flow)
8. [Technical Architecture](#8-technical-architecture)
9. [Constraints & Edge Cases](#9-constraints--edge-cases)
10. [Out of Scope](#10-out-of-scope)
11. [Future Considerations](#11-future-considerations)
12. [Glossary](#12-glossary)

---

## 1. Executive Summary

Myelektra.com has a **dual-deliverable website architecture**:
1. **React SPA** (Vite + Tailwind + TypeScript) — used for local development/preview only
2. **Weebly Theme** (static HTML + CSS) — the live website deployed via Weebly CMS

Both deliverables share a single source of truth: **`content-config.json`**, a JSON file in the root of the GitHub repository that contains all text content for the entire website.

Currently, there is a **Cloudflare Pages-based admin editor** that lets users edit `content-config.json` via a web form and save changes to GitHub. However, it has significant usability issues that prevent non-technical clients from using it independently.

The primary goal is to **redesign the admin editor** so that Myelektra's clients (non-technical business users) can update website content easily and safely **without needing to log into Weebly** or ask developers for help.

### Core Insight

> *"Clients want to change text on their website without touching code, without understanding JSON, without navigating GitHub Actions, and without logging into Weebly. They want a simple form where they edit text fields and see the result."*

---

## 2. Current Architecture

### 2.1 Two Content Delivery Mechanisms

The Weebly theme uses **two mechanisms**, but only one is currently active:

| Mechanism | Status | Description |
|---|---|---|
| `<!--@@path.to.value@@-->` markers | **Legacy (not used)** | Build-time replacement by `scripts/build-weebly.mjs`. Reads `content-config.json`, finds markers in HTML files, replaces with string values. |
| `content-loader.js` | **Active** | Runtime JavaScript that fetches `content-config.json` from jsDelivr CDN (mirroring the GitHub repo) and replaces `data-content="path.to.value"` attributes in HTML with text from the JSON. |

### 2.2 Complete Data Flow

```
                     ┌─────────────────────┐
                     │  content-config.json │  ← Single source of truth
                     │  (GitHub repo root)  │
                     └──────────┬──────────┘
                                │
              ┌─────────────────┼─────────────────┐
              ▼                 ▼                   ▼
    ┌─────────────────┐  ┌────────────┐  ┌──────────────────┐
    │  React SPA      │  │ Cloudflare │  │ jsDelivr CDN     │
    │  (src/data/     │  │ Admin      │  │ (mirrors GitHub) │
    │   content.ts)   │  │ Editor     │  └────────┬─────────┘
    │  → import JSON  │  │ (Form UI)  │           │
    │  → build-time   │  │ → Edit     │           ▼
    │    bundling     │  │ → Save to  │  ┌──────────────────┐
    └─────────────────┘  │   GitHub   │  │ content-loader.js│
                          │   via API  │  │ (in Weebly HTML) │
                          └─────┬─────┘  │ → fetch JSON     │
                                │         │ → replace        │
                                ▼         │   data-content   │
                     ┌──────────────────┐ │   attributes     │
                     │  GitHub Actions  │ └──────────────────┘
                     │  build-weebly.yml│
                     │  → npm run       │
                     │    build-theme   │
                     │  → generate zip  │
                     │  → upload        │
                     │    artifact      │
                     └────────┬─────────┘
                              ▼
                     ┌──────────────────┐
                     │  Weebly CMS      │
                     │  (manual zip     │
                     │   upload)        │
                     └──────────────────┘
```

### 2.3 GitHub Actions Pipeline

- **Trigger:** Push to `master` branch affecting `content-config.json`, `weebly-theme/**`, or `scripts/build-weebly.mjs`
- **Job 1 — `build-weebly`:** Runs `npm run build-theme` → replaces `<!--@@-->` markers (legacy but harmless), copies logo, outputs built HTML files
- **Job 2 — `deploy-pages`:** Zips the Weebly theme files → uploads as downloadable artifact (retained 30 days)
- **Output:** `weebly-theme-upload.zip` containing `.html`, `main_style.css`, `manifest.json`, `logo-myelektra.png`

### 2.4 Current Cloudflare Admin Editor

- **Hosted on:** Cloudflare Pages (`myelektra-content-editor.pages.dev`)
- **Tech:** Vanilla HTML/CSS/JS (no framework)
- **Core function:** Fetches `content-config.json` from jsDelivr, flattens to key-value pairs, renders as form
- **Features:**
  - Form view (collapsible sections by JSON path)
  - Raw JSON view (full textarea with syntax)
  - Download/Upload JSON file
  - "Save to GitHub" button → Cloudflare Function `/api/save` → commits to GitHub repo
- **Backend:** Cloudflare Pages Function (`functions/api/save.js`) — requires `GITHUB_TOKEN` env var

### 2.5 `content-loader.js` Runtime Behavior

- Loaded in every Weebly page via `<script src="...content-loader.js">`
- On page load, fetches JSON from `https://cdn.jsdelivr.net/gh/myelektra/glm-weebly-theme@master/weebly-theme/content-config.json`
- Walks all DOM elements with `data-content="path.to.value"` attribute
- Replaces `textContent` with the resolved value from JSON
- Special handling for hero headlines: splits headline by highlight text, wraps highlight in `<span class="gradient-text">`
- **Key limitation:** Content loads **after** page render — there is a flash of unstyled content (FOUC) where default text shows before JSON loads

---

## 3. Pain Points

Identified through interview with product owner:

### 3.1 Critical Issues

| # | Pain Point | Detail |
|---|---|---|
| 1 | **Complex Editor UI** | The current form shows raw JSON paths like `homepage.hero.headline` as labels. Non-technical clients find this confusing and intimidating. |
| 2 | **No Preview** | Clients cannot see how their changes will look on the actual website before saving. They edit text in a form with no visual context. |
| 3 | **No Undo/History** | Once saved, changes are immediately committed to GitHub with no way to revert. Clients are afraid of breaking the site. |
| 4 | **No Search** | With dozens of editable fields organized by JSON path, finding the right field to edit is difficult. |

### 3.2 Moderate Issues

| # | Pain Point | Detail |
|---|---|---|
| 5 | **Raw JSON View Exposed** | The Raw JSON tab is dangerous for non-technical users — one invalid comma can break the entire config. |
| 6 | **Flow Requires Developer Help** | Even after saving to GitHub, clients don't know how to download the zip from GitHub Actions and upload to Weebly. |
| 7 | **FOUC (Flash of Default Content)** | `content-loader.js` runs after page load, causing a flash of default/placeholder text before the real content loads. |

### 3.3 Minor Issues

| # | Pain Point | Detail |
|---|---|---|
| 8 | **Loading State** | No skeleton/placeholder while content loads from CDN |
| 9 | **Mobile Experience** | Editor not optimized for mobile use |
| 10 | **Login/Auth** | Currently no authentication on the editor (anyone with URL can edit) |

---

## 4. Target Users & Personas

### Primary: Client Content Editor

**Role:** Marketing manager, business owner, or administrative staff at Myelektra
**Technical level:** Low to moderate — comfortable with web forms, not with code/JSON
**Goals:**
- Update text content on their website (headlines, descriptions, prices)
- Make changes without developer involvement
- See changes reflected on the live site quickly
- Feel safe making changes (undo/revert capability)

**Fears:**
- Breaking the website
- Accidentally deleting something permanent
- Not understanding technical jargon

### Secondary: Developer / Admin

**Role:** Technical person setting up and maintaining the system
**Technical level:** High
**Goals:**
- Understand the architecture
- Add new editable fields
- Troubleshoot issues
- Manage deployment

---

## 5. Desired Features

Ranked by priority (based on interview):

| Priority | Feature | Description |
|---|---|---|
| **P0** | **Simplified Form** | Replace raw JSON paths with friendly labels, grouped by page/section (e.g., "Homepage → Hero Headline") |
| **P0** | **No-Code Only** | Remove the Raw JSON view entirely, or hide it behind a developer toggle |
| **P1** | **Preview Changes** | See a live preview of how text changes look on the actual page |
| **P1** | **Search/Filter** | Quickly find fields by keyword, page name, or section |
| **P2** | **History & Undo** | View previous versions and revert changes |
| **P2** | **One-Click Deploy** | After saving, either auto-deploy to Weebly or provide a clear "download & upload" guide |
| **P3** | **Simpler Save Workflow** | Reduce the number of clicks to publish changes |

---

## 6. Detailed Feature Requirements

### 6.1 Simplified Form (P0)

**Current state:**
```
Field label: "homepage.hero.headline"
Input: "A Decade of Real Pipelines..."
```

**Desired state:**
```
Section: "🏠 Homepage"
Sub-section: "Hero Section"
Field label: "Headline"
Description: "The main title shown at the top of the homepage"
Input: "A Decade of Real Pipelines..."
```

**Requirements:**
- Group fields by page (Homepage, Solutions, About, etc.)
- Within each page, group by logical section (Hero, Journey, Features, etc.)
- Use human-readable labels instead of JSON paths
- Show a preview of the current value in context (e.g., "Current: A Decade of Real Pipelines...")
- Show field description/instructions where useful
- Collapsible sections with expand/collapse all

### 6.2 No-Code Mode (P0)

**Requirements:**
- Default view is "Simple Mode" — form only, no JSON
- Raw JSON view is hidden by default
- A small toggle/link for "Advanced Mode" (requires confirmation dialog)
- In Simple Mode, all editing goes through the form
- Validation: prevent saving invalid data

### 6.3 Live Preview (P1)

**Requirements:**
- Side-by-side or overlay preview showing how changes look on the actual page
- Preview updates in real-time as the user types
- Show content in the context of the full page layout (at least hero sections)
- Handle gradient text highlights (headline split by highlight span)
- Mobile and desktop preview toggle

**Implementation options:**
1. **Iframe preview:** Load the actual weebly-theme HTML in an iframe, inject content-loader data
2. **Simplified preview:** Render a mockup of key sections using the editor's own HTML/CSS
3. **Integrated preview:** The editor renders a visual representation of each page section

### 6.4 Search & Filter (P1)

**Requirements:**
- Search bar at the top of the form
- Search across field labels, descriptions, and current values
- Filter by page (e.g., only show "Homepage" fields)
- Results highlight matching text
- Keyboard shortcut (Ctrl/Cmd + F)

### 6.5 History & Undo (P2)

**Requirements:**
- View a simple changelog of recent saves (timestamp, what changed)
- Click to restore a previous version
- Store history locally (IndexedDB or localStorage) and/or on GitHub
- Show "unsaved changes" indicator
- Confirm before leaving with unsaved changes

### 6.6 One-Click Deploy Workflow (P2)

**Requirements:**
- After "Save to GitHub", show a clear next step
- Option 1: Auto-download the zip and guide the user step-by-step on Weebly upload
- Option 2: Provide a direct link to the GitHub Actions artifact
- Visual step-by-step guide with screenshots for:
  1. Downloading the zip
  2. Logging into Weebly
  3. Going to Theme → Custom Theme
  4. Uploading and publishing

---

## 7. User Flow

### 7.1 Happy Path (Client Edits Content)

```
1. Open admin editor URL (bookmarked)
2. See dashboard with page grid (Homepage, Solutions, About, etc.)
3. Click "Homepage"
4. See form fields organized by section (Hero, Journey, Achievements, etc.)
5. Edit "Hero Headline" field — see live preview update
6. Click "Save to GitHub"
7. See success toast with "Saved! Changes will be live after deployment"
8. See next-step prompt: "Download Zip & Upload to Weebly" guide
9. (Optional) Follow guide to deploy
```

### 7.2 Undo Flow

```
1. Click "History" button in header
2. See timeline of recent saves with "Restore" button
3. Click "Restore" on a previous version
4. Confirm dialog: "This will replace current content with version from [date/time]"
5. Form updates with restored values
6. User can review and then Save to GitHub
```

### 7.3 Search Flow

```
1. Press Ctrl+F or click search icon
2. Type "headline" — form auto-filters to only show headline fields
3. Results show "Homepage > Hero > Headline", "Solutions > Hero > Headline", etc.
4. Click on result to scroll directly to that field
5. Clear search to show all fields again
```

---

## 8. Technical Architecture

### 8.1 Technology Stack

| Layer | Current | Proposed |
|---|---|---|
| **Frontend** | Vanilla HTML/CSS/JS | Upgrade to a lightweight framework (Alpine.js, Preact, or stay vanilla with better organized JS) |
| **Hosting** | Cloudflare Pages | Keep Cloudflare Pages (already set up) |
| **Backend** | Cloudflare Pages Function | Keep, but add preview API endpoint |
| **Storage** | GitHub (via Cloudflare Function) | Keep GitHub as source of truth |
| **CDN for content** | jsDelivr (mirrors GitHub) | Keep jsDelivr for content-loader.js |
| **Auth** | None | Optional: Cloudflare Access or simple token-based auth |

### 8.2 Recommended Approach: Stay Near-Vanilla

Given the constraints (single website, non-technical clients, occasional updates), a lightweight approach is recommended:

- **Keep vanilla HTML/CSS/JS** for the editor (no build step = simpler maintenance)
- **Add a component-based vanilla JS pattern** using Web Components or a simple template system
- **Use IndexedDB** for local version history
- **Use Service Worker** for offline preview capability

### 8.3 Preview Architecture

```
┌──────────────────────────────┐
│   Admin Editor (Cloudflare)  │
│                              │
│  ┌────────────────────┐      │
│  │  Form View          │      │
│  │  (fields grouped    │      │
│  │   by page/section)  │      │
│  └─────────┬──────────┘      │
│            │ user types       │
│            ▼                  │
│  ┌────────────────────┐      │
│  │  Preview Engine     │      │
│  │                     │      │
│  │  → Generates HTML   │      │
│  │  → Applies content  │      │
│  │  → Renders in iframe│      │
│  └────────────────────┘      │
└──────────────────────────────┘
```

**Preview implementation options:**
1. **Hidden iframe** that loads a copy of the Weebly theme HTML, with content injected via `postMessage` or URL parameters
2. **Client-side template** that renders a simplified version of each page section using the editor's own CSS

### 8.4 Content Configuration Mapping

A human-friendly mapping needs to be created from JSON paths to display metadata:

```json
{
  "sections": [
    {
      "page": "Homepage",
      "icon": "🏠",
      "groups": [
        {
          "section": "Hero",
          "fields": [
            {
              "path": "homepage.hero.badge",
              "label": "Badge Text",
              "description": "The small label above the main headline",
              "example": "10+ Years in B2B Revenue Growth",
              "previewType": "badge"
            },
            {
              "path": "homepage.hero.headline",
              "label": "Headline",
              "description": "Main hero title (the highlight text will be auto-wrapped in gradient)",
              "example": "A Decade of Real Pipelines. Built for What Comes Next.",
              "previewType": "headline"
            }
          ]
        }
      ]
    }
  ]
}
```

This mapping can be stored in a separate config file (e.g., `admin-config.json`) or generated automatically from the JSON structure with overrides.

---

## 9. Constraints & Edge Cases

### 9.1 Technical Constraints

| Constraint | Implication |
|---|---|
| **Weebly CMS limitations** | No server-side rendering, no API for auto-deploy. Manual zip upload is the only option. |
| **jsDelivr CDN caching** | Changes pushed to GitHub may take 5-15 minutes to propagate to the CDN. Content updates are NOT real-time. |
| **Cloudflare Pages free tier** | 100,000 requests/day, 500 builds/month. Should be sufficient for occasional updates. |
| **GitHub API rate limits** | The `/api/save` function makes API calls to GitHub. 5000 requests/hour for authenticated requests. |
| **Base64 encoding in Cloudflare Function** | The `btoa()` approach may fail for large files. Use `Buffer.from()` in Node.js runtime if available. |
| **Single-file constraint** | All editor code must work as a single Cloudflare Pages site (or minimal files). |

### 9.2 Edge Cases

| Edge Case | Handling |
|---|---|
| **Empty fields** | Form should allow empty strings (client might want to remove text). |
| **Special characters / HTML** | Content should be treated as plain text, not HTML. Escape HTML entities. |
| **Very long text** | Textareas should expand for long content. |
| **Field added to JSON but not in form** | Fallback: show a generic field with the JSON path as label (graceful degradation). |
| **GitHub save fails** | Show clear error message. Save draft to localStorage so no work is lost. |
| **Concurrent edits** | If two people edit simultaneously, last save wins. Show warning if config has changed since loading. |
| **content-loader.js fails to fetch** | Default text in `data-content` attributes serves as fallback. Don't block page rendering. |
| **Broken JSON after manual edit** | Validate JSON before saving. Show specific error ("Missing comma at line 42"). |

---

## 10. Out of Scope

The following are explicitly **not** part of this spec:

| Feature | Reason |
|---|---|
| **Automated Weebly deployment via API** | Weebly does not offer a public deployment API for custom themes |
| **Multi-language / i18n support** | Single-language site (English only) |
| **Image/asset upload** | Client logos and images are already hosted on catbox.moe CDN. Text only. |
| **User authentication system** | May be added later via Cloudflare Access, but auth is not a client-reported pain point |
| **React SPA improvements** | React app is secondary — focus is on Weebly theme editor |
| **SEO/meta tag editing** | Meta descriptions and OG tags are set at build time — not runtime-editable |
| **Analytics dashboard** | No need to track editor usage statistics |

---

## 11. Future Considerations

| Item | Notes |
|---|---|
| **Cloudflare Access auth** | Add a simple email-based login if clients worry about the editor being public |
| **Visual page builder** | Drag-and-drop reordering of sections (future major version) |
| **Multi-site support** | If this system is reused for other client websites, the architecture should be modular |
| **AI-assisted content suggestions** | Integrate with AI to suggest headline improvements or SEO-optimized text |
| **Automated Weebly upload** | If Weebly ever releases a deployment API, add auto-upload |
| **Version diff view** | Show exactly what changed (red/green diff) between versions |

---

## 12. Glossary

| Term | Definition |
|---|---|
| **Weebly** | A website builder/CMS where myelektra.com is hosted |
| **content-config.json** | The single JSON file containing all text content for the website — the source of truth |
| **content-loader.js** | A JavaScript file loaded on every Weebly page that fetches content-config.json from CDN and replaces text on the page |
| **Cloudflare Pages** | A hosting platform that serves the admin editor website and provides serverless Functions |
| **jsDelivr** | A CDN that mirrors GitHub repositories, used to serve content-config.json to the live Weebly site |
| **GitHub Actions** | CI/CD pipeline that builds the Weebly theme zip file when content changes |
| **FOUC** | Flash of Unstyled Content — when default text shows briefly before content-loader.js replaces it |
| **Cloudflare Access** | An authentication service that can add login protection to the editor |

---

## Appendix A: Current Admin Editor Code Structure

```
cloudflare/
├── index.html                  # Admin editor single-page app (vanilla HTML/CSS/JS)
├── functions/api/save.js       # Cloudflare Function — saves content-config.json to GitHub
└── .gitignore                  # Ignore wrangler temp files
```

## Appendix B: Current Content Flow Detail

1. User opens Cloudflare editor
2. Editor fetches `content-config.json` from jsDelivr CDN (GitHub mirror)
3. JSON is flattened to dot-notation paths (e.g., `homepage.hero.headline` → value)
4. Form is dynamically rendered with text inputs for each string value
5. User edits values in form or switches to Raw JSON view
6. "Save to GitHub" serializes form data → unflattens to JSON → POST to `/api/save`
7. Cloudflare Function commits to GitHub with commit message "Update content-config.json via web editor"
8. GitHub Actions triggers → builds Weebly theme → generates zip artifact
9. Admin downloads zip → uploads to Weebly manually

## Appendix C: Weebly Theme Content Loading Detail

Each Weebly page has:
```html
<h1 data-content="homepage.hero.headline">Default Headline</h1>
<p data-content="homepage.hero.subtitle">Default subtitle...</p>

<script src="https://cdn.jsdelivr.net/gh/myelektra/glm-weebly-theme@master/weebly-theme/content-loader.js"></script>
```

The `content-loader.js` script:
1. Fetches JSON from CDN
2. Finds all `[data-content]` elements
3. Resolves path from JSON
4. Replaces `textContent` with resolved value
5. Handles gradient headline split via `data-content-headline` and `data-content-highlight` attributes

---

*End of specification document.*
