import * as Yup from "yup";

export const personalInfoSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
});

export const addressSchema = Yup.object().shape({
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("City is required"),
  zip: Yup.string()
    .matches(/^[0-9]+$/, "Zip must contain only numbers")
    .required("Zip Code is required"),
});
