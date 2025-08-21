import React from "react";
import { TextField, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPersonalInfo } from "../Redux/Slice/formSlice";
import { Formik, Form } from "formik";
import { personalInfoSchema } from "../component/validation";

export default function PersonalInfoForm({ onNext }) {
  const dispatch = useDispatch();
  const { personalInfo } = useSelector((state) => state.form);

  return (
    <Formik
      initialValues={personalInfo}
      validationSchema={personalInfoSchema}
      onSubmit={(values) => {
        dispatch(setPersonalInfo(values));
        onNext(); // move to next step
      }}
    >
      {({ handleSubmit, errors, touched, handleChange, handleBlur, values }) => (
        <Form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            {/* Full Name */}
            <TextField
              name="fullName"
              label="Full Name"
              fullWidth
              value={values.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.fullName && Boolean(errors.fullName)}
              helperText={touched.fullName && errors.fullName}
            />

            {/* Email */}
            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />

            {/* Next Button */}
            <Box display="flex" justifyContent="flex-end" mt={2}>
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
