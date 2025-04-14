import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Select,
  InputLabel,
  FormControl,
  Divider,
  ListItemIcon,
  useMediaQuery,
  useTheme,
  Menu,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import StarIcon from '@mui/icons-material/Star';
import Layout from "../Layout/Layout";
import { AuthContext } from "../../contextAPI/Context";

// Icons
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GroupIcon from "@mui/icons-material/Group";
import VisibilityIcon from "@mui/icons-material/Visibility";



const Projects = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMemberQuery, setSearchMemberQuery] = useState("");

  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null); // file upload
  const [activeProject, setActiveProject] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Idea",
    category: "Technology",
    github: "",
    liveURL: ""
  });
  const [openTeamDialog, setOpenTeamDialog] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const openMenu = Boolean(anchorEl);

  const handleMenuOpen = (event, project) => {
    setAnchorEl(event.currentTarget);
    setSelectedProject(project);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProject(null);
  };

  const handleLikeToggle = async (project) => {
    try {
      const isLiked = project.likes?.includes(user.username);
      if (isLiked) {
        project.likes = project.likes.filter((u) => u !== user.username);
        await axios.post(`http://localhost:8015/api/project/${project._id}/unlike`, { username: user.username });
      } else {
        project.likes.push(user.username);
        await axios.post(`http://localhost:8015/api/project/${project._id}/like`, { username: user.username });
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      fetchProjects()
    }
  };

  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get("http://localhost:8015/api/project");
      setProjects(data);
      console.log(data)
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();

    try {
      console.log(user)
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("createdBy", user.id);
      data.append("status", formData.status);
      data.append("category", formData.category);
      data.append("github", formData.github);
      data.append("liveURL", formData.liveURL)
      if (imageFile) {
        data.append("image", imageFile);
      }

      await axios.post("http://localhost:8015/api/project/addProject", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setOpen(false);
      setFormData({
        title: "",
        description: "",
        status: "Idea",
        category: "Technology",
        github: '',
        linkedin: ''
      });
      setImageFile(null);
      fetchProjects();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };
  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase();

    return (
      project.title?.toLowerCase().includes(query) ||
      project.description?.toLowerCase().includes(query) ||
      project.category?.toLowerCase().includes(query) ||
      project.status?.toLowerCase().includes(query) ||
      project.createdBy?.fullName?.toLowerCase().includes(query) ||
      project.createdBy?.username?.toLowerCase().includes(query)
    );
  });

  return (
    <Layout>
      <Box sx={{ maxWidth: "1200px", margin: "auto", padding: "20px", marginLeft: isMobile ? 0 : 15 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" fontWeight="bold">
            Explore Projects
          </Typography>
          <Button variant="contained" onClick={() => setOpen(true)}>
            + Add New Project
          </Button>
        </Box>
        <TextField
          label="Search Projects"
          variant="outlined"
          fullWidth
          sx={{ my: 2 }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Grid container spacing={3}>
          {filteredProjects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project._id}>
              <Box sx={{ width: "100%", maxWidth: 280, mx: "auto" }}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column", position: 'relative' }}>
                  <Box sx={{ position: "absolute", top: 4, right: 4, zIndex: 1 }}>
                    <IconButton onClick={(e) => handleMenuOpen(e, project)}>
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                  <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    {/* Your project content here, unchanged... */}
                    <Box
                      component="img"
                      src={
                        project.image
                          ? `http://localhost:8015${project.image}`
                          : "/default-project.png"
                      }
                      alt={project.title}
                      sx={{
                        width: "100%",
                        height: 180,
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />

                    {/* Title */}
                    <Typography variant="h6" fontWeight="bold" mt={2}>
                      {project.title}
                    </Typography>

                    {/* Description */}
                    <Typography variant="body2" color="textSecondary" mb={1}>
                      {project.description?.substring(0, 80)}...
                    </Typography>

                    {/* Category & Status */}
                    <Box display="flex" gap={1} flexWrap="wrap" mb={1}>
                      <Chip label={project.category} color="primary" />
                      <Chip
                        label={project.status}
                        color={
                          project.status === "Completed"
                            ? "success"
                            : project.status === "In Progress"
                              ? "warning"
                              : "default"
                        }
                      />
                    </Box>

                    {/* Created By */}
                    {project.createdBy && (
                      <Typography variant="body2" color="textSecondary" mt={1}>
                        <strong>Created By:</strong> {project.createdBy.fullName || project.createdBy.username}
                      </Typography>
                    )}

                    {/* Research Documents */}
                    {project.researchDocuments?.length > 0 && (
                      <Typography variant="body2" color="textSecondary">
                        <strong>Research Docs:</strong> {project.researchDocuments.length}
                      </Typography>
                    )}

                    {/* Created At */}
                    {project.createdAt && (
                      <Typography variant="caption" color="textSecondary">
                        Created on: {new Date(project.createdAt).toLocaleDateString()}
                      </Typography>
                    )}
                    <Box mt={2} display="flex" alignItems="center" gap={1}>
                      <IconButton
                        onClick={() => handleLikeToggle(project._id)} // Toggle like
                        color={project.likes?.includes(user.username) ? "error" : "default"} // Check if liked
                      >
                        <FavoriteIcon />
                      </IconButton>
                      <Typography variant="body2">{project.likes?.length || 0} Likes</Typography>
                    </Box>
                    <Box mt={2}>
                      <Typography variant="subtitle2" fontWeight="bold" mb={1}>
                        Team Members: ({project.teamMembers?.length || 0})
                      </Typography>
                    </Box>
                    <Box mt={2}>
                      <Menu
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleMenuClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        transformOrigin={{ vertical: "top", horizontal: "right" }}
                      >
                        {/* Like Option */}
                        <MenuItem
                          onClick={() => {
                            handleLikeToggle(selectedProject);
                            handleMenuClose();
                          }}
                        >
                          <ListItemIcon>
                            <FavoriteIcon color={selectedProject?.likes?.includes(user.username) ? "error" : "action"} />
                          </ListItemIcon>
                          <Typography variant="inherit">
                            {selectedProject?.likes?.length || 0} Likes
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          onClick={() => navigate(`/review/${selectedProject._id}`)}
                        >
                          <ListItemIcon>
                            <StarIcon/>
                          </ListItemIcon>
                          Add a Review
                        </MenuItem>
                        {/* View Team */}
                        <MenuItem
                          onClick={() => {
                            setSelectedTeam(selectedProject?.teamMembers || []);
                            setOpenTeamDialog(true);
                            handleMenuClose();
                          }}
                        >
                          <ListItemIcon>
                            <GroupIcon />
                          </ListItemIcon>
                          View Team ({selectedProject?.teamMembers?.length || 0})
                        </MenuItem>

                        <Divider />

                        {/* GitHub */}
                        {selectedProject?.github && (
                          <MenuItem
                            component="a"
                            href={selectedProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleMenuClose}
                          >
                            <ListItemIcon>
                              <GitHubIcon />
                            </ListItemIcon>
                            GitHub
                          </MenuItem>
                        )}

                        {/* LinkedIn */}
                        {selectedProject?.linkedin && (
                          <MenuItem
                            component="a"
                            href={selectedProject.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleMenuClose}
                          >
                            <ListItemIcon>
                              <LinkedInIcon />
                            </ListItemIcon>
                            LinkedIn
                          </MenuItem>
                        )}

                        <Divider />

                        {/* View Details */}
                        <MenuItem
                          onClick={() => {
                            navigate(`/project/${selectedProject?._id}`);
                            handleMenuClose();
                          }}
                        >
                          <ListItemIcon>
                            <VisibilityIcon />
                          </ListItemIcon>
                          View Details
                        </MenuItem>
                      </Menu>
                    </Box>


                  </CardContent>
                </Card>
              </Box>
            </Grid>


          ))}
        </Grid>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="title"
            label="Project Title"
            fullWidth
            value={formData.title}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select name="status" value={formData.status} onChange={handleChange}>
              <MenuItem value="Idea">Idea</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select name="category" value={formData.category} onChange={handleChange}>
              <MenuItem value="Technology">Technology</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
              <MenuItem value="Science">Science</MenuItem>
              <MenuItem value="Education">Education</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>

          {/* New GitHub field */}
          <TextField
            margin="dense"
            name="github"
            label="GitHub Repository URL"
            fullWidth
            value={formData.github}
            onChange={handleChange}
          />

          {/* New Live URL field */}
          <TextField
            margin="dense"
            name="liveURL"
            label="Live Project URL"
            fullWidth
            value={formData.liveURL}
            onChange={handleChange}
          />

          <TextField
            type="file"
            fullWidth
            margin="dense"
            onChange={handleImageChange}
            inputProps={{ accept: "image/*" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateProject}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openTeamDialog} onClose={() => setOpenTeamDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          Team Members
          <IconButton onClick={() => setOpenTeamDialog(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <TextField
            label="Search team member"
            variant="outlined"
            fullWidth
            value={searchMemberQuery}
            onChange={(e) => setSearchMemberQuery(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Box display="flex" flexWrap="wrap" gap={3}>
            {selectedTeam
              ?.filter((member) => {
                const name = member?.fullName || member?.username || member;
                return name.toLowerCase().includes(searchMemberQuery.toLowerCase());
              })
              .map((member, index) => (
                <Button key={index} onClick={() => navigate(`/user/anotherProfile/${member._id || member}`)}>
                  <Box textAlign="center">
                    <Avatar
                      src={member.profilePicture || "/default-profile.png"}
                      alt={member.fullName || member.username || `Member ${index + 1}`}
                      sx={{ width: 60, height: 60, mx: "auto", mb: 1 }}
                    />
                    <Typography variant="body2" noWrap maxWidth={80}>
                      {member.fullName || member.username || (typeof member === "string" ? member : "")}
                    </Typography>
                  </Box>
                </Button>
              ))}
          </Box>
        </DialogContent>


        <DialogActions>
          <Button onClick={() => setOpenTeamDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default Projects;
