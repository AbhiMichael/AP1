import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personalInfo: {
    fullName: "",
    email: "",
  },
  address: {
    street: "",
    city: "",
    zip: "",
  },
  submitted: false,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setPersonalInfo: (state, action) => {
      state.personalInfo = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    submitForm: (state) => {
      state.submitted = true;
    },
    resetForm: () => initialState,
  },
});

export const { setPersonalInfo, setAddress, submitForm, resetForm } =
  formSlice.actions;
export default formSlice.reducer;
