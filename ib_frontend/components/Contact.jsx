
import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Email, Phone, LocationOn, Send } from "@mui/icons-material";
import Layout from "../components/Layout/Layout";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // EmailJS credentials (Ensure they start with VITE_)
  const publicKey = import.meta.env.VITE_PUBLIC_KEY;
  const serviceID = import.meta.env.VITE_SERVICE_ID;
  const templateID = import.meta.env.VITE_TEMPLATE_ID;

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate email format
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setError("All fields are required.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(null);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(serviceID, templateID, templateParams, publicKey)
      .then(() => {
        setFormData({ name: "", email: "", message: "" });
        setIsSubmitted(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.text);
        setError("There was an error sending your message. Please try again.");
        setLoading(false);
      });
  };

  return (
    <Layout>
      <Container maxWidth="md" sx={{ marginBottom: 8 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ mt: 5, fontWeight: "bold", color: "primary.main" }}
        >
          Contact Us
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" sx={{ mb: 4 }}>
          Have questions? Reach out to us, and we'll get back to you as soon as possible.
        </Typography>

        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <Paper elevation={4} sx={{ p: 3, textAlign: "center", bgcolor: "background.paper" }}>
              <Typography variant="h6" gutterBottom color="primary">
                Get in Touch
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Email color="secondary" />
                <Typography variant="body1">support@taskmanager.com</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Phone color="secondary" />
                <Typography variant="body1">+1 (123) 456-7890</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LocationOn color="secondary" />
                <Typography variant="body1">123 Task St, Productivity City, USA</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Paper elevation={4} sx={{ p: 4, bgcolor: "background.paper" }}>
              <Typography variant="h6" gutterBottom color="primary">
                Send Us a Message
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Your Name"
                  name="name"
                  variant="outlined"
                  margin="normal"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: "primary.main" },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Your Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  margin="normal"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: "primary.main" },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  label="Your Message"
                  name="message"
                  multiline
                  rows={4}
                  variant="outlined"
                  margin="normal"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&:hover fieldset": { borderColor: "primary.main" },
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    mt: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    "&:hover": { bgcolor: "primary.dark" },
                  }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : <Send />}
                  {loading ? "Sending..." : "Send Message"}
                </Button>
                {isSubmitted && (
                  <Typography variant="body1" color="success.main" sx={{ mt: 2, textAlign: "center" }}>
                    ✅ Thank you for reaching out! We’ll get back to you soon.
                  </Typography>
                )}
                {error && (
                  <Typography variant="body1" color="error.main" sx={{ mt: 2, textAlign: "center" }}>
                    ❌ {error}
                  </Typography>
                )}
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Contact;
