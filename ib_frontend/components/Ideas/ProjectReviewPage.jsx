import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import { Box, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import ReviewCard from "./ReviewCard";

const ProjectReviewsPage = ({projectId}) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(projectId)
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(`https://idea-bridge-backend.onrender.com/api/reviews/project/${projectId}`);
        setReviews(data);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [projectId]);

  return (
    
      <Box p={3}>
        <Typography variant="h4" gutterBottom>
          Project Reviews
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : reviews.length === 0 ? (
          <Typography>No reviews yet.</Typography>
        ) : (
          reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))
        )}
      </Box>
    
  );
};

export default ProjectReviewsPage;
