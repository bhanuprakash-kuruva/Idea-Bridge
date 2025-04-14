const User = require('../models/user');

const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Fetching profile for:", id);

    const user = await User.findOne({ username: id })
      .select("-password") // Exclude password field
      .populate("followers", "username fullName profilePicture")
      .populate("following", "username fullName profilePicture")
      .populate("projectsSubmitted")
      .populate("projectsCollaborating")
      .populate("researchDocuments")
      .populate({
        path: "notifications",
        populate: {
          path: "sender relatedProject relatedCollaboration",
          select: "username fullName title", // adjust fields accordingly
        },
      });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getProfile,
};
