# REPOSITORY RULES
# REPOSITORY-RULES.md
# Myelektra Platform Repository Standards

Version: 1.0

---

# Purpose

This document defines the repository organization, ownership, coding boundaries,
and file placement rules for the Myelektra Platform.

Every developer and AI coding agent must follow these rules.

These rules exist to keep the repository consistent, maintainable, and scalable.

---

# Repository Philosophy

The repository is organized by responsibility.

Every folder has a single purpose.

Never mix unrelated responsibilities.

Repository organization is considered part of the software architecture.

---

# Repository Structure

```
myelektra-platform/

apps/
legacy/
packages/
docs/
scripts/
infrastructure/

package.json
pnpm-workspace.yaml
README.md
```

---

# Top Level Ownership

## apps/

Contains production applications.

Everything inside apps is deployable software.

Never place documentation here.

---

## legacy/

Contains legacy applications used only as migration sources.

Never build new features here.

Never deploy from this folder.

Treat it as read-only.

---

## packages/

Contains reusable code shared between applications.

Packages should never contain application-specific business logic.

---

## docs/

Contains documentation only.

No production code.

No runtime logic.

No compiled assets.

---

## scripts/

Automation.

Migration utilities.

Developer tooling.

Code generation.

Deployment helpers.

---

## infrastructure/

Infrastructure configuration.

Cloudflare.

CI/CD.

Deployment.

IaC.

Environment templates.

---

# Applications

Current

apps/website

Future

apps/mic

apps/ai-workspace

Future applications must follow the same structure.

Every application should remain independently understandable.

---

# Website Application

Location

apps/website

Purpose

Production Astro application.

Only production-ready code belongs here.

Experimental work should use feature branches.

---

# Legacy Website

Location

legacy/website-react-vite

Purpose

Migration source.

Never implement new features.

Never redesign here.

Only inspect and migrate.

---

# Shared Packages

Reusable code belongs in packages.

Applications consume packages.

Applications do not duplicate packages.

---

# packages/ui

Contains reusable UI components.

Examples

Button

Card

Hero

Navbar

Footer

Modal

Badge

Typography

Never place page-specific components here.

---

# packages/content

Structured business content.

Examples

Solutions

Industries

Pricing

Resources

Articles

Case Studies

Future ownership transfers to MIC.

---

# packages/assets

Shared images.

Icons.

Illustrations.

Logos.

Fonts.

Avoid duplicate assets.

---

# packages/utils

Reusable helper functions.

Examples

formatDate()

slugify()

SEO helpers

Validation

Analytics helpers

Cloudflare helpers

Never place UI logic here.

---

# packages/types

Shared TypeScript interfaces.

Enums.

API contracts.

Schema definitions.

Never duplicate interfaces.

---

# packages/config

Shared configuration.

Examples

Navigation

Metadata

Routes

Environment defaults

Constants

Do not hardcode configuration across applications.

---

# File Placement Rules

Ask before creating a file.

Does a similar file already exist?

Can existing functionality be extended?

Avoid duplicate implementations.

---

# Component Placement

Application-specific

↓

apps/website

Reusable

↓

packages/ui

---

# Utility Placement

Reusable

↓

packages/utils

Application-specific

↓

apps/.../lib

---

# Asset Placement

Shared

↓

packages/assets

Application-specific

↓

apps/.../public

---

# Content Placement

Structured content

↓

packages/content

Temporary page copy

↓

Application page

Only until migrated.

---

# Documentation Placement

PRD

↓

docs/prd

Architecture

↓

docs/architecture

Migration

↓

docs/migration

Prompts

↓

docs/prompts

Never mix documentation with source code.

---

# Naming Rules

Folders

lowercase

Examples

website

packages

assets

utils

Good

market-signals

Bad

MarketSignals

Market_Signals

---

Files

React

PascalCase.tsx

Astro

PascalCase.astro

Utilities

camelCase.ts

Types

PascalCase.ts

Markdown

UPPERCASE-NAME.md

Examples

REPOSITORY-RULES.md

AGENTS.md

README.md

---

# Import Rules

Prefer package imports.

Good

import Button from "@myelektra/ui"

Avoid

../../../Button

Long relative paths reduce maintainability.

---

# Component Rules

One component.

One responsibility.

Avoid components exceeding approximately 300–400 lines.

Split when necessary.

---

# Layout Rules

Shared layouts belong inside

apps/website/src/layouts

Examples

BaseLayout

ContentLayout

WorkspaceLayout

ArticleLayout

Never duplicate layouts.

---

# Route Rules

Public pages

src/pages

Internal tools

src/pages/workspace

Never expose internal routes in navigation.

---

# Workspace Rules

Internal applications

/workspace/presentation

/workspace/proposal

/workspace/demo

/workspace/calculator

Protected routes should never appear in

Navigation

Footer

Sitemap

Robots

unless explicitly enabled.

---

# Feature Flag Rules

Future modules should support feature flags.

Visibility should never be hardcoded.

Examples

Presentation

Proposal

Daily Brief

Market Signals

Resources

Workspace

---

# CSS Rules

Prefer Tailwind.

Avoid custom CSS unless justified.

Avoid duplicated utility classes.

Shared styles belong in global styles.

---

# JavaScript Rules

Prefer server-rendered HTML.

Hydrate only interactive components.

Avoid unnecessary client JavaScript.

---

# Dependency Rules

Before installing a dependency ask

Can existing code solve it?

Can browser APIs solve it?

Can Astro solve it?

Can Cloudflare solve it?

Prefer fewer dependencies.

---

# Security Rules

Never commit

Secrets

Passwords

Tokens

Private keys

Environment files

Never expose sensitive information in frontend code.

---

# Testing Rules

Every migration should verify

Build

Routes

Forms

Metadata

Accessibility

Performance

TypeScript

Broken imports

---

# Migration Rules

Migration order

Audit

↓

Plan

↓

Implement

↓

Validate

↓

Optimize

↓

Document

↓

Remove legacy

Never skip validation.

---

# Git Rules

Small commits.

Focused commits.

No unrelated formatting.

No accidental file movement.

Preserve meaningful history.

---

# Pull Request Rules

Every PR should describe

Purpose

Files changed

Reason

Risks

Testing completed

Remaining work

---

# AI Coding Agent Rules

Before creating code

Read PRD

Read AGENTS.md

Read Repository Rules

Inspect existing implementation

Reuse before creating

Keep architecture consistent

Never invent new repository structures.

---

# Repository Health

A healthy repository has

No duplicate components

No duplicate utilities

No duplicate assets

No dead code

No unused dependencies

No hidden business logic

Clear ownership

Small reusable modules

Predictable structure

---

# Final Principle

The repository is a long-term business asset.

Optimize for maintainability over speed.

Optimize for clarity over cleverness.

Optimize for consistency over personal preference.

Every file should have a clear owner, a clear purpose, and a predictable location.

When uncertain, preserve the existing architecture rather than inventing a new one.
