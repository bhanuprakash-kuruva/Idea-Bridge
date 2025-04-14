const mongoose = require("mongoose");

const ResearchDocumentSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, "Title is required"], 
    trim: true 
  },
  description: { 
    type: String, 
    trim: true 
  },
  fileUrl: { 
    type: String, 
    required: [true, "File URL is required"], 
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+\.(pdf|doc|docx|ppt|pptx)$/i.test(v);
      },
      message: "Invalid file URL format"
    }
  },
  relatedProject:{
    type: mongoose.Schema.Types.ObjectId,
    ref : "Project"
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }, 
},{timestamps:true});
const Document = mongoose.model("Document", ResearchDocumentSchema);
module.exports = Document;
