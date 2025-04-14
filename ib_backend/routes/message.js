const express = require('express');
const Message = require('../models/message');
const router = express.Router();
const User = require('../models/user')
// Fetch chat history between two users
router.get('/history/:senderId/:receiverId', async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;
    const sender = await User.findOne({ username: senderId }); // Find sender by username (or ID)
      const receiver = await User.findOne({ username: receiverId }); // Find receiver by username (or ID)
    // Find messages between the sender and receiver
    const messages = await Message.find({
      $or: [
        { sender: sender._id, receiver: receiver._id },
        { sender: receiver._id, receiver: sender._id }
      ]
    }).sort({ timestamp: 1 }).populate('receiver','username profilePicture').populate('sender','username profilePicture'); // Sort messages by timestamp ascending
    
    res.json(messages); // Send the messages to the frontend
    console.log(messages)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
// const express = require('express');
// const Message = require('../models/message');
// const User = require('../models/user');
// const redisClient = require('../redis/redisClient'); // Redis client setup
// const router = express.Router();

// // Fetch chat history between two users
// router.get('/history/:senderId/:receiverId', async (req, res) => {
//   try {
//     const { senderId, receiverId } = req.params;

//     // Create a consistent key regardless of order
//     const cacheKey = `chat:${[senderId, receiverId].sort().join('_')}`;

//     // 1️⃣ Try fetching from Redis cache
//     const cached = await redisClient.get(cacheKey);
//     if (cached) {
//       console.log('📦 Cache hit');
//       return res.json(JSON.parse(cached));
//     }

//     console.log('📂 Cache miss - Fetching from MongoDB');

//     const sender = await User.findOne({ username: senderId });
//     const receiver = await User.findOne({ username: receiverId });

//     if (!sender || !receiver) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Fetch messages between sender and receiver
//     const messages = await Message.find({
//       $or: [
//         { sender: sender._id, receiver: receiver._id },
//         { sender: receiver._id, receiver: sender._id }
//       ]
//     }).sort({ timestamp: 1 });

//     // 2️⃣ Cache the result for 10 minutes
//     await redisClient.setEx(cacheKey, 600, JSON.stringify(messages));

//     res.json(messages);
//   } catch (error) {
//     console.error('❌ Error fetching chat history:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;
