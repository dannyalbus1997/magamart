"use client";
import { Box, Typography } from "@mui/material";
export interface IApiErrorStateProps { title?: string; description?: string; }
export function ApiErrorState({ title, description }: IApiErrorStateProps) {
  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography variant="body1" color="error">{title || "An error occurred"}</Typography>
      {description && <Typography variant="body2" color="text.secondary">{description}</Typography>}
    </Box>
  );
}
