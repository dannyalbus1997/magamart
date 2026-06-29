"use client";

import { Controller, useFormContext } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Stack } from "@mui/material";
import { CustomLabel } from "../custom-label";

interface RhfTelInputProps {
  name: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  country?: string;
}

export default function RhfTelInput({
  name,
  label,
  required = false,
  disabled = false,
  country = "us",
}: RhfTelInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Stack gap="0.6rem">
          {label && <CustomLabel label={label} required={required} error={error} />}
          <PhoneInput
            country={country}
            value={field.value}
            onChange={(phone) => field.onChange(phone)}
            disabled={disabled}
            inputStyle={{
              width: "100%",
              height: "40px",
              fontSize: "14px",
              borderColor: error ? "#d32f2f" : undefined,
            }}
            containerStyle={{ width: "100%" }}
          />
          {error && (
            <span style={{ color: "#d32f2f", fontSize: "12px" }}>{error.message}</span>
          )}
        </Stack>
      )}
    />
  );
}
