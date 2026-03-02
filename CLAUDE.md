# CLAUDE.md

## Project Overview

GRAILHUNTER is a collectibles monitoring dashboard — a Next.js 16 app using the App Router, TypeScript, Tailwind CSS 4, and Prisma with PostgreSQL.

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
- `npx prisma migrate dev` — apply database migrations
- `npx prisma generate` — regenerate Prisma client after schema changes

## Code Style

- TypeScript strict mode is enabled (`tsconfig.json`)
- ESLint extends `next/core-web-vitals` and `next/typescript`
- Use the `@/*` path alias for imports from the project root
- Styling uses Tailwind utility classes; custom theme variables are defined in `app/globals.css`
- Font: JetBrains Mono (monospace throughout)
- Prisma client is a singleton in `lib/prisma.ts` — import from there, don't instantiate new clients

## Architecture

- **App Router:** All pages/routes live under `app/`
- **Database:** PostgreSQL via Prisma ORM; schema in `prisma/schema.prisma`
- **Styling:** Tailwind CSS 4 with `@tailwindcss/postcss`; custom CSS variables for the theme palette (cyan, purple, success, warning, error, etc.)
