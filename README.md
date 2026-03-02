# GRAILHUNTER // Collector Bot v4.2

A real-time collectibles monitoring dashboard built with Next.js, Tailwind CSS, and Prisma. Features a cyberpunk/retro terminal aesthetic with live feed tracking, task management, and system status monitoring.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4 with custom theme (JetBrains Mono, scanlines, grid overlays)
- **Database:** PostgreSQL via Prisma ORM
- **Linting:** ESLint with Next.js core-web-vitals and TypeScript rules

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL

### Setup

```bash
# Install dependencies
npm install

# Copy environment config and set your DATABASE_URL
cp .env.example .env

# Run database migrations (when models are added)
npx prisma migrate dev

# Start the development server
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Run production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
app/
  layout.tsx        # Root layout with metadata
  page.tsx          # Dashboard home page
  globals.css       # Theme, animations, custom styles
lib/
  prisma.ts         # Prisma client singleton
prisma/
  schema.prisma     # Database schema
```
