# AGENTS
# AGENTS.md
# Myelektra Platform

Version: 1.0

---

# Purpose

This document defines how AI coding agents and human developers must work
inside the Myelektra Platform repository.

Every implementation must follow these rules.

If implementation conflicts with this document,
stop and explain the conflict.

Never silently ignore these rules.

---

# Project Vision

The Myelektra Platform is evolving from a marketing website into a
Revenue Intelligence Platform.

The repository is designed for long-term growth.

Current applications include:

• Website

Future applications include:

• MIC (Myelektra Intelligence Console)

• AI Workspace

• Revenue Intelligence

• Company Intelligence

• Market Signals

• Daily Brief

The architecture must support future expansion without requiring another
major migration.

---

# Documentation Hierarchy

Always follow documentation in this order.

1.

PRD

↓

2.

Software Architecture

↓

3.

Repository Rules

↓

4.

Coding Standards

↓

5.

Task Instructions

Never allow task instructions to override documented architecture.

---

# Repository Structure

myelektra-platform/

apps/

legacy/

packages/

docs/

scripts/

infrastructure/

---

# Folder Ownership

apps/

Production applications only.

---

legacy/

Migration source.

Read-only.

Never implement new features here.

---

packages/

Reusable code.

Shared components.

Shared utilities.

Shared types.

Shared assets.

---

docs/

Documentation only.

Never place executable production code here.

---

scripts/

Automation.

Migration utilities.

Developer tooling.

---

infrastructure/

Deployment.

Cloudflare configuration.

Environment setup.

Infrastructure as code.

---

# Production Applications

Current

apps/website

Future

apps/mic

apps/ai-workspace

Each application must remain independently understandable.

---

# Legacy Application

Location

legacy/website-react-vite

Purpose

Migration source only.

Never use it as the production application.

Never implement new functionality here.

Only reference it during migration.

---

# Migration Principles

Migration means:

Preserve business behavior.

Replace technical implementation.

Not redesign.

Not rewrite for the sake of rewriting.

Preserve:

• URLs

• Navigation

• Brand

• SEO

• Conversion flow

• Business logic

---

# Architecture Principles

Prefer

Simple

↓

Reusable

↓

Maintainable

↓

Predictable

Avoid

Large components

Complex inheritance

Hidden logic

Magic configuration

Over-engineering

---

# Component Rules

Every component should have one responsibility.

Avoid giant components.

Prefer composition.

Reuse existing components before creating new ones.

Shared components belong inside packages/ui.

---

# Naming

Use descriptive names.

Good

HeroSection

PricingTable

IndustryCard

Bad

Card2

Component

NewComponent

Temp

Test123

---

# Files

Prefer smaller files.

Large files should be split logically.

Avoid files exceeding approximately 400 lines unless justified.

---

# React Usage

React exists only where interactivity is required.

Static UI should not require React.

Do not convert everything into React.

---

# Astro

Astro is the primary framework.

Prefer Astro whenever server-rendered HTML is sufficient.

---

# Shared Packages

Place reusable code into packages.

Examples

packages/ui

packages/utils

packages/types

packages/config

packages/content

packages/assets

Avoid duplicate implementations.

---

# Content

Content is not presentation.

Avoid hardcoded editorial content.

Content should remain portable.

Future ownership transfers to MIC.

---

# Feature Flags

Future modules should support feature flags.

Examples

Presentation

Proposal

Daily Brief

Market Signals

Resources

Workspace

Visibility should never be hardcoded.

---

# Internal Workspace

Internal applications belong under

/workspace

Examples

/workspace/presentation

/workspace/proposal

/workspace/demo

/workspace/calculator

Never expose internal routes publicly without approval.

---

# Documentation Driven Development

Read documentation before coding.

Never guess business requirements.

If documentation is missing,

Ask.

Do not invent.

---

# Error Handling

Fail safely.

Return useful error messages.

Avoid silent failures.

Never swallow exceptions.

---

# Dependencies

Before installing a dependency ask

Can existing code solve this?

Can browser APIs solve this?

Can Astro solve this?

Can Cloudflare solve this?

Prefer fewer dependencies.

---

# Security

Never expose

Secrets

Tokens

Private keys

API credentials

Customer data

Internal identifiers

Never commit secrets.

---

# Performance

Prefer

Less JavaScript

Smaller bundles

Lazy loading

Static rendering

Efficient images

Avoid unnecessary hydration.

---

# Accessibility

Use semantic HTML.

Support keyboard navigation.

Use descriptive labels.

Maintain heading hierarchy.

Avoid accessibility regressions.

---

# SEO

Preserve existing SEO value.

Do not change URLs without approval.

Avoid duplicate metadata.

Avoid thin pages.

Avoid fake content.

---

# Code Quality

Write code that another engineer can understand in one reading.

Optimize for clarity.

Not cleverness.

---

# Comments

Write comments only when they explain intent.

Do not comment obvious code.

Bad

increment i

Good

Required because HubSpot expects UTC timestamps.

---

# Git

Keep changes focused.

Avoid unrelated formatting.

Avoid moving files unnecessarily.

Keep history understandable.

---

# Migration Workflow

Always work in this order

Audit

↓

Plan

↓

Implement

↓

Validate

↓

Refactor

↓

Optimize

↓

Document

Never skip validation.

---

# Validation Checklist

Before considering work complete verify

Build succeeds

No TypeScript errors

No broken imports

No broken routes

No duplicate components

No unused dependencies

No accessibility regressions

No SEO regressions

---

# AI Coding Workflow

Before editing

Read documentation.

Inspect existing implementation.

Understand dependencies.

Search for reusable code.

Then modify.

Never begin coding immediately.

---

# Communication

Explain

What changed.

Why.

Risks.

Remaining work.

Recommendations.

Never simply output code without context.

---

# Final Principle

The objective is not simply to migrate React into Astro.

The objective is to build the long-term foundation of the Myelektra Platform.

Every decision should reduce future maintenance effort.

Every decision should improve consistency.

Every decision should make the repository easier for future engineers and AI
coding agents to understand.
