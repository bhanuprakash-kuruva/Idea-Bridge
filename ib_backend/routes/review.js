const express = require('express')
const {addReview,getProjectReviews} = require('../controllers/review')
const router = express.Router();

router.post('/',addReview);
router.get('/project/:projectId',getProjectReviews)
module.exports = router;