const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: false,
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number, // 0 to 5
      required: true,
      min: 0,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      maxlength: 300,
    },
    innovation: {
      type: String, // Emoji or label like "😍", "😊", etc.
      required: true,
    },
    technicalFeasibility: {
      type: String,
      required: true,
    },
    clarity: {
      type: String,
      required: true,
    },
    impact: {
      type: String,
      required: true,
    },
    dateOfReview: {
      type: Date,
      default: Date.now,
    },
    attachment: {
      type: String, // URL of uploaded image/pdf/etc.
    },
    anonymous: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review
