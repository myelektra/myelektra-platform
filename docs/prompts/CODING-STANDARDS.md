# CODING-STANDARDS.md
# Myelektra Platform Coding Standards

Version: 1.0

---

# Purpose

This document defines the coding standards for the Myelektra Platform.

Every human developer and AI coding agent must follow these standards.

The objective is to produce code that is:

• Readable

• Predictable

• Maintainable

• Testable

• Reusable

• Documentation-friendly

---

# Core Principles

Always optimize for

Readability

↓

Maintainability

↓

Consistency

↓

Performance

↓

Developer Productivity

Never optimize for cleverness.

---

# General Rules

Write code for the next engineer.

Assume another AI agent will continue your work.

Avoid surprising implementations.

---

# Architecture First

Before writing code

Read

PRD

↓

AGENTS.md

↓

REPOSITORY-RULES.md

↓

Software Architecture

Never invent architecture.

---

# TypeScript

Always use TypeScript.

Avoid JavaScript unless explicitly required.

Enable strict typing.

Avoid

any

Prefer

unknown

or proper interfaces.

---

# Type Definitions

Create interfaces for shared models.

Bad

```
const company:any
```

Good

```ts
interface Company {
    id:string;
    name:string;
}
```

Never duplicate interfaces.

Shared interfaces belong in

packages/types

---

# Naming

Variables

camelCase

Functions

camelCase

Interfaces

PascalCase

Components

PascalCase

Enums

PascalCase

Constants

UPPER_CASE

---

# File Names

Astro

HeroSection.astro

React

TargetBuilder.tsx

Utilities

slugify.ts

Types

Company.ts

Avoid

component.tsx

new.ts

temp.ts

test2.ts

---

# Functions

One function

One responsibility

Avoid giant functions.

Prefer early return.

Bad

```
if(){

}else{

}
```

Good

```
if(!company){

return;

}
```

---

# Components

Keep components small.

Target

Less than 300 lines.

Split when necessary.

Avoid multiple responsibilities.

---

# Props

Always type props.

Bad

```
function Hero(props){
```

Good

```ts
interface HeroProps{

title:string;

description:string;

}

export default function Hero(
props:HeroProps
)
```

---

# React

Use React only when interaction is required.

Avoid

client:load

unless necessary.

Prefer

client:visible

client:idle

when appropriate.

---

# Astro

Astro is the default.

Prefer server-rendered HTML.

Avoid unnecessary hydration.

---

# State

Prefer local state.

Avoid global state unless justified.

Do not introduce state libraries without approval.

---

# Data Fetching

Prefer server-side fetching.

Avoid client fetching for static content.

---

# Content

Never hardcode large business content.

Content belongs in

packages/content

Future source

MIC

---

# Styling

Tailwind first.

Avoid inline styles.

Avoid duplicated utility groups.

Extract repeated UI.

---

# CSS

Prefer utility classes.

Custom CSS only when justified.

Avoid !important.

---

# Icons

Centralize icons.

Avoid duplicate SVGs.

---

# Images

Use optimized formats.

Prefer

webp

avif

Responsive images.

Lazy load below the fold.

---

# Imports

Prefer package imports.

Good

```
@myelektra/ui
```

Avoid

```
../../../../Button
```

---

# Dependencies

Before installing

Ask

Can Astro solve it?

Can browser APIs solve it?

Can Cloudflare solve it?

Can existing code solve it?

Prefer fewer dependencies.

---

# Error Handling

Never silently ignore errors.

Provide meaningful messages.

Log unexpected failures.

---

# Logging

Development

Verbose

Production

Minimal

Never log secrets.

---

# Security

Never expose

Secrets

Tokens

Private keys

Environment variables

Customer data

Validate all external input.

---

# Environment Variables

Public variables

PUBLIC_

Private variables

Never exposed

Never hardcode credentials.

---

# Accessibility

Semantic HTML first.

Keyboard navigation.

Accessible labels.

Meaningful alt text.

Logical headings.

---

# SEO

Preserve URLs.

Unique titles.

Unique descriptions.

Canonical URLs.

Structured data.

Never generate fake SEO content.

---

# Performance

Reduce JavaScript.

Reduce bundle size.

Reduce hydration.

Optimize images.

Lazy load.

Avoid unnecessary rerenders.

---

# Feature Flags

Future functionality should support feature flags.

Visibility should never be hardcoded.

---

# Forms

Validate server-side.

Validate client-side for UX only.

Never trust client input.

---

# API

Never call private APIs directly from client components.

Prefer server endpoints.

---

# Comments

Comment intent.

Not implementation.

Bad

```ts
// increment i

i++;
```

Good

```ts
// HubSpot requires UTC timestamps.

```

---

# Magic Numbers

Avoid

```
if(score>17)
```

Prefer

```
const MIN_SCORE=17;
```

---

# Duplicate Code

Search first.

Reuse second.

Create third.

---

# Refactoring

Improve readability.

Never change business behavior unintentionally.

Small refactors.

Small commits.

---

# Testing

Every completed task should verify

Build

TypeScript

Lint

Routes

Forms

Accessibility

SEO

Performance

---

# Pull Requests

Describe

Purpose

Files changed

Reason

Testing

Risks

---

# AI Coding Rules

Before writing code

Read documentation

Inspect existing implementation

Search reusable components

Search reusable utilities

Search shared types

Search shared content

Only then create new code.

---

# Code Review Checklist

✓ Readable

✓ Typed

✓ Reusable

✓ Tested

✓ Accessible

✓ SEO safe

✓ Secure

✓ Performance conscious

✓ No duplicate logic

✓ No dead code

✓ Consistent naming

---

# Final Principle

Every line of code should make the repository easier to maintain.

Prefer simple solutions over clever solutions.

Write code that another engineer—or another AI coding agent—can understand immediately without additional explanation.
