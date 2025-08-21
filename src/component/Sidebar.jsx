import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Tooltip,
  IconButton,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Dashboard as DashboardIcon,
  Home as HomeIcon,
  LocationOn as LocationOnIcon,
  AssignmentAdd as AssignmentAddIcon,
  People as PeopleIcon,
  NoteAlt as NoteAltIcon,
  Settings as SettingsIcon,
  Store as StoreIcon,
  LocalMall as LocalMallIcon,
  ReadMore as ReadMoreIcon,
  TravelExplore as TravelExploreIcon, 
} from "@mui/icons-material";
import { setActiveItem } from "../Redux/Slice/sidebarSlice";

const Sidebar = ({
  width = 80,
  bgColor = "#1e1e1e",
  iconColor = "#fff",
  activeIconColor = "#f9d006ff",
  iconSize = 28,
  borderRadius = 40,
  showTooltips = false,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeItem = useSelector((state) => state.sidebar.activeItem);

  // Sidebar toggle state
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleItemClick = (itemName) => {
    dispatch(setActiveItem(itemName));
  };

  const sidebarItems = [
    {
      name: "dashboard",
      icon: <DashboardIcon />,
      action: () => {
        handleItemClick("dashboard");
        navigate("/dashboard");
      },
    },
    {
      name: "home",
      icon: <HomeIcon />,
      action: () => {
        handleItemClick("home");
        navigate("/DragDropTasks");
      },
    },
    {
      name: "location",
      icon: <LocationOnIcon />,
      action: () => {
        handleItemClick("location");
        navigate("/weather");
      },
    },
    {
      name: "storeicon",
      icon: <StoreIcon />,
      action: () => {
        handleItemClick("storeicon");
        navigate("/productlist");
      },
    },
    {
      name: "purchased",
      icon: <LocalMallIcon />,
      action: () => {
        handleItemClick("purchased");
        navigate("/purchased");
      },
    },
    {
      name: "stats",
      icon: <AssignmentAddIcon />,
      action: () => {
        handleItemClick("stats");
        navigate("/dynamicPage");
      },
    },
    {
      name: "data",
      icon: <PeopleIcon />,
      action: () => {
        handleItemClick("data");
        navigate("/data");
      },
    },
    {
      name: "ReadMore",
      icon: <ReadMoreIcon />,
      action: () => {
        handleItemClick("ReadMore");
        navigate("/StepperPage");
      },
    },
    {
     name: "TravelExplore",
      icon: <TravelExploreIcon />,
      action: () => {
        handleItemClick("TravelExplore");
        navigate("/location");
      },
    },
    {
      name: "form",
      icon: <NoteAltIcon />,
      action: () => {
        handleItemClick("form");
        navigate("/form");
      },
    },
    
    {
      name: "settings",
      icon: <SettingsIcon />,
      action: () => handleItemClick("settings"),
    },
  ];

  const renderButton = (item) => (
    <Button key={item.name} sx={{ minWidth: 0 }} onClick={item.action}>
      {showTooltips ? (
        <Tooltip
          title={item.name.charAt(0).toUpperCase() + item.name.slice(1)}
          placement="right"
        >
          {React.cloneElement(item.icon, {
            sx: {
              color: activeItem === item.name ? activeIconColor : iconColor,
              fontSize: iconSize,
            },
          })}
        </Tooltip>
      ) : (
        React.cloneElement(item.icon, {
          sx: {
            color: activeItem === item.name ? activeIconColor : iconColor,
            fontSize: iconSize,
          },
        })
      )}
    </Button>
  );

  return (
    <>
      {/* Toggle Button */}
      <IconButton
        onClick={toggleDrawer}
        sx={{ position: "fixed", top: 10, left: 10, zIndex: 2000 }}
      >
        <MenuIcon sx={{ color: "#aa8e05ff" }} />
      </IconButton>

      {/* Sidebar Drawer */}
      <Drawer open={open} onClose={toggleDrawer}>
        <Box
          sx={{
            width: width,
            bgcolor: bgColor,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            py: 2,
            borderTopLeftRadius: borderRadius,
            borderBottomLeftRadius: borderRadius,
            height: "100%",
          }}
        >
          {/* Dashboard icon with marginTop so it doesn’t overlap */}
          <Box sx={{ mt: 6 }}>
            {renderButton(sidebarItems[0])} {/* Dashboard */}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
            }}
          >
            {sidebarItems.slice(1, -1).map(renderButton)}
          </Box>

          {renderButton(sidebarItems[sidebarItems.length - 1])} {/* Settings */}
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
