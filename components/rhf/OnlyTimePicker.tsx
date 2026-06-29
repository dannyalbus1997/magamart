"use client";

import { Controller, useFormContext } from "react-hook-form";
import React, { JSX, useState } from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { Box, Stack, useTheme, SxProps, Theme } from "@mui/material";
import { CustomLabel } from "../custom-label";
import { slotTimePickerPropsStyles } from "./rhf.styles";
import { generateDate, nowDate } from "@shared/utils";

interface OnlyTimePickerProps {
  name: string;
  label?: string;
  required: boolean;
  size?: "small" | "medium";
  other?: Record<string, any>;
  fullWidth?: boolean;
  openOnMount?: boolean;
  sx?: SxProps<Theme>;
  onChangeHandler?: (value: any) => void;
  disabled?: boolean;
}

export default function RHFOnlyTimePicker({
  name,
  label,
  required,
  openOnMount = false,
  sx,
  onChangeHandler,
  disabled = false,
  ...other
}: OnlyTimePickerProps): JSX.Element {
  const { control } = useFormContext();
  const theme = useTheme();
  const [open, setOpen] = useState(openOnMount);

  return (
    <Box>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Stack>
            {label && <CustomLabel label={label} required={required} error={error} />}
            <TimePicker
              disabled={disabled}
              {...field}
              value={field.value != null && field.value !== "" ? generateDate(field.value) : null}
              onChange={(value) => {
                field.onChange(value);
                onChangeHandler?.(value);
              }}
              open={open}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              defaultValue={nowDate()}
              viewRenderers={{
                hours: renderTimeViewClock,
                minutes: renderTimeViewClock,
                seconds: renderTimeViewClock,
              }}
              {...other}
              slotProps={{
                textField: {
                  size: (other as any)?.size,
                  helperText: error ? error.message : "",
                  error: Boolean(error),
                  fullWidth: (other as any).fullWidth,
                  sx: {
                    "& .MuiInputBase-input": { padding: theme.spacing(1.25, 1.75) },
                    "& .MuiFilledInput-input": { padding: theme.spacing(1.25, 1.75) },
                    "& .MuiInputAdornment-root .MuiIconButton-root .MuiSvgIcon-root": {
                      color: (theme.palette as any).grayscale?.[800] || "#1F2937",
                      display: "block",
                    },
                    ...sx,
                  },
                },
                ...slotTimePickerPropsStyles(theme),
              }}
            />
          </Stack>
        )}
      />
    </Box>
  );
}
