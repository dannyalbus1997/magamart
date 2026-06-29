"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "@store/index";
import { selectAuthUser } from "@slices/auth";
import { paths } from "@root/paths";

export default function GuestGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useSelector(selectAuthUser);

  const isAuthenticated = user && Object.keys(user).length > 0;

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(paths.dashboard);
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) return null;

  return <>{children}</>;
}
