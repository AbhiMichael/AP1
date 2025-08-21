import React from "react";
import { TextField, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "../Redux/Slice/formSlice";
import { Formik, Form } from "formik";
import { addressSchema } from "../component/validation";

export default function AddressForm({ onNext, onBack }) {
  const dispatch = useDispatch();
  const { address } = useSelector((state) => state.form);

  return (
    <Formik
      initialValues={address}
      validationSchema={addressSchema}
      onSubmit={(values) => {
        dispatch(setAddress(values));
        onNext();
      }}
    >
      {({ handleSubmit, errors, touched, handleChange, handleBlur, values }) => (
        <Form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            {/* Street */}
            <TextField
              name="street"
              label="Street"
              fullWidth
              value={values.street}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.street && Boolean(errors.street)}
              helperText={touched.street && errors.street}
            />

            {/* City */}
            <TextField
              name="city"
              label="City"
              fullWidth
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.city && Boolean(errors.city)}
              helperText={touched.city && errors.city}
            />

            {/* Zip Code */}
            <TextField
              name="zip"
              label="Zip Code"
              fullWidth
              value={values.zip}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.zip && Boolean(errors.zip)}
              helperText={touched.zip && errors.zip}
            />

            {/* Buttons */}
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={onBack}
              >
                Back
              </Button>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#64b5f6", // light blue
                  "&:hover": { backgroundColor: "#42a5f5" },
                }}
                type="submit"
              >
                Next
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
