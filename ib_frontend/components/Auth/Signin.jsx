import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../Layout/Layout";
import { AuthContext } from "../../contextAPI/Context";

const SignIn = () => {
  const navigate = useNavigate();
  const {login} = useContext(AuthContext);
  // ✅ useForm Hook for handling form state & validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ✅ Handle Form Submission
  const onSubmit = async (data) => {
    console.log(data)
    try {
      const response = await axios.post("http://localhost:8015/api/auth/signin", data, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Sign In Success:", response.data);
      console.log(response.data.user,response.data.token)
      login(response.data.user,response.data.token)
      navigate("/");
    } catch (error) {
      console.error("Sign In Error:", error.response?.data || error.message);
    }
  };

  return (
    <Layout>
      {/* ✅ Full Page Wrapper */}
      <Box
        sx={{
          minHeight: "50vh", // Full viewport height
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f4f6f8", // Light background for better contrast
        }}
      >
        <Container maxWidth="xs">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: 4,
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h4" fontWeight="bold" mb={3}>
              Sign In
            </Typography>

            {/* ✅ Sign In Form */}
            <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: "100%" }}>
              {/* Email or Username */}
              <TextField
                label="Email or Username"
                variant="outlined"
                fullWidth
                {...register("emailOrUsername", {
                  required: "Email or Username is required",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$|^[a-zA-Z0-9_.-]+$/,
                    message: "Invalid email or username",
                  },
                })}
                error={!!errors.emailOrUsername}
                helperText={errors.emailOrUsername?.message}
                sx={{ mb: 2 }}
              />

              {/* Password */}
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

              {/* Submit Button */}
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Sign In
              </Button>
            </Box>

            {/* ✅ Forgot Password & Sign Up Links */}
            <Box mt={2}>
              <Typography variant="body2">
                <a href="/forgot-password" style={{ color: "#1565c0", textDecoration: "none" }}>
                  Forgot Password?
                </a>
              </Typography>
              <Typography variant="body2" mt={1}>
                Don't have an account?{" "}
                <a href="/auth/signup" style={{ color: "#1565c0", textDecoration: "none" }}>
                  Sign Up
                </a>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default SignIn;
