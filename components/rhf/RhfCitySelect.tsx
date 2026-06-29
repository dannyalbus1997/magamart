"use client";

import { City } from "country-state-city";
import { useFormContext } from "react-hook-form";
import SearchableSelect from "./SearchableSelect";

export default function CitySelect({
  name = "city",
  countryFieldName = "country",
  stateFieldName = "state",
  required = true,
  disabled = false,
  onChangeHandler,
}: {
  name?: string;
  countryFieldName?: string;
  stateFieldName?: string;
  required?: boolean;
  disabled?: boolean;
  onChangeHandler?: (event?: any, newValue?: any, onChange?: (value: any) => void) => void;
}) {
  const { watch } = useFormContext();
  const country = watch(countryFieldName);
  const state = watch(stateFieldName);

  const cities =
    country?.isoCode && state?.isoCode
      ? City.getCitiesOfState(country.isoCode, state.isoCode)
      : [];

  return (
    <SearchableSelect
      name={name}
      label="City"
      options={cities}
      size="small"
      disabled={disabled || !state}
      placeholder="Select City"
      required={required}
      getOptionLabel={(c) => c?.name || c?.city}
      isOptionEqualToValue={(o, v) => o?.name === v?.name}
      onChangeHandler={onChangeHandler}
    />
  );
}
