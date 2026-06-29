# Magamart — Claude Code Instructions

## Project Overview
Magamart is a Next.js 15 App Router frontend project (e-commerce platform).

## Tech Stack
- **Framework**: Next.js 15 (App Router) + React 18 + TypeScript strict
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss"`) + shadcn/ui primitives + MUI v5 for form/table/chart components
- **State**: Redux Toolkit + RTK Query + redux-persist (only `auth` slice persisted)
- **Forms**: React Hook Form + Yup + MUI input components
- **Tables**: @tanstack/react-table via `CustomTable` wrapper
- **Charts**: ApexCharts via `CustomChart` (SSR-safe dynamic import)
- **Theme**: next-themes for dark/light + MUI createTheme with `grayscale` + `ink` palette extensions

## Path Aliases (tsconfig.json)
| Alias | Maps to |
|---|---|
| `@root/*` | `./*` |
| `@store/*` | `./store/*` |
| `@services/*` | `./services/*` |
| `@components/*` | `./components/*` |
| `@slices/*` | `./slices/*` |
| `@shared/utils` | `./utils/index.ts` |
| `@/*` | `./*` |

## Key Patterns

### API calls
Use RTK Query via `injectEndpoints` on `baseAPI` (`services/base-api.ts`). 401 responses call `store.dispatch(authActions.logout())` automatically.

### Forms
Always wrap with `<FormProvider>` from `components/rhf`. Use `RHFTextField`, `RhfSelect`, etc. Validate with Yup.

### Tables
Use `<CustomTable>` from `components/custom-table`. Pass `columns`, `data`, `totalCount`, `pageSize`, `page`, `onPageChange`.

### MUI Palette
`theme.palette.grayscale[n]` and `theme.palette.ink[n]` are custom extensions defined in `theme/index.ts`. Use `(theme.palette as any).grayscale?.[n] || "#fallback"` in sx props until the provider tree is confirmed wired.

### File uploads
- Single with preview: `RhfUploadFileWithPreview`
- Multi drag-and-drop: `RhfFilesUpload`
- With progress bar: `RhfUploadFileForSlide`

## Environment Variables
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_IMAGE_URL=http://localhost:3000
```

## Scripts
```bash
npm run dev      # development server
npm run build    # production build
npm run lint     # ESLint
```

## Guards
- `AuthGuard` — wraps protected pages; redirects to `/login` if no user
- `GuestGuard` — wraps public pages; redirects to `/dashboard` if authenticated
- `middleware.ts` — cookie-based server-side redirect (`auth_token` cookie)
