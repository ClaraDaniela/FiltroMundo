import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useMemo, useState } from "react";
import Country from "./Country";

interface FilterCountryProps {
  onFilterChange: (filter: (c: Country) => boolean) => void;
  subRegionesOptions: string[];
}

export default function FilterCountry({
  onFilterChange,
  subRegionesOptions,
}: FilterCountryProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("Todos");

  const filters = useMemo(
    () =>
      subRegionesOptions.reduce<Record<string, (c: Country) => boolean>>(
        (acc, subregion) => {
          acc[subregion] = (c: Country) =>
            c.subregion === (subregion === "Todos" ? c.subregion : subregion);
          return acc;
        },
        {}
      ),

    [subRegionesOptions]
  );

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value as string;
    setSelectedFilter(selectedValue);
    onFilterChange(filters[selectedValue]);
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="filter-simple-select-label">Filtros</InputLabel>
        <Select
          labelId="filter-simple-select-label"
          id="filter-simple-select"
          value={selectedFilter}
          label="Filtros"
          onChange={handleChange}
        >
          {subRegionesOptions.map((each: string) => (
            <MenuItem key={each} value={each}>
              {each}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
