const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {registerUser, uploadProfilePic,loginUser} = require('../controllers/auth')
const router = express.Router();

// Signup Route
router.post("/signup", uploadProfilePic,registerUser);
router.post("/signin",loginUser);
module.exports = router;
