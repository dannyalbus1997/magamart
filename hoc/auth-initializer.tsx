"use client";

import { useEffect } from "react";
import { useDispatch } from "@store/index";
import { authAPI } from "@services/auth-api";

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authAPI.endpoints.authMe.initiate(undefined, { forceRefetch: false }));
  }, [dispatch]);

  return <>{children}</>;
}
