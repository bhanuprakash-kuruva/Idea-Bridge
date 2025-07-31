import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Layout from "../components/Layout/Layout";

// Constants
const TESTIMONIALS = [
  { name: "Alice", feedback: "Idea Bridge helped me bring my startup vision to life!" },
  { name: "Bob", feedback: "The collaboration tools are amazing and easy to use." },
  { name: "Charlie", feedback: "A great place to connect with like-minded innovators!" },
  { name: "Diana", feedback: "I found my co-founder here. Highly recommend!" },
];

const HOW_IT_WORKS = [
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
];

const KEY_FEATURES = [
  { title: "📄 Structured Submission", desc: "Organized idea submissions with easy tracking." },
  { title: "🔗 Networking", desc: "Connect with like-minded innovators." },
  { title: "📈 Progress Updates", desc: "Keep your team informed in real-time." },
];

const Home = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [randomTestimonial] = useState(
    TESTIMONIALS[Math.floor(Math.random() * TESTIMONIALS.length)]
  );

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/project`);
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const renderFeatureCard = ({ title, desc }) => (
    <Card
      sx={{
        textAlign: "center",
        padding: 2,
        transition: "0.3s",
        "&:hover": { transform: "scale(1.05)" },
        height: "100%",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {desc}
        </Typography>
      </CardContent>
    </Card>
  );

  const renderProjectCard = (project) => (
    <Card
      sx={{
        transition: "0.3s",
        "&:hover": { transform: "scale(1.05)" },
        height: "100%",
      }}
    >
      <CardContent>
        <Typography variant="h5">🚀 {project.title}</Typography>
        <Typography color="textSecondary" sx={{ minHeight: 60 }}>
          {project.description.length > 100
            ? `${project.description.slice(0, 100)}...`
            : project.description}
        </Typography>
        <Button
          variant="contained"
          size="small"
          sx={{ marginTop: 2 }}
          onClick={() => navigate(`/project/${project._id}`)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );

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
          {HOW_IT_WORKS.map((step, index) => (
            <Grid item xs={12} sm={4} key={index}>
              {renderFeatureCard(step)}
            </Grid>
          ))}
        </Grid>

        {/* Key Features */}
        <Typography variant="h4" fontWeight="bold" mt={5} mb={2}>
          Key Features ⚡
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {KEY_FEATURES.map((feature, index) => (
            <Grid item xs={12} sm={4} key={index}>
              {renderFeatureCard(feature)}
            </Grid>
          ))}
        </Grid>

        {/* Featured Projects */}
        <Typography variant="h4" fontWeight="bold" mt={5} mb={2}>
          Featured Projects 🌟
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project._id}>
              {renderProjectCard(project)}
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