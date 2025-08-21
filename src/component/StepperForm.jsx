import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Snackbar,
  Alert,
  Button,
} from "@mui/material";
import PersonalInfoForm from "../component/PersonalInfoForm";
import AddressForm from "../component/AddressForm";
import ReviewForm from "../component/ReviewForm";
import { useDispatch, useSelector } from "react-redux";
import { submitForm } from "../Redux/Slice/formSlice";

const steps = ["Personal Info", "Address", "Review & Submit"];

export default function StepperForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch();
  const { submitted } = useSelector((state) => state.form);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmitFinal = () => {
    dispatch(submitForm());
    setOpenSnackbar(true);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <PersonalInfoForm onNext={handleNext} />;
      case 1:
        return <AddressForm onNext={handleNext} onBack={handleBack} />;
      case 2:
        return (
          <Box>
            <ReviewForm />
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Button variant="outlined" color="secondary" onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#4caf50", // green submit
                  "&:hover": { backgroundColor: "#388e3c" },
                }}
                onClick={handleSubmitFinal}
              >
                Submit
              </Button>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box width="100%" mx="auto" mt={5}>
      {/* Stepper */}
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step Content */}
      <Box mt={3}>{renderStepContent()}</Box>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar && submitted}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success">Form Submitted Successfully!</Alert>
      </Snackbar>
    </Box>
  );
}
