"use client";
import { Box, Typography } from "@mui/material";

interface UploadSingleFileProps {
  file?: any;
  error?: boolean;
  onChange?: (file: File) => void;
  dragTextVariant?: any;
  dragTextColor?: string;
  buttonVariant?: boolean;
  upLoadFileIcon?: React.ReactNode;
  maxFileSize?: number;
  accept?: Record<string, string[]>;
  [key: string]: any;
}

export function UploadSingleFile({ onChange, upLoadFileIcon, error }: UploadSingleFileProps) {
  return (
    <Box
      sx={{ border: `1px dashed ${error ? "red" : "#ccc"}`, borderRadius: 2, p: 3, textAlign: "center", cursor: "pointer" }}
      component="label"
    >
      <input type="file" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f && onChange) onChange(f); }} />
      {upLoadFileIcon}
      <Typography variant="body2">Click or drag file here</Typography>
    </Box>
  );
}
