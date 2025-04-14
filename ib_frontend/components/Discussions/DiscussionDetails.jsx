
// import React, { useEffect, useState, useContext, useRef } from 'react';
// import {
//     Box,
//     Typography,
//     Paper,
//     Avatar,
//     TextField,
//     Button,
//     Divider,
//     List,
//     ListItem,
//     ListItemAvatar,
//     ListItemText,
//     CircularProgress,
//     Skeleton,
//     Collapse,
//     Tooltip
// } from '@mui/material';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { AuthContext } from '../../contextAPI/Context';

// const formatDate = (dateStr) => new Date(dateStr).toLocaleString();

// const DiscussionDetailPage = () => {
//     const { id } = useParams();
//     const { user } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const [discussion, setDiscussion] = useState(null);
//     const [newComment, setNewComment] = useState('');
//     const [loading, setLoading] = useState(true);
//     const [posting, setPosting] = useState(false);
//     const [error, setError] = useState(null);

//     const commentEndRef = useRef(null);
//     // New state to track which comment is being replied to
//     const [replyMap, setReplyMap] = useState({}); // { [commentId]: replyText }

//     // Reply handler
//     const handleReply = async (commentId) => {
//         const content = replyMap[commentId];
//         if (!content?.trim()) return;

//         try {
//             await axios.post(
//                 `http://localhost:8015/api/discussion/comments/${commentId}/reply`,
//                 { content, createdBy: user.id },
//                 { headers: authHeader }
//             );
//             setReplyMap((prev) => ({ ...prev, [commentId]: '' }));
//             await fetchDiscussion();
//             scrollToBottom();
//         } catch (err) {
//             console.error('Failed to post reply:', err.message);
//         }
//     };

//     const token = localStorage.getItem('token');
//     const authHeader = { Authorization: `Bearer ${token}` };

//     const scrollToBottom = () => {
//         commentEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     };

//     const fetchDiscussion = async () => {
//         setLoading(true);
//         try {
//             const { data } = await axios.get(
//                 `http://localhost:8015/api/discussion/${id}`,
//                 { headers: authHeader }
//             );
//             setDiscussion(data);
//             setError(null);
//         } catch (err) {
//             console.error('Fetch error:', err.message);
//             setError('Unable to load discussion. Please try again later.');
//         }
//         setLoading(false);
//     };

//     const handleAddComment = async () => {
//         if (!newComment.trim()) return;
//         setPosting(true);
//         try {
//             await axios.post(
//                 `http://localhost:8015/api/discussion/${id}/comments`,
//                 { content: newComment, createdBy: user.id },
//                 { headers: authHeader }
//             );
//             setNewComment('');
//             await fetchDiscussion();
//             scrollToBottom();
//         } catch (err) {
//             console.error('Comment error:', err.message);
//         }
//         setPosting(false);
//     };

//     useEffect(() => {
//         fetchDiscussion();
//     }, [id]);

//     if (loading) {
//         return (
//             <Box sx={{ maxWidth: '800px', mx: 'auto', p: 3 }}>
//                 <Skeleton variant="text" width="70%" height={50} />
//                 <Skeleton variant="rectangular" height={100} sx={{ my: 2 }} />
//                 <Skeleton variant="text" width="50%" />
//             </Box>
//         );
//     }

//     if (error) {
//         return (
//             <Box sx={{ maxWidth: '800px', mx: 'auto', p: 3 }}>
//                 <Typography variant="h6" color="error">{error}</Typography>
//                 <Button variant="contained" onClick={fetchDiscussion} sx={{ mt: 2 }}>
//                     Retry
//                 </Button>
//             </Box>
//         );
//     }

//     if (!discussion) {
//         return (
//             <Typography variant="body1" sx={{ mt: 4, textAlign: 'center' }}>
//                 Discussion not found.
//             </Typography>
//         );
//     }

//     return (
//         <Box sx={{ maxWidth: '800px', mx: 'auto', p: 3 }}>
//             {/* Header */}
//             <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
//                 <Typography variant="h4" gutterBottom>
//                     {discussion.title}
//                 </Typography>
//                 <Box display="flex" alignItems="center" mb={2}>
//                     <Avatar sx={{ mr: 1 }}>
//                         {discussion.createdBy?.username?.[0]?.toUpperCase() || 'U'}
//                     </Avatar>
//                     <Typography variant="body1" color="text.secondary">
//                         {discussion.createdBy?.username || 'Unknown'} · {formatDate(discussion.createdAt)}
//                     </Typography>
//                 </Box>
//                 <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }} gutterBottom>
//                     {discussion.content}
//                 </Typography>
//                 {discussion.updatedAt && (
//                     <Typography variant="caption" color="text.secondary">
//                         Last updated: {formatDate(discussion.updatedAt)}
//                     </Typography>
//                 )}
//             </Paper>

//             {/* Comments */}
//             <Box mt={4}>
//                 <Typography variant="h5" gutterBottom>
//                     Comments
//                 </Typography>

//                 {/* Add Comment */}
//                 <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
//                     <TextField
//                         fullWidth
//                         multiline
//                         rows={3}
//                         label="Write a comment..."
//                         value={newComment}
//                         onChange={(e) => setNewComment(e.target.value)}
//                     />
//                     <Button
//                         variant="contained"
//                         sx={{ mt: 2 }}
//                         disabled={posting || !newComment.trim()}
//                         onClick={handleAddComment}
//                     >
//                         {posting ? <CircularProgress size={24} color="inherit" /> : 'Post Comment'}
//                     </Button>
//                 </Paper>

//                 {/* Display Comments */}
//                 {discussion.comments?.length > 0 ? (
//                     <List>
//                         {discussion.comments.map((comment) => (
//                             <Collapse in key={comment._id} timeout={400}>
//                                 <Paper variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 2 }}>
//   <ListItem alignItems="flex-start" disableGutters>
//     <Tooltip title="View Profile">
//       <ListItemAvatar
//         sx={{ cursor: 'pointer' }}
//         onClick={() =>
//           navigate(`/user/anotherProfile/${comment.user?.username}`)
//         }
//       >
//         <Avatar>
//           {comment.user?.username?.charAt(0).toUpperCase() || 'U'}
//         </Avatar>
//       </ListItemAvatar>
//     </Tooltip>
//     <ListItemText
//       primary={
//         <Typography
//           fontWeight={600}
//           sx={{ cursor: 'pointer' }}
//           onClick={() =>
//             navigate(`/user/anotherProfile/${comment.user?.username}`)
//           }
//         >
//           {comment.user?.username || 'Unknown'}
//         </Typography>
//       }
//       secondary={
//         <>
//           <Typography
//             variant="body2"
//             sx={{ whiteSpace: 'pre-line', mb: 0.5 }}
//           >
//             {comment.content}
//           </Typography>
//           <Typography
//             variant="caption"
//             color="text.secondary"
//             sx={{ fontStyle: 'italic' }}
//           >
//             {formatDate(comment.createdAt)}
//           </Typography>
//         </>
//       }
//     />
//   </ListItem>

//   {/* Place the reply UI block HERE */}
//   {comment.replies?.length > 0 && (
//     <Box sx={{ ml: 6, mt: 1 }}>
//       {comment.replies.map((reply) => (
//         <Box
//           key={reply._id}
//           sx={{
//             display: 'flex',
//             alignItems: 'flex-start',
//             mt: 1,
//             gap: 1,
//           }}
//         >
//           <Avatar sx={{ width: 24, height: 24 }}>
//             {reply.user?.username?.charAt(0).toUpperCase() || 'U'}
//           </Avatar>
//           <Box>
//             <Typography variant="body2" fontWeight={500}>
//               {reply.user?.username || 'User'}
//             </Typography>
//             <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
//               {reply.content}
//             </Typography>
//             <Typography
//               variant="caption"
//               color="text.secondary"
//               sx={{ fontSize: '0.7rem' }}
//             >
//               {formatDate(reply.createdAt)}
//             </Typography>
//           </Box>
//         </Box>
//       ))}
//       <Box sx={{ ml: 6, mt: 2 }}>
//         <TextField
//           size="small"
//           fullWidth
//           multiline
//           rows={2}
//           placeholder="Write a reply..."
//           value={replyMap[comment._id] || ''}
//           onChange={(e) =>
//             setReplyMap((prev) => ({ ...prev, [comment._id]: e.target.value }))
//           }
//         />
//         <Button
//           size="small"
//           variant="contained"
//           sx={{ mt: 1 }}
//           disabled={!replyMap[comment._id]?.trim()}
//           onClick={() => handleReply(comment._id)}
//         >
//           Reply
//         </Button>
//       </Box>
//     </Box>
//   )}
// </Paper>

//                             </Collapse>
//                         ))}
//                         <div ref={commentEndRef} />
//                     </List>
//                 ) : (
//                     <Typography variant="body2" sx={{ mt: 2 }}>
//                         No comments yet.
//                     </Typography>
//                 )}
//             </Box>
//         </Box>
//     );
// };

// export default DiscussionDetailPage;
import React, { useEffect, useState, useContext, useRef } from 'react';
import {
    Box,
    Typography,
    Paper,
    Avatar,
    TextField,
    Button,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    CircularProgress,
    Skeleton,
    Collapse,
    Tooltip
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../contextAPI/Context';

const formatDate = (dateStr) => new Date(dateStr).toLocaleString();

const DiscussionDetailPage = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [discussion, setDiscussion] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [posting, setPosting] = useState(false);
    const [error, setError] = useState(null);

    const commentEndRef = useRef(null);
    const [replyMap, setReplyMap] = useState({}); // { [commentId]: replyText }

    const token = localStorage.getItem('token');
    const authHeader = { Authorization: `Bearer ${token}` };

    const scrollToBottom = () => {
        commentEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const fetchDiscussion = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(
                `http://localhost:8015/api/discussion/${id}`,
                { headers: authHeader }
            );
            setDiscussion(data);
            setError(null);
        } catch (err) {
            console.error('Fetch error:', err.message);
            setError('Unable to load discussion. Please try again later.');
        }
        setLoading(false);
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        setPosting(true);
        try {
            await axios.post(
                `http://localhost:8015/api/discussion/${id}/comments`,
                { content: newComment, createdBy: user.id },
                { headers: authHeader }
            );
            setNewComment('');
            await fetchDiscussion();
            scrollToBottom();
        } catch (err) {
            console.error('Comment error:', err.message);
        }
        setPosting(false);
    };

    const handleReply = async (commentId) => {
        const content = replyMap[commentId];
        if (!content?.trim()) return;

        try {
            await axios.post(
                `http://localhost:8015/api/discussion/comments/${commentId}/reply`,
                { content, createdBy: user.id , discussion:id},
                { headers: authHeader }
            );
            setReplyMap((prev) => ({ ...prev, [commentId]: '' }));
            await fetchDiscussion();
            scrollToBottom();
        } catch (err) {
            console.error('Failed to post reply:', err.message);
        }
    };

    useEffect(() => {
        fetchDiscussion();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ maxWidth: '800px', mx: 'auto', p: 3 }}>
                <Skeleton variant="text" width="70%" height={50} />
                <Skeleton variant="rectangular" height={100} sx={{ my: 2 }} />
                <Skeleton variant="text" width="50%" />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ maxWidth: '800px', mx: 'auto', p: 3 }}>
                <Typography variant="h6" color="error">{error}</Typography>
                <Button variant="contained" onClick={fetchDiscussion} sx={{ mt: 2 }}>
                    Retry
                </Button>
            </Box>
        );
    }

    if (!discussion) {
        return (
            <Typography variant="body1" sx={{ mt: 4, textAlign: 'center' }}>
                Discussion not found.
            </Typography>
        );
    }

    return (
        <Box sx={{ maxWidth: '800px', mx: 'auto', p: 3 }}>
            {/* Header */}
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h4" gutterBottom>
                    {discussion.title}
                </Typography>
                <Box display="flex" alignItems="center" mb={2}>
                    <Avatar sx={{ mr: 1 }}>
                        {discussion.createdBy?.username?.[0]?.toUpperCase() || 'U'}
                    </Avatar>
                    <Typography variant="body1" color="text.secondary">
                        {discussion.createdBy?.username || 'Unknown'} · {formatDate(discussion.createdAt)}
                    </Typography>
                </Box>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }} gutterBottom>
                    {discussion.content}
                </Typography>
                {discussion.updatedAt && (
                    <Typography variant="caption" color="text.secondary">
                        Last updated: {formatDate(discussion.updatedAt)}
                    </Typography>
                )}
            </Paper>

            {/* Comments */}
            <Box mt={4}>
                <Typography variant="h5" gutterBottom>
                    Comments
                </Typography>

                {/* Add Comment */}
                <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        sx={{ mt: 2 }}
                        disabled={posting || !newComment.trim()}
                        onClick={handleAddComment}
                    >
                        {posting ? <CircularProgress size={24} color="inherit" /> : 'Post Comment'}
                    </Button>
                </Paper>

                {/* Display Comments */}
                {discussion.comments?.length > 0 ? (
                    <List>
                        {discussion.comments.map((comment) => (
                            <Collapse in key={comment._id} timeout={400}>
                                <Paper variant="outlined" sx={{ p: 2, mb: 2, borderRadius: 2 }}>
                                    <ListItem alignItems="flex-start" disableGutters>
                                        <Tooltip title="View Profile">
                                            <ListItemAvatar
                                                sx={{ cursor: 'pointer' }}
                                                onClick={() =>
                                                    navigate(`/user/anotherProfile/${comment.user?.username}`)
                                                }
                                            >
                                                <Avatar>
                                                    {comment.user?.username?.charAt(0).toUpperCase() || 'U'}
                                                </Avatar>
                                            </ListItemAvatar>
                                        </Tooltip>
                                        <ListItemText
                                            primary={
                                                <Typography
                                                    fontWeight={600}
                                                    sx={{ cursor: 'pointer' }}
                                                    onClick={() =>
                                                        navigate(`/user/anotherProfile/${comment.user?.username}`)
                                                    }
                                                >
                                                    {comment.user?.username || 'Unknown'}
                                                </Typography>
                                            }
                                            secondary={
                                                <>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{ whiteSpace: 'pre-line', mb: 0.5 }}
                                                    >
                                                        {comment.content}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        color="text.secondary"
                                                        sx={{ fontStyle: 'italic' }}
                                                    >
                                                        {formatDate(comment.createdAt)}
                                                    </Typography>
                                                </>
                                            }
                                        />
                                    </ListItem>

                                    {/* Replies */}
                                    <Box sx={{ ml: 6, mt: 1 }}>
                                        {comment.replies?.length > 0 &&
                                            comment.replies.map((reply) => (
                                                <Box
                                                    key={reply._id}
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        mt: 1,
                                                        gap: 1,
                                                    }}
                                                >
                                                    <Avatar sx={{ width: 24, height: 24 }}>
                                                        {reply.user?.username?.charAt(0).toUpperCase() || 'U'}
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="body2" fontWeight={500}>
                                                            {reply.user?.username || 'User'}
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                                                            {reply.content}
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                            sx={{ fontSize: '0.7rem' }}
                                                        >
                                                            {formatDate(reply.createdAt)}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            ))}

                                        {/* Reply Input */}
                                        <Box sx={{ ml: 6, mt: 2 }}>
                                            <TextField
                                                size="small"
                                                fullWidth
                                                multiline
                                                rows={2}
                                                placeholder="Write a reply..."
                                                value={replyMap[comment._id] || ''}
                                                onChange={(e) =>
                                                    setReplyMap((prev) => ({
                                                        ...prev,
                                                        [comment._id]: e.target.value
                                                    }))
                                                }
                                            />
                                            <Button
                                                size="small"
                                                variant="contained"
                                                sx={{ mt: 1 }}
                                                disabled={!replyMap[comment._id]?.trim()}
                                                onClick={() => handleReply(comment._id)}
                                            >
                                                Reply
                                            </Button>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Collapse>
                        ))}
                        <div ref={commentEndRef} />
                    </List>
                ) : (
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        No comments yet.
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default DiscussionDetailPage;
