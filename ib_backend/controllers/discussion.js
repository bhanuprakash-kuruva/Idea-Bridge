const Comment = require('../models/comment')
const Discussion = require('../models/discussion');
const Project = require('../models/project');
const User = require('../models/user')
// Create Discussion
const createDiscussion = async (req, res) => {
  try {
    const { title, content, project,createdBy } = req.body;
   
    const user = await User.findById(createdBy)
   
    const discussion = await Discussion.create({
      title,
      content,
      project,
      createdBy,
    });
    const populatedDiscussion = await Discussion.findById(discussion._id)
      .populate('createdBy', 'username email');
      console.log(populatedDiscussion)
    res.status(201).json(populatedDiscussion);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create discussion', error });
  }
};

// Add comment to discussion
 const addComment = async (req, res) => {
  try {
    const { discussionId } = req.params;
    const { content,createdBy } = req.body;
    console.log(discussionId,content,createdBy)
    const comment = await Comment.create({
      user: createdBy,
      content,
      discussion: discussionId,
      replies:[],
      likes:[]
    });
    console.log(comment)
    await Discussion.findByIdAndUpdate(discussionId, {
      $push: { comments: comment._id },
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add comment', error });
  }
};

// Reply to a comment
const replyToComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content , createdBy,discussion} = req.body;
    const reply = await Comment.create({
      user: createdBy,
      content,
      discussion
    });

    await Comment.findByIdAndUpdate(commentId, {
      $push: { replies: reply._id },
    });

    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ message: 'Failed to reply to comment', error });
  }
};

// Delete a comment (only if user owns it)
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (!comment.user.equals(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized to delete this comment' });
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete comment', error });
  }
};

const getDiscussionsOfSingleProject = async (req, res) => {
    try {
      const projectId = req.params.id;
  
      const discussions = await Discussion.find({ project: projectId })
        .populate('createdBy', 'username email')
        .sort({ createdAt: -1 });
  
      res.status(200).json(discussions);
    } catch (error) {
      console.error('Error fetching project discussions:', error.message);
      res.status(500).json({ message: 'Server Error' });
    }
  };

const getDiscussionById = async (req, res) => {
    try {
      const discussion = await Discussion.findById(req.params.id)
        .populate('createdBy', 'username email') // populate discussion creator
        .populate('project', 'title description') // populate project info
        .populate({
          path: 'comments',
          model: 'Comment',
          populate: [
            {
              path: 'user', // correct field in comment schema
              model: 'User',
              select: 'username email',
            },
            {
              path: 'replies',
              model: 'Comment',
              populate: {
                path: 'user',
                model: 'User',
                select: 'username email',
              },
            },
          ],
        })
        .populate('likes', 'username email') // users who liked the discussion
        .setOptions({ strictPopulate: false });
  
      if (!discussion) {
        return res.status(404).json({ message: 'Discussion not found' });
      }
  
      res.status(200).json(discussion);
    } catch (err) {
      console.error('Error fetching discussion by ID:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };

const getAllDiscussions = async(req,res)=>{
  try {
    const discussions = await Discussion.find({})
      .populate('createdBy', 'username email') // populate discussion creator
      .populate('project', 'title description') // populate project info
      .populate({
        path: 'comments',
        model: 'Comment',
        populate: [
          {
            path: 'user', // correct field in comment schema
            model: 'User',
            select: 'username email',
          },
          {
            path: 'replies',
            model: 'Comment',
            populate: {
              path: 'user',
              model: 'User',
              select: 'username email',
            },
          },
        ],
      })
      .populate('likes', 'username email') // users who liked the discussion
      .setOptions({ strictPopulate: false });

    if (!discussions) {
      return res.status(404).json({ message: 'Discussion not found' });
    }

    res.status(200).json(discussions);
  } catch (err) {
    console.error('Error fetching discussions:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
}

const updateDiscussion = async (req, res) => {
  try {
    const { title, content } = req.body;
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) return res.status(404).json({ message: "Discussion not found" });

    discussion.title = title || discussion.title;
    discussion.content = content || discussion.content;

    const updated = await discussion.save();
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


const deleteDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id);

    if (!discussion) return res.status(404).json({ message: "Discussion not found" });

    await discussion.deleteOne();
    res.status(200).json({ message: "Discussion deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports ={
    createDiscussion,
    addComment,
    replyToComment,
    deleteComment,
    getDiscussionsOfSingleProject,
    getDiscussionById,
    getAllDiscussions,
    updateDiscussion,
    deleteDiscussion
}