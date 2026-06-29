"use client";

import React, { useState, useRef } from "react";
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  TextFieldProps,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { Controller, useFormContext, FieldError } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { CustomLabel } from "../custom-label";
import { useTheme } from "@mui/material/styles";

interface RHFTextFieldProps extends Omit<TextFieldProps, "name"> {
  name: string;
  type?: "text" | "password" | "email" | "number" | "color";
  readOnly?: boolean;
  StartIcon?: React.ReactNode;
  EndIcon?: React.ReactNode;
  label?: string;
  labelSx?: SxProps<Theme>;
  fullWidth?: boolean;
  rules?: Record<string, unknown>;
  required?: boolean;
  onBlurHandler?: (value: any) => void;
}

export default function RHFTextField({
  name,
  type = "text",
  variant = "outlined",
  readOnly = false,
  StartIcon,
  EndIcon,
  label,
  labelSx,
  fullWidth = true,
  rules,
  required = false,
  onBlurHandler,
  ...other
}: RHFTextFieldProps) {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  const { slotProps: callerSlotProps, sx: callerSx, defaultValue: callerDefaultValue, ...restOther } = other as any;

  const endAdornment =
    type === "password" && !EndIcon ? (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <Visibility sx={{ color: "text.secondary" }} />
          ) : (
            <VisibilityOff sx={{ color: "text.secondary" }} />
          )}
        </IconButton>
      </InputAdornment>
    ) : (
      EndIcon
    );

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={callerDefaultValue || ""}
      render={({ field, fieldState: { error } }) => (
        <Stack gap="0.6rem">
          {label && (
            <CustomLabel label={label} required={required} error={error} sx={labelSx} />
          )}
          <TextField
            {...field}
            value={field?.value || ""}
            onChange={field?.onChange}
            onBlur={(e) => {
              const domVal = inputRef.current?.value ?? (e.target as HTMLInputElement).value ?? "";
              if (domVal !== String(field.value ?? "")) {
                field.onChange(domVal);
              }
              onBlurHandler?.(field.value);
              field?.onBlur?.();
            }}
            fullWidth={fullWidth}
            error={Boolean(error)}
            helperText={(error as FieldError)?.message}
            type={
              type === "password" && !EndIcon
                ? showPassword
                  ? "text"
                  : type
                : type
            }
            variant={variant}
            slotProps={{
              input: {
                readOnly,
                endAdornment,
                startAdornment: StartIcon,
                ...callerSlotProps?.input,
              },
              htmlInput: {
                onInput: (e: React.FormEvent<HTMLInputElement>) => {
                  const val = (e.target as HTMLInputElement).value;
                  if (val !== String(field.value ?? "")) {
                    field.onChange(val);
                  }
                },
                ...callerSlotProps?.htmlInput,
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-error fieldset": { borderWidth: "1px" },
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#B0B7C3",
                opacity: 1,
              },
              ...callerSx,
            }}
            {...restOther}
            inputRef={inputRef}
            label={""}
          />
        </Stack>
      )}
    />
  );
}
