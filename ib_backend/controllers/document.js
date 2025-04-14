const Document = require("../models/document");
const Project = require("../models/project");
const User = require('../models/user')
const mongoose = require('mongoose')
const addDocument = async (req, res) => {
    try {
      console.log("Incoming request body:", req.body);
      console.log("Uploaded file:", req.file);
  
      const { title, description, relatedProject, uploadedBy } = req.body;
  
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      const baseUrl = `${req.protocol}://${req.get("host")}`;
      const fileUrl = `${baseUrl}/uploads/documents/${req.file.filename}`;
      
      const newDoc = new Document({
        title,
        description,
        fileUrl,
        relatedProject,
        uploadedBy,
      });
  
      const savedDoc = await newDoc.save();
  
      await Project.findByIdAndUpdate(
        relatedProject,
        { $push: { researchDocuments: savedDoc._id } },
        { new: true }
      );
      console.log(uploadedBy)
      const user = await User.findOne({ _id: new mongoose.Types.ObjectId(uploadedBy) }).populate('researchDocuments');
      user.researchDocuments.push(savedDoc._id)
      await user.save();
      console.log(user)
      res.status(201).json(savedDoc);
    } catch (err) {
      console.error("Error uploading document:", err);
      res.status(500).json({ error: err.message });
    }
  };
  

module.exports = {
    addDocument
}
