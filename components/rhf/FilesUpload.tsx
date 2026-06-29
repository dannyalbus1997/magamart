"use client";

import { useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CustomLabel } from "../custom-label";
import { UploadFolderIcon } from "@components/icons";
import { MAX_FILES_SIZE } from "@shared/utils";

interface FilesUploadProps {
  name: string;
  label?: string;
  required?: boolean;
  accept?: string;
  maxFiles?: number;
  maxSize?: number;
}

export default function RhfFilesUpload({
  name,
  label,
  required = false,
  accept = "image/*,application/pdf",
  maxFiles = 5,
  maxSize = MAX_FILES_SIZE,
}: FilesUploadProps) {
  const { control, setError, clearErrors } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const addFiles = (
    existing: File[],
    incoming: FileList | null,
    onChange: (v: File[]) => void,
    setErr: (msg: string) => void,
    clearErr: () => void
  ) => {
    if (!incoming) return;
    const arr = Array.from(incoming);
    const oversized = arr.filter((f) => f.size > maxSize);
    if (oversized.length) {
      setErr(`File exceeds max size of ${maxSize / 1024 / 1024}MB`);
      return;
    }
    const merged = [...existing, ...arr].slice(0, maxFiles);
    clearErr();
    onChange(merged);
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field, fieldState: { error } }) => {
        const files: File[] = field.value || [];

        const setErr = (msg: string) => setError(name, { message: msg });
        const clearErr = () => clearErrors(name);

        return (
          <Stack gap="0.6rem">
            {label && <CustomLabel label={label} required={required} error={error} />}
            <Box
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                addFiles(files, e.dataTransfer.files, field.onChange, setErr, clearErr);
              }}
              onClick={() => inputRef.current?.click()}
              sx={{
                border: "2px dashed",
                borderColor: dragOver ? "primary.main" : error ? "error.main" : "divider",
                borderRadius: 2,
                p: 3,
                textAlign: "center",
                cursor: "pointer",
                bgcolor: dragOver ? "action.hover" : "background.paper",
                transition: "all 0.2s",
              }}
            >
              <UploadFolderIcon />
              <Typography variant="body2" color="text.secondary" mt={1}>
                Drag & drop files here or click to browse
              </Typography>
              <Typography variant="caption" color="text.disabled">
                Max {maxFiles} files · {maxSize / 1024 / 1024}MB each
              </Typography>
            </Box>
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              multiple
              hidden
              onChange={(e) => addFiles(files, e.target.files, field.onChange, setErr, clearErr)}
            />
            {files.length > 0 && (
              <Stack gap={0.5}>
                {files.map((file, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: "4px 8px",
                      borderRadius: 1,
                      bgcolor: "action.hover",
                    }}
                  >
                    <Typography variant="caption" noWrap sx={{ flex: 1 }}>
                      {file.name}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        field.onChange(files.filter((_, i) => i !== idx));
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                ))}
              </Stack>
            )}
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
