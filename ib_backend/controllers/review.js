const Review = require('../models/review')
const Project = require('../models/project')
const User = require('../models/user')

const addReview = async (req, res) => {
    try {
      const {
        project,            // optional
        reviewer,
        rating,
        comment,
        innovation,
        technicalFeasibility,
        clarity,
        impact,
        anonymous
      } = req.body;
      console.log(req.body)
      // Basic field validation
      if (!reviewer || !rating || !comment || !innovation || !technicalFeasibility || !clarity || !impact) {
        return res.status(400).json({ message: 'All required fields must be filled' });
      }
  
      // Optional project validation
      if (project) {
        const existingProject = await Project.findById(project).populate('reviews');
        if (!existingProject) {
          return res.status(404).json({ message: 'Provided project not found' });
        }
        
      }
  
      const user = await User.findById(reviewer);
      if (!user) {
        return res.status(404).json({ message: 'Reviewer not found' });
      }
  
      const review = new Review({
        project: project || null,
        reviewer,
        rating,
        comment,
        innovation,
        technicalFeasibility,
        clarity,
        impact,
        anonymous
      });
      if(project){
        const existingProject = await Project.findById(project).populate('reviews');
        existingProject.reviews.push(review);
      }
      await review.save();
      res.status(201).json({ message: 'Review submitted successfully', review });
    } catch (err) {
      console.error('Review submission error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

const getProjectReviews = async(req,res)=>{
  try{
    const {projectId} = req.params;
    console.log(projectId)
    const reviews = await Review.find({project:projectId})
    .populate('project')
    .populate('reviewer','username profilePicture');
    return res.status(200).json(reviews)
  }catch(err){
    console.log(err);
    return res.status(500).json({message:"Internal Server Error"})
  }
}

module.exports = {
    addReview,
    getProjectReviews
}