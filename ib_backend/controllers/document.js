const Document = require("../models/document");
const Project = require("../models/project");
const User = require("../models/user");
const mongoose = require("mongoose");

const addDocument = async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);
    console.log("Uploaded file:", req.file);

    const { title, description, relatedProject, uploadedBy } = req.body;

    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: "No file uploaded to Cloudinary" });
    }

    const fileUrl = req.file.path; // Cloudinary file URL

    const newDoc = new Document({
      title,
      description,
      fileUrl,
      relatedProject,
      uploadedBy,
    });

    const savedDoc = await newDoc.save();

    // Link the document to the Project
    await Project.findByIdAndUpdate(
      relatedProject,
      { $push: { researchDocuments: savedDoc._id } },
      { new: true }
    );

    // Link the document to the User
    const user = await User.findById(uploadedBy);
    if (user) {
      user.researchDocuments.push(savedDoc._id);
      await user.save();
    }

    res.status(201).json({
      message: "Document uploaded successfully",
      document: savedDoc,
    });
  } catch (err) {
    console.error("Error uploading document:", err);
    res.status(500).json({ error: err.message || "Upload failed" });
  }
};

module.exports = {
  addDocument,
};
