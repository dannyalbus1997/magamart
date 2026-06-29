"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "@store/index";
import { selectAuthUser } from "@slices/auth";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useSelector(selectAuthUser) as any;

  const isAuthenticated = user && Object.keys(user).length > 0;
  const isAdmin = isAuthenticated && (user?.role?.slug === "admin" || user?.isAdmin === true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    } else if (!isAdmin) {
      router.replace("/");
    }
  }, [isAuthenticated, isAdmin, router]);

  if (!isAuthenticated || !isAdmin) return null;

  return <>{children}</>;
}
