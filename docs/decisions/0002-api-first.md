# ADR 0002: API-First Architecture

- **Status:** Accepted
- **Date:** 2026-10-21
- **Deciders:** Unified Workspace Core Team

## Context and Problem Statement
Unified Workspace is designed to integrate human developers, automated background workflows, and AI agents. How should client interfaces, automated agents, and external integrations interact with the core platform services and data?

## Decision Drivers
- **Omnichannel Access:** The web dashboard, CLI tools, and AI agents must be able to invoke identical platform capabilities.
- **Security & Auditing:** All actions must pass through centralized authorization checks and generate audit logs.
- **Separation of Concerns:** Client UI code should focus entirely on presentation and user interaction without embedding direct database calls or backend business logic.

## Considered Options
1. **Direct Database Access:** Client apps and UI components query the PostgreSQL database directly via client-side ORM calls (e.g., Supabase-style direct queries).
2. **Backend-for-Frontend (BFF) Embedded Logic:** Tightly coupling business logic directly inside Next.js server actions and API routes.
3. **Decoupled API-First Architecture:** Centralizing all business logic, authentication, and validation within a standalone Express API service (`apps/api`), consumed by the frontend via typed REST endpoints.

## Decision Outcome
**Chosen Option:** **Option 3: Decoupled API-First Architecture**.

### Positive Consequences
- **Unified Security Perimeter:** Authentication, rate limiting, and RBAC are enforced at a single gateway (`apps/api`), preventing client-side bypass.
- **AI-Ready:** AI agents act through the exact same HTTP/REST endpoints as human developers, ensuring equal security guardrails and auditability.
- **Clean Separation:** UI refactors cannot inadvertently corrupt backend transaction logic.

### Negative Consequences / Trade-offs
- Requires maintaining separate routing and type definitions across client and server (mitigated by `packages/types`).
- Requires CORS and environment configuration for local and remote development.

## Pros and Cons of the Options

### Option 1: Direct Database Access
- Good: Fast initial scaffolding; no API service to write.
- Bad: Exposes database schema directly to clients; difficult to enforce complex validation rules or audit AI agent actions; brittle security.

### Option 2: BFF Embedded Logic
- Good: Colocates UI and server actions.
- Bad: Makes it difficult to expose the same capabilities to non-web clients (CLI, background agents, external integrations).

### Option 3: Decoupled API-First Architecture (Chosen)
- Good: Robust, scalable, secure, and fully supports AI agents as first-class participants.
- Bad: Slightly more initial boilerplate than a monolithic setup.
