import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCities,
  setSelectedState,
} from "../Redux/Slice/locationSlice";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
} from "@mui/material";

export default function StateDropdown() {
  const dispatch = useDispatch();
  const {
    selectedCountry,
    states,
    selectedState,
    loading,
    error,
  } = useSelector((state) => state.location);

  const handleChange = (e) => {
    const state = e.target.value;
    dispatch(setSelectedState(state));
    if (state) {
      dispatch(fetchCities({ country: selectedCountry, state }));
    }
  };

  return (
    <FormControl fullWidth sx={{ my: 2 }} disabled={!selectedCountry}>
      <InputLabel>State</InputLabel>
      {loading && !states.length ? (
        <CircularProgress size={24} />
      ) : states.length > 0 ? (
        <Select value={selectedState} onChange={handleChange} label="State">
          {states.map((state, i) => (
            <MenuItem key={i} value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>
      ) : (
        selectedCountry && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            No states found
          </Typography>
        )
      )}
      {error && <Typography color="error">{error}</Typography>}
    </FormControl>
  );
}
