---
title: Engineering Documentation
category: engineering
owner: engineering-lead
status: approved
last_updated: 2026-07-31
---

# Engineering

How Before Academy is built. Canonical for architecture, data, engines, auth, security, performance, errors, testing, and operations. Product behaviour is canonical in [../product/](../product/README.md) (cited, never restated); decision reasoning in [../adr/](../adr/README.md).

## Organization
Core: [architecture.md](architecture.md) · [repository.md](repository.md) · [frontend.md](frontend.md) · [backend.md](backend.md) · [database.md](database.md)
Systems: [content-engine.md](content-engine.md) · [assessment-engine.md](assessment-engine.md) · [auth.md](auth.md) · [api-contracts.md](api-contracts.md) · [analytics.md](analytics.md)
Cross-cutting (defined once, inherited everywhere): [security.md](security.md) · [performance.md](performance.md) · [error-handling.md](error-handling.md) · [testing.md](testing.md) · [standards.md](standards.md)
Ops: [deployment.md](deployment.md)

## Common workflows
New server behaviour → api-contracts.md + the owning engine doc + security.md. Schema change → database.md + deployment.md (migrations). Any story → standards.md applies; testing.md defines the layers.

## Related Documents
- [../implementation/README.md](../implementation/README.md) — task-shaped entry points
