# ADR-010-Cloudflare-Platform: Cloudflare Platform

Status: Accepted

## Context

See PRD-001 and Software Architecture documentation.

## Decision

Target Cloudflare-native deployment with Workers and optional D1/R2/KV when justified.

## Consequences

### Positive

- Improves maintainability
- Supports long-term platform growth
- Reduces migration risk

### Trade-offs

- Requires discipline to follow repository standards
- Additional documentation must be maintained
