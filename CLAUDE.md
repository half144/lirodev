# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 landing page for Liro, a software delivery platform. The project features:
- Next.js 15 with App Router
- TypeScript
- Tailwind CSS v4
- Internationalization (i18n) with next-intl supporting English and Portuguese (Brazilian)
- Modern UI components using Radix UI and custom MagicUI components
- Responsive design with mobile-first approach

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Architecture & Structure

### Internationalization Setup
- Uses `next-intl` for i18n with middleware-based routing
- Supported locales: `en` (English) and `br` (Portuguese/Brazilian)
- Default locale: `br`
- Translation files: `messages/en.json` and `messages/br.json`
- Routing configuration: `src/i18n/routing.ts`
- Main i18n config: `src/i18n.ts`
- Middleware: `src/middleware.ts` handles locale detection and routing

### App Structure
- **App Router**: Uses Next.js 15 App Router with localized routes under `[locale]`
- **Layout Structure**: 
  - Root layout: `src/app/layout.tsx`
  - Localized layout: `src/app/[locale]/layout.tsx` (contains SEO metadata, structured data, header)
  - Main page: `src/app/[locale]/page.tsx`

### Component Architecture
- **UI Components**: `src/components/ui/` - Radix UI-based components using shadcn/ui patterns
- **MagicUI Components**: `src/components/magicui/` - Custom animated/interactive components:
  - `bento-grid.tsx` - Main feature grid layout
  - `meteors.tsx`, `particles.tsx` - Background animations
  - `text-animate.tsx`, `text-reveal.tsx`, `sparkles-text.tsx` - Text animations
  - `marquee.tsx`, `scroll-based-velocity.tsx` - Scrolling effects
- **Layout Components**: `header.tsx`, `footer.tsx`
- **Feature Components**: `LanguageSwitcher.tsx`, `system-marquee.tsx`

### Styling & Design System
- **Tailwind CSS v4**: Uses latest version with CSS variables for theming
- **shadcn/ui Configuration**: `components.json` defines component structure and aliases
- **Design Tokens**: Uses neutral base color with CSS variables
- **Dark Theme**: Default dark theme applied globally
- **Component Aliases**: 
  - `@/components` - Components directory
  - `@/lib/utils` - Utility functions
  - `@/components/ui` - UI components

### Key Features
- **Landing Page Sections**:
  - Hero section with animated text and CTAs
  - Bento grid layout showcasing services/features
  - System marquee for social proof
  - Text reveal section for detailed messaging
- **Responsive Design**: Mobile-first approach with breakpoint-specific optimizations
- **Animation System**: Extensive use of motion and interactive animations
- **SEO Optimization**: Comprehensive metadata, Open Graph, Twitter cards, structured data

## Development Guidelines

### Adding New Components
- Follow the established pattern in `src/components/ui/` for base UI components
- Use `src/components/magicui/` for interactive/animated components
- Import icons from `@radix-ui/react-icons` or `lucide-react`

### Internationalization
- Add new text content to both `messages/en.json` and `messages/br.json`
- Use `useTranslations()` hook in components: `const t = useTranslations("section")`
- Follow the nested key structure for organization

### Styling
- Use Tailwind classes following the established responsive patterns
- Leverage CSS variables for consistent theming
- Follow dark theme design principles
- Use `cn()` utility from `@/lib/utils` for conditional classes

### Typography & Content
- Primary font: Inter (loaded via next/font)
- Hero section uses large responsive text sizes
- Maintain consistent spacing with Tailwind spacing scale
- Content focuses on enterprise software solutions and ROI messaging