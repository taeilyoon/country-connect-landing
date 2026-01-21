# AGENTS.md - Development Guidelines for Agentic Coding

## Project Overview
This is a Next.js 16 landing page for "Korea Connect" - a platform connecting travelers with authentic rural experiences in Korea. The project uses modern React patterns with TypeScript and Tailwind CSS v4.

## Development Commands

### Essential Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

### Testing
No test framework is currently configured. If adding tests, consider Jest + React Testing Library.

## Project Structure

### Key Directories
- `src/app/` - Next.js App Router pages and layouts
- `src/app/globals.css` - Global styles with Tailwind imports and custom CSS variables
- `public/` - Static assets

### Path Aliases
- `@/*` maps to `./src/*` (configured in tsconfig.json)

## Code Style Guidelines

### Import Organization
```typescript
// React/Next.js imports first
'use client' // if needed
import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { Metadata } from 'next'

// Local imports
import './globals.css'
```

### TypeScript Patterns
- Use strict TypeScript (`"strict": true` in tsconfig.json)
- Define proper types for props and state
- Use `Readonly` for immutable prop types where appropriate
- Use `type` for simple types, `interface` for objects that might be extended

### Component Patterns
```typescript
// Functional components with proper typing
export default function ComponentName({ prop }: { prop: string }) {
  // Component logic
  return <div>{prop}</div>
}

// Use client directive for interactive components
'use client'

// State management with proper typing
const [userType, setUserType] = useState<'traveler' | 'host' | null>(null)
```

### Naming Conventions
- **Files**: kebab-case for utilities (e.g., `utils.ts`), PascalCase for components (e.g., `UserProfile.tsx`)
- **Components**: PascalCase
- **Variables/Functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE for exported constants

## Styling Guidelines

### Tailwind CSS v4 Usage
- Use utility classes for styling
- Follow mobile-first responsive design: `className="base md:large xl:xlarge"`
- Use semantic color tokens: `bg-green-600`, `text-gray-600`, etc.

### Custom CSS
- Custom animations defined in `globals.css`
- CSS custom properties for theming (light/dark mode support)
- Avoid inline styles unless absolutely necessary

### Color Palette
- Primary: `green-600`/`green-700`
- Secondary: `amber-100`/`amber-800`
- Neutrals: `gray-*` scale
- Backgrounds: `white`, `gray-50`, `gray-100`

## Linting and Code Quality

### ESLint Configuration
- Uses `eslint-config-next` with core web vitals and TypeScript rules
- Configuration in `eslint.config.mjs`
- Global ignores: `.next/**`, `out/**`, `build/**`, `next-env.d.ts`

### Type Safety Rules
- NO `as any`, `@ts-ignore`, or `@ts-expect-error` allowed
- All components must have proper TypeScript typing
- Use proper error boundaries and error handling

## Development Workflow

### Making Changes
1. Always run `npm run lint` after changes
2. Check TypeScript compilation: `tsc --noEmit`
3. Test responsive design at mobile, tablet, and desktop breakpoints

### File Creation
- New pages go in `src/app/`
- Components can be co-located with pages or in component directories
- Use `.tsx` for React components, `.ts` for utilities
- Import styles using CSS imports or Tailwind utilities

## Performance Considerations

### Next.js Optimizations
- Use `next/image` for optimized images
- Leverage automatic font optimization with `next/font/google`
- Consider code splitting for large components
- Use `use client` directive only when necessary for interactivity

### Bundle Size
- Import only needed components from libraries
- Use dynamic imports for heavy dependencies
- Monitor bundle size with Next.js built-in analyzer

## Common Patterns

### Interactive Components
```typescript
'use client'
import { useState } from 'react'

export default function InteractiveComponent() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="bg-green-600 hover:bg-green-700 transition"
    >
      {isOpen ? 'Close' : 'Open'}
    </button>
  )
}
```

### Responsive Layout
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Content */}
</div>
```

### Custom Animations
```typescript
// In globals.css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

// Usage
<div className="animate-fadeIn">
  {/* Content */}
</div>
```

## Additional Notes

### Environment
- Node.js with ES2022+ features supported
- Modern browser targets
- TypeScript 5.x with strict mode enabled

### Dependencies
- Next.js 16.1.4 with App Router
- React 19.2.3 with concurrent features
- Tailwind CSS v4 with PostCSS integration
- ESLint with Next.js recommended configuration

When working on this project, prioritize performance, accessibility, and maintainability while following established patterns in the codebase.