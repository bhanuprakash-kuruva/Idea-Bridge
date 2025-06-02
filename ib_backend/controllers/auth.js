
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

// ========= MULTER CONFIG ==========
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Make sure this folder exists
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });
const uploadProfilePic = upload.single("profilePicture");

// ========== REGISTER USER ==========
const registerUser = async (req, res) => {
    try {
        const {
            fullName,
            email,
            username,
            password,
            phone,
            gender,
            bio,
            skills,
            interests,
            github,
            linkedin
        } = req.body;
        if(!fullName || !email || !username ||!password || !phone || !gender || !bio || !github || !linkedin  ){
            res.status(500).json({ message: "Please enter all the fields" });
        }
        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email or username" });
        }

       

        // Handle Profile Picture Upload
        let profilePicture = null;
        if (req.file) {
            profilePicture = req.file.filename; // Save filename only
        }

        // Create user
        const newUser = new User({
            fullName,
            email,
            username,
            password,
            phone,
            gender,
            bio,
            skills: skills ? skills.split(",") : [],
            interests: interests ? interests.split(",") : [],
            profilePicture,
            followers: [],
            following: [],
            github,
            linkedin
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                username: newUser.username,
                profilePicture: newUser.profilePicture,
            },
        });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ========== LOGIN USER ==========
// const loginUser = async (req, res) => {
//     try {
//         const { emailOrUsername, password } = req.body;
//         console.log(emailOrUsername, password)
//         // Find user
//         const user = await User.findOne({
//             $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
//         });

//         if (!user) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         // Create JWT Token
//         const token = jwt.sign(
//             { id: user._id, username: user.username },
//             process.env.JWT_SECRET,
//             { expiresIn: "7d" }
//         );

//         res.status(200).json({
//             message: "Login successful",
//             token,
//             user: {
//                 id: user._id,
//                 username: user.username,
//                 fullName: user.fullName,
//                 email: user.email,
//                 profilePicture: user.profilePicture,
//             },
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

const loginUser = async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;

        // Find user and populate followers and following
        const user = await User.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
        })
        .populate('followers', 'fullName username profilePicture') // Only select necessary fields
        .populate('following', 'fullName username profilePicture');

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create JWT Token
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Destructure and return user data
        const {
            _id,
            fullName,
            email,
            username,
            phone,
            gender,
            profilePicture,
            bio,
            role,
            skills,
            interests,
            followers,
            following,
            projectsSubmitted,
            projectsCollaborating,
            researchDocuments,
            notifications,
            github,
            linkedin,
            createdAt,
            updatedAt
        } = user;

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: _id,
                fullName,
                email,
                username,
                phone,
                gender,
                profilePicture,
                bio,
                role,
                skills,
                interests,
                followers, // Now full user objects
                following, // Now full user objects
                projectsSubmitted,
                projectsCollaborating,
                researchDocuments,
                notifications,
                github,
                linkedin,
                createdAt,
                updatedAt
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


module.exports = {
    registerUser,
    loginUser,
    uploadProfilePic, // Multer middleware
};
