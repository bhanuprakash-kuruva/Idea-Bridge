import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Avatar,
  Grid,
  Box,
  CircularProgress,
  Button,
  Divider,
  Tooltip, useMediaQuery,
  Stack,
} from "@mui/material";
import {
  CalendarToday,
  Update,
  Group,
  Article,
  ArrowBack,
} from "@mui/icons-material";
import axios from "axios";
import Layout from "../Layout/Layout";
import dayjs from "dayjs";
import DiscussionPage from "../Discussions/Discussions";
import ProjectReviewsPage from "./ProjectReviewPage";

const SingleProject = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  // const isMobile = useMediaQuery('(max-width:600px)');
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8015/api/project/${id}`);
        setProject(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch project:", error);
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress />
      </Box>
    );

  if (!project)
    return (
      <Typography variant="h6" textAlign="center" mt={4}>
        Project not found.
      </Typography>
    );

  return (
    <Layout>
      <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
        <Button
          startIcon={<ArrowBack />}
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          Back
        </Button>

        <Card sx={{ borderRadius: 3, overflow: "hidden", position: "relative" }}>
          {/* Banner Image with Overlay */}
          <Box
            sx={{
              position: "relative",
              height: 260,
              backgroundImage: `url(${project.image ? `http://localhost:8015${project.image}` : "/default-project.png"
                })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                bgcolor: "rgba(0, 0, 0, 0.6)",
                color: "white",
                p: 2,
              }}
            >
              <Typography variant="h4" fontWeight="bold">
                {project.title}
              </Typography>
              <Chip label={project.category} color="primary" size="small" sx={{ mt: 1 }} />
            </Box>
          </Box>

          <CardContent>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 2, whiteSpace: 'pre-line' }}
            >
              {project.description || "No description provided."}
            </Typography>


            <Box mb={2}>
              <Chip
                label={project.status}
                color={
                  project.status === "Completed"
                    ? "success"
                    : project.status === "In Progress"
                      ? "warning"
                      : "default"
                }
                sx={{ fontWeight: "bold" }}
              />
            </Box>

            <Stack direction="row" spacing={2} mb={3}>
              <Typography variant="body2" color="text.secondary">
                <CalendarToday fontSize="small" sx={{ mr: 0.5 }} />
                Created: {dayjs(project.createdAt).format("DD MMM YYYY")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <Update fontSize="small" sx={{ mr: 0.5 }} />
                Updated: {dayjs(project.updatedAt).format("DD MMM YYYY")}
              </Typography>
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* Created By */}
            <Typography variant="h6" gutterBottom>
              Created By
            </Typography>
            <Box display="flex" alignItems="center" gap={2} mb={3} onClick={() => navigate(`/user/anotherProfile/${project.createdBy?.username}`)}>
              <Avatar
                src={project.createdBy?.profilePicture || "/default-avatar.png"}
                alt={project.createdBy?.fullName}
              />
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {project.createdBy?.fullName || "Unknown"}
                </Typography>
                <Typography variant="body2">@{project.createdBy?.username}</Typography>
              </Box>
            </Box>

            {/* Team Members */}
            <Typography variant="h6" gutterBottom>
              <Group fontSize="small" sx={{ mr: 1 }} />
              Team Members
            </Typography>

            <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
              {project.teamMembers?.length > 0 ? (
                project.teamMembers.map((username, index) => {

                  const initials = username
                    .split(' ')
                    .map((word) => word.charAt(0).toUpperCase())
                    .join('')
                    .slice(0, 2);

                  return (
                    <Button
                      key={index}
                      onClick={() => navigate(`/user/anotherProfile/${username}`)}
                      variant="text"
                      sx={{ textTransform: 'none', padding: 0, minWidth: 'auto' }}
                    >
                      <Box textAlign="center">
                        <Tooltip title={username}>
                          <Avatar alt={username} sx={{ margin: '0 auto' }}>
                            {initials}
                          </Avatar>
                        </Tooltip>
                        <Typography variant="caption" mt={0.5}>
                          {username}
                        </Typography>
                      </Box>
                    </Button>
                  );
                })
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No team members added.
                </Typography>
              )}
            </Box>


            {/* Research Documents */}
            {project.researchDocuments?.length > 0 && (
              <>
                <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
                  <Article fontSize="small" sx={{ mr: 1 }} />
                  Research Documents
                </Typography>

                <Grid container spacing={2}>
                  {project.researchDocuments.map((doc) => (
                    <Grid item xs={12} sm={6} key={doc._id}>
                      <Card
                        variant="outlined"
                        sx={{
                          p: 2,
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        {/* Document Title & Description */}
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {doc.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 1, minHeight: 60 }}
                          >
                            {doc.description?.substring(0, 120) || "No description."}
                          </Typography>
                        </Box>
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 500,
                            color: "text.secondary",
                            mb: 0.5,
                            textTransform: "uppercase",
                            letterSpacing: 0.5,
                          }}
                        >
                          Uploaded By:
                        </Typography>

                        {/* Uploaded By */}
                        {doc.uploadedBy && (
                          <Box
                            mt={2}
                            display="flex"
                            alignItems="center"
                            gap={2}
                            onClick={() =>
                              navigate(`/user/anotherProfile/${doc.uploadedBy.username}`)
                            }
                            sx={{
                              cursor: "pointer",
                              p: 1,
                              borderRadius: 2,
                              backgroundColor: "#f9f9f9",
                              transition: "0.2s",
                              "&:hover": {
                                backgroundColor: "#f0f0f0",
                              },
                            }}
                          >
                            <Avatar
                              src={
                                doc.uploadedBy.profilePicture
                                  ? `http://localhost:8015/uploads/${doc.uploadedBy.profilePicture}`
                                  : "/default-avatar.png"
                              }
                              alt={doc.uploadedBy.fullName}
                              sx={{ width: 40, height: 40 }}
                            />
                            <Box>
                              <Typography variant="subtitle2" fontWeight="bold">
                                {doc.uploadedBy.fullName || "Unknown"}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                @{doc.uploadedBy.username}
                              </Typography>
                            </Box>
                          </Box>
                        )}

                        {/* View Button */}
                        <Box mt={2}>
                          <Button
                            variant="outlined"
                            fullWidth
                            href={
                              doc.fileUrl.startsWith("http")
                                ? doc.fileUrl
                                : `http://localhost:8015${doc.fileUrl}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Document
                          </Button>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
            <DiscussionPage projectId={project._id} created={project.createdBy?.username} />
            <ProjectReviewsPage projectId={project._id} />
          </CardContent>
        </Card>
      </Container>
      
    </Layout>
  );
};

export default SingleProject;
