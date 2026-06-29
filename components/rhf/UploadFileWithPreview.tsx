"use client";

import { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import { CustomLabel } from "../custom-label";
import { UploadFolderIcon } from "@components/icons";
import { MAX_FILES_SIZE } from "@shared/utils";

interface UploadFileWithPreviewProps {
  name: string;
  label?: string;
  required?: boolean;
  accept?: string;
  maxSize?: number;
}

export default function RhfUploadFileWithPreview({
  name,
  label,
  required = false,
  accept = "image/*",
  maxSize = MAX_FILES_SIZE,
}: UploadFileWithPreviewProps) {
  const { control, setError, clearErrors } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const file: File | string | null = field.value;
        const previewUrl =
          file instanceof File
            ? URL.createObjectURL(file)
            : typeof file === "string"
            ? file
            : null;

        const handleFile = (f: File | null) => {
          if (!f) return;
          if (f.size > maxSize) {
            setError(name, { message: `File exceeds ${maxSize / 1024 / 1024}MB` });
            return;
          }
          clearErrors(name);
          field.onChange(f);
        };

        return (
          <Stack gap="0.6rem">
            {label && <CustomLabel label={label} required={required} error={error} />}
            {previewUrl ? (
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <Box
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: 1,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "divider",
                    position: "relative",
                  }}
                >
                  <Image
                    src={previewUrl}
                    alt="preview"
                    fill
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                </Box>
                <IconButton
                  size="small"
                  onClick={() => { field.onChange(null); clearErrors(name); }}
                  sx={{ position: "absolute", top: -8, right: -8, bgcolor: "background.paper", boxShadow: 1 }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              </Box>
            ) : (
              <Box
                onClick={() => inputRef.current?.click()}
                sx={{
                  border: "2px dashed",
                  borderColor: error ? "error.main" : "divider",
                  borderRadius: 2,
                  p: 3,
                  textAlign: "center",
                  cursor: "pointer",
                  "&:hover": { borderColor: "primary.main", bgcolor: "action.hover" },
                  transition: "all 0.2s",
                }}
              >
                <UploadFolderIcon />
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Click to upload
                </Typography>
                <Typography variant="caption" color="text.disabled">
                  Max {maxSize / 1024 / 1024}MB
                </Typography>
              </Box>
            )}
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              hidden
              onChange={(e) => handleFile(e.target.files?.[0] || null)}
            />
            {error && (
              <Typography variant="caption" color="error">
                {error.message}
              </Typography>
            )}
          </Stack>
        );
      }}
    />
  );
}
