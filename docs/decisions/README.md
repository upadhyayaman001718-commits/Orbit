# Architecture Decision Records (ADR) Repository

This directory contains the authoritative record of architectural decisions made for the **Unified Workspace** platform. Decisions are captured using the standard Nygard Architecture Decision Record format.

## ADR Index

| ADR ID | Title | Status | Date |
| :--- | :--- | :--- | :--- |
| [ADR 0001](./0001-monorepo-workspaces.md) | Monorepo Architecture with npm Workspaces | Accepted | 2026-10-21 |
| [ADR 0002](./0002-api-first.md) | API-First Architecture | Accepted | 2026-10-21 |
| [ADR 0003](./0003-postgresql-prisma.md) | PostgreSQL and Prisma ORM for Data Layer | Accepted | 2026-10-21 |
| [ADR 0004](./0004-project-history-and-adrs.md) | Documentation-Driven Evolution & Project History | Accepted | 2026-10-21 |

---

## Guidelines for Authoring ADRs
1. **Immutable Once Accepted:** ADRs record historical context at the time of the decision. If an approach changes, create a new ADR that explicitly supersedes the prior record (e.g. `Supersedes ADR 0001`).
2. **Template:** Use [TEMPLATE.md](./TEMPLATE.md) for all new proposals.
3. **Traceability:** Cross-reference ADRs from `docs/project-history/PROJECT-HISTORY.md` when introducing or updating code.
