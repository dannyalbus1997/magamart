"use client";

import { State } from "country-state-city";
import { useFormContext } from "react-hook-form";
import SearchableSelect from "./SearchableSelect";

export default function StateSelect({
  name = "state",
  countryFieldName = "country",
  required = true,
  disabled = false,
  onChangeHandler,
}: {
  name?: string;
  countryFieldName?: string;
  required?: boolean;
  disabled?: boolean;
  onChangeHandler?: (event?: any, newValue?: any, onChange?: (value: any) => void) => void;
}) {
  const { watch } = useFormContext();
  const country = watch(countryFieldName);
  const states = country?.isoCode ? State.getStatesOfCountry(country.isoCode) : [];

  return (
    <SearchableSelect
      name={name}
      label="State"
      options={states}
      size="small"
      disabled={disabled || !country}
      placeholder="Select State"
      required={required}
      getOptionLabel={(s) => s?.name || s?.state}
      isOptionEqualToValue={(o, v) => o?.isoCode === v?.isoCode}
      onChangeHandler={onChangeHandler}
    />
  );
}
