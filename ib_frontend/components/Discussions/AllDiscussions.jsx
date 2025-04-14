import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    Typography,
    TextField,
    CircularProgress,
    Card,
    CardContent,
    Avatar,
    IconButton,
    Stack,
    Button,
    useMediaQuery,
} from "@mui/material";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import { AuthContext } from "../../contextAPI/Context";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";


const AllDiscussionsPage = () => {
    const { user } = useContext(AuthContext)
    const [discussions, setDiscussions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredDiscussions, setFilteredDiscussions] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:600px)');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [discussionToDelete, setDiscussionToDelete] = useState(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editData, setEditData] = useState({ id: "", title: "", content: "" });

    const handleMenuOpen = (event, id) => {
        setAnchorEl(event.currentTarget);
        setSelectedId(id);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedId(null);
    };

    const handleEdit = (discussion) => {
        handleMenuClose();
        setEditData({
            id: discussion._id,
            title: discussion.title,
            content: discussion.content,
        });
        setEditDialogOpen(true);
    };



    const handleDelete = (discussionId) => {
        handleMenuClose();
        setDiscussionToDelete(discussionId);
        setDeleteDialogOpen(true);
    };


    useEffect(() => {
        const fetchDiscussions = async () => {
            try {
                const { data } = await axios.get("http://localhost:8015/api/discussion/");
                setDiscussions(data);
                setFilteredDiscussions(data);
            } catch (error) {
                console.error("Error fetching discussions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDiscussions();
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = discussions.filter((d) =>
            d.title.toLowerCase().includes(term) ||
            d.content.toLowerCase().includes(term) ||
            d.project?.title.toLowerCase().includes(term) ||
            d.createdBy?.username.toLowerCase().includes(term)
        );
        setFilteredDiscussions(filtered);
    };

    return (
        <Layout>
            <Box p={3} sx={{ marginLeft: isMobile ? 0 : 10 }}>
                <Typography variant="h4" gutterBottom fontWeight={600}>
                    💬 Explore Discussions
                </Typography>

                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search discussions by title, project, or user..."
                    value={searchTerm}
                    onChange={handleSearch}
                    InputProps={{
                        startAdornment: <SearchIcon sx={{ mr: 1 }} />,
                    }}
                    sx={{ mb: 4 }}
                />

                {loading ? (
                    <CircularProgress />
                ) : filteredDiscussions.length === 0 ? (
                    <Typography>No discussions found.</Typography>
                ) : (
                    filteredDiscussions.map((discussion) => (
                        <Card key={discussion._id} sx={{ mb: 3, p: 2, borderRadius: 2, boxShadow: 3 }}>
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        sx={{ cursor: "pointer" }}
                                        onClick={() => navigate(`/user/anotherProfile/${discussion.createdBy.username}`)}
                                    >
                                        <Avatar sx={{ mr: 2, bgcolor: "#1976d2" }}>
                                            {discussion.createdBy.username[0]?.toUpperCase()}
                                        </Avatar>
                                        <Box>
                                            <Typography variant="subtitle1" fontWeight={600}>
                                                {discussion.createdBy.username}
                                            </Typography>
                                            <Typography variant="caption" color="textSecondary">
                                                {new Date(discussion.createdAt).toLocaleDateString()}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {discussion.createdBy.username === user.username && (
                                        <Box>
                                            <IconButton onClick={(e) => handleMenuOpen(e, discussion._id)}>
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl && selectedId === discussion._id)}
                                                onClose={handleMenuClose}
                                            >
                                                <MenuItem onClick={() => handleEdit(discussion)}>Edit</MenuItem>
                                                <MenuItem onClick={() => handleDelete(discussion._id)}>Delete</MenuItem>
                                            </Menu>
                                        </Box>
                                    )}
                                </Box>


                                <Typography variant="h6" gutterBottom>
                                    {discussion.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                    {discussion.content.length > 200
                                        ? `${discussion.content.substring(0, 200)}...`
                                        : discussion.content}
                                </Typography>

                                {discussion.project && (
                                    <Typography variant="body2" color="primary" fontWeight={500}>
                                        📌 Project: {discussion.project.title}
                                    </Typography>
                                )}

                                <Stack direction="row" spacing={3} mt={2} alignItems="center">
                                    <Typography variant="caption">💬 {discussion.comments.length} Comments</Typography>
                                    <Typography variant="caption">❤️ {discussion.likes.length} Likes</Typography>
                                    <IconButton size="small">
                                        <FavoriteIcon color="error" fontSize="small" />
                                    </IconButton>
                                    <Box flexGrow={1} />
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={() => navigate(`/discussions/${discussion._id}`)}
                                    >
                                        View Discussion
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    ))
                )}
            </Box>
            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} fullWidth>
                <DialogTitle>Edit Discussion</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Title"
                        margin="normal"
                        value={editData.title}
                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        label="Content"
                        multiline
                        rows={4}
                        margin="normal"
                        value={editData.content}
                        onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={async () => {
                        try {
                            await axios.put(`http://localhost:8015/api/discussion/${editData.id}`, {
                                title: editData.title,
                                content: editData.content,
                            });
                            setEditDialogOpen(false);
                            // Refresh the discussions
                            const { data } = await axios.get("http://localhost:8015/api/discussion/");
                            setDiscussions(data);
                            setFilteredDiscussions(data);
                        } catch (err) {
                            console.error("Update failed", err);
                        }
                    }}>
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this discussion? This action cannot be undone.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={async () => {
                            try {
                                await axios.delete(`http://localhost:8015/api/discussion/${discussionToDelete}`);
                                setFilteredDiscussions(prev => prev.filter(d => d._id !== discussionToDelete));
                                setDiscussions(prev => prev.filter(d => d._id !== discussionToDelete));
                            } catch (error) {
                                console.error("Error deleting discussion:", error);
                            } finally {
                                setDeleteDialogOpen(false);
                                setDiscussionToDelete(null);
                            }
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

        </Layout>
    );
};

export default AllDiscussionsPage;
