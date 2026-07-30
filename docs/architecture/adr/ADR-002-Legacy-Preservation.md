# ADR-002-Legacy-Preservation: Legacy Preservation

Status: Accepted

## Context

See PRD-001 and Software Architecture documentation.

## Decision

Keep the React+Vite application under legacy/website-react-vite as the migration source and treat it as read-only.

## Consequences

### Positive

- Improves maintainability
- Supports long-term platform growth
- Reduces migration risk

### Trade-offs

- Requires discipline to follow repository standards
- Additional documentation must be maintained
