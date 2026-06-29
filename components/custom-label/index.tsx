"use client";
import type { SxProps, Theme } from "@mui/material/styles";
import { Typography } from "@mui/material";

export interface ICustomLabelProps {
  label: string | React.ReactNode;
  required?: boolean;
  error?: any;
  sx?: SxProps<Theme>;
}

export function CustomLabel({ label, required, error, sx }: ICustomLabelProps) {
  return (
    <Typography
      component="label"
      variant="body2"
      sx={{
        fontWeight: 500,
        color: error ? "error.main" : "text.primary",
        ...sx,
      }}
    >
      {label}
      {required && <span style={{ color: "red", marginLeft: 2 }}>*</span>}
    </Typography>
  );
}
