// import React, { useContext } from "react";
// import { useForm } from "react-hook-form";
// import { TextField, Button, Box, Typography, Container } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Layout from "../Layout/Layout";
// import { AuthContext } from "../../contextAPI/Context";

// const SignIn = () => {
//   const navigate = useNavigate();
//   const {login} = useContext(AuthContext);
//   // ✅ useForm Hook for handling form state & validation
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   // ✅ Handle Form Submission
//   const onSubmit = async (data) => {
//     console.log(data)
//     try {
//       const response = await axios.post("https://idea-bridge-backend.onrender.com/api/auth/signin", data, {
//         headers: { "Content-Type": "application/json" },
//       });

//       console.log("Sign In Success:", response.data);
//       console.log(response.data.user,response.data.token)
//       login(response.data.user,response.data.token)
//       navigate("/");
//     } catch (error) {
//       console.error("Sign In Error:", error.response?.data || error.message);
//     }
//   };

//   return (
//     <Layout>
//       {/* ✅ Full Page Wrapper */}
//       <Box
//         sx={{
//           minHeight: "50vh", // Full viewport height
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           backgroundColor: "#f4f6f8", // Light background for better contrast
//         }}
//       >
//         <Container maxWidth="xs">
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               textAlign: "center",
//               padding: 4,
//               backgroundColor: "#fff",
//               borderRadius: 2,
//               boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
//             }}
//           >
//             <Typography variant="h4" fontWeight="bold" mb={3}>
//               Sign In
//             </Typography>

//             {/* ✅ Sign In Form */}
//             <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: "100%" }}>
//               {/* Email or Username */}
//               <TextField
//                 label="Email or Username"
//                 variant="outlined"
//                 fullWidth
//                 {...register("emailOrUsername", {
//                   required: "Email or Username is required",
//                   pattern: {
//                     value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$|^[a-zA-Z0-9_.-]+$/,
//                     message: "Invalid email or username",
//                   },
//                 })}
//                 error={!!errors.emailOrUsername}
//                 helperText={errors.emailOrUsername?.message}
//                 sx={{ mb: 2 }}
//               />

//               {/* Password */}
//               <TextField
//                 label="Password"
//                 type="password"
//                 variant="outlined"
//                 fullWidth
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: {
//                     value: 6,
//                     message: "Password must be at least 6 characters",
//                   },
//                 })}
//                 error={!!errors.password}
//                 helperText={errors.password?.message}
//                 sx={{ mb: 2 }}
//               />

//               {/* Submit Button */}
//               <Button type="submit" variant="contained" color="primary" fullWidth>
//                 Sign In
//               </Button>
//             </Box>

//             {/* ✅ Forgot Password & Sign Up Links */}
//             <Box mt={2}>
//               <Typography variant="body2">
//                 <a href="/forgot-password" style={{ color: "#1565c0", textDecoration: "none" }}>
//                   Forgot Password?
//                 </a>
//               </Typography>
//               <Typography variant="body2" mt={1}>
//                 Don't have an account?{" "}
//                 <a href="/auth/signup" style={{ color: "#1565c0", textDecoration: "none" }}>
//                   Sign Up
//                 </a>
//               </Typography>
//             </Box>
//           </Box>
//         </Container>
//       </Box>
//     </Layout>
//   );
// };

// export default SignIn;
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../contextAPI/Context";
import Layout from "../Layout/Layout";
import GoogleIcon from "@mui/icons-material/Google";
import SideImg from "../../src/assets/signin.png"; // ✅ Correct import

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://idea-bridge-backend.onrender.com/api/auth/signin", data, {
        headers: { "Content-Type": "application/json" },
      });
      login(response.data.user, response.data.token);
      navigate("/");
    } catch (error) {
      console.error("Sign In Error:", error.response?.data || error.message);
    }
  };

  return (
    <Layout>
      <Grid
        container
        sx={{
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Grid
          container
          item
          xs={11}
          md={10}
          sx={{
            boxShadow: 3,
            borderRadius: 3,
            overflow: "hidden",
            backgroundColor: "#ffffff",
          }}
        >
          {/* Left Side (Form) */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              p: { xs: 4, md: 6 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "100%", maxWidth: 400, mx: "auto" }}>
              <Typography variant="h6" fontWeight="bold" mb={1}>
                Idea Bridge
              </Typography>

              <Typography variant="h4" fontWeight="bold" mb={1}>
                Welcome back
              </Typography>

              <Typography variant="body2" color="textSecondary" mb={3}>
                Please enter your details
              </Typography>

              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  label="Email address or Username"
                  variant="outlined"
                  fullWidth
                  {...register("emailOrUsername", {
                    required: "Email or Username is required",
                  })}
                  error={!!errors.emailOrUsername}
                  helperText={errors.emailOrUsername?.message}
                  sx={{ mb: 2 }}
                />

                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{ mb: 2 }}
                />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Remember for 30 days"
                  />
                  {/* <a
                    href="/forgot-password"
                    style={{
                      color: "#6c63ff",
                      textDecoration: "none",
                      fontSize: "14px",
                    }}
                  >
                    Forgot password?
                  </a> */}
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#6c63ff",
                    color: "#fff",
                    mb: 2,
                    py: 1.2,
                    fontWeight: "bold",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#574b90",
                    },
                  }}
                >
                  Sign In
                </Button>

                {/* <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<GoogleIcon />}
                  sx={{
                    textTransform: "none",
                    borderColor: "#ccc",
                    color: "#333",
                    mb: 2,
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                      borderColor: "#bbb",
                    },
                  }}
                >
                  Sign in with Google
                </Button> */}

                <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                  Don’t have an account?{" "}
                  <a href="/auth/signup" style={{ color: "#6c63ff", textDecoration: "none" }}>
                    Sign up
                  </a>
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Right Side (Image) */}
          {!isMobile && (
            <Grid
              item
              md={6}
              sx={{
                backgroundColor: "#f3e8ff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 4,
              }}
            >
              <Box
                component="img"
                src={SideImg}
                alt="Sign In Illustration"
                sx={{
                  width: "100%",
                  maxWidth: "450px",
                  height: "auto",
                }}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default SignIn;
