# Magamart — Frontend

Next.js 15 storefront and admin panel for the Magamart e-commerce platform.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI | React 19 + Tailwind CSS v4 |
| State | Redux Toolkit + RTK Query |
| Forms | React Hook Form + Yup |
| Notifications | react-hot-toast |
| Auth persistence | redux-persist |

---

## Project Structure

```
app/
├── (auth)/              # /login, /signup
├── (store)/             # Public storefront
│   ├── page.tsx         # Home page
│   ├── products/        # Product listing + detail
│   ├── cart/            # Shopping cart
│   ├── checkout/        # Checkout flow
│   └── orders/          # Order history
├── (app)/               # Authenticated user area
│   ├── layout.tsx       # Sidebar + top bar layout
│   └── dashboard/       # User dashboard (stats + recent orders)
└── (admin)/             # Admin panel
    └── admin/
        ├── page.tsx     # Admin dashboard
        ├── products/    # Product management (list, new, edit)
        └── orders/      # Order management

components/
├── layout/              # Header, Footer
└── home/                # SmartphonesSection, TopCategories, DailyEssentials

services/                # RTK Query API slices
├── base-api.ts          # fetchBaseQuery with JWT injection
├── products-api.ts
├── cart-api.ts
├── orders-api.ts
└── tags.ts

slices/                  # Redux slices (auth)
store/                   # Redux store + redux-persist config
paths.ts                 # Centralised route + API path constants
types/                   # Shared TypeScript interfaces
utils/                   # getImageUrl(), formatDate(), etc.
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Magamart backend running on `http://localhost:8000`

### Installation

```bash
cd magamart
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

> Do **not** add a trailing slash or `/api` suffix — the backend has no global prefix.

### Run

```bash
npm run dev     # Development server → http://localhost:3000
npm run build   # Production build
npm run start   # Serve production build
```

---

## Route Groups

| Group | URL prefix | Purpose |
|---|---|---|
| `(auth)` | `/login`, `/signup` | Public auth pages |
| `(store)` | `/`, `/products`, `/cart`, `/checkout`, `/orders` | Customer-facing storefront |
| `(app)` | `/dashboard` | Authenticated user area with sidebar layout |
| `(admin)` | `/admin/**` | Admin panel (products, orders) |

---

## Key Patterns

### API Calls (RTK Query)

All API calls go through `services/base-api.ts` which automatically attaches the JWT `Authorization: Bearer` header from the Redux store.

```ts
import { useGetProductsQuery } from "@services/products-api";

const { data, isLoading } = useGetProductsQuery({ category: "Electronics", limit: 8 });
const products = data?.data ?? [];
```

### Image URLs

Backend stores images as relative paths (e.g. `/uploads/products/xyz.jpg`). Use `getImageUrl()` to convert them to full URLs:

```ts
import { getImageUrl } from "@shared/utils";

<img src={getImageUrl(product.image) ?? "/placeholder.png"} />
```

### Protected Routes

Guards in `guards/` wrap pages that require authentication. Admin pages additionally check for `role === "admin"`.

### Role-based Redirect on Login

After login, users are redirected based on their role:
- `admin` → `/admin`
- Everyone else → `/dashboard`

---

## Cart

Cart state is managed server-side (one cart per user in MongoDB). The FE uses RTK Query mutations to add, update, and remove items, with cache invalidation on every change.

```ts
import { useAddToCartMutation } from "@services/cart-api";

const [addToCart] = useAddToCartMutation();
await addToCart({ productId: product.id, quantity: 1 }).unwrap();
```

---

## Admin Panel

The admin panel (`/admin`) provides:

- **Product management** — create/edit (with image upload), delete, paginated list
- **Order management** — view all orders, update status

Product forms use `React Hook Form` + `Yup` validation and send `multipart/form-data` to support image uploads.

---

## Scripts

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run start     # Serve production build
npm run lint      # ESLint
```
