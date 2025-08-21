import { 
  Container, 
  Box, 
  Typography, 
  Paper, 
  useTheme, 
  useMediaQuery,
  Divider,
  IconButton,
  Tooltip,
  Fade,
} from "@mui/material";
import React, { useState } from "react";
import PurchasedCard from "../component/PurchasedCard";
import { useSelector } from "react-redux";
import GlobalDialogue from "../component/GlobalDialogue";
import GlobalFormComponent from "../component/GlobalFormComponent";
import Sidebar from '../component/Sidebar';
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function Purchased() {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const data = {
    title: {
      "Lunch Marking Hours": "2PM to 12AM",
      "Evening Food Marking Hours": "10 AM to 3 PM",
    },
    body: [
      { bodyTitle: "Lunch Tomorrow", checkBox: false },
      { bodyTitle: "Food For Evening", checkBox: true },
    ],
    close: true,
  };

  const purchased = useSelector((state) => state.purchased);

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '95vw', overflow: 'hidden' }}>
      <Sidebar isSmallScreen={isMediumScreen}/>

      <Container 
        maxWidth="lg" 
        sx={{ 
          py: 4,
          minHeight: '100vh',
          background: `linear-gradient(135deg, #fff, 15)`,
          borderRadius: 3
        }}
      >
        <Paper 
          elevation={4} 
          sx={{ 
            p: { xs: 3, sm: 4 },
            borderRadius: 4,
            backgroundColor: 'white',
            boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
            position: "relative"
          }}
        >
          {/* Header with Icon + Title */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 3 }}>
            <Icon icon="mdi:cart-check" width="36" height="36" color={theme.palette.primary.main} />
            <Typography 
              variant="h3" 
              sx={{
                ml: 1.5,
                fontWeight: 700,
                color: theme.palette.primary.main,
                textAlign: 'center',
                [theme.breakpoints.down('sm')]: {
                  fontSize: '2rem'
                }
              }}
            >
              Purchased Items
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Purchased Items Grid */}
          {purchased.length > 0 ? (
            <Fade in timeout={600}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
                  gap: 3,
                  mt: 2
                }}
              >
                {purchased.map((e, index) => (
                  <PurchasedCard key={index} product={e} />
                ))}
              </Box>
            </Fade>
          ) : (
            // Empty State
            <Fade in timeout={600}>
              <Box sx={{
                textAlign: 'center',
                py: 8,
                border: `2px dashed ${theme.palette.grey[300]}`,
                borderRadius: 3,
                backgroundColor: theme.palette.grey[50],
                transition: "all 0.3s ease",
                '&:hover': { backgroundColor: theme.palette.grey[100] }
              }}>
                <Icon 
                  icon="mdi:package-variant-remove" 
                  width="50" 
                  height="50" 
                  color={theme.palette.text.disabled} 
                  style={{ marginBottom: "1rem" }}
                />
                <Typography variant="h6" sx={{ 
                  color: theme.palette.text.secondary,
                  fontWeight: 500,
                  mb: 1
                }}>
                  Your purchased items will appear here
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: theme.palette.text.disabled
                }}>
                  Nothing purchased yet. Start shopping!
                </Typography>
              </Box>
            </Fade>
          )}
          
          {/* Floating Action Button (Optional) */}
          <Tooltip title="Go to Product List">
  <IconButton 
    sx={{
      position: "absolute",
      bottom: -20,
      right: -20,
      backgroundColor: theme.palette.primary.main,
      color: "white",
      p: 2.2,
      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
      "&:hover": {
        backgroundColor: theme.palette.primary.dark
      }
    }}
    onClick={() => navigate("/productlist")}   // ✅ navigate to ProductList page
  >
    <Icon icon="mdi:plus" width="24" height="24" />
  </IconButton>
</Tooltip>


          {/* Dialogue */}
          <GlobalDialogue Data={data} open={open} setOpen={setOpen}>
            <GlobalFormComponent />
          </GlobalDialogue>
        </Paper>
      </Container>
    </Box>
  );
}
