// routes/userRoutes.js or wherever your user routes are handled

const express = require("express");
const router = express.Router();
const {addFollower} = require('../controllers/notification')

// Follow route with notification creation
router.put("/follow/:id",addFollower);

module.exports = router;
