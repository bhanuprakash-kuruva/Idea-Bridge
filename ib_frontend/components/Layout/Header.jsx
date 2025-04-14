// import React, { useContext, useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   Container,
//   Drawer,
//   IconButton,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Divider
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu"; 
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../contextAPI/Context";
// import ideaBridgeLogo from "../../src/assets/idea.jpeg"; 

// const Header = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//     setDrawerOpen(false);
//   };

//   const navLinks = [
//     { text: "Home", path: "/" },
//     { text: "Ideas", path: "/ideas" },
//     { text: "Collaborate", path: "/collaborate" },
//     { text: "Community", path: "/community" },
//     { text: "Contact", path: "/contact" },
//   ];

//   if (user?.role === "Admin") {
//     navLinks.push({ text: "Manage Users", path: "/admin/users" });
//   }
//   if(user){
//     navLinks.push({ text: "Profile", path: "/user/profile" })
//   }
//   return (
//     <>
//       {/* Top Navigation Bar */}
//       <AppBar
//         position="fixed"
//         sx={{
//           backgroundColor: "#2E7D32",
//           boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
//           width: "100%",
//           zIndex: 1100,
//         }}
//       >
//         <Container maxWidth="lg">
//           <Toolbar>
//             {/* Mobile Menu Button */}
//             <IconButton
//               edge="start"
//               color="inherit"
//               aria-label="menu"
//               onClick={() => setDrawerOpen(true)}
//               sx={{ display: { xs: "block", md: "none" }, mr: 2 }}
//             >
//               <MenuIcon />
//             </IconButton>

//             {/* Logo */}
//             <Box
//               component={Link}
//               to="/"
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 textDecoration: "none",
//                 color: "inherit",
//               }}
//             >
//               <img src={ideaBridgeLogo} alt="Idea Bridge Logo" style={{ width: 30, height: 30, marginRight: 10 }} />
//               <Typography variant="h6" sx={{ fontWeight: "bold", letterSpacing: "1px" }}>
//                 Idea Bridge
//               </Typography>
//             </Box>

//             {/* Spacer for Alignment */}
//             <Box sx={{ flexGrow: 1 }} />

//             {/* Desktop Navigation Links */}
//             <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
//               {navLinks.map((link) => (
//                 <Button key={link.text} color="inherit" component={Link} to={link.path} sx={{ fontWeight: "bold" }}>
//                   {link.text}
//                 </Button>
//               ))}

//               {/* Sign In/Sign Out Button */}
//               {user ? (
//                 <Button color="inherit" onClick={handleLogout} sx={{ fontWeight: "bold", color: "warning" }}>
//                   Sign Out
//                 </Button>
//               ) : (
//                 <Button color="inherit" component={Link} to="/auth/signin" sx={{ fontWeight: "bold", color: "warning" }}>
//                   Sign In
//                 </Button>
//               )}
//             </Box>
//           </Toolbar>
//         </Container>
//       </AppBar>

//       {/* Mobile Drawer (Sidebar) */}
//       <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
//         <Box
//           sx={{
//             width: 260,
//             display: "flex",
//             flexDirection: "column",
//             height: "100%",
//             backgroundColor: "#f5f5f5",
//           }}
//           role="presentation"
//           onClick={() => setDrawerOpen(false)}
//         >
//           {/* Drawer Header with Logo */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               padding: "16px",
//               backgroundColor: "#2E7D32",
//               color: "white",
//             }}
//           >
//             <img src={ideaBridgeLogo} alt="Idea Bridge" style={{ width: 30, height: 30, marginRight: 10 }} />
//             <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//               Idea Bridge
//             </Typography>
//           </Box>

//           {/* Navigation Links */}
//           <List sx={{ flexGrow: 1 }}>
//             {navLinks.map((link) => (
//               <ListItem key={link.text} disablePadding>
//                 <ListItemButton component={Link} to={link.path} sx={{ padding: "12px" }}>
//                   <ListItemText
//                     primary={link.text}
//                     sx={{ textAlign: "center", fontWeight: "bold", color: "#333" }}
//                   />
//                 </ListItemButton>
//               </ListItem>
//             ))}
//           </List>

//           <Divider />

//           {/* Sign In / Sign Out Button */}
//           <List>
//             <ListItem disablePadding>
//               {user ? (
//                 <ListItemButton onClick={handleLogout} sx={{ padding: "12px" }}>
//                   <ListItemText
//                     primary="Sign Out"
//                     sx={{ textAlign: "center", fontWeight: "bold", color: "red" }}
//                   />
//                 </ListItemButton>
//               ) : (
//                 <ListItemButton component={Link} to="/auth/signin" sx={{ padding: "12px" }}>
//                   <ListItemText
//                     primary="Sign In"
//                     sx={{ textAlign: "center", fontWeight: "bold", color: "green" }}
//                   />
//                 </ListItemButton>
//               )}
//             </ListItem>
//           </List>
//         </Box>
//       </Drawer>

//       {/* Offset for Fixed AppBar */}
//       <Box sx={{ height: "64px" }} />
//     </>
//   );
// };

// export default Header;
import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import GroupsIcon from "@mui/icons-material/Groups";
import ForumIcon from "@mui/icons-material/Forum";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

import { Link, useNavigate } from "react-router-dom";
import ideaBridgeLogo from "../../src/assets/idea.jpeg";
import { AuthContext } from "../../contextAPI/Context";

const Header = () => {
  const sidebarWidth = 70;
  const { user, logout } = useContext(AuthContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = () => {
    logout();
    navigate("/");
    setDrawerOpen(false);
  };

  const navLinks = [
    { text: "Home", path: "/", icon: <HomeIcon /> },
    { text: "Ideas", path: "/ideas", icon: <LightbulbIcon /> },
    { text: "Collaborate", path: "/collaborate", icon: <GroupsIcon /> },
    { text: "Community", path: "/community", icon: <ForumIcon /> },
    { text: "Contact", path: "/contact", icon: <ContactMailIcon /> },
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

  return (
    <>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#2E7D32",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
          zIndex: 1200,
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            marginLeft: isMobile ? 0 : `${sidebarWidth}px`,
            transition: "margin-left 0.3s",
          }}
        >
          <Toolbar>
            {/* Show menu icon only on mobile */}
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setDrawerOpen(true)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* Logo and Title */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src={ideaBridgeLogo}
                alt="Idea Bridge Logo"
                style={{ width: 30, height: 30, marginRight: 10 }}
              />
              <Typography variant="h6" sx={{ fontWeight: "bold", letterSpacing: "1px" }}>
                Idea Bridge
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }} />
            {/* Add top right items if needed */}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250, backgroundColor: "#2E7D32", height: "100%", color: "white" }}>
          <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
            <img src={ideaBridgeLogo} alt="Logo" style={{ width: 30, height: 30, marginRight: 10 }} />
            <Typography variant="h6">Idea Bridge</Typography>
          </Box>

          <List>
            {navLinks.map(({ text, path, icon }) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={path}
                  onClick={() => setDrawerOpen(false)}
                  sx={{ color: "white", '&:hover': { backgroundColor: "#388e3c" } }}
                >
                  <ListItemIcon sx={{ color: "white" }}>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box sx={{ flexGrow: 1 }} />

          {/* Auth Button */}
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={authAction.path ? Link : "button"}
                to={authAction.path}
                onClick={authAction.onClick}
                sx={{ color: "white", '&:hover': { backgroundColor: "#d32f2f" } }}
              >
                <ListItemIcon sx={{ color: "white" }}>{authAction.icon}</ListItemIcon>
                <ListItemText primary={authAction.text} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Offset below AppBar */}
      <Box sx={{ height: "64px" }} />
    </>
  );
};

export default Header;

