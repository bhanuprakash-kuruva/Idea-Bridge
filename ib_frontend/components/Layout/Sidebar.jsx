import React, { useContext, useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import GroupsIcon from "@mui/icons-material/Groups";
import ForumIcon from "@mui/icons-material/Forum";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import RateReviewIcon from '@mui/icons-material/RateReview';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contextAPI/Context";
import ideaBridgeLogo from "../../src/assets/idea.jpeg";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Hide on mobile

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { text: "Home", path: "/", icon: <HomeIcon /> },
    { text: "Ideas", path:user? "/ideas" : '/auth/signin', icon: <LightbulbIcon /> },
    { text: "Discussions", path:user ? "/discussions/all" : '/auth/signin', icon: <ForumIcon /> },
    { text: "Contact", path: user ? "/contact" : "/auth/signin", icon: <ContactMailIcon /> },
    { text: "Reviews", path: user ? "/review/undefined" : "/auth/signin", icon: <RateReviewIcon /> },
  ];
  if (user?.role === "Admin") {
    navLinks.push({ text: "Manage Users", path: "/admin/users", icon: <AdminPanelSettingsIcon /> });
  }
  if (user) {
    navLinks.push({ text: "Profile", path: "/user/profile", icon: <AccountCircleIcon /> });
  }

  const authAction = user
    ? { text: "Sign Out", icon: <LogoutIcon />, onClick: handleLogout }
    : { text: "Sign In", icon: <LoginIcon />, path: "/auth/signin" };

  if (isMobile) {
    return null; // Don't render anything on small screens
  }

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: hovered ? 200 : 70,
          transition: "width 0.3s",
          overflowX: "hidden",
          whiteSpace: "nowrap",
          '& .MuiDrawer-paper': {
            width: hovered ? 200 : 70,
            transition: "width 0.3s",
            backgroundColor: "#2E7D32",
            color: "#fff",
            borderRight: "none",
            boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
          },
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Logo Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: hovered ? "flex-start" : "center",
            p: 2,
          }}
        >
          <img src={ideaBridgeLogo} alt="Logo" style={{ width: 30, height: 30, marginRight: hovered ? 10 : 0 }} />
          {hovered && <Typography variant="h6">Idea Bridge</Typography>}
        </Box>

        {/* Navigation Links */}
        <List>
          {navLinks.map(({ text, path, icon }) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <Tooltip title={!hovered ? text : ""} placement="right">
                <ListItemButton
                  component={Link}
                  to={path}
                  sx={{
                    minHeight: 48,
                    justifyContent: hovered ? "initial" : "center",
                    px: 2.5,
                    color: "white",
                    '&:hover': { backgroundColor: "#388e3c" },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: hovered ? 2 : "auto",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  {hovered && <ListItemText primary={text} />}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>

        <Box sx={{ flexGrow: 1 }} />

        {/* Auth Button */}
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <Tooltip title={!hovered ? authAction.text : ""} placement="right">
              <ListItemButton
                component={authAction.path ? Link : "button"}
                to={authAction.path}
                onClick={authAction.onClick}
                sx={{
                  minHeight: 48,
                  justifyContent: hovered ? "initial" : "center",
                  px: 2.5,
                  color: "white",
                  '&:hover': { backgroundColor: "#d32f2f" },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: hovered ? 2 : "auto",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  {authAction.icon}
                </ListItemIcon>
                {hovered && <ListItemText primary={authAction.text} />}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        </List>
      </Drawer>

      {/* Main content wrapper with dynamic margin */}
      <Box
        sx={{
          marginLeft: hovered ? "200px" : "70px",
          transition: "margin-left 0.3s",
          width: "100%",
        }}
      >
        {/* Your routed content goes here */}
      </Box>
    </>
  );
};

export default Sidebar;
