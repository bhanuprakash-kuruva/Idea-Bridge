import React, { useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert,
} from '@mui/material';

const CollaboratorsDialog = ({ projectId }) => {
  const [collaborators, setCollaborators] = useState([]);
  const [collabDialogOpen, setCollabDialogOpen] = useState(false);
  const [newCollaborator, setNewCollaborator] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleAddCollaborator = () => {
    const newEntries = newCollaborator
      .split(',')
      .map(entry => entry.trim())
      .filter(entry => entry.length > 0 && !collaborators.includes(entry));

    if (newEntries.length > 0) {
      setCollaborators(prev => [...prev, ...newEntries]);
      setNewCollaborator('');
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/project/addCollaborator/${projectId}`, {
        collaborators,
      });
      setSnackbar({ open: true, message: 'Collaborators saved!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to save collaborators.', severity: 'error' });
      console.error(err);
    } finally {
      setCollabDialogOpen(false);
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={() => setCollabDialogOpen(true)}>
        Manage Collaborators
      </Button>

      <Dialog open={collabDialogOpen} onClose={() => setCollabDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Collaborators</DialogTitle>
        <DialogContent>
          <TextField
            label="Add Collaborators"
            value={newCollaborator}
            onChange={(e) => setNewCollaborator(e.target.value)}
            fullWidth
            helperText="Separate multiple emails with commas"
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleAddCollaborator}>Add</Button>

          <Typography variant="h6" sx={{ mt: 3 }}>
            Current Collaborators:
          </Typography>
          {collaborators.length > 0 ? (
            <List>
              {collaborators.map((collab, index) => (
                <ListItem key={index}>
                  <ListItemText primary={collab} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No collaborators added yet.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCollabDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CollaboratorsDialog;
