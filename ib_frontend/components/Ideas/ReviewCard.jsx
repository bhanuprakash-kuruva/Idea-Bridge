import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Rating,
  Stack,
  Chip,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";

const ReviewCard = ({ review }) => {
  const {
    reviewer,
    anonymous,
    comment,
    rating,
    innovation,
    clarity,
    impact,
    technicalFeasibility,
    dateOfReview,
  } = review;

  const navigate = useNavigate();

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const renderMetric = (label, emoji) => (
    <Chip
      label={`${label}: ${emoji}`}
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        fontWeight: 500,
      }}
    />
  );

  return (
    <Card
      sx={{
        mb: 3,
        border: "1px solid #e0e0e0",
        borderRadius: 3,
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        },
      }}
    >
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          mb={2}
          sx={{ cursor: anonymous ? "default" : "pointer" }}
          onClick={() =>
            !anonymous && navigate(`/user/anotherProfile/${reviewer.username}`)
          }
        >
          <Avatar
            src={
              anonymous
                ? ""
                : reviewer?.profilePicture
                ? `import.meta.env.VITE_BASE_URL/uploads/${reviewer?.profilePicture}`
                : undefined
            }
            sx={{
              mr: 2,
              bgcolor: anonymous ? "#ccc" : undefined,
            }}
          >
            {anonymous ? <PersonIcon /> : reviewer?.username?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={600}>
              {anonymous ? "Anonymous Reviewer" : reviewer?.username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Reviewed on {formatDate(dateOfReview)}
            </Typography>
          </Box>
        </Box>

        <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
          {comment}
        </Typography>

        <Box display="flex" alignItems="center" mb={1}>
          <StarIcon color="warning" fontSize="small" />
          <Typography variant="subtitle2" ml={0.5}>
            Rating:{" "}
            <Rating
              value={rating}
              precision={0.5}
              readOnly
              size="small"
              sx={{ verticalAlign: "middle" }}
            />
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} flexWrap="wrap" mt={1}>
          {renderMetric("💡 Innovation", innovation)}
          {renderMetric("🔧 Feasibility", technicalFeasibility)}
          {renderMetric("📢 Clarity", clarity)}
          {renderMetric("🌍 Impact", impact)}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
