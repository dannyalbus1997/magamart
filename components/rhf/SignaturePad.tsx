"use client";

import { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import { Box, Button, Stack } from "@mui/material";
import { CustomLabel } from "../custom-label";

interface SignaturePadProps {
  name: string;
  label?: string;
  required?: boolean;
  width?: number;
  height?: number;
}

export default function RhfSignaturePad({
  name,
  label,
  required = false,
  width = 400,
  height = 200,
}: SignaturePadProps) {
  const { control } = useFormContext();
  const sigRef = useRef<SignatureCanvas>(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack gap="0.6rem">
          {label && <CustomLabel label={label} required={required} error={error} />}
          <Box
            sx={{
              border: "1px solid",
              borderColor: error ? "error.main" : "divider",
              borderRadius: 1,
              display: "inline-block",
            }}
          >
            <SignatureCanvas
              ref={sigRef}
              penColor="black"
              canvasProps={{ width, height, className: "signature-canvas" }}
              onEnd={() => {
                const dataUrl = sigRef.current?.toDataURL();
                field.onChange(dataUrl);
              }}
            />
          </Box>
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              sigRef.current?.clear();
              field.onChange(null);
            }}
            sx={{ alignSelf: "flex-start" }}
          >
            Clear
          </Button>
          {error && (
            <span style={{ color: "#d32f2f", fontSize: "12px" }}>{error.message}</span>
          )}
        </Stack>
      )}
    />
  );
}
