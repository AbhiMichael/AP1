  import React from "react";
  import {
    Container,
    Typography,
    useMediaQuery,
    useTheme,
    Box,
    Paper,
  } from "@mui/material";
  import StepperForm from "../component/StepperForm";
  import Sidebar from "../component/Sidebar";

  export default function StepperPage() {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

    // SVG pattern background
    const backgroundPattern = `
      radial-gradient(circle at 20px 20px, rgba(1, 21, 38, 0.15) 2px, transparent 2px),
      radial-gradient(circle at 60px 60px, rgba(3, 22, 42, 0.1) 2px, transparent 2px),
      radial-gradient(circle at 100px 40px, rgba(3, 26, 45, 0.1) 1.5px, transparent 1.5px),
      radial-gradient(circle at 150px 80px, rgba(3, 24, 45, 0.15) 2px, transparent 2px)
    `;

    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          width: "100vw",
          backgroundColor: "#d5eef8ff",
          backgroundImage: backgroundPattern,
          backgroundSize: "120px 120px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Sidebar */}
        <Sidebar isSmallScreen={isMediumScreen} />

        {/* Main Content */}
        <Container
          maxWidth="lg"
          sx={{
            mt: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            zIndex: 2,
            position: "relative",
          }}
        >
          {/* Header */}
          <Typography
            variant={isMediumScreen ? "h4" : "h2"}
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "#0959aa",
              textShadow: "1px 1px 3px rgba(0,0,0,0.15)",
              mb: 4,
              letterSpacing: "1px",
            }}
          >
            STEPPER FORM
          </Typography>

          {/* Card Container for Stepper */}
          <Paper
            elevation={6}
            sx={{
              p: 4,
              borderRadius: 4,
              width: isMediumScreen ? "95%" : "70%",
              minHeight: "50vh",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            }}
          >
            <Typography
              variant={isMediumScreen ? "h5" : "h4"}
              gutterBottom
              align="center"
              sx={{
                fontWeight: "bold",
                color: "#217dc8",
                mb: 3,
              }}
            >
              Enter the Details
            </Typography>

            <StepperForm />
          </Paper>
        </Container>
      </Box>
    );
  }
