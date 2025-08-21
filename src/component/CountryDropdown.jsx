import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCountries,
  fetchStates,
  setSelectedCountry,
} from "../Redux/Slice/locationSlice";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
} from "@mui/material";

export default function CountryDropdown() {
  const dispatch = useDispatch();
  const { countries, selectedCountry, loading, error } = useSelector(
    (state) => state.location
  );

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const handleChange = (e) => {
    const country = e.target.value;
    dispatch(setSelectedCountry(country));
    if (country) {
      dispatch(fetchStates(country));
    }
  };

  return (
    <FormControl fullWidth sx={{ my: 2 }}>
      <InputLabel>Country</InputLabel>
      {loading && !countries.length ? (
        <CircularProgress size={24} />
      ) : (
        <Select value={selectedCountry} onChange={handleChange} label="Country">
          {countries.map((country, i) => (
            <MenuItem key={i} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
      )}
      {error && <Typography color="error">{error}</Typography>}
    </FormControl>
  );
}
