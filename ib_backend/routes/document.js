// const express = require("express");
// const router = express.Router();
// const upload = require("../middlewares/upload");
// const Document = require("../models/document");
// const Project = require("../models/project");
// const { addDocument } = require("../controllers/document");

// router.post("/upload", upload.single("file"),addDocument);

// module.exports = router

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { addDocument } = require("../controllers/document");

// Setup Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/documents/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Route
router.post("/upload", upload.single("file"), addDocument);
module.exports = router