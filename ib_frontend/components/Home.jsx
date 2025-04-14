import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";

// Sample testimonials (randomized)
const testimonials = [
  { name: "Alice", feedback: "Idea Bridge helped me bring my startup vision to life!" },
  { name: "Bob", feedback: "The collaboration tools are amazing and easy to use." },
  { name: "Charlie", feedback: "A great place to connect with like-minded innovators!" },
  { name: "Diana", feedback: "I found my co-founder here. Highly recommend!" },
];

const Home = () => {
  const navigate = useNavigate();
  const randomTestimonial =
    testimonials[Math.floor(Math.random() * testimonials.length)];

  return (
    <Layout>
      <Box sx={{ textAlign: "center", padding: 4 }}>
        {/* Hero Section */}
        <Box sx={{ mb: 5, mt: 3 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            🚀 Welcome to <span style={{ color: "#1976d2" }}>Idea Bridge</span>
          </Typography>
          <Typography variant="h6" color="textSecondary" mb={3}>
            Connect, Collaborate, and Bring Your Ideas to Life
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              m: 1,
              transition: "0.3s",
              "&:hover": { backgroundColor: "#125ea4" },
            }}
            onClick={() => navigate("/ideas")}
          >
            🔍 Explore Ideas
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              m: 1,
              transition: "0.3s",
              "&:hover": { backgroundColor: "#f50057", color: "#fff" },
            }}
            onClick={() => navigate("/ideas")}
          >
            ✨ Submit Your Idea
          </Button>
        </Box>

        {/* How It Works */}
        <Typography variant="h4" fontWeight="bold" mt={5} mb={2}>
          How It Works 🛠️
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {[
            {
              title: "🚀 Submit Your Idea",
              desc: "Share your innovative idea and get valuable feedback.",
            },
            {
              title: "🤝 Collaborate with Others",
              desc: "Form teams and work together on exciting projects.",
            },
            {
              title: "📊 Track Progress",
              desc: "Stay updated with real-time project tracking.",
            },
          ].map((step, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card
                sx={{
                  textAlign: "center",
                  padding: 2,
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {step.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Key Features */}
        <Typography variant="h4" fontWeight="bold" mt={5} mb={2}>
          Key Features ⚡
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {[
            { title: "📄 Structured Submission", desc: "Organized idea submissions with easy tracking." },
            { title: "🔗 Networking", desc: "Connect with like-minded innovators." },
            { title: "📈 Progress Updates", desc: "Keep your team informed in real-time." },
          ].map((feature, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card
                sx={{
                  textAlign: "center",
                  padding: 2,
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {feature.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Featured Projects */}
        <Typography variant="h4" fontWeight="bold" mt={5} mb={2}>
          Featured Projects 🌟
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {[1, 2, 3].map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project}>
              <Card
                sx={{
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <CardContent>
                  <Typography variant="h5">🚀 Project {project}</Typography>
                  <Typography color="textSecondary">
                    Innovative solutions for the future.
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ marginTop: 2 }}
                    onClick={() => navigate(`/project/${project}`)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Testimonials */}
        <Typography variant="h4" fontWeight="bold" mt={5} mb={2}>
          What Our Users Say 💬
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Card
              sx={{
                textAlign: "center",
                padding: 2,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {randomTestimonial.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  "{randomTestimonial.feedback}"
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Call to Action */}
        <Box
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            padding: 4,
            borderRadius: "10px",
            mt: 5,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Ready to share your idea? 🚀
          </Typography>
          <Typography variant="body1" mb={2}>
            Join our community and start innovating today!
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              transition: "0.3s",
              "&:hover": { backgroundColor: "#f50057" },
            }}
            onClick={() => navigate("/auth/signup")}
          >
            Get Started
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
