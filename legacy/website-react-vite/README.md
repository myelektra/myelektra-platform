# glm-weebly-theme-for-myelektra-v5

A React + Vite web app with a standalone Weebly theme (static HTML).  
Two separate outputs share the same design/logo/content.

## Key Files & Structure

```
/             # Root
├── src/              # React app (Vite + Tailwind)
│   ├── components/   # Header, Footer, Layout
│   ├── pages/        # Home, About, Solutions, etc.
│   └── index.css     # Tailwind + imports main_style.css
├── weebly-theme/     # Static HTML theme for Weebly upload
│   ├── index.html    # Homepage (all sections inline)
│   ├── main_style.css # Shared stylesheet
│   └── manifest.json # Weebly theme metadata
├── public/           # Static assets for React build
└── scripts/          # Build & sync utilities
    ├── sync-logo.mjs # Copy logo → weebly-theme, replace SVG refs
    ├── add-footer.mjs # Inject footer into Weebly HTML files
    ├── seo-optimize.mjs # Add meta/OG/schema/main tags
    └── upload-logos.mjs # Upload images to catbox.moe CDN
```

## Build Commands

- `npm run dev` — React dev server (port 5173)
- `npm run build` — sync-logo + Vite build → `dist/index.html` (singlefile)
- `npm run sync-logo` — copy logo PNG to `weebly-theme`, replace inline SVG
- `zip -r theme.zip *.html main_style.css manifest.json` — package theme for upload
  (Upload via Weebly editor: **Theme → Custom Theme → Upload**.)

## Images

All client logos are hosted on catbox.moe (free CDN).  
Mapping saved in `weebly-theme/catbox-map.txt`.  
`logo-myelektra.png` also available on catbox for Weebly builds.

## Known Issues

- **Weebly CSS Minifier Bug:** Strips `0% { transform: translateX(N) }` from `@keyframes`; use `requestAnimationFrame` for marquee animations.
- Client logos in `public/clients/` not used by React build (uses catbox URLs directly).

## Future Work

- Add CI pipeline for automated testing.
- Optimize CSS and assets for production.
- Create custom Weebly components library.

---

*Built with ❤️ by Daritani*