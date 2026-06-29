export const paths = {
  // Auth
  login: "/login",
  signup: "/signup",

  // Store
  home: "/",
  products: "/products",
  product: (id: string | number) => `/products/${id}`,
  cart: "/cart",
  checkout: "/checkout",
  orders: "/orders",
  orderSuccess: "/orders?success=true",

  // App
  dashboard: "/dashboard",

  // Admin
  admin: {
    root: "/admin",
    products: "/admin/products",
    productNew: "/admin/products/new",
    productEdit: (id: string | number) => `/admin/products/${id}/edit`,
    orders: "/admin/orders",
  },

  // Legal
  terms: "/terms",
  privacy: "/privacy",

  // API endpoints (backend)
  api: {
    auth: {
      login: "/auth/login",
      signup: "/auth/signup",
      me: "/auth/me",
      logout: "/auth/logout",
      refresh: "/auth/refresh",
    },
    products: {
      root: "/products",
      byId: (id: string | number) => `/products/${id}`,
      categories: "/products/categories",
    },
    categories: {
      root: "/categories",
      names: "/categories/names",
    },
    cart: {
      root: "/cart",
      item: (productId: string) => `/cart/${productId}`,
    },
    orders: {
      root: "/orders",
      my: "/orders/my",
      byId: (id: string | number) => `/orders/${id}`,
      status: (id: string | number) => `/orders/${id}/status`,
    },
  },
} as const;
