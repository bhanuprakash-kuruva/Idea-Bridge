
// import React from "react";
// import {
//   Box,
//   Grid,
//   Typography,
//   Link,
//   IconButton,
//   TextField,
//   Button,
//   Divider,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import InstagramIcon from "@mui/icons-material/Instagram";
// import LinkedInIcon from "@mui/icons-material/LinkedIn";
// import SendIcon from "@mui/icons-material/Send";

// const Footer = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   return (
//     <Box
//       sx={{
//         mt: 8,
//         backgroundColor: "#2E7D32",
//         color: "white",
//         py: 6,
//         px: 3,
//         width: "100%",
//         boxShadow: "0px -2px 10px rgba(0,0,0,0.2)",
//       }}
//     >
//       <Grid container spacing={6} justifyContent="center">
//         {/* Quick Links */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
//             Quick Links
//           </Typography>
//           {["Home", "Ideas", "Collaborate", "Community", "Contact"].map((text, i) => (
//             <Link
//               key={i}
//               href={`/${text.toLowerCase()}`}
//               color="inherit"
//               underline="none"
//               display="block"
//               sx={{
//                 mb: 1,
//                 transition: "color 0.3s",
//                 "&:hover": { color: "#A5D6A7" },
//               }}
//             >
//               {text}
//             </Link>
//           ))}
//         </Grid>

//         {/* About Section */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
//             About Idea Bridge
//           </Typography>
//           <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
//             Idea Bridge is a community for innovators, thinkers, and creators to connect, collaborate, and build the future together. Share your ideas, collaborate on projects, and make things happen.
//           </Typography>
//         </Grid>

//         {/* Social Media */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
//             Follow Us
//           </Typography>
//           <Box>
//             {[["https://facebook.com", <FacebookIcon />],
//               ["https://twitter.com", <TwitterIcon />],
//               ["https://instagram.com", <InstagramIcon />],
//               ["https://linkedin.com", <LinkedInIcon />]].map(([url, icon], i) => (
//               <IconButton
//                 key={i}
//                 href={url}
//                 target="_blank"
//                 rel="noopener"
//                 sx={{
//                   color: "white",
//                   transition: "color 0.3s",
//                   "&:hover": { color: "#A5D6A7" },
//                 }}
//               >
//                 {icon}
//               </IconButton>
//             ))}
//           </Box>
//         </Grid>

//         {/* Newsletter */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
//             Subscribe to our Newsletter
//           </Typography>
//           <Typography variant="body2" sx={{ mb: 1 }}>
//             Stay updated with the latest ideas and collaborations.
//           </Typography>
//           <Box
//             component="form"
//             onSubmit={(e) => {
//               e.preventDefault();
//               alert("Thank you for subscribing!");
//             }}
//             sx={{ display: "flex", gap: 1, mt: 2 }}
//           >
//             <TextField
//               variant="outlined"
//               size="small"
//               placeholder="Your Email"
//               sx={{
//                 backgroundColor: "white",
//                 borderRadius: 1,
//                 input: { color: "black" },
//                 flexGrow: 1,
//               }}
//               required
//               type="email"
//             />
//             <Button
//               type="submit"
//               variant="contained"
//               color="secondary"
//               endIcon={<SendIcon />}
//             >
//               Subscribe
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>

//       <Divider sx={{ mt: 6, mb: 3, borderColor: "rgba(255,255,255,0.2)" }} />

//       <Grid container justifyContent="space-between" alignItems="center" spacing={isMobile ? 2 : 0}>
//         {/* Legal Links */}
//         <Grid item xs={12} sm={6}>
//           <Box sx={{ textAlign: isMobile ? "center" : "left" }}>
//             <Link
//               href="/privacy"
//               color="inherit"
//               underline="hover"
//               sx={{ mr: 2 }}
//             >
//               Privacy Policy
//             </Link>
//             <Link href="/terms" color="inherit" underline="hover">
//               Terms of Service
//             </Link>
//           </Box>
//         </Grid>

//         {/* Copyright */}
//         <Grid item xs={12} sm={6}>
//           <Typography variant="body2" sx={{ textAlign: isMobile ? "center" : "right" }}>
//             © {new Date().getFullYear()} Idea Bridge. All Rights Reserved.
//           </Typography>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Footer;
import React from "react";
import {
  Box,
  Grid,
  Typography,
  Link,
  IconButton,
  TextField,
  Button,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SendIcon from "@mui/icons-material/Send";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#2E7D32",
        color: "white",
        width: "100%",
        px: { xs: 2, sm: 4, md: 8 },
        py: 6,
        boxShadow: "0px -2px 10px rgba(0,0,0,0.2)",
        overflowX: "hidden", // Prevent unwanted horizontal scroll
        margin: 0,
      }}
    >
      <Grid container spacing={6} justifyContent="center">
        {/* Quick Links */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Quick Links
          </Typography>
          {["Home", "Ideas", "Collaborate", "Community", "Contact"].map((text, i) => (
            <Link
              key={i}
              href={`/${text.toLowerCase()}`}
              color="inherit"
              underline="none"
              display="block"
              sx={{
                mb: 1,
                transition: "color 0.3s",
                "&:hover": { color: "#A5D6A7" },
              }}
            >
              {text}
            </Link>
          ))}
        </Grid>

        {/* About Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            About Idea Bridge
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
            Idea Bridge is a community for innovators, thinkers, and creators to connect, collaborate, and build the future together. Share your ideas, collaborate on projects, and make things happen.
          </Typography>
        </Grid>

        {/* Social Media */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Follow Us
          </Typography>
          <Box>
            {[["https://facebook.com", <FacebookIcon />],
              ["https://twitter.com", <TwitterIcon />],
              ["https://instagram.com", <InstagramIcon />],
              ["https://linkedin.com", <LinkedInIcon />]].map(([url, icon], i) => (
              <IconButton
                key={i}
                href={url}
                target="_blank"
                rel="noopener"
                sx={{
                  color: "white",
                  transition: "color 0.3s",
                  "&:hover": { color: "#A5D6A7" },
                }}
              >
                {icon}
              </IconButton>
            ))}
          </Box>
        </Grid>

        {/* Newsletter */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Subscribe to our Newsletter
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Stay updated with the latest ideas and collaborations.
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing!");
            }}
            sx={{ display: "flex", gap: 1, mt: 2 }}
          >
            <TextField
              variant="outlined"
              size="small"
              placeholder="Your Email"
              sx={{
                backgroundColor: "white",
                borderRadius: 1,
                input: { color: "black" },
                flexGrow: 1,
              }}
              required
              type="email"
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              endIcon={<SendIcon />}
            >
              Subscribe
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Divider and Bottom Section */}
      <Divider sx={{ mt: 6, mb: 3, borderColor: "rgba(255,255,255,0.2)" }} />

      <Grid container justifyContent="space-between" alignItems="center" spacing={isMobile ? 2 : 0}>
        {/* Legal Links */}
        <Grid item xs={12} sm={6}>
          <Box sx={{ textAlign: isMobile ? "center" : "left" }}>
            <Link
              href="/privacy"
              color="inherit"
              underline="hover"
              sx={{ mr: 2 }}
            >
              Privacy Policy
            </Link>
            <Link href="/terms" color="inherit" underline="hover">
              Terms of Service
            </Link>
          </Box>
        </Grid>

        {/* Copyright */}
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" sx={{ textAlign: isMobile ? "center" : "right" }}>
            © {new Date().getFullYear()} Idea Bridge. All Rights Reserved.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
