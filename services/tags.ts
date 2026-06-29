export const AUTH = "AUTH";
export const USERS = "USERS";
export const ROLES = "ROLES";
export const USER_PROFILE = "USER_PROFILE";
export const PERMISSIONS = "PERMISSIONS";
export const PRODUCTS = "PRODUCTS";
export const CATEGORIES = "CATEGORIES";
export const CART = "CART";
export const ORDERS = "ORDERS";
export const ANALYTICS = "ANALYTICS";

export const TAGS = [AUTH, USERS, ROLES, USER_PROFILE, PERMISSIONS, PRODUCTS, CATEGORIES, CART, ORDERS, ANALYTICS] as const;
export type Tag = (typeof TAGS)[number];
