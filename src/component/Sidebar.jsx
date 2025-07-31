import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Home as HomeIcon,
  LocationOn as LocationOnIcon,
  BarChart as BarChartIcon,
  People as PeopleIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

const Sidebar = ({ isSmallScreen, onDashboardClick }) => {
  const navigate = useNavigate();

  if (isSmallScreen) return null;

  return (
    <Box
      sx={{
        width: 80,
        bgcolor: '#1e1e1e',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 2,
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
        height:"100%"
      }}
    >
      <Button 
        sx={{ minWidth: 0 }}
        onClick={onDashboardClick || (() => navigate('/dashboard'))}
      >
        <DashboardIcon sx={{ color: '#fff', fontSize: 28 }} />
      </Button>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <Button sx={{ minWidth: 0 }}><HomeIcon sx={{ color: '#fff', fontSize: 28 }} /></Button>
        <Button sx={{ minWidth: 0 }}><LocationOnIcon sx={{ color: '#fff', fontSize: 28 }} /></Button>
        <Button sx={{ minWidth: 0 }}><BarChartIcon sx={{ color: '#fff', fontSize: 28 }} /></Button>
        <Button
          sx={{ minWidth: 0 }}
          onClick={() => navigate('/data')}
        >
          <PeopleIcon sx={{ color: '#fff', fontSize: 28 }} />
        </Button>
        <Button 
          sx={{ minWidth: 0 }}
          onClick={() => navigate('/form')}
        >
          <AnalyticsIcon sx={{ color: '#fff', fontSize: 28 }} />
        </Button>
      </Box>
      <Button sx={{ minWidth: 0 }}><SettingsIcon sx={{ color: '#fff', fontSize: 28 }} /></Button>
    </Box>
  );
};

export default Sidebar;