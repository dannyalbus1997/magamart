import type { RootState } from "@root/store";

export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectCurrentView = (state: RootState) => state.auth.currentView;
export const selectUserRoleSlug = (state: RootState) => (state.auth.user as any)?.role?.slug;
export const selectUserPermissions = (state: RootState) => (state.auth.user as any)?.permissions || [];
export const selectHasPermission = (permission: string) => (state: RootState) =>
  selectUserPermissions(state).includes(permission);
