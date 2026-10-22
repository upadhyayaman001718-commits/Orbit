# Unified AI-Native Development Workspace

Single workspace combining code, tasks, Git, deployments, databases, documentation, communication, and AI agents.

## Core Architectural Principles

- **Project-centric:** All workflows and resources revolve around projects.
- **API-first:** Frontend communicates strictly via the API server; never touches backend infrastructure directly.
- **History over state:** Decisions and context recorded alongside code changes.
- **AI as first-class participant:** Transparent, permissioned agents leveraging the same endpoints as human developers.

## Repository Layout

```text
unified-workspace/
├── apps/
│   ├── api/          # Express + Node.js + TypeScript API
│   └── web/          # Next.js 14 + React + Tailwind CSS
├── packages/
│   ├── config/       # Shared TypeScript and tooling configs
│   ├── database/     # Prisma ORM + PostgreSQL schema
│   └── types/        # Shared TypeScript contracts and schemas
└── docs/             # Architecture, decisions, and project specs
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Generate Prisma client (offline, no database needed):
   ```bash
   npm run db:generate
   ```

3. Run API server (port 4000):
   ```bash
   npm run dev:api
   ```

4. Run Web application (port 3000):
   ```bash
   npm run dev:web
   ```
