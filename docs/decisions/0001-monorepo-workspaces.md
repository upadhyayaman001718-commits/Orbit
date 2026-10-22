# ADR 0001: Monorepo Architecture with npm Workspaces

- **Status:** Accepted
- **Date:** 2026-10-21
- **Deciders:** Unified Workspace Core Team

## Context and Problem Statement
Unified Workspace combines several distinct system layers: a web frontend dashboard (`apps/web`), a backend API (`apps/api`), database schema management (`packages/database`), and shared configurations and types (`packages/config`, `packages/types`). 

How should we structure the repository to maintain high feature velocity, prevent code drift between client and server contracts, and avoid undue dependency overhead?

## Decision Drivers
- **Contract Synchronization:** Frontend and backend must share TypeScript definitions (`HealthResponse`, entity models, request payloads) without manual copying.
- **Minimal Tooling Overhead:** Keep tooling lightweight and avoid unnecessary abstraction layers or lock-in early in the project.
- **Independent Component Lifecycles:** Allow the API and Web apps to be developed, tested, and deployed independently.

## Considered Options
1. **Multi-Repo (Polyrepo):** Separate repositories for `web`, `api`, `database`, and shared packages published to a private npm registry.
2. **Next.js Fullstack Monolith:** Housing backend logic directly within Next.js API Routes and Server Actions in a single project folder.
3. **Monorepo with Heavy Tooling (Turborepo / Nx):** Advanced monorepo managers with task caching and pipeline orchestration.
4. **Monorepo with Native npm Workspaces:** Standard Node.js `workspaces` in root `package.json` with relative dependency resolution.

## Decision Outcome
**Chosen Option:** **Option 4: Monorepo with Native npm Workspaces**.

### Positive Consequences
- **Zero Extra Dependencies:** Native to Node.js and npm; requires no separate CLI installations or complex pipeline configuration.
- **Shared Source of Truth:** `packages/types` can be referenced directly by both `apps/web` and `apps/api`, eliminating contract drift.
- **Atomic Commits:** Changes spanning the database schema, backend endpoints, and frontend components can be reviewed and versioned together.

### Negative Consequences / Trade-offs
- Root `package.json` manages workspace glob patterns, requiring care with root scripts.
- Lacks remote caching out of the box (can be upgraded to Turborepo later if build times demand it).

## Pros and Cons of the Options

### Option 1: Multi-Repo
- Good: Independent Git history and access control per repo.
- Bad: High overhead when updating shared types; requires private registry or git submodules; high friction for cross-cutting changes.

### Option 2: Next.js Fullstack Monolith
- Good: Simplest initial single-folder setup.
- Bad: Violates the API-first architectural requirement; couples background worker loops, long-running agent processes, and persistent connections to Next.js serverless runtimes.

### Option 3: Monorepo with Turborepo / Nx
- Good: Powerful caching, parallelization, and build graph visualization.
- Bad: Adds unnecessary tooling complexity before the project has reached a scale that justifies it.

### Option 4: Monorepo with Native npm Workspaces (Chosen)
- Good: Built into standard npm; low cognitive overhead; handles package linking seamlessly.
- Bad: Basic task orchestration compared to specialized build systems.
