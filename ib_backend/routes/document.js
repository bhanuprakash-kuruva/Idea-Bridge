
// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const { addDocument } = require("../controllers/document");

// // Setup Multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/documents/");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// // Route
// router.post("/upload", upload.single("file"), addDocument);
// module.exports = router

const express = require("express");
const router = express.Router();
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("../middlewares/cloudinary");
const { addDocument } = require("../controllers/document");

// Configure Cloudinary storage for non-image files
const documentStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "documents",
    resource_type: "raw", // For PDFs, DOCs, etc.
    format: async (req, file) => file.originalname.split(".").pop(), // Keep original format
    public_id: (req, file) =>
      Date.now() + "-" + Math.round(Math.random() * 1e9),
  },
});

// Optional: file filter for specific document types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx|ppt|pptx/;
  const extname = allowedTypes.test(
    file.originalname.split(".").pop().toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) return cb(null, true);
  cb(new Error("Only documents (PDF, DOC, DOCX, PPT, PPTX) are allowed"));
};

// Multer middleware using Cloudinary
const uploadDocument = multer({ storage: documentStorage, fileFilter });

// Upload route
router.post("/upload", uploadDocument.single("file"), addDocument);

module.exports = router;
