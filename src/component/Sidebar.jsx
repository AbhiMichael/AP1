import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Tooltip } from '@mui/material';
import {

  Dashboard as DashboardIcon,
  Home as  HomeIcon,
  LocationOn as LocationOnIcon,
  AssignmentAdd as AssignmentAddIcon,
  People as PeopleIcon,
  NoteAlt as NoteAltIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { setActiveItem } from '../Redux/Slice/sidebarSlice';

const Sidebar = ({ 
  isSmallScreen, 
  onDashboardClick,
  width = 80,
  bgColor = '#1e1e1e',
  iconColor = '#fff',
  activeIconColor = '#79bef7ff',
  iconSize = 28,
  borderRadius = 40,
  showTooltips = false
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeItem = useSelector((state) => state.sidebar.activeItem);

  if (isSmallScreen) return null;

  const handleItemClick = (itemName) => {
    dispatch(setActiveItem(itemName));
  };

  const sidebarItems = [
    { 
      name: 'dashboard', 
      icon: <DashboardIcon />, 
      action: () => {
        handleItemClick('dashboard');
        onDashboardClick ? onDashboardClick() : navigate('/dashboard');
      }
    },
    { 
  name: 'home', 
  icon: < HomeIcon />, 
  action: () => {
    handleItemClick('home');
    navigate('/DragDropTasks');
  }
},

    { 
      name: 'location', 
      icon: <LocationOnIcon />, 
      action: () => {
        handleItemClick('location');
        navigate('/weather');
      }
    },
    { 
      name: 'stats', 
      icon: <AssignmentAddIcon />, 
      action: () => {
        handleItemClick('stats');
        navigate('/dynamicPage'); // Updated to navigate to dynamic page
      }
    },
    { 
      name: 'data', 
      icon: <PeopleIcon />, 
      action: () => {
        handleItemClick('data');
        navigate('/data');
      }
    },
    { 
      name: 'form', 
      icon: <NoteAltIcon />, 
      action: () => {
        handleItemClick('form');
        navigate('/form');
      }
    },
    { 
      name: 'settings', 
      icon: <SettingsIcon />, 
      action: () => handleItemClick('settings')
    }
  ];

  const renderButton = (item) => (
    <Button 
      key={item.name}
      sx={{ minWidth: 0 }}
      onClick={item.action}
    >
      {showTooltips ? (
        <Tooltip title={item.name.charAt(0).toUpperCase() + item.name.slice(1)} placement="right">
          {React.cloneElement(item.icon, { 
            sx: { 
              color: activeItem === item.name ? activeIconColor : iconColor, 
              fontSize: iconSize 
            }
          })}
        </Tooltip>
      ) : React.cloneElement(item.icon, { 
        sx: { 
          color: activeItem === item.name ? activeIconColor : iconColor, 
          fontSize: iconSize 
        }
      })}
    </Button>
  );

  return (
    <Box
      sx={{
        width: width,
        bgcolor: bgColor,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 2,
        borderTopLeftRadius: borderRadius,
        borderBottomLeftRadius: borderRadius,
        height: "100%"
      }}
    >
      {renderButton(sidebarItems[0])} {/* Dashboard */}
      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        {sidebarItems.slice(1, -1).map(renderButton)}
      </Box>
      
      {renderButton(sidebarItems[sidebarItems.length - 1])} {/* Settings */}
    </Box>
  );
};

export default Sidebar;