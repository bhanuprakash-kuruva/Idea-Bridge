// import React, { useContext, useEffect, useState } from 'react';
// import {
//   Avatar,
//   Box,
//   Grid,
//   Typography,
//   TextField,
//   Button,
//   Paper,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   Divider,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { AuthContext } from '../../contextAPI/Context';

// // ...imports remain the same

// const DiscussionPage = ({ projectId }) => {
//     const { user } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const [discussions, setDiscussions] = useState([]);
//     const [newTitle, setNewTitle] = useState('');
//     const [newContent, setNewContent] = useState('');
  
//     const token = localStorage.getItem('token');
//     const authHeader = { Authorization: `Bearer ${token}` };
  
//     const fetchDiscussions = async () => {
//       try {
//         const { data } = await axios.get(
//           `import.meta.env.VITE_BASE_URL/api/discussion/oneproject/${projectId}`,
//           { headers: authHeader }
//         );
//         setDiscussions(data);
//       } catch (err) {
//         console.error('Failed to fetch discussions:', err.message);
//       }
//     };
  
//     const handleCreateDiscussion = async () => {
//       if (!newTitle.trim() || !newContent.trim()) return;
  
//       try {
//         await axios.post(
//           'import.meta.env.VITE_BASE_URL/api/discussion/create',
//           {
//             title: newTitle,
//             content: newContent,
//             project: projectId,
//             createdBy: user.id,
//           },
//           { headers: authHeader }
//         );
//         setNewTitle('');
//         setNewContent('');
//         fetchDiscussions();
//       } catch (err) {
//         console.error('Failed to create discussion:', err.message);
//       }
//     };
  
//     const goToProfile = (username) => {
//       navigate(`/user/anotherProfile/${username}`);
//     };
  
//     const viewDiscussion = (id) => {
//       navigate(`/discussions/${id}`);
//     };
  
//     useEffect(() => {
//       fetchDiscussions();
//     }, [projectId]);
  
//     return (
//       <Grid container spacing={4} padding={2}>
//         <Grid item xs={12} md={6}>
//           <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
//             <Typography variant="h5" gutterBottom>
//               Start a New Discussion
//             </Typography>
//             <TextField
//               fullWidth
//               label="Title"
//               value={newTitle}
//               onChange={(e) => setNewTitle(e.target.value)}
//               margin="normal"
//             />
//             <TextField
//               fullWidth
//               label="Content"
//               value={newContent}
//               onChange={(e) => setNewContent(e.target.value)}
//               margin="normal"
//               multiline
//               rows={4}
//             />
//             <Button
//               variant="contained"
//               onClick={handleCreateDiscussion}
//               sx={{ mt: 2, width: '100%' }}
//             >
//               Create Discussion
//             </Button>
//           </Paper>
//         </Grid>
  
//         <Grid item xs={12} md={6}>
//           <Typography variant="h5" gutterBottom>
//             Project Discussions
//           </Typography>
//           <Paper elevation={4} sx={{ p: 2, borderRadius: 3 }}>
//             {discussions.length > 0 ? (
//               <List>
//                 {discussions.map((d) => (
//                   <Box key={d._id}>
//                     <ListItem alignItems="flex-start">
//                       <ListItemAvatar>
//                         <Avatar
//                           sx={{ cursor: 'pointer' }}
//                           onClick={() => goToProfile(d.createdBy?.username)}
//                         >
//                           {d.createdBy?.username?.charAt(0).toUpperCase() || 'U'}
//                         </Avatar>
//                       </ListItemAvatar>
//                       <ListItemText
//                         primary={
//                           <Typography variant="h6" sx={{ mb: 0.5 }}>
//                             {d.title}
//                           </Typography>
//                         }
//                         secondary={
//                           <>
//                             <Typography
//                               variant="body2"
//                               color="text.secondary"
//                               sx={{ mb: 1, cursor: 'pointer', textDecoration: 'underline' }}
//                               onClick={() => goToProfile(d.createdBy?.username)}
//                             >
//                               By {d.createdBy?.username || 'Unknown'} ·{' '}
//                               {new Date(d.createdAt).toLocaleString()}
//                             </Typography>
//                             <Typography
//                               variant="body1"
//                               sx={{ whiteSpace: 'pre-line', mb: 1 }}
//                             >
//                               {d.content}
//                             </Typography>
//                             {d.updatedAt && (
//                               <Typography variant="caption" color="text.secondary">
//                                 Last updated: {new Date(d.updatedAt).toLocaleString()}
//                               </Typography>
//                             )}
//                             <Button
//                               variant="outlined"
//                               size="small"
//                               onClick={() => viewDiscussion(d._id)}
//                               sx={{ mt: 1 }}
//                             >
//                               View Discussion
//                             </Button>
//                           </>
//                         }
//                       />
//                     </ListItem>
//                     <Divider component="li" sx={{ my: 1 }} />
//                   </Box>
//                 ))}
//               </List>
//             ) : (
//               <Typography variant="body2">No discussions yet.</Typography>
//             )}
//           </Paper>
//         </Grid>
//       </Grid>
//     );
//   };
  
//   export default DiscussionPage;
  
import React, { useContext, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../contextAPI/Context';

const DiscussionPage = ({ projectId,created }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [discussions, setDiscussions] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const token = localStorage.getItem('token');
  const authHeader = { Authorization: `Bearer ${token}` };

  const fetchDiscussions = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/discussion/oneproject/${projectId}`,
        { headers: authHeader }
      );
      setDiscussions(data);
    } catch (err) {
      console.error('Failed to fetch discussions:', err.message);
    }
  };

  const handleCreateDiscussion = async () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/discussion/create`,
        {
          title: newTitle,
          content: newContent,
          project: projectId,
          createdBy: user.id,
        },
        { headers: authHeader }
      );
      setNewTitle('');
      setNewContent('');
      fetchDiscussions();
    } catch (err) {
      console.error('Failed to create discussion:', err.message);
    }
  };

  const goToProfile = (username) => {
    navigate(`/user/anotherProfile/${username}`);
  };

  const viewDiscussion = (id) => {
    navigate(`/discussions/${id}`);
  };

  useEffect(() => {
    fetchDiscussions();
  }, [projectId]);

  return (
    <Grid container spacing={4} padding={2}>
      {
        user.username === created && (
          <Grid item xs={12} md={6}>
        <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h5" gutterBottom>
            Start a New Discussion
          </Typography>
          <TextField
            fullWidth
            label="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Content"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            margin="normal"
            multiline
            rows={4}
          />
          <Button
            variant="contained"
            onClick={handleCreateDiscussion}
            sx={{ mt: 2, width: '100%' }}
          >
            Create Discussion
          </Button>
        </Paper>
      </Grid>
        )
      }

      <Grid item xs={12} md={6}>
        <Typography variant="h5" gutterBottom>
          Project Discussions
        </Typography>
        <Paper elevation={4} sx={{ p: 2, borderRadius: 3 }}>
          {discussions.length > 0 ? (
            <List>
              {discussions.map((d) => (
                <Box key={d._id} component="li" sx={{ listStyle: 'none' }}>
                  <ListItem alignItems="flex-start" disableGutters>
                    <ListItemAvatar>
                      <Avatar
                        sx={{ cursor: 'pointer' }}
                        onClick={() => goToProfile(d.createdBy?.username)}
                      >
                        {d.createdBy?.username?.charAt(0).toUpperCase() || 'U'}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="h6" sx={{ mb: 0.5 }}>
                          {d.title}
                        </Typography>
                      }
                      secondary={
                        <Box component="div">
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              display: 'block',
                              mb: 1,
                              cursor: 'pointer',
                              textDecoration: 'underline',
                            }}
                            onClick={() => goToProfile(d.createdBy?.username)}
                          >
                            By {d.createdBy?.username || 'Unknown'} ·{' '}
                            {new Date(d.createdAt).toLocaleString()}
                          </Typography>
                          <Typography
                            component="div"
                            variant="body1"
                            sx={{ whiteSpace: 'pre-line', mb: 1 }}
                          >
                            {d.content}
                          </Typography>
                          {d.updatedAt && (
                            <Typography
                              component="div"
                              variant="caption"
                              color="text.secondary"
                            >
                              Last updated: {new Date(d.updatedAt).toLocaleString()}
                            </Typography>
                          )}
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => viewDiscussion(d._id)}
                            sx={{ mt: 1 }}
                          >
                            View Discussion
                          </Button>
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider component="div" sx={{ my: 1 }} />
                </Box>
              ))}
            </List>
          ) : (
            <Typography variant="body2">No discussions yet.</Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DiscussionPage;
