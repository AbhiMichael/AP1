import React from "react";
import CountryDropdown from "../component/CountryDropdown";
import StateDropdown from "../component/StateDropdown";
import CityDropdown from "../component/CityDropdown";
import { 
  Container, 
  Typography, 
  Paper, 
  Box, 
  useMediaQuery,
  useTheme,
  Divider 
} from "@mui/material";
import { useSelector } from "react-redux";
import Sidebar from '../component/Sidebar';

export default function LocationForm() {
  const theme = useTheme();
  const backgroundPattern = `
      radial-gradient(circle at 20px 20px, rgba(1, 21, 38, 0.15) 2px, transparent 2px),
      radial-gradient(circle at 60px 60px, rgba(3, 22, 42, 0.1) 2px, transparent 2px),
      radial-gradient(circle at 100px 40px, rgba(3, 26, 45, 0.1) 1.5px, transparent 1.5px),
      radial-gradient(circle at 150px 80px, rgba(3, 24, 45, 0.15) 2px, transparent 2px)
    `;

  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { selectedCountry, selectedState, selectedCity } = useSelector(
    (state) => state.location
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Sidebar */}
      <Sidebar isSmallScreen={isMediumScreen} />

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 5,
          px: { xs: 2, sm: 4, md: 8 },
          overflowY: 'auto',
          backgroundColor: "#d5eef8ff",
          backgroundImage: backgroundPattern,
          backgroundSize: "120px 120px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        
        <Container maxWidth="md">
          <Paper 
            elevation={6} 
            sx={{ 
              p: { xs: 3, sm: 8 },
              borderRadius: 3,
              backgroundColor: theme.palette.background.paper,
              boxShadow: theme.shadows[6],
              minHeight: "60vh",   
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Typography 
              variant="h3" 
              gutterBottom 
              align="center"
              sx={{ fontWeight: 'bold', color:"#0485e1ff",mb:5   }}
              
            >
              Dependent Dropdown
            </Typography>

            {/* Dropdowns */}
            <CountryDropdown />
            <StateDropdown />
            <CityDropdown />

            {/* Divider */}
            <Divider sx={{ my: 3 }} />

            {/* Preview Section */}
            <Box>
              <Typography 
                variant="subtitle1" 
                sx={{ fontWeight: 'bold', mb: 1 }}
              >
                Your Selection:
              </Typography>
              <Typography>
                <strong>Country:</strong> {selectedCountry || "— not selected —"}
              </Typography>
              <Typography>
                <strong>State:</strong> {selectedState || "— not selected —"}
              </Typography>
              <Typography>
                <strong>City:</strong> {selectedCity || "— not selected —"}
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
