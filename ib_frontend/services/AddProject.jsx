import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from "@mui/material";
import axios from "axios";

const ProjectModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    createdBy: "",
    teamMembers: [],
    status: "Idea",
    category: "Technology",
    researchDocuments: [],
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/projects`, formData); // Your backend endpoint
      alert("Project created!");
      handleClose();
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Something went wrong");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
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
        <TextField
          margin="dense"
          name="createdBy"
          label="Created By (User ID)"
          fullWidth
          value={formData.createdBy}
          onChange={handleChange}
          required
        />
        <FormControl margin="dense" fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <MenuItem value="Idea">Idea</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <FormControl margin="dense" fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <MenuItem value="Technology">Technology</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="Science">Science</MenuItem>
            <MenuItem value="Education">Education</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          name="image"
          label="Image URL"
          fullWidth
          value={formData.image}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectModal;
