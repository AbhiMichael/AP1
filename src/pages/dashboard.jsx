import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  TextField,
  IconButton,
  Stack,
  useMediaQuery,
  useTheme
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LogoutIcon from '@mui/icons-material/Logout';

import AnalyticsIcon from '@mui/icons-material/Analytics';
import StackComponent from '../component/StackComponent';
import ChartComponent from '../component/ChartComponents';
import RightComponent from '../component/RightComponent';
import Sidebar from '../component/Sidebar';

export default function Dashboard() {
  const [currentImage, setCurrentImage] = useState('/windmill.jpg');
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogout = () => {
    // Here you would typically also clear any user session/tokens
    navigate('/login'); // Navigate to login page
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '95vw', overflow: 'hidden' }}>
      {/* Sidebar - Hidden on small screens */}
     <Sidebar isSmallScreen={isMediumScreen}/>

      {/* Main Content */}
      <Box sx={{ 
        flex: 1, 
        px: isSmallScreen ? 8 : isMediumScreen ? 10 : 10, 
        py: 2, 
        overflowY: 'auto',
        width: isSmallScreen ? '100%' : 'calc(100% - 80px)'
      }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant={isSmallScreen ? "h6" : "h5"} fontWeight={600} mb={2}>
              Monitor health of{isSmallScreen ? ' ' : <br />}your business
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Control and analyze your data in the easiest way
            </Typography>
          </Box>
          <Button 
            onClick={handleLogout}
            variant="contained"
            sx={{ 
              backgroundColor: 'black',
              color: 'white',
              borderRadius: 1, // Makes it rectangular
              textTransform: 'none',
              px: 2,
              py: 1,
              '&:hover': {
                backgroundColor: '#333333' // Slightly lighter black on hover
              }
            }}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Box>

        {/* Search & Calendar */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end',
          alignItems: 'center',
          mb: 3,
          gap: 2
        }}>
          

<TextField
  placeholder="Search..."
  size="small"
  variant="outlined"
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
      </InputAdornment>
    ),
  }}
  sx={{
    flex: 1,
    maxWidth: isSmallScreen ? '100%' : 290,
    '& .MuiOutlinedInput-root': {
      borderRadius: 3,
    },
  }}
/>

          <IconButton>
            <CalendarTodayIcon sx={{ color: 'black' }} />
          </IconButton>
        </Box>

        {/* Main Content Layout */}
        <Box sx={{
          display: 'flex',
          flexDirection:   {xs:'column',lg:'row'},
          gap: 3
        }}>       
          {/* Left Side */}
          <Box sx={{
            flex: 1,
            minWidth: 0 // Prevent overflow
          }}>
            <StackComponent isSmallScreen={isMediumScreen}/>

            {/* Line Chart */}
            <ChartComponent isSmallScreen={isMediumScreen}/>
          </Box>

          {/* Right Side - Stack below on medium/small screens */}
          <RightComponent isSmallScreen={isMediumScreen}/>
            
          
        </Box>
      </Box>
    </Box>
  );
}