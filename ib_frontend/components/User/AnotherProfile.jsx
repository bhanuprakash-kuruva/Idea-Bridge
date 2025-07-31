import React, { useContext, useEffect, useState } from "react";
import {
    Avatar, Box, Typography, Button, Grid, Tabs, Tab, Stack, Divider, Chip, Card, CardContent, useMediaQuery, CardMedia
} from "@mui/material";
import axios from "axios";
import Layout from "../Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { AuthContext } from "../../contextAPI/Context";

const AnotherProfile = () => {
    const navigate = useNavigate()
    const { user } = useContext(AuthContext);
    const { username } = useParams();
   
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const followUser = async () => {
        try {
            console.log(username)
            const response = await axios.put(
                `${import.meta.env.VITE_BASE_URL}/api/notification/follow/${username}`,
                {
                    currentUserId: user.id
                }
            );
            return response.data;
        } catch (error) {
            console.error('Follow request failed:', error.response?.data || error.message);
            throw error;
        }
    };
    if (user && username) {
        if (username === user.username) {
            navigate('/user/profile')
        }
    }
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/profile/${username}`);
                setProfile(response.data);

            } catch (error) {
                console.error("Error fetching user:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [username]);

    if (loading) return <Typography align="center" mt={5}>Loading...</Typography>;
    if (!profile) return <Typography align="center" mt={5}>User not found</Typography>;


    return (
        <Layout>
            <Box sx={{ maxWidth: 1000, mx: "auto", p: 3 }}>
                {/* Profile Header */}
                <Grid container spacing={3} alignItems="center">
                    <Grid  xs={12} sm={4} display="flex" justifyContent="center">
                        <Avatar
                            src={profile.profilePicture || "/default-profile.png"}
                            sx={{ width: 140, height: 140 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <Stack direction={isMobile ? "column" : "row"} spacing={2} alignItems="center" mb={1}>
                            <Typography variant="h6" fontWeight="bold">@{profile.username}</Typography>
                            <Button variant="contained" size="small" onClick={followUser}>Follow</Button>
                        </Stack>
                        <Stack direction="row" spacing={4} mt={1}>
                            <Typography><strong>{profile.projectsSubmitted?.length || 0}</strong> posts</Typography>
                            <Typography><strong>{profile.followers?.length || 0}</strong> followers</Typography>
                            <Typography><strong>{profile.following?.length || 0}</strong> following</Typography>
                        </Stack>
                        <Box mt={2}>
                            <Button onClick={()=>navigate(`/chat/${profile.username}`)}>Open Chat</Button>
                            <Typography fontWeight="bold">{profile.fullName}</Typography>
                            {profile.bio && <Typography>{profile.bio}</Typography>}
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
                        <Grid container spacing={2}>
                            {profile.projectsSubmitted?.map((project) => (
                                <Grid item xs={12} sm={6} md={4} key={project._id}>
                                    <Card sx={{ height: "100%", borderRadius: 2, display: "flex", flexDirection: "column" }}>
                                        {project.image && (
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={project.image}
                                                alt={project.title}
                                            />
                                        )}
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                                {project.title}
                                            </Typography>

                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                {project.description?.substring(0, 100) || "No description."}
                                            </Typography>

                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Status:</strong> {project.status}
                                            </Typography>

                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Category:</strong> {project.category}
                                            </Typography>

                                            {project.createdBy && (
                                                <Typography variant="body2" color="text.secondary">
                                                    <strong>Created By:</strong> {profile.username}
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
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                sx={{ marginTop: 2 }}
                                                onClick={() => navigate(`/project/${project._id}`)}
                                            >
                                                View Details
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
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
                                    <Card sx={{ height: "100%", borderRadius: 2 }}>
                                        <CardContent>
                                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                                {doc.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {doc.description || "No description available."}
                                            </Typography>
                                        </CardContent>
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
        </Layout>
    );
};

export default AnotherProfile;
