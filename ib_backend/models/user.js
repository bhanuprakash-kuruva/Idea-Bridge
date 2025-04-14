const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Project = require('./project')
const Document = require('./document')
const Collaboration = require('./collaboration')
const Notification = require('./notification')
const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9_.-]+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    profilePicture: {
      type: String, // URL to the profile picture
      default: "default-profile.png",
    },
    bio: {
      type: String,
      maxlength: 300, // Short description about the user
    },
    role: {
      type: String,
      enum: ["user", "moderator", "admin"],
      default: "user",
    },
    skills: {
      type: [String], // Array of skills like ['AI', 'Blockchain', 'Web Dev']
    },
    interests: {
      type: [String], // Categories of interest like ['FinTech', 'Healthcare']
    },
    followers:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    projectsSubmitted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
    projectsCollaborating: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collaboration",
      },
    ],
    researchDocuments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Document'
        },
      ],
    notifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],
    github:{
      type:String,
      required:true
    },
    linkedin:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password for login
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", UserSchema);

module.exports  = User;
