
import React, { useState } from "react";
import {
  TextField, Button, Select, MenuItem, InputLabel, FormControl,
  Typography, Box, Grid, Avatar, Card, CardContent, CardHeader,
  Divider, Snackbar, Alert, Tooltip, CircularProgress, IconButton,
  InputAdornment, ToggleButtonGroup, ToggleButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";

const Signup = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: "", email: "", username: "", password: "",
      phone: "", gender: "", bio: "", skills: "", interests: "",
      github: "", linkedin: ""
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      username: Yup.string().required("Username is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      phone: Yup.string().required("Phone number is required"),
      gender: Yup.string().required("Gender is required"),
      github: Yup.string().url("Enter a valid GitHub URL"),
      linkedin: Yup.string().url("Enter a valid LinkedIn URL"),

    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, val]) => formData.append(key, val));
      if (profilePicture) formData.append("profilePicture", profilePicture);

      setLoading(true);
      try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/signup`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setSnackbar({ open: true, message: "Signup successful!", severity: "success" });
        formik.resetForm();
        setTimeout(() => navigate("/auth/signin"), 1500);
      } catch (err) {
        setSnackbar({
          open: true,
          message: err.response?.data?.message || "Something went wrong!",
          severity: "error"
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  return (
    <Layout>
      <Box sx={{ maxWidth: 1000, mx: "auto", mt: 4, px: 2 }}>
      <Card sx={{ borderRadius: 4, boxShadow: 5 }}>
        <CardHeader
          title={<Typography variant="h5" fontWeight="bold">Create Your Account</Typography>}
          subheader={<Typography variant="subtitle1">Join our creative community!</Typography>}
          sx={{ pb: 0 }}
        />
        <Divider />
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={4}>
              {/* Profile Picture */}
              <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
                <Avatar
                  src={preview || "/default-profile.png"}
                  alt="Profile Preview"
                  sx={{ width: 130, height: 130, mx: "auto", mb: 2 }}
                />
                <Button variant="outlined" component="label" fullWidth>
                  Upload Picture
                  <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                </Button>
                {profilePicture && (
                  <Typography variant="body2" sx={{ mt: 1 }}>{profilePicture.name}</Typography>
                )}
              </Grid>

              {/* Form Fields */}
              <Grid item xs={12} md={8}>
                {/* Account Info */}
                <Typography variant="h6" color="primary" gutterBottom>Account Info</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Tooltip title="Your full name as it will appear on your profile.">
                      <TextField fullWidth label="Full Name" name="fullName" {...formik.getFieldProps("fullName")}
                        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                        helperText={formik.touched.fullName && formik.errors.fullName} />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Email" type="email" name="email" {...formik.getFieldProps("email")}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Username" name="username" {...formik.getFieldProps("username")}
                      error={formik.touched.username && Boolean(formik.errors.username)}
                      helperText={formik.touched.username && formik.errors.username} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      {...formik.getFieldProps("password")}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={togglePasswordVisibility} edge="end">
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                </Grid>

                {/* Personal Details */}
                <Typography variant="h6" color="primary" sx={{ mt: 4 }} gutterBottom>Personal Details</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Phone" name="phone" {...formik.getFieldProps("phone")}
                      error={formik.touched.phone && Boolean(formik.errors.phone)}
                      helperText={formik.touched.phone && formik.errors.phone} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={formik.touched.gender && Boolean(formik.errors.gender)}>
                      <InputLabel>Gender</InputLabel>
                      <Select
                        name="gender"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        label="Gender"
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Bio"
                      name="bio"
                      multiline
                      rows={3}
                      {...formik.getFieldProps("bio")}
                      helperText={`${formik.values.bio.length}/160 characters`}
                      inputProps={{ maxLength: 160 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Skills (comma separated)" name="skills"
                      {...formik.getFieldProps("skills")} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Interests (comma separated)" name="interests"
                      {...formik.getFieldProps("interests")} />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
  <Grid item xs={12} sm={6}>
    <TextField
      fullWidth
      label="GitHub Profile"
      name="github"
      {...formik.getFieldProps("github")}
      error={formik.touched.github && Boolean(formik.errors.github)}
      helperText={formik.touched.github && formik.errors.github}
    />
  </Grid>

  <Grid item xs={12} sm={6}>
    <TextField
      fullWidth
      label="LinkedIn Profile"
      name="linkedin"
      {...formik.getFieldProps("linkedin")}
      error={formik.touched.linkedin && Boolean(formik.errors.linkedin)}
      helperText={formik.touched.linkedin && formik.errors.linkedin}
    />
  </Grid>
</Grid>


                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{ mt: 4 }}
                  disabled={loading}
                  startIcon={loading && <CircularProgress size={20} />}
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
    </Layout>
  );
};

export default Signup;
