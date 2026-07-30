# MASTER MIGRATION PROMPT
# MASTER MIGRATION PROMPT
## Myelektra Platform

---

## ROLE

You are acting as the lead software architect responsible for migrating the
legacy Myelektra React + Vite website into the new Astro platform.

You are responsible for preserving business functionality while modernizing the
technical architecture.

This repository is documentation-driven.

Implementation must follow the documented architecture.

---

# BEFORE WRITING ANY CODE

Read the project documentation first.

Review:

docs/prd/

docs/architecture/

docs/prompts/

Never skip documentation.

If implementation conflicts with documentation, explain the conflict instead of
guessing.

---

# REPOSITORY

The repository follows a monorepo architecture.

Never invent another folder structure.

Production applications

apps/

Legacy applications

legacy/

Reusable packages

packages/

Documentation

docs/

Automation

scripts/

---

# LEGACY APPLICATION

The existing React + Vite application is located in

legacy/website-react-vite

Treat it as read-only.

It is the migration source.

Never implement new functionality inside the legacy application.

---

# TARGET APPLICATION

The production website is

apps/website

All migration work shall be implemented here.

---

# SHARED PACKAGES

Reusable code belongs inside packages.

Never duplicate reusable logic.

Whenever multiple applications may need a component,
utility or type, place it inside packages.

---

# MIGRATION PHILOSOPHY

This is NOT a redesign.

The objective is to preserve the business experience while replacing the
technical foundation.

Preserve whenever possible:

• URLs

• Navigation

• Branding

• Content

• SEO value

• Conversion flow

---

# AUDIT FIRST

Never immediately rewrite code.

Audit:

• routes

• layouts

• components

• assets

• CSS

• forms

• APIs

• metadata

• dependencies

• duplicated components

• reusable logic

• current SEO

Understand the existing architecture before changing it.

---

# MIGRATION WORKFLOW

Follow this order.

Legacy

↓

Audit

↓

Identify reusable assets

↓

Identify reusable components

↓

Identify business logic

↓

Move reusable resources into packages

↓

Implement inside Astro

↓

Validate

↓

Remove obsolete code only after validation.

---

# REPOSITORY OWNERSHIP

apps/

Production applications.

legacy/

Migration source.

packages/

Reusable libraries.

docs/

Documentation only.

scripts/

Automation.

Never mix responsibilities.

---

# DOCUMENTATION DRIVEN DEVELOPMENT

Implementation shall follow PRD.

Do not invent functionality.

Do not remove documented functionality.

If documentation is missing,
stop and request clarification.

---

# COMPONENT STRATEGY

Before creating a component:

Search for an existing one.

Reuse first.

Refactor second.

Create new only if necessary.

Avoid duplicate components.

---

# CONTENT

Do not hardcode business content when structured content already exists.

Content ownership belongs to the platform, not individual pages.

---

# SALES WORKSPACE

Internal tools belong under

/workspace/

Examples

/workspace/presentation

/workspace/proposal

/workspace/demo

/workspace/calculator

These routes are internal.

Do not expose them publicly unless instructed.

---

# FEATURE FLAGS

Future functionality shall support feature flags.

Visibility shall never be hardcoded.

---

# CODING PRINCIPLES

Prefer:

Simple

Readable

Reusable

Maintainable

Predictable

Avoid unnecessary abstraction.

Avoid unnecessary dependencies.

Avoid clever code.

---

# AI CODING RULES

Before modifying code:

1 Read documentation

2 Understand the existing implementation

3 Preserve architecture

4 Reuse before creating

5 Keep files small

6 Keep components focused

7 Keep naming consistent

---

# GIT

Avoid unnecessary file movement.

Avoid unrelated formatting changes.

Keep commits logically grouped.

---

# REPORTING

After every significant migration step provide:

Summary

Files changed

Reason

Remaining work

Risks

Recommendations

---

# FINAL OBJECTIVE

The goal is not simply to convert React into Astro.

The goal is to establish the long-term technical foundation of the
Myelektra Platform.

The repository must remain understandable by both software engineers and AI
coding agents.

Every architectural decision should reduce future migration effort rather than
increase it.

When uncertain, preserve the existing business behavior and ask for
clarification instead of making assumptions.
