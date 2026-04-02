# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Memberly-open is a static course platform for "Desafio de 28 Dias de Calistenia Militar" — a 28-day military calisthenics challenge. It's a Next.js PWA that displays video lessons organized by weekly modules. Deployed at https://memberly-open.vercel.app/.

## Commands

- `npm run dev` — Start dev server with Turbopack
- `npm run build` — Production build
- `npm run start` — Serve production build locally
- `npx vercel --prod --yes` — Deploy to production on Vercel

No linter or test runner is configured.

## Architecture

**Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4, Motion (framer-motion), Lucide icons, TypeScript.

**Data layer:** All course data is hardcoded in `src/data/course.ts` — there is no database or API. The `Course > Module > Lesson` hierarchy and helper functions (`getAllLessons`, `getLessonById`, `getLessonNavigation`) live here. Lesson videos are YouTube embeds referenced by `videoId`.

**Routing:**
- `/` — Home page (`src/app/page.tsx`) — hero banner, module grid
- `/lessons/[id]` — Lesson page (`src/app/lessons/[id]/page.tsx`) — video player, sidebar with module lessons, prev/next navigation

**Layout:** `src/app/layout.tsx` wraps all pages with a fixed header, footer, and the `WhatsAppButton` component (floating CTA on all pages).

**Components** (`src/app/components/`):
- `WhatsAppButton.tsx` — Floating WhatsApp link (wa.me) with close-on-hover behavior
- `InstallAppButton.tsx` — PWA install prompt with iOS Safari/Chrome detection and tutorial modal

**Styling:** Tailwind v4 with custom theme tokens defined inline in `src/app/globals.css` using `@theme inline`. Dark theme with Netflix-inspired color palette (primary: `#e50914`). Custom utility classes: `.scrollbar-hide`, `.scrollbar-dark`.

**PWA:** Manifest at `public/manifest.json`, icons at `public/icon-*.png`.

**Images:** Remote images from `*.supabase.co` are allowed via `next.config.ts` remotePatterns. Banner and module images are hosted on Supabase Storage.

## Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json).
