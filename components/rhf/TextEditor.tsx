"use client";

import dynamic from "next/dynamic";
import { Controller, useFormContext } from "react-hook-form";
import { Stack } from "@mui/material";
import { CustomLabel } from "../custom-label";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface TextEditorProps {
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  height?: number;
}

export default function RhfTextEditor({
  name,
  label,
  required = false,
  placeholder = "Write something...",
  height = 200,
}: TextEditorProps) {
  const { control } = useFormContext();

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack gap="0.6rem">
          {label && <CustomLabel label={label} required={required} error={error} />}
          <div style={{ minHeight: height }}>
            <ReactQuill
              theme="snow"
              value={field.value || ""}
              onChange={field.onChange}
              modules={modules}
              placeholder={placeholder}
              style={{ height }}
            />
          </div>
          {error && (
            <span style={{ color: "#d32f2f", fontSize: "12px", marginTop: "40px" }}>
              {error.message}
            </span>
          )}
        </Stack>
      )}
    />
  );
}
