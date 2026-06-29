"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "@store/index";
import { selectAuthUser } from "@slices/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const user = useSelector(selectAuthUser);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return <>{children}</>;
}
