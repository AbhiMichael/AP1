import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCity } from "../Redux/Slice/locationSlice";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
} from "@mui/material";

export default function CityDropdown() {
  const dispatch = useDispatch();
  const {
    selectedState,
    cities,
    selectedCity,
    loading,
    error,
  } = useSelector((state) => state.location);

  const handleChange = (e) => {
    dispatch(setSelectedCity(e.target.value));
  };

  return (
    <FormControl fullWidth sx={{ my: 2 }} disabled={!selectedState}>
      <InputLabel>City</InputLabel>
      {loading && !cities.length ? (
        <CircularProgress size={24} />
      ) : cities.length > 0 ? (
        <Select value={selectedCity} onChange={handleChange} label="City">
          {cities.map((city, i) => (
            <MenuItem key={i} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      ) : (
        selectedState && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            No cities found
          </Typography>
        )
      )}
      {error && <Typography color="error">{error}</Typography>}
    </FormControl>
  );
}
