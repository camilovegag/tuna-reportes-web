# AGENTS.md - Tuna Reportes Web

Guidelines for AI agents working in this codebase.

## Tech Stack

- **Runtime**: Bun v1.2+
- **Framework**: React 19 + Vite
- **Language**: TypeScript 5 (strict mode)
- **Routing**: React Router v7 (data mode with `createBrowserRouter`)
- **State**: React Query (TanStack Query) for server state
- **Forms**: React Hook Form + Zod v4
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **API Client**: Hono RPC client (type-safe)

## Project Structure

```
src/
├── components/
│   ├── form/          # Form components (FormInput, etc.)
│   ├── ui/            # UI primitives (Button, Input, Typography, etc.)
│   ├── navbar.tsx     # Main navigation
│   ├── route-guards.tsx # ProtectedRoute, GuestRoute
│   └── theme-toggle.tsx # Dark mode toggle
├── contexts/          # React contexts (auth-context)
├── hooks/             # Custom hooks (use-auth)
├── layouts/           # Page layouts
│   ├── app-layout.tsx # Authenticated pages with navbar
│   └── auth-layout.tsx # Login/register split-screen
├── lib/               # Utilities
│   ├── api-client.ts  # Hono RPC client setup
│   ├── query-client.ts # React Query config
│   └── utils.ts       # cn() helper
├── pages/             # Page components
│   ├── auth/          # Login, Register pages
│   └── home-page.tsx  # Dashboard
├── schemas/           # Zod validation schemas
│   ├── login-schema.ts
│   └── register-schema.ts
├── types/             # TypeScript type definitions
├── index.css          # Tailwind + CSS variables
├── main.tsx           # App entry point
└── router.tsx         # Route definitions
```

## Build/Dev Commands

```bash
bun run dev      # Start dev server with HMR
bun run build    # Type check + production build
bun run lint     # ESLint
bun run preview  # Preview production build
```

## Code Style

### Formatting

- Semicolons: required
- Quotes: double quotes
- Trailing commas: all
- Indent: 2 spaces

### Imports

```typescript
// External packages first
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";

// Local imports with @ alias
import { loginSchema, type LoginFormData } from "@/schemas";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form";
import { H1, TextMuted } from "@/components/ui/typography";
```

### Naming Conventions

| Category    | Convention | Example                             |
| ----------- | ---------- | ----------------------------------- |
| Files       | kebab-case | `login-page.tsx`, `auth-layout.tsx` |
| Components  | PascalCase | `LoginPage`, `FormInput`            |
| Hooks       | camelCase  | `useAuth`, `useForm`                |
| Types       | PascalCase | `LoginFormData`, `User`             |
| Schemas     | camelCase  | `loginSchema`, `registerSchema`     |
| CSS classes | kebab-case | Tailwind utilities                  |
| Route paths | kebab-case | `/login`, `/events`                 |

## Component Patterns

### Page Component

```typescript
import { H1, TextMuted } from "@/components/ui/typography";

export function ExamplePage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <H1>Page Title</H1>
        <TextMuted>Page description</TextMuted>
      </div>
      {/* Content */}
    </div>
  );
}
```

### Form Component (with React Hook Form)

```typescript
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { exampleSchema, type ExampleFormData } from "@/schemas";
import { FormInput } from "@/components/form";
import { Button } from "@/components/ui/button";

export function ExampleForm() {
  const methods = useForm<ExampleFormData>({
    resolver: zodResolver(exampleSchema),
  });

  const onSubmit = async (data: ExampleFormData) => {
    // Handle submission
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormInput<ExampleFormData>
          name="fieldName"
          label="Field Label"
          type="text"
          placeholder="Enter value"
        />
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
}
```

### Schema Pattern (Zod v4)

```typescript
import { z } from "zod";

export const exampleSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export type ExampleFormData = z.infer<typeof exampleSchema>;
```

## Styling Guidelines

### Use Flexbox Gap (NOT space-y)

```typescript
// ✅ Correct
<div className="flex flex-col gap-4">

// ❌ Avoid
<div className="space-y-4">
```

### Typography Components

Use typography components for consistent text styling:

```typescript
import { H1, H2, Text, TextMuted, TextSmall, TextError } from "@/components/ui/typography";

<H1>Main Heading</H1>
<TextMuted>Secondary text</TextMuted>
<TextError>Error message</TextError>
```

### Brand Colors (Tuna Sabana)

| Color     | Hex       | Usage                     |
| --------- | --------- | ------------------------- |
| Wine      | `#851939` | Primary actions, branding |
| Dark Blue | `#1A1E28` | Dark mode backgrounds     |

CSS variables are defined in `index.css` using OKLCH color space.

## Routing

### Route Structure

```typescript
// Protected routes require authentication
{
  element: <ProtectedRoute />,
  children: [
    { element: <AppLayout />, children: [...] }
  ]
}

// Guest routes redirect authenticated users
{
  element: <GuestRoute />,
  children: [
    { element: <AuthLayout />, children: [...] }
  ]
}
```

### Navigation Links

Use `NavLink` from react-router for navigation with active states:

```typescript
import { NavLink } from "react-router";

<NavLink
  to="/events"
  className={({ isActive }) =>
    cn("...", isActive ? "bg-accent" : "text-muted-foreground")
  }
>
  Events
</NavLink>;
```

## API Integration

### Hono RPC Client

```typescript
import { publicApi, createAuthenticatedClient } from "@/lib/api-client";

// Public endpoints (no auth)
const res = await publicApi.auth.login.$post({ json: credentials });

// Authenticated endpoints
const api = createAuthenticatedClient();
const res = await api.events.$get();
```

### Type Inference

```typescript
import type { InferResponseType, InferRequestType } from "hono/client";

// Infer request types from API
type LoginRequest = InferRequestType<typeof publicApi.auth.login.$post>["json"];

// Infer response types (extract success type)
type User = Extract<
  InferResponseType<typeof client.users.me.$get>,
  { email: string }
>;
```

## Authentication

### Auth Context

```typescript
const { user, isLoading, error, login, register, logout, checkAuth } =
  useAuth();
```

### Protected Patterns

- `ProtectedRoute` - Requires authentication, redirects to `/login`
- `GuestRoute` - Guests only, redirects authenticated users to `/`

## Important Notes

- Always use `@/` path alias for imports
- Use `FormProvider` + `FormInput` for forms (not raw inputs)
- Prefer `flex flex-col gap-*` over `space-y-*`
- Use typography components for text (H1, TextMuted, etc.)
- Dark mode is managed via `.dark` class on `<html>`
- API types are inferred from the backend package (`tuna-reportes-api`)
- Route guards handle loading states with skeleton UI
