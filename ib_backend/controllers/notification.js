const User = require("../models/user");
const Notification = require("../models/notification");
const addFollower =  async (req, res) => {
    const { currentUserId } = req.body;
    const recipientId = req.params.id;
    try {
      if (currentUserId === recipientId) {
        return res.status(400).json({ message: "You cannot follow yourself." });
      }
  
      const currentUser = await User.findById(currentUserId);
      const recipientUser = await User.findOne({username:recipientId});
      if (!currentUser || !recipientUser) {
        return res.status(404).json({ message: "User not found." });
      }
  
      if (recipientUser.followers.includes(currentUserId)) {
        return res.status(400).json({ message: "You already follow this user." });
      }
  
      // Update following/followers
      recipientUser.followers.push(currentUserId);
      currentUser.following.push(recipientUser._id);
      await recipientUser.save();
      await currentUser.save();
  
      // Create a follow notification
      const newNotification = new Notification({
        recipient: recipientUser._id,
        sender: currentUserId,
        type: "follow",
        message: `${currentUser.username} started following you.`,
      });
  
      await newNotification.save();
  
      res.status(200).json({ message: "Followed successfully and notification sent." });
    } catch (error) {
      console.error("Follow Error:", error);
      res.status(500).json({ message: "Server error." });
    }
  }

module.exports ={
    addFollower
}