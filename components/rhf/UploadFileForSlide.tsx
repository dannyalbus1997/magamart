"use client";

import { useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { CustomLabel } from "../custom-label";
import { UploadFolderIcon } from "@components/icons";
import { MAX_FILES_SIZE } from "@shared/utils";

interface UploadFileForSlideProps {
  name: string;
  label?: string;
  required?: boolean;
  accept?: string;
  maxSize?: number;
}

export default function RhfUploadFileForSlide({
  name,
  label,
  required = false,
  accept = "image/*",
  maxSize = MAX_FILES_SIZE,
}: UploadFileForSlideProps) {
  const { control, setError, clearErrors } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const handleFile = (f: File | null) => {
          if (!f) return;
          if (f.size > maxSize) {
            setError(name, { message: `File exceeds ${maxSize / 1024 / 1024}MB` });
            return;
          }
          clearErrors(name);
          setUploading(true);
          setProgress(0);
          let p = 0;
          const interval = setInterval(() => {
            p += 20;
            setProgress(p);
            if (p >= 100) {
              clearInterval(interval);
              setUploading(false);
              field.onChange(f);
            }
          }, 100);
        };

        const fileName =
          field.value instanceof File
            ? field.value.name
            : typeof field.value === "string"
            ? field.value.split("/").pop()
            : null;

        return (
          <Stack gap="0.6rem">
            {label && <CustomLabel label={label} required={required} error={error} />}
            <Box
              onClick={() => !uploading && inputRef.current?.click()}
              sx={{
                border: "2px dashed",
                borderColor: error ? "error.main" : "divider",
                borderRadius: 2,
                p: 3,
                textAlign: "center",
                cursor: uploading ? "default" : "pointer",
                "&:hover": !uploading
                  ? { borderColor: "primary.main", bgcolor: "action.hover" }
                  : {},
                transition: "all 0.2s",
              }}
            >
              <UploadFolderIcon />
              {fileName ? (
                <Typography variant="body2" color="text.secondary" mt={1}>
                  {fileName}
                </Typography>
              ) : (
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Click to upload slide
                </Typography>
              )}
            </Box>
            {uploading && (
              <Box sx={{ width: "100%" }}>
                <LinearProgress variant="determinate" value={progress} />
                <Typography variant="caption" color="text.secondary">
                  Uploading... {progress}%
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
