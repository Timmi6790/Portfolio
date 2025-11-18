# Copilot Instructions for Portfolio

This document provides coding guidelines and best practices for GitHub Copilot when working on this portfolio project.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19 + shadcn/ui, Radix UI, Lucide Icons
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript (strict mode)
- **i18n**: next-intl
- **Testing**: Vitest, Playwright with axe-core for accessibility
- **Package Manager**: pnpm

## Code Standards

### TypeScript

- **Always use TypeScript** for all new files (`.ts`, `.tsx`)
- **Strict mode is enabled** - follow all strict type checking rules
- **Never use `any` type** - use `unknown` or proper types instead
- **Use proper type definitions** - avoid type assertions unless absolutely necessary
- **Path aliases**: Use `@/*` for `src/*` imports
- Key compiler options:
  - `noUncheckedIndexedAccess: true` - always check array/object access
  - `exactOptionalPropertyTypes: true` - prevent `undefined` in optional properties
  - `noImplicitReturns: true` - all code paths must return a value
  - `noUnusedLocals: true` and `noUnusedParameters: true` - clean code only

### Code Style

- **Formatting**: Use Prettier with these settings:
  - No semicolons (`semi: false`)
  - Single quotes (`singleQuote: true`)
  - 2-space indentation
  - 80 character line width
  - Trailing commas in ES5 style
  - Use Tailwind CSS plugin for class sorting
- **Linting**: ESLint is configured with multiple plugins:
  - TypeScript ESLint with recommended rules
  - React and React Hooks rules
  - Next.js plugin for framework-specific best practices
  - Security plugin for vulnerability detection
  - SonarJS for code quality
  - No secrets plugin for credential detection
  - Perfectionist for import/export sorting
  - Unicorn for JavaScript best practices
  - JSX a11y for accessibility
  - React Compiler plugin
- **Always run** `pnpm format` before committing
- **Always run** `pnpm lint` to check for issues

### React & Next.js

- **Use React 19** features and conventions
- **Use App Router** (not Pages Router) - all routes in `src/app/[locale]/`
- **Server Components by default** - only use `'use client'` when necessary (interactivity, hooks, browser APIs)
- **Use proper Next.js imports**:
  - Images: `next/image`
  - Links: `next/link`
  - Metadata: export from page/layout files
- **Internationalization**: Use next-intl for all user-facing text
  - Messages are stored in `messages/` directory
  - Use `useTranslations` hook in client components
  - Use `getTranslations` in server components
- **File naming**: Use kebab-case for files (e.g., `theme-toggle.tsx`)
- **Component structure**:
  - Keep components in `src/components/`
  - UI primitives in `src/components/ui/` (shadcn/ui components)
  - Tests in `src/components/__tests__/`

### Testing

- **Use Vitest** for unit and component tests
- **Test file naming**: `*.test.ts` or `*.test.tsx` in `__tests__` directories
- **Testing Library**: Use `@testing-library/react` for component tests
- **Mock patterns**: Use `vi.hoisted()` for mocks that need to be available before imports
- **Accessibility**: Include accessibility tests where applicable
- **E2E tests**: Use Playwright, stored in `tests/` directory
- **Coverage**: Run `pnpm test:ci` for coverage reports
- **Test structure**:

  ```typescript
  describe('ComponentName', () => {
    beforeEach(() => {
      // Setup
    })

    it('describes expected behavior', () => {
      // Test implementation
    })
  })
  ```

### Styling

- **Use Tailwind CSS** for all styling
- **No custom CSS** unless absolutely necessary
- **Responsive design**: Mobile-first approach
- **Dark mode**: Support both light and dark themes
- **Accessibility**: Follow WCAG guidelines
  - Use semantic HTML
  - Include proper ARIA labels
  - Ensure keyboard navigation works
  - Test with axe-core

### Commit Messages

Follow Conventional Commits format:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks
- `perf:` - Performance improvements

Example: `feat: add dark mode toggle`

## Project Structure

```
├── .github/              # GitHub configuration
├── messages/             # i18n translation files
├── public/              # Static assets
├── scripts/             # Build and utility scripts
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── [locale]/    # Internationalized routes
│   │   ├── api/         # API routes
│   │   ├── globals.css  # Global styles
│   │   ├── robots.ts    # SEO robots.txt
│   │   └── sitemap.ts   # SEO sitemap
│   ├── components/      # React components
│   │   ├── __tests__/   # Component tests
│   │   └── ui/          # shadcn/ui components
│   ├── i18n/            # i18n configuration
│   ├── lib/             # Utility functions
│   └── types/           # TypeScript type definitions
├── test/                # Test setup
└── tests/               # E2E tests (Playwright)
```

## Development Workflow

1. **Setup**: `pnpm install`
2. **Development**: `pnpm dev` (runs on http://localhost:3000)
3. **Type checking**: `pnpm type-check`
4. **Linting**: `pnpm lint` or `pnpm lint:fix`
5. **Formatting**: `pnpm format` or `pnpm format:check`
6. **Testing**: `pnpm test` or `pnpm test:run`
7. **E2E tests**: `pnpm e2e`
8. **Build**: `pnpm build`
9. **Dependency linting**: `pnpm lint:deps`

## Best Practices

### Security

- **Never commit secrets** - use environment variables
- **Follow security plugin rules** - address any security warnings
- **Validate user input** - sanitize and validate all external data
- **Use environment variables**: Store in `.env.local` (not committed)

### Performance

- **Optimize images** - use Next.js Image component with proper sizes
- **Code splitting** - leverage dynamic imports for large components
- **Bundle analysis** - run `pnpm analyze` to check bundle size
- **Server Components** - prefer server components for better performance

### Accessibility

- **Semantic HTML** - use proper HTML elements
- **ARIA attributes** - add when semantic HTML isn't enough
- **Keyboard navigation** - ensure all interactive elements are keyboard accessible
- **Color contrast** - ensure sufficient contrast ratios
- **Screen readers** - test with screen readers when possible

### Code Quality

- **DRY principle** - avoid code duplication
- **Single responsibility** - one component, one purpose
- **Composition over inheritance** - favor composition patterns
- **Immutability** - avoid mutating data
- **Pure functions** - prefer pure, side-effect-free functions where possible

## Environment Variables

| Name           | Required | Purpose                                           |
| -------------- | -------- | ------------------------------------------------- |
| `GITHUB_TOKEN` | Yes      | Token to access private data for the chart graph. |

## Common Patterns

### Creating a new component

```typescript
import type { FC } from 'react'

interface ComponentNameProps {
  // Props type definition
}

export const ComponentName: FC<ComponentNameProps> = ({ ...props }) => {
  return (
    <div>
      {/* Component JSX */}
    </div>
  )
}
```

### Using translations

```typescript
// Server Component
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('namespace')
  return <h1>{t('key')}</h1>
}

// Client Component
'use client'
import { useTranslations } from 'next-intl'

export function Component() {
  const t = useTranslations('namespace')
  return <h1>{t('key')}</h1>
}
```

### Using path aliases

```typescript
// Correct
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// Incorrect
import { Button } from '../../../components/ui/button'
```

## Additional Notes

- **Browser support**: Defined in `package.json` browserslist
- **Node.js version**: 22 or higher recommended
- **pnpm version**: 9 or higher required
- **Docker support**: Available for containerized development and production
- **Husky**: Git hooks are configured for pre-commit checks

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
