# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 landing page for Liro, a software delivery platform. The project features:
- Next.js 15 with App Router
- TypeScript
- Tailwind CSS v4
- Internationalization (i18n) with next-intl supporting English and Portuguese (Brazilian)
- Modern UI components using Radix UI and custom MagicUI components
- Supabase integration for authentication and database
- React Query for server state management
- Zustand for client state management
- Form validation with React Hook Form and Zod
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

### Authentication & Database
- **Supabase Integration**: Full authentication system with custom session storage
- **Database Schema**: PostgreSQL with profiles table and role-based access control
- **Authentication Hooks**: Query-based hooks for auth state management
- **Role System**: Admin/user roles with JWT-based role extraction
- **Session Management**: Cookie + localStorage hybrid storage for SSR compatibility
- **Migrations**: Located in `supabase-migrations/` directory for database schema

### State Management
- **React Query**: Server state management with optimistic updates and error handling
- **Zustand**: Client state for authentication state and session-based role checking
- **Query Keys**: Centralized query key management in `src/lib/query-keys.ts`
- **Auth Store**: Session-based immediate role access via `useAuthStore`

### Data Layer
- **Query Provider**: Centralized React Query configuration with devtools
- **Auth Queries**: `useAuthQuery` hook for authentication state
- **Profile Queries**: `useProfileQuery` hook for user profile management
- **Error Handling**: Structured error handling with retry logic and optimistic updates

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
- **Protected Routes**: Login and profile pages with authentication
- **Careers Section**: Multi-page careers system with job listings and details

### Component Architecture
- **UI Components**: `src/components/ui/` - Radix UI-based components using shadcn/ui patterns
- **MagicUI Components**: `src/components/magicui/` - Custom animated/interactive components:
  - `bento-grid.tsx` - Main feature grid layout
  - `meteors.tsx`, `particles.tsx` - Background animations
  - `text-animate.tsx`, `text-reveal.tsx`, `sparkles-text.tsx` - Text animations
  - `marquee.tsx`, `scroll-based-velocity.tsx` - Scrolling effects
- **Layout Components**: `header.tsx`, `footer.tsx`
- **Feature Components**: `LanguageSwitcher.tsx`, `user-menu.tsx`, `system-marquee.tsx`
- **Form Components**: `login-form.tsx`, `profile-form.tsx` with React Hook Form integration
- **Career Components**: Modular career page components in `src/components/careers/`

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
- **User Authentication**: Complete login/logout system with profile management
- **Career Pages**: Job listings with detailed job descriptions and application flow
- **Responsive Design**: Mobile-first approach with breakpoint-specific optimizations
- **Animation System**: Extensive use of motion and interactive animations
- **SEO Optimization**: Comprehensive metadata, Open Graph, Twitter cards, structured data

## Development Guidelines

### Authentication Development
- Use `useAuthQuery()` for authentication state in components
- Access immediate role checking via `useAuthStore()` methods
- Follow optimistic update patterns for auth mutations
- Handle loading states and error conditions properly

### Database Operations
- Use Supabase client from `src/lib/supabase.ts`
- Follow type-safe patterns with generated database types
- Implement proper error handling for database operations
- Use migrations in `supabase-migrations/` for schema changes

### State Management Patterns
- Use React Query for server state (API calls, database operations)
- Use Zustand for client state (UI state, temporary data)
- Implement proper cache invalidation strategies
- Follow established query key conventions

### Adding New Components
- Follow the established pattern in `src/components/ui/` for base UI components
- Use `src/components/magicui/` for interactive/animated components
- Import icons from `@radix-ui/react-icons` or `lucide-react`
- Integrate proper form validation with React Hook Form and Zod
- **ALWAYS use official Card components**: Import and use `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` from `@/components/ui/card` instead of creating custom div-based cards. This ensures consistent styling, proper semantic structure, and maintains design system integrity.

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