"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "@store/index";
import { selectAuthUser } from "@slices/auth";
import { paths } from "@root/paths";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useSelector(selectAuthUser) as any;

  const isAuthenticated = user && Object.keys(user).length > 0;
  const isAdmin = isAuthenticated && (user?.role?.slug === "admin" || user?.role === "admin" || user?.isAdmin === true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(paths.login);
    } else if (!isAdmin) {
      router.replace(paths.home);
    }
  }, [isAuthenticated, isAdmin, router]);

  if (!isAuthenticated || !isAdmin) return null;

  return <>{children}</>;
}
