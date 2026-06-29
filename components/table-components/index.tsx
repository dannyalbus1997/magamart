"use client";
import { Box, CircularProgress, Typography } from "@mui/material";

export interface INoContentFoundProps { title?: string; description?: string; }
export interface IApiErrorStateProps { title?: string; description?: string; }

export function IsFetching({ isFetching }: { isFetching?: boolean }) {
  if (!isFetching) return null;
  return (
    <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 10 }}>
      <CircularProgress size={20} />
    </Box>
  );
}

export function NoContentFound({ title, description }: INoContentFoundProps) {
  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="body1">{title || "No content found"}</Typography>
      {description && <Typography variant="body2" color="text.secondary">{description}</Typography>}
    </Box>
  );
}
