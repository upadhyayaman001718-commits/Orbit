# Unified Workspace

Unified AI-Native Development Workspace foundation.

## Quickstart

```bash
# 1. Install all monorepo dependencies
npm install

# 2. Generate Prisma client (requires no live DB connection)
npm run db:generate

# 3. Start development servers
npm run dev:api    # Starts API on http://localhost:4000
npm run dev:web    # Starts Web on http://localhost:3000
```

## Structure

- `apps/api`: Express, TypeScript, Node.js (`GET /health` included)
- `apps/web`: Next.js 14 App Router, React, Tailwind CSS
- `packages/database`: Prisma + PostgreSQL schema
- `packages/types`: Shared TypeScript definitions
- `packages/config`: Shared configuration templates
- `docs/`: Architecture documents and ADRs
