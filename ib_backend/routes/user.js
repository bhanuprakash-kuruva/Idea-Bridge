const express = require("express");
const User = require("../models/user");
const { getProfile } = require("../controllers/user");

const router = express.Router();

// Get user profile by ID
router.get("/profile/:id",getProfile);

module.exports = router;
