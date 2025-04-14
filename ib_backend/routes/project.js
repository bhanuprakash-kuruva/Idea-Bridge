const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const {getAllProjects, getProjectById,deleteProject,updateProject,addCollaborator,likeProject,unlikeProject} = require('../controllers/project')
const Project = require("../models/project");
const User = require('../models/user')
// Storage config for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save to /uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  },
});

const upload = multer({ storage });


router.post("/addProject", upload.single("image"), async (req, res) => {
  try {
    const { title, description, createdBy, status, category,github,liveURL } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";
    console.log(title, description, createdBy, status, category,github,liveURL)
    const project = new Project({
      title,
      description,
      createdBy,
      status,
      reviews:[],
      category,
      likes:[],
      github,
      liveURL,
      image: imageUrl,
    });
    const user = await User.findById(createdBy);
    if(!user) return res.status(404).json({message:'User not found'})
    const projectsSubmitted = user.projectsSubmitted;
    projectsSubmitted.push(project)
    await user.save();
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/",getAllProjects);
router.get("/:id",getProjectById);
router.delete('/delete/:id',deleteProject);
router.put('/update/:id',updateProject);
router.post('/addCollaborator/:id',addCollaborator)


// Like a project
router.post('/:projectId/like',likeProject);

// Unlike a project
router.post('/:projectId/unlike', unlikeProject);


module.exports = router;
