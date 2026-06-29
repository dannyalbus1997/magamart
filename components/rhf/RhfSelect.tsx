"use client";

import { MenuItem, Stack, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CustomLabel } from "../custom-label";

interface RHFSelectProps {
  name: string;
  outerLabel?: string;
  placeholder?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  options?: string[];
  required?: boolean;
  [key: string]: any;
}

const RHFSelect: React.FC<RHFSelectProps> = ({
  name,
  outerLabel,
  placeholder = "Select Option",
  startIcon,
  endIcon,
  options = [],
  required = false,
  ...other
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack gap="0.6rem">
          {outerLabel && (
            <CustomLabel label={outerLabel} required={required} error={error} />
          )}
          <TextField
            {...field}
            select
            fullWidth
            error={Boolean(error)}
            helperText={error?.message}
            variant="outlined"
            slotProps={{
              input: {
                endAdornment: endIcon ?? "",
                startAdornment: startIcon ?? "",
              },
              select: { native: false, displayEmpty: true },
            }}
            {...other}
            value={field.value ? field.value : ""}
          >
            <MenuItem disabled value="">
              {placeholder}
            </MenuItem>
            {options.map((option: string) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      )}
    />
  );
};

export default RHFSelect;
