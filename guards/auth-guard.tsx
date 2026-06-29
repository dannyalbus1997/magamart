"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "@store/index";
import { selectAuthUser } from "@slices/auth";
import { paths } from "@root/paths";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useSelector(selectAuthUser);

  useEffect(() => {
    if (!user || Object.keys(user).length === 0) {
      router.replace(paths.login);
    }
  }, [user, router]);

  if (!user || Object.keys(user).length === 0) return null;

  return <>{children}</>;
}
