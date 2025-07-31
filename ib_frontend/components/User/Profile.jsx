import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions, Skeleton, Modal, Fade, Backdrop, IconButton, Tooltip,
  TextField, FormControl, Select, MenuItem, InputLabel,
  Avatar, Box, Typography, Button, Grid, Tabs, Tab, Stack, Divider, Chip, Card, CardContent, useMediaQuery, CardMedia
} from "@mui/material";
import axios from "axios";
import Layout from "../Layout/Layout";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from '@mui/icons-material/Close';
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { AuthContext } from "../../contextAPI/Context";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import CollaboratorsDialog from "../Ideas/AddCollab";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";


const Profile = () => {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editProjectData, setEditProjectData] = useState({
    _id: '',
    title: '',
    description: '',
    status: '',
    category: '',
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [docTitle, setDocTitle] = useState('');
  const [docDescription, setDocDescription] = useState('');
  const [docFile, setDocFile] = useState(null);
  const [picOpen, setPicOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [docDialogOpen, setDocDialogOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [collaborators, setCollaborators] = useState([]);
  const [collabDialogOpen, setCollabDialogOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuProject, setMenuProject] = useState(null);

  const handleMenuOpen = (event, project) => {
    setAnchorEl(event.currentTarget);
    setMenuProject(project);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuProject(null);
  };

  const handleDocChange = (e) => {
    const { name, value } = e.target;
    setDocForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    setDocForm((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleUploadResearchDoc = async (e) => {
    e.preventDefault();

    if (!docFile) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("title", docTitle);
    formData.append("description", docDescription);
    formData.append("file", docFile);
    formData.append("relatedProject", activeProject?._id);

    formData.append("uploadedBy", user.id);         // <-- Logged-in user ID

    try {
      setUploading(true);
      const res = await axios.post("https://idea-bridge-backend.onrender.com/api/document/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const updatedProfile = await axios.get(`https://idea-bridge-backend.onrender.com/api/user/profile/${user.username}`);
      setProfile(updatedProfile.data);

      console.log("Uploaded doc:", res.data);
      alert("Document uploaded successfully!");

      // Optionally: Refresh project data
      setDocTitle("");
      setDocDescription("");
      setDocFile(null);
      setDocDialogOpen(false);
      setActiveProject(null);

    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload document.");
    } finally {
      setUploading(false);
    }
  };


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://idea-bridge-backend.onrender.com/api/user/profile/${user.username}`);
        setProfile(response.data);

      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchUser();
  }, [user, openDialog, openEditDialog]);

  if (loading) {
    return (
      <Grid container spacing={3}>
        {[...Array(6)].map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ p: 2, borderRadius: 3 }}>
              <Skeleton variant="rectangular" height={160} animation="wave" sx={{ mb: 2, borderRadius: 2 }} />
              <Skeleton variant="text" height={30} width="80%" />
              <Skeleton variant="text" height={20} width="90%" />
              <Skeleton variant="text" height={20} width="60%" sx={{ mb: 1 }} />
              <Skeleton variant="rectangular" height={36} width="100%" sx={{ mt: 2, borderRadius: 2 }} />
              <Skeleton variant="rectangular" height={36} width="100%" sx={{ mt: 1, borderRadius: 2 }} />
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!profile) return <Typography align="center" mt={5}>User not found</Typography>;
 
  const handleOpenEditDialog = (project) => {
    setEditProjectData(project);
    setOpenEditDialog(true);
  }

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };
  const handleEditChange = (e) => {
    setEditProjectData({ ...editProjectData, [e.target.name]: e.target.value });
  };
  const handleUpdateProject = async () => {
    try {
      const response = await fetch(`https://idea-bridge-backend.onrender.com/api/project/update/${editProjectData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editProjectData),
      });

      if (response.ok) {
        console.log("Project updated successfully");
        // Optional: Refresh project list or update state
        handleCloseEditDialog();
      } else {
        console.error("Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleOpenDialog = (id) => {
    setSelectedProjectId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProjectId(null);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`https://idea-bridge-backend.onrender.com/api/project/delete/${selectedProjectId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log("Project deleted successfully");
        // Optional: Refresh project list or update state here
      } else {
        console.error("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      handleCloseDialog();
    }
  };

  const handleSaveCollaborators = async (newList) => {
    try {
      console.log('adding collaborators')
      const response = await axios.post(`/api/projects/addCollaborators/${projectId}`, {
        collaborators: newList,
      });

      setCollaborators(response.data.collaborators); // Update UI state
      console.log("Collaborators saved:", response.data.collaborators);
    } catch (err) {
      console.error("Failed to save collaborators:", err);
    }

    setCollabDialogOpen(false);
  };

  return (
    <Layout>
      <Box sx={{ maxWidth: 1000, mx: "auto", p: 3 }}>
        {/* Profile Header */}
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4} display="flex" justifyContent="center">
            <Avatar
              src={profile.profilePicture || "/default-profile.png"}
              sx={{ width: 140, height: 140, cursor: 'pointer' }}
              onClick={() => setPicOpen(true)}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Stack direction={isMobile ? "column" : "row"} spacing={2} alignItems="center" mb={1}>
              <Typography variant="h6" fontWeight="bold">@{profile.username}</Typography>
            </Stack>
            <Stack direction="row" spacing={4} mt={1}>
              <Typography><strong>{profile.projectsSubmitted?.length || 0}</strong> posts</Typography>
              <Typography><strong>{profile.followers?.length || 0}</strong> followers</Typography>
              <Typography><strong>{profile.following?.length || 0}</strong> following</Typography>
            </Stack>
            <Box mt={2}>
              <Box mt={2}>
                <Typography fontWeight="bold">{profile.fullName}</Typography>
                {profile.bio && <Typography>{profile.bio}</Typography>}

                {(profile.github || profile.linkedin) && (
                  <Stack direction="row" spacing={2} mt={1}>
                    {profile.github && (
                      <Tooltip title="GitHub Profile">
                        <IconButton
                          component="a"
                          href={profile.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          color="inherit"
                        >
                          <GitHubIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {profile.linkedin && (
                      <Tooltip title="LinkedIn Profile">
                        <IconButton
                          component="a"
                          href={profile.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          color="inherit"
                        >
                          <LinkedInIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Stack>
                )}
              </Box>

            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={3}>
          {/* Skills */}
          {profile.skills?.length > 0 && (
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "linear-gradient(145deg, #f3f4f6, #ffffff)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                <Typography variant="h6" fontWeight="bold" color="secondary" mb={2}>
                  🛠️ Skills
                </Typography>
                <Grid container spacing={1}>
                  {profile.skills.map((skill, index) => (
                    <Grid item key={index}>
                      <Chip
                        label={skill}
                        sx={{
                          fontWeight: 500,
                          backgroundColor: "#f0f0f0",
                          color: "#333",
                          "&:hover": {
                            bgcolor: "secondary.light",
                            color: "#fff",
                          },
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          )}

          {/* Interests */}
          {profile.interests?.length > 0 && (
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "linear-gradient(145deg, #f3f4f6, #ffffff)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                }}
              >
                <Typography variant="h6" fontWeight="bold" color="primary" mb={2}>
                  💡 Interests
                </Typography>
                <Grid container spacing={1}>
                  {profile.interests.map((interest, index) => (
                    <Grid item key={index}>
                      <Chip
                        label={interest}
                        variant="outlined"
                        color="primary"
                        sx={{
                          fontWeight: 500,
                          "&:hover": {
                            bgcolor: "primary.main",
                            color: "#fff",
                          },
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Grid>
          )}
        </Grid>

        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(e, val) => setTab(val)}
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons={isMobile ? "auto" : false}
          centered={!isMobile}
          sx={{
            borderBottom: "1px solid #e0e0e0",
            mb: 2
          }}
        >

          <Tab label="Projects" />
          <Tab label="Collabs" />
          <Tab label="Research" />

          <Tab label="Notifications" />
          <Tab label="Contact Info" />
        </Tabs>

        {/* Tab Panels */}
        <Box mt={2}>
          {tab === 0 && (
            <Grid container spacing={3}>
              {profile.projectsSubmitted?.map((project) => (
                <Grid item xs={12} sm={6} md={4} key={project._id}>
                  <Box
                    sx={{
                      width: 320, // 🎯 Fixed width
                      mx: "auto", // 👈 Center it horizontally inside the grid cell
                    }}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        borderRadius: 3,
                        boxShadow: 2,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        position: "relative",
                        transition: "transform 0.2s ease",
                        '&:hover': {
                          transform: "translateY(-4px)",
                        },
                      }}
                    >
                      {/* 🟢 Menu icon in top-right */}
                      <IconButton
                        size="small"
                        sx={{ position: "absolute", top: 8, right: 8, zIndex: 1 }}
                        onClick={(e) => handleMenuOpen(e, project)}
                      >
                        <MoreVertIcon />
                      </IconButton>

                      {project.image && (
                        <CardMedia
                          component="img"
                          height="160"
                          image={project.image}
                          alt={project.title}
                          sx={{ objectFit: "cover" }}
                        />
                      )}

                      <CardContent sx={{ flexGrow: 1, p: 2 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                          {project.title}
                        </Typography>

                        <Typography variant="body2" color="text.secondary" gutterBottom sx={{ minHeight: 48 }}>
                          {project.description?.substring(0, 100) || "No description."}
                        </Typography>

                        <Box mt={1}>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Status:</strong> {project.status}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            <strong>Category:</strong> {project.category}
                          </Typography>
                          {project.createdBy && (
                            <Typography variant="body2" color="text.secondary">
                              <strong>Created By:</strong> {user.username}
                            </Typography>
                          )}
                          {project.teamMembers?.length > 0 && (
                            <Typography variant="body2" color="text.secondary">
                              <strong>Team Members:</strong> {project.teamMembers.length}
                            </Typography>
                          )}
                          {project.researchDocuments?.length > 0 && (
                            <Typography variant="body2" color="text.secondary">
                              <strong>Research Docs:</strong> {project.researchDocuments.length}
                            </Typography>
                          )}
                          {project.createdAt && (
                            <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                              Created on: {new Date(project.createdAt).toLocaleDateString()}
                            </Typography>
                          )}
                        </Box>

                        <Box mt={2}>
                          <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => navigate(`/project/${project._id}`)}
                          >
                            View Details
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Box>
                </Grid>
              ))}

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem
                  onClick={() => {
                    setActiveProject(menuProject);
                    setDocDialogOpen(true);
                    handleMenuClose();
                  }}
                >
                  + Add Research Doc
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    setActiveProject(menuProject);
                    setCollabDialogOpen(true);
                    handleMenuClose();
                  }}
                >
                  + Add Collaborators
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleOpenEditDialog(menuProject);
                    handleMenuClose();
                  }}
                >
                  Edit
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    handleOpenDialog(menuProject._id);
                    handleMenuClose();
                  }}
                  sx={{ color: "error.main" }}
                >
                  Delete
                </MenuItem>
              </Menu>

            </Grid>
          )}

          {tab === 1 && (
            <Grid container spacing={2}>
              {profile.projectsCollaborating?.map((collab) => (
                <Grid item xs={12} sm={6} md={4} key={collab._id}>
                  <Card sx={{ height: "100%", borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        {collab.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {collab.description || "No description."}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {tab === 2 && (
            <Grid container spacing={2}>
              {profile.researchDocuments?.map((doc) => (
                <Grid item xs={12} sm={6} md={4} key={doc._id}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 2,
                      boxShadow: 2,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        📄 {doc.title}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" gutterBottom sx={{ minHeight: 48 }}>
                        {doc.description || "No description available."}
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        Uploaded on: {new Date(doc.createdAt).toLocaleDateString()}
                      </Typography>
                    </CardContent>

                    <Box px={2} pb={2}>
                      <Button
                        variant="outlined"
                        color="primary"
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        fullWidth
                      >
                        View / Download
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {tab === 3 && (
            <Stack spacing={2}>
              {profile.notifications?.map(note => (
                <Card key={note._id}>
                  <CardContent>
                    <Typography>{note.message}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}

          {tab === 4 && (
            <Box sx={{ lineHeight: 2 }}>
              <Typography><strong>Email:</strong> {profile.email}</Typography>
              <Typography><strong>Phone:</strong> {profile.phone}</Typography>
              <Typography><strong>Gender:</strong> {profile.gender}</Typography>
              <Typography><strong>Role:</strong> {profile.role}</Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this project? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Project</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={editProjectData.title}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            multiline
            rows={3}
            fullWidth
            variant="outlined"
            value={editProjectData.description}
            onChange={handleEditChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              name="status"
              value={editProjectData.status}
              onChange={handleEditChange}
              label="Status"
            >
              <MenuItem value="Pending">Idea</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <TextField
            margin="dense"
            name="category"
            label="Category"
            type="text"
            fullWidth
            variant="outlined"
            value={editProjectData.category}
            onChange={handleEditChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleUpdateProject} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={docDialogOpen} onClose={() => setDocDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Upload Research Document</DialogTitle>
        <DialogContent>
          <TextField
            label="Document Title"
            name="title"
            fullWidth
            margin="dense"
            value={docTitle}
            onChange={(e) => setDocTitle(e.target.value)}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={3}
            margin="dense"
            value={docDescription}
            onChange={(e) => setDocDescription(e.target.value)}
          />
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2 }}
          >
            Choose File
            <input
              type="file"
              hidden
              accept=".pdf,.doc,.docx"
              onChange={(e) => setDocFile(e.target.files[0])}
            />
          </Button>
          {docFile && (
            <Typography variant="body2" mt={1}>
              Selected File: {docFile.name}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDocDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleUploadResearchDoc}
            disabled={uploading || !docTitle || !docDescription || !docFile}
            variant="contained"
            color="primary"
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </DialogActions>
      </Dialog>
      <Modal
        open={picOpen}
        onClose={() => setPicOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={picOpen}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 24,
              p: 2,
              maxWidth: '90vw',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <IconButton onClick={() => setPicOpen(false)} sx={{ alignSelf: 'flex-end' }}>
              <CloseIcon />
            </IconButton>
            <Box
              component="img"
              src={`https://idea-bridge-backend.onrender.com/uploads/${profile.profilePicture}` || "/default-profile.png"}
              alt="Full Profile"
              sx={{
                maxWidth: '80vw',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: 2
              }}
            />
          </Box>
        </Fade>
      </Modal>
      <Dialog open={collabDialogOpen} onClose={() => setCollabDialogOpen(false)} fullWidth maxWidth="sm">
        <CollaboratorsDialog
          projectId={activeProject ? activeProject._id : ""}
        />
      </Dialog>
    </Layout>
  );
};

export default Profile;
