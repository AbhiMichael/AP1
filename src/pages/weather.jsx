import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { weatherThunk } from "../Redux/Slice/weatherSlice";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  useTheme,
  Fade,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
  Skeleton
} from "@mui/material";
import {
  WbSunny as SunIcon,
  LocationOn as LocationIcon,
  Cloud as CloudIcon,
  WaterDrop as HumidityIcon,
  Air as WindIcon,
  Thermostat as TempIcon
} from "@mui/icons-material";
import CustomDialogue from "../component/CustomDialogue";
import Sidebar from "../component/Sidebar";

export default function Weather() {
  const [place, setPlace] = useState("");
  const [open, setOpen] = useState(false);
  const { weather, loading, error } = useSelector((state) => state.weather);
  const dispatch = useDispatch();
  const theme = useTheme();

  const searchHandle = async () => {
    dispatch(weatherThunk(place))
      .unwrap()
      .then(() => setOpen(true));
  };

  // Weather condition icons mapping
  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'sunny': return <SunIcon sx={{ fontSize: 40, color: '#FFB74D' }} />;
      case 'cloudy': return <CloudIcon sx={{ fontSize: 40, color: '#90A4AE' }} />;
      case 'rainy': return <HumidityIcon sx={{ fontSize: 40, color: '#64B5F6' }} />;
      default: return <SunIcon sx={{ fontSize: 40, color: '#FFB74D' }} />;
    }
  };

  return (
    <Box sx={{ 
      display: "flex", 
      height: "100vh", 
      width: "100vw", 
      background: "linear-gradient(180deg, #bbe3f1 0%, #e3f2fd 50%, #ffffff 100%)",
      overflow: "auto",
      position: "relative",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23bbdefb' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        opacity: 0.8,
        zIndex: 0
      }
    }}>
      {/* Sidebar */}
      <Sidebar isSmallScreen={false} />

      {/* Main content */}
      <Container
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 4,
          position: "relative",
          zIndex: 1
        }}
      >
        <Fade in={true} timeout={800}>
          <Paper
            elevation={8}
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 4,
              width: "100%",
              maxWidth: 900,
              textAlign: "center",
              background: "linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              border: "1px solid rgba(255,255,255,0.5)",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "6px",
                background: "linear-gradient(90deg, #42a5f5, #29b6f6, #26c6da)",
                borderRadius: "4px 4px 0 0"
              }
            }}
          >
            {/* Decorative elements */}
            <Box sx={{
              position: "absolute",
              top: -20,
              right: -20,
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(179,229,252,0.4) 0%, rgba(179,229,252,0) 70%)",
              zIndex: 0
            }} />
            
            <Box sx={{
              position: "absolute",
              bottom: -30,
              left: -30,
              width: 150,
              height: 150,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(187,222,251,0.3) 0%, rgba(187,222,251,0) 70%)",
              zIndex: 0
            }} />

            <Box sx={{ position: "relative", zIndex: 2 }}>
              {/* Header Section */}
              <Box sx={{ mb: 4 }}>
                <Box sx={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  mb: 1
                }}>
                  <SunIcon sx={{ fontSize: 36, color: "#FFA726", mr: 1 }} />
                  <Typography 
                    variant="h4" 
                    fontWeight="800" 
                    color="primary"
                    sx={{ 
                      background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                      backgroundClip: "text",
                      textFillColor: "transparent",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}
                  >
                    Weather Finder
                  </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: "auto" }}>
                  Discover current weather conditions, forecasts, and more for any location around the world.
                </Typography>
              </Box>

              {/* Search Section */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  justifyContent: "center",
                  alignItems: "center",
                  mb: 4,
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: "rgba(241, 236, 237, 0.5)",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                  border: "1px solid rgba(207,216,220,0.3)"
                }}
              >
                <TextField
                  label="Enter a city name"
                  variant="outlined"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  fullWidth
                  error={!!error.flag}
                  helperText={error.flag ? error.message : ""}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      backgroundColor: "#fff"
                    }
                  }}
                  InputProps={{
                    startAdornment: <LocationIcon sx={{ mr: 1, color: "text.secondary" }} />
                  }}
                />
                <Button
                  variant="contained"
                  onClick={searchHandle}
                  disabled={loading}
                  sx={{ 
                    whiteSpace: "nowrap", 
                    px: 4, 
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: "bold",
                    background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                    boxShadow: "0 4px 8px rgba(25, 118, 210, 0.3)",
                    minWidth: { xs: "100%", sm: "auto" },
                    "&:hover": {
                      boxShadow: "0 6px 12px rgba(25, 118, 210, 0.4)",
                      background: "linear-gradient(45deg, #1565c0, #42a5f5)"
                    }
                  }}
                >
                  {loading ? "Searching..." : "Get Weather"}
                </Button>
              </Box>

              {/* Information Cards */}
              <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={4}>
                  <Card 
                    sx={{ 
                      borderRadius: 3,
                      background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                      boxShadow: "0 6px 15px rgba(30,136,229,0.15)",
                      height: "100%",
                      width: "170%",              
                    }}
                  >
                    <CardContent sx={{ textAlign: "center" }}>
                      <TempIcon sx={{ fontSize: 40, color: "#f44336", mb: 1 }} />
                      <Typography variant="h6" gutterBottom>Temperature</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Get accurate temperature readings in Celsius or Fahrenheit for any location.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card 
                    sx={{ 
                      borderRadius: 3,
                      background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)",
                      boxShadow: "0 6px 15px rgba(76,175,80,0.15)",
                      height: "100%"
                    }}
                  >
                    <CardContent sx={{ textAlign: "center" }}>
                      <HumidityIcon sx={{ fontSize: 40, color: "#2196f3", mb: 1 }} />
                      <Typography variant="h6" gutterBottom>Humidity</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Check humidity levels to plan your day better and stay comfortable.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card 
                    sx={{ 
                      borderRadius: 3,
                      background: "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
                      boxShadow: "0 6px 15px rgba(255,152,0,0.15)",
                      height: "100%"
                    }}
                  >
                    <CardContent sx={{ textAlign: "center" }}>
                      <WindIcon sx={{ fontSize: 40, color: "#9e9e9e", mb: 1 }} />
                      <Typography variant="h6" gutterBottom>Wind Speed</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Know wind conditions for outdoor activities or travel plans.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {/* Quick Tips Section */}
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 3, 
                  borderRadius: 3,
                  backgroundColor: "rgba(255,248,225,0.5)",
                  textAlign: "left",
                  mb: 3
                }}
              >
                <Typography variant="h6" gutterBottom color="#5D4037">
                  <Box component="span" sx={{ fontWeight: "bold" }}>Pro Tip:</Box> Get the most accurate results
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Check the Spelling correct to avoid mistakes.
                </Typography>
              </Paper>

              {/* Dialog for Weather Data */}
              <CustomDialogue setOpen={setOpen} open={open} Data={Object.entries(weather)} />
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}