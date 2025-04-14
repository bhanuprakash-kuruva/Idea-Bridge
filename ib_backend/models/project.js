const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, "Project title is required"], 
    trim: true 
  }, // Project Title

  description: { 
    type: String, 
    required: [true, "Project description is required"], 
    trim: true 
  }, // Brief project description

  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }, // User who created the project

  teamMembers: [
    { 
      type: String,
    }
  ], // List of user IDs who are part of the project

  status: { 
    type: String, 
    enum: ["Idea", "In Progress", "Completed"], 
    default: "Idea" 
  }, // Project Status

  category: {
    type: String,
    enum: ["Technology", "Business", "Science", "Education", "Other"],
    required: true
  }, // Project Category

  researchDocuments: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Document" 
    }
  ], // List of research document IDs
  likes:[
    {
      type: String,
    }
    
  ],
  reviews:[
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Review" 
    }
  ],

  github:{
    type: String,
    required: true
  },

  liveURL:{
    type: String,
    
  },

  image: { 
    type: String, 
    default: "" // URL of the project image
  }, // Image for the project

}, { timestamps: true });

// Middleware to update `updatedAt` field before saving
ProjectSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Export the Model
const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
