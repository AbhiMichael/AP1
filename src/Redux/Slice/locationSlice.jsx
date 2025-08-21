// src/redux/locationSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  countries: [],
  states: [],
  cities: [],
  selectedCountry: "",
  selectedState: "",
  selectedCity: "",
  loading: false,
  error: null,
};

// Thunk: Fetch Countries
export const fetchCountries = createAsyncThunk(
  "location/fetchCountries",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://countriesnow.space/api/v0.1/countries/positions"
      );
      return res.data.data.map((c) => c.name);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Thunk: Fetch States
export const fetchStates = createAsyncThunk(
  "location/fetchStates",
  async (country, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/states",
        { country }
      );
      return res.data.data.states.map((s) => s.name);
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Thunk: Fetch Cities
export const fetchCities = createAsyncThunk(
  "location/fetchCities",
  async ({ country, state }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        { country, state }
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
      state.selectedState = "";
      state.selectedCity = "";
      state.states = [];
      state.cities = [];
    },
    setSelectedState: (state, action) => {
      state.selectedState = action.payload;
      state.selectedCity = "";
      state.cities = [];
    },
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Countries
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // States
      .addCase(fetchStates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.loading = false;
        state.states = action.payload;
      })
      .addCase(fetchStates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Cities
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSelectedCountry,
  setSelectedState,
  setSelectedCity,
} = locationSlice.actions;
export default locationSlice.reducer;
