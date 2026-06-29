"use client";
import { Skeleton, Stack } from "@mui/material";
export function CustomTableSkeleton() {
  return (
    <Stack spacing={1} sx={{ p: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} variant="rectangular" height={48} />
      ))}
    </Stack>
  );
}
