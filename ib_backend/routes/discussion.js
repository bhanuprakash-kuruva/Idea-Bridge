const {
  createDiscussion,
  addComment,
  replyToComment,
  deleteComment,getDiscussionsOfSingleProject,getDiscussionById,
  getAllDiscussions,
  updateDiscussion,
  deleteDiscussion,
  likeDiscussion
} = require('../controllers/discussion.js');
const express = require('express')

const router = express.Router();

router.get('/',getAllDiscussions)
// Create a new discussion
router.post('/create', createDiscussion);

router.get('/:id',getDiscussionById)

router.get('/oneproject/:id',getDiscussionsOfSingleProject)

// Add a comment to a discussion
router.post('/:discussionId/comments', addComment);

// Reply to a comment
router.post('/comments/:commentId/reply', replyToComment);

// Delete a comment (only by the owner)
router.delete('/comments/:commentId', deleteComment);

// PUT update a discussion
router.put("/:id", updateDiscussion);

// DELETE a discussion
router.delete("/:id", deleteDiscussion);

//LIKE a discussion
router.post('/like/:userId/:discussionId',likeDiscussion)

module.exports = router;
