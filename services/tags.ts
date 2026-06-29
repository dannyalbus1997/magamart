export const AUTH = "AUTH";
export const USERS = "USERS";
export const ROLES = "ROLES";
export const USER_PROFILE = "USER_PROFILE";
export const PERMISSIONS = "PERMISSIONS";

export const TAGS = [AUTH, USERS, ROLES, USER_PROFILE, PERMISSIONS] as const;
export type Tag = (typeof TAGS)[number];
