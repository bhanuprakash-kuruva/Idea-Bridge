import React, { useContext, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Rating,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip,
  Switch,
  FormControlLabel,
  Card,
  Divider,
  Fade,
} from '@mui/material';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

import Layout from '../components/Layout/Layout';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../contextAPI/Context';

const ReviewPage = () => {
  const { projectId } = useParams();
  const { user } = useContext(AuthContext);
  
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [innovation, setInnovation] = useState(null);
  const [technicalFeasibility, setTechnicalFeasibility] = useState(null);
  const [clarity, setClarity] = useState(null);
  const [impact, setImpact] = useState(null);
  const [anonymous, setAnonymous] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);


  const maxCommentLength = 300;

  const handleEmojiSelect = (setter, value) => {
    setter(value);
  };

  const handleSubmit = async () => {
    if (!rating || !comment.trim() || !innovation || !technicalFeasibility || !clarity || !impact) {
      setError(true);
      return;
    }

    setLoading(true);
    setError(false);
    if(projectId) console.log(projectId)
    const reviewData = {
      project: projectId,
      reviewer: user.id,
      rating,
      comment,
      innovation,
      technicalFeasibility,
      clarity,
      impact,
      anonymous
    };

    try {
      const res = await fetch('http://localhost:8015/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
      });

      if (res.ok) {
        setSuccess(true);
        setComment('');
        setRating(0);
        setInnovation(null);
        setTechnicalFeasibility(null);
        setClarity(null);
        setImpact(null);
        setAnonymous(false);
        setOpenDialog(true); // Open thank you dialog
      }
      else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const renderEmojis = (label, selected, setter) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        {label}
      </Typography>
      <Box display="flex" gap={2}>
        {['😍', '😊', '😐', '😞'].map((emoji) => (
          <Tooltip title={emoji} key={emoji}>
            <IconButton
              onClick={() => handleEmojiSelect(setter, emoji)}
              sx={{
                fontSize: 28,
                border: selected === emoji ? '2px solid #1976d2' : '2px solid transparent',
                borderRadius: '50%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#e3f2fd',
                  transform: 'scale(1.2)'
                }
              }}
            >
              <span style={{ fontSize: 26 }}>{emoji}</span>
            </IconButton>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );

  return (
    <Layout>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Fade in>
          <Card elevation={4} sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#3f51b5' }}>
              Submit a Project Review
            </Typography>
            <Typography variant="body2" sx={{ color: 'gray', mb: 3 }}>
              Your feedback helps improve project quality. Please fill all fields with your honest review.
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>Please fill all fields correctly.</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>Review submitted successfully!</Alert>}

            <Divider sx={{ mb: 3 }} />

            <Typography gutterBottom fontWeight="bold">Overall Rating</Typography>
            <Rating
              value={rating}
              onChange={(e, newVal) => setRating(newVal)}
              precision={0.5}
              size="large"
              sx={{ mb: 3 }}
            />

            <TextField
              label="Your Comment"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              helperText={`${comment.length}/${maxCommentLength} characters`}
              inputProps={{ maxLength: maxCommentLength }}
              sx={{ mb: 3 }}
            />

            {renderEmojis('Innovation', innovation, setInnovation)}
            {renderEmojis('Technical Feasibility', technicalFeasibility, setTechnicalFeasibility)}
            {renderEmojis('Clarity', clarity, setClarity)}
            {renderEmojis('Impact', impact, setImpact)}

            <FormControlLabel
              control={
                <Switch
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                  color="primary"
                />
              }
              label="Submit Anonymously"
              sx={{ mb: 3 }}
            />

            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
              sx={{
                py: 1.5,
                fontWeight: 'bold',
                fontSize: 16,
                '&:hover': {
                  backgroundColor: '#303f9f'
                }
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Review'}
            </Button>
          </Card>
        </Fade>
      </Container>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
  <DialogTitle>🎉 Thank You!</DialogTitle>
  <DialogContent>
    <Typography>
      Your review has been submitted successfully. We appreciate your feedback!
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setOpenDialog(false)} autoFocus>
      Close
    </Button>
  </DialogActions>
</Dialog>

    </Layout>
    
  );
};

export default ReviewPage;
